/*---------------Used to keep elemental boxes vertically aligned-----------------*/
function getRemainingVer_Px() {
    var usedVerticlePixels;

    if (window.innerWidth >= 701) {
        //The dimensions of squares are 20x20vw;
        usedVerticlePixels = (window.innerWidth / 100) * 20 
    } else {
        //Dimensions are 15x15vh, 3 squares
        usedVerticlePixels = (window.innerHeight / 100) * 15
    }


    //Footer height
    var footer = document.getElementsByTagName("footer")[0];
    var footerStyle = footer.currentStyle || window.getComputedStyle(footer);
    usedVerticlePixels += parseFloat((footerStyle.height.split('p'))[0]);

    return window.innerHeight - usedVerticlePixels;
}

//More trouble than it's worth - Vertically centers boxes
function translateBoxes(){
    var availableVerticlePixels;

    if (window.innerWidth >= 701){
        availableVerticlePixels = getRemainingVer_Px();

        //Change the top margin of boxContainer to half of the available verticle pixels
        var p = document.getElementById("boxContainer");
        var pstyle = p.currentStyle || window.getComputedStyle(p);
        
        //Set margin top
        document.getElementById("boxContainer").style.setProperty('margin-top',`${availableVerticlePixels/2}px`);

        //Removes verticle margins
        document.getElementById("CuBox").style.setProperty('margin-top', `0px`);
        document.getElementById("CuBox").style.setProperty('margin-bottom', `0px`)
        document.getElementById("TaBox").style.setProperty('margin-top', `0px`)
        document.getElementById("TaBox").style.setProperty('margin-bottom', `0px`)
        document.getElementById("YBox").style.setProperty('margin-top', `0px`)
        document.getElementById("YBox").style.setProperty('margin-bottom', `0px`)
    } else {
        //Remove top margin from boxContainer
        document.getElementById("boxContainer").style.setProperty('margin-top', `0px`);


        availableVerticlePixels = getRemainingVer_Px();
        var verticleMarginHeight = availableVerticlePixels / 6;

        //Add margins to boxes
        document.getElementById("CuBox").style.setProperty('margin-top', `${verticleMarginHeight}px`);
        document.getElementById("CuBox").style.setProperty('margin-bottom', `${verticleMarginHeight}px`)
        document.getElementById("TaBox").style.setProperty('margin-top', `${verticleMarginHeight}px`)
        document.getElementById("TaBox").style.setProperty('margin-bottom', `${verticleMarginHeight}px`)
        document.getElementById("YBox").style.setProperty('margin-top', `${verticleMarginHeight}px`)
        document.getElementById("YBox").style.setProperty('margin-bottom', `${verticleMarginHeight}px`)
    }
}

function loadSite(){
    translateBoxes();
    window.addEventListener("resize", translateBoxes);
}

/*--------------------------------------------------------------------------*/

//Stores the user's path location before page change
function documentWeb(){
    localStorage["prevPath"] = `${window.location.pathname}`;
}

//Prepare the webpage for any of the three animations:
function preparePage(transition){
    if (transition = "Cu"){
        setPageVisibility(0,'elements');
        document.body.style.setProperty("background-color","rgb(200, 117, 9)");
    }

}

//Transition function for Cu Box
async function CuTransitionFunctionOut(link = ''){
    createChildElement(document.body, 'div','CuAnimation','CuAnimationOut', {'position' : 'absolute', 'top' : '0px', 'width' : '100%', 'height' : '100%'})
    await sleep(1000);
    documentWeb();
    preparePage('Cu');
    location.href = `${link}`;
}

async function CuTransitionFunctionIn(){
    createChildElement(document.body, 'div', 'CuAnimation', 'CuAnimationIn', {'position' : 'absolute', 'top' : '0px', 'width' : '100%', 'height' : '100%'});
    await sleep (1000);
    document.getElementsByClassName("CuAnimation")[0].remove();
}

//Transition used going to another webpage
async function TaTransitionFunctionOut(link = ''){
    rectangleWidth = '20vw';
    rectangleHeight = '20vh';

    //Create overlay screen:
    createChildElement(document.body,'div','','overlayDiv');

    for (var row = 0; row < 5 ; row++){
        createChildElement(document.getElementById("overlayDiv"), 'div', 'row', `row${row}`);
        await sleep(100);  
        for(col = 0; col < 5; col++){
            await sleep(30);
            createChildElement(document.getElementById(`row${row}`), 'div', 'col', `col${col}`);
        }
    }

    if (link != ''){
        documentWeb();
        location.href = link;
    }   

}

//Transition used coming from a webpage
async function TaTransitionFunctionIn(){
    //Recreate the transition screen (without sleep timers)
    rectangleWidth = '20vw';
    rectangleHeight = '20vh';

    //Create overlay screen:
    createChildElement(document.body,'div','','overlayDiv');

    for (var row = 0; row < 5 ; row++){
        createChildElement(document.getElementById("overlayDiv"), 'div', 'row', `row${row}`);
        for(col = 0; col < 5; col++){
            createChildElement(document.getElementById(`row${row}`), 'div', 'col', `col${col}`);
        }
    }

    sleep(250);
    for(row = 4; row >= 0; row--){
        for (var col = 4; col >= 0; col--){
            await sleep(30);
            document.getElementById(`row${(row == 0) ? 0 : row - 1}`).children[col].style.setProperty('scale','1');
            document.getElementById(`row${row}`).children[col].remove();
        }

        await sleep(100);
        document.getElementById(`row${row}`).remove();
    }
}

async function removeTransitionDiv(){
    //Time it takes to finish transition
    await sleep(1300);
    document.getElementById("overlayDiv").remove();
}

async function YTransitionFunctionOut(link = ''){
    createChildElement(document.getElementById("YBox"), 'div','','radiationOut')
    await sleep(1800);
    documentWeb();
    //preparePage('Cu');
    location.href = `${link}`;
}

async function YTransitionFunctionIn(){
    createChildElement(document.getElementById("YBox"), 'div', '', 'radiationIn');
    await sleep (1800);
    document.getElementsByClassName("radiationIn").remove();
}

//Make elements hidden for transition states
function setPageVisibility(visible, type = 'body'){
    console.log(window.location);
    if (type == 'body'){
        document.body.style.setProperty('visibility',`${(visible == 1) ? 'visible' : 'hidden'}`);
    } else{
        for (element of document.body.children){
            element.style.setProperty('visbility',`${(visible == 1) ? 'visible' : 'hidden'}`);
        }

    }
}

//Thanks Dan from StackOverflow! - Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Creates a child div element with given properties
function createChildElement (parent = document.body, type = "div", elementClass = "", elementID = "", styles = {}){
    var newElement = document.createElement(type);
    parent.appendChild(newElement);
    if (typeof styles == "string"){
        styles = JSON.parse(styles);
    }

    if(elementClass != ""){
        newElement.setAttribute("class",`${elementClass}`);
    }

    if (elementID != ""){
        newElement.setAttribute("ID",`${elementID}`);
    }

    for (var key in styles) {
        newElement.style.setProperty(`${key}`,`${styles[key]}`);
    }
}

/* TESTING WEEWEOOWWEOWEOWOWE */
function adoptBackground(file){
    console.log(`SOS SOS SOS: ${file}`);
    if(file == '/aboutme.html'){
        document.getElementById("CuVail").style.setProperty("visibility","visible");
    }
    if(file == '/littletest.html'){
        document.getElementById("CuVail").style.setProperty("visibility","hidden");
        document.getElementById("TaVail").style.setProperty("visibilty","visible");
    }
}
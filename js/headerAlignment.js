function resetMargin(){
        for(element of ["CuBox", "TaBox", "YBox"]) {
                for(margin of ["margin-left","margin-right"]){
                        if ((element == "CuBox" && margin == "margin-left") || (element == "YBox" && margin == "margin-right")){
                                document.getElementById(element).style.setProperty(margin, "5vw");
                        } else {
                                document.getElementById(element).style.setProperty(margin, "15vw");
                        }
                }
        }
}

function spaceHeader(){
        if (window.innerWidth >= 1050){
                var width = window.innerWidth;
                //0.05 for margin of left and right boxes
                //second term for box width (105px);
                var availableWidth = width - (2 * 0.05 * width + (3  * 105));
                var margin = availableWidth / 4;

                document.getElementById("CuBox").style.setProperty("margin-right",`${margin}px`);
                document.getElementById("TaBox").style.setProperty("margin-left",`${margin}px`);
                document.getElementById("TaBox").style.setProperty("margin-right",`${margin}px`);
                document.getElementById("YBox").style.setProperty("margin-left",`${margin}px`);
        } else if (window.innerWidth >= 500) { //500 * 10vw = 50px (min-width of boxes)
                resetMargin();
        } else {
                var width = window.innerWidth;
                //50px for each box width
                var availableWidth = width - (3 * 50);
                
                scaledWidth = availableWidth * (100/90) //Weighted widths are only 70% of total

                //Change each margin with custom weight equivalent to view width
                document.getElementById("CuBox").style.setProperty("margin-left",`${scaledWidth*0.15}px`);
                document.getElementById("CuBox").style.setProperty("margin-right",`${scaledWidth*0.15}px`);
                document.getElementById("TaBox").style.setProperty("margin-left",`${scaledWidth*0.15}px`);
                document.getElementById("TaBox").style.setProperty("margin-right",`${scaledWidth*0.15}px`);
                document.getElementById("YBox").style.setProperty("margin-left",`${scaledWidth*0.15}px`);
                document.getElementById("YBox").style.setProperty("margin-right",`${scaledWidth*0.15}px`);
        } 
}

window.addEventListener("resize", spaceHeader); 

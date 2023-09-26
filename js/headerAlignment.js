function spaceHeader(){
    if (window.innerWidth >= 1050){
            var width = window.innerWidth;
            //0.1 for margin of left and right boxes
            //second term for box width (105px);
            var availableWidth = width - (2 * 0.05 * width + (3  * 105));
            var margin = availableWidth / 4;

            document.getElementById("CuBox").style.setProperty("margin-right",`${margin}px`);
            document.getElementById("TaBox").style.setProperty("margin-left",`${margin}px`);
            document.getElementById("TaBox").style.setProperty("margin-right",`${margin}px`);
            document.getElementById("YBox").style.setProperty("margin-left",`${margin}px`);
    } else {
            document.getElementById("CuBox").style.setProperty("margin-right",`15vw`);
            document.getElementById("TaBox").style.setProperty("margin-left",`15vw`);
            document.getElementById("TaBox").style.setProperty("margin-right",`15vw`);
            document.getElementById("YBox").style.setProperty("margin-left",`15vw`);
    }
}

window.addEventListener("resize", spaceHeader); 



function closeDisplay(){
    var box = document.getElementById("display");
    box.style.animationName = "close";
    window.setTimeout(function () {
        box.style.display = "none";
    },500);
}


function openDisplay() {
    var box = document.getElementById("display");

    if(box.style.animationName === "close"){
        box.style.animationName = "zoom";
    }

    box.style.display = "block";
}


//https://www.w3schools.com/howto/howto_js_lightbox.asp
var slideIndex = 0;

function currSlide(n) {
    showPic(slideIndex = n);
}

function plusSlides(n) {

    if(n === undefined){
        n=1;
    }
    showPic(slideIndex += n);
}

function showPic(n){
    var i;
    var slides = document.getElementsByClassName("slides");
    var thumbnail = document.getElementsByClassName("column");
    if(n >= slides.length) {slideIndex = 0;}
    if(n < 0){slideIndex = slides.length-1;}

    for(i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }

    for(i=0; i<thumbnail.length; i++){
        thumbnail[i].style.opacity = "0.6";
    }



    slides[slideIndex].style.display = "block";
    thumbnail[slideIndex].style.opacity = "1";
}

//////////////////////////////////////////////////////////
function keyListner(event){
    var x = event.keyCode;
    if(x === 27){
        closeDisplay();
        pauseSlides();
    }
    if(x === 37){
        plusSlides(-1);
    }
    if(x === 39){
        plusSlides(1);
    }

}

var animated;

function playSlides() {
    plusSlides(1);
    animated = setTimeout("playSlides()", 10000);
}


function pauseSlides(){
    clearTimeout(animated);
}
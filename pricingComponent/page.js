let slider = document.querySelector(".slider-circle");
let sliderArea = document.querySelector(".slider");
let sliderRange = document.querySelector(".range-slider");

let rangeValue=sliderRange.value

let isMouseDown=false;
let posision=0;
let circlePosition=0;
let posx=0;
let posy=0;

// sliderRange.oninput(()=> console.log(this))

sliderRange.addEventListener("mousedown",()=>{isMouseDown=true})
sliderRange.addEventListener("input",sliderMove)
sliderRange.addEventListener("mouseup",()=>{isMouseDown=false})

function sliderMove(e){
    console.log(this.value)

}
let toogleButton = document.querySelector(".toogle-menu-nav")
let menu = document.querySelector(".menu-nav")

toogleButton.addEventListener("click", actionToogle)

function actionToogle() {
    menu.classList.toggle("hide-nav")
}
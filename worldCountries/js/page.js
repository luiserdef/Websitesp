const bt_darkLightMode = document.querySelector(".darkLightModeOption")
const countryData = document.getElementById("countryData");
const regionSelection = document.getElementById("filterRegionOptions");
const inputSearch = document.getElementById("inputSearch")
const pageDetail = document.querySelector(".pageCountry")
const mainSelector = document.querySelector("main")
let countryCard;


let resultData = {}
updateRegion()


regionSelection.addEventListener("change", updateRegion)
bt_darkLightMode.addEventListener("click", darkLightMode)
inputSearch.addEventListener("input", () => { searchPaint(resultData, "inputSearch") })


function updateRegion() {
    countryData.innerHTML = ""
    let region = regionSelection.value || "americas"
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(response => {
            if (response.ok) {
                countryData.classList.add("loading")
                return response.json()
            } else {
                return Promise.reject("check")
            }
        })
        .then(dataRegion => {
            console.log("enter")
            resultData = dataRegion
            countryData.classList.remove("loading")
            searchPaint(resultData, "regionOption")
        }).catch(error => searchPaint({}, "noFetch"))
}

//
function searchPaint(resultData = {}, mode = "regionOption") {
    countryData.innerHTML = ""
    if (mode === "inputSearch") {
        let country = inputSearch.value

        resultData.filter(countryVal => {
            if (countryVal.name.toLowerCase().includes(country.toLowerCase())) {
                countryData.innerHTML += createCard(countryVal)

            }
        })


    }
    if (mode === "regionOption") {
        resultData.forEach(countryVal => {
            countryData.innerHTML += createCard(countryVal)
        })
    }
    if (mode === "noFetch") {
        countryData.textContent = `No Results`
    }
}

function createCard(data) {
    return `
    <div onclick="detailsPage('${data.alpha3Code}')" class="countryCard countryCardSelection ${updateDarkLightBox()}">
        <div class="card-img">
        <img src="${data.flag}" alt="${data.name}-flag">
        </div>
        <div class="card-body">
            <h2>${data.name}</h2>
            <p><strong>Population: </strong>${data.population}</p>
            <p><strong>Region: </strong>${data.region}</p>
            <p><strong>Capital: </strong>${data.capital}</p> 
        </div>
    </div>                          
    `
}


function darkLightMode() {
    if (document.querySelector(".darkMode-main")) {
        document.querySelector(".darkLightModeOption").textContent = "Light Mode"
        document.querySelector(".searchIcon").style.removeProperty("filter")
        let mainSelection = document.querySelectorAll(".darkMode-main")
        for (let i = 0; i < mainSelection.length; i++) {

            mainSelection[i].classList.add("lightMode-main")
            mainSelection[i].classList.remove("darkMode-main")
        }

        //
        let boxSelection = document.querySelectorAll(".darkMode-box")
        for (let i = 0; i < boxSelection.length; i++) {
            boxSelection[i].classList.add("lightMode-box")
            boxSelection[i].classList.remove("darkMode-box")
        }
        //
        bt_darkLightMode.classList.remove("darkOption")
        bt_darkLightMode.classList.add("lightOption")

    } else {
        document.querySelector(".darkLightModeOption").textContent = "Dark Mode"
        document.querySelector(".searchIcon").style.filter = "invert(100%) sepia(0%) saturate(0%) hue-rotate(107deg) brightness(105%) contrast(102%)"
        let mainSelection = document.querySelectorAll(".lightMode-main")
        for (let i = 0; i < mainSelection.length; i++) {
            mainSelection[i].classList.add("darkMode-main")
            mainSelection[i].classList.remove("lightMode-main")
        }

        //
        let boxSelection = document.querySelectorAll(".lightMode-box")
        for (let i = 0; i < boxSelection.length; i++) {
            boxSelection[i].classList.add("darkMode-box")
            boxSelection[i].classList.remove("lightMode-box")
        }
        //
        bt_darkLightMode.classList.remove("lightOption")
        bt_darkLightMode.classList.add("darkOption")


    }
}

function updateDarkLightBox() {
    return document.querySelector(".darkMode-main") ? "darkMode-box" : "lightMode-box"
}

//page Description Country

function detailsPage(countryCode) {
    pageDetail.classList.remove("toRight")
    pageDetail.classList.add("toLeft")
    pageDetail.style.display = "block"
    document.getElementById("main-content").style.display = "none"
    let dataCountry = resultData.filter(element => element.alpha3Code.includes(countryCode))


    let countryBorders = ""
    let countryCurrencies = ""
    let countrylanguages = ""
    dataCountry[0]["borders"].forEach(element => {
        countryBorders += `
            <p class="${updateDarkLightBox()}">${element}</p> `
    })
    dataCountry[0]["currencies"].forEach(element => {
        countryCurrencies += element.code + ", "
    })
    if (countryCurrencies[countryCurrencies.length - 1] == " ") {
        countryCurrencies = countryCurrencies.substring(0, countryCurrencies.length - 2)
    }
    dataCountry[0]["languages"].forEach(element => {
        countrylanguages += element.name + ", "
    })
    if (countrylanguages[countrylanguages.length - 1] == " ") {
        countrylanguages = countrylanguages.substring(0, countrylanguages.length - 2)
    }
    pageDetail.innerHTML = `
        <button class="backButton ${updateDarkLightBox()}">Back</button>
        <div class="countryCard singlePage">
            <div class="card-img">
                <img src="${dataCountry[0].flag}" alt="">
            </div>
            <div class="card-body singlePage-body">
                <span>
                    <h2>${dataCountry[0].name}</h2>
                    <p><strong>Native Name: </strong>${dataCountry[0].nativeName}</p>
                    <p><strong>Population: </strong>${dataCountry[0].population}</p>
                    <p><strong>Region: </strong>${dataCountry[0].region}</p>
                    <p><strong>Sub Region: </strong>${dataCountry[0].subregion}</p>
                    <p><strong>Capital: </strong>${dataCountry[0].capital}</p>
                </span>
                <span>
                    <p><strong>Top Level domain: </strong>${dataCountry[0].topLevelDomain}</p>
                    <p><strong>Currencies: </strong>${countryCurrencies}</p>
                    <p><strong>Languages </strong>${countrylanguages}</p>
                </span>
                <span>
                    <h3>Border Countries</h3>
                    <div class="borderCountries">${countryBorders}</div>
                </span>
            </div>
        </div>
        `
    document.querySelector(".backButton").addEventListener("click", showMainPage)
}

function showMainPage() {
    document.getElementById("main-content").style.display = "block"
    pageDetail.classList.add("toRight")
    pageDetail.classList.remove("toLeft")
    setTimeout(() => {
        pageDetail.style.display = "none"
    }, 200)
}
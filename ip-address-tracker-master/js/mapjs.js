var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("bt-search");
var ipAddress = document.getElementById("info-ip-address")
var locationAddress = document.getElementById("info-location-address")
var timezoneAddress = document.getElementById("info-timezone-address")
var ispAddress = document.getElementById("info-isp-address")
let selectedQuery = ""
var mymap = L.map('map_container');


locationData()

searchInput.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        searchButton.click()
    }
})

searchButton.addEventListener("click", () => {
    let regxDomain = /((ftp|http|https):\/\/)?([a-z0-9]+\.)?([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6})|(\.[a-z]{2,6})(\.[a-z]{2,6}))$/i
    let regxIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (searchInput.value.match(regxDomain)) {
        selectedQuery = `domain=${searchInput.value}`
        locationData(selectedQuery)
    } else if (searchInput.value.match(regxIP) || searchInput.value === "") {
        selectedQuery = `ipAddress=${searchInput.value}`
        locationData(selectedQuery)
    } else {
        alert("ingresa una dirección IP o dominio Válido")
    }
})

function locationData(selectedQuery) {
    let searchQuery = `https://geo.ipify.org/api/v1?apiKey=at_u0XXRPZE7BmsbVL37y0B7399cVLo2&${selectedQuery}`;

    fetch(searchQuery)
        .then(response => response.json())
        .then(response => {
            ipAddress.textContent = response.ip
            locationAddress.textContent = response.location.city + ", " + response.location.country
            timezoneAddress.textContent = response.location.timezone
            ispAddress.textContent = response.isp
            console.log(response)
            mapPaint(response.location.lat, response.location.lng)
        })
}

function mapPaint(lat, lng) {
    mymap.setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FyZWZmcG1hIiwiYSI6ImNrazY5OG9sajAxcXUydm83eWp4ZTRsbnEifQ.dQhCTkUAIRSZ2uzGn5Krbw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ2FyZWZmcG1hIiwiYSI6ImNrazY5OG9sajAxcXUydm83eWp4ZTRsbnEifQ.dQhCTkUAIRSZ2uzGn5Krbw'
    }).addTo(mymap);
    L.marker([lat, lng]).addTo(mymap)
}
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("bt-search");
var ipAddress = document.getElementById("info-ip-address")
var locationAddress = document.getElementById("info-location-address")
var timezoneAddress = document.getElementById("info-timezone-address")
var ispAddress = document.getElementById("info-isp-address")



searchButton.addEventListener("click", () => {
    let searchQuery = `https://geo.ipify.org/api/v1?apiKey=at_u0XXRPZE7BmsbVL37y0B7399cVLo2&ipAddress=${searchInput.value}`;

    console.log(searchQuery)

    fetch(searchQuery)
        .then(response => response.json())
        .then(response => {
            ipAddress.textContent = response.ip
            locationAddress.textContent = response.location.city + ", " + response.location.country
            timezoneAddress.textContent = response.location.timezone
            ispAddress.textContent = response.isp
            console.log(response)
        })
})
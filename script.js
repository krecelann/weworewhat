
function loadXMLData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var products = xmlDoc.getElementsByTagName("product");
            var productList = document.getElementById("product-list");

           
            productList.innerHTML = '';

            for (var i = 0; i < products.length; i++) {
                var name = products[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                var brand = products[i].getElementsByTagName("brand")[0].childNodes[0].nodeValue;
                var price = products[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;

                var li = document.createElement("li");
                li.innerHTML = `
                    <h3>${name}</h3>
                    <p>Brand: ${brand}</p>
                    <p>Price: ${price}</p>
                `;
                productList.appendChild(li);
            }
        }
    };
    xhttp.open("GET", "data.xml", true);
    xhttp.send();
}

function fetchWeatherData(city = "Guimba, Nueva Ecija") {
    const apiKey = '30adb784f00643756bd4e9167c20ad5b';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById("weather-info");
            weatherDiv.innerHTML = ` 
                <h3>Weather in ${city}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            const weatherDiv = document.getElementById("weather-info");
            weatherDiv.innerHTML = `<p>${error.message}</p>`;
            console.error(error);
        });
}


document.getElementById("search-weather").addEventListener("click", () => {
    const cityInput = document.getElementById("city-input").value.trim();
    if (cityInput) {
        fetchWeatherData(cityInput);
    } else {
        alert("Please enter a city name.");
    }
});


window.onload = function() {
    loadXMLData(); 
    fetchWeatherData(); 
};

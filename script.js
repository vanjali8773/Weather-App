const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");

searchBtn.addEventListener("click", async function () {

    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        // Step 1: City ka latitude aur longitude find karna
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            alert("City not found");
            return;
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;

        // Step 2: Weather data lena
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        // Step 3: Data screen par dikhana
        cityName.innerText = city;

        temperature.innerText =
            weatherData.current.temperature_2m + "°C";

        humidity.innerText =
            weatherData.current.relative_humidity_2m;

        windSpeed.innerText =
            weatherData.current.wind_speed_10m;

        description.innerText =
            "Weather Code: " + weatherData.current.weather_code;

            // Smart recommendation
const temp = weatherData.current.temperature_2m;
const weatherCode = weatherData.current.weather_code;// Dynamic Weather Theme

document.body.className = "";

if (weatherCode >= 51 && weatherCode <= 67) {
    document.body.classList.add("rainy");
}
else if (weatherCode >= 80 && weatherCode <= 82) {
    document.body.classList.add("rainy");
}
else if (weatherCode >= 95) {
    document.body.classList.add("stormy");
}
else if (weatherCode >= 71 && weatherCode <= 77) {
    document.body.classList.add("snowy");
}
else if (weatherCode >= 2 && weatherCode <= 3) {
    document.body.classList.add("cloudy");
}
else {
    document.body.classList.add("sunny");
}

let message = "";

if (weatherCode >= 51 && weatherCode <= 67) {
    message = "🌧️ Rainy weather! Don't forget your umbrella.";
}
else if (weatherCode >= 80 && weatherCode <= 82) {
    message = "☔ Rain showers expected. Carry an umbrella.";
}
else if (weatherCode >= 95) {
    message = "⛈️ Thunderstorm! Stay indoors if possible.";
}
else if (temp >= 35) {
    message = "🥵 It's very hot! Stay hydrated and avoid direct sunlight.";
}
else if (temp >= 30) {
    message = "☀️ It's hot today! Wear light clothes and drink plenty of water.";
}
else if (temp >= 20) {
    message = "😊 Pleasant weather! A great day to go outside.";
}
else if (temp >= 10) {
    message = "🧥 It's a little cold. Consider wearing a light jacket.";
}
else {
    message = "🥶 It's very cold! Wear warm clothes and stay cozy.";
}

recommendation.innerText = message;

    } catch (error) {

        console.log(error);

        alert("Something went wrong!");

    }

});
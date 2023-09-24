async function sendWeatherForm(location) {
    try {
        const response = await fetch(`/weather?location=${location}`);
        const json = await response.json();
        return json;
    } catch (e) {
        throw e
    }
}

const formField = document.getElementById("weather-form");
const inputField = document.getElementById("location-input");
const forecastResultEl = document.getElementById("forecast-result");

function setForecastResult(str){
    forecastResultEl.innerHTML = str;
}

function getForecastParsedString(weatherData){
    const result = [
        {
            "prop": "Location",
            "value": `${weatherData.location.name} - ${weatherData.location.region} - ${weatherData.location.country}`
        },
        {
            "prop": "Description",
            "value": weatherData.current["weather_descriptions"].join()
        },
        {
            "prop": "Current Temperature",
            "value": weatherData.current.temperature
        },
        {
            "prop": "Feels Like",
            "value": weatherData.current.feelslike
        },
        {
            "prop": "Humidity",
            "value": weatherData.current.humidity
        },
        {
            "prop": "Wind",
            "value": `${weatherData.current['wind_speed']}  |  ${weatherData.current['wind_dir']}`
        },
    ]
    const resultStr = result.map((el)=> `<b>${el.prop}</b>: ${el.value}`).join("<br><br>");
    return resultStr;
}

formField.addEventListener("submit", async (e) => {
    e.preventDefault();
    setForecastResult("Loading...");
    try {
        const weatherData = await sendWeatherForm(inputField.value);
        const forecastStr = getForecastParsedString(weatherData);
        setForecastResult(forecastStr);
    } catch (e) {
        setForecastResult(e.toString());
    }
});

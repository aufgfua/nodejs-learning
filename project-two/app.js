require("dotenv").config();
const request = require("postman-request");
const { WeatherAPI } = require("./weather");
const { GeolocationAPI } = require("./geolocation");

const weatherApiKey = process.env.WEATHER_API_KEY;
const weather = new WeatherAPI(weatherApiKey);

const geolocationApiKey = process.env.GEOAPIFY_API_KEY;
const geolocation = new GeolocationAPI(geolocationApiKey);

function requestWeather(lat, long) {
    weather.getWeatherData({ lat, long }, (resp) => {
        current = resp.current;
        const temperature = current.temperature;
        const feelsLike = current.feelslike;

        console.log(`It is ${temperature}, and it feels like ${feelsLike}`);
    });
}

function requestWeatherFromLocation(locationText) {
    geolocation.getLocationProps(locationText, (locationProps) => {
        console.log(`${locationProps.name}:`);
        requestWeather(locationProps.lat, locationProps.lon);
    });
}

requestWeatherFromLocation("Canoas, RS");

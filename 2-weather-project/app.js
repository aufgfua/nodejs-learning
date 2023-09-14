require("dotenv").config();

const { WeatherAPI } = require("./utils/weather");
const { GeolocationAPI } = require("./utils/geolocation");

const PROCESS_LOCATION_IDX = 2;
const getLocationFromArgv = () => {
    return process.argv[PROCESS_LOCATION_IDX];
};

const weatherApiKey = process.env.WEATHER_API_KEY;
const weather = new WeatherAPI(weatherApiKey);

const geolocationApiKey = process.env.GEOAPIFY_API_KEY;
const geolocation = new GeolocationAPI(geolocationApiKey);

function requestWeather(lat, long) {
    weather.getWeatherData({ lat, long }, (err, weatherProps) => {
        if (err) {
            console.log(err);
            return;
        }
        current = weatherProps.current;
        const temperature = current.temperature;
        const feelsLike = current.feelslike;

        console.log(`It is ${temperature}, and it feels like ${feelsLike}`);
    });
}

function requestWeatherFromLocation(locationText) {
    geolocation.getLocationProps(locationText, (err, locationProps) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`${locationProps.name}:`);
        requestWeather(locationProps.lat, locationProps.lon);
    });
}

const requestedLocation = getLocationFromArgv();

if (!requestedLocation) {
    return console.log("Please provide a location");
}
requestWeatherFromLocation(requestedLocation);

const querystring = require("querystring");
const request = require("postman-request");

class WeatherAPI {
    BASE_URL = "http://api.weatherstack.com/current";

    reqBaseOptions = {
        access_key: "",
        units: "m",
    };

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.reqBaseOptions.access_key = apiKey;
    }

    getUrl(customOptions = {}) {
        const options = {
            ...this.reqBaseOptions,
            ...customOptions,
        };
        return this.BASE_URL + "?" + querystring.stringify(options);
    }

    getWeatherData({ lat, long }, callback) {
        const url = this.getUrl({ query: `${lat},${long}` });
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                console.log("Something went wrong with the weather call:");
                console.log(error);
            } else if (response.success === false) {
                console.log("Received an error from the weather call:");
                console.log(response.error.info);
            } else {
                callback(response.body);
            }
        });
    }
}

module.exports = { WeatherAPI };

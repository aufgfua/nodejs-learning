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
                callback(
                    "Something went wrong with the weather call",
                    undefined
                );
            } else if (response.success === false) {
                callback("Received an error from the weather call", undefined);
            } else {
                callback(undefined, response.body);
            }
        });
    }
}

module.exports = { WeatherAPI };

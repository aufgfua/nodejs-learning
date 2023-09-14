const querystring = require("querystring");
const https = require("http");

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

    processResponse(error, response, callback) {
        if (error) {
            callback("Something went wrong with the weather call");
            return;
        }
        if (response.success === false) {
            callback("Received an error from the weather call");
            return;
        }
        callback(undefined, response);
    }

    getWeatherData({ lat, long } = {}, callback) {
        const url = this.getUrl({ query: `${lat},${long}` });

        const request = https.request(url, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", () => {
                const finalData = JSON.parse(data);
                this.processResponse(undefined, finalData, callback);
            });
        });

        request.on("error", (error) => {
            this.processResponse(error, undefined, callback);
        });

        request.end();
    }
}

module.exports = { WeatherAPI };

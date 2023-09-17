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

    processResponse(error, response) {
        if (error) {
            throw new Error("Something went wrong with the weather call");
        }
        if (response.success === false) {
            console.log(response);
            throw new Error("Received an error from the weather call");
        }
        return response;
    }

    getWeatherData({ lat, lon } = {}) {
        return new Promise((resolve, reject) => {
            const url = this.getUrl({ query: `${lat},${lon}` });
            console.log(url);
            const request = https.request(url, (resp) => {
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });

                resp.on("end", () => {
                    try {
                        const finalData = JSON.parse(data);
                        resolve(this.processResponse(undefined, finalData));
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            request.on("error", (error) => {
                try {
                    resolve(this.processResponse(error, undefined));
                } catch (error) {
                    reject(error);
                }
            });

            request.end();
        });
    }
}

module.exports = WeatherAPI;

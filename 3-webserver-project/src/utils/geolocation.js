const querystring = require("querystring");
const https = require("https");

class GeolocationAPI {
    BASE_URL = "https://api.geoapify.com/v1/geocode/search";

    reqBaseOptions = {
        apiKey: "",
    };

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.reqBaseOptions.apiKey = apiKey;
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
            throw new Error("Something went wrong with the location call");
        }
        if (response.error) {
            console.log(response);
            throw new Error("Received an error from the geolocation call");
        }
        if (!response.features || !response.features.length) {
            throw new Error("No location was found during geolocation call");
        }

        return response;
    }

    getLocationData(locationText) {
        return new Promise((resolve, reject) => {
            const url = this.getUrl({ text: locationText });

            const request = https.request(url, (resp) => {
                let data = "";

                resp.on("data", (chunk) => {
                    data += chunk;
                });

                resp.on("end", () => {
                    try {
                        const responseData = JSON.parse(data);
                        resolve(this.processResponse(undefined, responseData));
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

    async getLocationProps(locationText) {
        const locationData = await this.getLocationData(locationText);

        const cityProps = locationData.features[0].properties;

        const locationLatLon = {
            lat: cityProps.lat,
            lon: cityProps.lon,
            name: cityProps.formatted,
        };

        return locationLatLon;
    }
}

module.exports = GeolocationAPI;

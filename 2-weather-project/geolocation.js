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

    processResponse(error, response, callback) {
        if (error) {
            callback("Something went wrong with the location call");
            return;
        }
        if (response.error) {
            callback("Received an error from the geolocation call");
            return;
        }
        if (!response.features || !response.features.length) {
            callback("No location was found during geolocation call");
            return;
        }

        callback(undefined, response);
    }

    getLocationData(locationText, callback) {
        const url = this.getUrl({ text: locationText });

        const request = https.request(url, (resp) => {
            let data = "";

            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", () => {
                const responseData = JSON.parse(data);
                this.processResponse(undefined, responseData, callback);
            });
        });

        request.on("error", (error) => {
            this.processResponse(error, undefined, callback);
        });

        request.end();
    }

    getLocationProps(locationText, callback) {
        this.getLocationData(locationText, (error, locationData) => {
            if (error) {
                callback(error, undefined);
                return;
            }
            const cityProps = locationData.features[0].properties;

            const locationLatLon = {
                lat: cityProps.lat,
                lon: cityProps.lon,
                name: cityProps.formatted,
            };

            callback(error, locationLatLon);
        });
    }
}

module.exports = { GeolocationAPI };

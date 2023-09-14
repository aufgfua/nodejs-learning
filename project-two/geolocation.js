const querystring = require("querystring");
const request = require("postman-request");

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

    getLocationData(locationText, callback) {
        const url = this.getUrl({ text: locationText });
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                callback(
                    "Something went wrong with the location call",
                    undefined
                );
            } else if (response.error) {
                callback(
                    "Received an error from the geolocation call",
                    undefined
                );
            } else if (
                !response.body.features ||
                !response.body.features.length
            ) {
                callback(
                    "No location was found during geolocation call",
                    undefined
                );
            } else {
                callback(undefined, response.body);
            }
        });
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

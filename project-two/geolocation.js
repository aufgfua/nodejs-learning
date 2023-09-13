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
                console.log("Something went wrong with the location call:");
                console.log(error);
            } else if (response.error) {
                console.log("Received an error from the geolocation call:");
                console.log(response.message);
            } else if (
                !response.body.features ||
                !response.body.features.length
            ) {
                console.log("No location was found during geolocation call:");
                console.log(response.message);
            } else {
                callback(response.body);
            }
        });
    }

    getLocationProps(locationText, callback) {
        this.getLocationData(locationText, (locationData) => {
            const cityProps = locationData.features[0].properties;

            const locationLatLon = {
                lat: cityProps.lat,
                lon: cityProps.lon,
                name: cityProps.formatted,
            };

            callback(locationLatLon);
        });
    }
}

module.exports = { GeolocationAPI };

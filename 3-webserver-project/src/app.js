const path = require("path");
require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const GeolocationAPI = require("./utils/geolocation");
const WeatherAPI = require("./utils/weather");

const geolocationApiKey = process.env.GEOAPIFY_API_KEY;
const geolocation = new GeolocationAPI(geolocationApiKey);

const weatherApiKey = process.env.WEATHER_API_KEY;
const weather = new WeatherAPI(weatherApiKey);

const publicFolder = path.join(__dirname, "../public");
const templateFolder = path.join(__dirname, "../templates");
const viewsFolder = path.join(templateFolder, "views");
const partialsFolder = path.join(templateFolder, "partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsFolder);
hbs.registerPartials(partialsFolder);

app.use(express.static(publicFolder));

app.get("/", async (req, res) => {
    try {
        const { lat, lon, name } = await geolocation.getLocationProps("Canoas");
        res.send(await weather.getWeatherData({ lat, lon }));
    } catch (error) {
        res.send(error.toString());
    }
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        content: "Generic content not found",
        footer: "Generic Page Accessed Footer",
    });
});

app.listen(3000, (body) => {
    console.log("Server running on 3000");
});

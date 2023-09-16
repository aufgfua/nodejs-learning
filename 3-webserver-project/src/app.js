const path = require("path");

const express = require("express");
const hbs = require("hbs");

const publicFolder = path.join(__dirname, "../public");
const templateFolder = path.join(__dirname, "../templates");
const viewsFolder = path.join(templateFolder, "views");
const partialsFolder = path.join(templateFolder, "partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsFolder);
hbs.registerPartials(partialsFolder);

app.use(express.static(publicFolder));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Base Page",
        content: "Base Page Content",
        footer: "Footer content",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        content: "Helpful Content",
        footer: "Footer content",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help 404",
        content: "Help content not found",
        footer: "Help Page Accessed Footer",
    });
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

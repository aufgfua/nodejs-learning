const path = require("path");

const express = require("express");

const publicFolder = path.join(__dirname, "../public");
const app = express();

app.set("view engine", "hbs");
app.use(express.static(publicFolder));

app.get("/", (req, resp) => {
    resp.render("index", { title: "HBS Dynamic Title" });
});

app.get("/help", (req, resp) => {
    resp.send("help");
});

app.get("/about", (req, resp) => {
    resp.send("<h1>about</h1>");
});

app.get("/weather", (req, resp) => {
    resp.send({
        name: "name",
        old: "old",
    });
});

app.listen(3000, (body) => {
    console.log("Server running on 3000");
});

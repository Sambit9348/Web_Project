const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../Project");
const template_path = path.join(__dirname, "./Templates/views");
const partials_path = path.join(__dirname, "./Templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

app.get("", (req, res) => {
    res.render("Index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg: "Opps! Page Not Found"
    });
});

app.listen(port, () => {
    console.log(`Listening to the port at ${port}`);
});
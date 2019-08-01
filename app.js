const express = require("express");

const debug = require("debug")("app");
const exphbs = require("express-handlebars");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// call routes
const indexRoute = require("./routes/indexRoute");
const adminPanel = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");
const loginRoute = require("./routes/loginRoute");
// end routes

const app = express();

const port = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/labourforce', { useNewUrlParser: true });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.enable("view cache");
app.use(express.static(path.join(__dirname, "/public")));
app.use(
    "/css",
    express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
    "/plugins",
    express.static(path.join(__dirname, "/node_modules/plugins"))
);
app.use(
    "/images",
    express.static(path.join(__dirname, "/node_modules/images"))
);
app.use("/js", express.static(path.join(__dirname, "/node_modules/js")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/css")));

// use routes
app.use("/", indexRoute);
app.use("/admin", adminPanel);
app.use("/register", authRoute);
app.use("/login", loginRoute);

// end use routes

app.listen(port, () => {
    debug(`app listening to port ${chalk.green(port)}`);
});
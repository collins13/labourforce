// packages
const express = require("express");
const debug = require("debug")("app");
const exphbs = require("express-handlebars");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// end packages

// call routes
const indexRoute = require("./routes/indexRoute");
const adminPanel = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const providerRoute = require("./routes/profile");
// end routes

const app = express();

const port = process.env.PORT || 3000;
mongoose
    .connect("mongodb://localhost/labourforce", { useNewUrlParser: true })
    .then(result => {
        console.log({ result: "connected" });
    })
    .catch(err => {
        console.log(err);
    });
// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
app.engine("handlebars", exphbs({
    defaultLayout: "main"

}));
app.set("view engine", "handlebars");
app.enable("view cache");
app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);

// end middleware

// serving static files
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
// end serving static files

// use routes
app.use("/", indexRoute);
app.use("/admin", adminPanel);
app.use("/register", require("./routes/users"));
app.use("/signup", require("./routes/users"));
app.use("/login", loginRoute);
app.use("/profile", providerRoute);

// end use routes

app.listen(port, () => {
    debug(`app listening to port ${chalk.green(port)}`);
});
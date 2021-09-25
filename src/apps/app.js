const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");


// const rounter = express.Router;
//config view engine
app.set("view engine", config.get("app").view_engine);
app.set("views", config.get("app").views_folder);
// config static folder
app.use("/static", express.static(config.get("app").static_folder));
// get form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// config session
app.set('trust proxy', 1) // trust first proxy
    // app.set('trust proxy', 1) // trust first proxy
const sessionDriver = (session({
    secret: config.get("app").session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.get("app").session_secure }
}));
app.use(sessionDriver);
//cart
// const session = require("express-session");

app.use(require("../apps/middlewares/cart"));
//share
app.use(require("../apps/middlewares/share"));

// using routet web
app.use(require("../rounters/web"));
app.session = sessionDriver;
module.exports = app;
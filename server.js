const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const errorHandlers = require("./handlers/errorHandlers");
const cors = require("cors");
require("./handlers/passport");
require("dotenv").config();
var api = require("./routes/api");

var app = express();
var port = process.env.API_PORT || 8080;

mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + process.env.DB_URI);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
	console.error(`${err.message}`);
});

app.use(express.static(path.join(__dirname, "public")));

// cookie-parser
app.use(cookieParser(process.env.SECRET || "sekretny_sekret_tworczosc_szalona_panda"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// userController.validateRegister
app.use(expressValidator());


// Sessions
app.use(session({
	cookie: {maxAge: 10 * 60 * 60 * 1000}, // make it short for debugging reasons
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// promisify
// app.use((req, res, next) => {
// 	req.login = promisify(req.login, req);
// 	next();
// });

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept");
	res.setHeader("Cache-Control", "no - cache");
	next();
});

// // cors for session
app.use(cors({
    // origin:['http://localhost:3000'],
    methods:['GET','POST','PUT'],
    credentials: true // enable set cookie
}));

app.use("/api", api);

app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);

app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
module.exports = app;

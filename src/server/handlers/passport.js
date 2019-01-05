const passport = require("passport");
var User = require("../models/userModel");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
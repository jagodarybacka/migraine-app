
const User = require("../models/userModel");
const Report = require("../models/reportModel");
const promisify = require('es6-promisify');
const mongoose = require("mongoose");
var passport = require("passport");


exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('username');
	req.checkBody('username', 'You must supply a name!').notEmpty();
	req.checkBody('email', 'That Email is not valid!').isEmail();
	req.sanitizeBody('email').normalizeEmail({
	  gmail_remove_dots: false,
	  remove_extension: false,
	  gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
	  res.json({body: req.body, errors: errors });
	  return;
	}
	next(); // there were no errors!
  };

exports.register = async (req, res, next) => {
	const user = new User({username: req.body.username, email: req.body.email });
	await User.register(user, req.body.password, function(err, user) {
		if (err) {
			return res.json({errors : [err.message]});
		}
		passport.authenticate("local")(req, res, function() {
			if (err) {
				console.log("error",err);
				return next(err);
			}
			return res.json({
				redirectURL:"/home",
				userId: user._id,
				userMail: user.email,
				userName: user.username
			});
		});
	});
};

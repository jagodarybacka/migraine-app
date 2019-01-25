
const User = require("../models/userModel");
var passport = require("passport");
var crypto = require('crypto');
const nodemailer = require("nodemailer");
var async = require('async');
var tools = require('../helpers/stats.js');


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
		console.log(errors);
	  return res.json({body: req.body, errors: errors });
	}
	next(); // there were no errors!
  };

exports.register = async (req, res, next) => {
	const user = new User({username: req.body.username, email: req.body.email, registration_date: new Date() });
	await User.register(user, req.body.password, function(err, user) {
		if (err) {
			console.log("error",err);
			return res.json({errors : [err.message]});
		}
		passport.authenticate("local", {session: true}, function(info,user,err) {
			if (err) {
				console.log("error",err);
				return res.json({errors : [err.message]});
			}
			req.logIn(user,function(err){
				if(err) { 
					console.log("error",err);
					return res.json({errors : [err.message]});
				}
				req.session.userId = req.user._id;
				res.json(
					{redirectURL:"/home",
					userId: req.user._id,
					userMail: req.user.email,
					userName: req.user.username
				});
			});
		})(req, res, next);
	});
};

exports.change_password = (req, res, next) => {
	const user = req.session.userId;
	User.findById(user)
	.exec(function(err, sanitizedUser){
		if(err) {
			console.log("error",err);
			return res.json({errors : [err.message]});
		}
    if (sanitizedUser){
			sanitizedUser.changePassword(req.body.oldPassword, req.body.password, function(err){
					if(err) {
						console.log("error",err);
						res.status(204)
						res.send([err.message]);
						return;
					}
					sanitizedUser.save();
					res.status(200);
					res.send('Password change successful');
					return;
			});
    } else {
				res.status(401);
				res.send('This user does not exist');
				return;
    }
	})
}

exports.change_user_data = (req, res, next) => {
	const user = req.session.userId;
	User.findById(user)
	.exec(function(err, user){
		if(err) {
			console.log("error",err);
			return res.json({errors : [err.message]});
		}
    if (user){
			if(req.body.email){
				user.email = req.body.email;
			}
			if(req.body.username){
				user.username = req.body.username;
			}
			user.save(function(err, saved_user) {
				if(err){
					return res.json({errors : [err.message]});
				}
				req.logIn(saved_user,function(err){
					if(err) { 
						console.log(err);
						return res.json({errors : [err.message]});
					}
					req.session.userId = req.user._id;
					res.json(
						{user: { username: saved_user.username, email: saved_user.email },message:'User data change successful'}
					);
				});
			});
    } else {
			res.status(401);
			res.send('This user does not exist');
			return;
    }
	})
}

exports.forgotten_password = (req, res, next) => {
	async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
				if(err) {
					console.log(err);
					return res.json({errors : [err.message]});
				}
        if (!user) {
			res.status(401);
          	return res.send('No account with that email address exists.');
        }
        user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
			var auth = {
				type: 'oauth2',
				user: process.env.EMAIL,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
			};
      var smtpTransport = nodemailer.createTransport( {
        service: 'gmail',
        auth: auth
      });
      var mailOptions = {
				to: user.email,
				// to: 'zuzanna.szymanda@gmail.com',
        from: 'passwordreset@migraine-app.com',
        subject: 'Migraine App Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.origin + '/reset/' + token + '\n\n' + //req.headers.host changed to req.headers.origin
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
				if(err) {
					console.log(err);
					return res.json({errors : [err.message]});
				}
        res.json({'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
        done(err, 'done');
      });
    }
  ])
}

exports.reset_password = (req, res, next) => {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gte: Date.now() } }, function(err, user) {
			if(err) {
				console.log(err);
				return res.json({errors : [err.message]});
			}
			if (!user) {
				res.status(401);
				res.send('Reset token invalid or has expired');
				return;
			}
			user.setPassword(req.body.password, function(err){
				if(err) {
					console.log(err);
					return res.json({errors : [err.message]});
				}
				user.save(function(err, user) {
          if(err){
						console.log(err);
						return res.json({errors : [err.message]});
					}
					res.json({'message':'Password change successful'});
					return;
        });
		});
		});
}

exports.save_forecast = (req, res, next) => {
	const userId = req.session.userId;
	if(!req.body.weather_forecast || req.body.weather_forecast.message) {
		return res.json({errors : "No forecast to save"}); 
	}
	const forecast = req.body.weather_forecast;
	User.findById(userId)
	.exec( function(err, found_user) {
		if (err) { 
			console.log(err);
			return res.json({errors : [err.message]});
		 }
		if (found_user) {
			if(found_user.weather_forecasts) {
				const forecasts = tools.modifyForecasts(found_user.weather_forecasts, forecast);
				User.findByIdAndUpdate(userId,  { $set: { weather_forecasts: forecasts}}, {}, function (err,mod_user) {
					if (err) { 
						return res.json({errors : [err.message]}); 
					}
					console.log('Forecast saved');
					return res.json("Forecast saved");
				});
			} else {
				const forecasts = tools.modifyForecasts([], forecast);
				User.findByIdAndUpdate(userId,  { weather_forecasts: forecasts}, {}, function (err,mod_user) {
					if (err) { 
						return res.json({errors : [err.message]}); 
					}
					console.log('Forecast saved');
					return res.json("Forecast saved");
				});
			}
		} else {
			res.status(401);
			res.send('This user does not exist');
			return;
		}
	});
}

exports.get_forecast = (req, res, next) => {
	const userId = req.session.userId;
	const startTime = new Date(req.params.start);
	const endTime = new Date(req.params.end);
	const start = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0,0,0);
  	const end = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(),23,59,0);
	User.findById(userId)
	.exec( function(err, found_user) {
		if (err) { 
			console.log(err);
			return res.json({errors : [err.message]});
		}
		if (found_user) {
			if(found_user.weather_forecasts && found_user.weather_forecasts.length > 0){
				const forecasts = tools.getForecasts(found_user.weather_forecasts, start, end);
				if(forecasts.length === 0){
					res.status(204);
					res.send("No content");
					return;
				}
				else {
					return res.json(forecasts);
				}		
			}
			else {
				res.status(204);
				res.send("No content");
				return;
			}	
		} else {
			res.status(401);
			res.send('This user does not exist');
			return;
		}
	});
}

exports.clear_forecast = (req,res,next) => {
		const userId = req.session.userId;
		User.findById(userId)
		.exec( function(err, found_user) {
			if (err) { 
				console.log(err);
				return res.json({errors : [err.message]});
			 }
			if (found_user) {
				User.findByIdAndUpdate(userId,  { $set: { weather_forecasts: []}}, {}, function (err,mod_user) {
					if (err) { 
						console.log(err);
						return res.json({errors : [err.message]});
					 }
					return res.json("Forecast cleared");
				});
			}
		});
}

exports.add_custom_answer = (req,res,next) => {
	const userId = req.session.userId;
	const option = req.body.option;
	const value = req.body.value;
	User.findById(userId)
	.exec( function(err, found_user) {
		if(err) {
			console.log(err);
			return res.json({errors : [err.message]});
		}
		if(found_user) {
			if(found_user.custom_answers && found_user.custom_answers[option]){
				const answers = found_user.custom_answers[option].map((answer) => answer.toLowerCase());
				if(!answers.includes(value.toLowerCase())){
					found_user.custom_answers[option].push(value);
					found_user.save(function(err) {
						if (err) { 
							console.log(err);
							return res.json({errors : [err.message]});
							}
							return res.json({confirm:"Answer saved"});
					} )
				} else {
					return res.json({info: "Answer already in database"});
				}
			}
		} else {
			res.status(401);
			res.send('This user does not exist');
			return;
		}
	})
}

exports.get_custom_answers = (req,res,next) => {
	const userId = req.session.userId;
	User.findById(userId, 'custom_answers _id')
	.exec( function(err, found_user) {
		if(err) {
			console.log(err);
			return res.json({errors : [err.message]});
		}
		if(found_user) {
			// console.log(found_user);
			if(found_user.custom_answers) {
				res.json(found_user.custom_answers);
			} else {
				res.status(204);
				res.send('No content');
				return;
			}
		} else {
			res.status(401);
			res.send('This user does not exist');
			return;
		}
	})
}

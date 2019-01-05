
const User = require("../models/userModel");
var passport = require("passport");
var crypto = require('crypto');
const nodemailer = require("nodemailer");
var async = require('async');


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

exports.change_password = (req, res, next) => {
	const user = req.session.userId;
	User.findById(user)
	.exec(function(err, sanitizedUser){
		if(err) {
			return res.json({errors : [err.message]});
		}
    if (sanitizedUser){
			sanitizedUser.changePassword(req.body.oldPassword, req.body.password, function(err){
					if(err) {
						return res.status(204).send([err.message]);
					}
					sanitizedUser.save();
					res.status(200).send('Password change successful');
			});
    } else {
        res.status(404).send('This user does not exist');
    }
	})
}

exports.change_user_data = (req, res, next) => {
	const user = req.session.userId;
	User.findById(user)
	.exec(function(err, user){
		if(err) {
			return res.json({errors : [err.message]});
		}
    if (user){
			//EMAIL CHANGE UPDATE SESSION?????????
			if(req.body.email){
				user.email = req.body.email;
			}
			if(req.body.username){
				user.username = req.body.username;
			}
			user.save(function(err, user) {
				if(err){
					return res.json({errors : [err.message]});
				}
				console.log(user);
				res.json({'message':'User data change successful'});
			});
    } else {
        res.status(404).send('This user does not exist');
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
					return res.json({errors : [err.message]});
				}
        if (!user) {
          return res.status(404).send('No account with that email address exists.');
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
        res.json({'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
        done(err, 'done');
      });
    }
  ])
}

exports.reset_password = (req, res, next) => {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gte: Date.now() } }, function(err, user) {
			if(err) {
				return res.json({errors : [err.message]});
			}
			if (!user) {
				return res.status(404).send('Reset token invalid or has expired');
			}
			user.setPassword(req.body.password, function(err){
				if(err) {
					return res.json({errors : [err.message]});
				}
				user.save(function(err, user) {
          if(err){
						return res.json({errors : [err.message]});
					}
					res.json({'message':'Password change successful'});
        });
		});
		});
}

const User = require("../models/userModel");
const promisify = require('es6-promisify');
const mongoose = require("mongoose");

//GET User data
exports.user_data = function(req,res,next) {
	userId = req.session.userId;
	User.findById(userId, 'username _id email')
	.populate('reports')
	.exec(function(err,found_user){
		if(err) {return next(err);}
		console.log('user');
		console.log(found_user);
		res.json(found_user);
	});
	//res.json({message: "Not implemented - user list!"});
};

exports.validateRegister = (req, res, next) => {
	console.log(req.body);
	req.sanitizeBody('username');
	console.log(req.body.username);
	req.checkBody('username', 'You must supply a name!').notEmpty();
	req.checkBody('email', 'That Email is not valid!').isEmail();
	req.sanitizeBody('email').normalizeEmail({
	  gmail_remove_dots: false,
	  remove_extension: false,
	  gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  
	const errors = req.validationErrors();
	console.log(errors);
	if (errors) {
	  req.flash('error', errors.map(err => err.msg));
	  res.json({body: req.body, flashes: req.flash() });
	  return; 
	}
	next(); // there were no errors!
  };
  
  exports.register = async (req, res, next) => { 	
		
		User.findOne({ $or:[
			{username: req.body.username},
			{email:req.body.email}]},
			 function(err, user) {
					if (user) {
							req.flash('error', 'user already exist');
	  						res.json({body: req.body, flashes: req.flash() });
							return;

					}
			}
	);
	const user = new User({username: req.body.username, email: req.body.email });
	const register = promisify(User.register, User);
	await register(user, req.body.password);
	next(); 
  };

  // Login GET
exports.user_login_get = function(req, res, next) {
};

//Login POST
exports.user_login_post = function(req , res, next){
};


exports.user_logout_get = function(req,res,next) {
};


  
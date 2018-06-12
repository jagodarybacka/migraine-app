
const User = require("../models/userModel");
const Report = require("../models/ReportModel");
const promisify = require('es6-promisify');
const mongoose = require("mongoose");

//GET User data
exports.user_data = function(req,res,next) {
	userId = req.session.userId;
	User.findById(userId, 'username _id email')
	//.populate('reports')
	.exec(function(err,found_user){
		if(err) {return next(err);}
		if(found_user)
		{
			console.log('user');
			console.log(found_user);
			Report.find({user: found_user._id}).sort({start_date: -1})
			.exec(function(err,found_reports){
				if(err) {return next(err);}
				console.log('reports');
				console.log(found_reports);
				res.json(found_reports);
			});
		}
	});
	//res.json({message: "Not implemented - user list!"});
};

exports.validateRegister = (req, res, next) => {
	console.log(req.body);
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
			{email:req.body.email}]})
			 .exec(function(err, user) {
				 if (err) { return next(err); }
					if (user) {
							console.log('user',user);
							req.flash('error', 'user already exist');
	  						res.json({body: req.body, flashes: req.flash() });
							return;
					}
					else {
						const user = new User({username: req.body.username, email: req.body.email });
						User.register(user, req.body.password, function(err,user){
						 if(err) {
							 req.flash('error', err.msg);
						 	 res.json({body: req.body, flashes: req.flash() });
						 	 return;
						 }
						 next();
						});
					}
			});
  };

var mongoose = require("mongoose");
//var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
// User Schema

var UserSchema = new Schema({
	username: {
		type: String,
		required: "Please supply a name",
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: "Please Supply an email address"
	},
	reports: [{
		type: Schema.ObjectId,
		ref: 'Report'
	}],
	// resetPasswordToken: String,
	// resetPasswordExpires: Date,
    // isAdmin: {type: Boolean, default: false}
});
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHandler);
var User = module.exports = mongoose.model("User", UserSchema);

// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(newUser.password, salt, function(err, hash) {
// 			newUser.password = hash;
// 			newUser.save(callback);
// 		});
// 	});
// };

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
// 		if(err) throw err;
// 		callback(null, isMatch);
// 	});
// };

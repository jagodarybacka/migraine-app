var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

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
	registration_date: {
		type: Date
	},
	reports: [{
		type: Schema.ObjectId,
		ref: 'Report'
	}],
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	weather_forecasts: {
		type: Object
	},
	custom_answers: {
		localization: [{ type: String }],
		aura: [{ type: String }],
		medicines: [{ type: String }],
		triggers: [{ type: String }],
		reliefs: [{ type: String }]

	}
});
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", UserSchema);
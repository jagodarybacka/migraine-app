var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
user: {
    type: Schema.ObjectId, 
    ref: 'User', 
    required: true
},
start: {
    type: Date, 
    required: true
},
end: {
    type: Date, 
    required: true
},
menstruation: {
    type: String, 
    enum: ['Yes', 'Coming Soon', 'No'], 
    required: true
},
localization: {
    type: String,
    enum: ['Home', 'Outside', 'Transit', 'Work', 'Bed','School'],
    required: true },
mood: {
    type: String,
    enum: ['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad'],
    required: true
},
pain: {
    type: String,
    enum: ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'],
    required: true
},
medicines: [{
    type: String,
    required: true
}],
triggers: [{
    type: String,
    required: true
}]
});

module.exports = mongoose.model('Report', ReportSchema);

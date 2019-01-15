var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
user: {
    type: Schema.ObjectId, 
    ref: 'User', 
    required: true
},
start_date: {
    type: Date, 
    //default: Date.now()
    required: true
},
end_date: {
    type: Date, 
    // required: true
},
start_time: {
    type: String,
},
end_time: {
    type: String,
},
menstruation: {
    type: String, 
    enum: ['Yes', 'Coming Soon', 'No'], 
    // required: true
},
localization: {
    type: String,
    enum: ['Home', 'Outside', 'Transit', 'Work', 'Bed','School'],
    // required: true 
},
mood: {
    type: String,
    enum: ['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad'],
    // required: true
},
pain: {
    type: String,
    enum: ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'],
    // required: true
},
aura: [{
    type: String,
    enum: ['Nausea', 'Visual Disturbances', 'Hypersensitive To Light', 'Hypersensitive To Sound', 'Hypersensitive To Smell', 'No'],
    // required: true
}],
sleep_duration: {
    type: Number,
    // required: true
},
pressure: {
    type: String,
    // required: true
},
medicines: [{
    type: String,
    // required: true
}],
triggers: [{
    type: String,
    // required: true
}],
notes: {
    type: String,
    // required: true
},
reliefs: [{
    type: String,
}],
weather: {
    type: Object
}
});

module.exports = mongoose.model('Report', ReportSchema);

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
    required: true
},
end_date: {
    type: Date, 
},
start_time: {
    type: String,
},
end_time: {
    type: String,
},
menstruation: {
    type: String, 
    // enum: ['Yes', 'Coming Soon', 'No', ""], 
},
localization: {
    type: String,
    // enum: ['Home', 'Outside', 'Transit', 'Work', 'Bed','School'],
},
mood: {
    type: String,
    enum: ['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad'],
},
pain: {
    type: String,
    enum: ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'],
},
aura: [{
    type: String,
    // enum: ['Nausea', 'Visual Disturbances', 'Hypersensitive To Light', 'Hypersensitive To Sound', 'Hypersensitive To Smell', 'No'],
}],
sleep_duration: {
    type: Number,
},
pressure: {
    type: String,
},
medicines: [{
    type: Object,
}],
triggers: [{
    type: String,
}],
notes: {
    type: String,
},
reliefs: [{
    type: Object,
}],
weather: {
    type: Object
}
});

module.exports = mongoose.model('Report', ReportSchema);
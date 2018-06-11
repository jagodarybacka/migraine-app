const User = require("../models/userModel");
var Report = require("../models/ReportModel");
var mongoose = require('mongoose');
var async = require('async');


// Display report detail
exports.report_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
    report: function(callback) {

      Report.findById(id)
        .exec(callback);
    }
	}, function(err, results) {
    if (err) { return next(err); }
	res.json(results);
  });

};

// Create Report
exports.report_add = function(req, res,next) {
   userId = req.session.userId;
    var report = new Report({
        user: userId,
        // user: req.body.userId,
        start: req.body.start,
        end: req.body.end,
        menstruation: req.body.menstruation,
        localization: req.body.localization,
        mood: req.body.mood,
        pain: req.body.pain,
        medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
        triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers
         });
    report.save(function (err,saved) {
        if (err) { return next(err); }
        res.json(saved);
    });
};

// Delete Report
exports.report_delete = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    Report.findById(id)
    .exec( function(err, found_report) {
        if (err) { return next(err); }
		Report.findByIdAndRemove(found_report._id, function deleteReport(err, delreport) {
                if (err) { return next(err); }
                res.json(delreport);
            });
    });
};

// Change Report
exports.report_update = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    userId = req.session.userId;
    Report.findById(id)
    .exec( function(err, found_report) {
            if (err) { return next(err); }
            if (found_report) {
                var report = new Report({
                    user: userId,
                    //user: req.body.userId,
                    start: req.body.start,
                    end: req.body.end,
                    menstruation: req.body.menstruation,
                    localization: req.body.localization,
                    mood: req.body.mood,
                    pain: req.body.pain,
                    medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
                    triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers,
                    _id: id
                     });
            Report.findByIdAndUpdate(id, report, {}, function (err,mod_report) {
                if (err) { return next(err); }
                res.json(report);
            });
        }
    });
};

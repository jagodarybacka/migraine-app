const User = require("../models/userModel");
var Report = require("../models/reportModel");
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

//GET User reports
exports.reports_all = function(req,res,next) {
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

exports.report_recent = function(req,res,next) {
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
				res.json(found_reports[0]);
			});
		}
	});
};

// Create Report
exports.report_add = function(req, res,next) {
   userId = req.session.userId;
   start_time = req.body.start_time.split(":");
   start_date = req.body.start_date.split("-");
   if(req.body.end_date && req.body.end_time){
    end_time = req.body.end_time.split(":");
    end_date = req.body.end_date.split("-");
    start = new Date(Number(start_date[0]),Number(start_date[1])-1,Number(start_date[2]),Number(start_time[0]),Number(start_time[1]),0);
    end = new Date(Number(end_date[0]),Number(end_date[1])-1,Number(end_date[2]),Number(end_time[0]),Number(end_time[1]),0);
    var report = new Report({
        user: userId,
        start_date: start,
        end_date: end,
        menstruation: req.body.menstruation,
        localization: req.body.localization,
        mood: req.body.mood,
        pain: req.body.pain,
        medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
        triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers
         });
    report.save(function (err,saved) {
        if (err) { return next(err); }
        console.log(saved);
        res.json(saved);
    });
   }
   else {
    start = new Date(Number(start_date[0]),Number(start_date[1])-1,Number(start_date[2]),Number(start_time[0]),Number(start_time[1]),0);
    var report = new Report({
        user: userId,
        start_date: start,
        menstruation: req.body.menstruation,
        localization: req.body.localization,
        mood: req.body.mood,
        pain: req.body.pain,
        medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
        triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers
         });
    report.save(function (err,saved) {
        if (err) { return next(err); }
        console.log(saved);
        res.json(saved);
    });
   }
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

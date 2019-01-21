const User = require("../models/userModel");
var Report = require("../models/reportModel");
var mongoose = require('mongoose');
var async = require('async');
var tools = require('../helpers/stats.js');

// Display report detail
exports.report_detail = function(req, res, next) {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
	async.parallel({
    report: function(callback) {

      Report.findById(id)
        .exec(callback);
    }
	}, function(err, results) {
    if (err) { 
        return res.json({errors : [err.message]});
    }
    res.json(results);
    return;
  });
};

//GET User reports
exports.reports_all = function(req,res,next) {
	const userId = req.session.userId;
	User.findById(userId, 'username _id email')
	.exec(function(err,found_user){
		if(err) {
            return res.json({errors : [err.message]});
        }
		if(found_user)
		{
			Report.find({user: found_user._id}).sort({start_date: -1})
			.exec(function(err,found_reports){
				if(err) {
                    return res.json({errors : [err.message]});
                }
                res.json(found_reports);
                return;
			});
		} else {
            res.status(404);
            res.send('This user does not exist');
            return;
        }
	});
};

exports.reports_period = function(req,res,next) {
    const userId = req.session.userId;
    const startTime = new Date(req.params.start);
    const endTime = new Date(req.params.end);
	const start = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0,0,0);
    const end = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(),23,59,0);
    Report.find({user: userId, start_date : { $gte: start}, end_date : { $lte: end } }, '_id start_date end_date pain')
    .exec(function(err,found_reports){
        if(err) {
            return res.json({errors : [err.message]});
        }
        if(found_reports.length === 0){
            res.status(204);
            res.send("No content");
            return;
        }
        else {
            res.json(found_reports);
            return;
        }
    });
    // res.json("not implemented yet");
}

exports.report_recent = function(req,res,next) {
	const userId = req.session.userId;
	User.findById(userId, 'username _id email')
	.exec(function(err,found_user){
		if(err) {
            return res.json({errors : [err.message]});
        }
		if(found_user)
		{
			Report.find({user: found_user._id}).sort({start_date: -1})
			.exec(function(err,found_reports){
				if(err) {
                    return res.json({errors : [err.message]});
                }
                if(found_reports.length === 0) {
                    res.status(204);
                    res.send("No content");
                    return;
                } else {
                    res.json(found_reports[0]);
                    return;
                }
			});
		} else {
            res.status(404);
            res.send('This user does not exist');
            return;
        }
	});
};

// Create Report
exports.report_add = function(req, res,next) {
   const userId = req.session.userId;
   const start_time = req.body.start_time.split(":");
   const start_date = req.body.start_date.split("-");
   const start = new Date(Number(start_date[0]),Number(start_date[1])-1,Number(start_date[2]),Number(start_time[0]),Number(start_time[1]),0);
   if(req.body.end_date && req.body.end_time) {
    const end_time = req.body.end_time.split(":");
    const end_date = req.body.end_date.split("-"); 
    const end = new Date(Number(end_date[0]),Number(end_date[1])-1,Number(end_date[2]),Number(end_time[0]),Number(end_time[1]),0);
    var report = new Report({
        user: userId,
        start_date: start,
        end_date: end,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        menstruation: req.body.menstruation || undefined,
        localization: req.body.localization || undefined,
        mood: req.body.mood || undefined,
        pain: req.body.pain || undefined,
        medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
        triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers,
        aura: (typeof req.body.aura==='undefined') ? [] : req.body.aura,
        pressure: req.body.pressure || undefined,
        sleep_duration: req.body.sleep_duration || undefined,
        notes: req.body.notes || undefined,
        reliefs: (typeof req.body.reliefs==='undefined') ? [] : req.body.reliefs,
        weather: req.body.weather || {}
        });
    report.save(function (err,saved) {
        if (err) { return next(err); }
        return res.json(saved);
    });
   }
   else {
    var report = new Report({
        user: userId,
        start_date: start,
        start_time: req.body.start_time,
        menstruation: req.body.menstruation || undefined,
        localization: req.body.localization || undefined,
        mood: req.body.mood || undefined,
        pain: req.body.pain || undefined,
        medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
        triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers,
        aura: (typeof req.body.aura==='undefined') ? [] : req.body.aura,
        pressure: req.body.pressure || undefined,
        sleep_duration: req.body.sleep_duration || undefined,
        notes: req.body.notes || undefined,
        reliefs: (typeof req.body.reliefs==='undefined') ? [] : req.body.reliefs,
        weather: req.body.weather || {}
         });
    report.save(function (err,saved) {
        if (err) { 
            return res.json({errors : [err.message]});
         }
        return res.json(saved);
    });
   }
};

// Delete Report
exports.report_delete = function(req, res, next) {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    Report.findById(id)
    .exec( function(err, found_report) {
        if (err) { return next(err); }
		Report.findByIdAndRemove(found_report._id, function deleteReport(err, delreport) {
                if (err) {  
                    return res.json({errors : [err.message]});
                }
                return res.json(delreport);
            });
    });
};

// Change Report
exports.report_update = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id.trim());
    const userId = req.session.userId;
    const start_time = req.body.start_time.split(":");
    const start_date = req.body.start_date.split("-");
    const start = new Date(Number(start_date[0]),Number(start_date[1])-1,Number(start_date[2]),Number(start_time[0]),Number(start_time[1]),0);
   
    let data ={
        $set: {
            user: userId,
            //user: req.body.userId,
            start_time: req.body.start_time,
            start_date: start,
            menstruation: req.body.menstruation || undefined,
            localization: req.body.localization || undefined,
            mood: req.body.mood || undefined,
            pain: req.body.pain || undefined,
            medicines: (typeof req.body.medicines==='undefined') ? [] : req.body.medicines,
            triggers: (typeof req.body.triggers==='undefined') ? [] : req.body.triggers,
            aura: (typeof req.body.aura==='undefined') ? [] : req.body.aura,
            pressure: req.body.pressure || undefined,
            sleep_duration: req.body.sleep_duration || undefined,
            notes: req.body.notes || undefined,
            reliefs: (typeof req.body.reliefs==='undefined') ? [] : req.body.reliefs,
            weather: req.body.weather || {},
            _id: id
        }
    }

    if(req.body.end_date && req.body.end_time) {
        const end_time = req.body.end_time.split(":");
        const end_date = req.body.end_date.split("-"); 
        const end = new Date(Number(end_date[0]),Number(end_date[1])-1,Number(end_date[2]),Number(end_time[0]),Number(end_time[1]),0);
        data.$set = {...data.$set, end_time: req.body.end_time, end_date: end}
    }
    else{
        data.$unset = {end_time: "", end_date: ""}
    }
      
    Report.findById(id)
    .exec( function(err, found_report) {
            if (err) { 
                return res.json({errors : [err.message]});
             }
            if (found_report) {
                var report = new Report(data);
                Report.findByIdAndUpdate(id, data, {'new': true}, function (err,mod_report) {
                    if (err) { 
                        return res.json({errors : [err.message]});
                    }
                    res.json(report);
                    return;
                });
            } else {
                res.status(204);
                res.send("No content");
                return;
            }
    });
};

exports.report_stats = function(req, res, next) {
    const days = req.params.days;
    const now = new Date();
    let endDate;
    if(days === "30"){
        endDate = new Date(now.getFullYear(), now.getMonth()-1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    } else if(days === "60") {
        endDate = new Date(now.getFullYear(), now.getMonth()-2, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    } else if(days ==="365") {
        endDate = new Date(now.getFullYear()-1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    }
    const userId = req.session.userId;
    User.findById(userId, 'username _id email registration_date')
    .exec(function(err,found_user){
        if(err) {
            return res.json({errors : [err.message]});
        }
        if(found_user)
        {
            if(endDate) {
                Report.find({user: found_user._id, start_date : { $gte: endDate }}).sort({start_date: -1})
                .exec(function(err,found_reports){
                    if(err) {
                        return res.json({errors : [err.message]});
                    }
                    if(found_reports.length === 0){
                        res.status(204);
                        res.send("No content");
                        return;
                    }
                    else {
                        const stats = tools.computeStats(found_reports, days, now);
                        res.json(stats);
                        return;
                    }
                });
            } else {
                Report.find({user: found_user._id}).sort({start_date: -1})
                .exec(function(err,found_reports){
                    if(err) {
                        return res.json({errors : [err.message]});
                    }
                    if(found_reports.length === 0){
                        res.status(204);
                        res.send("No content");
                        return;
                    }
                    else {
                        const stats = tools.computeStats(found_reports, days, now, found_user);
                        res.json(stats);
                        return;
                    }
                });
            }
        } else {
            return res.json({errors : "User incorrect"});
        }
    });
};

exports.report_stats_custom = function(req, res, next) {
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    const userId = req.session.userId;
    User.findById(userId, 'username _id email')
    .exec(function(err,found_user){
        if(err) {return next(err);}
        if(found_user)
        {
            Report.find({user: found_user._id, start_date : { $gte: start}, end_date : { $lte: end } }).sort({start_date: -1})
                .exec(function(err,found_reports){
                    if(err) {
                        return res.json({errors : [err.message]});
                    }
                    if(found_reports.length === 0){
                        res.status(204);
                        res.send("No content");
                        return;
                    }
                    else {
                        const stats = tools.computeCustomStats(found_reports,start,end);
                        res.json(stats);
                        return;
                    }
                });
        } else {
            res.status(404);
            res.send('This user does not exist');
            return;
        }
    });
};

exports.reports_together = function(req, res, next) {
    const userId = req.session.userId;
    const pain = req.params.pain;
    Report.find({user: userId, pain: pain })
    .exec(function(err,found_reports){
        if(err) {
            return res.json({errors : [err.message]});
        }
        if(found_reports && found_reports.length > 0) {
            const results = tools.getInformations(found_reports);
            res.json(results);
            return;
        } else {
            res.status(204);
            res.send("No content");
            return;
        }
    })
};

exports.pdf_data = function(req, res, next) {
    const userId = req.session.userId;
    const now = new Date();
    const endDate30 = new Date(now.getFullYear(), now.getMonth()-1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    const endDate60 = new Date(now.getFullYear(), now.getMonth()-2, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    const endDateYear = new Date(now.getFullYear()-1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
	async.parallel({
        user: function(callback) {
            User.findById(userId, 'username _id email registration_date')
            .exec(callback)
        }, 
        reports: function(callback) {
            Report.find({user: userId}).sort({start_date: -1})
            .exec(callback)
        },
        reports30: function(callback) {
            Report.find({user: userId, start_date : { $gte: endDate30 }}).sort({start_date: -1})
            .exec(callback)
        },
        reports60: function(callback) {
            Report.find({user: userId, start_date : { $gte: endDate60 }}).sort({start_date: -1})
            .exec(callback)
        },
        reportsYear: function(callback) {
            Report.find({user: userId, start_date : { $gte: endDateYear }}).sort({start_date: -1})
            .exec(callback)
        },
        togetherNoPain: function(callback) {
            Report.find({user: userId, pain: "No Pain"})
            .exec(callback)
        },
        togetherMild: function(callback) {
            Report.find({user: userId, pain: "Mild"})
            .exec(callback)
        },
        togetherModerate: function(callback) {
            Report.find({user: userId, pain: "Moderate"})
            .exec(callback)
        },
        togetherIntense: function(callback) {
            Report.find({user: userId, pain: "Intense"})
            .exec(callback)
        },
        togetherMaximum: function(callback) {
            Report.find({user: userId, pain: "Maximum"})
            .exec(callback)
        },
	}, function(err, results) {
        if (err) { 
            return res.json({errors : [err.message]});
        }
        const reports = results.reports.length > 0 ? results.reports : [];
        const statsAll =  results.reports.length > 0 ? tools.computeStats(results.reports, "all", new Date()) : {};
        const stats30 =  results.reports30.length > 0 ? tools.computeStats(results.reports30, "30", new Date()) : {};
        const stats60 =  results.reports60.length > 0 ? tools.computeStats(results.reports60, "60", new Date()) : {};
        const statsYear =  results.reportsYear.length > 0 ? tools.computeStats(results.reportsYear, "365", new Date()) : {};
        const noPain =  results.togetherNoPain.length > 0 ? tools.getInformations(results.togetherNoPain) : {};
        const mild = results.togetherMild.length > 0? tools.getInformations(results.togetherMild) : {};
        const moderate =  results.togetherModerate.length > 0 ? tools.getInformations(results.togetherModerate) : {};
        const intense =  results.togetherIntense.length > 0 ? tools.getInformations(results.togetherIntense) : {};
        const maximum =  results.togetherMaximum.length > 0 ? tools.getInformations(results.togetherMaximum) : {};
        res.json({
            "user": results.user,
            "reports": reports, 
            "stats":{
                "statsAll": statsAll,
                "stats30": stats30,
                "stats60": stats60,
                "statsYear": statsYear,
            },
            "together": {
                "noPain": noPain, 
                "mild": mild, 
                "moderate": moderate, 
                "intense": intense, 
                "maximum": maximum
            }
        });
        return;
  });
}
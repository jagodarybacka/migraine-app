var express = require("express");
var router = express.Router();
var passport = require("passport");
// Require controller modules
const auth_controller = require("../controllers/authenticationController");
var user_controller = require("../controllers/userController");
var report_controller = require("../controllers/reportController");

// var multer = require("multer");
// var Storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		callback(null, "./src/assets/img/users");
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
// 	}
// });

// var upload = multer({
// 	storage: Storage
// }).single("file");

/// ROUTES ///

router.get('/', function(req, res, next) {
	res.json("RESPONSE: OK")
  });

///REPORT ROUTES ///

/* ADD REPORT */
router.post('/reports', auth_controller.isLoggedIn, report_controller.report_add);
// router.post('/reports', report_controller.report_add);

/* Report Details */
router.get("/reports/:id", auth_controller.isLoggedIn, report_controller.report_detail);
// router.get("/reports/:id", report_controller.report_detail);

/* Delete Report */
router.delete("/reports/:id", auth_controller.isLoggedIn, report_controller.report_delete);
// router.delete("/reports/:id", report_controller.report_delete);

/* Change Report */
router.put("/reports/:id", auth_controller.isLoggedIn, report_controller.report_update);
// router.put("/reports/:id", report_controller.report_update);

/*  GET Reports */
router.get("/reports",auth_controller.isLoggedIn,report_controller.reports_all);
// router.get("/reports", report_controller.reports_all);

/*  GET Reports */
router.get("/recent",auth_controller.isLoggedIn,report_controller.report_recent);
// router.get("/recent", report_controller.report_recent);

/// USER ROUTES ///

/* Register User */
router.post("/users",
	user_controller.validateRegister,
	user_controller.register
);

router.post("/login",function(req,res,next){
	passport.authenticate('local', {session: true}, function(info,user,err) {
		if(err) {
			return res.json({errors : [err.message]});
		}
		req.logIn(user,function(err){
			if(err) { return next(err);}
			// console.log('session',req.session);
			req.session.userId = req.user._id;
			res.json(
				{redirectURL:"/home",
				userId: req.user._id,
				userMail: req.user.email,
				userName: req.user.username
			});
		});
	})(req, res, next);
});


/* Logout User */
router.get("/logout", auth_controller.logout);

module.exports = router;

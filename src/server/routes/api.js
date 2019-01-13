var express = require("express");
var router = express.Router();
var passport = require("passport");

// Require controller modules
const auth_controller = require("../controllers/authenticationController");
var user_controller = require("../controllers/userController");
var report_controller = require("../controllers/reportController");

/// ROUTES ///

router.get('/', function(req, res, next) {
	res.json("RESPONSE: OK")
  });

///REPORT ROUTES ///

/* ADD REPORT */
router.post('/reports', auth_controller.isLoggedIn, report_controller.report_add);

/* Report Details */
router.get("/reports/:id", auth_controller.isLoggedIn, report_controller.report_detail);

/* Delete Report */
router.delete("/reports/:id", auth_controller.isLoggedIn, report_controller.report_delete);

/* Change Report */
router.put("/reports/:id", auth_controller.isLoggedIn, report_controller.report_update);

/*  GET Reports */
router.get("/reports",auth_controller.isLoggedIn,report_controller.reports_all);

/*  GET most recent report */
router.get("/recent",auth_controller.isLoggedIn,report_controller.report_recent);

/*  GET most recent report */
router.get("/reports/stats/:days",auth_controller.isLoggedIn, report_controller.report_stats);


router.get("/reports/stats/custom/:start-:end",auth_controller.isLoggedIn, report_controller.report_stats_custom);


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

/* Change password */
router.put("/password", user_controller.change_password);

/* Forgotten password, send email */
router.post("/forgot", user_controller.forgotten_password);

/* Reset password */
router.post('/reset/:token', user_controller.reset_password);

/* Change user data */
router.put('/users', user_controller.change_user_data);

module.exports = router;

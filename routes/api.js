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
 router.post('/report',report_controller.report_add);
// router.post('/report',auth.controller.isLoggedIn,report_controller.report_add);

/* Report Details */
router.get("/report/:id", report_controller.report_detail);

/* Delete Report */
router.delete("/report/:id", report_controller.report_delete);

/* Change Report */
router.put("/report/:id", report_controller.report_update);

/// USER ROUTES ///

/* Register User */
router.post("/users",
	user_controller.validateRegister,
	user_controller.register,
	//upload,
	passport.authenticate("local", {session: true}),
	(req,res)=>{
		console.log(res);
		res.json(
			{redirectURL:"/home"
			});
	}
);

/*  GET User data */
router.get("/users",auth_controller.isLoggedIn,user_controller.user_data);

/* Login User POST */
router.post("/login", passport.authenticate("local", {failureFlash: true, session: true}),
	(req,res)=>{
		console.log(req.session);
		req.session.userId = req.user._id;
		res.json(
			{redirectURL:"/home",
			userId: req.user._id,
			userMail: req.user.email,
			userName: req.user.username
			});
	}
);

/* Logout User */
router.get("/logout", auth_controller.logout);

module.exports = router;

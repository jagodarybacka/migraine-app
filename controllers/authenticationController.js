

exports.logout = (req, res) => {
	req.logout();
	req.flash("success", "You are now logged out!");
	res.json({message: "Logged out succesfully."});
};

exports.isLoggedIn = (req, res, next) => {
	
	if (req.isAuthenticated()) {
		next(); 
		return;
	}
	req.flash("error", "Oops you must be logged in to do that!");
	console.log("\n Not logged. \n");
	res.json({redirectURL:"/login", message: "You must be logged in!"});
};
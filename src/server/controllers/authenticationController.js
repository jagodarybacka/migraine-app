

exports.logout = (req, res) => {
	req.logout();
	res.json({message: "Logged out succesfully."});
};

exports.isLoggedIn = (req, res, next) => {
	
	if (req.isAuthenticated()) {
		next(); 
		return;
	}
	// console.log("\n Not logged. \n");
	res.status(401);
	res.send("Not logged in");
};
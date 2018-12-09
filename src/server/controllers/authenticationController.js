

exports.logout = (req, res) => {
	req.session.destroy(function (err) {
		req.logout();
		res.clearCookie('connect.sid');
		res.json({message: "Logged out succesfully."});
	});
};

exports.isLoggedIn = (req, res, next) => {
	
	if (req.isAuthenticated()) {
		next(); 
		return;
	}
	res.status(401);
	res.send("Not logged in");
};
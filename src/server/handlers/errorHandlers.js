/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	};
};

exports.errorHandler = (err, req, res, next) => {
  var code = err.code;
  var message = err.message;
  res.writeHead(code, message, {'content-type' : 'text/plain'});
  res.end(message);
}

/*
    Not Found Error Handler
    If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
  */
exports.notFound = (req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
};

/*
  MongoDB Validation Error Handler
  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

// exports.flashValidationErrors = (err, req, res, next) => {
// 	if (!err.errors) return next(err);
// 	// validation errors look like
// 	const errorKeys = Object.keys(err.errors);
// 	errorKeys.forEach(key => req.flash("error", err.errors[key].message));
// 	console.log(res);
// };

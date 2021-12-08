const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {

	//if statusCode doesn't exist that means 500 server error display  
	err.statusCode = err.statusCode || 500;
	if(process.env.NODE_ENV === 'DEVELOPMENT'){
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errMessage: err.message,
			stack: err.stack
		})
	}

	if(process.env.NODE_ENV === 'PRODUCTION'){
		//create copy of the error using three (...err) dots
		let error = {...err}
		error.message = err.message

		//wrong Mongoose object id Error
		if(err.name === 'castError') {
			const message = `Resource not found. Invalid: ${err.path} `
			error = new ErrorHandler(message, 400)
		}
		//Handling Mongoose validation Error
		if(err.name === 'Validation Error') {
			const message = Object.values(err.errors).map(value => value.message);
			error = new ErrorHandler(message, 400)
		}

		//Handling Mongoose Duplicate Key Errors. 
		if(err.code === 11000) {
			const message = "Check Duplicate Entry of your fields";
			error = new ErrorHandler(message, 400)
		}

		//Handling Wrong JWT Errors. 
		if(err.name === 'JsonWebTokenError') {
			const message = `Json Web Token is invalid. Try Again`
			error = new ErrorHandler(message, 400)
		}

		//Handling Expired JWT Errors. 
		if(err.name === 'TokenExpiredError') {
			const message = `Json Web Token is expired. Try Again`
			error = new ErrorHandler(message, 400)
		}


		res.status(error.statusCode).json({
			success: false,
			message: error.message || 'Internal Server Error'
		})
	}



	res.status(err.statusCode).json({
		success: false,
		error: err.stack
	})
}
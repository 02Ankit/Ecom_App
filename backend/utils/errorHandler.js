//Error Handler Class
class ErrorHandler extends Error {

	constructor(message, statusCode)
	{
		// Super Method is Represent Error Class Constructor,
		// In this case now we pass the message in the parent class constructor Constructor Using this Super class method

		super(message);
		this.statusCode = statusCode

		//pass the object into captureStackTrace function, this represent the object of itself class.
		//And for create constructor using this.constroctor to create constructor of itself class  
		Error.captureStackTrace(this, this.constructor)
	}
}

module.exports = ErrorHandler;
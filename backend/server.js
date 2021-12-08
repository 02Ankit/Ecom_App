//#import app.js into this file 
const app = require('./app')

//#import Database to connect
const connectDatabase = require('./config/database')

//#import dotenv 
const dotenv = require('dotenv');

process.on('uncaughtException', err => {

		console.log(`ERROR: ${err.stack}`);
		console.log(`Shutting Down due to uncaught exception`);
		process.exit(1)

})


//#setting up config file path of config file to hide the some confidential file and content. 
dotenv.config({path:'backend/config/config.env'}) 

//connecting to Database
connectDatabase();

//#using anonymous function
const server = app.listen(process.env.PORT, () => {

	console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `)
})


process.on('unhandledRejection', err => {

			console.log(`ERROR: ${err.stack}`);
			
			console.log('Shutting down the server due to Unhandled promise rejection');
			server.close(() => {
				process.exit(1)
			})
		})
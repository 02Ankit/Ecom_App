//#import app.js into this file 
const app = require('./app')

//#import Database to connect
const connectDatabase = require('./config/database')

//#import dotenv 
//const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

process.on('uncaughtException', err => {

		console.log(`ERROR: ${err.stack}`);
		console.log(`Shutting Down due to uncaught exception`);
		process.exit(1)

})


//#setting up config file path of config file to hide the some confidential file and content. 

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//dotenv.config({path:'backend/config/config.env'}) 

//connecting to Database
connectDatabase();

cloudinary.config({

	cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
		
	})


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
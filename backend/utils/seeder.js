
//Seeder.js file is use to export the data 

const {connect} = require('mongoose');
const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');



dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

//async and await/ then chainblock to use comunicate between diffrent servers mongo and express 
const seedProducts = async () => {
//we should install AsyncHandler and use them instead of every time write try{}catch{} block 
	try{
//await bcz data are coming from server 
		await Product.deleteMany();
		console.log('Products are Deleted');

		await Product.insertMany(products);
		console.log('All Products are Added');
		process.exit();

	} catch(error){
		console.log(error.message);
		process.exit();
	}
}
 seedProducts()
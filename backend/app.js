//#import express
const express = require('express');

//#body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
//#all express function store into app variable
// we can use this app in only root file, we cant use app any inside folder /file  
const app = express();

// support express of application/json type post data
app.use(express.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//#Import All the Routes

const products = require('./routes/product');
const users = require('./routes/user');
const order = require('./routes/order');



//#using middleware 
app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', order)

app.use(errorMiddleware);

module.exports = app



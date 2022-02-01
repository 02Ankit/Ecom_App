//#import express
const express = require('express');
const app = express();

//#body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')
const path = require('path')

const errorMiddleware = require('./middlewares/errors')


//#all express function store into app variable
// we can use this app in only root file, we cant use app any inside folder /file  
const dotenv = require('dotenv');
//#setting up config file path of config file to hide the some confidential file and content. 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//dotenv.config({path:'backend/config/config.env'})



// support express of application/json type post data
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//#Import All the Routes

//setting up cloudinary 
const products = require('./routes/product');
const users = require('./routes/user');
const order = require('./routes/order');
const payment = require('./routes/payment');


//#using middleware 
app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', order)
app.use('/api/v1', payment)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);

module.exports = app



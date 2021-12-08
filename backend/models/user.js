//create data schema of user in mongoose
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({

	name:{	type: String, 
			required: [true, 'please enter your name'],
			maxlength: [30,'your name cannot exceed 30 characters']

	},
	email: {
		type: String,
		required: [true, 'please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'please enter valid email address']

	},

	password: {
		type:String,
		required: [true, 'please enter your password'],
		minlength: [6, 'your password must be longer than 6 characters'],
		select: false
	},

	avatar:{
		public_id: {
			type: String,
			required: true
		},
		url:{

			type: String,
			required: true
		}
	},

	role:{
		type: String,
		default: 'user'
	},

	createdAt:{
		type: Date,
		default: Date.now
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date
})

//Encrypting password before saving user
	userSchema.pre('save', async function(next)
	{
		if(!this.isModified('password')){

			next()
		}
		this.password = await bcrypt.hash(this.password, 10)
	})

userSchema.methods.comparePassword = async function (enteredPassword) {


	return await bcrypt.compare(enteredPassword, this.password)

}

	// Return Jwt token
	userSchema.methods.getjwtToken = function(){
		  //this._id is id of the user, 
		 //we want to stored id as payLoad in the token, 
	    //after that we pass the secret  
		return jwt.sign({id: this._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME})                                      
		                                       
	} 


	//Generate Password Reset Token user

	userSchema.methods.getResetPasswordToken = function() {
		//Generate Token 
		
		const resetToken = crypto.randomBytes(20).toString('hex');
        console.log(resetToken)
		// hash and set to resetpasswordToken
		this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        console.log(this.resetPasswordToken)
		//set Token Expire time

		this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
		
		return resetToken
	} 


module.exports = mongoose.model('user', userSchema);
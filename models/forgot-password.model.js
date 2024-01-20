const mongoose = require('mongoose');
const generate = require("../helpers/generate")
const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        opt: String,
        expireAt:  { 
            type: Date,  
            expires: 10
        } ,
    }, 
    { timestamps: true }
); 

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;
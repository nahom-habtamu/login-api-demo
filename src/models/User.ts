import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import config from '../config';


interface UserType {
    email : string,
    password : string,
    generateAuthToken : () => string
};

const userSchema = new mongoose.Schema<UserType>({

    email : {
        type : String,
        required : [true, "Enter Your Email !!"],
        maxlength : 50,
        unique : true
    },

    password : {
        type : String,
        required : [true, "Enter Your Password"],
        minlength : 8,
    }
});


userSchema.methods.generateAuthToken = function () : string{

    const token : string = jwt.sign( { sub : this._id }, config?.privateKey );
    return token;
}


userSchema.pre('save', async function (next){

    const currentUser = this;

    console.log(currentUser?.password);

    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(currentUser?.password,salt);  

    currentUser.password = hashedPassword;
    
    next();
});


const User = mongoose.model<UserType>("User", userSchema);

const userValidationSchema = Joi.object({
    email : Joi.string().required().max(50),
    password : Joi.string().required().min(8).max(255)
});


export { User, userValidationSchema };
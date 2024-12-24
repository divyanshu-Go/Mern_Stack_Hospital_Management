import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3, "first Name Must Contain Atleast 3 Characters."],
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3, "Last Name Must Contain Atleast 3 Characters."],
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Please Provide a Valide Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [10, "Phone Number Must Contain Exact 10 digits."],
        maxLength: [10, "Phone Number Must Contain Exact 10 digits."],
    },
    aadharNo:{
        type:String,
        required:[true, "aadhar Number is requird"],
        minLength:[12, "Aadhar Must Contain Exact 12 Digits."],
        maxLength:[12, "Aadhar Must Contain Exact 12 Digits."],
    },
    dob:{
        type:Date,
        required:[true, "DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male", "Female"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[8, "Password Must Contain Atleast 8 Characters"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin", "Patient", "Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }
});


userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRES});
}


export const User= mongoose.model("User", userSchema);
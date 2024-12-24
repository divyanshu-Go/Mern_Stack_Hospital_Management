import mongoose from 'mongoose'
import validator from 'validator'

const messageSchema = new mongoose.Schema({
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
        validator: [validator.isEmail, "Please Provide a Valide Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [10, "Phone Number Must Contain Exact 10 digits."],
        maxLength: [10, "Phone Number Must Contain Exact 10 digits."],
    },
    message:{
        type:String,
        required:true,
        minLength:[10, "Message Must Contain Atleast 10 Characters."]
    }
});

export const Message= mongoose.model("Message", messageSchema);
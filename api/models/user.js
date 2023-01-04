const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please enter yuor name"],
        maxLength: [30, "your name cannot exceed 30 words"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [6, "your password must be at least 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            
        },
        url: {
            type: String,
        
        }
    },
    role: {
        type: String,
       default: "user"},
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})
userSchema.pre('save',async function(next) {
    if (!this.isModified('password')) {
        next();

    }
    this.password= await bcrypt.hash(this.password,10)
})

// Compare user password
userSchema.methods.comparePassword= async function(enteredPassword){
      return await bcrypt.compare(enteredPassword,this.password)
}

//RETURN JWT token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

module.exports = mongoose.model('User',userSchema);
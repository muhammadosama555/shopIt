const User = require("../models/user.js")

const ErrorHandler= require("../utils/errorHandler.js")
const catchAsyncErrors = require("../middlewares/catchAsyncError.js")
const sendToken = require("../utils/jwtToken.js")

//Register user   => /api/v1/register


exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
       const {name,email,password} = req.body

       const user = await User.create({name,password,email,
    avatar:{
        public_id:'',
        url:''
    }})

    sendToken(user,200,res)
})


//LOGIN   User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next)=>{
    const {email,password} = req.body;

    //Checl if email and password is entered
    if(!email ||!password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    
    //Finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res)
})

//Forgot Password => /api/passsword/forgot
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

   const user = await User.findOne({email:req.body.email})

   if(!user){
    return next(new ErrorHandler("user not found ",404))
   }

   //Get resset token 
   const resetToken =user.getResetPasswordToken()

   await user.save({validateBeforeSave:false})

})









//LOGOUT user => /api/v1/logot
exports.logout= catchAsyncErrors (async (req,res,next)=>{
    res.cookie('token',null, {
        exxpires:new Date(Date.now()),
    httpOnly:true

})

res.status(200).json({
    seccess:true,
    message: "Logged out"
})


})
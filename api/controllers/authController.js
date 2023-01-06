const User = require("../models/user.js");

const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");

//Register user   => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: "",
      url: "",
    },
  });

  sendToken(user, 200, res);
});

//LOGIN   User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Checl if email and password is entered
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Forgot Password => /api/passsword/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found ", 404));
  }

  //Get resset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset password url
  const resetUrl = `${req.protocol}:// ${req.get(
    "host"
  )}/api/v1/passwordreset/${resetToken}`;
  const message = `your password reset token is as follows:\n\n${resetUrl}\n\n If you have 
   requested this email,then ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: "shopIt password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//get currently logged user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update/Change password => /api/v1/password/update
exports.updatePassword= catchAsyncErrors(async (req,res,next)=>{
const user= await User.findById(req.user.id).select('+password')

//Check previous user password 
const  isMatched = await user.comparePassword(req.body.oldPassword)
if(!isMatched){
    return next(new ErrorHandler("Old password incorrect"))
}
user.password= req.body.password
await user.save()
sendToken(user,200, res)

})

//Update user profile => /api/582*9v1/me/update
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }


    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})

//LOGOUT user => /api/v1/logot
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    exxpires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    seccess: true,
    message: "Logged out",
  });
});


//Admin routes
//Get all users => /api/v1/admin/users
exports.allUsers= catchAsyncErrors(async (req,res,next)=>{
    const users= await User.find()

    res.status(200).json({
        success:true,
        users
    })
})


// get user details
exports.getUserDetails= catchAsyncErrors(async (req,res,next)=>{
    const user= await User.findById(re.params.id)
    if(!user){
        return next(new ErrorHandler("user not found"))
    }
    res.status(200).json({
        success:true,
        user
    })
})


//Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:role.body.role
    }


    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})


// delete user
exports.deleteUser= catchAsyncErrors(async (req,res,next)=>{
    const user= await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new ErrorHandler("user not found"))
    }

    res.status(200).json({
        success:true,
        message:' user has been deleted'
    })
})


const Order= require("../models/order.js")
const Product= require("../models/product.js")

const ErrorHandler= require("../utils/errorHandler.js")
const catchAsyncErrors = require("../middlewares/catchAsyncError.js")

//Create a new order => /api/v1/order/new
exports.newOrder= catchAsyncErrors(async (req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo 
    } = req.body;

    const order= await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success:true,
        order
    })
})


//Get single order =>  /api/v1/order/:id

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user',"name email")

    if(!order){
        return next(new ErrorHandler("No order found"))
    }
    res.status(200).json({
        success:true,
        order
    })
})


//Get logged in user order =>  /api/v1/order/me

exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user: req.user.id})

   
    res.status(200).json({
        success:true,
        orders
    })
})
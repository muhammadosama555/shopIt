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
//Get all orders =>  /api/v1/admin/order/me

exports.allOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find()

    let totalAmount= 0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })

   
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})
// Update/process Orders =>  /api/v1/admin/order/Id

exports.updateOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('you have already delivered your order'))
    }

    order.orderItems.forEach(async item =>{
        await updateStock(item.product,item.quantity)
    })
    
    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()
   
    res.status(200).json({
        success:true
        
    })
})


async function updateStock(id, quantity){
       const product = await Product.findById(id)

       product.stock = product.stock - quantity

       await product.save()
}


//Delete Order
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("No order found"))
    }

    await order.remove()
    res.status(200).json({
        success:true,
        message: "order deleted"
    })
})



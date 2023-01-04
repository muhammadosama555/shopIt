const product = require("../models/product.js")
const Product=require("../models/product.js")
const ErrorHandler= require("../utils/errorHandler.js")
const catchAsyncErrors=require('../middlewares/catchAsyncError.js')
const mongoose = require("mongoose")
const APIFeatures = require("../utils/apiFeatures.js")


//Create new peoduct =>    /api/v1/product/new
exports.newProduct= catchAsyncErrors( async (req,res,next)=>{
req.body.user= req.body.id

    const product= await  Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})


// GET ALL PRODUCTS => /api/v1/products
exports.getProducts=async (req,res,next)=>{
    
       const resPerPage=4;
       const productCount=await Product.countDocuments();

       const apiFeatures= new  APIFeatures(Product.find(),req.query )
                          .search()
                          .filter()
                          .pagination(resPerPage)

         const products= await   apiFeatures.query;
    res.status(200).json({
        success: true,
        count:products.length,
        productCount,
        products
      
    })
}

//Get single product => /api/v1/products/id
exports.getSingleProduct=async (req,res,next)=>{
    let product = null;
    mongoose.Types.ObjectId.isValid(req.params.id) && (product = await Product.findById(req.params.id))
    if(!product){ 
        return next( new ErrorHandler("product not found",404))
        
    }
    return res.status(200).json({
        success:true,
        product
    })
}

//Update Product =>  /api/v1/products/id

exports.updateProduct= async (req,res,next)=>{
    const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!product){
        return res.status(404).json({
            seccess:false,
            message: "Product not found"
        })
    }
    return res.status(200).json(product)
}
//Delete Product =>  /api/v1/products/id

exports.deleteProduct= async (req,res,next)=>{
    const product =await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(404).json({
            seccess:false,
            message: "Product not found"
        })
    }
    return res.status(200).json("product has been deleted")
}
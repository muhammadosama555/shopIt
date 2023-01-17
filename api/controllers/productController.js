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
                        
         let products= await apiFeatures.query;
         let filteredProductCount = products.length
console.log(filteredProductCount);
         apiFeatures.pagination(resPerPage)
         products= await apiFeatures.query;

    res.status(200).json({
        success: true,
        count:products.length,
        filteredProductCount,
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



//Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating,comment, productId}= req.body;

    const review={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment= comment;
                review.rating= rating
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews= product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc,item)=>item.rating + acc,0) / product.
    reviews.length

    await product.save({ validateBeforeSave:false})

    res.status(200).json({
        success:true
    })

})


//Get Product  review  => /api/v1/reviews

exports.getProductreviews= catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})
//delete Product  review  => /api/v1/reviews

exports.deleteProductreviews= catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId)
    
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    
    const numOfReviews= reviews.length

    const ratings=product.reviews.reduce((acc,item)=> item.rating + acc,0) /product.
    reviews.length

    await Product.findByIdAndUpdate(req.query.id,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        
    })
})
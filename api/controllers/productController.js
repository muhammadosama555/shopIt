const Product=require("../models/product.js")



//Create new peoduct =>    /api/v1/product/new
exports.newProduct= async (req,res,next)=>{
    const product= await  Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}



exports.getProducts=(req,res,next)=>{
    res.status(200).json({
        seccess: true,
        mesage: "this route will show all products"
    })
}
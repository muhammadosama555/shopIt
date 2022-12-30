const express=require('express')
const router =express.Router()


const {getProducts, newProduct} = require("../controllers/productController.js")




router.get("/products",getProducts)
router.post("/product/new",newProduct)



module.exports=router
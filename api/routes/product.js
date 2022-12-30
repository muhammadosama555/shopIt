const express=require('express')
const router =express.Router()


const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct} = require("../controllers/productController.js")




router.get("/products",getProducts)
router.post("/product/new",newProduct)
router.get("/products/admin/:id", getSingleProduct)
router.put("/products/admin/:id", updateProduct)
router.delete("/products/admin/:id",  deleteProduct )



module.exports=router
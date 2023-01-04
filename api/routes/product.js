const express=require('express')
const router =express.Router()


const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct} = require("../controllers/productController.js")
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth.js')




router.get("/products",getProducts,isAuthenticatedUser,authorizeRoles('admin'))
router.post("/product/new",newProduct)
router.get("/products/admin/:id", getSingleProduct)
router.put("/products/admin/:id", updateProduct)
router.delete("/products/admin/:id",  deleteProduct )



module.exports=router
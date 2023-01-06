const express=require('express')
const router =express.Router()


const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductreviews, deleteProductreviews} = require("../controllers/productController.js")
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth.js')




router.get("/products",getProducts,isAuthenticatedUser,authorizeRoles('admin'))
router.post("/product/new",newProduct)
router.get("/products/admin/:id", getSingleProduct)
router.put("/products/admin/:id", updateProduct)
router.delete("/products/admin/:id",  deleteProduct )

router.put("/review", isAuthenticatedUser, createProductReview)
router.get("/reviews", isAuthenticatedUser, getProductreviews)
router.delete("/reviews", isAuthenticatedUser, deleteProductreviews)



module.exports=router
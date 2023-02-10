const express=require('express')
const router =express.Router()


const {getProducts,getAdminProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductreviews, deleteProductreviews} = require("../controllers/productController.js")
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth.js')




router.get("/products",getProducts)
router.get("/admin/products",getAdminProducts)
router.get("/product/:id", getSingleProduct)

router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles('admin'),newProduct)
router.put("/admin/products/:id",isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
router.delete("/admin/products/:id",isAuthenticatedUser,authorizeRoles('admin'),  deleteProduct )

router.put("/review", isAuthenticatedUser, createProductReview)
router.get("/reviews/:id", getProductreviews)
router.delete("/reviews", isAuthenticatedUser, deleteProductreviews)



module.exports=router
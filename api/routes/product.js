const express= require("express");
const upload = require("../middlewares/multer");
const { getAllProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router=express.Router();



router.get("/",getAllProducts)
router.post("/",upload.array("images",5),newProduct)
router.get("/:id",getSingleProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)


module.exports= router

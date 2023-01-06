const express= require("express")
const router= express.Router()
const { newOrder, getSingleOrder, myOrder } = require("../controllers/orderController.js")


const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth.js")






router.post("/order/new",isAuthenticatedUser, newOrder)
router.get("/order/:id",isAuthenticatedUser, getSingleOrder)
router.get("/order/me",isAuthenticatedUser, myOrder)


module.exports= router
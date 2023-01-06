const express= require("express")
const router= express.Router()
const { newOrder, getSingleOrder, myOrder, allOrders, updateOrders, deleteOrder } = require("../controllers/orderController.js")


const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth.js")






router.post("/order/new",isAuthenticatedUser, newOrder)
router.get("/order/:id",isAuthenticatedUser, getSingleOrder)
router.get("/orders/me",isAuthenticatedUser, myOrder)
router.get("/admin/orders",isAuthenticatedUser, allOrders)
router.put("/admin/order/:id",isAuthenticatedUser, updateOrders)
router.delete("/admin/order/:id",isAuthenticatedUser, deleteOrder)


module.exports= router
const express = require('express');
const {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Define order routes
router.get('/', protect, getAllOrders);
router.post('/', protect, createOrder);
router.put('/:id', protect, updateOrder);
router.get('/:id', protect, getOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;

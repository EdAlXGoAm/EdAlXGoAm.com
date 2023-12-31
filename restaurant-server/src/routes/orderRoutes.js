const express = require('express');
const router = express.Router();
const { getOrders, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
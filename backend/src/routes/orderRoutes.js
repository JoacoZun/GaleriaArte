const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createUserOrder, getUserOrders, cancelUserOrder, getUserOrder } = require('../controllers/orderController');
const router = express.Router();

router.use(authenticateToken);

router.get('/', getUserOrders);
router.get('/:id', getUserOrder)
router.post('/', createUserOrder);
router.patch('/:id', cancelUserOrder);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middlewares/authMiddleware');
const { getAllArt, createArt, updateArt, deleteArt } = require('../controllers/artController');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { getAllOrders, getOrder, updateOrder } = require('../controllers/orderController');

router.use(authenticateToken, requireAdmin);

router.get('/users/', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

router.get('/artworks/', getAllArt);
router.post('/artworks/', createArt);
router.put('/artworks/:id', updateArt);
router.delete('/artworks/:id', deleteArt);

router.get('/orders/', getAllOrders);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrder);

module.exports = router;

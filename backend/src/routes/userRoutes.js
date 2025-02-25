const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { registerUser, loginUser, getUser, updateUser } = require('../controllers/userController');

// Rutas para registrar e iniciar sesión
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas del propio usuario
router.get('/me', authenticateToken, getUser);    
router.put('/me', authenticateToken, updateUser);  

module.exports = router;


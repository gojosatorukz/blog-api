const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { authValidation } = require('../middleware/validation');

const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', authValidation, authController.register);

router.post('/login', authValidation, authController.login);

router.post('/logout', authController.logout);

router.get('/me', verifyToken, authController.getMe);

module.exports = router;
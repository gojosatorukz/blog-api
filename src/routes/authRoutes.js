const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { check } = require('express-validator'); 

const authLimiter = require('../middleware/rateLimiter');

router.post('/register', authLimiter, [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.register);

router.post('/login', authLimiter, authController.login);

module.exports = router;

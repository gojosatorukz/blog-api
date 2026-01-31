const { body, validationResult } = require('express-validator');

const authValidation = [
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const blogValidation = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .trim()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 chars'),
    body('body')
        .notEmpty().withMessage('Body content is required'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { authValidation, blogValidation };
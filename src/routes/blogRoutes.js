const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken } = require('../middleware/authMiddleware'); 
const { blogValidation } = require('../middleware/validation'); 

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

router.post('/', verifyToken, blogValidation, blogController.createBlog);
router.put('/:id', verifyToken, blogValidation, blogController.updateBlog);
router.delete('/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
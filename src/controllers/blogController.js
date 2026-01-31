const blogService = require('../services/blogService');

exports.createBlog = async (req, res) => {
    try {
        const blog = await blogService.createBlog(req.body, req.user);
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const blogs = await blogService.getAllBlogs(page, limit, search);
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await blogService.getBlogById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await blogService.updateBlog(req.params.id, req.body, req.user);
        res.json(updatedBlog);
    } catch (err) {
        if (err.message.includes('Permission')) {
            return res.status(403).json({ message: err.message });
        }
        res.status(404).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await blogService.deleteBlog(req.params.id, req.user);
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        if (err.message.includes('Permission')) {
            return res.status(403).json({ message: err.message });
        }
        res.status(404).json({ message: err.message });
    }
};
const blogRepository = require('../repositories/blogRepository');

class BlogService {
    
    async createBlog(data, user) {
        const newBlog = {
            title: data.title,
            body: data.body,
            author: user.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await blogRepository.create(newBlog);
    }

    async getAllBlogs(page, limit, search) {
        return await blogRepository.findAll(page, limit, search);
    }

    async getBlogById(id) {
        const blog = await blogRepository.findById(id);
        if (!blog) throw new Error('Blog not found');
        return blog;
    }

    async updateBlog(id, data, user) {
        const blog = await blogRepository.findById(id);
        if (!blog) throw new Error('Blog not found');

        if (blog.author.toString() !== user.userId && user.role !== 'admin') {
            throw new Error('Permission denied: You are not the author');
        }

        const updateData = {
            ...data,
            updatedAt: new Date()
        };

        await blogRepository.update(id, updateData);
        return { ...blog, ...updateData };
    }

    // Удаление (с проверкой прав)
    async deleteBlog(id, user) {
        const blog = await blogRepository.findById(id);
        if (!blog) throw new Error('Blog not found');

        if (blog.author.toString() !== user.userId && user.role !== 'admin') {
            throw new Error('Permission denied');
        }

        return await blogRepository.delete(id);
    }
}

module.exports = new BlogService();
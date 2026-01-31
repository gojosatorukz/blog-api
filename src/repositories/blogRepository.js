const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

class BlogRepository {
    getCollection() {
        return getDB().collection('blogs');
    }

    async create(blog) {
        const result = await this.getCollection().insertOne(blog);
        return { ...blog, _id: result.insertedId };
    }

    async findAll(page = 1, limit = 10, search = '') {
        const skip = (page - 1) * limit;
        
        const query = search 
            ? { title: { $regex: search, $options: 'i' } } 
            : {};

        return await this.getCollection()
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    async findById(id) {
        try {
            const objectId = new ObjectId(id);
            return await this.getCollection().findOne({ _id: objectId });
        } catch (error) {
            return null;
        }
    }

    async update(id, updateData) {
        const objectId = new ObjectId(id);
        const result = await this.getCollection().updateOne(
            { _id: objectId },
            { $set: updateData }
        );
        return result.modifiedCount > 0; 
    }

    async delete(id) {
        const objectId = new ObjectId(id);
        const result = await this.getCollection().deleteOne({ _id: objectId });
        return result.deletedCount > 0;
    }
}

module.exports = new BlogRepository();
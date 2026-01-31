const { getDB } = require('../config/db');

class UserRepository {
    getCollection() {
        return getDB().collection('users');
    }

    async findByEmail(email) {
        const collection = this.getCollection();
        return await collection.findOne({ email: email });
    }

    async createUser(user) {
        const collection = this.getCollection();
        const result = await collection.insertOne(user);
        return { ...user, _id: result.insertedId };
    }
}

module.exports = new UserRepository();
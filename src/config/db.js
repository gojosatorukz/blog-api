const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

let db = null;

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB (Native Driver)');
        db = client.db(); // Подключаемся к базе, указанной в URI
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

// Функция, чтобы получать доступ к базе из Репозиториев
function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB, client };
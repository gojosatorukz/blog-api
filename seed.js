const { connectDB, client } = require('./src/config/db');
const userRepository = require('./src/repositories/userRepository');
const blogRepository = require('./src/repositories/blogRepository');
const bcrypt = require('bcrypt');

const seed = async () => {
    await connectDB();
    const db = client.db();
    
    await db.collection('users').deleteMany({});
    await db.collection('blogs').deleteMany({});

    console.log('🧹 Database cleared');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    
    const admin = await userRepository.createUser({
        email: 'admin@test.com',
        password: hash,
        role: 'admin',
        createdAt: new Date()
    });
    console.log('Admin created');

    await blogRepository.create({
        title: "Welcome to my API",
        body: "This is a seeded post.",
        author: admin._id,
        createdAt: new Date()
    });
    console.log('Sample blog created');

    process.exit();
};

seed();
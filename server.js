const app = require('./src/app');
const { connectDB, client } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
    
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
    process.on('SIGINT', async () => {
        await client.close();
        console.log('MongoDB disconnected');
        server.close(() => process.exit(0));
    });
};

start();
const mongoose = require('mongoose');

async function connectDatabase() {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://meseretlealem8_db_user:N8c63b1d0XOoYvjz@cluster0.uhwirt1.mongodb.net/?appName=Cluster0';
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri, {
        autoIndex: true
    });
    console.log('MongoDB connected');
}

module.exports = { connectDatabase };


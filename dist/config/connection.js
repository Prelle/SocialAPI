import mongoose from 'mongoose';
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/27017/socialDB');
        console.log('Database connected.');
        return mongoose.connection;
    }
    catch (err) {
        console.error('DB connection error: ', err);
        throw new Error('DB connection failed');
    }
};
export default db;

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pic-christmas');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        console.warn('⚠️  MongoDB connection failed. Server running in degradation mode (No DB features).');
        // process.exit(1); // Keep server alive for AI features
    }
};

export default connectDB;

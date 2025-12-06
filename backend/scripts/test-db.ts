
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI as string;

async function testDbConnection() {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }

    console.log('⏳ Connecting to MongoDB...');
    console.log(`URI Host: ${MONGO_URI.split('@')[1]}`);

    await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000, // 10s max
    });

    console.log("✅ MongoDB connected (test)");
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed (test)");
}

testDbConnection()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ MongoDB test failed:", err.message);
        process.exit(1);
    });

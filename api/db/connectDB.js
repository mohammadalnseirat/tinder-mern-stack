import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionToMongoDB = await mongoose.connect(
      process.env.MONGO_DB_URL
    );
    console.log(`MongoDB connected: ${connectionToMongoDB.connection.host}`);
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};

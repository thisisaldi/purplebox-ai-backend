import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined in environment variables.");

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err: unknown) {
    const error = err as Error;
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Trying to reconnect...");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB reconnected.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

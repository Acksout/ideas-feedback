import mongoose from "mongoose";

// MongoDB connection string with fallback to local database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/localdb";

// Ensure MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI env is not defined");
}

// Define type for cached connection
let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as any).mongoose;

// Initialize cache if not exists
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Database connection function with connection pooling
async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if none is pending
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Limit maximum connections in the pool
    };

    // Establish MongoDB connection
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for connection to be established
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

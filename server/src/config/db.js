import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

const RETRY_INTERVAL_MS = 5000;

export async function connectDB() {
  let isConnected = false;

  while (!isConnected) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Mongoose connected');

      // Optional: Handle disconnections
      mongoose.connection.on('disconnected', () => {
        console.error('❌ Mongoose disconnected. Retrying...');
        isConnected = false;
        connectDB(); // retry in background
      });

      isConnected = true;
      return mongoose.connection;
    } catch (err) {
      console.error('❌ Mongoose connection error:', err.message);
      console.log(`🔄 Retrying in ${RETRY_INTERVAL_MS / 1000} seconds...`);
      await new Promise(res => setTimeout(res, RETRY_INTERVAL_MS));
    }
  }
}


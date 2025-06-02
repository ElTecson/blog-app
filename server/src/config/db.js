import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

export const client = new MongoClient(uri);

const RETRY_INTERVAL_MS = 5000;

export async function connectDB() {
  let isConnected = false;

  while (!isConnected) {
    try {
      await client.connect();
      console.log('✅ MongoDB connected');

      // Handle lost connection while server is running
      client.on('close', () => {
        console.error('❌ MongoDB connection closed. Retrying...');
        isConnected = false;
        connectDB(); // retry in background
      });

      isConnected = true;
      return client;
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      console.log(`🔄 Retrying in ${RETRY_INTERVAL_MS / 1000} seconds...`);
      await new Promise(res => setTimeout(res, RETRY_INTERVAL_MS));
    }
  }
}


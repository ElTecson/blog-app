<<<<<<< HEAD
import mongoose from 'mongoose';
=======
import { MongoClient } from 'mongodb';
>>>>>>> 552a83c (Initial commit)
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

<<<<<<< HEAD
=======
export const client = new MongoClient(uri);

>>>>>>> 552a83c (Initial commit)
const RETRY_INTERVAL_MS = 5000;

export async function connectDB() {
  let isConnected = false;

  while (!isConnected) {
    try {
<<<<<<< HEAD
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Mongoose connected');

      // Optional: Handle disconnections
      mongoose.connection.on('disconnected', () => {
        console.error('❌ Mongoose disconnected. Retrying...');
=======
      await client.connect();
      console.log('✅ MongoDB connected');

      // Handle lost connection while server is running
      client.on('close', () => {
        console.error('❌ MongoDB connection closed. Retrying...');
>>>>>>> 552a83c (Initial commit)
        isConnected = false;
        connectDB(); // retry in background
      });

      isConnected = true;
<<<<<<< HEAD
      return mongoose.connection;
    } catch (err) {
      console.error('❌ Mongoose connection error:', err.message);
=======
      return client;
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
>>>>>>> 552a83c (Initial commit)
      console.log(`🔄 Retrying in ${RETRY_INTERVAL_MS / 1000} seconds...`);
      await new Promise(res => setTimeout(res, RETRY_INTERVAL_MS));
    }
  }
}


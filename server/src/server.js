import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import { connectDB } from '@/config/db.js';

// Routes (import)
import serverPageRoutes from '@/routes/ServerPage/index.js'; // Server Webpage

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;

// Set up view engine
app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), "src/views"));

// Serve static files
app.use(express.static(path.join(__dirname, '../src/public')));
app.use(express.json());

// Routes
app.use("/", serverPageRoutes); // Server Webpage

// Launch server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
  });
});

// Use this instead if ever, you have no internet and dont plan on using the database.
/*
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
})
*/


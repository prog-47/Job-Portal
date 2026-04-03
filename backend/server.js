import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
import cors from 'cors';


import { connectDB } from './config/db.js';

//import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import savedJobsRoutes from './routes/savedJobRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';


dotenv.config({quiet : true});
const PORT = process.env.PORT || 5000;

const app = express() ;

// Middleware to handle CORS
app.use(
 cors ({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
 })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("api/save-jobs", savedJobsRoutes);
app.use("/api/analytics",analyticsRoutes);


// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname,"uploads"), {}));

// Start Server

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

/* const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
 */
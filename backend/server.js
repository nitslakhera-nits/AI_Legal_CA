import express from 'express'; // create server , handle routes, and manage middleware
import cors from 'cors'; //Allows frontend (React, Vite, etc.) to talk to backend
import 'dotenv/config'; // store and manage environment variables
import bodyParser from 'body-parser'; // body-parser is middleware used to read data coming from client request body (like form data or JSON).
import connectDB from './src/config/database/db.js';
import userRoute from './src/routes/auth/authRoute.js'
import { errorHandler } from './src/middleware/errorMiddleware.js';


const PORT = process.env.PORT || 3001; // Use PORT from environment variables or default to 3001

const app = express(); // Create an instance of the Express application
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin (your frontend)
    credentials: true, // Allow cookies to be sent with requests
})); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Import and use user routes
app.use('/user' , userRoute)

app.use(errorHandler); // Use the error handling middleware

app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB when the server starts
    console.log(`Server is running on port ${PORT}`);
});


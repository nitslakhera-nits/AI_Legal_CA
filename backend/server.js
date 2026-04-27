import express from 'express'; // create server , handle routes, and manage middleware
import cors from 'cors'; //Allows frontend (React, Vite, etc.) to talk to backend
import 'dotenv/config'; // store and manage environment variables
import bodyParser from 'body-parser'; // body-parser is middleware used to read data coming from client request body (like form data or JSON).
import connectDB from './src/config/database/db.js';
import userRoute from './src/routes/auth/authRoute.js'


const PORT = process.env.PORT || 3001; // Use PORT from environment variables or default to 3001

const app = express(); // Create an instance of the Express application
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests


app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Import and use user routes
app.use('/user' , userRoute)

app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB when the server starts
    console.log(`Server is running on port ${PORT}`);
});


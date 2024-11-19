// Import necessary modules and initialize the Express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route handlers for specific routes
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const AdminRouter = require('./Routes/AdminRouter');
const MedicalRecordRouter = require('./Routes/MedicalRecordRoutes');

// Load environment variables and database connection
require('dotenv').config();
require('./Models/db');

// Set up server port, defaulting to 8080 if not specified in environment variables
const PORT = process.env.PORT || 8080;

// Basic route to test server status
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware setup for JSON parsing and CORS
app.use(bodyParser.json());
app.use(cors());

// Set up routing for various app sections Authenticated routes, Product routes, and Admin routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/Admin', AdminRouter);
app.use('/medicalRecord', MedicalRecordRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes file

const app = express();
app.use(express.json());
dotenv.config();

// MongoDB URI from .env
const mongourl = process.env.MONGO_URI || 'mongodb://localhost:27017/MERNAPP25';

// Connect to MongoDB
mongoose.connect(mongourl)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("An error occurred", err);
    });

// Use the user routes
app.use('/api', userRoutes);

// Use the PORT from .env, default to 3000 if not defined
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

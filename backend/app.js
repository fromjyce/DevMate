const express = require('express');
const cors = require('cors');
const activityRoutes = require('./routes/activityRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
require('dotenv').config();
require('./utils/db'); // If using a database, ensure it's connected

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests (useful for frontend communication)
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/activity', activityRoutes);
app.use('/api/collaboration', collaborationRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.send('AI Code Editor Backend is running...');
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const router = require('./routes/Router');
const sequelize = require('./config/database');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Start server
const startServer = async () => {
    try {
        // Sync database (create tables)
        await sequelize.sync();
        console.log('Database synced successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer(); 
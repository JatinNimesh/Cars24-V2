const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/users');
const roadTripRoutes = require('./routes/roadTrips');
const reviewRoutes = require('./routes/reviews');

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(logger);

// Routes
app.use('/users', userRoutes);
app.use('/roadTrips', roadTripRoutes);
app.use('/reviews', reviewRoutes);

// Error handling middleware (should be after routes)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

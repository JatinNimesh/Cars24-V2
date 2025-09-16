const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        // Verify token
        const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Replace with process.env.JWT_SECRET in production
        req.user = decoded; // Store user info in request
        next(); // Move to next middleware/route
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = auth;

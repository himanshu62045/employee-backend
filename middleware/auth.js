// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'agentDialer'; // Use the same secret as in your login controller
const tokenBlacklist = new Set();
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'Access denied. No token provided.'
        });
    }

     if (tokenBlacklist.has(token)) {
        return res.status(403).json({
            status: 'failed',
            message: 'Access denied. Token is blacklisted.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: 'Invalid token.'
        });
    }
};

const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};

module.exports = { authMiddleware, blacklistToken };


const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Generates a JWT token for authentication.
 */
function generateToken(user) {
    return jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '24h' });
}

/**
 * Middleware to protect API routes.
 */
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };

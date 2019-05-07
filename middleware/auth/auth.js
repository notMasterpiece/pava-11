const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ messsage: 'Authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SEKRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ messsage: 'Token is not valid' });
    }
};
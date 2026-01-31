const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Please log in first' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = verified; 
        
        next(); 
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

exports.checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access Denied: Admins only' });
    }
};
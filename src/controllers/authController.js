const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        const user = await authService.register(email, password, role);
        
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userWithoutPassword 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 
        });

        res.json({ 
            message: 'Logged in successfully', 
            userId: user._id,
            role: user.role 
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

exports.getMe = (req, res) => {
    res.json({
        userId: req.user.userId,
        role: req.user.role,
        message: "User is authenticated"
    });
};
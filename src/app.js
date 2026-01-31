const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(express.json());
app.use(express.json());
app.use(cookieParser()); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests, please try again later."
});
app.use('/api', limiter);

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes); 

app.get('/', (req, res) => {
    res.send('Blog API is running...');
});

module.exports = app;
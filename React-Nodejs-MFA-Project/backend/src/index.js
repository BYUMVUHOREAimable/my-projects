import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import './config/passportConfig.js';

// Load environment variables
dotenv.config();

// Connect to database
dbConnect();

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Allow multiple origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(json({ limit: "100mb" })); // Fixed typo: "100mbs" -> "100mb"
app.use(urlencoded({ limit: "100mb", extended: true }));

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 60 * 60 * 1000, // 1 hour (fixed: 600 * 60 was 10 hours)
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        }
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        message: 'The requested resource was not found',
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
    console.log(`✅ Server is running on: http://localhost:${PORT}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});
import { Router } from "express";
import passport from "passport";

import {
    register,
    login,
    authStatus,
    logout,
    setup2FA,
    verify2FA,
    reset2FA,
} from "../controllers/authController.js";

const router = Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized user" });
};

// Registration Route
router.post("/register", register);

// Login Route
router.post("/login", passport.authenticate("local"), login);

// Auth Status Route
router.get("/status", authStatus);

// Logout Route
router.post("/logout", logout); // Changed from GET to POST for security

// 2FA Setup Route
router.post("/2fa/setup", isAuthenticated, setup2FA);

// 2FA Verify Route
router.post("/2fa/verify", isAuthenticated, verify2FA);

// Reset 2FA Route
router.post("/2fa/reset", isAuthenticated, reset2FA);

export default router;
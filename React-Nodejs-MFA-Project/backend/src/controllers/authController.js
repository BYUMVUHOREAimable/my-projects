import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validation
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            password: hashedPassword, 
            isMfaActive: false 
        });
        
        console.log('New User:', newUser);
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            error: "Error registering user", 
            message: error.message 
        });
    }
};

export const login = async (req, res) => {
    try {
        console.log('The authenticated user is:', req.user);
        
        if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        // Check if 2FA is enabled
        if (req.user.isMfaActive) {
            return res.status(200).json({ 
                message: "2FA required",
                username: req.user.username,
                isMfaActive: true,
                requiresMfa: true
            });
        }

        // If no 2FA, return success
        res.status(200).json({ 
            message: "User logged in successfully",
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
            requiresMfa: false
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: "Login failed", 
            message: error.message 
        });
    }
};

export const authStatus = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                message: "User is authenticated",
                username: req.user.username,
                isMfaActive: req.user.isMfaActive
            });
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
    } catch (error) {
        console.error('Auth status error:', error);
        res.status(500).json({ 
            error: "Error checking authentication status", 
            message: error.message 
        });
    }
};

export const logout = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        
        req.logout((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(400).json({ 
                    error: "Error logging out", 
                    message: err.message 
                });
            }
            
            // Destroy session completely
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destroy error:', err);
                }
                res.clearCookie('connect.sid'); // Clear the session cookie
                res.status(200).json({ message: "User logged out successfully" });
            });
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ 
            error: "Error during logout", 
            message: error.message 
        });
    }
};

export const setup2FA = async (req, res) => {
    try {
        console.log('The req.user is:', req.user);
        
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const user = req.user;
        
        // Generate secret
        const secret = speakeasy.generateSecret({ 
            name: `NHIC (${user.username})`,
            length: 32
        });
        
        console.log('The secret object is:', secret);
        
        // Save secret to user but don't activate yet
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = false; // Only activate after verification
        await user.save();
        
        // Generate QR code URL
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${user.username}`,
            issuer: 'NHIC Portal',
            encoding: 'base32'
        });
        
        // Generate QR code image
        const qrImageUrl = await qrcode.toDataURL(url);
        
        res.status(200).json({
            secret: secret.base32,
            qrCode: qrImageUrl,
            message: "2FA setup initiated. Please verify to activate."
        });
           
    } catch (error) {
        console.error('2FA setup error:', error);
        res.status(500).json({ 
            error: "Error setting up 2FA", 
            message: error.message 
        });
    }   
};  

export const verify2FA = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const user = req.user;
        
        // Validation
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        if (!user.twoFactorSecret) {
            return res.status(400).json({ error: "2FA not set up for this user" });
        }

        // Verify the token
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token,
            window: 2 // Allow 2 time steps before/after for clock drift
        });

        if (verified) {
            // Activate MFA if this is first verification
            if (!user.isMfaActive) {
                user.isMfaActive = true;
                await user.save();
            }

            // Generate JWT token
            const jwtToken = jwt.sign(
                { 
                    username: user.username,
                    userId: user._id,
                    isMfaVerified: true
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Fixed typo: '1hr' -> '1h'
            );

            res.status(200).json({ 
                message: "2FA verification successful", 
                token: jwtToken,
                user: {
                    username: user.username,
                    isMfaActive: user.isMfaActive
                }
            });
        } else {
            res.status(400).json({ error: "Invalid 2FA token" });
        }
    } catch (error) {
        console.error('2FA verification error:', error);
        res.status(500).json({ 
            error: "Error verifying 2FA", 
            message: error.message 
        });
    }
};

export const reset2FA = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const user = req.user;
        user.twoFactorSecret = "";
        user.isMfaActive = false;
        await user.save();
        
        res.status(200).json({ message: "2FA reset successfully" });
    } catch (error) {
        console.error('2FA reset error:', error);
        res.status(500).json({ 
            error: "Error resetting 2FA", 
            message: error.message 
        });
    }
};
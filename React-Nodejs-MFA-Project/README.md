# React + Node.js Multifactor Authentication (MFA) Project

A complete full-stack application implementing secure authentication with Two-Factor Authentication (2FA) using TOTP (Time-based One-Time Password).

## 🏗️ Project Architecture

### Backend (Node.js + Express)
- **Framework**: Express.js with ES6 modules
- **Authentication**: Passport.js with Local Strategy
- **Session Management**: Express-session with secure cookies
- **Database**: MongoDB with Mongoose ODM
- **2FA**: Speakeasy for TOTP generation and QRCode for setup
- **Security**: Bcrypt for password hashing, JWT tokens

### Frontend (React + Vite)
- **Framework**: React 19 with Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Lucide React icons
- **HTTP Client**: Axios

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd React-Nodejs-MFA-Project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Setup

#### Backend Environment
Create `.env` file in the `backend` directory:

```env
PORT=7001
SESSION_SECRET=your-super-secure-session-secret-here
JWT_SECRET=your-super-secure-jwt-secret-here
CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/your-database
```

**Security Notes:**
- Use strong, unique secrets for production
- Never commit `.env` files to version control
- Use environment-specific configurations

### 3. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:7001`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:3000`

## 🔐 Authentication Flow

### 1. User Registration
1. Navigate to `/login`
2. Click "Create Account"
3. Enter username and password
4. Account created with 2FA disabled

### 2. First Login (No 2FA)
1. Enter credentials
2. Direct access to dashboard
3. Recommended to enable 2FA

### 3. Enable 2FA
1. Go to Dashboard → "Enable 2FA"
2. Scan QR code with authenticator app
3. Enter verification code
4. 2FA enabled for account

### 4. Login with 2FA
1. Enter username and password
2. Redirected to 2FA verification page
3. Enter 6-digit code from authenticator app
4. Access granted to dashboard

### 5. Reset/Disable 2FA
1. Go to Dashboard → "Reset 2FA"
2. Follow setup process again

## 📱 Supported Authenticator Apps

- **Google Authenticator** (iOS/Android)
- **Microsoft Authenticator** (iOS/Android)  
- **Authy** (iOS/Android/Desktop)
- **1Password** (includes authenticator feature)
- **Authenticator Pro** (iOS/Android)

## 🛡️ Security Features

### Backend Security
- **Password Hashing**: Bcrypt with salt rounds
- **Session Management**: Secure HTTP-only cookies
- **CSRF Protection**: SameSite cookie attributes
- **CORS Configuration**: Restricted origins
- **Rate Limiting**: Session-based protection
- **JWT Tokens**: For 2FA verification

### Frontend Security
- **Protected Routes**: Authentication guards
- **Session Context**: Global auth state
- **Secure Storage**: No sensitive data in localStorage
- **Input Validation**: Client and server-side
- **Error Handling**: Sanitized error messages

## 📁 Project Structure

```
React-Nodejs-MFA-Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── dbConnect.js      # MongoDB connection
│   │   │   └── passportConfig.js # Passport authentication
│   │   ├── controllers/
│   │   │   └── authController.js # Auth logic
│   │   ├── models/
│   │   │   └── user.js           # User schema
│   │   ├── routes/
│   │   │   └── authRoutes.js     # API routes
│   │   └── index.js              # Server entry
│   ├── .env                      # Environment variables
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx     # Login/Register form
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── context/
│   │   │   └── SessionContext.jsx # Auth state management
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Dashboard
│   │   │   ├── LoginPage.jsx     # Auth page
│   │   │   ├── Setup2FA.jsx      # 2FA setup
│   │   │   └── Verify2FA.jsx     # 2FA verification
│   │   ├── service/
│   │   │   ├── api.js            # Axios configuration
│   │   │   └── authApi.js        # Auth API calls
│   │   ├── App.jsx               # Main app component
│   │   └── routes.jsx            # React Router config
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/status` | Check auth status | ✅ |
| POST | `/logout` | User logout | ✅ |
| POST | `/2fa/setup` | Setup 2FA | ✅ |
| POST | `/2fa/verify` | Verify 2FA code | ✅ |
| POST | `/2fa/reset` | Reset 2FA | ✅ |

### Response Formats

#### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

#### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error"
}
```

## 🧪 Testing the Application

### 1. Test Registration
```bash
curl -X POST http://localhost:7001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### 2. Test Login
```bash
curl -X POST http://localhost:7001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}' \
  -c cookies.txt
```

### 3. Test 2FA Setup
```bash
curl -X POST http://localhost:7001/api/auth/2fa/setup \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

## 🚨 Production Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=80
SESSION_SECRET=your-production-secret
JWT_SECRET=your-production-jwt-secret
CONNECTION_STRING=your-production-mongodb
```

### Security Considerations
1. **Use HTTPS**: Enable SSL/TLS in production
2. **Environment Variables**: Never expose secrets in code
3. **Database Security**: Use MongoDB authentication
4. **Rate Limiting**: Implement API rate limiting
5. **Logging**: Set up proper logging and monitoring
6. **Backup**: Regular database backups

### Deployment Options
- **Docker**: Containerize with multi-stage builds
- **VPS**: Deploy to DigitalOcean, AWS, etc.
- **PaaS**: Heroku, Vercel, Netlify
- **Serverless**: AWS Lambda, Vercel Functions

## 🔍 Troubleshooting

### Common Issues

#### 1. CORS Errors
```javascript
// Ensure backend allows frontend origin
const corsOptions = {
    origin: ['http://localhost:3000', 'your-frontend-domain'],
    credentials: true
};
```

#### 2. Session Issues
```javascript
// Check session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
```

#### 3. 2FA Verification Failures
- Ensure device time is synchronized
- Check authenticator app timezone
- Verify secret key is correctly stored
- Check TOTP window configuration

#### 4. Database Connection
```javascript
// Test MongoDB connection string
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
```

## 📝 Development Notes

### Adding New Features
1. **Backend**: Add routes in `authRoutes.js`, implement in `authController.js`
2. **Frontend**: Add components, update routing in `routes.jsx`
3. **State**: Update `SessionContext.jsx` for global state
4. **Styling**: Use Tailwind CSS classes consistently

### Code Style
- **ESLint**: Configured for React and Node.js
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit hooks for code quality

### Performance Optimization
- **Code Splitting**: Implement lazy loading for routes
- **Caching**: Add Redis for session storage
- **Database**: Add indexes for queries
- **CDN**: Use CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙋‍♂️ Support

For issues and questions:
1. Check the troubleshooting section
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Include error messages, environment details, and reproduction steps

---

**Built with ❤️ using React, Node.js, and modern security practices**
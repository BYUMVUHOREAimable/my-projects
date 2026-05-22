@echo off
echo 🚀 Setting up React + Node.js MFA Project...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Check if .env file exists
if not exist .env (
    echo ⚙️  Creating backend .env file...
    copy .env.example .env
    echo 📝 Please edit backend\.env with your configuration:
    echo    - MongoDB connection string
    echo    - JWT secret
    echo    - Session secret
)

cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd client
call npm install

cd ..

echo 🎉 Setup completed!
echo.
echo 📋 Next Steps:
echo 1. Edit backend\.env with your configuration
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd client ^&^& npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📚 For detailed instructions, see README.md
pause
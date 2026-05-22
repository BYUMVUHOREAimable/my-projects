#!/bin/bash

# React + Node.js MFA Project Setup Script

echo "🚀 Setting up React + Node.js MFA Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚙️  Creating backend .env file..."
    cp .env.example .env
    echo "📝 Please edit backend/.env with your configuration:"
    echo "   - MongoDB connection string"
    echo "   - JWT secret"
    echo "   - Session secret"
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install

cd ..

echo "🎉 Setup completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit backend/.env with your configuration"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd client && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed instructions, see README.md"
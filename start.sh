#!/bin/bash
# Quick Start Script for ReferralAI

echo "🚀 Starting ReferralAI..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create env files from examples
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
    echo "📝 Creating frontend/.env.local..."
    cp frontend/.env.local.example frontend/.env.local
fi

# Start services
echo "🐳 Starting Docker containers..."
docker-compose up --build

echo "✅ ReferralAI is running!"
echo ""
echo "📍 Services:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:5000/api"
echo "   AI Engine: http://localhost:8000/docs"
echo "   MongoDB:   mongodb://admin:password123@localhost:27017"
echo ""
echo "👤 Test Accounts:"
echo "   Candidate:  candidate@test.com / password123"
echo "   Recruiter:  recruiter@test.com / password123"
echo "   Referrer:   referrer@test.com / password123"

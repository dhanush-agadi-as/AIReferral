@echo off
REM Quick Start Script for ReferralAI (Windows)

echo 🚀 Starting ReferralAI on Windows...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop for Windows and try again.
    pause
    exit /b 1
)

echo ✅ Docker is installed

REM Create env files from examples
if not exist "backend\.env" (
    echo 📝 Creating backend/.env...
    copy backend\.env.example backend\.env
)

if not exist "frontend\.env.local" (
    echo 📝 Creating frontend/.env.local...
    copy frontend\.env.local.example frontend\.env.local
)

REM Start services
echo 🐳 Starting Docker containers...
docker-compose up --build

echo ✅ ReferralAI is running!
echo.
echo 📍 Services:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:5000/api
echo    AI Engine: http://localhost:8000/docs
echo    MongoDB:   mongodb://admin:password123@localhost:27017
echo.
echo 👤 Test Accounts:
echo    Candidate:  candidate@test.com / password123
echo    Recruiter:  recruiter@test.com / password123
echo    Referrer:   referrer@test.com / password123
echo.
pause

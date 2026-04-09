# 🚀 ReferralAI - Setup & Deployment Guide

## 📋 Prerequisites

- Docker & Docker Compose (v1.29+)
- Git
- Node.js 18+ (for local development)
- Python 3.9+ (for AI engine local development)
- MongoDB (or use Docker)

## 🏃 Quick Start

### 1. Clone and Navigate

```bash
cd ReferralAI
```

### 2. Copy Environment Files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### 3. Start All Services

```bash
docker-compose up --build
```

Wait for all services to be healthy:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api
- AI Engine: http://localhost:8000/docs
- MongoDB: mongodb://localhost:27017

### 4. Test the System

**Register as different users:**
- Candidate: `candidate@test.com`
- Recruiter: `recruiter@test.com`
- Referrer: `referrer@test.com`

Password: `password123` (example only)

---

## 📚 Demo Flow

### Step 1: Candidate Profile

1. Login as candidate
2. Dashboard auto-populates mock AI skill analysis
3. See job recommendations with match percentages

### Step 2: Recruiter Posts Job

1. Login as recruiter
2. Click "+ Post New Job"
3. Fill job details:
   - Title: "Senior React Developer"
   - Skills: "React, JavaScript, TypeScript"
   - Experience: "5+ years"
4. Submit

### Step 3: AI Matching

- AI engine processes job + candidate skills
- Returns match percentage (TF-IDF based)

### Step 4: Referrer Screening

1. Login as referrer
2. Browse candidates
3. Send screening chat messages
4. Submit recommendation with confidence level

### Step 5: Interview & Proctoring

1. Recruiter creates interview meeting
2. Get meeting ID + password
3. Candidate joins interview room
4. Live code editor with syntax highlighting
5. Tab switch detection triggers warnings
- 1st violation: warning
- 2nd violation: recruiter alert
- 3rd violation: auto-terminate

---

## 🗄️ Database Seed (Optional)

Add test data to MongoDB:

```bash
docker exec referralai_mongo mongosh -u admin -p password123 << EOF
use referralai
db.users.insertMany([
  {
    email: "candidate1@test.com",
    password: "hashed_password",
    role: "candidate",
    skills: ["Python", "JavaScript", "React", "Node.js"],
    trustScore: 75
  }
])
EOF
```

---

## 🛠️ Local Development (Without Docker)

### Backend

```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

### AI Engine

```bash
cd ai-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Starts on port 8000
```

Make sure MongoDB is running on `localhost:27017`

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed

```bash
# Check MongoDB service
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### API Not Connecting

```bash
# Check backend logs
docker-compose logs backend

# Verify API is responding
curl http://localhost:5000/api/health
```

### Frontend Blank Page

```bash
# Clear Next.js cache
rm -rf frontend/.next

# Rebuild frontend
docker-compose build frontend
```

---

## 🚀 Production Deployment

### Using Docker Compose (Production)

```bash
# Set production environment
export MONGO_USER=admin
export MONGO_PASSWORD=secure_password_here
export JWT_SECRET=production_jwt_secret_key_very_long
export FRONTEND_API_URL=https://yourdomain.com/api
export FRONTEND_SOCKET_URL=https://yourdomain.com

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment Options

#### AWS Deployment

1. **Frontend**: AWS S3 + CloudFront
   ```bash
   npm run build
   aws s3 sync out/ s3://referralai-bucket/
   ```

2. **Backend**: AWS EC2 + ECS
   ```bash
   docker build -t referralai-backend ./backend
   docker tag referralai-backend:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/referralai-backend:latest
   docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/referralai-backend:latest
   ```

3. **Database**: AWS RDS MongoDB Atlas

#### Heroku Deployment

```bash
# Frontend
cd frontend
git push heroku main

# Backend
cd backend
git push heroku main
```

#### Railway.app Deployment

```bash
railway link
railway up
```

#### Azure Container Instances

```bash
az containerapp create \
  --name referralai-backend \
  --image referralai-backend:latest \
  --registry-server referralairegistry.azurecr.io
```

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Update MongoDB credentials
- [ ] Enable HTTPS/SSL certificates
- [ ] Set strong CORS origins
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Setup WAF (Web Application Firewall)
- [ ] Enable logging and monitoring
- [ ] Regular security audits
- [ ] Backup MongoDB regularly

---

## 📊 Monitoring & Logs

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Health Checks

```bash
# Backend health
curl http://localhost:5000/api/health

# AI Engine health
curl http://localhost:8000/health
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### AI Engine Tests

```bash
cd ai-engine
pytest
```

---

## 📞 Support & Contact

- GitHub: [ReferralAI/referralai](https://github.com/referralai/referralai)
- Docs: See README.md files in each folder
- Issues: Open GitHub issue
- Email: support@referralai.dev

---

## 📝 Changelog

### v1.0.0 (MVP)
- Core authentication system
- AI skill dashboard
- Job posting & matching
- Referrer pre-screening
- Live interview room
- Proctoring system with tab detection

### Future (v1.1+)
- Agora/Twilio video integration
- OAuth (Google, GitHub, LinkedIn)
- Automated resume extraction
- Advanced proctoring (webcam, copy-paste)
- Mobile app (React Native)
- Blockchain rewards system

---

**Built with ❤️ for the hiring ecosystem**

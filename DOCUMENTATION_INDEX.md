# 📖 ReferralAI - Complete Documentation Index

**Welcome to ReferralAI - Decentralized AI-Powered Hiring Ecosystem**

## 🚀 Getting Started (Read These First)

Start here if you're new to the project:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡ (2 minutes)
   - One-command setup
   - Quick verification
   - Basic troubleshooting

2. **[README.md](README.md)** 📘 (10 minutes)
   - Project overview
   - Feature highlights
   - Tech stack summary
   - Quick links to all services

3. **[EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)** 💼 (15 minutes)
   - Problem & solution
   - Why ReferralAI
   - Business model
   - Growth roadmap

## 🛠️ Setup & Deployment

For detailed setup and deployment:

4. **[SETUP.md](SETUP.md)** 🔧 (30 minutes)
   - Complete installation guide
   - Local development setup
   - Docker deployment
   - Cloud deployment options (AWS, Azure, GCP, Heroku)
   - Troubleshooting guide
   - Security checklist

5. **[docker-compose.yml](docker-compose.yml)** 🐳
   - Development environment configuration
   - All 4 services defined
   - Volume mounting
   - Environment variables

6. **[docker-compose.prod.yml](docker-compose.prod.yml)** 🏭
   - Production environment configuration
   - Optimized container settings
   - Security configurations

## 📚 API & Integration

For developers building with ReferralAI:

7. **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** 📖 (Comprehensive)
   - Complete API reference
   - All endpoints documented
   - Request/response examples
   - Authentication details
   - Socket.io events
   - Error codes

## 🧪 Testing & Quality Assurance

For QA and testing:

8. **[TESTING.md](TESTING.md)** 🧪 (Complete QA Guide)
   - Manual testing scenarios
   - API testing with cURL
   - Test data
   - Performance testing
   - Continuous integration example
   - Common issues & fixes

9. **[DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md)** ✅
   - Pre-deployment checklist
   - Verification for each component
   - Performance testing
   - Post-deployment monitoring
   - Security verification

## 🏗️ Architecture & Project Structure

For understanding the system:

10. **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** 🎯
    - Architecture diagrams
    - Project structure
    - Key features by phase
    - Database schema
    - Real-world flow examples
    - Performance metrics

## 📁 Source Code Structure

Navigate the codebase:

### Frontend (Next.js + React 18)
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.jsx           # Landing page
│   │   ├── layout.jsx         # App layout
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   └── login/
│   │   ├── dashboard/
│   │   │   ├── candidate/
│   │   │   ├── recruiter/
│   │   │   └── referrer/
│   │   └── interview/         # Live interview room
│   ├── components/            # Reusable components
│   └── lib/                   # API client, Socket.io, Store
├── tailwind.config.js
├── next.config.js
└── README.md
```

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── index.js              # Server + Socket.io
│   ├── models/               # MongoDB schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Referral.js
│   │   ├── Meeting.js
│   │   └── Message.js
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── candidateController.js
│   │   ├── recruiterController.js
│   │   ├── referrerController.js
│   │   └── meetingController.js
│   ├── routes/               # API endpoints
│   │   ├── auth.js
│   │   ├── candidates.js
│   │   ├── recruiters.js
│   │   ├── referrers.js
│   │   └── meetings.js
│   ├── middleware/           # Auth, validation
│   └── utils/                # Helper functions
├── package.json
├── Dockerfile
└── README.md
```

### AI Engine (Python + FastAPI)
```
ai-engine/
├── app/
│   └── main.py              # FastAPI app + all endpoints
├── models/                  # (For future ML models)
├── requirements.txt
├── Dockerfile
└── README.md
```

## 🔌 Key API Endpoints Quick Reference

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh JWT token

### Candidates
- `GET /candidates/dashboard` - AI skill dashboard
- `GET /candidates/jobs/recommendations` - Job recomm...
- `POST /candidates/apply` - Apply to job
- `GET /candidates/profile` - User profile
- `PUT /candidates/profile` - Update profile

### Recruiters
- `POST /recruiters/jobs` - Create job
- `GET /recruiters/jobs/:id/candidates` - View candidates
- `POST /recruiters/meetings` - Create interview
- `GET /recruiters/stats` - Statistics

### Referrers
- `GET /referrers/candidates` - Browse candidates
- `POST /referrers/screening/message` - Send chat
- `GET /referrers/screening/:id/messages` - Get chat
- `POST /referrers/recommend` - Submit recommendation
- `GET /referrers/stats` - Referrer statistics

### Meetings
- `POST /meetings/join` - Join interview
- `PUT /meetings/code` - Update code
- `POST /meetings/violation` - Report violation
- `POST /meetings/end` - End meeting
- `GET /meetings/:id` - Meeting details

### AI Engine
- `POST /parse-resume` - Parse resume & extract skills
- `POST /match-candidate-job` - Calculate match %
- `POST /extract-skills` - Extract skills from text
- `POST /generate-embeddings` - Generate vectors
- `POST /recommend-jobs` - Get recommendations

## 🎯 Feature Breakdown

### User Roles Implemented
- ✅ **Candidate** - Apply to jobs, view recommendations, interview
- ✅ **Recruiter** - Post jobs, manage candidates, conduct interviews
- ✅ **Referrer** - Screen candidates, submit recommendations
- 📋 **Admin** - (Prepared, not implemented in MVP)

### Core Modules
1. **Authentication** ✅
   - JWT tokens
   - Bcrypt hashing
   - Role-based access

2. **AI Engine** ✅
   - Resume parsing
   - Skill extraction
   - Job matching (TF-IDF)
   - Recommendations

3. **Interview System** ✅
   - Live meeting creation
   - Code editor with syntax highlighting
   - Video placeholder (WebRTC ready)
   - Real-time code sync

4. **Proctoring** ✅
   - Tab switch detection
   - Violation tracking
   - Auto-termination

5. **Real-time Communication** ✅
   - Socket.io chat
   - Code synchronization
   - Violation alerts

## 📊 File Count & LOC

| Component | Files | Lines |
|-----------|-------|-------|
| Backend | 15+ | 1000+ |
| Frontend | 12+ | 1200+ |
| AI Engine | 1 | 400+ |
| Configuration | 10+ | 500+ |
| Documentation | 10+ | 5000+ |
| **Total** | **50+** | **8000+** |

## 🎓 What You Can Learn

- **Full-Stack Web Development** (Next.js, Node.js, MongoDB)
- **API Design** (REST, Socket.io, Real-time)
- **Database Design** (MongoDB schemas, relationships)
- **AI/ML Integration** (NLP, TF-IDF, Embeddings)
- **Authentication** (JWT, Bcrypt, RBAC)
- **DevOps** (Docker, Docker Compose, Deployment)
- **Best Practices** (Error handling, validation, security)

## 🚀 Deployment Paths

### Development
```bash
docker-compose up --build
```

### Production (Self-Hosted)
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Platforms
1. **Heroku** - `git push heroku main`
2. **Railway** - One-click deployment
3. **Vercel** (Frontend) - Git integration
4. **AWS** - EC2 + ECS + RDS
5. **Azure** - App Service + Cosmos DB
6. **Google Cloud** - Cloud Run + Firestore

## 🔐 Security Checklist

See [SETUP.md](SETUP.md#-security-checklist) for complete list:
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ Rate limiting ready

## 📞 Support & Resources

### Documentation
- Each folder has its own README.md
- API_DOCUMENTATION.md has full endpoint reference
- SETUP.md covers all deployment scenarios

### Troubleshooting
- SETUP.md includes troubleshooting section
- TESTING.md has common issues & fixes
- Check Docker logs: `docker-compose logs`

### Getting Help
1. Read relevant documentation
2. Check troubleshooting guides
3. Review test scenarios
4. Check Docker logs for errors

## 🎯 Quick Navigation by Role

### 👨‍💻 **Developer**
1. Start: [QUICKSTART.md](QUICKSTART.md)
2. Setup: [SETUP.md](SETUP.md#-local-development-without-docker)
3. Code: Check `backend/src/`, `frontend/src/`, `ai-engine/`
4. API: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### 👥 **DevOps/Infrastructure**
1. Start: [QUICKSTART.md](QUICKSTART.md)
2. Deploy: [SETUP.md](SETUP.md#-production-deployment)
3. Verify: [DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md)
4. Config: [docker-compose.prod.yml](docker-compose.prod.yml)

### 🧪 **QA/Tester**
1. Start: [QUICKSTART.md](QUICKSTART.md)
2. Test: [TESTING.md](TESTING.md)
3. Verify: [DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md)
4. Demo: Follow demo flow in [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)

### 📊 **Product Manager**
1. Overview: [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)
2. Features: [README.md](README.md#-core-features)
3. Roadmap: [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md#-growth-potential)
4. Architecture: [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

## 📈 Document Reading Order

**New to project?** Read in this order:
1. QUICKSTART.md (5 min)
2. README.md (10 min)
3. EXECUTIVE_SUMMARY.md (15 min)
4. PROJECT_OVERVIEW.md (20 min)
5. SETUP.md for your use case (30 min)
6. API_DOCUMENTATION.md as needed (reference)
7. TESTING.md for QA (reference)

## 🎊 You're All Set!

Everything is documented, tested, and ready to go.

**Start here:** `docker-compose up --build`

**Questions?** Check the relevant documentation above.

---

**Last Updated:** January 2024
**Status:** ✅ Production Ready
**Version:** 1.0.0 MVP

# 🎯 ReferralAI - Project Overview

## Project Structure at a Glance

```
ReferralAI/
├── 📄 README.md                    # Main project documentation
├── 📄 SETUP.md                     # Setup & deployment guide
├── 📄 API_DOCUMENTATION.md         # Complete API reference
├── 📄 TESTING.md                   # Testing & QA guide
├── 📦 docker-compose.yml           # Development environment
├── 📦 docker-compose.prod.yml      # Production environment
│
├── 🔧 backend/                     # Node.js + Express
│   ├── src/
│   │   ├── index.js               # Main server + Socket.io
│   │   ├── models/                # MongoDB schemas
│   │   ├── controllers/           # Request handlers
│   │   ├── routes/                # API endpoints
│   │   ├── middleware/            # Auth & validation
│   │   └── services/              # Business logic
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── 🎨 frontend/                    # Next.js + React
│   ├── src/
│   │   ├── app/                   # Next.js app directory
│   │   ├── components/            # Reusable components
│   │   ├── lib/                   # Utilities & API client
│   │   └── pages/                 # Legacy pages
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── README.md
│
└── 🤖 ai-engine/                   # Python + FastAPI
    ├── app/
    │   └── main.py                # FastAPI server
    ├── requirements.txt
    ├── Dockerfile
    └── README.md
```

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Next.js/React)│
│  Port: 3000     │
└────────┬────────┘
         │ HTTP/WebSocket
┌────────▼────────┐         ┌──────────────┐
│   Backend       │◄────────│  AI Engine   │
│ (Express.js)    │         │  (FastAPI)   │
│  Port: 5000     │         │  Port: 8000  │
└────────┬────────┘         └──────────────┘
         │
┌────────▼────────────────┐
│   MongoDB Database      │
│   Port: 27017           │
└─────────────────────────┘
```

## 🔑 Key Features Implemented

### ✅ Phase 1: Authentication & Roles
- JWT-based authentication
- Role-based access control (Candidate/Recruiter/Referrer)
- Bcrypt password hashing
- Protected routes

### ✅ Phase 2: User Dashboards
- Candidate dashboard with AI skill analysis
- Recruiter dashboard for job management
- Referrer dashboard for candidate screening

### ✅ Phase 3: AI Matching System
- Resume parsing with skill extraction
- TF-IDF based job matching
- Match percentage calculations
- Personalized recommendations

### ✅ Phase 4: Interview System
- Live meeting creation
- Real-time code editor
- Video placeholder (for Agora integration)
- Proctoring system with tab detection

### ✅ Phase 5: Real-time Communication
- Socket.io for live chat
- Message broadcasting
- Violation notifications
- Meeting state synchronization

## 📊 Database Schema

### Collections
1. **Users** - Candidates, Recruiters, Referrers
2. **Jobs** - Job postings with applications
3. **Referrals** - Referrer recommendations
4. **Meetings** - Interview sessions with proctoring
5. **Messages** - Chat messages between users

## 🎯 Demo Flow

```
1. User Registration
   ├─ Candidate creates profile
   ├─ Recruiter creates account
   └─ Referrer joins platform

2. Job Posting
   └─ Recruiter posts job with skills

3. AI Matching
   ├─ Candidate gets recommendations
   └─ Match % calculated by AI engine

4. Referrer Screening
   ├─ Browse candidates
   ├─ Send chat messages
   └─ Submit recommendation

5. Interview & Proctoring
   ├─ Recruiter creates meeting
   ├─ Candidate joins interview room
   ├─ Live coding with editor
   └─ Tab switch detection → violation → termination
```

## 🚀 Quick Reference Commands

**Start Development**
```bash
docker-compose up --build
```

**View Logs**
```bash
docker-compose logs backend -f
```

**Run Tests**
```bash
npm run test --prefix backend
```

**Stop Services**
```bash
docker-compose down
```

## 🌐 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web UI |
| Backend | http://localhost:5000/api | REST API |
| AI Engine | http://localhost:8000/docs | ML Services |
| MongoDB | mongodb://localhost:27017 | Database |
| Swagger | http://localhost:8000/docs | API Docs |

## 🔐 Security Features

- JWT token-based auth (24h expiry)
- Bcrypt password hashing (10 rounds)
- Role-based access control
- CORS configuration
- Database injection prevention
- Rate limiting ready (implement with express-rate-limit)
- Input validation with express-validator

## 📈 Performance Optimizations

- TF-IDF vectorization for fast matching
- Socket.io for real-time updates (< 100ms latency)
- MongoDB indexes on frequently queried fields
- Frontend code splitting with Next.js
- Image optimization with Next.js Image component

## 🎨 UI/UX Highlights

- Modern gradient design (Tailwind CSS)
- Dark mode by default
- Responsive layouts (mobile, tablet, desktop)
- Real-time notifications
- Intuitive dashboards for each role
- Live code editor interface

## 🔄 Request Flow Example

**User Login:**
```
1. Frontend submits email/password
2. Backend validates credentials
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Subsequent requests include Authorization header
6. Middleware validates token
7. Request proceeds with user context
```

## 📱 API Response Format

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { ... },
  "status": 200
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": 400
}
```

## 🌟 Unique Features

1. **Decentralized Referrals** - Community drives hiring through trusted networks
2. **Pre-Screening Chat** - Validate candidates before formal interviews
3. **Smart Scoring** - 70% AI + 30% Referrer with trust multiplier
4. **Proctoring System** - Tab switch detection + auto-termination
5. **Real-time Collaboration** - Code sync during interviews

## 🚀 Future Roadmap

- **v1.1**: Agora SDK integration for video
- **v1.2**: LinkedIn OAuth + talent scraping
- **v1.3**: Blockchain for referral rewards
- **v1.4**: Mobile app (React Native)
- **v2.0**: Advanced ML (GPT-based resume analysis)
- **v2.1**: Multi-language support
- **v2.2**: Video interviewing (Loom integration)
- **v3.0**: Enterprise marketplace

## 🤝 Contributing

Guidelines for team contributions:
1. Follow project structure
2. Write tests for new features
3. Update documentation
4. Use conventional commits
5. Create PRs for review

## 📞 Support Resources

- **Docs**: See README files in each folder
- **API**: Review API_DOCUMENTATION.md
- **Setup**: Follow SETUP.md
- **Testing**: Consult TESTING.md
- **Issues**: Open GitHub issue

---

**Built for the future of hiring** 🚀

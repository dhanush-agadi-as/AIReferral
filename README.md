# ReferralAI – Decentralized AI-Powered Hiring Ecosystem

A production-ready full-stack platform combining **AI-based skill evaluation**, **community-driven referrals**, **pre-referral candidate validation**, and **secure proctored interviews**.

## 🎯 Core Features

### MVP Features (Hackathon)
- ✅ JWT-based authentication with role-based access control
- ✅ Candidate AI dashboard with resume parsing & skill extraction
- ✅ AI-powered job matching system
- ✅ Referrer pre-screening with chat & optional video
- ✅ Recruiter dashboard for job posting & candidate shortlisting
- ✅ Real-time interview system with code editor
- ✅ Tab switching detection for proctoring
- ✅ Real-time communication via Socket.io

### User Roles
1. **Candidate** - Apply for jobs, get AI-powered recommendations
2. **Recruiter** - Post jobs, screen candidates, conduct interviews
3. **Referrer** - Recommend candidates, conduct pre-screening
4. **Admin** - System management (optional)

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 + React 18 + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **AI Engine** | Python FastAPI + spaCy/transformers |
| **Database** | MongoDB |
| **Real-time** | Socket.io |
| **Video** | WebRTC (Agora for production) |
| **Authentication** | JWT + bcrypt |

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for AI engine)
- MongoDB (or use Docker)

### Installation & Setup

```bash
# Clone and navigate to project
cd ReferralAI

# Start all services with Docker Compose
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
# AI Engine: http://localhost:8000/docs
# MongoDB: mongodb://admin:password123@localhost:27017/referralai
```

### Local Development (Without Docker)

#### Backend Setup
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

#### AI Engine Setup
```bash
cd ai-engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Starts on port 8000
```

## 📁 Project Structure

```
ReferralAI/
├── backend/                    # Node.js Express backend
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── controllers/        # Request handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── middleware/        # Auth, validation
│   │   ├── services/          # Business logic
│   │   └── utils/             # Helper functions
│   ├── Dockerfile
│   └── package.json
├── frontend/                   # Next.js React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Next.js pages
│   │   ├── lib/              # Utilities & API client
│   │   └── styles/           # Tailwind config
│   ├── Dockerfile.dev
│   └── package.json
├── ai-engine/                 # Python FastAPI
│   ├── app/
│   │   └── main.py           # FastAPI app
│   ├── models/               # ML models
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml        # Container orchestration
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Candidate
- `GET /api/candidates/dashboard` - Get AI dashboard
- `POST /api/candidates/apply` - Apply to job
- `GET /api/candidates/jobs` - Get job recommendations

### Recruiter
- `POST /api/recruiter/jobs` - Create job posting
- `GET /api/recruiter/candidates` - Get matched candidates
- `POST /api/recruiter/meetings` - Create interview meeting

### Referrer
- `GET /api/referrer/candidates` - Browse candidates
- `POST /api/referrer/screening` - Chat with candidate
- `POST /api/referrer/recommend` - Submit recommendation

### AI Engine
- `POST /ai/parse-resume` - Parse resume & extract skills
- `POST /ai/match-candidate-job` - Get match percentage
- `POST /ai/generate-embeddings` - Generate semantic vectors

## 💾 Database Schema

### Collections

**Users**
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String (candidate/recruiter/referrer),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String
  },
  skills: [String],
  trustScore: Number (0-100),
  createdAt: Date
}
```

**Jobs**
```javascript
{
  _id: ObjectId,
  recruiterId: ObjectId,
  title: String,
  description: String,
  requiredSkills: [String],
  experience: String,
  salary: String,
  status: String (open/closed),
  createdAt: Date
}
```

**Referrals**
```javascript
{
  _id: ObjectId,
  referrerId: ObjectId,
  candidateId: ObjectId,
  jobId: ObjectId,
  confidence: String (High/Medium/Low),
  comment: String,
  validationType: String (chat/video),
  status: String (submitted/accepted/rejected),
  aiScore: Number,
  referrerScore: Number,
  finalScore: Number,
  createdAt: Date
}
```

**Meetings**
```javascript
{
  _id: ObjectId,
  jobId: ObjectId,
  candidateId: ObjectId,
  recruiterId: ObjectId,
  meetingId: String,
  password: String,
  type: String (video/coding),
  startTime: Date,
  status: String (scheduled/in-progress/completed),
  tabSwitches: Number,
  violations: [String]
}
```

## 🤖 Scoring System

```
Final Score = (0.7 * AI Score) + (0.3 * Referrer Score * Referrer Trust Score)

AI Score: Resume & skill match (0-100)
Referrer Score: Based on pre-screening (0-100)
Referrer Trust Score: Historical accuracy (0-1)
```

## 🎥 Real-Time Features

### Socket.io Events
- `join-chat` - Join chat channel
- `send-message` - Send message
- `join-meeting` - Enter interview room
- `code-update` - Sync code editor
- `tab-switch` - Detect tab change
- `alert-violation` - Notify violation

## 🚨 Proctoring System

**Tab Switch Detection:**
- 1st violation → Warning message
- 2nd violation → Alert to recruiter
- 3rd violation → Auto-terminate interview

## 🔐 Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Role-based access control (RBAC)
- CORS configuration
- Input validation & sanitization
- MongoDB injection prevention
- Rate limiting on auth endpoints

## 📊 Performance Metrics

- **Resume Parsing**: ~500ms via AI engine
- **Job Matching**: ~1000ms (vector similarity)
- **Real-time Latency**: <100ms via Socket.io

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test

# AI Engine tests
cd ai-engine
pytest
```

## 📝 Environment Variables

Create `.env` files in each service:

**Backend (.env)**
```
MONGO_URI=mongodb://admin:password123@localhost:27017/referralai?authSource=admin
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
AI_ENGINE_URL=http://localhost:8000
PORT=5000
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

**AI Engine (.env)**
```
PYTHONUNBUFFERED=1
```

## 🚀 Deployment

### Production Deployment

**Docker Deployment:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

**Cloud Deployment (AWS/GCP/Azure):**
- Frontend: Vercel/Netlify/S3 + CloudFront
- Backend: PaaS (Heroku, Railway, Render)
- AI Engine: Containerized on EC2/App Engine
- Database: MongoDB Atlas

## 📚 Documentation

- [Backend API Docs](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [AI Engine Docs](./ai-engine/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] Production-grade Agora integration
- [ ] Advanced proctoring (webcam monitoring, copy-paste detection)
- [ ] OAuth integration (Google, GitHub, LinkedIn)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Blockchain-based referral rewards
- [ ] Multi-language support

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the team.

---

**Built with ❤️ for the hiring ecosystem**

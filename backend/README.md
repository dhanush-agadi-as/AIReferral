# Backend - ReferralAI

Node.js Express backend for the ReferralAI hiring platform.

## Setup

```bash
npm install
npm run dev  # Starts development server on port 5000
```

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Candidates
- `GET /api/candidates/dashboard` - Get AI skill dashboard
- `GET /api/candidates/jobs/recommendations` - Get job recommendations
- `POST /api/candidates/apply` - Apply to job
- `GET /api/candidates/profile` - Get candidate profile
- `PUT /api/candidates/profile` - Update candidate profile

### Recruiters
- `POST /api/recruiters/jobs` - Create job posting
- `GET /api/recruiters/jobs/:jobId/candidates` - Get matched candidates
- `POST /api/recruiters/meetings` - Create interview meeting
- `GET /api/recruiters/stats` - Get recruiter statistics

### Referrers
- `GET /api/referrers/candidates` - Browse candidates
- `POST /api/referrers/screening/message` - Send screening chat message
- `GET /api/referrers/screening/:candidateId/messages` - Get chat history
- `POST /api/referrers/recommend` - Submit recommendation
- `GET /api/referrers/stats` - Get referrer statistics

### Meetings
- `POST /api/meetings/join` - Join interview meeting
- `PUT /api/meetings/code` - Update code submission
- `POST /api/meetings/violation` - Record proctoring violation
- `POST /api/meetings/end` - End meeting
- `GET /api/meetings/:meetingId` - Get meeting details

## Environment Variables

```
MONGO_URI=mongodb://admin:password123@localhost:27017/referralai?authSource=admin
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
AI_ENGINE_URL=http://localhost:8000
PORT=5000
```

## Testing

```bash
npm run test
```

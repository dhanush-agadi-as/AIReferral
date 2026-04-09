# 📚 ReferralAI - API Documentation

Complete API reference for ReferralAI backend.

## 🔗 Base URL

```
http://localhost:5000/api
```

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📌 Authentication Endpoints

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password_123",
  "role": "candidate|recruiter|referrer",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "candidate",
    "profile": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password_123"
}
```

### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "token": "existing_token_here"
}
```

---

## 👤 Candidate Endpoints

### Get Dashboard

```http
GET /candidates/dashboard
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "profile": {...},
    "skills": ["Python", "React"]
  },
  "skillDashboard": {
    "skills": ["Python", "React", "Node.js"],
    "strengths": ["Full-stack development", "5 years experience"],
    "weaknesses": [],
    "recommendations": ["Learn AWS / Cloud"]
  }
}
```

### Get Job Recommendations

```http
GET /candidates/jobs/recommendations
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "recommendations": [
    {
      "job": {
        "_id": "...",
        "title": "Senior React Developer",
        "description": "...",
        "requiredSkills": ["React", "TypeScript", "Node.js"]
      },
      "matchPercentage": 85,
      "explanation": "85% match - You have React + TypeScript skills"
    }
  ]
}
```

### Apply to Job

```http
POST /candidates/apply
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011"
}
```

### Get Profile

```http
GET /candidates/profile
Authorization: Bearer <TOKEN>
```

### Update Profile

```http
PUT /candidates/profile
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Full-stack developer",
    "location": "San Francisco"
  },
  "skills": ["Python", "React", "Node.js"],
  "experience": "5 years in software development",
  "github": {
    "username": "johndoe",
    "url": "https://github.com/johndoe"
  }
}
```

---

## 💼 Recruiter Endpoints

### Create Job Posting

```http
POST /recruiters/jobs
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "title": "Senior Python Developer",
  "description": "Looking for an experienced Python developer...",
  "requiredSkills": ["Python", "FastAPI", "PostgreSQL"],
  "experience": "5+ years",
  "salary": {
    "min": 120000,
    "max": 150000,
    "currency": "USD"
  },
  "location": "San Francisco, CA",
  "jobType": "full-time"
}
```

**Response:**
```json
{
  "message": "Job posted successfully",
  "job": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Senior Python Developer",
    "status": "open",
    "applications": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Matched Candidates

```http
GET /recruiters/jobs/:jobId/candidates
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "candidates": [
    {
      "candidateId": "507f1f77bcf86cd799439012",
      "name": "John Smith",
      "email": "john@example.com",
      "skills": ["Python", "FastAPI", "PostgreSQL"],
      "trustScore": 85,
      "appliedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Interview Meeting

```http
POST /recruiters/meetings
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011",
  "candidateId": "507f1f77bcf86cd799439012",
  "type": "video-interview|coding-round|screening"
}
```

**Response:**
```json
{
  "message": "Meeting created",
  "meeting": {
    "meetingId": "550e8400-e29b-41d4-a716-446655440000",
    "password": "abc123def",
    "type": "coding-round"
  }
}
```

### Get Job Statistics

```http
GET /recruiters/stats
Authorization: Bearer <TOKEN>
```

---

## 🤝 Referrer Endpoints

### Browse Candidates

```http
GET /referrers/candidates
Authorization: Bearer <TOKEN>
```

### Send Screening Message

```http
POST /referrers/screening/message
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "candidateId": "507f1f77bcf86cd799439012",
  "content": "Tell me about your recent projects..."
}
```

### Get Screening Messages

```http
GET /referrers/screening/:candidateId/messages
Authorization: Bearer <TOKEN>
```

### Submit Recommendation

```http
POST /referrers/recommend
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "candidateId": "507f1f77bcf86cd799439012",
  "jobId": "507f1f77bcf86cd799439011",
  "confidence": "High|Medium|Low",
  "comment": "Great developer, highly recommend",
  "validationType": "chat|video|resume-review",
  "scores": {
    "aiScore": 85,
    "referrerScore": 90
  }
}
```

### Get Referrer Statistics

```http
GET /referrers/stats
Authorization: Bearer <TOKEN>
```

---

## 🎥 Interview/Meeting Endpoints

### Join Meeting

```http
POST /meetings/join
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "meetingId": "550e8400-e29b-41d4-a716-446655440000",
  "password": "abc123def"
}
```

### Update Code Submission

```http
PUT /meetings/code
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "meetingId": "550e8400-e29b-41d4-a716-446655440000",
  "code": "def hello():\n    print('Hello World')",
  "language": "python"
}
```

### Record Violation

```http
POST /meetings/violation
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "meetingId": "550e8400-e29b-41d4-a716-446655440000",
  "violationType": "tab-switch|copy-paste|webcam"
}
```

### End Meeting

```http
POST /meetings/end
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "meetingId": "550e8400-e29b-41d4-a716-446655440000",
  "feedback": {
    "recruiterComment": "Great performance!",
    "rating": 4.5,
    "codingScore": 85,
    "communicationScore": 90
  }
}
```

### Get Meeting Details

```http
GET /meetings/:meetingId
Authorization: Bearer <TOKEN>
```

---

## 🤖 AI Engine Endpoints

### Parse Resume

```http
POST http://localhost:8000/parse-resume
Content-Type: application/json

{
  "skills": ["Python", "JavaScript", "React"],
  "experience": "5 years as Full-Stack Developer"
}
```

**Response:**
```json
{
  "skills": ["Python", "JavaScript", "React", "Node.js"],
  "soft_skills": ["Communication", "Leadership"],
  "experience_years": 5,
  "strengths": ["Diverse technical background"],
  "weaknesses": [],
  "recommendations": ["Learn AWS"]
}
```

### Match Candidate to Job

```http
POST http://localhost:8000/match-candidate-job
Content-Type: application/json

{
  "candidateSkills": ["Python", "JavaScript", "React"],
  "jobSkills": ["Python", "FastAPI", "PostgreSQL"],
  "candidateExperience": "5 years"
}
```

**Response:**
```json
{
  "matchPercentage": 75,
  "directMatches": ["Python"],
  "missingSkills": ["FastAPI", "PostgreSQL"],
  "explanation": "Good match! You have Python. Consider learning FastAPI and PostgreSQL."
}
```

### Extract Skills

```http
POST http://localhost:8000/extract-skills
Content-Type: application/json

{
  "text": "Experienced Python developer with React..."
}
```

### Generate Embeddings

```http
POST http://localhost:8000/generate-embeddings
Content-Type: application/json

{
  "text": "Senior Python developer with 5 years experience"
}
```

---

## ✅ Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Not authorized for this resource |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## 🔄 Socket.io Events

Real-time communication via WebSocket:

### Chat Events
- `join-chat` - Join a chat room
- `send-message` - Send a message
- `new-message` - Receive a new message

### Meeting Events
- `join-meeting` - Join interview room
- `user-joined` - Notify others user joined
- `code-update` - Sync code changes
- `code-changed` - Receive updated code
- `tab-switch` - Detect tab switch
- `violation-detected` - Alert violation
- `meeting-terminated` - End meeting notification

---

## 📋 Pagination

For list endpoints, use query parameters:

```
GET /api/candidates?page=1&limit=10&sort=name
```

---

## 🔄 Rate Limiting

- Auth endpoints: 5 requests per minute
- API endpoints: 100 requests per minute

---

**Last Updated:** January 2024

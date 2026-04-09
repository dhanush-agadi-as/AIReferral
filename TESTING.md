# 🧪 ReferralAI - Testing Guide

Comprehensive testing for ReferralAI platform.

## 📋 Test Coverage

- Backend API tests
- Frontend component tests
- AI Engine unit tests
- Integration tests
- E2E scenarios

## 🏃 Running Tests

### Backend Tests

```bash
cd backend
npm install
npm run test
```

### Frontend Tests

```bash
cd frontend
npm install
npm run test
```

### AI Engine Tests

```bash
cd ai-engine
python -m pytest tests/
```

## ✍️ Manual Testing Scenarios

### Scenario 1: User Registration & Login

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Register as Candidate:
   - Email: `candidate@test.com`
   - Password: `TestPass123`
   - Role: Candidate
4. Click Login
5. Enter credentials
6. Verify redirect to candidate dashboard

### Scenario 2: Job Posting & Matching

1. Register as Recruiter: `recruiter@test.com`
2. Login to Dashboard
3. Click "+ Post New Job"
4. Fill details:
   - Title: "Senior React Developer"
   - Description: "Looking for experienced React developer"
   - Skills: "React, JavaScript, TypeScript"
5. Post Job
6. Verify job appears in list

### Scenario 3: Candidate Recommendations

1. Login as candidate
2. Go to Dashboard
3. Verify AI skill dashboard loads (with mocked data)
4. Scroll to "Recommended Jobs"
5. Verify job appears with match percentage
6. Click "Apply Now"
7. Verify application submitted

### Scenario 4: Referrer Screening

1. Register as Referrer: `referrer@test.com`
2. Login to Dashboard
3. Click on a candidate from list
4. Type screening message: "Tell me about your React experience"
5. Click "Send Message"
6. Verify message appears
7. Click "Submit Recommendation"

### Scenario 5: Interview & Proctoring

1. Login as Recruiter
2. View matched candidates for a job
3. Click "Create Interview"
4. Get meeting ID and password
5. Share link with candidate
6. Candidate joins: `http://localhost:3000/interview?meetingId=XXX&password=YYY`
7. System loads video + code editor
8. Switch browser tabs → violation detected
9. After 3 violations → interview auto-terminates

## 🧬 API Testing with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "role": "candidate",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Get Dashboard (with token)

```bash
curl -X GET http://localhost:5000/api/candidates/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Post a Job

```bash
curl -X POST http://localhost:5000/api/recruiters/jobs \
  -H "Authorization: Bearer RECRUITER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "description": "Build scalable web applications",
    "requiredSkills": ["React", "Node.js", "MongoDB"],
    "experience": "3+ years",
    "jobType": "full-time"
  }'
```

## 🤖 AI Engine Testing

### Test Resume Parsing

```bash
curl -X POST http://localhost:8000/parse-resume \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["Python", "JavaScript", "React"],
    "experience": "5 years as Full Stack Developer at Google"
  }'
```

### Test Job Matching

```bash
curl -X POST http://localhost:8000/match-candidate-job \
  -H "Content-Type: application/json" \
  -d '{
    "candidateSkills": ["Python", "FastAPI", "React"],
    "jobSkills": ["Python", "FastAPI", "PostgreSQL"],
    "candidateExperience": "5 years"
  }'
```

### AI Engine Swagger Docs

Open http://localhost:8000/docs in browser

## 📝 Test Data

### Sample Users

**Candidate**
- Email: `candidate1@test.com`
- Password: `CandPass123`
- Skills: Python, JavaScript, React, Node.js

**Recruiter**
- Email: `recruiter1@test.com`
- Password: `RecPass123`
- Company: Tech Corp

**Referrer**
- Email: `referrer1@test.com`
- Password: `RefPass123`
- Networks: 50+ engineers

### Sample Jobs

- Senior Python Developer (Match: 85%)
- React Frontend Engineer (Match: 90%)
- DevOps Engineer (Match: 60%)

## ✅ Checklist for QA

- [ ] User registration workflow
- [ ] Login/logout functionality
- [ ] Role-based dashboards load correctly
- [ ] Job posting and retrieval
- [ ] AI matching returns percentages
- [ ] Candidate search and filtering
- [ ] Referrer messaging system
- [ ] Interview room loads with video + editor
- [ ] Tab switching detection triggers violations
- [ ] Socket.io real-time updates work
- [ ] Violation counter increments correctly
- [ ] Meeting auto-terminates after 3 violations
- [ ] Responsive design on mobile
- [ ] API error handling
- [ ] Performance under load

## 🐛 Common Issues & Fixes

### "Cannot connect to MongoDB"
```bash
docker-compose restart mongodb
docker-compose logs mongodb
```

### "API 404 errors"
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check routes in backend/src/routes/
```

### "Socket.io not connecting"
```bash
# Check Socket.io is initialized
docker-compose logs backend | grep socket
```

### "AI Engine 500 errors"
```bash
# Check requirements installed
docker-compose logs ai-engine

# Restart AI engine
docker-compose restart ai-engine
```

## 📊 Performance Testing

### Load Testing with Apache Bench

```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Monitor Memory Usage

```bash
docker stats referralai_backend referralai_frontend referralai_ai_engine
```

## 🚀 Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand(\"ping\")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: |
          npm ci --prefix backend
          npm ci --prefix frontend
      
      - name: Run tests
        run: npm run test
```

---

**Last Updated:** January 2024

# ✅ ReferralAI - Deployment Verification Checklist

Complete checklist for verifying ReferralAI deployment across all environments.

## 🏗️ Pre-Deployment (Before Running)

- [ ] Docker installed (`docker --version`)
- [ ] Docker Compose installed (`docker-compose --version`)
- [ ] Git cloned or copied
- [ ] Sufficient disk space (2GB+)
- [ ] Required ports available (3000, 5000, 8000, 27017)

## 🐳 During Docker Compose Up

- [ ] All containers started successfully
  ```bash
  docker-compose ps
  # All should show "Up"
  ```
- [ ] No port conflicts
  ```bash
  docker-compose logs | grep -i "error\|port\|eaddrinuse"
  ```
- [ ] All volumes mounted
  ```bash
  docker volume ls | grep referralai
  ```

## 🌐 Frontend Verification

### Access & Navigation
- [ ] Frontend loads at http://localhost:3000
- [ ] No console errors in browser DevTools
- [ ] CSS/Tailwind styling applied (gradient background visible)

### Authentication
- [ ] Registration page loads at /auth/register
  - [ ] Email validation works
  - [ ] Password requirements enforced
  - [ ] Role selection available
- [ ] Login page loads at /auth/login
  - [ ] Can login with test account
  - [ ] JWT token stored in localStorage
  - [ ] Redirects to correct dashboard

### Candidate Features
- [ ] Dashboard loads at `/dashboard/candidate`
- [ ] AI skill dashboard section visible
- [ ] Job recommendations displayed with match %
- [ ] Apply button functional
- [ ] Profile page editable

### Recruiter Features
- [ ] Dashboard loads at `/dashboard/recruiter`
- [ ] Statistics cards show correct data
- [ ] Can post new job
- [ ] Job form validation works
- [ ] View candidates button links to correct page
- [ ] Create interview button functional

### Referrer Features
- [ ] Dashboard loads at `/dashboard/referrer`
- [ ] Can browse candidates list
- [ ] Trust score displayed
- [ ] Can select candidate and send message
- [ ] Chat interface interactive
- [ ] Recommend button available

### Interview Room
- [ ] Interview page loads with query params
- [ ] Video placeholder displays
- [ ] Code editor renders
- [ ] Language selector works
- [ ] Tab switch detection enabled
- [ ] Violation counter appears

### Network Requests
- [ ] API calls hitting correct URL (check Network tab)
- [ ] Authorization header included in requests
- [ ] JSON responses valid
- [ ] No CORS errors in console

## 🔧 Backend Verification

### Server Status
- [ ] Backend running on port 5000
  ```bash
  curl http://localhost:5000/api/health
  # Response: {"status":"Server running","timestamp":"..."}
  ```
- [ ] No error logs in backend container
  ```bash
  docker-compose logs backend | grep -i error
  ```

### Database Connection
- [ ] MongoDB connection successful
  ```bash
  docker-compose logs backend | grep "MongoDB connected"
  ```
- [ ] Can read/write to database
  ```bash
  docker exec referralai_mongo mongosh -u admin -p password123 --eval "db.serverStatus()"
  ```

### API Endpoints Testing

**Authentication**
- [ ] Register endpoint returns JWT
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@e.com","password":"Pass123","role":"candidate","firstName":"Test","lastName":"User"}'
  ```
- [ ] Login endpoint works
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@e.com","password":"Pass123"}'
  ```

**Candidate Routes**
- [ ] `/api/candidates/dashboard` returns dashboard data
- [ ] `/api/candidates/jobs/recommendations` returns job list

**Recruiter Routes**
- [ ] `/api/recruiters/jobs` POST creates job
- [ ] `/api/recruiters/stats` GET returns stats
- [ ] `/api/recruiters/meetings` POST creates meeting with ID & password

**Referrer Routes**
- [ ] `/api/referrers/candidates` returns candidate list
- [ ] `/api/referrers/stats` returns referrer stats

### Socket.io Connection
- [ ] Socket server accessible
  ```bash
  # Check logs for socket connections
  docker-compose logs backend | grep -i "socket\|connection"
  ```
- [ ] Real-time events working
  - [ ] Chat messages broadcast
  - [ ] Code sync updates
  - [ ] Violation alerts sent

## 🤖 AI Engine Verification

### Server Status
- [ ] AI Engine running on port 8000
  ```bash
  curl http://localhost:8000/health
  # Response: {"status":"AI Engine running"}
  ```
- [ ] Swagger UI available at http://localhost:8000/docs

### API Endpoints

**Resume Parsing**
- [ ] `/parse-resume` endpoint works
  ```bash
  curl -X POST http://localhost:8000/parse-resume \
    -H "Content-Type: application/json" \
    -d '{"skills":["Python","React"],"experience":"5 years"}'
  ```
- [ ] Returns skills, strengths, recommendations

**Job Matching**
- [ ] `/match-candidate-job` endpoint works
  ```bash
  curl -X POST http://localhost:8000/match-candidate-job \
    -H "Content-Type: application/json" \
    -d '{"candidateSkills":["Python"],"jobSkills":["Python","FastAPI"]}'
  ```
- [ ] Returns match percentage (0-100)

**Other Endpoints**
- [ ] `/extract-skills` returns skill list
- [ ] `/generate-embeddings` returns vector
- [ ] `/recommend-jobs` returns recommendations

## 📊 Database Verification

### MongoDB Health
- [ ] Database accessible
  ```bash
  docker exec referralai_mongo mongosh -u admin -p password123 --eval "db.adminCommand('ping')"
  ```
- [ ] Collections created
  ```bash
  docker exec referralai_mongo mongosh -u admin -p password123 referralai --eval "db.getCollectionNames()"
  ```

### Data Integrity
- [ ] Users table has test records
- [ ] Password hashing verified (bcrypt)
- [ ] Indexes working for queries

## 🔐 Security Verification

- [ ] CORS properly configured
- [ ] JWT tokens validating correctly
- [ ] Passwords hashed with bcrypt
- [ ] SQL injection prevention (using Mongoose)
- [ ] Input validation on endpoints
- [ ] Authorization middleware protecting routes

## ⚡ Performance Verification

### Response Times
- [ ] API responses < 500ms
- [ ] Socket.io latency < 100ms
- [ ] Database queries fast
- [ ] No memory leaks (container memory stable)

### Load Test
```bash
# Install Apache Bench
# macOS: brew install httpd
# Ubuntu: sudo apt-get install apache2-utils

ab -n 100 -c 10 http://localhost:5000/api/health
```

- [ ] No errors under load
- [ ] Response times acceptable
- [ ] Containers don't crash

## 📱 UI/UX Verification

### Responsive Design
- [ ] Desktop (1920x1080) - fully functional
- [ ] Tablet (768x1024) - readable layout
- [ ] Mobile (375x667) - responsive navigation

### Accessibility
- [ ] Tab navigation works
- [ ] Color contrast sufficient
- [ ] Forms keyboard accessible
- [ ] Error messages clear

## 🎯 Demo Flow Verification

### Complete User Journey
1. [ ] Register as candidate
2. [ ] View AI dashboard
3. [ ] See job recommendations
4. [ ] Register as recruiter
5. [ ] Post a job
6. [ ] View recommended candidates
7. [ ] Create interview meeting
8. [ ] Share meeting link
9. [ ] Candidate joins interview
10. [ ] Test tab switch detection
11. [ ] Verify violation alerts
12. [ ] End meeting and check feedback

## 🚨 Troubleshooting Checklist

### If Services Won't Start
- [ ] Run `docker-compose down -v` to clean
- [ ] Check Docker daemon is running
- [ ] Verify no port conflicts
- [ ] Check disk space: `df -h`
- [ ] Review docker-compose.yml syntax

### If API Returns 500 Errors
- [ ] Check backend logs: `docker-compose logs backend`
- [ ] Verify MongoDB is connected
- [ ] Check environment variables in .env
- [ ] Ensure JWT_SECRET is set
- [ ] Review request payload format

### If AI Engine Errors
- [ ] Check Python dependencies installed
- [ ] Review AI engine logs: `docker-compose logs ai-engine`
- [ ] Verify scikit-learn & numpy versions
- [ ] Test parse-resume endpoint directly

### If Socket.io Not Working
- [ ] Check websocket port availability
- [ ] Verify Socket.io initialization in server
- [ ] Check browser console for connection errors
- [ ] Review firewall settings

## 📈 Production Verification

### Before Going Live
- [ ] All tests passing (`npm run test`)
- [ ] No console errors in frontend
- [ ] No error messages in backend/AI logs
- [ ] Database backups configured
- [ ] SSL/HTTPS configured
- [ ] Environment variables secured (no secrets in code)
- [ ] Rate limiting enabled
- [ ] Logging enabled for audit trail

### Deployment Checklist
- [ ] Production environment variables set
- [ ] Database connection string correct
- [ ] JWT_SECRET changed from default
- [ ] CORS origins set correctly
- [ ] Email notifications tested (if enabled)
- [ ] Error monitoring configured (Sentry, etc.)
- [ ] CDN configured for static assets
- [ ] Database backups scheduled

## 📊 Post-Deployment Monitoring

### Daily Checks
- [ ] Service uptime 99%+
- [ ] Average API response time < 500ms
- [ ] Database replication healthy
- [ ] No critical errors in logs
- [ ] User registration/login working

### Weekly Review
- [ ] Performance metrics (throughput, latency)
- [ ] Error rate analysis
- [ ] User growth metrics
- [ ] Feature usage analytics
- [ ] Security audit logs

## 📞 Support & Escalation

**If issues persist:**
1. Check logs: `docker-compose logs -f`
2. Review documentation: SETUP.md, API_DOCUMENTATION.md
3. Verify all prerequisites met
4. Try clean reinstall: `docker-compose down -v && docker-compose up --build`
5. Report issue with full logs and environment details

---

**All checks passed? Congratulations! ReferralAI is ready for production!** 🚀

# ⚡ ReferralAI - Quick Start (2 Minutes)

## One-Command Setup

### macOS/Linux:
```bash
cd ReferralAI
bash start.sh
```

### Windows:
```cmd
cd ReferralAI
start.bat
```

## Services Will Start On:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| AI Engine Docs | http://localhost:8000/docs |

## Test Accounts (Pre-registered)

### Candidate
- Email: `candidate@test.com`
- Password: `password123`

### Recruiter
- Email: `recruiter@test.com`
- Password: `password123`

### Referrer
- Email: `referrer@test.com`
- Password: `password123`

## Try This Flow:

1. **Login as Candidate** → View AI dashboard with job recommendations
2. **Login as Recruiter** → Post a job, view matched candidates
3. **Login as Referrer** → Browse candidates, send chat message
4. **Create Interview** → Get meeting link, test proctoring with tab switches

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5000
lsof -i :5000 | tail -1 | awk '{print $2}' | xargs kill -9
```

**Container won't start?**
```bash
docker-compose down -v  # Remove everything
docker-compose up      # Start fresh
```

**Reset database?**
```bash
docker-compose exec mongodb mongosh -u admin -p password123
use referralai
db.dropDatabase()
```

## Next Steps

- Read **SETUP.md** for detailed deployment
- Check **API_DOCUMENTATION.md** for endpoints
- Review **TESTING.md** for test scenarios
- Full details in **PROJECT_OVERVIEW.md**

---

**That's it! You're running a complete AI-powered hiring platform** 🎉

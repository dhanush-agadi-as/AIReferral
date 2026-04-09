# 🚀 Local Development Guide (No Docker)

Since you don't have Docker, here's how to run ReferralAI locally with all 3 services.

## ✅ Prerequisites Complete

- ✅ Node.js v24.11.0
- ✅ Python 3.12.10
- ✅ Backend npm packages installed
- ✅ Frontend npm packages installing...
- ✅ AI engine Python packages installing...

## 🔧 Configuration Setup (Do This First!)

### 1. **Create Backend `.env`** 

Create file: `backend/.env`

```
# Get connection string from MongoDB Atlas setup guide
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/referralai?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_before_production_2024

NODE_ENV=development

AI_ENGINE_URL=http://localhost:8000

FRONTEND_URL=http://localhost:3000

PORT=5000
```

### 2. **Create Frontend `.env.local`**

Create file: `frontend/.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. **Create AI Engine `.env`**

Create file: `ai-engine/.env`

```
DEBUG=False
```

## 📚 MongoDB Setup (5 minutes)

**Important**: See [MONGODB_SETUP.md](MONGODB_SETUP.md) for complete instructions

Quick summary:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster
4. Create user (admin/password)
5. Whitelist your IP
6. Copy connection string
7. Paste into `backend/.env`

## 🖥️ Running Services (They All Need Separate Terminals!)

### **Terminal 1: Backend (Port 5000)**

```powershell
cd backend
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected
Socket.io initialized
```

✅ **Backend ready when you see: "Socket.io initialized"**

---

### **Terminal 2: Frontend (Port 3000)**

```powershell
cd frontend
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000
- event compiled client and server successfully
```

✅ **Frontend ready when you see: "compiled client and server successfully"**

---

### **Terminal 3: AI Engine (Port 8000)**

```powershell
cd ai-engine
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ **AI Engine ready when you see: "Application startup complete"**

---

## 🌐 Access the Application

Once all 3 services are running:

### **Frontend**: http://localhost:3000

### **Backend API**: http://localhost:5000/api

### **AI Engine**: http://localhost:8000/docs (API documentation)

## 👥 Test Accounts

Use these to login:

| Role | Email | Password |
|------|-------|----------|
| Candidate | `candidate@example.com` | `password123` |
| Recruiter | `recruiter@example.com` | `password123` |
| Referrer | `referrer@example.com` | `password123` |

## 🧪 Quick Verification

### Check Backend is Running
```powershell
curl http://localhost:5000/api/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Check Frontend is Running
Open browser: http://localhost:3000
Should see: ReferralAI landing page

### Check AI Engine is Running
Open browser: http://localhost:8000/docs
Should see: Swagger API documentation

## 🛑 Stopping Services

Press `Ctrl+C` in each terminal to stop the service.

**Proper shutdown order:**
1. Stop Frontend (Terminal 2)
2. Stop Backend (Terminal 1)
3. Stop AI Engine (Terminal 3)

## 🐛 Troubleshooting

### **"Port already in use"**
Another process is using the port. Find and kill it:
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000 -State Listen

# Kill process by PID
Stop-Process -Id <PID> -Force
```

### **"Cannot connect to MongoDB"**
- [ ] Check `.env` file has correct MongoDB URI
- [ ] Verify password is correct
- [ ] Check IP is whitelisted in MongoDB Atlas
- [ ] Try connection string in MongoDB Compass first

### **"AI Engine not responding"**
- [ ] Make sure Python pip packages finished installing
- [ ] Check if port 8000 is free: `netstat -ano | findstr :8000`
- [ ] Verify FastAPI started: Look for "Application startup complete"

### **"Frontend showing blank page"**
- [ ] Check browser console for errors (F12)
- [ ] Verify Backend is accessible: `curl http://localhost:5000/api/health` 
- [ ] Clear browser cache and reload

### **"Login fails"**
First time? Database might be empty. Check backend logs for:
```
MongoDB connected
```
If not connecting, verify MONGO_URI in `.env`

## 📊 Service Ports Quick Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| AI Engine | 8000 | http://localhost:8000 |
| MongoDB | 27017 | (Cloud - MongoDB Atlas) |

## 🚀 Demo Flow

1. **Register** as a Candidate
2. **Login** and view AI Dashboard
3. **Open new terminal**, register as Recruiter
4. **Create a Job** (e.g., "Senior React Developer")
5. **Go back to Candidate**, view Job Recommendations
6. **Apply** to the job
7. **Switch to Recruiter**, see your candidates
8. **Create Interview Meeting** (gets meeting ID)
9. **Share link** with candidate
10. **Join meeting**, test code editor + tab detection

## 💡 Tips

- **Keep all 3 terminals open** while developing
- **Ctrl+C** to stop a service, then restart
- **Hot reload enabled**: Edit code, services auto-reload
- **MongoDB Atlas free tier** handles unlimited dev/test

## 📖 More Help

- Backend issues: See `backend/README.md`
- Frontend issues: See `frontend/README.md`
- AI issues: See `ai-engine/README.md`
- API docs: http://localhost:8000/docs

## 🎯 Next Steps

1. ✅ Complete MongoDB Atlas setup
2. ✅ Create `.env` files (3 total)
3. ✅ Start Backend (Terminal 1)
4. ✅ Start Frontend (Terminal 2)
5. ✅ Start AI Engine (Terminal 3)
6. ✅ Visit http://localhost:3000
7. ✅ Test login with provided accounts
8. ✅ Follow demo flow

**Get all 3 services running in 5 minutes!**

---

**Questions?** Check `SETUP.md` for more detailed deployment options.

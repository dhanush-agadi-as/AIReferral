# 🗄️ MongoDB Setup Guide

Since Docker isn't available on your system, we'll use **MongoDB Atlas** (free cloud database).

## Step 1: Create MongoDB Atlas Account (5 minutes)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"**
3. Sign up with email or Google
4. Accept terms and click **"Create account"**

## Step 2: Create Free Cluster (5 minutes)

1. On the first screen, **"Create a Deployment"** should be visible
2. Select **"Shared"** (Free tier) ✅
3. Choose a region close to you (e.g., US East for testing)
4. Click **"Create Deployment"**
5. Wait 2-3 minutes for cluster creation

## Step 3: Set Database Credentials (2 minutes)

1. When prompted, create a **Database User**:
   - **Username**: `admin`
   - **Password**: Create a strong password (or use: `referralai_dev_2024`)
2. Click **"Create User"**
3. Click **"Add My Current IP Address"** (adds your IP to whitelist)
4. Click **"Finish and Close"**

## Step 4: Get Connection String (2 minutes)

1. Click **"Clusters"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Click **"Drivers"** tab
4. Select **"Node.js"** and version **"4.x or later"**
5. **Copy the connection string** - looks like:
   ```
   mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/referralai?retryWrites=true&w=majority
   ```
   ⚠️ **IMPORTANT**: Replace `PASSWORD` with your actual password

## Step 5: Create Backend .env File

In the `backend/` folder, create a file named `.env`:

```bash
# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/referralai?retryWrites=true&w=majority

# JWT Secret (change in production!)
JWT_SECRET=your_super_secret_jwt_key_change_before_production_2024

# Node environment
NODE_ENV=development

# AI Engine URL (localhost since running locally)
AI_ENGINE_URL=http://localhost:8000

# Frontend configuration
FRONTEND_URL=http://localhost:3000

# Server port
PORT=5000
```

✅ **Save and close the file**

## Step 6: Create Frontend .env.local File

In the `frontend/` folder, create a file named `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

✅ **Save and close the file**

## Step 7: Create AI Engine .env File

In the `ai-engine/` folder, create a file named `.env`:

```
# Optional: Add any Python environment variables here
DEBUG=False
```

✅ **Save and close the file**

## Verification Checklist

Before starting services, verify:

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created (admin/password)
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] `backend/.env` file created with correct connection string
- [ ] `frontend/.env.local` file created
- [ ] `ai-engine/.env` file created
- [ ] All npm/pip dependencies installed

## 🚀 Ready to Start Services!

Once verified, proceed to run each service:

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Start AI Engine
cd ai-engine
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Then visit: **http://localhost:3000**

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify connection string in `.env` has correct password
- Check IP is whitelisted in MongoDB Atlas
- Ensure `referralai` database name is in connection string

### "IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Click "ADD IP ADDRESS"
- Select "Add Current IP Address" or enter your IP
- Click "Confirm"

### "Authentication failed"
- Verify username is `admin`
- Verify password matches what you set
- URL format: `mongodb+srv://admin:PASSWORD@...`

## 💰 Cost

✅ **Completely FREE**
- Free tier includes:
  - 5GB storage
  - Shared cluster
  - Unlimited connections
  - 512MB per namespace max

Perfect for development and testing!

## Support

If you need help:
1. Check [MongoDB Atlas Docs](https://docs.mongodb.com/manual/)
2. Review error messages in terminal
3. Check that all `.env` files have correct values


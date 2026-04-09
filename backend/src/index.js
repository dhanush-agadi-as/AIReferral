const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
require('express-async-errors');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/referralai')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Store IO instance in app
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/recruiters', require('./routes/recruiters'));
app.use('/api/referrers', require('./routes/referrers'));
app.use('/api/meetings', require('./routes/meetings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Socket.io handlers
io.on('connection', (socket) => {
  console.log(`📱 User connected: ${socket.id}`);

  socket.on('join-chat', (data) => {
    socket.join(`chat-${data.referrerId}-${data.candidateId}`);
    console.log(`Chat room joined: ${data.referrerId}-${data.candidateId}`);
  });

  socket.on('send-message', (data) => {
    io.to(`chat-${data.referrerId}-${data.candidateId}`).emit('new-message', data);
  });

  socket.on('join-meeting', (data) => {
    socket.join(`meeting-${data.meetingId}`);
    io.to(`meeting-${data.meetingId}`).emit('user-joined', {
      userId: socket.id,
      timestamp: new Date(),
    });
  });

  socket.on('code-update', (data) => {
    io.to(`meeting-${data.meetingId}`).emit('code-changed', {
      code: data.code,
      language: data.language,
    });
  });

  socket.on('tab-switch', (data) => {
    console.log(`⚠️ Tab switch detected: ${data.userId}`);
    io.to(`meeting-${data.meetingId}`).emit('violation-detected', {
      userId: data.userId,
      type: 'tab-switch',
      timestamp: new Date(),
    });
  });

  socket.on('disconnect', () => {
    console.log(`📱 User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, io };

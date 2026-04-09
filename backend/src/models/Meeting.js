const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    meetingId: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    type: {
      type: String,
      enum: ['video-interview', 'coding-round', 'screening'],
      required: true,
    },
    startTime: Date,
    endTime: Date,
    duration: Number,
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    proctoring: {
      tabSwitches: { type: Number, default: 0 },
      violations: [
        {
          type: String,
          timestamp: Date,
          severity: String, // warning, alert, critical
        },
      ],
      warnings: { type: Number, default: 0 },
    },
    codeChallenge: {
      language: String,
      problem: String,
      initialCode: String,
      finalCode: String,
      output: String,
    },
    recordingUrl: String,
    feedback: {
      recruiterComment: String,
      rating: Number,
      codingScore: Number,
      communicationScore: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', meetingSchema);

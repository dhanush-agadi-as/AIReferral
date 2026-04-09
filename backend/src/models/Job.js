const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [String],
    experience: String,
    salary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' },
    },
    location: String,
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'paused'],
      default: 'open',
    },
    applications: [
      {
        candidateId: mongoose.Schema.Types.ObjectId,
        status: String,
        appliedAt: Date,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);

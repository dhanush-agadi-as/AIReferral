const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    confidence: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    comment: String,
    validationType: {
      type: String,
      enum: ['chat', 'video', 'resume-review'],
      default: 'chat',
    },
    status: {
      type: String,
      enum: ['submitted', 'accepted', 'rejected', 'in-progress'],
      default: 'submitted',
    },
    scores: {
      aiScore: { type: Number, min: 0, max: 100 },
      referrerScore: { type: Number, min: 0, max: 100 },
      referrerTrustScore: { type: Number, min: 0, max: 1, default: 0.5 },
      finalScore: Number,
    },
    screeningNotes: {
      questionsAsked: [String],
      responses: [String],
      videoUrl: String,
      duration: Number,
    },
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

// Calculate final score
referralSchema.methods.calculateFinalScore = function () {
  if (this.scores.aiScore && this.scores.referrerScore) {
    this.scores.finalScore =
      0.7 * this.scores.aiScore +
      0.3 * this.scores.referrerScore * this.scores.referrerTrustScore;
  }
  return this.scores.finalScore;
};

module.exports = mongoose.model('Referral', referralSchema);

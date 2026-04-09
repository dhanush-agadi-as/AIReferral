const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['candidate', 'recruiter', 'referrer', 'admin'],
      required: true,
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
      bio: String,
      location: String,
    },
    skills: [String],
    experience: String,
    resume: {
      url: String,
      uploadedAt: Date,
      skills: [String],
    },
    github: {
      url: String,
      username: String,
    },
    trustScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    statistics: {
      referralsSubmitted: { type: Number, default: 0 },
      referralsAccepted: { type: Number, default: 0 },
      successRate: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
  const { password, ...profile } = this.toObject();
  return profile;
};

module.exports = mongoose.model('User', userSchema);

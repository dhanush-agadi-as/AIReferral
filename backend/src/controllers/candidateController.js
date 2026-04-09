const User = require('../models/User');
const Job = require('../models/Job');
const axios = require('axios');

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Call AI engine to get skill dashboard
    const aiResponse = await axios.post(`${process.env.AI_ENGINE_URL || 'http://localhost:8000'}/parse-resume`, {
      skills: user.skills || [],
      experience: user.experience || '',
    });

    res.json({
      user: user.getPublicProfile(),
      skillDashboard: aiResponse.data || {
        skills: user.skills || [],
        strengths: [],
        weaknesses: [],
        recommendations: [],
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getJobRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Get all open jobs
    const jobs = await Job.find({ status: 'open' }).limit(10);

    // Call AI engine for matching
    const matchResults = [];
    for (const job of jobs) {
      const matchResponse = await axios.post(
        `${process.env.AI_ENGINE_URL || 'http://localhost:8000'}/match-candidate-job`,
        {
          candidateSkills: user.skills || [],
          jobSkills: job.requiredSkills || [],
          candidateExperience: user.experience || '',
        }
      );

      matchResults.push({
        job: job.toObject(),
        matchPercentage: matchResponse.data.matchPercentage || 0,
        explanation: matchResponse.data.explanation || '',
      });
    }

    // Sort by match percentage
    matchResults.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({ recommendations: matchResults });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      (app) => app.candidateId.toString() === userId
    );
    if (alreadyApplied) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    job.applications.push({
      candidateId: userId,
      status: 'applied',
      appliedAt: new Date(),
    });

    await job.save();

    res.json({ message: 'Applied successfully', job });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profile, skills, experience, github } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile, skills, experience, github },
      { new: true }
    );
    res.json({
      message: 'Profile updated',
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboard,
  getJobRecommendations,
  applyToJob,
  getProfile,
  updateProfile,
};

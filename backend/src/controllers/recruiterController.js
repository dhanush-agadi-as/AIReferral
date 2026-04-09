const Job = require('../models/Job');
const User = require('../models/User');
const Meeting = require('../models/Meeting');
const { v4: uuidv4 } = require('uuid');

const createJob = async (req, res) => {
  try {
    const { title, description, requiredSkills, experience, salary, location, jobType } = req.body;

    const job = new Job({
      recruiterId: req.user.id,
      title,
      description,
      requiredSkills,
      experience,
      salary,
      location,
      jobType,
    });

    await job.save();

    res.status(201).json({
      message: 'Job posted successfully',
      job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMatchedCandidates = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate('applications.candidateId');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const candidates = await Promise.all(
      job.applications.map(async (app) => {
        const candidate = await User.findById(app.candidateId);
        return {
          candidateId: candidate._id,
          name: `${candidate.profile.firstName} ${candidate.profile.lastName}`,
          email: candidate.email,
          skills: candidate.skills,
          experience: candidate.experience,
          trustScore: candidate.trustScore,
          appliedAt: app.appliedAt,
        };
      })
    );

    res.json({ candidates });
  } catch (error) {
    console.error('Matched candidates error:', error);
    res.status(500).json({ error: error.message });
  }
};

const createMeeting = async (req, res) => {
  try {
    const { jobId, candidateId, type } = req.body;

    const meetingId = uuidv4();
    const password = Math.random().toString(36).substring(2, 10);

    const meeting = new Meeting({
      jobId,
      candidateId,
      recruiterId: req.user.id,
      meetingId,
      password,
      type,
      startTime: new Date(),
      status: 'scheduled',
    });

    await meeting.save();

    res.status(201).json({
      message: 'Meeting created',
      meeting: {
        meetingId: meeting.meetingId,
        password: meeting.password,
        type: meeting.type,
        _id: meeting._id,
      },
    });
  } catch (error) {
    console.error('Create meeting error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getJobStats = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({ recruiterId });

    const stats = {
      totalJobs: jobs.length,
      openJobs: jobs.filter((j) => j.status === 'open').length,
      closedJobs: jobs.filter((j) => j.status === 'closed').length,
      totalApplications: jobs.reduce((sum, j) => sum + j.applications.length, 0),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  getMatchedCandidates,
  createMeeting,
  getJobStats,
};

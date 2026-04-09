const express = require('express');
const {
  createJob,
  getMatchedCandidates,
  createMeeting,
  getJobStats,
} = require('../controllers/recruiterController');
const { auth, authorize } = require('../middleware/auth');
const { validateJobPost } = require('../middleware/validation');

const router = express.Router();

router.post('/jobs', auth, authorize('recruiter'), validateJobPost, createJob);
router.get('/jobs/:jobId/candidates', auth, authorize('recruiter'), getMatchedCandidates);
router.post('/meetings', auth, authorize('recruiter'), createMeeting);
router.get('/stats', auth, authorize('recruiter'), getJobStats);

module.exports = router;

const express = require('express');
const {
  getDashboard,
  getJobRecommendations,
  applyToJob,
  getProfile,
  updateProfile,
} = require('../controllers/candidateController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, authorize('candidate'), getDashboard);
router.get('/jobs/recommendations', auth, authorize('candidate'), getJobRecommendations);
router.post('/apply', auth, authorize('candidate'), applyToJob);
router.get('/profile', auth, authorize('candidate'), getProfile);
router.put('/profile', auth, authorize('candidate'), updateProfile);

module.exports = router;

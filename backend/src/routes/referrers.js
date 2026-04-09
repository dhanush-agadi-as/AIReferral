const express = require('express');
const {
  browseCandidates,
  sendScreeningMessage,
  getScreeningMessages,
  submitRecommendation,
  getReferrerStats,
} = require('../controllers/referrerController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/candidates', auth, authorize('referrer'), browseCandidates);
router.post('/screening/message', auth, authorize('referrer'), sendScreeningMessage);
router.get('/screening/:candidateId/messages', auth, authorize('referrer'), getScreeningMessages);
router.post('/recommend', auth, authorize('referrer'), submitRecommendation);
router.get('/stats', auth, authorize('referrer'), getReferrerStats);

module.exports = router;

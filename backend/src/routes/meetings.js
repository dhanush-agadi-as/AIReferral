const express = require('express');
const {
  joinMeeting,
  updateCode,
  recordViolation,
  endMeeting,
  getMeetingDetails,
} = require('../controllers/meetingController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/join', auth, joinMeeting);
router.put('/code', auth, updateCode);
router.post('/violation', auth, recordViolation);
router.post('/end', auth, endMeeting);
router.get('/:meetingId', auth, getMeetingDetails);

module.exports = router;

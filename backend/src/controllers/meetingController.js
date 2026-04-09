const Meeting = require('../models/Meeting');
const { v4: uuidv4 } = require('uuid');

const joinMeeting = async (req, res) => {
  try {
    const { meetingId, password } = req.body;

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    if (meeting.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (meeting.status !== 'scheduled' && meeting.status !== 'in-progress') {
      return res.status(400).json({ error: 'Meeting is not available' });
    }

    // Update meeting status
    if (meeting.status === 'scheduled') {
      meeting.status = 'in-progress';
      meeting.startTime = new Date();
    }

    await meeting.save();

    res.json({
      message: 'Meeting joined',
      meeting: {
        meetingId: meeting.meetingId,
        type: meeting.type,
        codeChallenge: meeting.codeChallenge,
      },
    });
  } catch (error) {
    console.error('Join meeting error:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateCode = async (req, res) => {
  try {
    const { meetingId, code, language } = req.body;

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    meeting.codeChallenge.finalCode = code;
    meeting.codeChallenge.language = language;

    await meeting.save();

    // Emit to all clients
    const io = req.app.get('io');
    io.to(`meeting-${meetingId}`).emit('code-updated', {
      code,
      language,
    });

    res.json({ message: 'Code updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recordViolation = async (req, res) => {
  try {
    const { meetingId, violationType } = req.body;

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    meeting.proctoring.violations.push({
      type: violationType,
      timestamp: new Date(),
      severity: meeting.proctoring.violations.length === 0 ? 'warning' : 'alert',
    });

    meeting.proctoring.tabSwitches += 1;

    const io = req.app.get('io');
    io.to(`meeting-${meetingId}`).emit('violation', {
      type: violationType,
      count: meeting.proctoring.tabSwitches,
    });

    // Auto-terminate after 3 violations
    if (meeting.proctoring.tabSwitches >= 3) {
      meeting.status = 'completed';
      io.to(`meeting-${meetingId}`).emit('meeting-terminated', {
        reason: 'Multiple proctoring violations',
      });
    }

    await meeting.save();

    res.json({
      message: 'Violation recorded',
      violations: meeting.proctoring.violations.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const endMeeting = async (req, res) => {
  try {
    const { meetingId, feedback } = req.body;

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    meeting.status = 'completed';
    meeting.endTime = new Date();
    meeting.duration = (meeting.endTime - meeting.startTime) / 1000; // in seconds
    if (feedback) {
      meeting.feedback = feedback;
    }

    await meeting.save();

    res.json({
      message: 'Meeting ended',
      duration: meeting.duration,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  joinMeeting,
  updateCode,
  recordViolation,
  endMeeting,
  getMeetingDetails,
};

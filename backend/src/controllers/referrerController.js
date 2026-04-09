const Referral = require('../models/Referral');
const User = require('../models/User');
const Message = require('../models/Message');
const Job = require('../models/Job');

const browseCandidates = async (req, res) => {
  try {
    const candidates = await User.find({ role: 'candidate' })
      .select('profile skills experience trustScore createdAt')
      .limit(20);

    res.json({ candidates });
  } catch (error) {
    console.error('Browse candidates error:', error);
    res.status(500).json({ error: error.message });
  }
};

const sendScreeningMessage = async (req, res) => {
  try {
    const { candidateId, content } = req.body;
    const referrerId = req.user.id;

    const message = new Message({
      senderId: referrerId,
      receiverId: candidateId,
      content,
      type: 'text',
    });

    await message.save();

    // Emit socket event
    const io = req.app.get('io');
    io.emit('screening-message', {
      from: referrerId,
      to: candidateId,
      message: content,
      timestamp: new Date(),
    });

    res.json({ message: 'Message sent' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getScreeningMessages = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const referrerId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: referrerId, receiverId: candidateId },
        { senderId: candidateId, receiverId: referrerId },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(50);

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitRecommendation = async (req, res) => {
  try {
    const { candidateId, jobId, confidence, comment, validationType, scores } = req.body;
    const referrerId = req.user.id;

    // Check for duplicate referral
    const existing = await Referral.findOne({ referrerId, candidateId, jobId });
    if (existing) {
      return res.status(400).json({ error: 'Referral already submitted' });
    }

    const referral = new Referral({
      referrerId,
      candidateId,
      jobId,
      confidence,
      comment,
      validationType,
      scores,
    });

    referral.calculateFinalScore();
    await referral.save();

    // Update referrer stats
    const referrer = await User.findById(referrerId);
    referrer.statistics.referralsSubmitted += 1;
    await referrer.save();

    res.status(201).json({
      message: 'Recommendation submitted',
      referral,
    });
  } catch (error) {
    console.error('Submit recommendation error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getReferrerStats = async (req, res) => {
  try {
    const referrerId = req.user.id;

    const referrer = await User.findById(referrerId).select('statistics trustScore');

    const referrals = await Referral.find({ referrerId });
    const successCount = referrals.filter((r) => r.status === 'accepted').length;

    res.json({
      referralsSubmitted: referrer.statistics.referralsSubmitted,
      referralsAccepted: referrer.statistics.referralsAccepted,
      successRate: referrer.statistics.successRate,
      trustScore: referrer.trustScore,
      recentReferrals: referrals.slice(-5),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  browseCandidates,
  sendScreeningMessage,
  getScreeningMessages,
  submitRecommendation,
  getReferrerStats,
};

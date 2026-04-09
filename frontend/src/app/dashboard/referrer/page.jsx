'use client';

import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function ReferrerDashboard() {
  const { user } = useAuthStore();
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [screeningMessage, setScreeningMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesRes, statsRes] = await Promise.all([
          API.get('/referrers/candidates'),
          API.get('/referrers/stats'),
        ]);

        setCandidates(candidatesRes.data.candidates || []);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async (candidateId) => {
    if (!screeningMessage.trim()) return;

    try {
      await API.post('/referrers/screening/message', {
        candidateId,
        content: screeningMessage,
      });

      setScreeningMessage('');
      alert('Message sent!');
    } catch (error) {
      console.error('Send message error:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Referrer Dashboard 🤝</h1>
          <p className="text-gray-400">Screen and recommend candidates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Trust Score</p>
            <p className="text-3xl font-bold text-yellow-400">{stats?.trustScore}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Referrals Submitted</p>
            <p className="text-3xl font-bold">{stats?.referralsSubmitted}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Accepted</p>
            <p className="text-3xl font-bold text-green-400">{stats?.referralsAccepted}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Success Rate</p>
            <p className="text-3xl font-bold text-blue-400">
              {(stats?.successRate || 0).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Candidates */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Candidate List */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">📋 Browse Candidates</h2>

            {candidates.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No candidates available</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className={`p-3 bg-slate-700/30 border rounded-lg cursor-pointer transition ${
                      selectedCandidate?._id === candidate._id
                        ? 'border-blue-500 bg-slate-600/50'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <p className="font-semibold">
                      {candidate.profile.firstName} {candidate.profile.lastName}
                    </p>
                    <p className="text-gray-400 text-sm">{candidate.email}</p>
                    <p className="text-yellow-400 text-xs mt-1">Trust: {candidate.trustScore}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Screening Chat */}
          {selectedCandidate && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">💬 Pre-Screening Chat</h2>

              <div className="bg-slate-700/30 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
                <p className="text-gray-400 text-sm text-center">Chat history will appear here</p>
              </div>

              <div className="space-y-3">
                <textarea
                  placeholder="Ask about projects, skills, experience..."
                  value={screeningMessage}
                  onChange={(e) => setScreeningMessage(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none transition"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSendMessage(selectedCandidate._id)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    Send Message
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                    Start Video
                  </button>
                </div>

                <button
                  onClick={() => alert('Recommendation form will appear here')}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                >
                  Submit Recommendation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

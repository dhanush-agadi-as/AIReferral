'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function CandidateDashboard() {
  const { user } = useAuthStore();
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, recommendationsRes] = await Promise.all([
          API.get('/candidates/dashboard'),
          API.get('/candidates/jobs/recommendations'),
        ]);

        setDashboard(dashboardRes.data);
        setRecommendations(recommendationsRes.data.recommendations || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.profile?.firstName}! 👋
          </h1>
          <p className="text-gray-400">Candidate Dashboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* AI Skill Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">📊 Your Skills</h3>
            <div className="space-y-2">
              {dashboard?.skillDashboard?.skills?.slice(0, 5).map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-300">{skill}</span>
                  <div className="w-20 h-2 bg-slate-700 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">💪 Strengths</h3>
            <ul className="space-y-2">
              {dashboard?.skillDashboard?.strengths?.map((strength, idx) => (
                <li key={idx} className="text-green-400 text-sm">
                  ✓ {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">📈 Recommendations</h3>
            <ul className="space-y-2">
              {dashboard?.skillDashboard?.recommendations?.map((rec, idx) => (
                <li key={idx} className="text-yellow-400 text-sm">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">🎯 Recommended Jobs</h2>

          {recommendations.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No job recommendations available yet</p>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg hover:border-blue-500 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{rec.job.title}</h3>
                      <p className="text-gray-400 text-sm">{rec.job.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        {Math.round(rec.matchPercentage)}%
                      </div>
                      <p className="text-gray-400 text-xs">Match</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-3">
                    <strong>Why matched:</strong> {rec.explanation}
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function RecruiterDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    experience: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await API.get('/recruiters/stats');
        setStats(statsRes.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/recruiters/jobs', newJob);
      setJobs([...jobs, response.data.job]);
      setShowJobForm(false);
      setNewJob({
        title: '',
        description: '',
        requiredSkills: [],
        experience: '',
      });
    } catch (error) {
      console.error('Create job error:', error);
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
          <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard 👔</h1>
          <p className="text-gray-400">Manage jobs and candidates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Total Jobs</p>
            <p className="text-3xl font-bold">{stats?.totalJobs}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Open Jobs</p>
            <p className="text-3xl font-bold text-green-400">{stats?.openJobs}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Closed Jobs</p>
            <p className="text-3xl font-bold text-red-400">{stats?.closedJobs}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-gray-400 text-sm">Applications</p>
            <p className="text-3xl font-bold text-blue-400">{stats?.totalApplications}</p>
          </div>
        </div>

        {/* Create Job Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition"
          >
            {showJobForm ? 'Cancel' : '+ Post New Job'}
          </button>
        </div>

        {/* Job Form */}
        {showJobForm && (
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none transition"
              />

              <textarea
                placeholder="Job Description"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                required
                rows="4"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none transition"
              />

              <input
                type="text"
                placeholder="Required Skills (comma separated)"
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    requiredSkills: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none transition"
              />

              <input
                type="text"
                placeholder="Experience Required"
                value={newJob.experience}
                onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none transition"
              />

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
              >
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Active Jobs */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Active Jobs</h2>

          {jobs.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No jobs posted yet</p>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div key={job._id} className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{job.description.substring(0, 100)}...</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/recruiter/jobs/${job._id}/candidates`)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                      View Candidates
                    </button>
                    <button
                      onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
                      className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                    >
                      Create Interview
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

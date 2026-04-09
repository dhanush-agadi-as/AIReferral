'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ReferralAI
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-400">Welcome, {user?.profile?.firstName}</span>
                <Link href={`/dashboard/${user?.role}`}>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                    Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="px-4 py-2 text-gray-300 hover:text-white transition">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Decentralized AI-Powered
          </span>
          <br />
          Hiring Ecosystem
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Combine AI automation, community trust, and real-time interviews. Hire the right talent through intelligent referrals and verified skills.
        </p>

        {!isAuthenticated && (
          <div className="flex gap-4 justify-center mb-16">
            <button
              onClick={() => router.push('/auth/register?role=candidate')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition transform hover:scale-105"
            >
              I'm a Candidate
            </button>
            <button
              onClick={() => router.push('/auth/register?role=recruiter')}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition transform hover:scale-105"
            >
              I'm a Recruiter
            </button>
            <button
              onClick={() => router.push('/auth/register?role=referrer')}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold transition transform hover:scale-105"
            >
              I'm a Referrer
            </button>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: '🤖 AI Skill Matching',
              description: 'Advanced NLP-based resume parsing and skill extraction',
            },
            {
              title: '🤝 Smart Referrals',
              description: 'Community-driven hiring with pre-screening validation',
            },
            {
              title: '🎥 Live Interviews',
              description: 'Real-time video + coding with proctoring system',
            },
            {
              title: '📊 Scoring System',
              description: 'Final Score = AI (70%) + Referrer (30%) validation',
            },
            {
              title: '💬 Real-time Chat',
              description: 'Socket.io powered messaging for instant communication',
            },
            {
              title: '🔐 Secure & Trusted',
              description: 'JWT auth, role-based access, encrypted data',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500 transition backdrop-blur"
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Architecture */}
        <div className="mt-20 p-8 bg-slate-800/30 border border-slate-700 rounded-xl backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-400">Frontend</p>
              <p className="text-gray-400">Next.js + React + Tailwind</p>
            </div>
            <div>
              <p className="font-semibold text-emerald-400">Backend</p>
              <p className="text-gray-400">Node.js + Express.js</p>
            </div>
            <div>
              <p className="font-semibold text-violet-400">AI Engine</p>
              <p className="text-gray-400">Python FastAPI + spaCy</p>
            </div>
            <div>
              <p className="font-semibold text-orange-400">Database</p>
              <p className="text-gray-400">MongoDB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-8 text-center text-gray-500">
        <p>ReferralAI © 2024 - Decentralized Hiring Ecosystem</p>
      </footer>
    </div>
  );
}

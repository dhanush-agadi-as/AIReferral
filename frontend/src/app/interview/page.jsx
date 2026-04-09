'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import API from '@/lib/api';
import { getSocket, initSocket } from '@/lib/socket';
import { useMeetingStore } from '@/lib/store';

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const password = searchParams.get('password');

  const editorRef = useRef(null);
  const [meeting, setMeeting] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [violations, setViolations] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addViolation } = useMeetingStore();

  useEffect(() => {
    const joinMeeting = async () => {
      try {
        const response = await API.post('/meetings/join', {
          meetingId,
          password,
        });

        setMeeting(response.data.meeting);
        setCode(response.data.meeting.codeChallenge?.initialCode || '');

        // Initialize socket
        const socket = initSocket();
        socket.emit('join-meeting', { meetingId });

        // Listen for violations
        socket.on('violation-detected', (data) => {
          setViolations((prev) => prev + 1);
          addViolation(data);

          if (data.type === 'tab-switch') {
            const violationCount = violations + 1;
            if (violationCount === 1) {
              alert('⚠️ Warning: Tab switching detected. One more violation will alert the recruiter.');
            } else if (violationCount === 2) {
              alert('🔴 Alert: Recruiter has been notified of suspicious activity.');
            } else if (violationCount >= 3) {
              alert('❌ Interview terminated due to multiple violations!');
            }
          }
        });

        return () => socket.off('violation-detected');
      } catch (error) {
        console.error('Join meeting error:', error);
        alert('Failed to join meeting');
      } finally {
        setLoading(false);
      }
    };

    if (meetingId && password) {
      joinMeeting();
    }
  }, [meetingId, password]);

  // Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const socket = getSocket();
        socket?.emit('tab-switch', {
          userId: meeting?._id,
          meetingId,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [meetingId, meeting]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);

    // Emit code update to other participants
    const socket = getSocket();
    socket?.emit('code-update', {
      meetingId,
      code: newCode,
      language,
    });
  };

  const handleEndMeeting = async () => {
    try {
      await API.post('/meetings/end', {
        meetingId,
        feedback: {
          recruiterComment: 'Interview completed',
        },
      });

      alert('Interview ended. Thank you!');
    } catch (error) {
      console.error('End meeting error:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading interview...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Live Interview 🎥</h1>
            <p className="text-gray-400">Meeting ID: {meetingId}</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <p className="text-xs text-gray-400">Violations</p>
              <p className={`text-2xl font-bold ${violations >= 3 ? 'text-red-500' : 'text-yellow-400'}`}>
                {violations}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Section */}
          <div>
            <div className="bg-gray-900 rounded-lg p-6 aspect-video border border-slate-700 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl mb-2">📹</p>
                <p className="text-gray-400">Video Stream (WebRTC)</p>
                <p className="text-sm text-gray-500 mt-2">In production, use Agora/Twilio</p>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-4">💬 Chat</h2>
              <div className="flex-1 bg-slate-700/30 rounded p-4 mb-4 overflow-y-auto">
                <p className="text-gray-400 text-sm text-center">Chat will appear here</p>
              </div>
              <input
                type="text"
                placeholder="Type message..."
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="mt-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">💻 Live Coding Challenge</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg outline-none"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4 min-h-96">
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="w-full h-80 font-mono bg-gray-900 text-white p-4 rounded outline-none"
                placeholder="// Write your code here..."
              />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">
                Run Code
              </button>
              <button
                onClick={handleEndMeeting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>

        {/* Violation Alert */}
        {violations > 0 && (
          <div className={`mt-6 p-4 rounded-lg border ${
            violations >= 3
              ? 'bg-red-900/20 border-red-500 text-red-400'
              : 'bg-yellow-900/20 border-yellow-500 text-yellow-400'
          }`}>
            <p className="font-semibold">
              {violations === 1 && '⚠️ Warning: Tab switching detected'}
              {violations === 2 && '🔴 Critical: Recruiter has been notified'}
              {violations >= 3 && '❌ Interview terminated due to violations'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

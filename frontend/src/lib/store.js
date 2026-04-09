import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  loadToken: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, isAuthenticated: true });
      }
    }
  },
}));

export const useJobsStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
}));

export const useMeetingStore = create((set) => ({
  meeting: null,
  code: '',
  violations: [],
  isRecording: false,

  setMeeting: (meeting) => set({ meeting }),
  setCode: (code) => set({ code }),
  addViolation: (violation) =>
    set((state) => ({
      violations: [...state.violations, violation],
    })),
  setRecording: (isRecording) => set({ isRecording }),
}));

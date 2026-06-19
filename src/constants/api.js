export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    CSRF: '/sanctum/csrf-cookie',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
  },
  SUBJECTS: {
    LIST: '/subjects',
    GET: (id) => `/subjects/${id}`,
  },
  LEARNING_SOURCES: {
    LIST: '/learning-sources',
    GET: (id) => `/learning-sources/${id}`,
    BY_SUBJECT: (subjectId) => `/subjects/${subjectId}/learning-sources`,
  },
  PROGRESS: {
    LIST: '/progress',
    UPDATE: '/progress',
    GET: (id) => `/progress/${id}`,
  },
  ADMIN: {
    USERS: '/admin/users',
    SUBJECTS: '/admin/subjects',
    SOURCES: '/admin/learning-sources',
    STATS: '/admin/stats',
  },
};

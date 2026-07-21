import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const authService = {
  async login(credentials) {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data) {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },
};

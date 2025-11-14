import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  verify: () => axiosInstance.post('/auth/verify'),
  getMe: () => axiosInstance.get('/auth/me'),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => axiosInstance.get('/projects', { params }),
  getById: (id) => axiosInstance.get(`/projects/${id}`),
  create: (data) => axiosInstance.post('/projects', data),
  update: (id, data) => axiosInstance.put(`/projects/${id}`, data),
  delete: (id) => axiosInstance.delete(`/projects/${id}`),
  toggleLike: (id) => axiosInstance.post(`/projects/${id}/like`),
  // Rating endpoints
  rateProject: (projectId, rating) => axiosInstance.post(`/projects/${projectId}/rate`, { rating }),
  getUserRating: (projectId) => axiosInstance.get(`/projects/${projectId}/rating/user`),
  getProjectRatings: (projectId) => axiosInstance.get(`/projects/${projectId}/ratings`),
  deleteRating: (projectId) => axiosInstance.delete(`/projects/${projectId}/rating`),
};

// Comments API
export const commentsAPI = {
  getByProject: (projectId) => axiosInstance.get(`/comments/${projectId}`),
  create: (projectId, data) => axiosInstance.post(`/comments/${projectId}`, data),
  delete: (id) => axiosInstance.delete(`/comments/${id}`),
  toggleLike: (id) => axiosInstance.post(`/comments/${id}/like`),
};

// Bookmarks API
export const bookmarksAPI = {
  getAll: (params) => axiosInstance.get('/bookmarks', { params }),
  toggle: (projectId) => axiosInstance.post(`/bookmarks/${projectId}`),
  check: (projectId) => axiosInstance.get(`/bookmarks/check/${projectId}`),
};

// Users API
export const usersAPI = {
  getProfile: (userId) => axiosInstance.get(`/users/${userId}`),
  getProjects: (userId, params) => axiosInstance.get(`/users/${userId}/projects`, { params }),
  updateProfile: (data) => axiosInstance.put('/users/profile', data),
  getStats: () => axiosInstance.get('/users/stats'),
};

export default axiosInstance;

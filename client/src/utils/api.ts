import axios from 'axios'
import { API_BASE_URL } from './constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API helpers
export const experienceAPI = {
  getAll: () => api.get('/experience'),
  create: (data: unknown) => api.post('/experience', data),
  update: (id: string, data: unknown) => api.put(`/experience/${id}`, data),
  delete: (id: string) => api.delete(`/experience/${id}`),
}

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  create: (data: unknown) => api.post('/projects', data),
  update: (id: string, data: unknown) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
}

export const publicationsAPI = {
  getAll: () => api.get('/publications'),
  create: (data: unknown) => api.post('/publications', data),
  update: (id: string, data: unknown) => api.put(`/publications/${id}`, data),
  delete: (id: string) => api.delete(`/publications/${id}`),
}

export const certificationsAPI = {
  getAll: () => api.get('/certifications'),
  create: (data: unknown) => api.post('/certifications', data),
  update: (id: string, data: unknown) => api.put(`/certifications/${id}`, data),
  delete: (id: string) => api.delete(`/certifications/${id}`),
}

export const contactAPI = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id: string) => api.put(`/contact/${id}/read`),
}

export const authAPI = {
  login: (password: string) => api.post('/auth/login', { password }),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, newPassword: string) => api.post('/auth/reset-password', { token, newPassword })
}

export default api

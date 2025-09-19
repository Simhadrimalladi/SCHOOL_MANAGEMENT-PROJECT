import api from '../api/axios';  // ✅ Keep this same

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

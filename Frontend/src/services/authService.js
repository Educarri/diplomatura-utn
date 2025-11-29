import api from '../config/api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  async register(nombre, email, password) {
    const response = await api.post('/auth/register', { nombre, email, password });
    return response.data.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};
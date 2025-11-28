import api from '../config/api';

export const categoryService = {
  async getAll(page = 1, limit = 100) {
    const params = new URLSearchParams({ page, limit });
    const response = await api.get(`/categories?${params}`);
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data.data;
  },

  async create(categoryData) {
    const response = await api.post('/categories', categoryData);
    return response.data.data;
  },

  async update(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data.data;
  },

  async delete(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
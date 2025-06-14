import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const superheroAPI = {
  getAll: (page, limit, search = '') => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    return api.get(`/superheroes?page=${page}&limit=${limit}${searchParam}`);
  },

  getById: (id) =>
      api.get(`/superheroes/${id}`),

  create: (superhero) =>
      api.post('/superheroes', superhero),

  update: (id, superhero) =>
      api.put(`/superheroes/${id}`, superhero),

  delete: (id) =>
      api.delete(`/superheroes/${id}`),
};

export default api;

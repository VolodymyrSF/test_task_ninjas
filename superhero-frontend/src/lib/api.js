import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const superheroAPI = {
  // Get all superheroes with pagination
  getAll: (page, limit, search = '') => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    return api.get(`/superheroes?page=${page}&limit=${limit}${searchParam}`);
  },

  // Get a single superhero by ID
  getById: (id) =>
      api.get(`/superheroes/${id}`),

  // Create a new superhero
  create: (superhero) =>
      api.post('/superheroes', superhero),

  // Update a superhero
  update: (id, superhero) =>
      api.put(`/superheroes/${id}`, superhero),

  // Delete a superhero
  delete: (id) =>
      api.delete(`/superheroes/${id}`),
};

export default api;

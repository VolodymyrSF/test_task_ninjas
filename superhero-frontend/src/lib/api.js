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
  getAll: (page = 1, limit = 5) => 
    api.get(`/superheroes?page=${page}&limit=${limit}`),
  
  // Get a single superhero by ID
  getById: (id) => 
    api.get(`/superheroes/${id}`),
  
  // Create a new superhero
  create: (superhero) => 
    api.post('/superheroes', superhero),
  
  // Update a superhero
  update: (id, superhero) => 
    api.patch(`/superheroes/${id}`, superhero),
  
  // Delete a superhero
  delete: (id) => 
    api.delete(`/superheroes/${id}`),
};

export default api;


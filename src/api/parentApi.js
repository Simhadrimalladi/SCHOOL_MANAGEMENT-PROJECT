// src/api/parentApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/parents';

// You might need to add token headers dynamically
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // or wherever you store your token
  return { Authorization: `Bearer ${token}` };
};

export const fetchParents = () => axios.get(API_URL, { headers: getAuthHeaders() });
export const createParent = (parent) => axios.post(API_URL, parent, { headers: getAuthHeaders() });
export const updateParent = (id, parent) => axios.put(`${API_URL}/${id}`, parent, { headers: getAuthHeaders() });
export const deleteParent = (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });

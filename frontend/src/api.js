import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Login API
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data.token;
};

// Register API
const register = async (name, email, password, role) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
  return response.data;
};

// Create User API (for admin)
const createUser = async (user, token) => {
  const response = await axios.post(`${API_URL}/admin/users`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update User API (for admin)
const updateUserById = async (id, user, token) => {
  const response = await axios.put(`${API_URL}/admin/users/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get Tasks API (for users)
const getTasks = async (token) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create Task API
const createTask = async (title, description, token) => {
  const response = await axios.post(
    `${API_URL}/tasks`,
    { title, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Get All Users API (for admin)
const getAllUsers = async (token) => {
  const response = await axios.get(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete User API (for admin)
const deleteUserById = async (id, token) => {
  const response = await axios.delete(`${API_URL}/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get All Tasks API (for admin)
const getAllTasks = async (token) => {
  const response = await axios.get(`${API_URL}/admin/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete Task API (for admin)
const deleteTaskById = async (id, token) => {
  const response = await axios.delete(`${API_URL}/admin/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export {
  login,
  register,
  getTasks,
  createTask,
  getAllUsers,
  deleteUserById,
  getAllTasks,
  deleteTaskById,
  createUser,
  updateUserById
};
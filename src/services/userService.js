import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const userService = {
  getUsers: async (page) => {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
  },
  getUser: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data.data;
  },
  updateUser: async (id, data) => {
    await axios.put(`${API_URL}/users/${id}`, data);
  },
  deleteUser: async (id) => {
    await axios.delete(`${API_URL}/users/${id}`);
  },
};

export default userService;

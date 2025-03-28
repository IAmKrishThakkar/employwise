import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export default {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
};
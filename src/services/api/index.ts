import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  ...(token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
});

// Check that api is up
api
  .get('/')
  .then(() => console.log('Server up'))
  .catch(() => console.log('Server disconnected'));

export default api;

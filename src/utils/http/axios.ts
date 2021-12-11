import axios from 'axios';

const instance = axios.create({
  timeout: 30000
});

axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(response => {
  return response;
}, err => {
  return Promise.reject(err);
});

export default instance;

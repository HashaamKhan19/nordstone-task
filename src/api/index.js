import axios from 'axios';

const baseURL = 'https://nordstone-backend-dcde26fe7925.herokuapp.com';

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const calculateData = data => {
  console.log('data in api', data);
  return API.post('/calculate', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

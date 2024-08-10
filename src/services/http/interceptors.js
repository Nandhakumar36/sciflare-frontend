import axios from 'axios';

axios.interceptors.response.use(response => response, error => {
  if (error) {
    console.log("error:",error);
  }
  return Promise.reject(error);
});

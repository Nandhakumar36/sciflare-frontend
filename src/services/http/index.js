import axios from 'axios';
import { fetch } from '../local-storage';

const getHeaders = async (options) => {
  let headers = {};
  const token = localStorage.getItem('token');
  headers.Authorization = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  headers = { ...headers };
  return headers;
}

const baseUrl =  "http://localhost:5005";

export const get = async (url,queryParams) => {
  const headers = await getHeaders()
  return axios.get(`${baseUrl}/${url}`, {
    headers,
  });
}


export const post = async (url, data, options) => {
  const headers = await getHeaders();
  return axios.post(`${baseUrl}/${url}`, data, {
    headers
  });
}
export const put = async (url, data, options) => {
  const headers = await getHeaders();
  return axios.put(`${baseUrl}/${url}`, data, {
    headers
  });
}


export const deleteFunction = async (url, options) => {
  const headers = await getHeaders(options);
  return axios.delete(`${baseUrl}/${url}`, { headers });
}


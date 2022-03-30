import axios from 'axios';
import {AUTHORIZATION} from '../contants';

const auth = JSON.parse(sessionStorage.getItem(AUTHORIZATION));
const token = auth ? auth.token : null;
// create axios instance
const service = axios.create({
  headers: token ? {'Authorization': `Bearer ${token}`} : {}
});

// Add a response interceptor
service.interceptors.response.use(handleSuccess, handleError);

const handleSuccess = (response) => {
  return response;
}
const handleError = (error) => {
  switch (error.response.status) {
    case 401:
      redirectTo(document, '/login');
      break;
    default:
      return Promise.reject(error);
  }
}
const redirectTo = (document, path) => {
  document.location = path;
};

export const getApi = (endpoint) => {
  return service.get(endpoint);
}

export const postApi = (endpoint, payload) => {
  return service.request({
    method: 'POST',
    url: endpoint,
    responseType: 'json',
    data: payload
  });
}

export const putApi = (endpoint, payload) =>{
  return service.request({
    method: 'PUT',
    url: endpoint,
    responseType: 'json',
    data: payload
  });
}

export const deleteApi = (endpoint) =>{
  return service.request({
    method: 'DELETE',
    url: endpoint,
    responseType: 'json',
    data: null
  });
}

export const setHeaders = (name, value)=>{
  service.defaults.headers.common[name] = value;
}

export const removeHeader =  (name) =>{
  delete service.defaults.headers.common[name];
}
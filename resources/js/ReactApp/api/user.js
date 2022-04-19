import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "user";

export const getUsers = () => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}`);
}

export const addUser = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

export const editUser = (data, id) => {
  return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
}

export const deleteUser = (id) => {
  return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
}

export const lockUser = (id) => {
  return axiosService.postApi(`${API_ENDPOINT}/auth/lock/${id}`);
}

export const unlockUser = (id) => {
  return axiosService.postApi(`${API_ENDPOINT}/auth/unlock/${id}`);
}
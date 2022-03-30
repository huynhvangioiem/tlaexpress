import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "diemgd";

export const getDiemGDs = () => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}`);
}

export const addDiemGD = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

export const editDiemGD = (data, id) => {
  return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
}

export const deleteDiemGD = (id) => {
  return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
}
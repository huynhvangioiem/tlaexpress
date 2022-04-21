import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "chuyenhang";

export const getChuyenHangs = () => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}`);
}

export const addChuyenHang = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

export const getChuyenHang = (id) => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}/${id}`);
}
export const editChuyenHang = (data, id) => {
  return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
}

export const deleteChuyenHang = (id) => {
  return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
}
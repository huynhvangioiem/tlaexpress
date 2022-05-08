import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "giaohang";

export const getPhieuGiaos = () => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}`);
}

export const addPhieuGiao = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

export const getPhieuGiao = (id) => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}/${id}`);
}
export const editPhieuGiao = (data, id) => {
  return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
}

export const deletePhieuGiao = (id) => {
  return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
}
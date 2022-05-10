import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "giaohangchitiet";

// export const getPhieuXuats = () => {
//   return axiosService.getApi(`${API_ENDPOINT}/${url}`);
// }

export const addGiaoHangChiTiet = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

// export const getPhieuXuat = (id) => {
//   return axiosService.getApi(`${API_ENDPOINT}/${url}/${id}`);
// }
// export const editPhieuXuat = (data, id) => {
//   return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
// }

// export const deletePhieuXuat = (id) => {
//   return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
// }
import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "donhang";

export const getDonHangs = () => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}`);
}

export const addDonHang = (data) => {
  return axiosService.postApi(`${API_ENDPOINT}/${url}`,data);
}

export const getDonHang = (id) => {
  return axiosService.getApi(`${API_ENDPOINT}/${url}/${id}`);
}
// export const editDiemGD = (data, id) => {
//   return axiosService.putApi(`${API_ENDPOINT}/${url}/${id}`,data);
// }

// export const deleteDiemGD = (id) => {
//   return axiosService.deleteApi(`${API_ENDPOINT}/${url}/${id}`);
// }
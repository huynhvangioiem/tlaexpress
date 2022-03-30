import * as axiosService from '../service/axiosService';
import {API_ENDPOINT} from '../contants';

const url = "auth";

export const login = data => {
  // return axiosService.postApi(`${API_ENDPOINT}/${url}/login`, data);
  return axiosService.postApi(`${API_ENDPOINT}/${url}/login`, data);
}
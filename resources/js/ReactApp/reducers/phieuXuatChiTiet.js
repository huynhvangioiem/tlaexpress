import _ from 'lodash';
import * as types from '../contants/phieuXuat';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = null;

const phieuXuatChiTietReducer = (state = initialState, action) => {
  switch (action.type) {
    //get phieuXuat => phieuXuatChiTiet
    case types.getPhieuXuat:
      return state;
    case types.getPhieuXuatSuccess:
      return action.payload
    case types.getPhieuXuatFailed:
      // toastError(action.payload);
      return state
      
    default: return state
  }
}
export default phieuXuatChiTietReducer;

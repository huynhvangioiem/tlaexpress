import _ from 'lodash';
import * as types from '../contants/phieuGiao';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = null;

const giaoHangChiTietReducer = (state = initialState, action) => {
  switch (action.type) {
    //get phieuGiao => phieuGiaoChiTiet
    case types.getPhieuGiao:
      return state;
    case types.getPhieuGiaoSuccess:
      return action.payload
    case types.getPhieuGiaoFailed:
      // toastError(action.payload);
      return state
      
    default: return state
  }
}
export default giaoHangChiTietReducer;

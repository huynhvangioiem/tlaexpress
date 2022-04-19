import _ from 'lodash';
import * as types from '../contants/donHang';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = {};

const donHangChiTietReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getDonHang:
      return state;
    case types.getDonHangSuccess:
      return action.payload
    case types.getDonHangFailed:
      toastError(action.payload);
      return state

    default: return state
  }
}
export default donHangChiTietReducer;

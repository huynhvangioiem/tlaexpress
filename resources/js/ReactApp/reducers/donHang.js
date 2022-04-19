import _ from 'lodash';
import * as types from '../contants/donHang';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = [];

const donHangReducer = (state = initialState, action) => {
  switch (action.type) {
    //get don hang
    case types.getDonHangs:
      return state
    case types.getDonHangsSuccess:
      return action.payload
    case types.getDonHangsFailed:
      return state
    // thêm đơn hàng
    case types.addDonHang:
      return state
    case types.addDonHangSuccess:
      toastSuccess("Tạo đơn hàng thành công!");
      state.push(action.payload)
      return [...state]
    case types.addDonHangFailed:
      toastError(action.payload);
      return state

    // mặc định
    default: return state;
  }
}
export default donHangReducer;
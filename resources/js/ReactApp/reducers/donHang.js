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
    //chỉnh sửa đơn hàng
    case types.editDonHang:
      return state
    case types.editDonHangSuccess:
      toastSuccess("Cập nhật đơn hàng thành công!");
      var index = _.findIndex(state, function (o) { return o.dh_id == action.payload.dh_id });
      state[index] = action.payload;
      return [...state]
    case types.editDonHangFailed:
      toastError(action.payload);
      return state
    //xoa don hang
    case types.deleteDonHang:
      return state;
    case types.deleteDonHangSuccess:
      toastSuccess("Đơn hàng đã được xóa thành công!");
      var index = _.findIndex(state, function (o) { return o.dh_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deleteDonHangFailed:
      toastError(action.payload);
      return state;
    // mặc định
    default: return state;
  }
}
export default donHangReducer;
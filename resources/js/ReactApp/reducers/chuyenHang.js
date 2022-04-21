import _ from 'lodash';
import * as types from '../contants/chuyenHang';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = [];

const chuyenHangReducer = (state = initialState, action) => {
  switch (action.type) {
    //get chuyen hang
    case types.getChuyenHangs:
      return state
    case types.getChuyenHangsSuccess:
      return action.payload
    case types.getChuyenHangsFailed:
      return state
    // them chuyen hang
    case types.addChuyenHang:
      return state
    case types.addChuyenHangSuccess:
      toastSuccess("Tạo chuyến hàng thành công!");
      state.push(action.payload)
      return [...state]
    case types.addChuyenHangFailed:
      toastError(action.payload);
      return state
    //chỉnh sửa đơn hàng
    case types.editChuyenHang:
      return state
    case types.editChuyenHangSuccess:
      toastSuccess("Cập nhật chuyến hàng thành công!");
      var index = _.findIndex(state, function (o) { return o.ch_id == action.payload.ch_id });
      state[index] = action.payload;
      return [...state]
    case types.editChuyenHangFailed:
      toastError(action.payload);
      return state
    //xoa don hang
    case types.deleteChuyenHang:
      return state;
    case types.deleteChuyenHangSuccess:
      toastSuccess("Chuyến hàng đã được xóa thành công!");
      var index = _.findIndex(state, function (o) { return o.ch_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deleteChuyenHangFailed:
      toastError(action.payload);
      return state;
    // mặc định
    default: return state;
  }
}
export default chuyenHangReducer;
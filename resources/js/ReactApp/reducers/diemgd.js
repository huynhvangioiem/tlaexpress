import _ from 'lodash';
import * as types from '../contants/diemgd';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = [];

const diemgdReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getDiemGDs:
      return state
    case types.getDiemGDsSuccess:
      return action.payload
    case types.getDiemGDsFailed:
      return state

    case types.addDiemGD:
      return state
    case types.addDiemGDSuccess:
      toastSuccess("Thêm điểm giao dịch thành công!");
      var newData = {
        ...action.payload,
        dgd_status: 1
      }
      state.push(newData)
      return [...state]
    case types.addDiemGDFailed:
      toastError(action.payload);
      return state

    case types.editDiemGd:
      return state
    case types.editDiemGdSuccess:
      toastSuccess("Cập nhật điểm giao dịch thành công!");
      var index = _.findIndex(state, function (o) { return o.dgd_id == action.payload.dgd_id });
      state[index] = action.payload;
      return [...state];
    case types.editDiemGdFailed:
      toastError(action.payload);
      return state;

    case types.deleteDiemGd:
      return state;
    case types.deleteDiemGdSuccess:
      toastSuccess("Điểm giao dịch đã được xóa!");
      var index = _.findIndex(state, function (o) { return o.dgd_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deleteDiemGdFailed:
      toastError(action.payload);
      return state;

    default: return state

  }
}
export default diemgdReducer;
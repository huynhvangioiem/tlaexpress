/** Quy Uoc
 * importType/funcName: phieuGiao; type: PhieuGiao; note: phieu giao
*/
import _ from 'lodash';
import * as types from '../contants/phieuGiao';
import { addPhieuGiaoSuccessMsg, deletePhieuGiaoSuccessMsg } from '../contants/toastMessage';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = [];

const giaoHangReducer = (state = initialState, action) => {
  switch (action.type) {
    //get phieu giao
    case types.getPhieuGiaos:
      return state
    case types.getPhieuGiaosSuccess:
      return action.payload
    case types.getPhieuGiaosFailed:
      return state

    // them phieu giao
    case types.addPhieuGiao:
      return state
    case types.addPhieuGiaoSuccess:
      toastSuccess(addPhieuGiaoSuccessMsg);
      state.push(action.payload)
      return [...state]
    case types.addPhieuGiaoFailed:
      toastError(action.payload);
      return state

    //xoa phieu giao
    case types.deletePhieuGiao:
      return state;
    case types.deletePhieuGiaoSuccess:
      toastSuccess(deletePhieuGiaoSuccessMsg);
      var index = _.findIndex(state, function (o) { return o.gh_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deletePhieuGiaoFailed:
      toastError(action.payload);
      return state;

    // default
    default: return state;
  }
}
export default giaoHangReducer;
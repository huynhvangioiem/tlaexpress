/** Quy Uoc
 * importType/funcName: phieuXuat; type: PhieuXuat; note: phieu xuat
*/
import _ from 'lodash';
import * as types from '../contants/phieuXuat';
import { addPhieuXuatSuccessMsg, deletePhieuXuatSuccessMsg, editPhieuXuatSuccessMsg } from '../contants/toastMessage';
import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = [];

const phieuXuatReducer = (state = initialState, action) => {
  switch (action.type) {
    //get phieu xuat
    case types.getPhieuXuats:
      return state
    case types.getPhieuXuatsSuccess:
      return action.payload
    case types.getPhieuXuatsFailed:
      return state

    // them phieu xuat
    case types.addPhieuXuat:
      return state
    case types.addPhieuXuatSuccess:
      toastSuccess(addPhieuXuatSuccessMsg);
      state.push(action.payload)
      return [...state]
    case types.addPhieuXuatFailed:
      toastError(action.payload);
      return state

    //chinh sua phieu xuat
    case types.editPhieuXuat:
      return state
    case types.editPhieuXuatSuccess:
      toastSuccess(editPhieuXuatSuccessMsg);
      var index = _.findIndex(state, function (o) { return o.px_id == action.payload.px_id });
      state[index] = action.payload;
      return [...state]
    case types.editPhieuXuatFailed:
      toastError(action.payload);
      return state

    //xoa phieu xuat
    case types.deletePhieuXuat:
      return state;
    case types.deletePhieuXuatSuccess:
      toastSuccess(deletePhieuXuatSuccessMsg);
      var index = _.findIndex(state, function (o) { return o.px_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deletePhieuXuatFailed:
      toastError(action.payload);
      return state;

    // default
    default: return state;
  }
}
export default phieuXuatReducer;
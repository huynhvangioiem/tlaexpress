import * as types from '../contants/diemgd';
// import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = {};

const dgdEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.prepareEdit:
      return action.payload;
    case types.cancleEdit:
      return action.payload;
    case types.editDiemGdSuccess:
      return {};
    default: return state
  }
}
export default dgdEdittingReducer;
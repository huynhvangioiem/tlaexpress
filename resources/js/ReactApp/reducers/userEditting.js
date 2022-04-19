import * as types from '../contants/user';
// import { toastError, toastSuccess } from '../Helper/toastHelper';

const initialState = {};

const userEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.prepareEditUser:
      return action.payload;
    case types.cancleEdit:
      return action.payload;
    case types.editUserSuccess:
      return {};
    default: return state
  }
}
export default userEdittingReducer;
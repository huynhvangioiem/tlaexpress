import * as types from '../contants/auth';
import { toastError, toastSuccess } from '../Helper/toastHelper';
const initialState = null;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return state
    case types.LOGIN_SUCCESS:
      toastSuccess('Đăng nhập thành công!');
      return action.payload;
    case types.LOGIN_FAILED:
      toastError(action.payload);
      return state

    case types.LOGOUT:
      return state
    case types.LOGOUT_SUCCESS:
      console.log("call reducers");
      toastSuccess('Đăng xuất thành công!');
      return null;
    case types.LOGOUT_FAILED:
      toastError(action.payload);
      return state

    default:
      return state;
  }
};
export default authReducer;
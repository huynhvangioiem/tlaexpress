import * as types from '../contants/auth';
import { toastError, toastSuccess } from '../Helper/toastHelper';
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state
      };
    }
    case types.LOGIN_SUCCESS: {
      toastSuccess('Đăng nhập thành công');
      return {
        ...state
      };
    }
    case types.LOGIN_FAILED: {
      const error  = action.payload;
      toastError(error);
      return {
        ...state
      };
    }
      default:
        return state;
  }
};
export default authReducer;
import { toastError, toastSuccess } from '../Helper/toastHelper';
import * as types from '../contants/user';

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getUsers:
      return state;
    case types.getUsersSuccess:
      return action.payload;


    case types.addUser:
      return state;
    case types.addUserSuccess:
      toastSuccess("Thêm điểm tài khoản thành công!");
      state.push(action.payload);
      return [...state];
    case types.addUserFailed:
      toastError(action.payload);
      return state;

    case types.editUser:
      return state
    case types.editUserSuccess:
      toastSuccess("Cập nhật tài khoản thành công!");
      var index = _.findIndex(state, function (o) { return o.nv_id == action.payload.nv_id });
      state[index] = action.payload;
      return [...state];
    case types.editUserFailed:
      toastError(action.payload);
      return state;

    case types.deleteUser:
      return state;
    case types.deleteUserSuccess:
      toastSuccess("Tài khoản đã được xóa!");
      var index = _.findIndex(state, function (o) { return o.nv_id == action.payload });
      state.splice(index, 1);
      return [...state];
    case types.deleteUserFailed:
      toastError(action.payload);
      return state;

    case types.lockUser:
      return state;
    case types.lockUserSuccess:
      toastSuccess("Tài khoản đã được vô hiệu!");
      var index = _.findIndex(state, function (o) { return o.nv_id == action.payload });
      state[index].user.user_status = 0;
      return [...state];
    case types.lockUserFailed:
      toastError(action.payload);
      return state;

    case types.unlockUser:
      return state;
    case types.unlockUserSuccess:
      toastSuccess("Tài khoản đã được mở khóa!");
      var index = _.findIndex(state, function (o) { return o.nv_id == action.payload });
      state[index].user.user_status = 1;
      return [...state];
    case types.unlockUserFailed:
      toastError(action.payload);
      return state;

    default: return state;
  }
}
export default userReducer;

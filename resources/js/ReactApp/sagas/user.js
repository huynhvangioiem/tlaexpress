import { addUserFailed, addUserSuccess, deleteUserFailed, deleteUserSuccess, editUserFailed, editUserSuccess, getUserSuccess, lockUserFailed, lockUserSuccess, unlockUserFailed, unlockUserSuccess } from '../actions/user';
import { addUser, deleteUser, editUser, getUsers, lockUser, unlockUser } from '../api/user';
import * as userTypes from '../contants/user';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import { STATUS_CODE } from '../contants';
import { back } from '@lagunovsky/redux-react-router';


function* processGetUsers() {
  while (true) {
    yield take(userTypes.getUsers);
    try {
      const resp = yield call(getUsers);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(getUserSuccess(data.success));
      } else {
        // yield put(getDiemGDsFailed(data.success));
      }
    } catch (error) {
      // const err = _get(error, 'response.data', {});
      yield put(getDiemGDsFailed("load dữ liệu thất bại"));
    }
  }
}

function* processAddUser({ payload }) {
  try {
    const response = yield call(addUser, payload);
    const { data, status } = response;
    if (data.success) {
      yield put(addUserSuccess(data.success[0]))
      yield put(back());
    } else {
      yield put(addUserFailed(data.error))
    }
  } catch (error) {
    yield put(addUserFailed("Thêm tài khỏan thất bại, vui lòng thử lại!"))
  }
}

function* processEditUser({payload}){
  const {userData, id} = payload
  try {
    const response = yield call(editUser, userData,id);
    const {data, status} = response;
    if(data.success){
      yield put(editUserSuccess(data.success[0]));
      yield put(back());
    }else{
      yield put(editUserFailed(data.error));
    }
  } catch (error) {
    yield put(editUserFailed("Cập nhật thất bại, vui lòng thử lại!"))
  }
}

function* processDeleteUser({payload}){
  try {
    const response = yield call(deleteUser,payload);
    const {data, status} = response;
    if(status===STATUS_CODE.SUCCESS){
      yield put(deleteUserSuccess(payload))
    }else{
      yield put(deleteUserFailed(data.error))
    }
  } catch (error) {
    yield put(deleteUserFailed("Không thể xóa tài khoản này!"));
  }
}

function* processLockUser({payload}){
  try {
    const response = yield call(lockUser,payload);
    const {data, status} = response;
    if(!data.error){
      yield put(lockUserSuccess(payload))
    }else{
      yield put(lockUserFailed(data.error))
    }
  } catch (error) {
    yield put(lockUserFailed("Không thể vô hiệu tài khoản này!"));
  }
}

function* processUnLockUser({payload}){
  try {
    const response = yield call(unlockUser,payload);
    const {data, status} = response;
    if(!data.error){
      yield put(unlockUserSuccess(payload))
    }else{
      yield put(unlockUserFailed(data.error))
    }
  } catch (error) {
    yield put(unlockUserFailed("Không thể mở khóa tài khoản này!"));
  }
}

function* userSaga() {
  yield fork(processGetUsers);
  yield takeLatest(userTypes.addUser, processAddUser);
  yield takeLatest(userTypes.editUser, processEditUser);
  yield takeLatest(userTypes.deleteUser, processDeleteUser);
  yield takeLatest(userTypes.lockUser, processLockUser);
  yield takeLatest(userTypes.unlockUser, processUnLockUser);

}
export default userSaga;
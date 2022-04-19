import { call, put, takeLatest } from 'redux-saga/effects';
import _get from 'lodash/get';
import { back, go  } from '@lagunovsky/redux-react-router'
import * as authTypes from '../contants/auth';
import {AUTHORIZATION, STATUS_CODE} from '../contants';
import { login, logout } from '../api/auth';
import { loginFailed, loginSuccess, logoutFailed, logoutSuccess } from '../actions/auth';
import * as axiosService from '../service/axiosService'


function* processLogin({ payload }) {
  try {
    const resp = yield call(login, payload);
    const {data, status} = resp;
    if(status === STATUS_CODE.SUCCESS){
      yield put(loginSuccess(data.data.user));

      const {token} = data.data;
      axiosService.setHeaders('Authorization', `Bearer ${token}`);
      sessionStorage.setItem(AUTHORIZATION,JSON.stringify(data.data));

      yield put(back());
      
    }else{
      yield put(loginFailed(data.error));
    }
  }catch(error){
    yield put(loginFailed("Đăng nhập thất bại, vui lòng thử lại!"));
  }
}

function* processLogout({ payload }) {
  try {
    const resp = yield call(logout);
    const {data, status} = resp;
    if(status === STATUS_CODE.SUCCESS){
      sessionStorage.removeItem(AUTHORIZATION);
      yield put(logoutSuccess());
      yield put(go("/login"));
    }else{
      yield put(logoutFailed(data.error));
    }
  }catch(error){
    yield put(logoutFailed("Đăng xuất thất bại, vui lòng thử lại!"));
  }
}


function* authSaga() {
  yield takeLatest(authTypes.LOGIN, processLogin);
  yield takeLatest(authTypes.LOGOUT, processLogout);
}

export default authSaga;
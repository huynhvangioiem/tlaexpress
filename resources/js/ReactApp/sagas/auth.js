import { call, put, takeLatest } from 'redux-saga/effects';
import _get from 'lodash/get';
import { back  } from '@lagunovsky/redux-react-router'
import * as authTypes from '../contants/auth';
import {AUTHORIZATION, STATUS_CODE} from '../contants';
import { login } from '../api/auth';
import { loginFailed, loginSuccess } from '../actions/auth';
import * as axiosService from '../service/axiosService'


function* processLogin({ payload }) {
  try {
    const resp = yield call(login, payload);
    const {data, status} = resp;
    if(status === STATUS_CODE.SUCCESS){
      yield put(loginSuccess(data.data));

      const {token} = data.data;
      axiosService.setHeaders('Authorization', `Bearer ${token}`);
      sessionStorage.setItem(AUTHORIZATION,JSON.stringify(data.data));

      yield put(back());
      
    }else{
      yield put(loginFailed(data.error));
    }
  }catch(error){
    const err = _get(error, 'response.data', {});
    yield put(loginFailed(err.message));
  }
}

function* authSaga() {
  yield takeLatest(authTypes.LOGIN, processLogin);
}

export default authSaga;
import * as authTypes from '../contants/auth';
import { call, put, takeLatest } from 'redux-saga/effects';

function* processLogin({payload}) {
  const { email, password } = payload;
  try{
    const resp = call(
      
    )
  }
}

function* authSaga() {
  yield takeLatest(authTypes.LOGIN, processLogin);
}

export default authSaga;
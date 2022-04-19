import { fork, all } from 'redux-saga/effects';
import authSaga from './auth';
import diemgdSaga from './diemgd';
import donHangSaga from './donHang';
import userSaga from './user';

function* rootSaga() {
  yield all(
    [
      yield fork(authSaga),
      yield fork(diemgdSaga),
      yield fork(userSaga),
      yield fork(donHangSaga),
    ]
  );
}

export default rootSaga;

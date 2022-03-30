import { fork, all } from 'redux-saga/effects';
import authSaga from './auth';
import diemgdSaga from './diemgd';

function* rootSaga() {
  yield all(
    [yield fork(authSaga),yield fork(diemgdSaga)]
  );
}

export default rootSaga;

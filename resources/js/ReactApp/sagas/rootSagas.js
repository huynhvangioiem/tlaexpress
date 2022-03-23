import { fork, all } from 'redux-saga/effects';
import authSaga from './auth';

function* rootSaga() {
  yield all(
    [
      yield fork(authSaga)
    ]
  );
}

export default rootSaga;

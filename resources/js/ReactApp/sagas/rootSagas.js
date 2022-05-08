import { fork, all } from 'redux-saga/effects';
import authSaga from './auth';
import chuyenHangSaga from './chuyenHang';
import diemgdSaga from './diemgd';
import donHangSaga from './donHang';
import giaoHangSaga from './giaoHang';
import phieuXuatSaga from './phieuXuat';
import userSaga from './user';

function* rootSaga() {
  yield all(
    [
      yield fork(authSaga),
      yield fork(diemgdSaga),
      yield fork(userSaga),
      yield fork(donHangSaga),
      yield fork(chuyenHangSaga),
      yield fork(phieuXuatSaga),
      yield fork(giaoHangSaga),
    ]
  );
}

export default rootSaga;

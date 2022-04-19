import * as donHangTypes from '../contants/donHang';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import _get from 'lodash/get';
import { STATUS_CODE } from '../contants';
import { back, go, push } from '@lagunovsky/redux-react-router'
import { addDonHang, getDonHang, getDonHangs } from '../api/donHang';
import { addDonHangFailed, addDonHangSuccess, getDonHangFailed, getDonHangsFailed, getDonHangsSuccess, getDonHangSuccess } from '../actions/donhang';

function* processGetDonHangs() {
  while (true) {
    yield take(donHangTypes.getDonHangs);
    try {
      const resp = yield call(getDonHangs);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(getDonHangsSuccess(data.success));
      } else {
        yield put(getDonHangsFailed(data.success));
      }
    } catch (error) {
      const err = _get(error, 'response.data', {});
      yield put(getDonHangsFailed(err.message));
    }
  }
}

function* processGetDonHang({ payload }) {
  // while (true) {
  // yield take(donHangTypes.getDonHangs);
  try {
    const resp = yield call(getDonHang,payload);
    const { data, status } = resp;
    if (data.success) {
      yield put(getDonHangSuccess(data.success[0]));
    } else {
      yield put(getDonHangFailed(data.error));
      yield (put(go(-1)));
    }
  } catch (error) {
    // const err = _get(error, 'response.data', {});
    yield put(getDonHangFailed("Tải dữ liệu thất bại. Vui lòng bấm F5 để thử lại!"));
  }
  // }
}

function* processAddDonHang({ payload }) {
  try {
    const response = yield call(addDonHang, payload);
    const { data, status } = response;
    if (status === STATUS_CODE.CREATED) {
      yield put(addDonHangSuccess(data.success[0]))
      yield put(back());
    } else {
      yield put(addDonHangFailed(data.error))
    }
  } catch (error) {
    yield put(addDonHangFailed("Tạo đơn hàng thất bại, vui lòng thử lại!"))
  }
}

function* donHangSaga() {
  yield fork(processGetDonHangs);
  yield takeLatest(donHangTypes.addDonHang, processAddDonHang);
  yield takeLatest(donHangTypes.getDonHang, processGetDonHang);
  // yield takeLatest(donHangTypes.editDiemGd, processEditDiemGD);
  // yield takeLatest(donHangTypes.deleteDiemGd, processDeleteDiemGD);

}
export default donHangSaga
import * as donHangTypes from '../contants/donHang';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import _get from 'lodash/get';
import { STATUS_CODE } from '../contants';
import { back, go, push } from '@lagunovsky/redux-react-router'
import { addDonHang, deleteDonHang, editDonHang, getDonHang, getDonHangs } from '../api/donHang';
import { addDonHangFailed, addDonHangSuccess, deleteDonHangFailed, deleteDonHangSuccess, editDonHangFailed, editDonHangSuccess, getDonHangFailed, getDonHangsFailed, getDonHangsSuccess, getDonHangSuccess } from '../actions/donhang';

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
    const resp = yield call(getDonHang, payload);
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

function* processEditDonHang({ payload }) {
  const { donHangData, id } = payload;
  try {
    const response = yield call(editDonHang, donHangData, id);
    const { data, status } = response;
    if (data.success) {
      yield put(editDonHangSuccess(data.success))
      yield put(back());
    } else {
      yield put(editDonHangFailed(data.error))
    }
  } catch (error) {
    yield put(editDonHangFailed("Cập nhật thất bại, vui lòng thử lại!"))
  }
}

function* processDeleteDonHang({payload}){
  try {
    const response = yield call(deleteDonHang,payload);
    const {data, status} = response;
    if(data.error){
      yield put(deleteDonHangFailed(data.error))
    }else{
      yield put(deleteDonHangSuccess(payload))
    }
  } catch (error) {
    yield put(deleteDonHangFailed("Không thể xóa đơn hàng này!"))
  }
}

function* donHangSaga() {
  yield fork(processGetDonHangs);
  yield takeLatest(donHangTypes.addDonHang, processAddDonHang);
  yield takeLatest(donHangTypes.getDonHang, processGetDonHang);
  yield takeLatest(donHangTypes.editDonHang, processEditDonHang);
  yield takeLatest(donHangTypes.deleteDonHang, processDeleteDonHang);

}
export default donHangSaga
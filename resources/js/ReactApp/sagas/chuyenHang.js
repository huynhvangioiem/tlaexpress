import * as chuyenHangTypes from '../contants/chuyenHang';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import _get from 'lodash/get';
import { STATUS_CODE } from '../contants';
import { back, go, push } from '@lagunovsky/redux-react-router'
import { addChuyenHangFailed, addChuyenHangSuccess, deleteChuyenHangFailed, deleteChuyenHangSuccess, editChuyenHangFailed, editChuyenHangSuccess, getChuyenHangFailed, getChuyenHangsFailed, getChuyenHangsSuccess, getChuyenHangSuccess } from '../actions/chuyenHang';
import { addChuyenHang, deleteChuyenHang, editChuyenHang, getChuyenHang, getChuyenHangs } from '../api/chuyenHang';

function* processGetChuyenHangs() {
  while (true) {
    yield take(chuyenHangTypes.getChuyenHangs);
    try {
      const resp = yield call(getChuyenHangs);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS && data.success) {
        yield put(getChuyenHangsSuccess(data.success));
      } else {
        yield put(getChuyenHangsFailed(data.error));
      }
    } catch (error) {
      yield put(getChuyenHangsFailed("Load dữ liệu thất bại. Vui lòng F5 để thử lại!"));
    }
  }
}

function* processAddChuyenHang({ payload }) {
  try {
    const response = yield call(addChuyenHang, payload);
    const { data, status } = response;
    if (status === STATUS_CODE.CREATED) {
      yield put(addChuyenHangSuccess(data.success[0]))
      yield put(back());
    } else {
      yield put(addChuyenHangFailed(data.error))
    }
  } catch (error) {
    yield put(addChuyenHangFailed("Tạo chuyến hàng thất bại, vui lòng thử lại!"))
  }
}

function* processEditChuyenHang({ payload }) {
  const { chuyenHangData, id } = payload;
  try {
    const response = yield call(editChuyenHang, chuyenHangData, id);
    const { data, status } = response;
    if (data.success) {
      yield put(editChuyenHangSuccess(data.success[0]))
      yield put(back());
    } else {
      yield put(editChuyenHangFailed(data.error))
    }
  } catch (error) {
    yield put(editChuyenHangFailed("Cập nhật thất bại, vui lòng thử lại!"))
  }
}

function* processDeleteChuyenHang({payload}){
  try {
    const response = yield call(deleteChuyenHang,payload);
    const {data, status} = response;
    if(data.error){
      yield put(deleteChuyenHangFailed(data.error))
    }else{
      yield put(deleteChuyenHangSuccess(payload))
    }
  } catch (error) {
    yield put(deleteChuyenHangFailed("Không thể xóa chuyến hàng này!"))
  }
}

function* chuyenHangSaga() {
  yield fork(processGetChuyenHangs);
  yield takeLatest(chuyenHangTypes.addChuyenHang, processAddChuyenHang);
  yield takeLatest(chuyenHangTypes.editChuyenHang, processEditChuyenHang);
  yield takeLatest(chuyenHangTypes.deleteChuyenHang, processDeleteChuyenHang);

}
export default chuyenHangSaga
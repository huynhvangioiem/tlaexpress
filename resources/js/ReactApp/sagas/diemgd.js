import * as diemgdTypes from '../contants/diemgd';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import _get from 'lodash/get';
import { addDiemGD, deleteDiemGD, editDiemGD, getDiemGDs } from '../api/diemgd';
import { STATUS_CODE } from '../contants';
import { addDiemGDFailed, addDiemGDSuccess, deleteDiemGdFailed, deleteDiemGdSuccess, editDiemGdFailed, editDiemGDSuccess, getDiemGDsFailed, getDiemGDsSuccess } from '../actions/diemgd';
import { back  } from '@lagunovsky/redux-react-router'


function* processGetDiemGDs() {
  while (true) {
    yield take(diemgdTypes.getDiemGDs);
    try {
      const resp = yield call(getDiemGDs);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(getDiemGDsSuccess(data.success));
      } else {
        // yield put(getDiemGDsFailed(data.success));
      }
    } catch (error) {
      const err = _get(error, 'response.data', {});
      // yield put(getDiemGDsFailed(err.message));
    }
  }
}

function* processAddDiemGD({payload}){
  try {
    const response = yield call(addDiemGD, payload);
    const {data, status} = response;
    if(status===STATUS_CODE.CREATED){
      yield put(addDiemGDSuccess(data.success))
      yield put(back());
    }else{
      yield put(addDiemGDFailed(data.error))
    }
  } catch (error) {
    yield put(addDiemGDFailed("Thêm điểm giao dịch thất bại, vui lòng thử lại!"))
  }
}

function* processEditDiemGD({payload}){
  const {diemGdData, id} = payload
  try {
    const response = yield call(editDiemGD, diemGdData,id);
    const {data, status} = response;
    if(status===STATUS_CODE.SUCCESS){
      yield put(editDiemGDSuccess(data.success))
      yield put(back());
    }else{
      yield put(editDiemGdFailed(data.error))
    }
  } catch (error) {
    yield put(editDiemGdFailed("Cập nhật thất bại, vui lòng thử lại!"))
  }
}

function* processDeleteDiemGD({payload}){
  try {
    const response = yield call(deleteDiemGD,payload);
    const {data, status} = response;
    if(status===STATUS_CODE.SUCCESS){
      yield put(deleteDiemGdSuccess(payload))
    //   yield put(back());
    }else{
      yield put(deleteDiemGdFailed(data.error))
    }
  } catch (error) {
    yield put(deleteDiemGdFailed("Không thể xóa điểm giao dịch này!"))
  }
}


function* diemgdSaga() {
  yield fork(processGetDiemGDs);
  yield takeLatest(diemgdTypes.addDiemGD, processAddDiemGD);
  yield takeLatest(diemgdTypes.editDiemGd, processEditDiemGD);
  yield takeLatest(diemgdTypes.deleteDiemGd, processDeleteDiemGD);

}
export default diemgdSaga
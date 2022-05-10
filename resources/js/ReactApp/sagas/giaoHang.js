/** Quy Uoc
 * import/rootFuncName/data: phieuGiao; type/funcName/action/api/msg: PhieuGiao;
*/

import * as phieuGiaoTypes from '../contants/phieuGiao';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import { STATUS_CODE } from '../contants';
import { back, go, push } from '@lagunovsky/redux-react-router'
import { addPhieuGiao, deletePhieuGiao, editPhieuGiao, getPhieuGiao, getPhieuGiaos } from '../api/phieuGiao.js';
import { addPhieuGiaoFailed, addPhieuGiaoSuccess, deletePhieuGiaoFailed, deletePhieuGiaoSuccess, getPhieuGiaoFailed, getPhieuGiaosFailed, getPhieuGiaosSuccess, getPhieuGiaoSuccess } from '../actions/phieuGiao';
import { addPhieuGiaoFailedMsg, deletePhieuGiaoFailedMsg, getPhieuGiaosFailedMsg } from '../contants/toastMessage';
// import { addPhieuGiaoChiTiet } from '../api/phieuGiaoChiTiet';
import { editDonHang } from '../api/donHang';
import dateFormat from 'dateFormat';
import { addLichSuDonHang } from '../api/lichSuDonHang';
import { toastError } from '../Helper/toastHelper';
import { addGiaoHangChiTiet } from '../api/giaoHangChiTiet';


function* processGetPhieuGiaos() {
  while (true) {
    yield take(phieuGiaoTypes.getPhieuGiaos);
    try {
      const resp = yield call(getPhieuGiaos);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS && data.success) {
        yield put(getPhieuGiaosSuccess(data.success));
      } else {
        yield put(getPhieuGiaosFailed(data.error));
      }
    } catch (error) {
      yield put(getPhieuGiaosFailed(getPhieuGiaosFailedMsg));
    }
  }
}

function* processGetPhieuGiao({ payload }) {
  try {
    const resp = yield call(getPhieuGiao, payload);
    const { data, status } = resp;
    if (data.success) {
      yield put(getPhieuGiaoSuccess(data.success[0]));
    } else {
      // yield put(back());
      yield put(getPhieuGiaoFailed(data.error));
    }
  } catch (error) {
    yield put(getPhieuGiaoFailed(getPhieuGiaosFailedMsg));
  }
  // }
}

function* processAddPhieuGiao({ payload }) {
  try {
    const response = yield call(addPhieuGiao, payload);
    const { data, status } = response;
    if (status === STATUS_CODE.CREATED) {
      yield put(addPhieuGiaoSuccess(data.success[0]));
    } else {
      yield put(addPhieuGiaoFailed(data.error));
    }
  } catch (error) {
    yield put(addPhieuGiaoFailed(addPhieuGiaoFailedMsg));
  }
}

function* processDeletePhieuGiao({ payload }) {
  try {
    const response = yield call(deletePhieuGiao, payload);
    const { data, status } = response;
    if (data.error) {
      yield put(deletePhieuGiaoFailed(data.error))
    } else {
      yield put(deletePhieuGiaoSuccess(payload))
    }
  } catch (error) {
    yield put(deletePhieuGiaoFailed(deletePhieuGiaoFailedMsg))
  }
}

function* processGiaoHang({ payload }) {
  var success = true;
  try {
    const { maDonHangs, maPhieuGiao } = payload;
    /**Add list of don hang to giaoHangChiTiet and update donHang */
    for (let i = 0; i < maDonHangs.length; i++) {
      const maDH = maDonHangs[i];
      //1.1 add don hang to giaoHangChiTiet
      const response1 = yield call(addGiaoHangChiTiet, { 'gh_id': maPhieuGiao, 'dh_id': maDH });
      if (response1.data.success) { //1.1 success => 1.2
        //1.2 update dh_trangthai and dh_vitri
        const response2 = yield call(editDonHang, { 'dh_trangthai': 4 }, maDH);
        if (response2.data.success) { //if 1.2 success => 1.3
          // 1.3 add history of donHang
          const response3 = yield call(addLichSuDonHang, { 'dh_id': maDH, 'lsdh_vitri': "GH" + maPhieuGiao });
          if (response3.data.success) { //if 1.3 success

          } else { //1.3 failed
            success = false;
          }
        } else { //1.2 failed
          success = false;
        }
      } else {//1.1 failed
        success = false;
        toastError(response1.data.error);
      }
    }
    /** Update phieuGiao if add donHang success*/
    if (success) {
      const res = yield call(
        editPhieuGiao,
        { 'gh_trangthai': 1 },
        maPhieuGiao
      );
      if (res.data.success) {
        yield put(go(0));
      } else {
        success = false;
      }
    }
  } catch (error) {
    success = false;
  }
}

function* processDonHangSuccess({ payload }) {
  try {
    const response1 = yield call(editDonHang, { 'dh_trangthai': 5 }, payload);
    const response2 = yield call(addLichSuDonHang, { 'dh_id': payload, 'lsdh_vitri': "Done" });
    yield put(go(0));
  } catch (error) {

  }
}

function* phieuGiaoSaga() {
  yield fork(processGetPhieuGiaos);
  yield takeLatest(phieuGiaoTypes.getPhieuGiao, processGetPhieuGiao);
  yield takeLatest(phieuGiaoTypes.addPhieuGiao, processAddPhieuGiao);
  yield takeLatest(phieuGiaoTypes.deletePhieuGiao, processDeletePhieuGiao);
  yield takeLatest(phieuGiaoTypes.giaoHang, processGiaoHang);
  yield takeLatest(phieuGiaoTypes.donHangSuccess, processDonHangSuccess);

}
export default phieuGiaoSaga
/** Quy Uoc
 * import/rootFuncName/data: phieuXuat; type/funcName/action/api/msg: PhieuXuat;
*/

import * as phieuXuatTypes from '../contants/phieuXuat';
import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import { STATUS_CODE } from '../contants';
import { back, go, push } from '@lagunovsky/redux-react-router'
import { addPhieuXuat, deletePhieuXuat, editPhieuXuat, getPhieuXuat, getPhieuXuats } from '../api/phieuXuat';
import { addPhieuXuatFailed, addPhieuXuatSuccess, deletePhieuXuatFailed, deletePhieuXuatSuccess, editPhieuXuatFailed, editPhieuXuatSuccess, exportPhieuXuatFailed, exportPhieuXuatSuccess, getPhieuXuatFailed, getPhieuXuatsFailed, getPhieuXuatsSuccess, getPhieuXuatSuccess } from '../actions/phieuXuat';
import { addDonHangToPhieuXuatChiTiet_Error_Cant, addPhieuXuatFailedMsg, deletePhieuXuatFailedMsg, editPhieuXuatFailedMsg, getPhieuXuatsFailedMsg } from '../contants/toastMessage';
import { addPhieuXuatChiTiet } from '../api/phieuXuatChiTiet';
import { editDonHang } from '../api/donHang';
import dateFormat from 'dateFormat';
import { addLichSuDonHang } from '../api/lichSuDonHang';
import { toastError } from '../Helper/toastHelper';


function* processGetPhieuXuats() {
  while (true) {
    yield take(phieuXuatTypes.getPhieuXuats);
    try {
      const resp = yield call(getPhieuXuats);
      const { data, status } = resp;
      if (status === STATUS_CODE.SUCCESS && data.success) {
        yield put(getPhieuXuatsSuccess(data.success));
      } else {
        yield put(getPhieuXuatsFailed(data.error));
      }
    } catch (error) {
      yield put(getPhieuXuatsFailed(getPhieuXuatsFailedMsg));
    }
  }
}

function* processGetPhieuXuat({ payload }) {
  try {
    const resp = yield call(getPhieuXuat, payload);
    const { data, status } = resp;
    if (data.success) {
      yield put(getPhieuXuatSuccess(data.success[0]));
    } else {
      yield put(back());
      yield put(getPhieuXuatFailed(data.error));
    }
  } catch (error) {
    yield put(getPhieuXuatFailed(getPhieuXuatsFailedMsg));
  }
  // }
}

function* processAddPhieuXuat({ payload }) {
  try {
    const response = yield call(addPhieuXuat, payload);
    const { data, status } = response;
    if (status === STATUS_CODE.CREATED) {
      yield put(addPhieuXuatSuccess(data.success[0]));
      yield put(back());
    } else {
      yield put(addPhieuXuatFailed(data.error));
    }
  } catch (error) {
    yield put(addPhieuXuatFailed(addPhieuXuatFailedMsg));
  }
}

function* processEditPhieuXuat({ payload }) {
  const { phieuXuatData, id } = payload;
  try {
    const response = yield call(editPhieuXuat, phieuXuatData, id);
    const { data, status } = response;
    if (data.success) {
      yield put(editPhieuXuatSuccess(data.success[0]));
      yield put(back());
    } else {
      yield put(editPhieuXuatFailed(data.error));
    }
  } catch (error) {
    yield put(editPhieuXuatFailed(editPhieuXuatFailedMsg));
  }
}

function* processDeletePhieuXuat({ payload }) {
  try {
    const response = yield call(deletePhieuXuat, payload);
    const { data, status } = response;
    if (data.error) {
      yield put(deletePhieuXuatFailed(data.error))
    } else {
      yield put(deletePhieuXuatSuccess(payload))
    }
  } catch (error) {
    yield put(deletePhieuXuatFailed(deletePhieuXuatFailedMsg))
  }
}

function* processExportPhieuXuat({ payload }) {
  var success = true;
  try {
    const { maDonHangs, maPhieuXuat } = payload;
    /**Add list of don hang to phieuXuatChiTiet and update donHang */
    for (let i = 0; i < maDonHangs.length; i++) {
      const maDH = maDonHangs[i];
      //1.1 add don hang to phieuXuatChiTiet
      const response1 = yield call(addPhieuXuatChiTiet, { 'px_id': maPhieuXuat, 'dh_id': maDH });
      if (response1.data.success) { //1.1 success => 1.2
        //1.2 update dh_trangthai and dh_vitri
        const response2 = yield call(editDonHang, { 'dh_trangthai': 2, 'dh_vitri': "PX" + maPhieuXuat }, maDH);
        if (response2.data.success) { //if 1.2 success => 1.3
          // 1.3 add history of donHang
          const response3 = yield call(addLichSuDonHang, { 'dh_id': maDH, 'lsdh_vitri': "PX" + maPhieuXuat });
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
    /** Update phieuXuat if add donHang success*/
    if (success) {
      const res = yield call(
        editPhieuXuat,
        { 'px_thoigian': dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"), 'px_trangthai': 1 },
        maPhieuXuat
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

function* processImportPhieuXuat({ payload }) {
  var success = true;
  try {
    const { donHangs, idPx, idKho } = payload;
    /**Add list of don hang to phieuXuatChiTiet and update donHang */
    for (let i = 0; i < donHangs.length; i++) {
      const donHang = donHangs[i];
      //1. update status donHang
      const response1 = yield call(editDonHang, { 'dh_trangthai': donHang.dh_trangthai, 'dh_vitri': "KH" + idKho }, donHang.maDH);
      if (response1.data.success) { //1. success => 2.
        // 2. add history of donHang
        const response2 = yield call(addLichSuDonHang, { 'dh_id': donHang.maDH, 'lsdh_vitri': "KH" + idKho });
        if (response2.data.success) { //if 2 success

        } else { //2 failed
          success = false;
        }
      } else {//1. failed
        success = false;
      }
    }
    /** Update phieuXuat if add donHang success*/
    if (success) {
      const res = yield call(editPhieuXuat, { 'px_trangthai': 2 }, idPx);
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


function* phieuXuatSaga() {
  yield fork(processGetPhieuXuats);
  yield takeLatest(phieuXuatTypes.getPhieuXuat, processGetPhieuXuat);
  yield takeLatest(phieuXuatTypes.addPhieuXuat, processAddPhieuXuat);
  yield takeLatest(phieuXuatTypes.editPhieuXuat, processEditPhieuXuat);
  yield takeLatest(phieuXuatTypes.deletePhieuXuat, processDeletePhieuXuat);
  yield takeLatest(phieuXuatTypes.exportPhieuXuat, processExportPhieuXuat);
  yield takeLatest(phieuXuatTypes.importPhieuXuat, processImportPhieuXuat);

}
export default phieuXuatSaga
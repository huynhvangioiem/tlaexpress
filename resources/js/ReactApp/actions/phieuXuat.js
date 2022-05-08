/** Quy Uoc
 * name and type: PhieuXuat; input/payload/import: phieuXuat; note: phieu xuat
 */

import * as types from '../contants/phieuXuat';

// lay danh sach phieu xuat
export const getPhieuXuats = () => ({
    type: types.getPhieuXuats,
    payload: null
});
export const getPhieuXuatsSuccess = (phieuXuatsData) => ({
  type: types.getPhieuXuatsSuccess,
  payload: phieuXuatsData
});
export const getPhieuXuatsFailed = (error) => ({
  type: types.getPhieuXuatsFailed,
  payload: error
});

// lay thong tin chi tiet 1 phieu xuat
export const getPhieuXuat = (id) => ({
  type: types.getPhieuXuat,
  payload: id
});
export const getPhieuXuatSuccess = (phieuXuatData) => ({
type: types.getPhieuXuatSuccess,
payload: phieuXuatData
});
export const getPhieuXuatFailed = (error) => ({
type: types.getPhieuXuatFailed,
payload: error
});

//tao phieu xuat
export const addPhieuXuat = (phieuXuatData) => ({
  type: types.addPhieuXuat,
  payload: phieuXuatData
});
export const addPhieuXuatSuccess = (phieuXuatDataCreated) => ({
  type: types.addPhieuXuatSuccess,
  payload: phieuXuatDataCreated
});
export const addPhieuXuatFailed = (error) => ({
  type: types.addPhieuXuatFailed,
  payload: error
});

//lay thong tin phieu xuat can chinh sua
export const preareEditPhieuXuat = (phieuXuatEditting) =>({
  type: types.prepareEditPhieuXuat,
  payload: phieuXuatEditting
})
export const cancleEditPhieuXuat = () => ({
  type: types.cancleEditPhieuXuat,
  payload: null
})
//chinh sua thong tin phieu xuat
export const editPhieuXuat = (phieuXuatData, id) => ({
  type: types.editPhieuXuat,
  payload: { phieuXuatData, id }
})
export const editPhieuXuatSuccess = (phieuXuatUpdated) => ({
  type: types.editPhieuXuatSuccess,
  payload: phieuXuatUpdated
})
export const editPhieuXuatFailed = (error) => ({
  type: types.editPhieuXuatFailed,
  payload: error
})
//xoa phieu xuat
export const deletePhieuXuat = (id) => ({
  type: types.deletePhieuXuat,
  payload: id,
})
export const deletePhieuXuatSuccess = (idDeleted) => ({
  type: types.deletePhieuXuatSuccess,
  payload: idDeleted,
})
export const deletePhieuXuatFailed = (error) => ({
  type: types.deletePhieuXuatFailed,
  payload: error,
})

//export phieu xuat
export const exportPhieuXuat = (maDonHangs,maPhieuXuat) => ({
  type: types.exportPhieuXuat,
  payload: {maDonHangs,maPhieuXuat},
})
// export const exportPhieuXuatSuccess = (phieuXuatChiTiet) => ({
//   type: types.exportPhieuXuatSuccess,
//   payload: phieuXuatChiTiet,
// })
// export const exportPhieuXuatFailed = (error) => ({
//   type: types.exportPhieuXuatFailed,
//   payload: error,
// })

//import phieu xuat
export const importPhieuXuat = (donHangs,idPx, idKho) => ({
  type: types.importPhieuXuat,
  payload: {donHangs,idPx, idKho},
})
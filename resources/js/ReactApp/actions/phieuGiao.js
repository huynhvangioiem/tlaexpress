/** Quy Uoc
 * name and type: PhieuGiao; input/payload/import: phieuGiao; note: phieu giao
 */

import * as types from '../contants/phieuGiao.js';

// lay danh sach phieu giao
export const getPhieuGiaos = () => ({
    type: types.getPhieuGiaos,
    payload: null
});
export const getPhieuGiaosSuccess = (phieuGiaosData) => ({
  type: types.getPhieuGiaosSuccess,
  payload: phieuGiaosData
});
export const getPhieuGiaosFailed = (error) => ({
  type: types.getPhieuGiaosFailed,
  payload: error
});

// lay thong tin chi tiet 1 phieu giao
export const getPhieuGiao = (id) => ({
  type: types.getPhieuGiao,
  payload: id
});
export const getPhieuGiaoSuccess = (phieuGiaoData) => ({
type: types.getPhieuGiaoSuccess,
payload: phieuGiaoData
});
export const getPhieuGiaoFailed = (error) => ({
type: types.getPhieuGiaoFailed,
payload: error
});

//tao phieu giao
export const addPhieuGiao = (phieuGiaoData) => ({
  type: types.addPhieuGiao,
  payload: phieuGiaoData
});
export const addPhieuGiaoSuccess = (phieuGiaoDataCreated) => ({
  type: types.addPhieuGiaoSuccess,
  payload: phieuGiaoDataCreated
});
export const addPhieuGiaoFailed = (error) => ({
  type: types.addPhieuGiaoFailed,
  payload: error
});


//xoa phieu giao
export const deletePhieuGiao = (id) => ({
  type: types.deletePhieuGiao,
  payload: id,
})
export const deletePhieuGiaoSuccess = (idDeleted) => ({
  type: types.deletePhieuGiaoSuccess,
  payload: idDeleted,
})
export const deletePhieuGiaoFailed = (error) => ({
  type: types.deletePhieuGiaoFailed,
  payload: error,
})

//giao hang
export const giaoHang = (maDonHangs,maPhieuGiao) => ({
  type: types.giaoHang,
  payload: {maDonHangs,maPhieuGiao},
})
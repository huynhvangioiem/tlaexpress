import * as types from '../contants/chuyenHang';

// lay danh sach chuyen hang
export const getChuyenHangs = () => ({
    type: types.getChuyenHangs,
    payload: null
});
export const getChuyenHangsSuccess = (data) => ({
  type: types.getChuyenHangsSuccess,
  payload: data
});
export const getChuyenHangsFailed = error => ({
  type: types.getChuyenHangsFailed,
  payload: error
});


//tao chuyen hang
export const addChuyenHang = (chuyenHangData) => ({
  type: types.addChuyenHang,
  payload: chuyenHangData
});
export const addChuyenHangSuccess = (chuyenHangData) => ({
  type: types.addChuyenHangSuccess,
  payload: chuyenHangData
});
export const addChuyenHangFailed = (error) => ({
  type: types.addChuyenHangFailed,
  payload: error
});

//lay thong tin chuyen hang can chinh sua
export const preareEditChuyenHang = (chuyenHangEditting) =>({
  type: types.prepareEditChuyenHang,
  payload: chuyenHangEditting
})
export const cancleEdit = () => ({
  type: types.cancleEditChuyenHang,
  payload: {}
})
//chinh sua thong tin chuyen hang
export const editChuyenHang = (chuyenHangData, id) => ({
  type: types.editChuyenHang,
  payload: { chuyenHangData, id }
})
export const editChuyenHangSuccess = (chuyenHangData) => ({
  type: types.editChuyenHangSuccess,
  payload: chuyenHangData
})
export const editChuyenHangFailed = (error) => ({
  type: types.editChuyenHangFailed,
  payload: error
})
//xoa chuyen hang
export const deleteChuyenHang = (id) => ({
  type: types.deleteChuyenHang,
  payload: id,
})
export const deleteChuyenHangSuccess = (id) => ({
  type: types.deleteChuyenHangSuccess,
  payload: id,
})
export const deleteChuyenHangFailed = (error) => ({
  type: types.deleteChuyenHangFailed,
  payload: error,
})
import * as types from '../contants/donHang';

// lay danh sach don hang
export const getDonHangs = () => ({
    type: types.getDonHangs,
    payload: null
});
export const getDonHangsSuccess = (data) => ({
  type: types.getDonHangsSuccess,
  payload: data
});
export const getDonHangsFailed = error => ({
  type: types.getDonHangsFailed,
  payload: error
});

//lay thong tin don hang
export const getDonHang = (id) => ({
  type: types.getDonHang,
  payload: id
});
export const getDonHangSuccess = (data) => ({
type: types.getDonHangSuccess,
payload: data
});
export const getDonHangFailed = error => ({
type: types.getDonHangFailed,
payload: error
});

//tao don hang
export const addDonHang = (donHangData) => ({
  type: types.addDonHang,
  payload: donHangData
});
export const addDonHangSuccess = (donHangData) => ({
  type: types.addDonHangSuccess,
  payload: donHangData
});
export const addDonHangFailed = (error) => ({
  type: types.addDonHangFailed,
  payload: error
});
//lay thong tin don hang can chinh sua
export const preareEditDonHang = (donHangEditting) =>({
  type: types.prepareEditDonHang,
  payload: donHangEditting
})
export const cancleEdit = () => ({
  type: types.cancleEditDonHang,
  payload: {}
})
//chinh sua thong tin don hang
export const editDonHang = (donHangData, id) => ({
  type: types.editDonHang,
  payload: { donHangData, id }
})
export const editDonHangSuccess = (donHangData) => ({
  type: types.editDonHangSuccess,
  payload: donHangData[0]
})
export const editDonHangFailed = (error) => ({
  type: types.editDonHangFailed,
  payload: error
})
//xoa don hang
export const deleteDonHang = (id) => ({
  type: types.deleteDonHang,
  payload: id,
})
export const deleteDonHangSuccess = (id) => ({
  type: types.deleteDonHangSuccess,
  payload: id,
})
export const deleteDonHangFailed = (error) => ({
  type: types.deleteDonHangFailed,
  payload: error,
})
import * as types from '../contants/diemgd'

export const getDiemGDs = () => {
  return {
    type: types.getDiemGDs,
    payload: null
  }
};
export const getDiemGDsSuccess = (data) => ({
  type: types.getDiemGDsSuccess,
  payload: data
});
export const getDiemGDsFailed = error => ({
  type: types.getDiemGDsFailed,
  payload: error
});

export const addDiemGD = (diemGdData) => ({
  type: types.addDiemGD,
  payload: diemGdData
});
export const addDiemGDSuccess = (diemGdData) => ({
  type: types.addDiemGDSuccess,
  payload: diemGdData
});
export const addDiemGDFailed = (error) => ({
  type: types.addDiemGDFailed,
  payload: error
});

export const onPrepareEditing = (dgdIsEditing) => ({
  type: types.prepareEdit,
  payload: dgdIsEditing
})
export const onCancleEdit = () => ({
  type: types.cancleEdit,
  payload: {}
})
export const editDiemGD = (diemGdData, id) => ({
  type: types.editDiemGd,
  payload: { diemGdData, id }
})
export const editDiemGDSuccess = (diemGdData) => ({
  type: types.editDiemGdSuccess,
  payload: diemGdData
})
export const editDiemGdFailed = (error) => ({
  type: types.editDiemGdFailed,
  payload: error
})

export const deleteDiemGd = (id) => ({
  type: types.deleteDiemGd,
  payload: id,
})
export const deleteDiemGdSuccess = (id) => ({
  type: types.deleteDiemGdSuccess,
  payload: id,
})
export const deleteDiemGdFailed = (error) => ({
  type: types.deleteDiemGdFailed,
  payload: error,
})
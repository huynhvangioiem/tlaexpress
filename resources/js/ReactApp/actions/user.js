import * as types from '../contants/user'

export const getUser = () => ({
  type: types.getUsers,
  payload: null
});
export const getUserSuccess = (data) => ({
  type: types.getUsersSuccess,
  payload: data
});
export const getUserFailed = (error) => ({
  type: types.getUsersSuccess,
  payload: error
});

export const addUser = (userData) => ({
  type: types.addUser,
  payload: userData
});
export const addUserSuccess = (userData) => ({
  type: types.addUserSuccess,
  payload: userData
});
export const addUserFailed = (error) => ({
  type: types.addUserFailed,
  payload: error
});

export const prepareEditing = (userEditting) => ({
  type: types.prepareEditUser,
  payload: userEditting
})
export const onCancleEdit = () => ({
  type: types.cancleEdit,
  payload: {}
})
export const editUser = (userData, id) => ({
  type: types.editUser,
  payload: { userData, id }
})
export const editUserSuccess = (userData) => ({
  type: types.editUserSuccess,
  payload: userData
})
export const editUserFailed = (error) => ({
  type: types.editUserFailed,
  payload: error
})

export const deleteUser = (id) => ({
  type: types.deleteUser,
  payload: id,
})
export const deleteUserSuccess = (id) => ({
  type: types.deleteUserSuccess,
  payload: id,
})
export const deleteUserFailed = (error) => ({
  type: types.deleteUserFailed,
  payload: error,
})

export const lockUser = (id) => ({
  type: types.lockUser,
  payload: id,
})
export const lockUserSuccess = (id) => ({
  type: types.lockUserSuccess,
  payload: id,
})
export const lockUserFailed = (error) => ({
  type: types.lockUserFailed,
  payload: error,
})

export const unlockUser = (id) => ({
  type: types.unlockUser,
  payload: id,
})
export const unlockUserSuccess = (id) => ({
  type: types.unlockUserSuccess,
  payload: id,
})
export const unlockUserFailed = (error) => ({
  type: types.unlockUserFailed,
  payload: error,
})
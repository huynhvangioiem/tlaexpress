import * as types from '../contants/auth'

export const login = (accountInfo) => ({
  type: types.LOGIN,
  payload: accountInfo
});

export const loginSuccess = data => ({
  type: types.LOGIN_SUCCESS,
  payload: data
});

export const loginFailed = error => ({
  type: types.LOGIN_FAILED,
  payload: error
});

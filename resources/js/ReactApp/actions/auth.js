import * as types from '../contants/auth'

export const login = (email, password) => ({
  type: types.LOGIN,
  payload: {
    email,
    password
  }
});

export const loginSuccess = data => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    data
  }
});

export const loginFailed = error => ({
  type: types.LOGIN_FAILED,
  payload: {
    error
  }
});

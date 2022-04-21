import _ from 'lodash';
import * as types from '../contants/chuyenHang';

const initialState = {};

const chuyenHangEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.prepareEditChuyenHang:
      return action.payload;
    case types.cancleEditChuyenHang:
      return action.payload;
    default: return state
  }
}
export default chuyenHangEdittingReducer;

import _ from 'lodash';
import * as types from '../contants/donHang';

const initialState = {};

const donHangEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.prepareEditDonHang:
      return action.payload;
    case types.cancleEditDonHang:
      return action.payload;
    default: return state
  }
}
export default donHangEdittingReducer;

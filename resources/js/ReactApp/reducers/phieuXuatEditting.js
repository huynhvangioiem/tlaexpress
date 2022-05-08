/** Quy Uoc
 * importType/funcName: phieuXuat; type: PhieuXuat; note: phieu xuat
*/
import _ from 'lodash';
import * as types from '../contants/phieuXuat';

const initialState = null;

const phieuXuatEdittingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.prepareEditPhieuXuat:
      return action.payload;
    case types.cancleEditPhieuXuat:
      return action.payload;
    default: return state
  }
}
export default phieuXuatEdittingReducer;

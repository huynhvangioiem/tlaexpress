import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { createBrowserHistory  } from 'history';

import authReducer from './auth';
import diemgdReducer from './diemgd';
import dgdEdittingReducer from './dgdEditting';
import userReducer from './user';
import userEdittingReducer from './userEditting';
import donHangReducer from './donHang';
import donHangChiTietReducer from './donHangChiTiet';
import donHangEdittingReducer from './donHangEditting';
import chuyenHangReducer from './chuyenHang';
import chuyenHangEdittingReducer from './chuyenHangEditting';
import phieuXuatReducer from './phieuXuat';
import phieuXuatEdittingReducer from './phieuXuatEditting';
import phieuXuatChiTietReducer from './phieuXuatChiTiet';
import giaoHangReducer from './giaoHang';
import giaoHangChiTietReducer from './phieuGiaoChiTiet';

const browserHistory = createBrowserHistory();


const rootReducer = combineReducers({
  auth: authReducer,
  diemgd: diemgdReducer,
  dgdEditting: dgdEdittingReducer,
  user: userReducer,
  userEditting: userEdittingReducer,
  donHangs : donHangReducer,
  donHangChiTiet : donHangChiTietReducer,
  donHangEditting : donHangEdittingReducer,
  chuyenHangs: chuyenHangReducer,
  chuyenHangEditting: chuyenHangEdittingReducer,
  
  phieuXuats: phieuXuatReducer,
  phieuXuatEditting: phieuXuatEdittingReducer,
  phieuXuatChiTiet: phieuXuatChiTietReducer,

  giaoHangs: giaoHangReducer,
  giaoHangChiTiet: giaoHangChiTietReducer,


  router: createRouterReducer(browserHistory),
});

export default rootReducer;

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
  router: createRouterReducer(browserHistory),
});

export default rootReducer;

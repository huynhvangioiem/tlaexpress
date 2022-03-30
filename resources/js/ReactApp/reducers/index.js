import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { createBrowserHistory  } from 'history';

import authReducer from './auth';
import diemgdReducer from './diemgd';
import dgdEdittingReducer from './dgdEditting';

const browserHistory = createBrowserHistory();


const rootReducer = combineReducers({
  auth: authReducer,
  diemgd: diemgdReducer,
  dgdEditting: dgdEdittingReducer,
  router: createRouterReducer(browserHistory),
});

export default rootReducer;

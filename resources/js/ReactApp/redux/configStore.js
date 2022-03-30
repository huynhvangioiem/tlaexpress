import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from '../sagas/rootSagas';
import { createBrowserHistory  } from 'history'
import { createRouterMiddleware, ReduxRouterState} from '@lagunovsky/redux-react-router'
import rootReducer from '../reducers';

// import thunk from 'redux-thunk';


const sagaMiddleware = createSagaMiddleware();
const browserHistory = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(browserHistory)

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(routerMiddleware,sagaMiddleware)
  // other store enhancers if any
)

const configureStore = () => {
  var store = createStore(
    rootReducer,
    composedEnhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;

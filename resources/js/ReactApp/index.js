import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { createBrowserHistory  } from 'history';
const browserHistory = createBrowserHistory();

import App from './App';
import { RequireAuth, Authenticated } from './utils';
import Login from './page/Login/index'
import configureStore from './redux/configStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <ReduxRouter history={browserHistory} store={store}>
          <Routes>
            <Route path="/*" element={<RequireAuth redirectTo="/login"><App /></RequireAuth>} />
            <Route path="/login" element={<Authenticated redirectTo='/'><Login /></Authenticated>} />
          </Routes>
          <ToastContainer />
        </ReduxRouter>
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);


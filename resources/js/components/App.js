import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

import Sidebar from './SideBar';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid" id="container">
        <div className="row">
          {/* Left */}
          <Sidebar />
          {/* Right */}
          <div className="col-10 col-m-11 col-s-12" id="right">
            <Header />
            <Main />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>, document.getElementById('app'));

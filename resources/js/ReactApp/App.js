import React from 'react'
import { Routes } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

import Sidebar from './components/SideBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './Router';


export default function App() {
  return (
    <div className="container-fluid" id="container">
      <div className="row">
        {/* Left */}
        <Sidebar />
        {/* Right */}
        <div className="col-10 col-m-11 col-s-12" id="right">
          <Header />
          {/* Main */}
          <Router/>
          <Footer />
        </div>
      </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { Routes } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

import Sidebar from './components/SideBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { getDiemGDs } from './actions/diemgd';
import { getUser } from './actions/user';
import _ from 'lodash';
import { AUTHORIZATION } from './contants';
import { logout } from './actions/auth';
import { getChuyenHangs } from './actions/chuyenHang';
import { getDonHangs } from './actions/donhang';
import { getPhieuXuats } from './actions/phieuXuat';


export default function App() {
  const dispatch = useDispatch();
  const loginData = sessionStorage.getItem(AUTHORIZATION) ?  JSON.parse(sessionStorage.getItem(AUTHORIZATION)).user : "";
  const [userLogin, setuserLogin] = useState({});

  useEffect(() => {
    setuserLogin(loginData)
    dispatch(getUser());
    dispatch(getDiemGDs())
    dispatch(getChuyenHangs());
    dispatch(getDonHangs());
    dispatch(getPhieuXuats());

  },[]);

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <div className="container-fluid" id="container">
      <div className="row">
        {/* Left */}
        <Sidebar />
        {/* Right */}
        <div className="col-10 col-m-11 col-s-12" id="right">
          <Header logout ={onLogout}>{userLogin}</Header>
          {/* Main */}
          <Router/>
          <Footer />
        </div>
      </div>
    </div>
  )
}
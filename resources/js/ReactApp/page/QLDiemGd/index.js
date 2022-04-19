import clsx from 'clsx';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getDiemGDs } from '../../actions/diemgd';

import MenuQLDiemGD from '../../components/MenuQLDiemGD';
import style from './style.module.scss';

const  QLDiemGd = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //get list of DiemGD
    // dispatch(getDiemGDs())
  },[]);

  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý điểm giao dịch</div>
      <MenuQLDiemGD />
      <Outlet />
    </div>
  )
}

export default QLDiemGd;
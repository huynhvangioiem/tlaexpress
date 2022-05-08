import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getPhieuGiaos } from '../../actions/phieugiao';
import { AUTHORIZATION } from '../../contants';
import style from './style.module.scss';

export default function QLGiao(props) {

  const dispatch = useDispatch();
  const auth = JSON.parse(sessionStorage.getItem(AUTHORIZATION));
  
  useEffect(() => {
    dispatch(getPhieuGiaos());
  },[])

  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-6 col-m-6 col-s-12", style.title)}>Quản lý giao hàng</div>
      <Outlet />
    </div>
  )
}

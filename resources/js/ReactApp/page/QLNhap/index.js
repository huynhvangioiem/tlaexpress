import clsx from 'clsx';
import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './style.module.scss';


export default function QLNhap() {


  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý nhập kho</div>
      <Outlet />
    </div>
  )
}

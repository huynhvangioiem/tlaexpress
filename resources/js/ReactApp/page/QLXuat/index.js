import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getPhieuXuats } from '../../actions/phieuXuat';
import MenuQLXuat from '../../components/MenuQLXuat';
import style from './style.module.scss';

export default function QLXuat(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getPhieuXuats());
  },[])

  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý xuất kho</div>
      <MenuQLXuat />
      <Outlet />
    </div>
  )
}

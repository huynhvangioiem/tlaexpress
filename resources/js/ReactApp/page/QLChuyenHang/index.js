import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getChuyenHangs } from '../../actions/chuyenHang';
import MenuQLChuyenHang from '../../components/MenuQLChuyenHang';
import style from './style.module.scss';

export default function QLChuyenHang(props) {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getChuyenHangs());
  // }, [])
  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý chuyến hàng</div>
      <MenuQLChuyenHang />
      <Outlet />
    </div>
  )
}

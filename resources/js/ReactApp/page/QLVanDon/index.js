import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getDonHangs } from '../../actions/donhang';
import MenuQLVanDon from '../../components/MenuQLVanDon';
import style from './style.module.scss';


export default function QLVanDon(props) {

  // const dispatch = useDispatch();
  // useEffect(() => {
  // },[])

  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý điểm giao dịch</div>
      <MenuQLVanDon />
      <Outlet />
    </div>
  )
}

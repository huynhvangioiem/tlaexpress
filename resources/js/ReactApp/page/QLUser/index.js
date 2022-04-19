import clsx from 'clsx';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUser } from '../../actions/user';
import MenuQLUser from '../../components/MenuQLUser';
// import { actGetUsersRequest } from '../../actions';


import style from './QLUser.module.scss';

const QLUser = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUser());
  }, [])
  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý người dùng</div>
      <MenuQLUser />
      <Outlet />
    </div>
  )
}


export default QLUser
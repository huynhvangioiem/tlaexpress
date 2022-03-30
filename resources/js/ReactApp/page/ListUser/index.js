import React, { useEffect } from 'react';
import clsx from 'clsx';
import UserList from '../../components/UserList';
import style from './style.module.scss';

export default function ListUser() {
  useEffect(() => {
    // console.log("call api list user");
  }, [])
  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid",style.listUser)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh Sách Tài Khoản Nhân Viên</div>
          <UserList />
        </div>
      </div>
    </div>
  )
}

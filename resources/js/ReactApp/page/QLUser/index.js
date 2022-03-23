import clsx from 'clsx';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import MenuQLUser from '../../components/MenuQLUser';
// import { actGetUsersRequest } from '../../actions';


import style from './QLUser.module.scss';

const QLUser = (props) => {
  useEffect(()=>{
    // props.getUsers();
  },[])
  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý người dùng</div>
      <MenuQLUser />
      <Outlet />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QLUser)

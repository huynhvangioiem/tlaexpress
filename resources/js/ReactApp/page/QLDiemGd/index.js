import clsx from 'clsx';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getDiemGDs } from '../../actions/diemgd';

import MenuQLDiemGD from '../../components/MenuQLDiemGD';
import style from './style.module.scss';

const  QLDiemGd = (props) => {
  
  useEffect(() => {
    //get list of DiemGD
    props.onGetDiemGDs();
  },[]);

  return (
    <div className={clsx("row", style.mainContent)}>
      <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Quản lý điểm giao dịch</div>
      <MenuQLDiemGD />
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
    onGetDiemGDs: () => dispatch(getDiemGDs())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(QLDiemGd)
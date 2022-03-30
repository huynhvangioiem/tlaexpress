import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import style from './style.module.scss';
import DiemGDList from '../../components/DiemGDList';
import { showAddress } from '../../config/handleDvhc'
import { StatusDiemGd } from '../../contants';
import { findIndex } from '../../config';
import { deleteDiemGd, onPrepareEditing } from '../../actions/diemgd';

const ListDiemGD = (props) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataDiemgs = useSelector(state => state.diemgd);
  const [diemGds, setDiemGds] = useState([]);

  useEffect(() => {
    var newState = [];
    for (let i = 0; i < dataDiemgs.length; i++) {
      var diemGd = {
        ...dataDiemgs[i],
        dgdAddress: `${dataDiemgs[i].dgd_diachi}, ${showAddress(dataDiemgs[i].dgd_tinhHuyenXa)}`,
        dgdStatus: StatusDiemGd[dataDiemgs[i].dgd_status],
      }
      newState.push(diemGd);
    }
    setDiemGds(newState);
  }, [dataDiemgs])

  const onEditDiemGd = (id) => {
    var index = findIndex(dataDiemgs,id,"dgd_id");
    dispatch(onPrepareEditing(dataDiemgs[index]));
    navigate("/quan-ly-diem-giao-dich/them-diem-giao-dich");
  }
  const onDeleteDiemGd = (id) => {
    if(confirm("Bạn có chắc chắn rằng muốn xóa điểm giao dịch này?")){
      dispatch(deleteDiemGd(id));
    }
  }


  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listDiemGd)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách điểm giao dịch</div>
          <DiemGDList edit={onEditDiemGd} del={onDeleteDiemGd} >{diemGds}</DiemGDList>
        </div>
      </div>
    </div>
  )
}

export default ListDiemGD;
import clsx from 'clsx'
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDonHang, preareEditDonHang } from '../../actions/donhang';

import DonHangList from '../../components/DonHangList';
import { findIndex, showLocaleDonHang } from '../../config';
import { trangThaiDonHang, viTriDonHang } from '../../contants';
import style from './style.module.scss';

export default function ListDonHang(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataDonHang = useSelector(state => state.donHangs);
  const dataUsers = useSelector(state => state.user);
  const dataDiemgs = useSelector(state => state.diemgd);
  const [donHangs, setDonHangs] = useState([]);

  useEffect(() => {
    if( !_.isEmpty(dataDonHang) && !_.isEmpty(dataUsers) && !_.isEmpty(dataDiemgs) ){
      var newState = [];
      for (let i = 0; i < dataDonHang.length; i++) {
        const data = dataDonHang[i];
        var donHang = {
          'maDonHang': 'DH'+data.dh_id,
          'mota': data.dh_mota,
          'khoGui': dataUsers[_.findIndex(dataUsers, function (o) { return o.user_name == data.dh_nguoitao })].diemgd.dgd_ten,
          'khoPhat': data.kho_phat.dgd_ten,
          'phiVanChuyen': data.dh_phivanchuyen,
          'trangThai': trangThaiDonHang[data.dh_trangthai],
          'vitri': showLocaleDonHang(data.dh_vitri,dataDiemgs),
        }
        newState.push(donHang);
      } 
      setDonHangs(newState);
    }else{
      setDonHangs([]);
    }
  }, [dataDonHang,dataUsers,dataDiemgs])

  const onDetail = (id) => {
    navigate("/quan-ly-van-don/chi-tiet-don-hang?dh="+id);
  }
  const onEditDiemGd = (id) => {
    var index = _.findIndex(dataDonHang, function (dh) { return dh.dh_id == id.substring(2,id.length) });
    dispatch(preareEditDonHang(dataDonHang[index]));
    navigate("/quan-ly-van-don/tao-don-hang");
  }
  const onDeleteDiemGd = (id) => {
    if(confirm("Bạn có chắc chắn rằng muốn xóa đơn hàng này?")){
      dispatch(deleteDonHang(id.substring(2, id.length)));
    }
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listDonHang)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách đơn hàng</div>
          <DonHangList detail={onDetail} edit={onEditDiemGd} del={onDeleteDiemGd} >{donHangs}</DonHangList>
        </div>
      </div>
    </div>
  )
}

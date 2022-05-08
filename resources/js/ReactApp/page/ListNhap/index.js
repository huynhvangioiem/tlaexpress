import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateFormat';

import { trangThaiPhieuXuat } from '../../contants';
import style from './style.module.scss';
import NhapList from '../../components/NhapList';

export default function ListNhap() {

  // definitions and getData from store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataPhieuXuats = useSelector(state => state.phieuXuats);
  const dataDiemgs = useSelector(state => state.diemgd);
  const dataUsers = useSelector(state => state.user);
  const auth = JSON.parse(sessionStorage.getItem("AUTHORIZATION"));


  const [phieuXuats, setPhieuXuats] = useState([]);

  //data processing
  useEffect(() => {
    if (!_.isEmpty(dataPhieuXuats) && !_.isEmpty(dataDiemgs) && !_.isEmpty(dataUsers)) {
      var newState = [];
      dataPhieuXuats.forEach(data => {
        //
        if (data.px_trangthai == 1 && data.px_diemden == auth.user.dgd_id) {
          const phieuXuat = {
            'maPhieuXuat': 'PX' + data.px_id,
            'thoiGianXuat': dateFormat(new Date(data.px_thoigian), "dd/mm/yyyy HH:MM"),
            'diemDen': dataDiemgs[_.findIndex(dataDiemgs, function (dgd) { return dgd.dgd_id == data.px_diemden })].dgd_ten,
            'chuyenHang': "CH" + data.px_chuyenhang,
            'nguoiXuat': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == data.px_nguoixuat })].nv_ten,
            'trangThai': trangThaiPhieuXuat[data.px_trangthai],
          }
          newState.push(phieuXuat);
        }
      });
      setPhieuXuats(newState);
    } else {
      setPhieuXuats([]);
    }
  }, [dataPhieuXuats, dataDiemgs, dataUsers])

  /** handle functions */
  const onDetail = (id) => {
    navigate("/quan-ly-nhap-kho/chi-tiet-phieu-nhap?px=" + id);
  }

  return (
    <div className={clsx("col-12 col-m-12 col-s-12")}>
      <div className={clsx("container-fluid", style.listNhap)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách phiếu xuất cần nhập</div>
          <NhapList detail={onDetail}>{phieuXuats}</NhapList>
        </div>
      </div>
    </div>
  )
}

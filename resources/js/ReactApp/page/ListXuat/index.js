import clsx from 'clsx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import XuatList from '../../components/XuatList';
import dateFormat from "dateformat";
import style from './style.module.scss';
import { trangThaiPhieuXuat } from '../../contants';
import { deletePhieuXuat, preareEditPhieuXuat } from '../../actions/phieuXuat';
import { toastError } from '../../Helper/toastHelper';
import { comfirmDelMsg, notPermissDelMsg, notPermissEditMsg } from '../../contants/toastMessage';

export default function ListXuat() {
  const auth = JSON.parse(sessionStorage.getItem("AUTHORIZATION"));
  // definitions and getData from store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataPhieuXuats = useSelector(state => state.phieuXuats);
  const dataDiemgs = useSelector(state => state.diemgd);
  const dataUsers = useSelector(state => state.user);

  const [phieuXuats, setPhieuXuats] = useState([]);

  //data processing
  useEffect(() => {
    if (!_.isEmpty(dataPhieuXuats) && !_.isEmpty(dataDiemgs) && !_.isEmpty(dataUsers)) {
      var newState = [];
      dataPhieuXuats.forEach(data => {
        const phieuXuat = {
          'maPhieuXuat': 'PX' + data.px_id,
          'thoiGianXuat': dateFormat(new Date(data.px_thoigian), "dd/mm/yyyy HH:MM"),
          'diemDen': dataDiemgs[_.findIndex(dataDiemgs, function (dgd) { return dgd.dgd_id == data.px_diemden })].dgd_ten,
          'chuyenHang': "CH" + data.px_chuyenhang,
          'nguoiXuat': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == data.px_nguoixuat })].nv_ten,
          'trangThai': trangThaiPhieuXuat[data.px_trangthai],
        }
        newState.push(phieuXuat);
      });
      setPhieuXuats(newState);
    } else {
      setPhieuXuats([]);
    }
  }, [dataPhieuXuats, dataDiemgs, dataUsers])


  /** handle functions */
  const onDetail = (id) => {
    navigate("/quan-ly-xuat-kho/chi-tiet-phieu-xuat?px="+id);
  }
  const onEditPhieuXuat = (id) => {
    var index = _.findIndex(dataPhieuXuats, function (px) { return px.px_id == id.substring(2, id.length) });
    if (dataPhieuXuats[index].px_nguoixuat != auth.user.user_name) {
      toastError(notPermissEditMsg);
    } else {
      dispatch(preareEditPhieuXuat(dataPhieuXuats[index]));
      navigate("/quan-ly-xuat-kho/tao-phieu-xuat");
    }
  }
  const onDeletePhieuXuat = (id) => {
    var index = _.findIndex(dataPhieuXuats, function (px) { return px.px_id == id.substring(2, id.length) });
    if (dataPhieuXuats[index].px_nguoixuat != auth.user.user_name) {
      toastError(notPermissDelMsg);
    } else
      if (confirm(comfirmDelMsg)) {
        dispatch(deletePhieuXuat(id.substring(2, id.length)));
      }
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listXuat)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách phiếu xuất</div>
          <XuatList detail={onDetail} edit={onEditPhieuXuat} del={onDeletePhieuXuat} >{phieuXuats}</XuatList>
        </div>
      </div>
    </div>
  )
}

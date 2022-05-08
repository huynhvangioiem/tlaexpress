import clsx from 'clsx'
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteChuyenHang, preareEditChuyenHang } from '../../actions/chuyenHang';
import ChuyenHangList from '../../components/ChuyenHangList';
import { dateFormat } from '../../config';
import { trangThaiChuyenHang } from '../../contants';
import style from './style.module.scss';

export default function ListChuyenHang() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataChuyenHangs = useSelector(state => state.chuyenHangs);
  const dataDiemgs = useSelector(state => state.diemgd);

  const [chuyenHangs, setChuyenHangs] = useState([]);

  useEffect(() => {
    if(!_.isEmpty(dataChuyenHangs) && !_.isEmpty(dataDiemgs)) {
      var newState = [];
      for (let i = 0; i < dataChuyenHangs.length; i++) {
        const data = dataChuyenHangs[i];
        var chuyenHang = {
          'maChuyen': "CH"+data.ch_id,
          'taiXe': data.ch_tentaixe,
          'bks': data.ch_bks,
          'trangThai': trangThaiChuyenHang[data.ch_trangthai],
          'lichTrinh':  showLichTrinh(data.lich_trinh[0].dgd_id,data.lich_trinh[1].dgd_id,dataDiemgs),
          'thoiGian': dateFormat(data.lich_trinh[0].lt_thoigian) + " - " + dateFormat(data.lich_trinh[1].lt_thoigian),
        }
        newState.push(chuyenHang);
      }
      setChuyenHangs(newState);
    }else{
      setChuyenHangs([])
    }
  },[dataChuyenHangs,dataDiemgs])
  
  const onEditDiemGd = (id) => {
    var index = _.findIndex(dataChuyenHangs, function (ch) { return ch.ch_id == id.substring(2,id.length) });
    dispatch(preareEditChuyenHang(dataChuyenHangs[index]));
    navigate("/quan-ly-chuyen-hang/them-chuyen-hang");
  }
  const onDeleteDiemGd = (id) => {
    if(confirm("Bạn có chắc chắn rằng muốn xóa chuyến hàng này?")){
      dispatch(deleteChuyenHang(id.substring(2,id.length)));
    }
  }
  
  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listChuyenHang)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách đơn hàng</div>
          <ChuyenHangList  edit={onEditDiemGd} del={onDeleteDiemGd} >{chuyenHangs}</ChuyenHangList>
        </div>
      </div>
    </div>
  )
}
const showLichTrinh = (xuatPhat, diemDen, diemgds) => {
  const diemXuatPhat = diemgds[_.findIndex(diemgds, function (o) { return o.dgd_id == xuatPhat })].dgd_ten;
  const diemKetThuc = diemgds[_.findIndex(diemgds, function (o) { return o.dgd_id == diemDen })].dgd_ten;
  return diemXuatPhat + " - " + diemKetThuc;
}

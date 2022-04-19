import clsx from 'clsx'
import _, { set } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getDonHang } from '../../actions/donhang';
import ThongTinDonHang from '../../components/ThongTinDonHang';
import { dateFormat, numberFormat, showLocaleDonHang } from '../../config';
import { showAddress } from '../../config/handleDvhc';
import { cachLay, nguoiTraPvc, trangThaiDonHang, viTriDonHang } from '../../contants';

import style from './style.module.scss';

export default function ChiTietDonHang() {

  const [searchParams, setSearchParams] = useSearchParams();
  const donHangChiTietData = useSelector(state => state.donHangChiTiet);
  const dataDiemgs = useSelector(state => state.diemgd);
  const dataUsers = useSelector(state => state.user);
  const [donHangChiTiet, setDonHangChiTiet] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    var maDH = searchParams.get('dh');
    dispatch(getDonHang(maDH.substring(2, maDH.length)));
  }, [searchParams])
  useEffect(() => {
    if (!_.isEmpty(donHangChiTietData) && !_.isEmpty(dataUsers) && !_.isEmpty(dataDiemgs)) {
      var newState = {
        'maDonHang': 'DH' + donHangChiTietData.dh_id,
        'khoGui': dataUsers[_.findIndex(dataUsers, function (o) { return o.user_name == donHangChiTietData.dh_nguoitao })].diemgd.dgd_ten,
        'khoPhat': donHangChiTietData.kho_phat.dgd_ten,
        'cachLay': cachLay[donHangChiTietData.dh_tulay],
        'huongDanGiao': donHangChiTietData.dh_huongdangiao,
        'thuHo': numberFormat(donHangChiTietData.dh_thuho),
        'trangThai': trangThaiDonHang[donHangChiTietData.dh_trangthai],
        'vitri': showLocaleDonHang(donHangChiTietData.dh_vitri,dataDiemgs),
        'ngayTao': dateFormat(donHangChiTietData.created_at),
        'nguoiTao': dataUsers[_.findIndex(dataUsers, function (o) { return o.user_name == donHangChiTietData.dh_nguoitao })].nv_ten,

        'tenGui': donHangChiTietData.dh_tengui,
        'sdtGui': donHangChiTietData.dh_sdtgui,
        'diaChiGui': `${donHangChiTietData.dh_diachigui}, ${showAddress(donHangChiTietData.dh_dvhcgui)}`,
        
        'tenNhan': donHangChiTietData.dh_tennhan,
        'sdtNhan': donHangChiTietData.dh_sdtnhan,
        'diaChiNhan': `${donHangChiTietData.dh_diachinhan}, ${showAddress(donHangChiTietData.dh_dvhcnhan)}`,
        
        'mota': donHangChiTietData.dh_mota,
        'trongLuong': numberFormat(donHangChiTietData.dh_trongluong),
        
        'phiVanChuyen': numberFormat(donHangChiTietData.dh_phivanchuyen),
        'nguoiTra': nguoiTraPvc[donHangChiTietData.dh_nguoitra],
        
        'lichSuDonHang': showLichSuDonHang(donHangChiTietData.lich_su_don_hang,dataDiemgs)
      }
      setDonHangChiTiet(newState);
    }
  }, [donHangChiTietData, dataUsers, dataDiemgs])


  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listDonHang)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Chi tiết đơn hàng</div>
          <ThongTinDonHang>{donHangChiTiet}</ThongTinDonHang>
        </div>
      </div>
    </div>
  )
}
const showLichSuDonHang = (lichSuDonHangs,diemgds) => {
  var result = lichSuDonHangs.map((lsdh)=>(<li key={lsdh.lsdh_id}>{dateFormat(lsdh.created_at)} - {showLocaleHistory(lsdh.lsdh_vitri,diemgds)}</li>))
  return (<ul>{result}</ul>);
}

export const showLocaleHistory = (locale, diemgd) => {
  const key = locale.substring(0, 2);
  const id = locale.substring(2, locale.length);
  const index = _.findIndex(diemgd, function (o) { return o.dgd_id == id });
  if (key === 'KH') {
    return 'Đã nhập ' + viTriDonHang[key] + diemgd[index].dgd_ten + ': ' + diemgd[index].dgd_diachi + ', ' + showAddress(diemgd[index].dgd_tinhHuyenXa);
  } else {
    return 'Đang vận chuyển trên ' + viTriDonHang[key] + locale;
  }
}
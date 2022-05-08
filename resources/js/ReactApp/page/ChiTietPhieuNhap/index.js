import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPhieuXuat, importPhieuXuat } from '../../actions/phieuXuat';
import dateFormat from 'dateFormat';

import style from './style.module.scss';
import { trangThaiDonHang, trangThaiPhieuXuat } from '../../contants';
import ThongTinPhieuNhap from '../../components/ThongTinPhieuNhap';
import FormAddDonToNhap from '../../components/FormAddDonToNhap';
import { toastError } from '../../Helper/toastHelper';
import _ from 'lodash';
import { checkDonHang_Error_NotFound, import_Error_isEmpty } from '../../contants/toastMessage';


export default function ChiTietPhieuNhap() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); //get params from url
  const phieuXuatChiTietData = useSelector(state => state.phieuXuatChiTiet); //data phieuXuatChiTiet from store
  const dataUsers = useSelector(state => state.user); //data users from store
  const donHangsData = useSelector(state => state.donHangs); //data donhangs from store
  const auth = JSON.parse(sessionStorage.getItem("AUTHORIZATION"));

  const [phieuXuatChiTiet, setPhieuXuatChiTiet] = useState(''); //data phieuXuatChiTiet to display
  const [donHangs, setDonHangs] = useState([]);
  //components will mount with params
  useEffect(() => {
    //get ma phieu xuat from params
    var maPhieuXuat = searchParams.get('px');
    //call cation get phieu xuat chi tiet
    dispatch(getPhieuXuat(maPhieuXuat.substring(2, maPhieuXuat.length)));
    //components will unmount
  }, [searchParams])

  //when load data success
  useEffect(() => {
    if (!_.isEmpty(phieuXuatChiTietData) && !_.isEmpty(dataUsers) && !_.isEmpty(donHangsData)) {
      /** check status of phieuXuat */
      if (phieuXuatChiTietData.px_trangthai == 1 && phieuXuatChiTietData.px_diemden == auth.user.dgd_id) {
        /** data processing to display */
        //1 list of donhangs
        var donHangs = [];
        phieuXuatChiTietData.phieu_xuat_chi_tiet.forEach(pxct => {
          var donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == pxct.dh_id })];
          donHangs.push(donHangProcess(donHangData));
        });
        //2 set don hang is checked if them were saved
        var maDHsisSave = JSON.parse(localStorage.getItem("Nhap" + searchParams.get('px')));
        if (maDHsisSave) {
          maDHsisSave.forEach(maDH => {
            var index = _.findIndex(donHangs, function (dh) { return dh.maDH === maDH });
            donHangs[index].checked = <input type="checkbox" readOnly checked={true} value="" />
          });
          setDonHangs(maDHsisSave);
        }
        //3 data phieuXuat
        var phieuXuat = {
          'maPhieuXuat': 'PX' + phieuXuatChiTietData.px_id,
          'thoiGianXuat': dateFormat(new Date(phieuXuatChiTietData.px_thoigian), "dd/mm/yyyy HH:MM"),
          'diemDen': `${phieuXuatChiTietData.diem_den.dgd_ten} (${phieuXuatChiTietData.diem_den.dgd_diachi})`,
          'chuyenHang': `CH${phieuXuatChiTietData.chuyen_hang.ch_id} | ${phieuXuatChiTietData.chuyen_hang.ch_tentaixe} | ${phieuXuatChiTietData.chuyen_hang.ch_bks}`,
          'nguoiXuat': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == phieuXuatChiTietData.px_nguoixuat })].nv_ten,
          'trangThai': trangThaiPhieuXuat[phieuXuatChiTietData.px_trangthai],
          'donHangs': donHangs
        }
        //4 set phieuXuatChiTiet to display
        setPhieuXuatChiTiet(phieuXuat);
      } else {
        navigate(-1);
      }
    }
  }, [phieuXuatChiTietData, dataUsers, donHangsData])

  //handleAddDonToNhap
  const handleAddDonToXuat = (maDH) => {
    var index = _.findIndex(phieuXuatChiTiet.donHangs, function (dh) { return dh.maDH === maDH });
    if (index == -1) {
      toastError(checkDonHang_Error_NotFound);
    } else {
      setDonHangs(Array.from(new Set([...donHangs, maDH])));
      var donHangsData = phieuXuatChiTiet.donHangs;
      donHangsData[index].checked = <input type="checkbox" readOnly checked={true} value="" />
      setPhieuXuatChiTiet({ ...phieuXuatChiTiet, 'donHangs': donHangsData });
    }
  }
  //When donHangs is change =>save list maDH to local storage
  useEffect(() => {
    if (!_.isEmpty(donHangs)) {
      localStorage.setItem("Nhap" + searchParams.get('px'), JSON.stringify(donHangs));
    }
  }, [donHangs])

  //handleImport 
  const handleImport = () => {
    //check donHangs is checked
    if (!_.isEmpty(donHangs)) {
      //list donHangs is not checked
      var notChecked = [];
      phieuXuatChiTiet.donHangs.forEach(dh => {
        if (!dh.checked.props.checked) notChecked.push(dh.maDH);
      });
      //all is checked
      var importDHs = [];
      donHangs.forEach(maDH => {
        var dhKhoPhat = donHangsData[_.findIndex(donHangsData, function (dh) { return dh.dh_id == maDH.substring(2, maDH.length) })].dh_khophat;
        importDHs.push(
          {
            'maDH': maDH.substring(2, maDH.length),
            'dh_trangthai': dhKhoPhat == auth.user.dgd_id ? 3 : 2
          }
        );
      });
      if (_.isEmpty(notChecked)) {
        dispatch(importPhieuXuat(importDHs, phieuXuatChiTietData.px_id, auth.user.dgd_id));
      } else { // not enough donHangs
        if (confirm(`Đơn hàng "${notChecked}" chưa được kiểm tra. Chỉ nhập những đơn hàng được kiểm tra?`)) {
          dispatch(importPhieuXuat(importDHs, phieuXuatChiTietData.px_id, auth.user.dgd_id));
        }
      }
    } else {
      toastError(import_Error_isEmpty);
    }
  }

  return (
    <div className={clsx("col-12 col-m-12 col-s-12")}>
      <div className={clsx("container-fluid", style.chiTietPhieuNhap)}>
        <div className={clsx("row", style.title)}>
          <div className={clsx("col-6 col-m-16 col-s-12")}>Thông tin chi tiết phiếu xuất cần nhập</div>
          <div className={clsx("col-6 col-m-16 col-s-12")}>
            <FormAddDonToNhap onSubmit={handleAddDonToXuat}></FormAddDonToNhap>
          </div>
        </div>
        <div className={clsx("row")}>
          <ThongTinPhieuNhap>{phieuXuatChiTiet}</ThongTinPhieuNhap>
        </div>
        <div className={clsx("row", style.action)}>
          <div className={clsx("col-12 col-m-12 col-s-12")}>
            <button onClick={e => handleImport()} type="button" id="btnImport" className="btn btn-success">Nhập kho</button>
            {/* <button onClick={e=>onEditPhieuXuat(phieuXuatChiTiet.maPhieuXuat)} type="button" id="" className="btn btn-info">Chỉnh sửa</button> */}
            {/* <button onClick={e=>handleDetail()} type="button" id="" className="btn btn-danger">Xóa phiếu xuất</button> */}
            {/* <button onClick={e => handleExit()} type="button" id="" className="btn btn-warning">Trở về</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
//processing data about donHang
const donHangProcess = (donHangData) => {
  return {
    maDH: "DH" + donHangData.dh_id,
    moTa: donHangData.dh_mota,
    khoPhat: donHangData.kho_phat.dgd_ten,
    trangThai: trangThaiDonHang[donHangData.dh_trangthai],
    checked: <input type="checkbox" readOnly checked={false} value="" />
  };
}
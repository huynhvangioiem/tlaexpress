import clsx from "clsx";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import dateFormat from 'dateFormat';
import _ from "lodash";

import { AUTHORIZATION, trangThaiDonHang, trangThaiPhieuXuat } from '../../contants';
import style from './style.module.scss';
import { toastError } from '../../Helper/toastHelper';
import { addDonHang_Error_Cant, addDonHang_Error_NotFound, export_Error_DonHangEmpty } from "../../contants/toastMessage";
import { exportPhieuXuat, getPhieuXuat } from '../../actions/phieuXuat';

import ThongTinPhieuXuat from '../../components/ThongTinPhieuXuat';
import FormAddDonToXuat from "../../components/FormAddDonToXuat";


export default function ChiTietPhieuXuat() {
  //definitions and get data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); //get params from url
  const phieuXuatChiTietData = useSelector(state => state.phieuXuatChiTiet); //data phieuXuatChiTiet from store
  const dataUsers = useSelector(state => state.user); //data users from store
  const donHangsData = useSelector(state => state.donHangs); //data donhangs from store

  const userLogin = JSON.parse(sessionStorage.getItem(AUTHORIZATION)).user; //data about user login
  const maDHsAddedData = JSON.parse(localStorage.getItem("maDHsAdded")); //data about ma dhs added from localstorage

  const [phieuXuatChiTiet, setPhieuXuatChiTiet] = useState(''); //data phieuXuatChiTiet to display
  const [idDHs, setIdDHs] = useState([]); //list of maDon added
  const [donHangs, setDonHangs] = useState([]); //list of donHangs to display
  const [displayAdd, setDisplayAdd] = useState(false); // status of displayAdd


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
      /** data processing to display */
      var donHangDisplay = [];
      var phieuXuat = {
        'maPhieuXuat': 'PX' + phieuXuatChiTietData.px_id,
        'thoiGianXuat': dateFormat(new Date(phieuXuatChiTietData.px_thoigian), "dd/mm/yyyy HH:MM"),
        'diemDen': `${phieuXuatChiTietData.diem_den.dgd_ten} (${phieuXuatChiTietData.diem_den.dgd_diachi})`,
        'chuyenHang': `CH${phieuXuatChiTietData.chuyen_hang.ch_id} | ${phieuXuatChiTietData.chuyen_hang.ch_tentaixe} | ${phieuXuatChiTietData.chuyen_hang.ch_bks}`,
        'nguoiXuat': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == phieuXuatChiTietData.px_nguoixuat })].nv_ten,
        'trangThai': trangThaiPhieuXuat[phieuXuatChiTietData.px_trangthai],
      }
      /** Check status of phieuXuat*/
      switch (phieuXuatChiTietData.px_trangthai) {
        // in case status is 0
        case 0:
          //1. Check px_nguoixuat = userLogin
          if (phieuXuatChiTietData.px_nguoixuat === userLogin.user_name) {
            // 1.1 display form add
            setDisplayAdd(true);
            //1.2 check maDHsAddedData of this phieuXuat is exist => load and set data
            if (maDHsAddedData) if (maDHsAddedData[phieuXuat.maPhieuXuat]) {
              //1.2.1 set IdDHs
              setIdDHs(maDHsAddedData[phieuXuat.maPhieuXuat]);

              //1.2.2 set donHangs
              maDHsAddedData[phieuXuat.maPhieuXuat].forEach(maDon => {
                var donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == maDon })];
                donHangDisplay.push(donHangProcess(donHangData));
              })
              setDonHangs(donHangDisplay);
            }
          }
          break;
        case 1:
        case 2:
          phieuXuatChiTietData.phieu_xuat_chi_tiet.forEach(donHangData => {
            var donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == donHangData.dh_id })];
            donHangDisplay.push(donHangProcess(donHangData));
          });
          setDonHangs(donHangDisplay);
        default:
          break;
      }
      /** Set phieuXuatChiTiet to display */
      phieuXuat = { ...phieuXuat, 'donHangs': donHangDisplay };
      setPhieuXuatChiTiet(phieuXuat);

      /** Component unmount */
      return () => {
        setDisplayAdd(false);
        setIdDHs([]);
        setDonHangs([]);
      }
    }
  }, [phieuXuatChiTietData, dataUsers, donHangsData])

  //handle add donHang to phieuXuatChiTiet
  const handleAddDonToXuat = (maDH) => {
    //get idDH and donHang
    let idDH = maDH.substring(2, maDH.length);
    let donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == idDH })];

    //check donHang is true
    if (!donHangData || donHangData.dh_vitri !== "KH" + userLogin.dgd_id) // donHang not exits and dh_vitri not in here.
      toastError(addDonHang_Error_NotFound);
    else if (donHangData.dh_trangthai > 2) // donHang da den dich hoac sau khi den dich
      toastError(addDonHang_Error_Cant);
    else {
      //set distinct idDHS
      var distinctIdDhs = Array.from(new Set([...idDHs, idDH]));
      setIdDHs(distinctIdDhs);

      saveDhLocalStorage(phieuXuatChiTiet.maPhieuXuat, distinctIdDhs, maDHsAddedData);

      //add donHang to donHangs
      const donHang = donHangProcess(donHangData);
      var isExisting = false;
      for (let i = 0; i < donHangs.length; i++)
        if (donHangs[i].maDH == donHang.maDH) {
          isExisting = true;
          break;
        }
      if (!isExisting) setDonHangs([...donHangs, donHang]);
    }
  }

  //set data processing about donHangs and set phieuXuatChiTiet.donHangs when donHangs change
  useEffect(() => {
    if (!_.isEmpty(donHangs)) {
      setPhieuXuatChiTiet({
        ...phieuXuatChiTiet,
        donHangs: donHangs
      });
    } else {
      setPhieuXuatChiTiet({
        ...phieuXuatChiTiet,
        donHangs: []
      });
    }
  }, [donHangs])

  //handle delete donHang is added
  const handleDelAdded = (maDH) => {
    const idDH = maDH.substring(2, maDH.length);
    const index = _.findIndex(idDHs, function (o) { return o == idDH });
    setIdDHs([...idDHs.slice(0, index), ...idDHs.slice(index + 1)]);
    setDonHangs([...donHangs.slice(0, index), ...donHangs.slice(index + 1)]);
    saveDhLocalStorage(phieuXuatChiTiet.maPhieuXuat, [...idDHs.slice(0, index), ...idDHs.slice(index + 1)], maDHsAddedData);
  }

  //handle detail donHang is added
  const handleDetail = (maDH) => {
    navigate("/quan-ly-van-don/chi-tiet-don-hang?dh=" + maDH);
  }

  //handle export phieu xuat
  const handleExport = () => {
    if (!_.isEmpty(idDHs)) {
      dispatch(exportPhieuXuat(idDHs, phieuXuatChiTietData.px_id));
      // setIdDHs("");
      // setDonHangs("");
      delete maDHsAddedData[phieuXuatChiTiet.maPhieuXuat];
      if (_.isEmpty(maDHsAddedData)) {
        localStorage.removeItem("maDHsAdded");
      } else {
        localStorage.setItem("maDHsAdded", JSON.stringify(maDHsAddedData));
      }
    }else toastError(export_Error_DonHangEmpty);
  }

  //handle exit
  const handleExit = () => {
    navigate(-1);
  }


  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.chiTietPhieuXuat)}>
        <div className={clsx("row", style.title)}>
          <div className={clsx("col-6 col-m-6 col-s-12")}>Thông tin chi tiết phiếu xuất</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            {displayAdd ? <FormAddDonToXuat onSubmit={handleAddDonToXuat}></FormAddDonToXuat> : ""}
          </div>
        </div>
        <div className={clsx("row")}>
          <ThongTinPhieuXuat del={handleDelAdded} detail={handleDetail}>{phieuXuatChiTiet}</ThongTinPhieuXuat>
        </div>
        <div className={clsx("row", style.action)}>
          <div className={clsx("col-12 col-m-12 col-s-12")}>
            {displayAdd ? <button onClick={e => handleExport()} type="button" id="btnExport" className="btn btn-success">Xuất kho</button> : ""}
            {/* <button onClick={e=>onEditPhieuXuat(phieuXuatChiTiet.maPhieuXuat)} type="button" id="" className="btn btn-info">Chỉnh sửa</button> */}
            {/* <button onClick={e=>handleDetail()} type="button" id="" className="btn btn-danger">Xóa phiếu xuất</button> */}
            <button onClick={e => handleExit()} type="button" id="" className="btn btn-warning">Trở về</button>
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
  };
}
//save data to local storage
const saveDhLocalStorage = (maPx, idDHs, idDhAdded) => {
  if (idDhAdded)
    var value = {
      ...idDhAdded,
      [maPx]: idDHs
    };
  else value = { [maPx]: idDHs }
  localStorage.setItem("maDHsAdded", JSON.stringify(value));
}
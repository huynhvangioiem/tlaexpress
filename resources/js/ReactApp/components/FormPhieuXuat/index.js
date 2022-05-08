import clsx from 'clsx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearValidate, notIs, Required, Validator } from '../../config/Validator';
import style from './style.module.scss';
import dateFormat from "dateformat";
import { AUTHORIZATION } from '../../contants';
import { validate_diemDen_isNot_Msg } from '../../contants/toastMessage';

export default function FormPhieuXuat(props) {
  //definitions and getData from store
  const navigate = useNavigate();
  const diemgds = useSelector(state => state.diemgd);
  const chuyenHangs = useSelector(state => state.chuyenHangs);
  const auth = JSON.parse(sessionStorage.getItem(AUTHORIZATION));

  //receive from the props  
  const { phieuXuatEditting, onSubmit, onCancleEdit, onEdit } = props;

  //states
  const [thoiGian, setThoiGian] = useState("");
  const [diemDen, setDiemDen] = useState("");
  const [chuyenHang, setChuyenHang] = useState("");

  //validate rules
  const validateDatas = [
    { "objName": "#thoiGian", "rules": [{ func: Required }] },
    { "objName": "#diemDen", "rules": [{ func: Required }, { func: notIs, checkValue: auth.user.dgd_id, message: validate_diemDen_isNot_Msg }] },
    { "objName": "#chuyenHang", "rules": [{ func: Required }] },
  ]

  //handle edit
  useEffect(() => {
    if (!_.isEmpty(phieuXuatEditting)) {
      setThoiGian(dateFormat(new Date(phieuXuatEditting.px_thoigian), "yyyy-mm-dd'T'HH:MM"));
      setDiemDen(phieuXuatEditting.px_diemden);
      setChuyenHang(phieuXuatEditting.px_chuyenhang);
      document.getElementById("formTitle").innerText = "Chỉnh sữa thông tin phiếu xuất";
      document.getElementById("btnSubmit").innerText = "Cập nhật";
      document.getElementById("btnReset").innerText = "Hủy";
    }
    return () => onCancleEdit();
  }, [])

  /**handle functions */
  const handleSubmit = (e) => {
    e.preventDefault();
    //validate
    if (Validator(validateDatas)) {
      var dataPhieuXuat = {
        'px_thoigian': thoiGian,
        'px_diemden': diemDen,
        'px_chuyenhang': chuyenHang,
        'px_nguoixuat': auth.user.user_name
      }
      if (_.isEmpty(phieuXuatEditting)) onSubmit(dataPhieuXuat);
      else onEdit(dataPhieuXuat, phieuXuatEditting.px_id);
    }
  }

  //handle Reset
  const handleReset = () => {
    if (!_.isEmpty(phieuXuatEditting)) {
      onCancleEdit();
      navigate(-1);
    } else {
      setThoiGian("");
      setDiemDen("");
      setChuyenHang("");
    }
  }


  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset()} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div id="formTitle" className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Thông tin phiếu xuất</div>
        </div>
        {/* thoi gian */}
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="thoiGian" >Thời gian xuất dự kiến:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="datetime-local" className="form-control" name="thoiGian" id="thoiGian"
              value={thoiGian}
              onChange={e => setThoiGian(e.target.value)}
              onInput={e => clearValidate("#thoiGian")}
              onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        {/* diem den */}
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diemDen" >Xuất đến kho:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="diemDen" id="diemDen" className="form-control"
              value={diemDen}
              onChange={e => setDiemDen(e.target.value)}
              onInput={e => clearValidate("#diemDen")}
              onBlur={e => Validator([validateDatas[1]])}
            >
              <option value="">Vui lòng chọn kho đến</option>
              {showPlaces(diemgds)}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        {/* chuyenHang */}
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="chuyenHang" >Chuyến hàng:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="chuyenHang" id="chuyenHang" className="form-control"
              value={chuyenHang}
              onChange={e => setChuyenHang(e.target.value)}
              onInput={e => clearValidate("#chuyenHang")}
              onBlur={e => Validator([validateDatas[2]])}
            >
              <option value="">Vui lòng chọn chuyến hàng vận chuyển</option>
              {showChuyenHangs(chuyenHangs, diemgds)}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>

        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" id="btnSubmit" className="btn btn-success">Tạo phiếu xuất</button>
            <button type="reset" id="btnReset" className="btn btn-warning">Nhập lại</button>
          </div>
        </div>
      </form>
    </div>
  )
}
//show list of options about diemgds
const showPlaces = (places) => {
  var results = places.map((place, index) => (<option key={index} value={place.dgd_id}>{place.dgd_ten}</option>))
  return (
    <>{results}</>
  )
}
//show list of options about chuyenHang
const showChuyenHangs = (chuyenHangs, diemgds) => {
  var result = chuyenHangs.map((chuyenHang, index) => {
    // check status of chuyenHang and return option if status is 1 or 0
    if (chuyenHang.ch_trangthai == 0 || chuyenHang.ch_trangthai == 1)
      return showOptionChuyenHang(chuyenHang, diemgds);
  })
  return (
    <>{result}</>
  )
}
//show a option about chuyenHang
const showOptionChuyenHang = (chuyenHang, diemgds) => {
  var maCH = "CH" + chuyenHang.ch_id;
  var taiXe = chuyenHang.ch_tentaixe;
  var xuatPhat = diemgds[_.findIndex(diemgds, function (dgd) { return dgd.dgd_id == chuyenHang.lich_trinh[0].dgd_id })].dgd_ten;
  var diemDen = diemgds[_.findIndex(diemgds, function (dgd) { return dgd.dgd_id == chuyenHang.lich_trinh[1].dgd_id })].dgd_ten;
  var thoiGianXuatPhat = dateFormat(new Date(chuyenHang.lich_trinh[0].lt_thoigian), "dd/mm/yyyy HH:MM");
  var thoiGianKetThuc = dateFormat(new Date(chuyenHang.lich_trinh[1].lt_thoigian), "dd/mm/yyyy HH:MM");
  return (<option key={chuyenHang.ch_id} value={chuyenHang.ch_id}>
    {maCH + " | " + xuatPhat + " - " + diemDen + " | " + thoiGianXuatPhat + " - " + thoiGianKetThuc + " | " + taiXe}
  </option>);
}
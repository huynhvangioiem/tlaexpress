import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearValidate, Max, notIs, Required, Validator } from '../../config/Validator';
import style from './style.module.scss';
import dateFormat, { masks } from "dateformat";

export default function FormAddChuyenHang(props) {
  const { chuyenHangEditting, onSubmit, onCancleEdit, onEdit } = props;
  const diemgds = useSelector(state => state.diemgd);

  const navigate = useNavigate();

  const [tenTaiXe, setTenTaiXe] = useState('');
  const [bks, setBks] = useState('');
  const [xuatPhat, setXuatPhat] = useState('');
  const [diemDen, setDiemDen] = useState('');
  const [batDau, setBatDau] = useState('');
  const [ketThuc, setKetThuc] = useState('');

  const validateDatas = [
    { "objName": "#tenTaiXe", "rules": [{ "func": Required }, { "func": Max, checkValue: 50 }] },
    { "objName": "#bks", "rules": [{ "func": Required }] },
    { "objName": "#xuatPhat", "rules": [{ "func": Required }] },
    { "objName": "#batDau", "rules": [{ "func": Required }] },
    { "objName": "#diemDen", "rules": [{ "func": Required }, { "func": notIs, checkValue: xuatPhat, message: "Điểm kết thúc không được trùng với điểm xuất phát" }] },
    { "objName": "#ketThuc", "rules": [{ "func": Required }] },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validator(validateDatas)) {
      const chuyenHang = {
        'ch_tentaixe': tenTaiXe,
        'ch_bks': bks,
        'dgd_xuatPhat': xuatPhat,
        'batDau': batDau,
        'diemDen': diemDen,
        'ketThuc': ketThuc,
      }
      if(_.isEmpty(chuyenHangEditting)) onSubmit(chuyenHang);
      else onEdit(chuyenHang,chuyenHangEditting.ch_id);
    }
  }

  const handleReset = () => {
    if (!_.isEmpty(chuyenHangEditting)) {
      onCancleEdit();
      navigate(-1);
    } else {
      setTenTaiXe('');
      setBks('');
      setXuatPhat('');
      setDiemDen('');
      setBatDau('');
      setKetThuc('');
    }
  }

  useEffect(() => {
    if (!_.isEmpty(chuyenHangEditting)) {
      setTenTaiXe(chuyenHangEditting.ch_tentaixe);
      setBks(chuyenHangEditting.ch_bks);
      setXuatPhat(chuyenHangEditting.lich_trinh[0].dgd_id);
      setDiemDen(chuyenHangEditting.lich_trinh[1].dgd_id);
      var date = new Date(chuyenHangEditting.lich_trinh[0].lt_thoigian);
      setBatDau(dateFormat(date, "yyyy-mm-dd'T'HH:MM"));
      var date = new Date(chuyenHangEditting.lich_trinh[1].lt_thoigian);
      setKetThuc(dateFormat(date, "yyyy-mm-dd'T'HH:MM"));
      document.getElementById("formTitle").innerText = "Chỉnh sữa thông tin chuyến hàng";
      document.getElementById("btnSubmit").innerText = "Cập nhật";
      document.getElementById("btnReset").innerText = "Hủy";
    }
    return () => onCancleEdit();
  }, [])

  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset()} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div id="formTitle" className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Thông tin chuyến hàng</div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tenTaiXe" >Tên tài xế:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="tenTaiXe" id="tenTaiXe" placeholder="Nhập vào tên tài xế"
              value={tenTaiXe}
              onChange={e => setTenTaiXe(e.target.value)}
              onInput={e => clearValidate("#tenTaiXe")}

              onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="bks" >Biển kiểm soát:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="bks" id="bks" placeholder="Nhập vào biển kiểm soát"
              value={bks}
              onChange={e => setBks(e.target.value)}
              onInput={e => clearValidate("#bks")}

              onBlur={e => Validator([validateDatas[1]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="xuatPhat" >Điểm xuất phát:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="xuatPhat" id="xuatPhat" className="form-control"
              value={xuatPhat}
              onChange={e => setXuatPhat(e.target.value)}
              onInput={e => clearValidate("#xuatPhat")}
              onBlur={e => Validator([validateDatas[2]])}
            >
              <option value="">Vui lòng chọn điểm xuất phát</option>
              {showPlaces(diemgds)}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="batDau" >Thời gian xuất phát:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="datetime-local" className="form-control" name="batDau" id="batDau"
              value={batDau}
              onChange={e => setBatDau(e.target.value)}
              onInput={e => clearValidate("#batDau")}

              onBlur={e => Validator([validateDatas[3]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diemDen" >Điểm Kết Thúc:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="diemDen" id="diemDen" className="form-control"
              value={diemDen}
              onChange={e => setDiemDen(e.target.value)}
              onInput={e => clearValidate("#diemDen")}
              onBlur={e => Validator([validateDatas[4]])}
            >
              <option value="">Vui lòng chọn điểm kết thúc</option>
              {showPlaces(diemgds)}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="ketThuc" >Thời gian kết thúc:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="datetime-local" className="form-control" name="ketThuc" id="ketThuc"
              value={ketThuc}
              onChange={e => setKetThuc(e.target.value)}
              onInput={e => clearValidate("#ketThuc")}
              onBlur={e => Validator([validateDatas[5]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>

        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" id="btnSubmit" className="btn btn-success">Tạo chuyến</button>
            <button type="reset" id="btnReset" className="btn btn-warning">Nhập lại</button>
          </div>
        </div>
      </form>
    </div>
  )
}
const showPlaces = (places) => {
  var results = places.map((place, index) => (<option key={index} value={place.dgd_id}>{place.dgd_ten}</option>))
  return (
    <>{results}</>
  )
}
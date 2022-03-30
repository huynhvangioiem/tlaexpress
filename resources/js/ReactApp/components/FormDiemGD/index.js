import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import style from './style.module.scss';
import { showListOfProvince, showListOfDistricts, showListOfWards } from '../../config/handleDvhc';
import { clearValidate, Required, Validator } from '../../config/Validator';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function FormDiemGD(props) {
  
  const { dgdEditting, onSubmit, onCancleEdit, onEdit } = props;
  const navigate = useNavigate();

  const [dgdTen, setDgdTen] = useState('');
  const [dgdTinh, setDgdTinh] = useState('');
  const [dgdHuyen, setDgdHuyen] = useState('');
  const [dgdXa, setDgdXa] = useState('');
  const [dgdDiachi, setDgdDiachi] = useState('');
  const [dgdMota, setDgdMota] = useState('');


  const validateDatas = [
    { "objName": "#dgdTen", "rules": [{ "func": Required }] },
    { "objName": "#dgdTinh", "rules": [{ "func": Required }] },
    { "objName": "#dgdHuyen", "rules": [{ "func": Required }] },
    { "objName": "#dgdXa", "rules": [{ "func": Required }] },
    { "objName": "#dgdDiaChi", "rules": [{ "func": Required }] },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validator(validateDatas)) {
      const diemgsData = {
        dgd_ten: dgdTen,
        dgd_tinhHuyenXa: `${dgdTinh}-${dgdHuyen}-${dgdXa}`,
        dgd_diachi: dgdDiachi,
        dgd_mota: dgdMota ? dgdMota : "  ",
      }
      if(_.isEmpty(dgdEditting)){
        onSubmit(diemgsData);
      }else{
        onEdit(diemgsData, dgdEditting.dgd_id);
      }
    }
  }

  const handleReset = (e) => {
    if(!_.isEmpty(dgdEditting)){
      onCancleEdit();
      navigate(-1);
    }
    setDgdTen("");
    setDgdTinh("");
    setDgdHuyen("");
    setDgdXa("");
    setDgdDiachi("");
    setDgdMota("");
  }

  useEffect(() => {
    if (!_.isEmpty(dgdEditting)) {
      setDgdTen(dgdEditting.dgd_ten);
      setDgdTinh(dgdEditting.dgd_tinhHuyenXa.split('-')[0]);
      setDgdHuyen(dgdEditting.dgd_tinhHuyenXa.split('-')[1]);
      setDgdXa(dgdEditting.dgd_tinhHuyenXa.split('-')[2]);
      setDgdDiachi(dgdEditting.dgd_diachi);
      setDgdMota(dgdEditting.dgd_mota ? dgdEditting.dgd_mota : "");
      document.getElementById("formTitle").innerText = "Chỉnh sữa điểm giao dịch";
      document.getElementById("btnSubmit").innerText = "Cập nhật";
      document.getElementById("btnReset").innerText = "Hủy";
    }
  },[])

  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset(e)} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div id="formTitle" className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Thông tin điểm giao dịch</div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdTen" >Tên điểm giao dịch:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="dgdTen" id="dgdTen" placeholder="Nhập vào tên điểm giao dịch"
              value={dgdTen}
              onChange={e => setDgdTen(e.target.value)}
              onInput={e => clearValidate("#dgdTen")}
              onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdTinh">Tỉnh:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="dgdTinh" id="dgdTinh" className="form-control"
              value={dgdTinh}
              onChange={e => { setDgdTinh(e.target.value); setDgdHuyen(""); setDgdXa("") }}
              onInput={e => clearValidate("#dgdTinh")}
              onBlur={e => Validator([validateDatas[1]])}
            >
              <option value="">--Chọn tỉnh thành--</option>
              <ShowTinh />
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdHuyen">Huyện:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="dgdHuyen" id="dgdHuyen" className="form-control"
              value={dgdHuyen}
              onChange={e => { setDgdHuyen(e.target.value); setDgdXa("") }}
              onInput={e => clearValidate("#dgdHuyen")}
              onBlur={e => Validator([validateDatas[2]])}
            >
              <option value="">--Chọn quận/huyện--</option>
              {dgdTinh ? <ShowHuyen provinceCode={dgdTinh} /> : ""}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdXa">Xã:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="dgdXa" id="dgdXa" className="form-control"
              value={dgdXa}
              onChange={e => setDgdXa(e.target.value)}
              onInput={e => clearValidate("#dgdXa")}
              onBlur={e => Validator([validateDatas[3]])}
            >
              <option value="">--Chọn xã/phường--</option>
              {dgdTinh && dgdHuyen ? <ShowXa provinceCode={dgdTinh} districtCode={dgdHuyen} /> : ""}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdDiaChi">Địa chỉ cụ thể:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="dgdDiaChi" id="dgdDiaChi" placeholder="Nhập vào địa chị cụ thể như: số nhà, tên đường..."
              value={dgdDiachi}
              onChange={e => setDgdDiachi(e.target.value)}
              onInput={e => clearValidate("#dgdDiaChi")}
              onBlur={e => Validator([validateDatas[4]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dgdMoTa">Mô tả:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="dgdMoTa" id="dgdMoTa" placeholder="Mô tả điểm giao dịch"
              value={dgdMota}
              onChange={e => setDgdMota(e.target.value)}
            // onInput={e => clearValidate("#userName")}
            // onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>

        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" id="btnSubmit" className="btn btn-success">Thêm điểm giao dịch</button>
            <button type="reset" id="btnReset" className="btn btn-warning">Nhập lại</button>
          </div>
        </div>
      </form>
    </div>
  )
}


const ShowTinh = () => {
  const Tinhs = showListOfProvince();
  var result = Tinhs.map((tinh, index) => (<option key={index} value={tinh.code}>{tinh.name}</option>))
  return (<>{result}</>)
}
const ShowHuyen = ({ provinceCode }) => {
  const Huyens = showListOfDistricts(provinceCode);
  var result = Huyens.map((huyen, index) => (<option key={index} value={huyen.code}>{huyen.name}</option>))
  return (<>{result}</>)
}

const ShowXa = ({ provinceCode, districtCode }) => {
  const Xas = showListOfWards(provinceCode, districtCode);
  var result = Xas.map((xa, index) => (<option key={index} value={xa.code}>{xa.name}</option>))
  return (<>{result}</>)
}
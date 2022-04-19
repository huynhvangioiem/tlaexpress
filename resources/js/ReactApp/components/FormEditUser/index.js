import clsx from 'clsx'
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearValidate, Max, Phonenumber, Required, Validator } from '../../config/Validator';

import style from './style.module.scss'

export default function FormEditUser(props) {

  const navigate = useNavigate();
  const { edit, userData, cancleEdit } = props;

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [place, setPlace] = useState('');
  const [dob, setDob] = useState('');
  const diemgds = useSelector(state => state.diemgd);

  useEffect(() => {
    setUserName(userData.user_name);
    setFullName(userData.nv_ten);
    setPhone(userData.nv_sdt);
    setJob(userData.nv_chucvu);
    setPlace(userData.dgd_id);
    setDob(userData.nv_ngaysinh);
    return () => {
      setUserName('');
      setFullName('');
      setPhone('');
      setJob('');
      setPlace('');
      setDob('');
    }
  }, [])


  const validateDatas = [
    { "objName": "#userName", "rules": [{ "func": Required, checkValue: null, message: null }, { "func": Phonenumber }] },
    { "objName": "#fullName", "rules": [{ "func": Required }, { "func": Max, checkValue: 50 }] },
    { "objName": "#phone", "rules": [{ "func": Required }, { "func": Phonenumber }] },
    { "objName": "#job", "rules": [{ "func": Required }] },
    { "objName": "#place", "rules": [{ "func": Required }] },
    { "objName": "#dob", "rules": [{ "func": Required }] },
  ]

  const showPlaces = (places) => {
    var results = places.map((place, index) => (<option key={index} value={place.dgd_id}>{place.dgd_ten}</option>))
    return (
      <>{results}</>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate
    if (Validator(validateDatas)) {
      //create info user
      const newUserInfo = {
        "nv_ten": fullName,
        "nv_sdt": phone,
        "nv_ngaysinh": dob,
        "nv_chucvu": job,
        "dgd_id": place
      };
      edit(newUserInfo, userData.nv_id);
    }
  }
  const handleReset = () => {
    navigate(-1);
    cancleEdit();
  }
  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset()} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Cập nhật thông tin tài khoản</div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="userName">Tên tài khoản:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="userName" id="userName" placeholder="Vui lòng nhập vào số điện thoại" disabled
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onInput={e => clearValidate("#userName")}
              onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="fullName">Họ tên nhân viên:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="fullName" id="fullName" placeholder="Nhập vào họ tên người được cấp tài khoản"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              onInput={e => clearValidate("#fullName")}
              onBlur={e => Validator([validateDatas[1]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="phone">Số điện thoại:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="tel" className="form-control" name="phone" id="phone" placeholder="Số điện thoại liên lạc của nhân viên"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onInput={e => clearValidate("#phone")}
              onBlur={e => Validator([validateDatas[2]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="job">Chức vụ:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="job" id="job" className="form-control"
              value={job}
              onChange={e => setJob(e.target.value)}
              onInput={e => clearValidate("#job")}
              onBlur={e => Validator([validateDatas[3]])}
            >
              <option value="">Vui lòng chọn chức vụ</option>
              <option value="1">Admin</option>
              <option value="2">Điều phối viên</option>
              <option value="3">Nhân viên giao dịch</option>
              <option value="4">Nhân viên giao nhận</option>
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="place">Nơi làm việc:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <select name="place" id="place" className="form-control"
              value={place}
              onChange={e => setPlace(e.target.value)}
              onInput={e => clearValidate("#place")}
              onBlur={e => Validator([validateDatas[4]])}
            >
              <option value="">Vui lòng chọn nơi làm việc</option>
              {showPlaces(diemgds)}
            </select>
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dob">Ngày sinh:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="date" className="form-control" name="dob" id="dob" placeholder=""
              value={dob}
              onChange={e => setDob(e.target.value)}
              onInput={e => clearValidate("#dob")}
              onBlur={e => Validator([validateDatas[5]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" className="btn btn-success">Cập nhật tài khoản</button>
            <button type="reset" className="btn btn-warning">Hủy</button>
          </div>
        </div>
      </form>
    </div>
  )
}

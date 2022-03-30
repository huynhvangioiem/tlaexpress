import clsx from 'clsx'
import { max } from 'lodash';
import React, { useState } from 'react'
import { clearValidate, Comfirm, Max, Password, Phonenumber, Required, Validator } from '../../config/Validator';

import style from './style.module.scss'

export default function FormUser(props) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('')
  const [checkPass, setCheckPass] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [dob, setDob] = useState('');



  const validateDatas = [
    { "objName": "#userName", "rules": [{ "func": Required, checkValue: null, message: null }, { "func": Phonenumber }] },
    { "objName": "#password", "rules": [{ "func": Required }, { "func": Password }] },
    { "objName": "#checkPass", "rules": [{ "func": Comfirm, checkValue: password, message: "Xác nhận mật khẩu chưa đúng!" }] },
    { "objName": "#fullName", "rules": [{ "func": Required }, { "func": Max, checkValue: 50 }] },
    { "objName": "#phone", "rules": [{ "func": Required }, { "func": Phonenumber }] },
    { "objName": "#job", "rules": [{ "func": Required }] },
    { "objName": "#dob", "rules": [{ "func": Required }] },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate
    if (Validator(validateDatas)) {
      //create info user
      const newUserInfo = {
        "user_name": userName,
        "password": password,
        "nv_ten": fullName,
        "nv_sdt": phone,
        "nv_ngaysinh": dob,
        "nv_chucvu": job
      };
      //submit data to Page Add
      props.onSubmit(newUserInfo);
    }
  }

  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Thông tin tài khoản</div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="userName">Tên tài khoản:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="text" className="form-control" name="userName" id="userName" placeholder="Vui lòng nhập vào số điện thoại"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onInput={e => clearValidate("#userName")}
              onBlur={e => Validator([validateDatas[0]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="password">Mật khẩu:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="password" className="form-control" name="password" id="password" placeholder="Nhập vào mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onInput={e => clearValidate("#password")}
              onBlur={e => Validator([validateDatas[1]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="checkPass">Xác nhận mật khẩu:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="password" className="form-control" name="checkPass" id="checkPass" placeholder="Nhập lại mật khẩu"
              value={checkPass}
              onChange={e => setCheckPass(e.target.value)}
              onInput={e => clearValidate("#checkPass")}
              onBlur={e => Validator([validateDatas[2]])}
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
              onBlur={e => Validator([validateDatas[3]])}
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
              onBlur={e => Validator([validateDatas[4]])}
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
              onBlur={e => Validator([validateDatas[5]])}
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
          <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="dob">Ngày sinh:</label></div>
          <div className="col-12 col-m-12 col-s-12">
            <input type="date" className="form-control" name="dob" id="dob" placeholder=""
              value={dob}
              onChange={e => setDob(e.target.value)}
              onInput={e => clearValidate("#dob")}
              onBlur={e => Validator([validateDatas[6]])}
            />
          </div>
          <div className="col-12 col-m-12 col-s-12 form-message"></div>
        </div>
        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" className="btn btn-success">Tạo tài khoản</button>
            <button type="reset" className="btn btn-warning">Nhập lại</button>
          </div>
        </div>
      </form>
    </div>
  )
}

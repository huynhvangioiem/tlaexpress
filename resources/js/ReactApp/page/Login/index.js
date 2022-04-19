import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import clsx from 'clsx'

import { clearValidate, Required, Validator } from '../../config/Validator';
import Footer from '../../components/Footer'
import style from './Login.module.scss';
import {login} from '../../actions/auth'


const Login = (props) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateDatas = [
    { "objName": "#userName", "rules": [{ "func": Required }] },
    { "objName": "#password", "rules": [{ "func": Required }] },
  ]

  const onLogin = (e) => {
    e.preventDefault();
    let user = {
      "user_name": userName,
      "password": password
    }
    if (Validator(validateDatas)) {
      dispatch(login(user));
    }
  }
  return (

    <div className="container" id={style.container}>
      <form className="formLogin" method="POST" action="" id="formLogin" onSubmit={e => onLogin(e)}>
        <div className={clsx("row", style.login)}>
          <div className="col-12 col-m-12 col-s-12"><h1 className={style.title}>Đăng Nhập</h1></div>
          <div className="col-12 col-m-12 col-s-12">
            <div className="form-group">
              <input className="form-control" type="text" name="userName" id="userName" placeholder="Số điện thoại"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                onInput={e => clearValidate("#userName")}
              />
              <div className="form-message"></div>
            </div>
          </div>
          <div className="col-12 col-m-12 col-s-12">
            <div className="form-group">
              <input className="form-control" type="password" name="password" id="password" placeholder="Mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onInput={e => clearValidate("#password")}
              />
              <div className="form-message"></div>
            </div>
          </div>
          <div className="col-12 col-m-12 col-s-12">
            <button className="btn btn-success" type="submit" name="btnLogin" id="btnLogin">Đăng Nhập</button>
          </div>
        </div>
      </form>
      <Footer />
    </div >
  )
}

export default Login;
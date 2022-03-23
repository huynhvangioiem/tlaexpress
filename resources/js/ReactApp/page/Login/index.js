import clsx from 'clsx'
import React, { useState } from 'react'
import callApi from '../../config/apiCaller';
import { clearValidate, Required, Validator } from '../../config/Validator';
import Footer from '../../components/Footer'
import style from './Login.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';


const Login = (props) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const validateDatas = [
    { "objName": "#userName", "rules": [{ "func": Required }] },
    { "objName": "#password", "rules": [{ "func": Required }] },
  ]

  const login = (e) => {
    e.preventDefault();
    let user = {
      "user_name": userName,
      "password": password
    }
    if (Validator(validateDatas)) {
      callApi("login", "POST", user).then(res => {
        if (res.data.success) {
          sessionStorage.setItem('userLogined', JSON.stringify(res.data.success));
          alert('Đăng nhập thành công.');
          navigate(-1);
        } else {
          alert('Thông tin đăng nhập không đúng. Vui lòng thử lại!');
        }
      });
    }
  }
  return (

    <div className="container" id={style.container}>
      <form className="formLogin" method="POST" action="" id="formLogin" onSubmit={e => login(e)}>
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

// const mapStateToProps = state => {
//   return {
//       userLogined : state.loginReducer
//   }
// }
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     onLogin: (user) => {
//       dispatch(actLoginRequest(user));
//     },
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
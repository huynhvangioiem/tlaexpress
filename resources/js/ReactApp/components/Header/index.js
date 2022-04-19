import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Header.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const {children, logout} = props;
  const [maDH, setMaDH] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(maDH.substring(0,2)==="DH"){
      navigate('/quan-ly-van-don/chi-tiet-don-hang?dh='+maDH);
    }
    setMaDH('');
  }

  return (
    <div className={clsx("row",style.header)} id="header">
      <div className={clsx("col-0 col-m-1 col-s-1",style.btnToggleMenu)} id="btnToggleMenu">
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </div>
      <div className={clsx("col-7 col-m-7 col-s-7",style.search)} id="search">
        <form action="" method="POST" role="form" onSubmit={e=>handleSubmit(e)}>
          <div className={style.formGroup}>
            <input type="text" name="maDH" className="form-control" id="maDH" placeholder="Nhập vào mã đơn hàng để tìm kiếm thông tin đơn hàng" 
              value={maDH}
              onChange={e=>setMaDH(e.target.value)}
            />
            <button type="submit" className={style.btn}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>
      </div>
      <div className={clsx("col-4 col-m-3 col-s-3",style.name)} id="name">{children.nv_ten}</div>
      <div className={clsx("col-1 col-m-1 col-s-1",style.avatar)} id="avatar">
        <img src="img/no-user-image.jpg" className="img-responsive" alt="Image"/>
        <ul className={style.acountMenu}>
          <li className={style.item}>Đổi mật khẩu</li>
          <li className={style.item} onClick={e=>handleLogout()}>Đăng xuất</li>
        </ul>
      </div>
    </div>
  )
}

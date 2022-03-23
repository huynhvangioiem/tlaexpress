import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Header.module.scss';
import clsx from 'clsx';

export default function Header() {
  return (
    <div className={clsx("row",style.header)} id="header">
      <div className={clsx("col-0 col-m-1 col-s-1",style.btnToggleMenu)} id="btnToggleMenu">
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </div>
      <div className={clsx("col-7 col-m-7 col-s-7",style.search)} id="search">
        <form action="" method="get" role="form">
          <div className={style.formGroup}>
            <input type="text" className="form-control" id="" placeholder="Tìm kiếm đơn hàng" />
            <button type="submit" className={style.btn}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>
      </div>
      <div className={clsx("col-3 col-m-3 col-s-3",style.name)} id="name">Huỳnh Văn Giỏi Em</div>
      <div className={clsx("col-1 col-m-1 col-s-1",style.avatar)} id="avatar">
        <img src="img/no-user-image.jpg" className="img-responsive" alt="Image"/>
      </div>
    </div>
  )
}

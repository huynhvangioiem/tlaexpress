import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Header.module.scss';
import clsx from 'clsx';

export default function Header() {
  return (
    <div className="row" id={style.header}>
      <div className="col-1 col-m-1 col-s-1" id={style.btnToggleMenu}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </div>
      <div className="col-7 col-m-7 col-s-7" id={style.search}>
        <form action="" method="get" role="form">
          <div className="form-group">
            <input type="text" className="form-control" id="" placeholder="Tìm kiếm đơn hàng" />
            <button type="submit" className={style.btn}>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>
      </div>
      <div className="col-3 col-m-3 col-s-3" id={style.name}>Huỳnh Văn Giỏi Em</div>
      <div className="col-1 col-m-1 col-s-1" id={style.avatar}>
        <img src="img/no-user-image.jpg" className="img-responsive" alt="Image"/>
      </div>
    </div>
  )
}

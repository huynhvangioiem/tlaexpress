import clsx from 'clsx';
import React from 'react'
import { useMatch, useResolvedPath } from 'react-router';
import { Link } from 'react-router-dom';
import ChangeToSlug from '../../config/ChangeToSlug';
import style from './Sidebar.module.scss';


export default function Sidebar() {
  const Menus = [
    'Trang chủ',
    'Quản lý vận đơn',
    'Quản lý người dùng',
    'Quản lý điểm giao dịch',
    'Quản lý khách hàng',
    'Quản lý đối soát',
    'Thống kê',
    'Cài đặt'
  ]
  return (
    <div className={clsx("col-2 col-m-1 col-s-0",style.sidebar)} id={style.left}>
      <Link to="/"><div className={clsx("row",style.menuItems)} id={style.brand}>
        <div className="col-12 col-m-12 col-s-12">
          <img src="img/noPhoto.jpg" className="img-responsive" alt="Image" />
        </div>
      </div>
      </Link>
      <ShowMenu>{Menus}</ShowMenu>
    </div>
  )
}
// Handle customLink
function CustomLink({ children, to }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={to}>
      <div className={match ? clsx("row",style.active,style.menuItems) : clsx("row",style.menuItems)}>
        <div className="col-12 col-m-12 col-s-12">{children}</div>
      </div>
    </Link>
  )
}
//Handle showMenu
function ShowMenu(props) {
  const menus = props.children;
  var SideBar = menus.map((menu, index) => <CustomLink key={index} to={ChangeToSlug(menu)}>{menu}</CustomLink>)
  return (
    <>{SideBar}</>
  )
}

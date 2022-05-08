import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import ChangeToSlug from '../../config/ChangeToSlug';
import style from './style.module.scss';

export default function MenuQLGiao() {

  const TabSettings = [
    {
      name: 'Tạo phiếu giao hàng',
      icon: 'fa-solid fa-circle-plus'
    },
    {
      name: 'Danh sách phiếu giao hàng',
      icon: 'fa-solid fa-list'
    }
  ]

  return (
    <div className={clsx("col-3 col-m-3 col-s-12")}>
      <div className={clsx("container-fluid", style.tabAction)}>
        <ShowTab>{TabSettings}</ShowTab>
      </div>
    </div>
  )
}

// Handle customTab
function CustomTab({ children, to, icon }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={to}>
      <div className={match ? clsx("row", style.tabItem, style.active) : clsx("row", style.tabItem)}>
        <div className={clsx("col-2 col-m-2 col-s-12", style.icon)}><FontAwesomeIcon icon={icon} /></div>
        <div className={clsx("col-10 col-m-10 col-s-12")}>{children}</div>
      </div>
    </Link>
  )
}
function ShowTab(props) {
  const tabs = props.children;
  var result = tabs.map((tab, index) => <CustomTab key={index} to={ChangeToSlug(tab.name)} icon={tab.icon} >{tab.name}</CustomTab>)
  return (
    <>{result}</>
  )
}
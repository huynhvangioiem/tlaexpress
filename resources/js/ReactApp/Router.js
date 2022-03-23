import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Notfound from './components/Notfound'
import AddUser from './page/AddUser'
import Home from './page/Home'
import ListUser from './page/ListUser'
import QLUser from './page/QLUser'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trang-chu" element={<Home />} />
      <Route path="/quan-ly-nguoi-dung/*" element={<QLUser />}>
        <Route index element={<ListUser />} />
        <Route path="them-nguoi-dung" element={<AddUser />} />
        <Route path="danh-sach-nguoi-dung" element={<ListUser />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

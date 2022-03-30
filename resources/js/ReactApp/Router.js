import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Notfound from './components/Notfound'
import AddUser from './page/AddUser'
import ListDiemGD from './page/ListDiemGD'
import Home from './page/Home'
import ListUser from './page/ListUser'
import QLDiemGd from './page/QLDiemGd'
import QLUser from './page/QLUser'
import AddDiemGD from './page/AddDiemGD'

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
      <Route path="/quan-ly-diem-giao-dich/*" element={<QLDiemGd/>}>
        <Route index element={<ListDiemGD />} />
        <Route path="them-diem-giao-dich" element={<AddDiemGD />} />
        <Route path="danh-sach-diem-giao-dich" element={<ListDiemGD />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

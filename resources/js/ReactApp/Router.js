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
import QLVanDon from './page/QLVanDon'
import AddDonHang from './page/AddDonHang'
import ListDonHang from './page/ListDonHang'
import ChiTietDonHang from './page/ChiTietDonHang'
import QLXuat from './page/QLXuat'
import QLChuyenHang from './page/QLChuyenHang'
import QLNhap from './page/QLNhap'
import ListChuyenHang from './page/ListChuyenHang'
import AddChuyenHang from './page/AddChuyenHang'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trang-chu" element={<Home />} />
      <Route path="/quan-ly-van-don/*" element={<QLVanDon />}>
        <Route index element={<ListDonHang />} />
        <Route path="tao-don-hang" element={<AddDonHang />} />
        <Route path="danh-sach-don-hang" element={<ListDonHang />} />
        <Route path="chi-tiet-don-hang" element={<ChiTietDonHang />} />
      </Route>
      <Route path="/quan-ly-xuat-kho/*" element={<QLXuat />}>
        {/* <Route index element={<ListDonHang />} />
        <Route path="tao-don-hang" element={<AddDonHang />} />
        <Route path="danh-sach-don-hang" element={<ListDonHang />} />
        <Route path="chi-tiet-don-hang" element={<ChiTietDonHang />} /> */}
      </Route>
      <Route path="/quan-ly-nhap-kho/*" element={<QLNhap />}>
        {/* <Route index element={<ListDonHang />} />
        <Route path="tao-don-hang" element={<AddDonHang />} />
        <Route path="danh-sach-don-hang" element={<ListDonHang />} />
        <Route path="chi-tiet-don-hang" element={<ChiTietDonHang />} /> */}
      </Route>
      <Route path="/quan-ly-chuyen-hang/*" element={<QLChuyenHang />}>
        <Route index element={<ListChuyenHang />} />
        
        <Route path="them-chuyen-hang" element={<AddChuyenHang />} />
        <Route path="danh-sach-chuyen-hang" element={<ListChuyenHang />} />
        {/* <Route path="chi-tiet-don-hang" element={<ChiTietDonHang />} /> */}
      </Route>
      <Route path="/quan-ly-nguoi-dung/*" element={<QLUser />}>
        <Route index element={<ListUser />} />
        <Route path="them-nguoi-dung" element={<AddUser />} />
        <Route path="danh-sach-nguoi-dung" element={<ListUser />} />
      </Route>
      <Route path="/quan-ly-diem-giao-dich/*" element={<QLDiemGd />}>
        <Route index element={<ListDiemGD />} />
        <Route path="them-diem-giao-dich" element={<AddDiemGD />} />
        <Route path="danh-sach-diem-giao-dich" element={<ListDiemGD />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

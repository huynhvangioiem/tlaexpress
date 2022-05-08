import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function NhapList(props) {

  const data = props.children;
  const { detail } = props;
  const handleDetail = (id) => {
    detail(id);
  }
  const columns = [
    {
      key: "maPhieuXuat",
      title: "Mã Phiếu Xuất",
      // minWidth: "175px"
    },
    {
      key: "thoiGianXuat",
      title: "Thời Gian Xuất",
      // minWidth: "300px",
    },
    {
      key: "diemDen",
      title: "Xuất Đến",
      // minWidth: "200px",
    },
    {
      key: "chuyenHang",
      title: "Chuyến Hàng",
      // minWidth: "100px",
    },
    {
      key: "nguoiXuat",
      title: "Người Xuất",
      // minWidth: "100px",
    },
    {
      key: "trangThai",
      title: "Trạng Thái",
      textAlign: 'right',
      // minWidth: "100px",
    },
    {
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleDetail(id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-info" /></button>
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]
  return (
    <DataTables dataTables={data} columns={columns} idKey="maPhieuXuat" />
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function XuatList(props) {

  const data = props.children;
  const {edit, del, detail} = props;
  const handleDetail = (id) => {
    detail(id);
  }
  const handleEdit = (id) => {
    edit(id);
  }
  const handleDelete = (id) => {
    del(id);
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
          <button type="button" onClick={e => handleEdit(id)} className="btn btn-warning"><FontAwesomeIcon icon="fa-solid fa-pencil" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
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

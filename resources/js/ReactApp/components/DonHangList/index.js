import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function DonHangList(props) {

  const { detail, del, edit } = props;
  const handleDetails = (id) => {
    detail(id);
  }
  const handleEdit = (id) => {
    edit(id);
  }
  const handleDelete = (id) => {
    del(id);
  }

  const data = props.children;
  const columns = [
    {
      key: "maDonHang",
      title: "Mã đơn hàng",
      // minWidth: "175px"
    },
    {
      key: "mota",
      title: "Mô tả hàng hóa",
      // minWidth: "300px",
    },
    {
      key: "khoGui",
      title: "Kho gửi",
      // minWidth: "200px",
    },
    {
      key: "khoPhat",
      title: "Kho phát",
      // minWidth: "100px",
    },
    {
      key: "phiVanChuyen",
      title: "Phí vận chuyển",
      textAlign: 'right',
      // minWidth: "100px",
    },
    {
      key: "vitri",
      title: "Vị trí",
      // minWidth: "100px",
    },
    {
      key: "trangThai",
      title: "Trạng thái",
      // minWidth: "100px",
    },
    {
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleDetails(id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-info" /></button>
          <button type="button" onClick={e => handleEdit(id)} className="btn btn-warning"><FontAwesomeIcon icon="fa-solid fa-pencil" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]

  return (
    <DataTables dataTables={data} columns={columns} idKey="maDonHang" />
  );
}

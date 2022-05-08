import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function GiaoList(props) {

  const data = props.children;
  const { detail, del } = props;
  const handleDetail = (id) => {
    detail(id);
  }
  const handleDelete = (id) => {
    del(id);
  }
  const columns = [
    {
      key: "maPhieuGiao",
      title: "Mã Phiếu Giao",
      textAlign: "center",
      // minWidth: "175px"
    },
    {
      key: "nguoiGiao",
      title: "Người Giao",

      // minWidth: "300px",
    },
    {
      key: "thoiGianTao",
      title: "Thời Gian Tạo",
      textAlign: "center",
      // minWidth: "200px",
    },
    {
      key: "trangThai",
      title: "Trạng Thái",
      textAlign: "center",
      // minWidth: "100px",
    },
    {
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleDetail(id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-info" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]
  return (
    <DataTables dataTables={data} columns={columns} idKey="maPhieuGiao" />
  )
}

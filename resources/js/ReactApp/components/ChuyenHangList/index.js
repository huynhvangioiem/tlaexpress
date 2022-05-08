import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function ChuyenHangList(props) {

  const data = props.children;
  const {edit, del} = props;
  const handleEdit = (id) => {
    edit(id);
  }
  const handleDelete = (id) => {
    del(id);
  }
  const columns = [
    {
      key: "maChuyen",
      title: "Mã chuyến hàng",
      // minWidth: "175px"
    },
    {
      key: "taiXe",
      title: "Tên tài xế",
      // minWidth: "300px",
    },
    {
      key: "bks",
      title: "Biển kiểm soát",
      // minWidth: "200px",
    },
    {
      key: "lichTrinh",
      title: "Lịch trình",
      // minWidth: "100px",
    },
    {
      key: "thoiGian",
      title: "Thời Gian",
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
          <button type="button" onClick={e => handleEdit(id)} className="btn btn-warning"><FontAwesomeIcon icon="fa-solid fa-pencil" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]
  return (
    <DataTables dataTables={data} columns={columns} idKey="maChuyen" />
  )
}

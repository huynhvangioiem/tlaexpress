import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DataTables from '../DataTables';

export default function UserList(props) {

  const {children, edit, del, lock} = props;

  const handleEdit = (id) => {
    edit(id);
  }
  const handleLock = (id) => {
    lock(id);
  }

  const handleDelete = (id) => {
    del(id);
  }

  const columns = [
    {
      key: "userName",
      title: "Tên tài khoản",
      textAlign: "center",
      // minWidth: "175px"
    },
    {
      key: "ten",
      title: "Họ và tên",
      minWidth: "175px",
    },
    {
      key: "sdt",
      title: "Số điện thoại",
      textAlign: "center",
      // minWidth: "200px",
    },
    {
      key: "Chucvu",
      title: "Chức vụ",
      minWidth: "100px",
    },
    {
      key: "ngaySinh",
      title: "Ngày sinh",
      textAlign: "center",
      // minWidth: "100px",
    },
    {
      key: "diemgd",
      title: "Nơi làm việc",
      // minWidth: "100px",
    },
    {
      key: "Status",
      title: "Trạng thái",
      textAlign: "center",
      // minWidth: "100px",
    },
    {
      // key: "dgd_status",
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleEdit(id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-pencil" /></button>
          <button type="button" onClick={e => handleLock(id)} className="btn btn-warning"><FontAwesomeIcon icon="fa-solid fa-user-lock" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]

  return (
    <DataTables dataTables={children} columns={columns} idKey="id" />
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useState } from 'react'
import { showAddress } from '../../config/handleDvhc';
import { StatusDiemGd } from '../../contants';
import DataTables from '../DataTables';

const DiemGDList = (props) => {
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
      key: "dgd_ten",
      title: "Tên điểm giao dịch",
      minWidth: "175px"
    },
    {
      key: "dgdAddress",
      title: "Địa chỉ",
      minWidth: "300px",
    },
    {
      key: "dgd_mota",
      title: "Mô tả",
      minWidth: "200px",
    },
    {
      key: "dgdStatus",
      title: "Trạng thái",
      minWidth: "100px",
    },
    {
      // key: "dgd_status",
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleEdit(id)} className="btn btn-warning"><FontAwesomeIcon icon="fa-solid fa-pencil" /></button>
          <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </>
      ),
      textAlign: "center",
      minWidth : "150px",
    },
  ]
  return (
    <>
      <DataTables dataTables={data} columns={columns} />
    </>
  );
}

export default memo(DiemGDList)

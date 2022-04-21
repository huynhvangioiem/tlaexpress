import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addChuyenHang, cancleEdit, editChuyenHang } from '../../actions/chuyenHang';
import FormAddChuyenHang from '../../components/FormAddChuyenHang'

export default function AddChuyenHang() {
  const chuyenHangEditting = useSelector(state => state.chuyenHangEditting);
  const dispatch = useDispatch();

  const handleSubmit = (chuyenHangData) => {
    dispatch(addChuyenHang(chuyenHangData));
  }

  const handleCancleEdit = () => {
    dispatch(cancleEdit());
  }
  const handleEdit = (chuyenHangData, id) => {
    dispatch(editChuyenHang(chuyenHangData, id));
  }
  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormAddChuyenHang
        onSubmit={handleSubmit}
        chuyenHangEditting={chuyenHangEditting}
        onCancleEdit={handleCancleEdit}
        onEdit={handleEdit}
      />
    </div>
  )
}

import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDonHang, cancleEdit, editDonHang } from '../../actions/donhang';
import FormAddDonHang from '../../components/FormAddDonHang'


export default function AddDonHang(props) {

  const donHangEditting = useSelector(state => state.donHangEditting);
  const dispatch = useDispatch();

  const handleSubmit = (donHangData) => {
    dispatch(addDonHang(donHangData));
  }

  const handleCancleEdit = () => {
    dispatch(cancleEdit());
  }
  const handleEdit = (donHangData,id) => {
    dispatch(editDonHang(donHangData,id));
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormAddDonHang
        onSubmit={handleSubmit}
        donHangEditting={donHangEditting}
        onCancleEdit={handleCancleEdit}
        onEdit={handleEdit}
      />
    </div>
  )
}

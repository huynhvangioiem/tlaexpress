import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPhieuXuat, cancleEditPhieuXuat, editPhieuXuat } from '../../actions/phieuXuat';
import FormPhieuXuat from '../../components/FormPhieuXuat'

export default function AddXuat() {
  //definitions and getData from store
  const dispatch = useDispatch();
  const phieuXuatEditting = useSelector(state => state.phieuXuatEditting);
  
  /** handle functions */
  const handleSubmit = (dataPhieuXuat) => {
    dispatch(addPhieuXuat(dataPhieuXuat));
  }
  const handleCancleEdit = () => {
    dispatch(cancleEditPhieuXuat());
  }
  const handleEdit = (phieuXuatData,id) => {
    dispatch(editPhieuXuat(phieuXuatData,id));
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormPhieuXuat
        phieuXuatEditting={phieuXuatEditting}
        onSubmit={handleSubmit}
        onCancleEdit={handleCancleEdit}
        onEdit={handleEdit}
      />
    </div>
  )
}

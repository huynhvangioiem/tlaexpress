import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDiemGD, editDiemGD, onCancleEdit } from '../../actions/diemgd'
import FormDiemGD from '../../components/FormDiemGD'


const AddDiemGD = (props) => {

  const dgdEditting = useSelector(state => state.dgdEditting);
  const dispatch = useDispatch();

  const handleSubmit = (diemgdData) => {
    dispatch(addDiemGD(diemgdData));
  }

  const handleCancleEdit = () => {
    dispatch(onCancleEdit());
  }
  const handleEdit = (diemgdData,id) => {
    dispatch(editDiemGD(diemgdData,id));
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormDiemGD
        dgdEditting={dgdEditting}
        onSubmit={handleSubmit}
        onCancleEdit={handleCancleEdit}
        onEdit={handleEdit}
      />
    </div>
  )
}
export default AddDiemGD;

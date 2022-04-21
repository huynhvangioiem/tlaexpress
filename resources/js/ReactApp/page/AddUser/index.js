import clsx from 'clsx'
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, onCancleEdit } from '../../actions/user';
import FormEditUser from '../../components/FormEditUser';
// import { actAddUserRequest } from '../../actions';

import FormUser from '../../components/FormUser'

const AddUser = (props) => {

  const userEditting = useSelector(state => state.userEditting);
  const dispatch = useDispatch();

  const handleSubmit = (userInfo) => {
    dispatch(addUser(userInfo));
  }
  const handleCancleEdit = () => {
    dispatch(onCancleEdit());
  }
  const handleEdit = (userData, id) => {
    dispatch(editUser(userData, id));
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      {_.isEmpty(userEditting) ?
        <FormUser onSubmit={handleSubmit} /> :
        <FormEditUser edit={handleEdit} cancleEdit={handleCancleEdit} userData={userEditting} onSubmit={handleSubmit} />}
    </div>
  )
}


export default AddUser;
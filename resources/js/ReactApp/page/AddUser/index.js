import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import { actAddUserRequest } from '../../actions';

import FormUser from '../../components/FormUser'

const AddUser = (props) => {


  const handleSubmit = (userInfo) => {
  }



  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FormUser onSubmit={handleSubmit} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
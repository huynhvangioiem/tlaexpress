import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { actAddUserRequest } from '../../actions';

import FromUser from '../../components/FromUser'

const AddUser = (props) => {

  const navigate = useNavigate();
  // const [addUserStatus, setAddUserStatus] = useState(true);

  // useEffect(() => {
  //   setAddUserStatus(true);
  // }, [props.addUserStatus])

  const handleSubmit = (userInfo) => {
    props.onAddUser(userInfo);
    // alert("Thêm người dùng thành công");
    // navigate(-1);
  }



  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <FromUser onSubmit={handleSubmit} />
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
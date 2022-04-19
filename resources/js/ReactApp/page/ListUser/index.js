import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import UserList from '../../components/UserList';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Chucvu, StatusUser } from '../../contants';
import { findIndex } from '../../config';
import { deleteUser, lockUser, prepareEditing, unlockUser } from '../../actions/user';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function ListUser() {
  const userData = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    var newState = [];
    for (let i = 0; i < userData.length; i++) {
      const user = userData[i];
      var newUser = {
        id: user.nv_id,
        userName: user.user_name,
        ten: user.nv_ten,
        sdt: user.nv_sdt,
        Chucvu: Chucvu[userData[i].nv_chucvu],
        ngaySinh: user.nv_ngaysinh,
        diemgd: user.diemgd.dgd_ten,
        Status: StatusUser[userData[i].user.user_status],
      }
      newState.push(newUser);
    }
    setUsers(newState);
  }, [userData])

  const onEditUser = (id) => {
    var index = findIndex(userData,id,"nv_id");
    dispatch(prepareEditing(userData[index]));
    navigate("/quan-ly-nguoi-dung/them-nguoi-dung");
  }
  const onLockUser = (id) => {
    if (confirm("Bạn có chắc chắn rằng muốn khóa/mở khóa tài khoản này?")) {
      var index = _.findIndex(users, function (o) { return o.id == id });
      if(users[index].Status === StatusUser[0]) dispatch(unlockUser(id));
      else dispatch(lockUser(id));
    }
  }
  const onDeleteUser = (id) => {
    if (confirm("Bạn có chắc chắn rằng muốn xóa tài khoản này?")) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <div className={clsx("col-9 col-m-9 col-s-12")}>
      <div className={clsx("container-fluid", style.listUser)}>
        <div className={clsx("row")}>
          <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh Sách Tài Khoản Nhân Viên</div>
          <UserList edit={onEditUser} lock={onLockUser} del={onDeleteUser}>{users}</UserList>
        </div>
      </div>
    </div>
  )
}

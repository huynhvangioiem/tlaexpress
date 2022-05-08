import clsx from 'clsx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GiaoList from '../../components/GiaoList';
import style from './style.module.scss';
import dateFormat from 'dateFormat';
import { trangThaiGiaoHang } from '../../contants';
import { comfirmDelGHMsg, notPermissDelGHMsg } from '../../contants/toastMessage';
import { addPhieuGiao, deletePhieuGiao } from '../../actions/phieugiao';
import { toastError } from '../../Helper/toastHelper';

export default function ListGiao() {

  // definitions and getData from store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataPhieuGiaos = useSelector(state => state.giaoHangs);
  // const dataDiemgs = useSelector(state => state.diemgd);
  const dataUsers = useSelector(state => state.user);
  const auth = JSON.parse(sessionStorage.getItem("AUTHORIZATION"));

  const [phieuGiaos, setPhieuGiaos] = useState([]);

  //data processing
  useEffect(() => {
    if (!_.isEmpty(dataPhieuGiaos) && !_.isEmpty(dataUsers)) {
      var newState = [];
      dataPhieuGiaos.forEach(data => {
        const phieuGiao = {
          'maPhieuGiao': "GH" + data.gh_id,
          'nguoiGiao': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == data.gh_nguoigiao })].nv_ten,
          'thoiGianTao': dateFormat(new Date(data.created_at), "dd/mm/yyyy HH:MM"),
          'trangThai': trangThaiGiaoHang[data.gh_trangthai]
        }
        newState.push(phieuGiao);
      });
      setPhieuGiaos(newState);
    } else {
      setPhieuGiaos([]);
    }
  }, [dataPhieuGiaos, dataUsers])

  // handle function
  const onDetail = (id) => {
    navigate("chi-tiet-phieu-giao-hang?gh=" + id);
  }
  const onDelete = (id) => {
    var index = _.findIndex(dataPhieuGiaos, function (gh) { return gh.gh_id == id.substring(2, id.length) });
    if (dataPhieuGiaos[index].gh_nguoigiao != auth.user.user_name) {
      toastError(notPermissDelGHMsg);
    } else
      if (confirm(comfirmDelGHMsg)) {
        dispatch(deletePhieuGiao(id.substring(2, id.length)));
      }
  }
  const handleAddGiao = () => {
    dispatch(addPhieuGiao({gh_nguoigiao: auth.user.user_name}));
  }

  return (
    <div className={clsx("col-12 col-m-12 col-s-12")}>
      <div className={clsx("container-fluid", style.listGiao)}>
        <div className={clsx("row")}>
          <div className={clsx("col-6 col-m-6 col-s-12", style.title)}>Danh sách phiếu giao hàng</div>
          <div className={clsx("col-6 col-m-6 col-s-12", style.action)}>
            <button type="button" className="btn btn-success" onClick={handleAddGiao} >Tạo phiếu giao hàng</button>
          </div>
          <GiaoList del={onDelete} detail={onDetail}>{phieuGiaos}</GiaoList>
        </div>
      </div>
    </div>
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { memo } from 'react'
import { trangThaiPhieuXuat } from '../../contants';
import DataTables from '../DataTables';
import style from './style.module.scss';

function ThongTinPhieuXuat(props) {
  const phieuXuat = props.children;
  const { del, detail } = props;
  const handleDetails = (id) => {
    detail(id);
  }
  const handleDelete = (id) => {
    del(id);
  }
  const columns = [
    {
      key: "maDH",
      title: "Mã Đơn",
      textAlign: "center",
      // minWidth: "175px"
    },
    {
      key: "moTa",
      title: "Mô Tả",
      textAlign: "center",
      // minWidth: "300px",
    },
    {
      key: "khoPhat",
      title: "Kho Phát",
      textAlign: "center",
      // minWidth: "200px",
    },
    {
      key: "trangThai",
      title: "Trạng Thái",
      textAlign: "center",
      // minWidth: "100px",
    },
    {
      title: "Tùy Chọn",
      Content: (id) => (
        <>
          <button type="button" onClick={e => handleDetails(id)} className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-info" /></button>
          {phieuXuat.trangThai == trangThaiPhieuXuat[0] ?
            <button type="button" onClick={e => handleDelete(id)} className="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
            :
            ""
          }
        </>
      ),
      textAlign: "center",
      minWidth: "150px",
    },
  ]

  return (
    <div className={clsx("container-fluid", style.ThongTinPhieuXuat)}>
      <div className={clsx("row")}>
        <div className={clsx("col-6 col-m-6 col-s-12")}>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>Mã phiếu xuất:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.maPhieuXuat}</div>
          </div>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>thời gian xuất:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.thoiGianXuat}</div>
          </div>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>Xuất đến:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.diemDen}</div>
          </div>
        </div>
        <div className={clsx("col-6 col-m-6 col-s-12")}>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>Trạng thái:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.trangThai}</div>
          </div>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>Người xuất:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.nguoiXuat}</div>
          </div>
          <div className={clsx("row", style.infoItem)}>
            <div className={clsx("col-4 col-m-4 col-s-12")}>Chuyến hàng:</div>
            <div className={clsx("col-8 col-m-8 col-s-12")}>{phieuXuat.chuyenHang}</div>
          </div>
        </div>
      </div>
      <div className={clsx("row", style.info)}>
        <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Danh sách đơn hàng</div>
        {phieuXuat ? <DataTables dataTables={phieuXuat.donHangs} columns={columns} idKey="maDH" /> : ""}
      </div>

    </div>
  )
}
export default memo(ThongTinPhieuXuat);
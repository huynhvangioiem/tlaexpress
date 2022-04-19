import clsx from 'clsx'
import React from 'react'

import style from './style.module.scss';

export default function ThongTinDonHang(props) {

  const donHang = props.children;
  return (
    <div className={clsx("container-fluid", style.thongTinDonHang)}>
      <div className={clsx("row")}>
        {/* Left */}
        <div className={clsx("col-6 col-m-6 col-s-12")}>
          <div className={clsx("container-fluid")}>
            <div className={clsx("row")}>
              {/* Thông tin đơn hàng */}
              <div className={clsx("col-12 col-m-12 col-s-12", style.info)}>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Thông tin đơn hàng</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Mã đơn hàng:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.maDonHang}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Trạng thái:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.trangThai}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Vị trí:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.vitri}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Người tạo:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.nguoiTao}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Ngày tạo:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.ngayTao}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Kho gửi:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.khoGui}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Kho phát:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.khoPhat}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Quy cách phát:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.cachLay}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Hướng dẫn phát:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.huongDanGiao}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Thu hộ:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.thuHo} VNĐ</div>
                </div>
              </div>
              {/* Thông tin hàng hóa */}
              <div className={clsx("col-12 col-m-12 col-s-12", style.info)}>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Thông tin hàng hóa</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Mô tả hàng hóa:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.mota}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Trọng lượng:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.trongLuong} (gram)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className={clsx("col-6 col-m-6 col-s-12")}>
          <div className={clsx("container-fluid")}>
            <div className={clsx("row")}>
              {/* Thông tin cước phí */}
              <div className={clsx("col-12 col-m-12 col-s-12", style.info)}>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Cước phí</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Phí vận chuyển:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.phiVanChuyen} VNĐ</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Người trả phí:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.nguoiTra}</div>
                </div>
              </div>
              {/* Thông tin người gửi */}
              <div className={clsx("col-12 col-m-12 col-s-12", style.info)}>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Thông tin người gửi</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Họ và tên:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.tenGui}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Số điện thoại:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.sdtGui}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Địa chỉ:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.diaChiGui}</div>
                </div>
              </div>
              {/* Thông tin người nhận */}
              <div className={clsx("col-12 col-m-12 col-s-12", style.info)}>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Thông tin người nhận</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Họ và tên:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.tenNhan}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Số điện thoại:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.sdtNhan}</div>
                </div>
                <div className={clsx("row", style.infoItem)}>
                  <div className={clsx("col-4 col-m-4 col-s-12")}>Địa chỉ:</div>
                  <div className={clsx("col-8 col-m-8 col-s-12")}>{donHang.diaChiNhan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx("row", style.info)}>
        <div className={clsx("col-12 col-m-12 col-s-12", style.title)}>Lịch sử đơn hàng</div>
        <div className={clsx("col-12 col-m-12 col-s-12", style.history)}>{donHang.lichSuDonHang}</div>
      </div>
    </div>
  )
}

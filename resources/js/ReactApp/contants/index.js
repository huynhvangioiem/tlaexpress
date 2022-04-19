export const API_ENDPOINT = "http://localhost:8000/api";
export const AUTHORIZATION = 'AUTHORIZATION';
export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202
};
//user
export const StatusUser = {
  1: "Hoạt động",
  0: "Đã vô hiệu"
};
export const Chucvu = {
  1: "Admin",
  2: "Điều phối viên",
  3: "Nhân viên giao dịch",
  4: "Nhân viên giao nhận"
};

//diemgd
export const StatusDiemGd = {
  1: "Hoạt động",
  0: "Ngưng hoạt động"
};

//donHang
export const trangThaiDonHang = {
  0: 'Đã tạo đơn',
  1: 'Đã nhập kho gửi',
  2: 'Đang vận chuyển',
  3: 'Đã đến kho phát',
  4: 'Đang phát',
  5: 'Phát thành công',
  6: 'Phát không thành công, chờ phát lại',
  7: 'Chuyển hoàn',
  8: 'Đã chuyển hoàn',
  9: 'Hủy đơn',
};
export const viTriDonHang = {
  'KH': "Kho hàng ",
  'CH': "Chuyến hàng "
};
export const nguoiTraPvc = {
  0: "Người gửi",
  1: "Người nhận"
}
export const cachLay = {
  0: "Giao đến địa chỉ người nhận",
  1: "Người nhận tự đến nhận hàng"
}
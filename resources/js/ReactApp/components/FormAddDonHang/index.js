import clsx from 'clsx';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showListOfDistricts, showListOfProvince, showListOfWards } from '../../config/handleDvhc';
import { clearValidate, Max, Phonenumber, Required, Validator } from '../../config/Validator';
import { AUTHORIZATION, trangThaiDonHang } from '../../contants';

import style from './style.module.scss';

export default function FormAddDonHang(props) {

  const { onSubmit, donHangEditting, onCancleEdit, onEdit } = props;
  const navigate = useNavigate();

  const diemgds = useSelector(state => state.diemgd);

  const [tenGui, setTenGui] = useState('');
  const [sdtGui, setSdtGui] = useState('');
  const [tinhGui, setTinhGui] = useState('');
  const [huyenGui, setHuyenGui] = useState('');
  const [xaGui, setXaGui] = useState('');
  const [diaChiGui, setDiaChiGui] = useState('');

  const [tenNhan, setTenNhan] = useState('');
  const [sdtNhan, setSdtNhan] = useState('');
  const [tinhNhan, setTinhNhan] = useState('');
  const [huyenNhan, setHuyenNhan] = useState('');
  const [xaNhan, setXaNhan] = useState('');
  const [diaChiNhan, setDiaChiNhan] = useState('');

  const [mota, setMota] = useState('');
  const [trongLuong, setTrongLuong] = useState('');

  const [phiVanChuyen, setPhiVanChuyen] = useState('');
  const [nguoiTra, setNguoiTra] = useState(0);

  const [khoPhat, setKhoPhat] = useState('');
  const [tuLay, setTulay] = useState(0);
  const [hdPhat, setHDPhat] = useState('');
  const [thuHo, setThuHo] = useState('');

  // const [nguoiTao, setNguoiTao] = useState('');
  // const [trangThai, setTrangThai] = useState('');
  // const [vitri, setVitri] = useState('');

  const validateDatas = [
    { "objName": "#tenGui", "rules": [{ "func": Required }, { "func": Max, checkValue: 50 }] },//0
    { "objName": "#sdtGui", "rules": [{ "func": Required }, { "func": Phonenumber }] }, //1
    { "objName": "#tinhGui", "rules": [{ "func": Required }] },
    { "objName": "#huyenGui", "rules": [{ "func": Required }] },
    { "objName": "#xaGui", "rules": [{ "func": Required }] },
    { "objName": "#diaChiGui", "rules": [{ "func": Required }] },//5
    { "objName": "#tenNhan", "rules": [{ "func": Required }, { "func": Max, checkValue: 50 }] },
    { "objName": "#sdtNhan", "rules": [{ "func": Required }, { "func": Phonenumber }] },
    { "objName": "#tinhNhan", "rules": [{ "func": Required }] },
    { "objName": "#huyenNhan", "rules": [{ "func": Required }] },
    { "objName": "#xaNhan", "rules": [{ "func": Required }] },//10
    { "objName": "#diaChiNhan", "rules": [{ "func": Required }] },
    { "objName": "#mota", "rules": [{ "func": Required }] },
    { "objName": "#trongLuong", "rules": [{ "func": Required }] },
    { "objName": "#phiVanChuyen", "rules": [{ "func": Required }] },
    { "objName": "#nguoiTra", "rules": [{ "func": Required }] }, //15
    { "objName": "#khoPhat", "rules": [{ "func": Required }] },
    { "objName": "#tuLay", "rules": [{ "func": Required }] },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validator(validateDatas)) {
      if (_.isEmpty(donHangEditting)) {
        var donHang = {
          "dh_tengui": tenGui,
          "dh_sdtgui": sdtGui,
          "dh_dvhcgui": `${tinhGui}-${huyenGui}-${xaGui}`,
          "dh_diachigui": diaChiGui,
          "dh_tennhan": tenNhan,
          "dh_sdtnhan": sdtNhan,
          "dh_dvhcnhan": `${tinhNhan}-${huyenNhan}-${xaNhan}`,
          "dh_diachinhan": diaChiNhan,
          "dh_khophat": khoPhat,
          "dh_mota": mota,
          "dh_trongluong": trongLuong,
          "dh_huongdangiao": hdPhat,
          "dh_thuho": thuHo,
          "dh_phivanchuyen": phiVanChuyen,
          "dh_nguoitra": nguoiTra,
          "dh_tulay": tuLay,
          "dh_nguoitao": JSON.parse(sessionStorage.getItem(AUTHORIZATION)).user.user_name,
          "dh_trangthai": 1,
          "dh_vitri": `KH${JSON.parse(sessionStorage.getItem(AUTHORIZATION)).user.dgd_id}`
        }
        onSubmit(donHang);
      } else {
        var donHang = {
          "dh_tengui": tenGui,
          "dh_sdtgui": sdtGui,
          "dh_dvhcgui": `${tinhGui}-${huyenGui}-${xaGui}`,
          "dh_diachigui": diaChiGui,
          "dh_tennhan": tenNhan,
          "dh_sdtnhan": sdtNhan,
          "dh_dvhcnhan": `${tinhNhan}-${huyenNhan}-${xaNhan}`,
          "dh_diachinhan": diaChiNhan,
          "dh_khophat": khoPhat,
          "dh_mota": mota,
          "dh_trongluong": trongLuong,
          "dh_huongdangiao": hdPhat,
          "dh_thuho": thuHo,
          "dh_phivanchuyen": phiVanChuyen,
          "dh_nguoitra": nguoiTra,
          "dh_tulay": tuLay,
        }
        onEdit(donHang, donHangEditting.dh_id);
      }
    }
  }

  const handleReset = () => {
    if (!_.isEmpty(donHangEditting)) {
      onCancleEdit();
      navigate(-1);
    }
    setTenGui('');
    setSdtGui('');
    setTinhGui('');
    setHuyenGui('');
    setXaGui('');
    setDiaChiGui('');
    setTenNhan('');
    setSdtNhan('');
    setTinhNhan('');
    setHuyenNhan('');
    setXaNhan('');
    setDiaChiNhan('');
    setMota('');
    setTrongLuong('');
    setPhiVanChuyen('');
    setNguoiTra('');
    setKhoPhat('');
    setTulay('');
    setHDPhat('');
    setThuHo('');
  }

  useEffect(() => {
    if (!_.isEmpty(donHangEditting)) {
      setTenGui(donHangEditting.dh_tengui);
      setSdtGui(donHangEditting.dh_sdtgui);
      setTinhGui(donHangEditting.dh_dvhcgui.split('-')[0]);
      setHuyenGui(donHangEditting.dh_dvhcgui.split('-')[1]);
      setXaGui(donHangEditting.dh_dvhcgui.split('-')[2]);
      setDiaChiGui(donHangEditting.dh_diachigui);
      setTenNhan(donHangEditting.dh_tennhan);
      setSdtNhan(donHangEditting.dh_sdtnhan);
      setTinhNhan(donHangEditting.dh_dvhcnhan.split('-')[0]);
      setHuyenNhan(donHangEditting.dh_dvhcnhan.split('-')[1]);
      setXaNhan(donHangEditting.dh_dvhcnhan.split('-')[2]);
      setDiaChiNhan(donHangEditting.dh_diachinhan);
      setMota(donHangEditting.dh_mota);
      setTrongLuong(donHangEditting.dh_trongluong);
      setPhiVanChuyen(donHangEditting.dh_phivanchuyen);
      setNguoiTra(donHangEditting.dh_nguoitra);
      setKhoPhat(donHangEditting.dh_khophat);
      setTulay(donHangEditting.dh_tulay);
      setHDPhat(donHangEditting.dh_huongdangiao);
      setThuHo(donHangEditting.dh_thuho);
      document.getElementById('formTitle').innerText = "Cập nhật thông tin đơn hàng";
      document.getElementById('btnSubmit').innerText = "Cập nhật";
      document.getElementById('btnReset').innerText = "Hủy";
    }
    return () => onCancleEdit();
  }, [])

  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset()} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div id="formTitle" className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Thông tin đơn hàng</div>
        </div>

        {/* Thông tin ngưởi gửi */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Thông tin người gửi</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tenGui" >Tên người gửi:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="tenGui" id="tenGui" placeholder="Nhập vào tên người gửi"
                  value={tenGui}
                  onChange={e => setTenGui(e.target.value)}
                  onInput={e => clearValidate("#tenGui")}
                  onBlur={e => Validator([validateDatas[0]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="sdtGui" >Số điện thoại người gửi:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="sdtGui" id="sdtGui" placeholder="Nhập vào tên người gửi"
                  value={sdtGui}
                  onChange={e => setSdtGui(e.target.value)}
                  onInput={e => clearValidate("#sdtGui")}
                  onBlur={e => Validator([validateDatas[1]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tinhGui">Tỉnh:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tinhGui" id="tinhGui" className="form-control"
                  value={tinhGui}
                  onChange={e => { setTinhGui(e.target.value); setHuyenGui(""); setXaGui("") }}
                  onInput={e => clearValidate("#tinhGui")}
                  onBlur={e => Validator([validateDatas[2]])}
                >
                  <option value="">--Chọn tỉnh thành--</option>
                  <ShowTinh />
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="huyenGui">Huyện:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="huyenGui" id="huyenGui" className="form-control"
                  value={huyenGui}
                  onChange={e => { setHuyenGui(e.target.value); setXaGui("") }}
                  onInput={e => clearValidate("#huyenGui")}
                  onBlur={e => Validator([validateDatas[3]])}
                >
                  <option value="">--Chọn quận/huyện--</option>
                  {tinhGui ? <ShowHuyen provinceCode={tinhGui} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="xaGui">Xã:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="xaGui" id="xaGui" className="form-control"
                  value={xaGui}
                  onChange={e => setXaGui(e.target.value)}
                  onInput={e => clearValidate("#xaGui")}
                  onBlur={e => Validator([validateDatas[4]])}
                >
                  <option value="">--Chọn xã/phường--</option>
                  {tinhGui && huyenGui ? <ShowXa provinceCode={tinhGui} districtCode={huyenGui} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diaChiGui" >Địa chỉ cụ thể:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="diaChiGui" id="diaChiGui" placeholder="Nhập vào địa chỉ cụ thể của người gửi"
                  value={diaChiGui}
                  onChange={e => setDiaChiGui(e.target.value)}
                  onInput={e => clearValidate("#diaChiGui")}
                  onBlur={e => Validator([validateDatas[5]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        {/* Thông tin người nhận */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Thông tin người nhận</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tenNhan" >Tên người nhận:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="tenNhan" id="tenNhan" placeholder="Nhập vào tên người nhận"
                  value={tenNhan}
                  onChange={e => setTenNhan(e.target.value)}
                  onInput={e => clearValidate("#tenNhan")}
                  onBlur={e => Validator([validateDatas[6]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="sdtNhan" >Số điện thoại người nhận:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="sdtNhan" id="sdtNhan" placeholder="Nhập vào tên người nhận"
                  value={sdtNhan}
                  onChange={e => setSdtNhan(e.target.value)}
                  onInput={e => clearValidate("#sdtNhan")}
                  onBlur={e => Validator([validateDatas[7]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tinhNhan">Tỉnh:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tinhNhan" id="tinhNhan" className="form-control"
                  value={tinhNhan}
                  onChange={e => { setTinhNhan(e.target.value); setHuyenNhan(""); setXaNhan("") }}
                  onInput={e => clearValidate("#tinhNhan")}
                  onBlur={e => Validator([validateDatas[8]])}
                >
                  <option value="">--Chọn tỉnh thành--</option>
                  <ShowTinh />
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="huyenNhan">Huyện:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="huyenNhan" id="huyenNhan" className="form-control"
                  value={huyenNhan}
                  onChange={e => { setHuyenNhan(e.target.value); setXaNhan("") }}
                  onInput={e => clearValidate("#huyenNhan")}
                  onBlur={e => Validator([validateDatas[9]])}
                >
                  <option value="">--Chọn quận/huyện--</option>
                  {tinhNhan ? <ShowHuyen provinceCode={tinhNhan} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="xaNhan">Xã:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="xaNhan" id="xaNhan" className="form-control"
                  value={xaNhan}
                  onChange={e => setXaNhan(e.target.value)}
                  onInput={e => clearValidate("#xaNhan")}
                  onBlur={e => Validator([validateDatas[10]])}
                >
                  <option value="">--Chọn xã/phường--</option>
                  {tinhNhan && huyenNhan ? <ShowXa provinceCode={tinhNhan} districtCode={huyenNhan} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diaChiNhan" >Địa chỉ cụ thể:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="diaChiNhan" id="diaChiNhan" placeholder="Nhập vào địa chỉ cụ thể của người nhận"
                  value={diaChiNhan}
                  onChange={e => setDiaChiNhan(e.target.value)}
                  onInput={e => clearValidate("#diaChiNhan")}
                  onBlur={e => Validator([validateDatas[11]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        {/* Thông tin hàng hóa */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Thông tin hàng hóa</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="mota" >Mô tả hàng hóa:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="mota" id="mota" placeholder="Nhập vào mô tả hàng hóa"
                  value={mota}
                  onChange={e => setMota(e.target.value)}
                  onInput={e => clearValidate("#mota")}
                  onBlur={e => Validator([validateDatas[12]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="trongLuong" >Trọng lượng (gram):</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="trongLuong" id="trongLuong" placeholder="Nhập vào trọng lượng hàng hóa"
                  value={trongLuong}
                  onChange={e => setTrongLuong(e.target.value)}
                  onInput={e => clearValidate("#trongLuong")}
                  onBlur={e => Validator([validateDatas[13]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        {/* Thông tin cước phí */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Cước phí</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="phiVanChuyen" >Phí vận chuyển (VNĐ):</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="phiVanChuyen" id="phiVanChuyen" placeholder="Nhập vào phí vận chuyển"
                  value={phiVanChuyen}
                  onChange={e => setPhiVanChuyen(e.target.value)}
                  onInput={e => clearValidate("#phiVanChuyen")}
                  onBlur={e => Validator([validateDatas[14]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="nguoiTra">Người trả phí vận chuyển:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="nguoiTra" id="nguoiTra" className="form-control"
                  value={nguoiTra}
                  onChange={e => setNguoiTra(e.target.value)}
                  onInput={e => clearValidate("#nguoiTra")}
                  onBlur={e => Validator([validateDatas[15]])}
                >
                  <option value="0">Người gửi</option>
                  <option value="1">Người nhận</option>
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Thông tin giao hàng</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="khoPhat">Kho phát:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="khoPhat" id="khoPhat" className="form-control"
                  value={khoPhat}
                  onChange={e => setKhoPhat(e.target.value)}
                  onInput={e => clearValidate("#khoPhat")}
                  onBlur={e => Validator([validateDatas[16]])}
                >
                  <option value="">Vui lòng chọn kho phát</option>
                  {showPlaces(diemgds)}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tuLay">Cách phát:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tuLay" id="tuLay" className="form-control"
                  value={tuLay}
                  onChange={e => setTulay(e.target.value)}
                  onInput={e => clearValidate("#tuLay")}
                  onBlur={e => Validator([validateDatas[17]])}
                >
                  <option value="0">Giao đến địa chỉ người nhận</option>
                  <option value="1">Người nhận tự đến nhận hàng</option>
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="hdPhat" >Hướng dẫn phát:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="hdPhat" id="hdPhat" placeholder="Nhập vào hướng dẫn phát nếu có"
                  value={hdPhat}
                  onChange={e => setHDPhat(e.target.value)}
                // onInput={e => clearValidate("#hdPhat")}
                // onBlur={e => Validator([validateDatas[12]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="thuHo" >Số tiền thu hộ:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="thuHo" id="thuHo" placeholder="Nhập vào số tiền thu hộ nếu có"
                  value={thuHo}
                  onChange={e => setThuHo(e.target.value)}
                // onInput={e => clearValidate("#thuHo")}
                // onBlur={e => Validator([validateDatas[12]])}
                />
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        <div className={clsx("row", style.action)}>
          <div className="col-12 col-m-12 col-s-12">
            <button type="submit" id="btnSubmit" className="btn btn-success">Tạo Đơn Hàng</button>
            <button type="reset" id="btnReset" className="btn btn-warning">Nhập lại</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const ShowTinh = () => {
  const Tinhs = showListOfProvince();
  var result = Tinhs.map((tinh, index) => (<option key={index} value={tinh.code}>{tinh.name}</option>))
  return (<>{result}</>)
}
const ShowHuyen = ({ provinceCode }) => {
  const Huyens = showListOfDistricts(provinceCode);
  var result = Huyens.map((huyen, index) => (<option key={index} value={huyen.code}>{huyen.name}</option>))
  return (<>{result}</>)
}
const ShowXa = ({ provinceCode, districtCode }) => {
  const Xas = showListOfWards(provinceCode, districtCode);
  var result = Xas.map((xa, index) => (<option key={index} value={xa.code}>{xa.name}</option>))
  return (<>{result}</>)
}
const showPlaces = (places) => {
  var results = places.map((place, index) => (<option key={index} value={place.dgd_id}>{place.dgd_ten}</option>))
  return (
    <>{results}</>
  )
}
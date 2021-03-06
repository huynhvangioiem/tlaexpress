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
      document.getElementById('formTitle').innerText = "C???p nh???t th??ng tin ????n h??ng";
      document.getElementById('btnSubmit').innerText = "C???p nh???t";
      document.getElementById('btnReset').innerText = "H???y";
    }
    return () => onCancleEdit();
  }, [])

  return (
    <div className={clsx("container-fluid", style.content)}>
      <form action="" method="POST" role="form" onReset={e => handleReset()} onSubmit={e => handleSubmit(e)}>
        <div className={clsx("row")}>
          <div id="formTitle" className={clsx("col-12 col-m-12 col-s-12 formTitle", style.title)}>Th??ng tin ????n h??ng</div>
        </div>

        {/* Th??ng tin ng?????i g???i */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Th??ng tin ng?????i g???i</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tenGui" >T??n ng?????i g???i:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="tenGui" id="tenGui" placeholder="Nh???p v??o t??n ng?????i g???i"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="sdtGui" >S??? ??i???n tho???i ng?????i g???i:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="sdtGui" id="sdtGui" placeholder="Nh???p v??o t??n ng?????i g???i"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tinhGui">T???nh:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tinhGui" id="tinhGui" className="form-control"
                  value={tinhGui}
                  onChange={e => { setTinhGui(e.target.value); setHuyenGui(""); setXaGui("") }}
                  onInput={e => clearValidate("#tinhGui")}
                  onBlur={e => Validator([validateDatas[2]])}
                >
                  <option value="">--Ch???n t???nh th??nh--</option>
                  <ShowTinh />
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="huyenGui">Huy???n:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="huyenGui" id="huyenGui" className="form-control"
                  value={huyenGui}
                  onChange={e => { setHuyenGui(e.target.value); setXaGui("") }}
                  onInput={e => clearValidate("#huyenGui")}
                  onBlur={e => Validator([validateDatas[3]])}
                >
                  <option value="">--Ch???n qu???n/huy???n--</option>
                  {tinhGui ? <ShowHuyen provinceCode={tinhGui} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="xaGui">X??:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="xaGui" id="xaGui" className="form-control"
                  value={xaGui}
                  onChange={e => setXaGui(e.target.value)}
                  onInput={e => clearValidate("#xaGui")}
                  onBlur={e => Validator([validateDatas[4]])}
                >
                  <option value="">--Ch???n x??/ph?????ng--</option>
                  {tinhGui && huyenGui ? <ShowXa provinceCode={tinhGui} districtCode={huyenGui} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diaChiGui" >?????a ch??? c??? th???:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="diaChiGui" id="diaChiGui" placeholder="Nh???p v??o ?????a ch??? c??? th??? c???a ng?????i g???i"
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

        {/* Th??ng tin ng?????i nh???n */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Th??ng tin ng?????i nh???n</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tenNhan" >T??n ng?????i nh???n:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="tenNhan" id="tenNhan" placeholder="Nh???p v??o t??n ng?????i nh???n"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="sdtNhan" >S??? ??i???n tho???i ng?????i nh???n:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="sdtNhan" id="sdtNhan" placeholder="Nh???p v??o t??n ng?????i nh???n"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tinhNhan">T???nh:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tinhNhan" id="tinhNhan" className="form-control"
                  value={tinhNhan}
                  onChange={e => { setTinhNhan(e.target.value); setHuyenNhan(""); setXaNhan("") }}
                  onInput={e => clearValidate("#tinhNhan")}
                  onBlur={e => Validator([validateDatas[8]])}
                >
                  <option value="">--Ch???n t???nh th??nh--</option>
                  <ShowTinh />
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="huyenNhan">Huy???n:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="huyenNhan" id="huyenNhan" className="form-control"
                  value={huyenNhan}
                  onChange={e => { setHuyenNhan(e.target.value); setXaNhan("") }}
                  onInput={e => clearValidate("#huyenNhan")}
                  onBlur={e => Validator([validateDatas[9]])}
                >
                  <option value="">--Ch???n qu???n/huy???n--</option>
                  {tinhNhan ? <ShowHuyen provinceCode={tinhNhan} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="xaNhan">X??:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="xaNhan" id="xaNhan" className="form-control"
                  value={xaNhan}
                  onChange={e => setXaNhan(e.target.value)}
                  onInput={e => clearValidate("#xaNhan")}
                  onBlur={e => Validator([validateDatas[10]])}
                >
                  <option value="">--Ch???n x??/ph?????ng--</option>
                  {tinhNhan && huyenNhan ? <ShowXa provinceCode={tinhNhan} districtCode={huyenNhan} /> : ""}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="diaChiNhan" >?????a ch??? c??? th???:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="diaChiNhan" id="diaChiNhan" placeholder="Nh???p v??o ?????a ch??? c??? th??? c???a ng?????i nh???n"
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

        {/* Th??ng tin h??ng h??a */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Th??ng tin h??ng h??a</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="mota" >M?? t??? h??ng h??a:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="mota" id="mota" placeholder="Nh???p v??o m?? t??? h??ng h??a"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="trongLuong" >Tr???ng l?????ng (gram):</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="trongLuong" id="trongLuong" placeholder="Nh???p v??o tr???ng l?????ng h??ng h??a"
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

        {/* Th??ng tin c?????c ph?? */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>C?????c ph??</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="phiVanChuyen" >Ph?? v???n chuy???n (VN??):</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="phiVanChuyen" id="phiVanChuyen" placeholder="Nh???p v??o ph?? v???n chuy???n"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="nguoiTra">Ng?????i tr??? ph?? v???n chuy???n:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="nguoiTra" id="nguoiTra" className="form-control"
                  value={nguoiTra}
                  onChange={e => setNguoiTra(e.target.value)}
                  onInput={e => clearValidate("#nguoiTra")}
                  onBlur={e => Validator([validateDatas[15]])}
                >
                  <option value="0">Ng?????i g???i</option>
                  <option value="1">Ng?????i nh???n</option>
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
        </div>

        {/* Th??ng tin ????n h??ng */}
        <div className={clsx("row")}>
          <div id="" className={clsx("col-12 col-m-12 col-s-12", style.subTitle)}>Th??ng tin giao h??ng</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="khoPhat">Kho ph??t:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="khoPhat" id="khoPhat" className="form-control"
                  value={khoPhat}
                  onChange={e => setKhoPhat(e.target.value)}
                  onInput={e => clearValidate("#khoPhat")}
                  onBlur={e => Validator([validateDatas[16]])}
                >
                  <option value="">Vui l??ng ch???n kho ph??t</option>
                  {showPlaces(diemgds)}
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="tuLay">C??ch ph??t:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <select name="tuLay" id="tuLay" className="form-control"
                  value={tuLay}
                  onChange={e => setTulay(e.target.value)}
                  onInput={e => clearValidate("#tuLay")}
                  onBlur={e => Validator([validateDatas[17]])}
                >
                  <option value="0">Giao ?????n ?????a ch??? ng?????i nh???n</option>
                  <option value="1">Ng?????i nh???n t??? ?????n nh???n h??ng</option>
                </select>
              </div>
              <div className="col-12 col-m-12 col-s-12 form-message"></div>
            </div>
          </div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            <div className="row form-group">
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="hdPhat" >H?????ng d???n ph??t:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="text" className="form-control" name="hdPhat" id="hdPhat" placeholder="Nh???p v??o h?????ng d???n ph??t n???u c??"
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
              <div className="col-12 col-m-12 col-s-12 formName"><label htmlFor="thuHo" >S??? ti???n thu h???:</label></div>
              <div className="col-12 col-m-12 col-s-12">
                <input type="number" min="0" className="form-control" name="thuHo" id="thuHo" placeholder="Nh???p v??o s??? ti???n thu h??? n???u c??"
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
            <button type="submit" id="btnSubmit" className="btn btn-success">T???o ????n H??ng</button>
            <button type="reset" id="btnReset" className="btn btn-warning">Nh???p l???i</button>
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
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormAddDonToGiao from '../../components/FormAddDonToGiao';
import { AUTHORIZATION, trangThaiDonHang, trangThaiGiaoHang } from '../../contants';
import style from './style.module.scss';
import { donHangSuccess, getPhieuGiao, giaoHang } from '../../actions/phieugiao';
import dateFormat from 'dateformat';
import ThongTinPhieuGiao from '../../components/ThongTinPhieuGiao';
import { addDonHangToGiao_Error_Cant, addDonHangToGiao_Error_NotFound, giao_Error_DonHangEmpty } from '../../contants/toastMessage';
import { showAddress } from '../../config/handleDvhc';
import { numberFormat } from '../../config';
import { toastError } from '../../Helper/toastHelper';

export default function ChiTietGiao() {

  //definitions and get data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); //get params from url
  const giaoHangChiTietData = useSelector(state => state.giaoHangChiTiet); //data GiaoHangChiTiet from store
  const dataUsers = useSelector(state => state.user); //data users from store
  const donHangsData = useSelector(state => state.donHangs); //data donhangs from store

  const userLogin = JSON.parse(sessionStorage.getItem(AUTHORIZATION)).user; //data about user login

  const [giaoHangChiTiet, setGiaoHangChiTiet] = useState(''); //data GiaoHangChiTiet to display
  const [idDHs, setIdDHs] = useState([]); //list of maDon added
  const [donHangs, setDonHangs] = useState([]); //list of donHangs to display
  const [displayAdd, setDisplayAdd] = useState(false); // status of displayAdd

  //components will mount with params
  useEffect(() => {
    //get ma phieu xuat from params
    var maPhieuGiao = searchParams.get('gh');
    //call cation get phieu xuat chi tiet
    dispatch(getPhieuGiao(maPhieuGiao.substring(2, maPhieuGiao.length)));
  }, [searchParams])

  useEffect(() => {
    if (!_.isEmpty(giaoHangChiTietData) && !_.isEmpty(dataUsers) && !_.isEmpty(donHangsData)) {
      /** data processing to display */
      const donHangs = [];
      const giaoHangChiTiet = {
        'maPhieuGiao': "GH" + giaoHangChiTietData.gh_id,
        'nguoiGiao': dataUsers[_.findIndex(dataUsers, function (user) { return user.user_name == giaoHangChiTietData.gh_nguoigiao })].nv_ten,
        'thoiGianTao': dateFormat(new Date(giaoHangChiTietData.created_at), "dd/mm/yyyy HH:MM"),
        'trangThai': trangThaiGiaoHang[giaoHangChiTietData.gh_trangthai]
      }
      /** Check status of phieuXuat*/
      if (giaoHangChiTietData.gh_trangthai == 0) {
        //1. Check gh_nguoiGiao = userLogin
        if (giaoHangChiTietData.gh_nguoigiao === userLogin.user_name) {
          // 1.1 display form add
          setDisplayAdd(true);
          //1.2 check localStorage of this giaoHang is exist => load and set data
          var dataLocal = JSON.parse(localStorage.getItem("Giao" + searchParams.get('gh')));
          if (dataLocal) {
            //1.2.1 set IdDHs
            setIdDHs(dataLocal);
            //1.2.2 set donHangs
            dataLocal.forEach(idDH => {
              var donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == idDH })];
              donHangs.push(donHangProcess(donHangData));
            })
            setDonHangs(donHangs);
          }
        }
      } else {
        giaoHangChiTietData.don_hang.forEach(dh => {
          var donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == dh.dh_id })];
          donHangs.push(donHangProcess(donHangData));
        });
        setDonHangs(donHangs);
      }

      /** Set giaoHangChiTiet to display */
      setGiaoHangChiTiet({ ...giaoHangChiTiet, 'donHang': donHangs });
    }
  }, [giaoHangChiTietData, dataUsers, donHangsData])

  // handle function
  const handleAddDonToGiao = (maDH) => {
    //get idDH and donHang
    let idDH = maDH.substring(2, maDH.length);
    let donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == idDH })];
    //check donHang is true
    if (!donHangData || donHangData.dh_vitri !== "KH" + userLogin.dgd_id) // donHang not exits and dh_vitri not in here.
      toastError(addDonHangToGiao_Error_NotFound);
    else if (donHangData.dh_trangthai != 3) // donHang chua den dich
      toastError(addDonHangToGiao_Error_Cant);
    else {
      //set distinct idDHS
      var distinctIdDhs = Array.from(new Set([...idDHs, idDH]));
      setIdDHs(distinctIdDhs);
      //save to local storage
      localStorage.setItem("Giao" + searchParams.get('gh'), JSON.stringify(distinctIdDhs));
      //add donHang to DonHangList
      const donHang = donHangProcess(donHangData);
      var isExisting = false;
      for (let i = 0; i < donHangs.length; i++)
        if (donHangs[i].maDH == donHang.maDH) {
          isExisting = true;
          break;
        }
      if (!isExisting) setDonHangs([...donHangs, donHang]);
    }
  }
  const handleDelAdded = (maDH) => {
    const idDH = maDH.substring(2, maDH.length);
    const index = _.findIndex(idDHs, function (o) { return o == idDH });
    setIdDHs([...idDHs.slice(0, index), ...idDHs.slice(index + 1)]);
    setDonHangs([...donHangs.slice(0, index), ...donHangs.slice(index + 1)]);
    localStorage.setItem(
      "Giao" + searchParams.get('gh'),
      JSON.stringify([...idDHs.slice(0, index), ...idDHs.slice(index + 1)])
    );
  }
  const handleDetail = (id) => {
    navigate("/quan-ly-van-don/chi-tiet-don-hang?dh=" + id);
  }
  const handleExit = () => {
    navigate(-1);
  }
  const handleGiao = () => {
    if (!_.isEmpty(idDHs)) {
      // console.log(giaoHangChiTietData.gh_id);
      dispatch(giaoHang(idDHs, giaoHangChiTietData.gh_id));
      localStorage.removeItem("Giao" + searchParams.get('gh'));
    } else toastError(giao_Error_DonHangEmpty);
  }
  const handleDone = (maDH) => {
    //get idDH and donHang
    let idDH = maDH.substring(2, maDH.length);
    let donHangData = donHangsData[_.findIndex(donHangsData, function (donHang) { return donHang.dh_id == idDH })];
    if(donHangData.dh_trangthai == 5){
      toastError("Hồi nãy giao rồi, giờ giao nữa. Điên à?");
    }else
    if (confirm("Đơn hàng đã giao thành công?")) {
      dispatch(donHangSuccess(maDH.substring(2,maDH.length)));
    }
  }

  //set data processing about donHangs and set giaoHangChiTiet.donHangs when donHangs change
  useEffect(() => {
    if (!_.isEmpty(donHangs)) {
      setGiaoHangChiTiet({
        ...giaoHangChiTiet,
        donHang: donHangs
      });
    } else {
      setGiaoHangChiTiet({
        ...giaoHangChiTiet,
        donHang: []
      });
    }
  }, [donHangs])

  return (
    <div className={clsx("col-12 col-m-12 col-s-12")}>
      <div className={clsx("container-fluid", style.ChiTietGiao)}>
        <div className={clsx("row", style.title)}>
          <div className={clsx("col-6 col-m-6 col-s-12")}>Thông tin chi tiết phiếu giao hàng</div>
          <div className={clsx("col-6 col-m-6 col-s-12")}>
            {displayAdd ? <FormAddDonToGiao onSubmit={handleAddDonToGiao}></FormAddDonToGiao> : ""}
          </div>
        </div>
        <div className={clsx("row")}>
          <ThongTinPhieuGiao del={handleDelAdded} done={handleDone} detail={handleDetail}>{giaoHangChiTiet}</ThongTinPhieuGiao>
        </div>
        <div className={clsx("row", style.action)}>
          <div className={clsx("col-12 col-m-12 col-s-12")}>
            {
              displayAdd ?
                <button onClick={e => handleGiao()} type="button" id="btnGiao" className="btn btn-success">Giao Hàng</button>
                :
                ""
            }
            <button onClick={e => handleExit()} type="button" id="" className="btn btn-warning">Trở về</button>
          </div>
        </div>
      </div>
    </div>
  )
}
//processing data about donHang
const donHangProcess = (donHangData) => {
  return {
    maDH: "DH" + donHangData.dh_id,
    moTa: donHangData.dh_mota,
    tenNhan: donHangData.dh_tennhan,
    sdtNhan: donHangData.dh_sdtnhan,
    diaChiNhan: `${donHangData.dh_diachinhan}, ${showAddress(donHangData.dh_dvhcnhan)}`,
    tongThu: numberFormat(donHangData.dh_phivanchuyen + donHangData.dh_thuho),
    trangThai: trangThaiDonHang[donHangData.dh_trangthai],
  };
}
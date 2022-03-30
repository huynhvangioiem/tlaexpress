import { dvhc } from './dvhc';

export const showAddress = (code) => {
  const addressCode = code.split('-');

  const provinceCode = addressCode[0];
  const districtCode = addressCode[1];
  const wardCode = addressCode[2];

  const provinceData = dvhc.filter(item => item.code == provinceCode);
  const provinceName = provinceData.length != 0 ? provinceData[0].name : "Mã tỉnh không tồn tại";

  const districtData = provinceData[0].districts.filter(item => item.code == districtCode);
  const districtName = districtData.length != 0 ? districtData[0].name : "Mã huyện không tồn tại";

  const wardData = districtData[0].wards.filter(item => item.code == wardCode);
  const wardName = wardData.length != 0 ? wardData[0].name : "Mã xã không tồn tại";

  return `${wardName}, ${districtName}, ${provinceName}`;
}

export const showListOfProvince = () => {
  var result = [];
  dvhc.forEach(provinceData => {
    result.push({
      name: provinceData.name,
      code: provinceData.code
    })
  });
  return result;
}
export const showListOfDistricts = (provinceCode) => {
  var result = [];
  const provinceData = dvhc.filter(item => item.code == provinceCode);
  if (provinceData.length == 1) {
    provinceData[0].districts.forEach(districtData => {
      result.push({
        name: districtData.name,
        code: districtData.code
      })
    });
  }
  return result;
}

export const showListOfWards = (provinceCode, districtCode) => {
  var result = [];
  const provinceData = dvhc.filter(item => item.code == provinceCode);
  if (provinceData.length == 1) {
    const districtData = provinceData[0].districts.filter(item => item.code == districtCode);
    if (districtData.length == 1) {
      districtData[0].wards.forEach(ward => {
        result.push({
          name: ward.name,
          code: ward.code
        })
      });
    }
  }
  return result;
}
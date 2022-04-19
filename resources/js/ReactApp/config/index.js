import _ from "lodash";
import { viTriDonHang } from "../contants";
import { showAddress } from "./handleDvhc";

export const findIndex = (array, value, field) => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (typeof item === "object") {
      if (item[field] == value) return i;
    } else {
      if (item == value) return i;
    }
  }
  return -1;
}
export const dateFormat = (dataString) => {
  const date = new Date(dataString);
  const dateFormated = new Intl.DateTimeFormat('vi', { dateStyle: 'short', timeStyle: 'medium' }).format(date);
  return dateFormated;
}
export const numberFormat = (numberString) => {
  const numberFormated = new Intl.NumberFormat('vi').format(numberString);
  return numberFormated;
}
export const showLocaleDonHang = (locale, diemgd) => {
  const key = locale.substring(0, 2);
  const id = locale.substring(2, locale.length);
  const index = _.findIndex(diemgd, function (o) { return o.dgd_id == id });
  if (key === 'KH') {
    return viTriDonHang[key] + diemgd[index].dgd_ten;
  } else {
    return viTriDonHang[key] + locale;
  }
}
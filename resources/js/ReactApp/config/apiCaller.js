import axios from "axios";
import * as config from "../contants/apiConfig";

export default function callApi(endpoint, method = "GET", body, headers) {
  return axios({
    method: method,
    url: `${config.API}/${endpoint}`,
    headers: headers,
    data: body
  }).catch(error => {
    console.log(error);
  });
}
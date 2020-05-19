import Axios from "axios";

//for development use
const baseURL = "http://thongtindoanhnghiep.co/api";

export async function cGetCityList() {
  const path = "/city";
  return Axios({ method: "get", url: baseURL + path });
}

export async function cGetDistrictList(id) {
  const path = `/city/${id}/district`;
  return Axios({ method: "get", url: baseURL + path });
}

export async function cGetWardList(id) {
  const path = `/district/${id}/ward`;
  return Axios({ method: "get", url: baseURL + path });
}

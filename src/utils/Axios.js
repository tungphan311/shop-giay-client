import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

API.defaults.headers.post["Content-Type"] = "application/json";

export default API;

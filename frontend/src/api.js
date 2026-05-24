import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-m3dz.onrender.com",
});

export default API;
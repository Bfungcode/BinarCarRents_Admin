import axios from "axios";


const API_URL = "https://api-car-rental.binaracademy.org/";

const login = (email, password) => {
  return axios.post(`${API_URL}admin/auth/login`, {
    email,
    password
  })
    .then((res) => {
      if (res.data.access_token) {
        localStorage.setItem("admin", JSON.stringify(res.data));
      }
      return res.data
    })
};

const authAPI = {
  login,
};

export default authAPI;

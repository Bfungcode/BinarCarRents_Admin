import axios from "axios";


const API_URL = "https://bootcamp-rent-car.herokuapp.com/";

const login = (email, password) => {
  return axios.post(`${API_URL}admin/auth/login`, {
    email,
    password
  })
    .then((res) => {
      if (res.data.access_token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data
    })
};

const authAPI = {
  login,
};

export default authAPI;
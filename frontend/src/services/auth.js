import axios from "axios";

const login = (email, password, URL) => {
  return axios.post(URL, { email, password }).then((res) => {
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authenticate = { login, logout, getUser };
export default authenticate;

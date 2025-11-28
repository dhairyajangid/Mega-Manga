import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/api/v1/User"
  // no withCredentials because backend doesn't use cookies
});

export const signupAPI = async (data) => {
  try {
    const res = await API.post("/signup", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const loginAPI = async (data) => {
  try {
    const res = await API.post("/signin", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

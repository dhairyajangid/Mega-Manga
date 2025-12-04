import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/User";

export const signupAPI = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData);
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    
    return {
      success: true,
      data: response.data,
      message: response.data.msg || "Signup successful!"
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.msg || error.response?.data || "Signup failed. Please try again."
    };
  }
};

export const loginAPI = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, formData);
    
    // Store user data in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("artistName", response.data.artistName);
      localStorage.setItem("avatar", response.data.avatar);
    }
    
    return {
      success: true,
      data: response.data,
      message: "Login successful!"
    };
  } catch (error) {
    // Handle rate limiting (429)
    if (error.response?.status === 429) {
      return {
        success: false,
        message: error.response.data.msg || "Too many signin attempts. Please try again after 15 minutes."
      };
    }
    
    // Handle other errors
    return {
      success: false,
      message: error.response?.data?.msg || "Login failed. Please check your credentials."
    };
  }
};

export const logoutAPI = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("artistName");
  localStorage.removeItem("avatar");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserData = () => {
  return {
    username: localStorage.getItem("username") || "",
    artistName: localStorage.getItem("artistName") || "",
    avatar: localStorage.getItem("avatar") || "/default-avatar.png",
  };
};
import axios from "axios";
export const baseURL = "http://localhost:5050/api/v1";
// export const baseURL = "https://zawgyi.onrender.com/api/v1";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const access_token = JSON.parse(localStorage.getItem("access_token")!);
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

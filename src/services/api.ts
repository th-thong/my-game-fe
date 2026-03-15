import axios from "axios";
import { auth } from "@/lib/firebase";
import config from "@/config";

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let isLoggingOut = false;

api.interceptors.request.use(
  async (axiosConfig) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }

    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      console.warn("Token expired or invalid");

      try {
        await auth.signOut();
      } catch (signOutError) {
        console.error("SignOut error:", signOutError);
      }

      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;

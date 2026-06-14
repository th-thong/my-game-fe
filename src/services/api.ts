import axios from "axios";
import { auth } from "@/lib/firebase";
import config from "@/config";
import { toast } from "sonner";

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
    if (!config.authMode || !auth) {
      const userId = localStorage.getItem("noauth_user_id");
      const userEmail = localStorage.getItem("noauth_user_email");
      if (userId) {
        axiosConfig.headers["X-User-ID"] = userId;
      }
      if (userEmail) {
        axiosConfig.headers["X-User-Email"] = userEmail;
      }
      return axiosConfig;
    }

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
      if (!config.authMode || !auth) {
        localStorage.removeItem("noauth_user_id");
        localStorage.removeItem("noauth_user_email");
        window.location.href = "/";
        return Promise.reject(error);
      }

      isLoggingOut = true;
      console.warn("Token expired or invalid");

      try {
        await auth.signOut();
      } catch (signOutError) {
        console.error("SignOut error:", signOutError);
      } finally {
        isLoggingOut = false;
      }

      window.location.href = "/";
    }

    if (error.response?.status === 429) {
      toast.error("Too many requests — please wait a moment and try again.");
    }

    return Promise.reject(error);
  },
);

export default api;

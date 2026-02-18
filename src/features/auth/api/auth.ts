import api from "@/services/api"

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post("user/login/", data);
    return res.data;
  },

  signUp: async(data: {user_name: string; email: string; password: string}) => {
    const res = await api.post("user/register/",data)
    return res.data
  }
};

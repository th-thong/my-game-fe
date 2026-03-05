import api from "./api"


interface AccountDataResponse {
  email: string;
  id: string;
  user_name: string;
}

export const accountApi = {
  getAccountData: async (): Promise<AccountDataResponse> => {
    const res = await api.get("user/account-data/");
    return res.data;
  }
};
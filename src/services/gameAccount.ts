import api from "./api"

interface GameAccountResponse {
  id: string;
  uid: string;
  oauth_code: string | null;
}

export const gameAccountApi = {
    getGameUidList: async(): Promise<string[]> => {
        const res = await api.get("/game-account/")
        const gameUidList = res.data.map((item: GameAccountResponse) => item.uid);
        return gameUidList
    }
}
import { use } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import api, { setAccessToken } from "@/services/api";
import { useUserStore } from "@/store/useUserStore";
import config from "@/config";

const processedCodes = new Set<string>();

const authPromiseCache = new Map<string, Promise<any>>();

function getAuthPromise(code: string, fetchUserData: () => void): Promise<any> {
  if (authPromiseCache.has(code)) {
    return authPromiseCache.get(code)!;
  }

  const promise = api
    .post(
      "account/login/google/",
      {
        code,
        redirect_uri: config.googleCallback,
        client_id: config.googleClientId,
      },
      { timeout: 30000 },
    )
    .then((res) => {
      setAccessToken(res.data.access);
      fetchUserData();
      return true;
    })
    .catch((err) => {
      console.error("Error:", err.response?.data ?? err.message);
      processedCodes.delete(code);
      throw err;
    });

  authPromiseCache.set(code, promise);
  return promise;
}

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const fetchUserData = useUserStore((state) => state.fetchUserData);

  const code = searchParams.get("code");

  if (!code) {
    return <Navigate to="/login" replace />;
  }

  use(getAuthPromise(code, fetchUserData));

  return <Navigate to="/" replace />;
}

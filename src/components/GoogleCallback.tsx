import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api, { setAccessToken } from "@/services/api";
import { useUserStore } from "@/store/useUserStore";

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fetchUserData = useUserStore((state) => state.fetchUserData);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      api
        .post("account/dj-rest-auth/google/", { code })
        .then((res) => {
          setAccessToken(res.data.access);

          fetchUserData();

          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
          console.error("Message:", err.message);
        });
    }
  }, [searchParams]);

  return <div>Verifying with Google...</div>;
}

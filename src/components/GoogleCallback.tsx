// components/GoogleCallback.tsx hoặc xử lý trong App.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api, { setAccessToken } from "@/services/api";
import { useUserStore } from "@/store/useUserStore";

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      api
        .post("/dj-rest-auth/google/", { code })
        .then((res) => {

          setAccessToken(res.data.access);

          setUser({
            email: res.data.user.email,
            id: res.data.user.pk,
            userName: res.data.user.username,
          });

          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
          console.error("Message:", err.message);
        });
    }
  }, [searchParams]);

  return <div>Đang xác thực với Google...</div>;
}

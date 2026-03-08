import config from "@/config";
import { useState } from "react";

export function useOAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = () => {
    setIsLoading(true);
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: config.googleCallback,
      client_id: config.googleClientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options).toString();
    window.location.href = `${rootUrl}?${qs}`;
  };

  return { loginWithGoogle, isLoading };
}

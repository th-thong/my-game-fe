import { useState } from "react";

export function useOAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = () => {
    setIsLoading(true);
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_CALLBACK_URL as string,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
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
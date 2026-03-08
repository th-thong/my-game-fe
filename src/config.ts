const config = {
  apiUrl: window._env_?.VITE_API_URL || "http://localhost:80",
  googleCallback: window._env_?.VITE_GOOGLE_CALLBACK_URL || "http://localhost:5173/auth/google/callback",
  googleClientId: window._env_?.VITE_GOOGLE_CLIENT_ID || "",
  ingameStatApi: window._env_?.VITE_INGAME_STAT_URL || "http://localhost:5173/"
};

export default config;
const config = {
  apiUrl: window._env_?.VITE_API_URL || "http://localhost:80",
  googleCallback:
    window._env_?.VITE_GOOGLE_CALLBACK_URL ||
    "http://localhost:5173/auth/google/callback",
  googleClientId: window._env_?.VITE_GOOGLE_CLIENT_ID || "",
  imageUrl: window._env_?.VITE_IMAGE_URL || "",
};

export default config;

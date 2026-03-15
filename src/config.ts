const config = {
  apiUrl: window._env_?.VITE_API_URL || "http://localhost:80",
  imageUrl: window._env_?.VITE_IMAGE_URL || "",
  firebaseApiKey: window._env_?.VITE_API_KEY || "",
  firebaseAuthDomain: window._env_?.VITE_AUTH_DOMAIN || "",
  firebaseProjectId: window._env_?.VITE_PROJECT_ID || "",
  firebaseStorageBucket: window._env_.VITE_STORAGE_BUCKET || "",
  firebaseMsgId: window._env_?.VITE_MSG_SENDER_ID || "",
  firebaseAppId: window._env_.VITE_APP_ID || "",
};

export default config;

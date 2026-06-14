import config from "@/config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMsgId,
  appId: config.firebaseAppId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = config.authMode ? getAuth(app) : null;
const googleProvider = config.authMode ? new GoogleAuthProvider() : null;

export { auth, googleProvider };

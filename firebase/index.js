import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlAsfxCAKLQ35rR3eSpCmo3ySz13Yqfws",
  authDomain: "farmart-d4c15.firebaseapp.com",
  projectId: "farmart-d4c15",
  storageBucket: "farmart-d4c15.appspot.com",
  messagingSenderId: "106480352433",
  appId: "1:106480352433:web:cf0d36fb6184fe95e03690",
  measurementId: "G-X4Q800LQ4H",
};
let app = initializeApp(firebaseConfig);

function getFirebaseStorage() {
  return getStorage(app);
}

export default { getFirebaseStorage: getFirebaseStorage };

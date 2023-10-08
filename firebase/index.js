import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import utils from '../utils.js'

const firebaseConfig = {
  apiKey: utils.API_KEY,
  authDomain: "farmart-d4c15.firebaseapp.com",
  projectId: "farmart-d4c15",
  storageBucket: "farmart-d4c15.appspot.com",
  messagingSenderId: "106480352433",
  appId: utils.APP_ID,
  measurementId: "G-X4Q800LQ4H",
};
let app = initializeApp(firebaseConfig);

function getFirebaseStorage() {
  return getStorage(app);
}

export default { getFirebaseStorage: getFirebaseStorage };

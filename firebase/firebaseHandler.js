import firebase from "./index.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = firebase.getFirebaseStorage();
const uploadFile = async (file, refName) => {
  let downloadLink = "";
  const storageRef = ref(storage, "images/" + refName);
  const metadata = {
    contentType: file.mimetype,
  };
  const uploadTask = uploadBytes(storageRef, file.buffer, metadata);

  const uploadResult = await uploadTask;
  downloadLink = await getDownloadURL(uploadResult.ref);

  return downloadLink;
};

const deleteFile = async (refName) => {
  try {
    const imageRef = ref(storage, "images/" + refName);
    await deleteObject(imageRef);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
export default { uploadFile, deleteFile };

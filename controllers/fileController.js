import FileModel from "../models/fileModel.js";
import FirebaseHandlers from "../firebase/firebaseHandler.js";
import ShortUniqueId from "short-unique-id";

export const uploadFileCon = async (req, res) => {
  try {
    const refName = `${Date.now()}_${req.file.originalname}`;
    const downloadUrl = await FirebaseHandlers.uploadFile(req.file, refName);
    const uid = new ShortUniqueId({ length: 6 });
    const newFile = {
      fileUrl: downloadUrl,
      shortLink: uid.rnd(),
      originalName: req.file.originalname,
      name: refName,
      userId: req.userId,
      size: req.file.size,
      format: req.file.mimetype,
    };
    const savedFile = await FileModel.create(newFile);

    return res.status(200).json(savedFile);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const viewFile = async (req, res) => {
  try {
    const image = req.params.image;
  
    const file = await FileModel.findOne({ shortLink: image });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    return res.status(200).json(file);
  } catch (err) {
    console.log(err);
    console.log(errr.trace());
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const userId = req.userId;
    const files = await FileModel.find({ userId });
    if (files.length === 0) {
      return res
        .status(200)
        .json({ message: "No files found. Please Upload Some Files" });
    }
    return res.status(200).json(files);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const file = await FileModel.findOne({ userId, _id: id });
    if (!file) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    await FirebaseHandlers.deleteFile(file.name);
    await FileModel.deleteOne({ userId, _id: id });

    return res.status(200).json({ message: "File Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

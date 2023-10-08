import express from "express";
const router = express.Router();
import multer from "multer";
import auth from "../middleware/auth.js";
import {
  getAllFiles,
  uploadFileCon,
  viewFile,
  deleteFile,
} from "../controllers/fileController.js";
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/health", (req, res) => res.status(200).json("File Route Working"));
router.post("/upload", auth, upload.single("file"), uploadFileCon);
router.get("/getFiles", auth, getAllFiles);
router.get("/view/:image", auth, viewFile);
router.delete("/:id", auth, deleteFile);
export default router;

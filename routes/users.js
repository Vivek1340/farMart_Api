import express from "express";
import { signInUser, signUpUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/health", (req, res) => res.status(200).json("User Route Working"));
router.post("/signin", signInUser);
router.post("/signup", signUpUser);
export default router;

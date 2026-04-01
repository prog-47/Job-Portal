import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../midllewares/AuthMidlleware.js';
import upload from '../midllewares/UploadMidlleware.js'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/upload-image", upload.single("image"), (req, res) => {
 if (!req.file) {
  return res.status(400).json({ message: "No file uploaded" });
 }
 const imageUrl = `${req.protocol}://${req.get("host")}/uploads/
 /${req.file.filename}`;
 
 res.status(200).json({ imageUrl });
 });
export default router;
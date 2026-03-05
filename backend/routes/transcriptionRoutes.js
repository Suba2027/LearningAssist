import express from "express";
import { transcribeAudio } from "../controllers/transcriptionController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/transcribe", upload.single("audio"), transcribeAudio);

export default router;

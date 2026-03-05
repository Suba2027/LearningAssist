import express from 'express';
import multer from 'multer';
import {
  generateFlashcards,
  generateQuiz,
  generateSummary,
  chat,
  explainConcept,
  getChatHistory
} from '../controllers/aiController.js';
import protect from '../middleware/auth.js';
import { transcribeAudio } from '../controllers/transcriptionController.js';  

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.use(protect);

router.post('/generate-flashcards', generateFlashcards);
router.post('/generate-quiz', generateQuiz);
router.post('/generate-summary', generateSummary);
router.post('/chat', chat);
router.post('/explain-concept', explainConcept);
router.get('/chat-history/:documentId', getChatHistory);
router.post("/transcribe", upload.single("audio"), transcribeAudio);

export default router;

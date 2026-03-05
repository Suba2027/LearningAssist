import fs from "fs";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export const transcribeAudio = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const transcript = await client.transcripts.transcribe({
      audio: fs.createReadStream(req.file.path),

      // ✅ REQUIRED (array, not string)
      speech_models: ["universal-2"],
    });

    fs.unlinkSync(req.file.path); // cleanup

    res.status(200).json({
      success: true,
      text: transcript.text,
    });
  } catch (error) {
    next(error);
  }
};

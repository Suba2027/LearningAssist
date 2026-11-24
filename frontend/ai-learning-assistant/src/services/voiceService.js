import axios from "axios";

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const token = localStorage.getItem("token"); // 👈 SAME TOKEN AS CHAT

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/ai/transcribe`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
    }
  );

  return res.data.text;
};

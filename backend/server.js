const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Updated Yes/No questions
const questions = [
  { id: 1, question: "Do you often feel mentally drained after your shift?" },
  { id: 2, question: "Have you skipped meals or breaks due to work pressure?" },
  { id: 3, question: "Do you feel like your work affects your sleep quality?" },
  { id: 4, question: "Have you experienced headaches or fatigue during work?" },
  { id: 5, question: "Do you struggle to maintain focus for long periods?" },
  { id: 6, question: "Do you feel anxious about missing an alert or incident?" },
  { id: 7, question: "Have you considered switching jobs due to stress?" },
  { id: 8, question: "Do you find it difficult to balance work and personal life?" },
  { id: 9, question: "Do you feel supported by your team during high-pressure situations?" },
  { id: 10, question: "Do you believe your workload is manageable?" }
];

// ✅ API Route to Get Questions
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

// ✅ API Route to Save Burnout Level
app.post("/api/save-burnout", (req, res) => {
  const { burnoutLevel, answers } = req.body;

  if (burnoutLevel === undefined || !answers) {
    return res.status(400).json({ error: "Missing required data" });
  }

  console.log("🔥 Received Burnout Data:", { burnoutLevel, answers });

  res.json({
    message: "✅ Burnout level saved successfully!",
    data: { burnoutLevel, answers, timestamp: new Date().toISOString() },
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});





import React, { useState, useEffect } from "react";

function App() {
  const [burnoutLevel, setBurnoutLevel] = useState(0); // 🔹 Default is now 0
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // ✅ Fetch questions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  // ✅ Handle Yes/No Answer Selection
  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => {
      const updatedAnswers = { ...prev, [id]: value };
      updateBurnoutLevel(updatedAnswers);
      return updatedAnswers;
    });
  };

  // 🔹 Dynamically Adjust Burnout Level
  const updateBurnoutLevel = (updatedAnswers) => {
    const yesCount = Object.values(updatedAnswers).filter(ans => ans === "Yes").length;
    const totalQuestions = questions.length || 1; // Avoid division by 0
    const newBurnoutLevel = Math.round((yesCount / totalQuestions) * 100);
    setBurnoutLevel(newBurnoutLevel);
  };

  // ✅ Submit Burnout Level & Answers to Backend
  const handleSubmit = () => {
    const formattedAnswers = Object.values(answers);

    fetch("http://localhost:5000/api/save-burnout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ burnoutLevel, answers: formattedAnswers }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
        setMessage("✅ Burnout level saved successfully!");
        generateRecommendation(burnoutLevel);
      })
      .catch((err) => console.error("Error:", err));
  };

  // 🔹 Generate Recommendations Based on Burnout Level
  const generateRecommendation = (level) => {
    if (level === 0) {
      setRecommendation("🎯 No burnout detected! Keep up the healthy balance.");
    } else if (level <= 30) {
      setRecommendation("✅ You have a healthy work-life balance! Keep maintaining breaks and self-care.");
    } else if (level <= 60) {
      setRecommendation("⚠️ Moderate burnout detected. Consider setting boundaries at work and taking more rest.");
    } else {
      setRecommendation("🚨 High burnout level! Prioritize self-care, take breaks, and talk to a professional if needed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-10 w-full max-w-lg text-center border border-gray-700">
        <h1 className="text-3xl font-semibold mb-6 tracking-wide text-gray-200">
          SOC Burnout Meter
        </h1>

        {/* 🔹 Burnout Level Display */}
        <div className="text-6xl font-bold my-4 text-cyan-400">{burnoutLevel}%</div>

        {/* 🔹 Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={burnoutLevel}
          className="w-full cursor-pointer accent-cyan-400"
          disabled
        />

        {/* 🔹 Questions Section */}
        <div className="mt-6 text-gray-200">
          <h2 className="text-xl font-semibold mb-2">Answer These Questions:</h2>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="text-lg">{q.question}</p>
              <button
                className={`px-4 py-2 rounded-lg mr-2 ${
                  answers[q.id] === "Yes" ? "bg-cyan-500" : "bg-gray-700"
                }`}
                onClick={() => handleAnswerChange(q.id, "Yes")}
              >
                Yes
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  answers[q.id] === "No" ? "bg-red-500" : "bg-gray-700"
                }`}
                onClick={() => handleAnswerChange(q.id, "No")}
              >
                No
              </button>
            </div>
          ))}
        </div>

        {/* 🔹 Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Submit Burnout Level
        </button>

        {/* 🔹 Success Message */}
        {message && <p className="mt-4 text-green-400">{message}</p>}

        {/* 🔹 Recommendations */}
        {recommendation && (
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
            <h3 className="text-lg font-semibold">🔹 Recommendations:</h3>
            <p className="mt-2">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;














     
















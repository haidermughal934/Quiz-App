import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizForm() {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = `${import.meta.env.VITE_API_URL}?amount=${amount}&type=multiple`;
    console.log(apiUrl);

    
    if (category !== "any") apiUrl += `&category=${category}`;
    if (difficulty !== "any") apiUrl += `&difficulty=${difficulty}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      console.log("API URL:", apiUrl); // ✅ debug
      console.log("API response:", data);

      if (data.response_code === 0 && data.results.length > 0) {
        navigate("/quiz", { state: { questions: data.results } });
      } else {
        alert("No multiple-choice questions found! Try different options.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch quiz data.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 rounded-3"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary"> Quiz Setup</h2>
        <form onSubmit={handleSubmit}>
          {/* Number of Questions */}
          <div className="mb-3">
            <label htmlFor="amount" className="form-label fw-semibold">
              Number of Questions
            </label>
            <select
              id="amount"
              className="form-select"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">
              Select Category
            </label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="any">Any Category</option>
              <option value="19">Science: Mathematics</option>
              <option value="18">Science: Computers</option>
              <option value="30">Science: Gadgets</option>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="28">Vehicles</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="mb-3">
            <label htmlFor="difficulty" className="form-label fw-semibold">
              Select Difficulty
            </label>
            <select
              id="difficulty"
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizForm;

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import he from "he";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="alert alert-warning shadow-lg p-4 text-center">
          opps! No quiz data found. Please go back and start again.
          <div className="mt-3">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
               Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const options = [...q.incorrect_answers, q.correct_answer].sort();

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [current]: answer });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = Object.entries(answers).filter(
    ([idx, ans]) => questions[idx].correct_answer === ans
  ).length;

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: "600px", width: "100%" }}>
        {!showResult ? (
          <>
            <h4 className="mb-3 text-primary">
              Question {current + 1} of {questions.length}
            </h4>
            <p className="fw-semibold">{he.decode(q.question)}</p>

            <div className="list-group mb-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`list-group-item list-group-item-action ${
                    answers[current] === opt ? "active" : ""
                  }`}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrent(Math.max(current - 1, 0))}
                disabled={current === 0}
              >
                ⬅️ Previous
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                {current === questions.length - 1 ? "Finish" : "Next ➡️"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-success">Congratulation Quiz Completed!</h3>
            <p className="fs-5">
              You scored <strong>{score}</strong> out of{" "}
              <strong>{questions.length}</strong>
            </p>
            <p>or</p>
            <button
              className="btn btn-outline-primary mt-3"
              onClick={() => navigate("/")}
            >
               Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;

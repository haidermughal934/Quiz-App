import { Routes, Route } from "react-router-dom";
import './index.css'
import './App.css'
import QuizForm from "./QuizForm";
import QuizPage from "./QuizPage";

function App() {
  return (

      <Routes>
        <Route path="/" element={<QuizForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route
        path="*"
        element={
          <div className="container mt-5 text-center">
            <div className="alert alert-danger shadow-sm">
               Page not found!
            </div>
          </div>
        }
      />
      </Routes>

  );
}

export default App;

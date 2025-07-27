import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import SurveyForm from "./components/SurveyForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;

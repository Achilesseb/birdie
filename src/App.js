import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Home from "./components/HomeComponent/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div class="h-full w-full">
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

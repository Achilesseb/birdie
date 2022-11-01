import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Home from "./components/HomeComponent/Home.jsx";
import Chat from "./components/ChatComponent/Chat";
import SignUpForm from "./components/SignUpComponent/SignUp";
import People from "./components/PeopleComponent/People";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { supabase } from "./index";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user);
    setError(error);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="chat/:id" element={<Chat user={user} />} />
          <Route exact path="user/:uuid/people" element={<People />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

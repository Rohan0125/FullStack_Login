import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import UserPage from "./components/UserPage";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RegistrationForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;

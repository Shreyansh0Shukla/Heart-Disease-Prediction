import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeartForm from "./components/HeartForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import About from "./components/About";
import Instructions from "./components/Instructions";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute"
const App = () => (
  <Router>
    <Navbar /> {/* ✅ Replaces your <nav> block */}

    <Routes>
    <Route path="/predict" element={
  <PrivateRoute>
    <HeartForm />
  </PrivateRoute>
} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/predict" element={<HeartForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/instructions" element={<Instructions />} />
    </Routes>
  </Router>
);

export default App;

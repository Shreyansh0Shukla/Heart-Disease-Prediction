// src/components/Login.jsx
import React, { useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(email, password);
      navigate("/predict");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
  const [StudentEmail, setStudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        StudentEmail,
        password,
      });

      if (res.data.user) {
        setMessage("Login successful!");
        navigate("/home"); // Redirect to Home
      } else {
        setMessage(res.data.error);
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={StudentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        /><br/><br/>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;

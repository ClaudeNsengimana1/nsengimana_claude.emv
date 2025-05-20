import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

const AB = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout");
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Home Page!</h1>
      <p>You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      
    </div>
  );
};

export default AB;

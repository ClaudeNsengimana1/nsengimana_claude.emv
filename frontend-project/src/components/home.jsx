import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const Home = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    axios
      .get("http://localhost:3000/check", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          console.log("User is logged in");
        } else {
          alert("User is not logged in");
          navigate("/login"); // Redirect to login page
        }
      })
      .catch((error) => {
        console.log("Error checking login:", error);
        navigate("/login"); // Redirect even on error
      });
  };

  useEffect(() => {
    checkLogin();
  }, []); // Run once when component mounts

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav style={styles.navbar}>
        <div style={styles.leftLinks}>
          <Link to="/home" style={styles.link}>Home</Link>
          <Link to="/report" style={styles.link}>Report</Link>
          <Link to="/about" style={styles.link}>About</Link>
        </div>
        <div>
          <button onClick={handleLogout} style={styles.logout}>Logout</button>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ padding: "20px" }}>
        <h1>Welcome to Home Page!</h1>
        <p>You are logged in.</p>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  navbar: {
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    alignItems: "center",
  },
  leftLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Home;

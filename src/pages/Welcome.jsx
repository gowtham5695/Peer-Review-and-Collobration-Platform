import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/theme.css"
function Welcome() {
  return (
    <div className="center-page">
      <h1>Peer Review & Collaboration Platform</h1>
      <p>Enhancing Learning Through Peer Evaluation</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ marginRight: "15px" }}>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
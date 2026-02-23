import React from "react";

function StudentTeams() {
  return (
    <div>
      <h2>Team Collaboration</h2>
      <p>Create and manage your project teams here.</p>

      <div style={{ marginTop: "20px" }}>
        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "10px"
        }}>
          <h3>AI Research Team</h3>
          <p>Members: 3</p>
          <button className="primary-btn">Enter Room</button>
        </div>
      </div>
    </div>
  );
}

export default StudentTeams;
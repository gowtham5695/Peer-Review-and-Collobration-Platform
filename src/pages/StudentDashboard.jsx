import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("submit");

  // 🆕 Team Chat States
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Get logged in user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const mockAssignments = [
    { id: 1, title: "AI Project", deadline: "20 Feb 2026" },
    { id: 2, title: "Web Development Project", deadline: "25 Feb 2026" }
  ];

  const mockReviews = [
    { id: 1, reviewer: "Rahul", rating: 4, comment: "Good work!" },
    { id: 2, reviewer: "Anjali", rating: 5, comment: "Excellent explanation." }
  ];

  // 🆕 Team Data
  const mockTeams = [
    { id: 1, name: "AI Research Team", members: 3 },
    { id: 2, name: "Web Dev Team", members: 4 }
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // 🔥 Send Message + Save to localStorage
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: currentUser?.name || "Student",
      text: newMessage,
      time: new Date().toLocaleTimeString()
    };

    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setNewMessage("");

    // Save messages per team
    localStorage.setItem(
      `team_${selectedTeam.id}_messages`,
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Student Panel</h2>

        <button
          className={activeSection === "submit" ? "active-btn" : ""}
          onClick={() => setActiveSection("submit")}
        >
          Submit Project
        </button>

        <button
          className={activeSection === "assigned" ? "active-btn" : ""}
          onClick={() => setActiveSection("assigned")}
        >
          Assigned Reviews
        </button>

        <button
          className={activeSection === "feedback" ? "active-btn" : ""}
          onClick={() => setActiveSection("feedback")}
        >
          Feedback Summary
        </button>

        {/* 🆕 Team Collaboration */}
        <button
          className={activeSection === "teams" ? "active-btn" : ""}
          onClick={() => setActiveSection("teams")}
        >
          Team Collaboration
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          Welcome {currentUser?.name || "Student"}
        </div>

        {/* Submit Section */}
        {activeSection === "submit" && (
          <div>
            <h2>Submit Project</h2>
            <select>
              {mockAssignments.map((assignment) => (
                <option key={assignment.id}>
                  {assignment.title}
                </option>
              ))}
            </select>
            <br /><br />
            <input type="file" />
            <br /><br />
            <button>Upload</button>
          </div>
        )}

        {/* Assigned Reviews */}
        {activeSection === "assigned" && (
          <div>
            <h2>Assigned Reviews</h2>
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="card">
                <h3>{assignment.title}</h3>
                <p>Deadline: {assignment.deadline}</p>
                <textarea placeholder="Write your review..." />
                <br /><br />
                <select>
                  <option>Rating</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <br /><br />
                <button>Submit Review</button>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Summary */}
        {activeSection === "feedback" && (
          <div>
            <h2>Feedback Summary</h2>
            {mockReviews.map((review) => (
              <div key={review.id} className="card">
                <h3>Reviewer: {review.reviewer}</h3>
                <p>Rating: ⭐ {review.rating}</p>
                <p>Comment: {review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* 🆕 Team Collaboration Section */}
        {activeSection === "teams" && (
          <div>
            {!selectedTeam ? (
              <>
                <h2>Team Collaboration</h2>

                {mockTeams.map((team) => (
                  <div key={team.id} className="card">
                    <h3>{team.name}</h3>
                    <p>Members: {team.members}</p>
                    <button
                      onClick={() => {
                        setSelectedTeam(team);

                        const savedMessages = localStorage.getItem(
                          `team_${team.id}_messages`
                        );

                        if (savedMessages) {
                          setMessages(JSON.parse(savedMessages));
                        } else {
                          setMessages([]);
                        }
                      }}
                    >
                      Enter Room
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h2>{selectedTeam.name} - Chat Room</h2>

                <button
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    setSelectedTeam(null);
                    setMessages([]);
                  }}
                >
                  ← Back to Teams
                </button>

                <div
                  style={{
                    height: "250px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    overflowY: "auto",
                    background: "#fff"
                  }}
                >
                  {messages.length === 0 && <p>No messages yet...</p>}

                  {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <strong>{msg.sender}</strong> ({msg.time}): {msg.text}
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message..."
                  style={{ width: "70%", padding: "8px" }}
                />

                <button
                  onClick={handleSendMessage}
                  style={{ marginLeft: "10px" }}
                >
                  Send
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
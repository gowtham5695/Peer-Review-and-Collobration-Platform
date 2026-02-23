import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("create");

  // ✅ Get logged in user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [assignments, setAssignments] = useState([
    { id: 1, title: "AI Project", deadline: "20 Feb 2026" },
    { id: 2, title: "Web Development", deadline: "25 Feb 2026" }
  ]);

  const [students] = useState([
    "Rahul",
    "Anjali",
    "Kiran",
    "Sneha"
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    deadline: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.deadline) {
      setAssignments([
        ...assignments,
        {
          id: assignments.length + 1,
          title: newAssignment.title,
          deadline: newAssignment.deadline
        }
      ]);
      setNewAssignment({ title: "", deadline: "" });
      alert("Assignment Created Successfully!");
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <button
          className={activeSection === "create" ? "active-btn" : ""}
          onClick={() => setActiveSection("create")}
        >
          Create Assignment
        </button>

        <button
          className={activeSection === "view" ? "active-btn" : ""}
          onClick={() => setActiveSection("view")}
        >
          View Assignments
        </button>

        <button
          className={activeSection === "submissions" ? "active-btn" : ""}
          onClick={() => setActiveSection("submissions")}
        >
          View Submissions
        </button>

        <button
          className={activeSection === "students" ? "active-btn" : ""}
          onClick={() => setActiveSection("students")}
        >
          Manage Students
        </button>

        {/* 🆕 NEW TRACKING BUTTON */}
        <button
          className={activeSection === "tracking" ? "active-btn" : ""}
          onClick={() => setActiveSection("tracking")}
        >
          Track Team Collaboration
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <div className="topbar">
          Welcome {currentUser?.name || "Admin"}
        </div>

        {/* CREATE ASSIGNMENT */}
        {activeSection === "create" && (
          <div>
            <h2>Create Assignment</h2>
            <input
              type="text"
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
            />
            <br /><br />
            <input
              type="date"
              value={newAssignment.deadline}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, deadline: e.target.value })
              }
            />
            <br /><br />
            <button onClick={handleCreateAssignment}>
              Create
            </button>
          </div>
        )}

        {/* VIEW ASSIGNMENTS */}
        {activeSection === "view" && (
          <div>
            <h2>All Assignments</h2>
            {assignments.map((assignment) => (
              <div key={assignment.id} className="card">
                <h3>{assignment.title}</h3>
                <p>Deadline: {assignment.deadline}</p>
              </div>
            ))}
          </div>
        )}

        {/* SUBMISSIONS */}
        {activeSection === "submissions" && (
          <div>
            <h2>Submissions</h2>
            <div className="card">
              <h3>AI Project</h3>
              <p>Submitted by: Rahul</p>
              <button>View File</button>
              <button>Assign Reviewer</button>
            </div>
          </div>
        )}

        {/* MANAGE STUDENTS */}
        {activeSection === "students" && (
          <div>
            <h2>Registered Students</h2>
            {students.map((student, index) => (
              <div key={index} className="card">
                <h3>{student}</h3>
                <button>Remove</button>
              </div>
            ))}
          </div>
        )}

        {/* 🆕 TEAM TRACKING SECTION */}
        {activeSection === "tracking" && (
          <div>
            <h2>Team Collaboration Tracking</h2>

            {[1, 2].map((teamId) => {
              const saved = localStorage.getItem(`team_${teamId}_messages`);

              return (
                <div key={teamId} className="card">
                  <h3>Team {teamId}</h3>

                  {!saved ? (
                    <p>No activity yet.</p>
                  ) : (
                    JSON.parse(saved).map((msg, index) => (
                      <div key={index}>
                        <strong>{msg.sender}</strong> ({msg.time}): {msg.text}
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
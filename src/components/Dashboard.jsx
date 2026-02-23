import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2>Peer Review & Collaboration Platform</h2>
        <p>
          Collaborate on projects, review peers, and enhance learning through
          structured feedback.
        </p>

        <button onClick={handleStart}>Get Started</button>
      </div>
    </div>
  );
}

export default Dashboard;
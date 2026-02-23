import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import "../Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonColor: "#6a11cb",
      });
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
      title: "Registered!",
      text: "Account created successfully!",
      icon: "success",
      confirmButtonColor: "#6a11cb",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "white", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
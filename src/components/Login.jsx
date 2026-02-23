import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import "../Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      Swal.fire({
        title: "Success!",
        text: "Logged in Successfully!",
        icon: "success",
        confirmButtonColor: "#6a11cb",
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Invalid Email or Password!",
        icon: "error",
        confirmButtonColor: "#6a11cb",
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "white", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
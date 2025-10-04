import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store"; // import user slice action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUserState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserState({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://vendorbackend-bzzr.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Login failed: " + data.error);
        return;
      }

      // Save token (if needed)
      localStorage.setItem("token", data.token);

    dispatch(setUser({
  _id: data.user._id,   // <--- important
  name: data.user.name,
  email: data.user.email
}));




      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-body">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;

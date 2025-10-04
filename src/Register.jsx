import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store"; // import Redux action

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://vendorbackend-bzzr.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Registration failed: " + data.error);
        return;
      }

      // ✅ Automatically log in after registration
      dispatch(setUser({ name: newUser.name, email: newUser.email }));
      localStorage.setItem("token", data.token || ""); // optional token if backend provides
      alert("Registration successful! You are now logged in.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-body">
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;

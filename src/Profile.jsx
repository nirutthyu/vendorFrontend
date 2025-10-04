import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "./store";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Access directly

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user.isLoggedIn) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

const updateProfile = async () => {
  try {
    const res = await fetch(`https://vendorbackend-bzzr.onrender.com/api/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(setUser({ ...user, name: data.name, email: data.email }));
      alert("Profile updated!");
    } else {
      alert(data.error || "Failed to update profile");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating profile");
  }
};

const deleteProfile = async () => {
  if (!window.confirm("Delete your account?")) return;
  try {
    const res = await fetch(`https://vendorbackend-bzzr.onrender.com/api/users/${user.email}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      alert("Account deleted!");
      dispatch(clearUser());
    } else {
      alert(data.error || "Failed to delete account");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting account");
  }
};


  if (!user.isLoggedIn) return <p>Please login first</p>;

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <input
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary me-2" onClick={updateProfile}>
        Update
      </button>
      <button className="btn btn-danger" onClick={deleteProfile}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;

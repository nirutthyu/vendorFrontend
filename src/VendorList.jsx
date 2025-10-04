import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorList = () => {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("https://vendorbackend-bzzr.onrender.com/api/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const handleVendorClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`);
  };

  const filteredVendors = vendors
    .filter((v) => v.name.toLowerCase().startsWith(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div>
      <header>
        <div className="logo">
          <img src="/public/logo.png" alt="Logo" />
        </div>
        <div className="title">
          <h4 style={{ fontFamily: "'Playwrite CU', cursive" }}>
            Find Your Vendor
          </h4>
        </div>
        <nav>
          <ul>
            <li>
              <button onClick={() => navigate("/home")}  className="btn btn-light me-2">Home</button>
            </li>
            <li>
              <button onClick={() => navigate("/vendorList")}  className="btn btn-light me-2">Vendors</button>
            </li>
          </ul>
        </nav>
      </header>
      <br></br>

      <main className="container mt-4">
        {/* Search Input */}
        <div className="search-bar mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            placeholder="Search by vendor name..."
          />
        </div>
        <br></br>

        {/* Sort Dropdown */}
        <div className="sort-dropdown mb-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Vendor Cards */}
        <div className="vendor-list d-flex flex-wrap justify-content-around">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor._id}
              className="vendor-card"
              onClick={() => handleVendorClick(vendor._id)}
              style={{ cursor: "pointer", marginBottom: "20px" }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5zQ8_hzz-tUHMgsK6PqY8KcCrq4wCgMnmQ&s"
                alt={vendor.name}
              />
              <div className="vendor-details p-3">
                <h3>{vendor.name}</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i> Location:{" "}
                  {vendor.location}
                </p>
                <p>
                  <i className="fas fa-star"></i> Rating: {vendor.rating}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleVendorClick(vendor._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center p-3" style={{ background: "#56738d", color: "#fff" }}>
        <p>&copy; 2024 Foodie Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorList;

import React, {  useEffect, useState, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import Contact from "./Contact";

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [aboutActive, setAboutActive] = useState(false);
  const aboutRef = useRef(null);
  const navigate = useNavigate(); // ✅ added parentheses

  useEffect(() => {
    fetch("https://vendorbackend-bzzr.onrender.com/api/vendors") // fixed port slash
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAboutActive(true);
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
    <>
      {/* Header */}
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
              <button onClick={() => scrollToId("about")} className="btn btn-light me-2">About</button>
            </li>
            <li>
              <button onClick={() => scrollToId("contact")} className="btn btn-light me-2">Contact</button>
            </li>
            <li>
              <button onClick={() => navigate("/profile")} className="btn btn-light me-2">Profile</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h1>Welcome to Find Your Vendor</h1>
        <p>Discover fresh produce from local vendors</p>
        <a href="#freshProduce">
          <button className="cta-button">View Our Selection</button>
        </a>
      </section>

      {/* Food Categories */}
      <main>
        <div
          id="freshProduce"
          className="container-fluid d-flex flex-row justify-content-around food-buttons"
        >
          {[
            { label: "Vegetables", img: "https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg" },
            { label: "Fruits", img: "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg" },
            { label: "Dairy", img: "https://www.datocms-assets.com/20941/1665663448-what-are-dairy-foods.png" },
            { label: "Meat", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCjtSFPEawy391jWlLxBLVvg_ygG5_ThjEKw&s" },
            { label: "Eggs", img: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/health-benefits-of-eggs-732x549-thumbnail-732x549.jpg" },
            { label: "Bakery", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoun3SMuXV1QncGsoGxFMzCfSAu0BwOaaUIA&s" },
          ].map((cat, idx) => (
            <Link to="/vendorList" className="foodBtn" key={idx}>
              <div><img className="foodImg" src={cat.img} alt={cat.label} /></div>
              <div><p>{cat.label}</p></div>
            </Link>
          ))}
        </div>
        <hr />

        {/* Vendor List */}
        <div className="container-fluid d-flex flex-row justify-content-around vendor-buttons">
          {vendors
            .filter((v) => v.name.toLowerCase().startsWith(search.toLowerCase()))
            .map((vendor) => (
              <Link
                to={`/vendor/${vendor._id}`}
                className="foodBtn"
                key={vendor._id}
              >
                <div>
                  <img
                    className="restImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5zQ8_hzz-tUHMgsK6PqY8KcCrq4wCgMnmQ&s"
                    alt={vendor.name}
                  />
                </div>
                <div>
                  <p>{vendor.name}</p>
                </div>
              </Link>
            ))}
        </div>

        {/* About Section */}
        <section id="about" ref={aboutRef} className={`about ${aboutActive ? "active" : ""}`}>
          <h2>About Us</h2>
          <div className="content">
            <img src="/public/logo.png" alt="About Us" className="about-image" />
            <div className="about-text">
              <p>
                Find Your Vendor is dedicated to bringing you the freshest produce
                directly from local vendors. We believe in supporting local farmers
                and promoting sustainable practices. Our commitment to quality
                ensures that every item you order meets our highest standards.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      <footer>
        <p>&copy; 2024 Find Your Vendor. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;

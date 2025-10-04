import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store"; // import the correct action
import "bootstrap/dist/css/bootstrap.min.css";

const VendorPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [traces, setTraces] = useState([]);

  // Redux cart state (your slice uses an array, not items object)
  const cart = useSelector((state) => state.cart);

  // Fetch vendor and traces
  useEffect(() => {
    fetch("https://vendorbackend-bzzr.onrender.com/api/vendors")
      .then((res) => res.json())
      .then((vendors) => {
        const selectedVendor = vendors.find((v) => v._id === vendorId);
        if (selectedVendor) {
          setVendor(selectedVendor);
          setMenuItems(
            selectedVendor.products.map((p) => ({
              ...p,
              img:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0YG1HeCra0IJicR2Jh40psehVCQFA4HuCw&s.png",
            }))
          );

          fetch(
            `https://vendorbackend-bzzr.onrender.com/api/traces/${encodeURIComponent(
              selectedVendor.name
            )}`
          )
            .then((res) => res.json())
            .then(setTraces)
            .catch(() => setTraces([]));
        }
      })
      .catch((err) => console.error("Error fetching vendors:", err));
  }, [vendorId]);

  const addToCartHandler = (item) => {
    dispatch(addToCart(item)); // dispatch correct Redux action
  };

  const totalBill = () =>
    cart.reduce((total, item) => total + Number(item.price), 0);

  const filteredMenu = menuItems
    .filter((item) =>
      item.name.toLowerCase().startsWith(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "price") return a.price - b.price;
      return 0;
    });

  if (!vendor) return <p>Loading vendor...</p>;

  return (
    <div className="vendor-page">
      <header className="d-flex align-items-center p-3" style={{ background: "#71899d" }}>
        <h4 className="ms-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {vendor.name}
        </h4>
        <nav className="ms-auto">
          <button onClick={() => navigate("/home")} className="btn btn-light me-2">
            Home
          </button>
          <button onClick={() => navigate("/vendorList")} className="btn btn-light">
            Vendors
          </button>
        </nav>
      </header>

      <div className="container-fluid mt-3 d-flex gap-3">
        {/* Menu Items */}
        <div className="items-container flex-grow-1">
          <div className="d-flex mb-3 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="form-control"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          {filteredMenu.map((item, idx) => (
            <div
              key={idx}
              className="menu d-flex align-items-center mb-3 p-2"
              style={{ background: "#8aa5bc", borderRadius: "15px" }}
            >
              <div className="menuimg me-3">
                <img
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={95}
                  style={{ borderRadius: "5px" }}
                />
              </div>
              <div className="menudetails flex-grow-1">
                <p>
                  {item.name}
                  <br />
                  ₹{item.price} per Kg
                </p>
              </div>
              <button className="btn btn-info" onClick={() => addToCartHandler(item)}>
                Add
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div
          className="bill p-3"
          style={{ background: "#fff", borderRadius: "8px", minWidth: "250px" }}
        >
          <h3>Selected Items</h3>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price} per Kg
              </li>
            ))}
          </ul>
          <h3>Total Bill:</h3>
          <p>₹{totalBill()}</p>
          <button className="btn btn-success" onClick={() => navigate("/payment")}>
            Proceed to Pay
          </button>
        </div>
      </div>

   

      <footer
        className="text-center p-3 mt-4"
        style={{ background: "#71899d", color: "#fff" }}
      >
        Thank you for visiting, Visit again!
      </footer>
    </div>
  );
};

export default VendorPage;

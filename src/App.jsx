import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import VendorList from "./VendorList";
import VendorPage from "./Vendor";
import PaymentPage from "./PaymentPage";
import Profile from "./Profile";
import Orders from "./Order";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
         <Route path="/vendorList" element={<VendorList />} />
         <Route path="/vendor/:vendorId" element={<VendorPage />} />
         <Route path="/payment" element={<PaymentPage />} />
         <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;

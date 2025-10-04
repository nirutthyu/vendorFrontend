import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./store"; // import your clearCart action

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // get cart from Redux store
  const [customer, setCustomer] = useState({ name: "", address: "" });

  // Calculate total bill
  const totalBill = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };

  // Handle input change
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Confirm Payment
  const confirmPayment = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderDetails = {
      customerName: customer.name,
      customerAddress: customer.address,
      items: cart,
      totalAmount: totalBill(),
      orderDate: new Date().toISOString(),
      orderId: Math.floor(Math.random() * 100000),
    };

    try {
      const res = await fetch("https://vendorbackend-bzzr.onrender.com/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) throw new Error("Payment failed");

      alert("Payment successful! Order ID: " + orderDetails.orderId);

      // Clear cart in Redux
      dispatch(clearCart());

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Details</h2>

      <div className="card p-4 mb-4">
        <h4 className="mb-3">Billing Information</h4>
        <form onSubmit={confirmPayment}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="card p-3 mb-4">
            <h4 className="mb-3">Your Cart</h4>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((item, idx) => (
              <p key={idx}>
                {item.name} - ₹{item.price}
              </p>
            ))}
            <h5 className="text-end">Total Amount: ₹{totalBill()}</h5>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

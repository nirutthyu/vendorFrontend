import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`https://vendorbackend-bzzr.onrender.com/api/orders?userEmail=${user.email}`)
      .then((res) => res.json())
      .then(setOrders);
  }, [user]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;
    const res = await fetch(`https://vendorbackend-bzzr.onrender.com/api/orders/${orderId}`, { method: "DELETE" });
    if (res.ok) setOrders((prev) => prev.filter((o) => o._id !== orderId));
  };

  if (!user) return <p>Login to see your orders</p>;

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : null}
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="mb-2">
            {order.items.map((item) => item.name).join(", ")} - ₹{order.totalAmount}
            <button className="btn btn-sm btn-danger ms-2" onClick={() => cancelOrder(order._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;

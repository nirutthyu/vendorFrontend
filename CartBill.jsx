import React from "react";
import { useCart } from "./CartContext";

const CartBill = () => {
  const { cart, clearCart } = useCart();

  const removeItem = (name) => {
    const updated = cart.filter((item) => item.name !== name);
    sessionStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload(); // simplest way, or manage via context
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-section">
      <h3>Your Cart</h3>
      <ul id="selected-items">
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} – ₹{item.price}
            <button
              className="remove-button"
              onClick={() => removeItem(item.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4 id="total-bill">Total: ₹{total}</h4>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartBill;

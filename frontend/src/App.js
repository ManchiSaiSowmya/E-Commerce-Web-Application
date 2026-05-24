import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
function App() {
  // Use state so App re-renders when the logged-in user changes
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("loggedInUser") || "guest");

  // Create a function to update the user state
  const handleUserChange = () => {
    setCurrentUser(localStorage.getItem("loggedInUser") || "guest");
  };

  const cartKey = `cart_${currentUser}`;

  // Your existing cart logic stays the same
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });


  // LOAD CART WHEN USER CHANGES
  useEffect(() => {
    const savedCart = localStorage.getItem(cartKey);

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }
  }, [cartKey]);

  // SAVE CART FOR CURRENT USER
  useEffect(() => {
    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, cartKey]);

  // ADD TO CART
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // UPDATE QUANTITY
  const updateQty = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      
      
      <Route 
      path="/login" 
      element={<Login onLoginSuccess={handleUserChange} />} 
      />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={<Dashboard cartItems={cartItems} />}
      />

      <Route
        path="/products"
        element={
          <Products
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cartItems}
            updateQty={updateQty}
            removeItem={removeItem}
          />
        }
      />
    </Routes>
  );
}

export default App;
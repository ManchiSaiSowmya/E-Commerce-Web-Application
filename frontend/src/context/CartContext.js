import { createContext, useState, useMemo, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Memorize functions so they don't get recreated on every render
  const addToCart = useCallback((item) => {
    setCart((prevCart) => [...prevCart, item]);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter(i => i._id !== id));
  }, []);

  // Memorize the context value object
  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart
  }), [cart, addToCart, removeFromCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
  let existingCart = localStorage.getItem("cart");
  if (existingCart) {
    const parsed = JSON.parse(existingCart);
    const normalized = parsed.map((item) => ({
      ...item,
      cartQuantity: typeof item.cartQuantity === "number" ? item.cartQuantity : 1,
    }));
    setCart(normalized);
    localStorage.setItem("cart", JSON.stringify(normalized));
  }
  setIsCartReady(true);
}, []);


  return (
    <CartContext.Provider value={{ cart, setCart, isCartReady }}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

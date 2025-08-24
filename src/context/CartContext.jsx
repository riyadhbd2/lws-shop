import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]); // products in carts

  // add item to carts function
  const addItem = (product) => {
    setCartData((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  //remove function from cart
  const removeItem = (id) =>
    setCartData((prev) => prev.filter((i) => i.id !== id));

  //   Quantity function
  const setQty = (id, qty) =>
    setCartData((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  // clear cart function
  const clearCart = () => setCartData([]);

  //   total count
  const countItem = cartData.reduce((n, i) => n + i.qty, 0);
  // total Price
  const totalPrice = cartData.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = {
    cartData,
    setCartData,
    addItem,
    removeItem,
    setQty,
    clearCart,
    countItem,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>);
};

export const useCart = ()=> {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

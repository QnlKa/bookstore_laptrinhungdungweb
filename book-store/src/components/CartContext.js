import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //lấy giỏ hàng từ localStorage khi load trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Stored cart from localStorage:", storedCart); // In ra giỏ hàng lưu trữ
    setCart(storedCart);
  }, []);  //đảm bảo chỉ chạy 1 lần khi component được mount

  //cập nhật giỏ hàng và lưu lại vào localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  //lưu giỏ hàng vào localStorage
  };

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.title === book.title);
      if (existingBook) {
        //nếu sách đã tồn tại, tăng số lượng
        const updatedCart = prevCart.map((item) =>
          item.title === book.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
      //nếu sách không tồn tại, thêm mới vào giỏ hàng
      const updatedCart = [...prevCart, { ...book, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const removeFromCart = (bookTitle) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.title !== bookTitle);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const increaseQuantity = (title) => {
    const updatedCart = cart.map(item => 
      item.title === title ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };
  
  const decreaseQuantity = (title) => {
    const updatedCart = cart.map(item => 
      item.title === title && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

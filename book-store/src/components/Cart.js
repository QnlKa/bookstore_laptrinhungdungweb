import React, { useContext } from 'react';
import { CartContext } from './CartContext';  // Import CartContext

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);  // Lấy các phương thức từ CartContext

  // Tính tổng tiền của giỏ hàng
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Xử lý thanh toán tại đây (ví dụ: chuyển hướng đến trang thanh toán)
    alert('Thanh toán thành công!');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn hiện đang trống!</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex justify-between items-center mb-4 p-4 border-b">
              <div className="flex">
                <img src={`http://localhost/book-store-backend/public/images/${item.images}`} alt={item.title} className="w-20 h-20 object-contain mr-4" />
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p>{item.author}</p>
                  <p className="text-sm text-gray-600">{item.price} VNĐ</p>
                  <div className="flex items-center">
                    <button 
                      onClick={() => decreaseQuantity(item.title)} 
                      className="bg-gray-300 text-black px-3 py-1 rounded mr-2 hover:bg-gray-400"
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button 
                      onClick={() => increaseQuantity(item.title)}
                      className="bg-gray-300 text-black px-3 py-1 rounded ml-2 hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.title)}  
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="text-xl font-semibold">
              <p>Tổng thanh toán: {totalPrice}.000 VNĐ</p>
            </div>
            <button onClick={handleCheckout} className="bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition px-6 py-3">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

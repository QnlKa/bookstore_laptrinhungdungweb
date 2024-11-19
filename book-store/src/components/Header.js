import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';  // Import CartContext

const Header = () => {
  const { cart } = useContext(CartContext);  // Lấy cart từ CartContext
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);  // Tính tổng số lượng sản phẩm trong giỏ hàng

  // Giả sử thông tin người dùng đã đăng nhập được lưu trong localStorage
  const user = JSON.parse(localStorage.getItem('user'));  // Thông tin người dùng lưu trữ trong localStorage
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Điều khiển trạng thái dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất (ví dụ: xóa thông tin người dùng trong localStorage)
    localStorage.removeItem('user');
    window.location.href = '/';  // Điều hướng về trang chủ
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="ml-[-1px] max-w-6xl flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/logo.jpg" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center w-4/6 mx-auto border-gray-300 rounded-full p-1">
          <div className="bg-gray-200 p-2 rounded-l-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 10-12 0 6 6 0 0012 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full p-2 border-none focus:outline-none rounded-r-full text-black"
          />
        </div>

        {/* Giỏ hàng */}
        <div className="absolute top-3 right-10 p-4">
          <Link to="/cart" className="flex items-center relative hover:text-gray-300">
            {/* Icon Giỏ hàng */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute bottom-7 left-8 bg-red-500 text-white rounded-full w-5 h-5 text-sm flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Tài khoản */}
        <div className="relative flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              {/* Icon tài khoản */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-white font-bold">{user.username}</span>
            </div>
          ) : (
            <Link to="/login" className="text-white font-bold hover:text-gray-300">Tài khoản</Link>
          )}

          {/* Dropdown menu */}
          {isDropdownOpen && user && (
            <div className="absolute left-3 mt-28 w-40 bg-white text-black rounded-md shadow-lg ">
              <ul>
                <li>
                  <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-lg">Thông tin tài khoản</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-white text-black block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-lg">Đăng xuất</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

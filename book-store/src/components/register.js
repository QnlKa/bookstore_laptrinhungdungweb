import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Thêm state để lưu thông báo thành công
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost/book-store-backend/api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);  // Kiểm tra phản hồi từ API

        if (data.success) {
          setSuccessMessage(data.message); // Hiển thị thông báo thành công
          setError('');  // Xóa lỗi nếu có
          setTimeout(() => {
            navigate('/login');  // Điều hướng đến trang đăng nhập sau khi thành công
          }, 1500); // Đợi một chút rồi điều hướng
        } else if (data.message === 'Tài khoản đã tồn tại') {
          setError('Tài khoản đã tồn tại');
        } else {
          setError(data.message || 'Đăng ký thất bại');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Đã xảy ra lỗi khi đăng ký');
      });
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-20 p-6 bg-white shadow-xl rounded-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Đăng ký</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        {/* Hiển thị thông báo thành công nếu có */}
        {successMessage && (
          <div className="text-green-500 text-sm mt-2">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/login')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Đã có tài khoản? Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); //ngừng hành động mặc định của form

    //kiểm tra nếu chưa nhập đủ thông tin
    if (!username || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    fetch('http://localhost/book-store-backend/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Đăng nhập thành công:', data.user);

          //lưu thông tin người dùng vào localStorage
          localStorage.setItem('user', JSON.stringify(data.user));

          //gọi onLoginSuccess để cập nhật thông tin người dùng
          onLoginSuccess(data.user);

          //kiểm tra role và điều hướng
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/'); 
          }
        } else {
          //thông báo lỗi khi sai tài khoản hoặc mật khẩu
          setError('Sai thông tin tài khoản hoặc mật khẩu');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
      <div className="w-full max-w-xl mx-auto mt-20 p-6 bg-white shadow-xl rounded-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Đăng nhập</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate('/register')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Chưa có tài khoản? Đăng ký ngay
          </button>
        </div>
      </div>
  );
};

export default Login;

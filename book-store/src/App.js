import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // Import useState để quản lý state người dùng
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Register from './components/register';
import { CartProvider } from './components/CartContext'; 

function App() {
  //tạo state để lưu thông tin người dùng
  const [user, setUser] = useState(null);

  //hàm cập nhật thông tin người dùng sau khi đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    setUser(userData); //lưu thông tin người dùng vào state
    localStorage.setItem('user', JSON.stringify(userData)); //lưu thông tin vào localStorage
  };

  return (
    <CartProvider> {/*bao bọc toàn bộ ứng dụng bằng CartProvider*/}
      <Router>
        <Header user={user} /> {/*truyền thông tin người dùng vào Header*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/*truyền hàm handleLoginSuccess vào Login*/}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

import React from "react";
import './Footer.css'; // Đảm bảo rằng file Footer.css đã tồn tại và có các kiểu CSS
import { Link } from "react-router-dom";
import { FaLinkedin, FaSquareGithub, FaFacebook, FaSquareInstagram } from "react-icons/fa6"; // Icon mạng xã hội

const Footer = () => {
  return (
    <footer className="footer-container">
      <h2>Nhà sách Sahafa</h2>
      <div className="container">
        <div className="row footer-content">
          {/* Phần Liên hệ */}
          <div className="footer-column col-4">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <address>Address: Đại học Văn Lang, Thành phố Hồ Chí Minh</address>
              <a href="tel:+84392927737">Phone Number: +84 397956346</a>
              <a href="mailto:minhquan@gmail.com">Email: 11aminhquan@gmail.com</a>
            </div>
            {/* Biểu tượng mạng xã hội */}
            <div className="social-icons grid grid-cols-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaSquareGithub />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaSquareInstagram />
              </a>
            </div>
          </div>

          {/* Phần Thông tin */}
          <div className="footer-column col-3">
            <h4>Information</h4>
            <div className="footer-link">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Refund Policy</Link>
              <Link to="#">Shipping Policy</Link>
              <Link to="#">Terms & Conditions</Link>
              <Link to="#">Blogs</Link>
            </div>
          </div>

          {/* Phần Tài khoản */}
          <div className="footer-column col-3">
            <h4>Account</h4>
            <div className="footer-link">
              <Link to="#">About Us</Link>
              <Link to="#">FAQ</Link>
              <Link to="#">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

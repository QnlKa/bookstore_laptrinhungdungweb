import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';

const BookDetail = () => {
  const { id } = useParams(); // Lấy ID sách từ URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state loading để kiểm soát quá trình tải dữ liệu
  const [error, setError] = useState(null); // Thêm state error để xử lý lỗi
  const { addToCart } = useContext(CartContext);

  // Hàm xử lý thêm vào giỏ hàng
  //const handleAddToCart = () => {
  //  addToCart(book); // Sử dụng context để thêm sách vào giỏ hàng
  //  alert(`Added "${book.title}" to cart!`);
  //};

  useEffect(() => {
    // Gọi API để lấy chi tiết sách từ backend
    fetch(`http://localhost/book-store-backend/api/bookdetail.php?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Book not found');
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false); // Đã tải xong dữ liệu
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Book not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 text-center">{book.title}</h1>
      <div className="w-full flex justify-center">
        <img
          src={`http://localhost/book-store-backend/public/images/${book.images}`}
          alt={book.title}
          className="w-full max-w-md h-auto rounded-lg shadow-md"
          onError={() => console.error('Failed to load image')}
        />
      </div>

      <div className="space-y-4 text-lg text-gray-700">
        <p><strong>Tác giả:</strong> {book.author}</p>
        <p><strong>Thể loại chính:</strong> {book.genre}</p>
        <p>{book.description}</p>
      </div>

      <div className="mb-0 flex justify-center text-xl font-semibold text-gray-900">
        <p>
          <span className="text-lg font-medium"></span>{book.price}₫
        </p>
      </div>

      {/* Nút giỏ hàng */}
      <div className=''>
        <div className='flex justify-center'></div>
      
          <button           
            className="mx-auto flex flex-col px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition w-full max-w-xs">        
            <span className=" text-white font-bold mx-auto">MUA NGAY</span>
            <span className="mx-auto text-white font-normal">Giao hàng tận nơi</span>
          </button>
        </div>
        <div className="flex col-span-2 justify-center gap-10">
          <button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 font-bold h-auto w-2/5 py-3 rounded-lg shadow  max-w-sm" 
            onClick={() => addToCart(book)}
          >Thêm vào giỏ hàng</button>
          <button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 font-bold px-4 py-2 rounded-lg shadow w-2/5 max-w-sm">Xem đánh giá</button>
        </div>
  
    </div>
  );
};

export default BookDetail;

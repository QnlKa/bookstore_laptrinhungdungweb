import React, { useState, useEffect, /*useContext*/ } from 'react';
//import { CartContext } from './CartContext';

const Home = () => {
  //const { addToCart } = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  
  useEffect(() => { //lấy danh sách thể loại sách
    fetch('http://localhost/book-store-backend/api/genre.php')
      .then(response => response.json())
      .then(data => {
        console.log(data); //kiểm tra dữ liệu trả về từ API genres
        setGenres(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  
  useEffect(() => { //lấy danh sách sách theo thể loại đã chọn
    const url = selectedGenre
      ? `http://localhost/book-store-backend/api/books.php?genre=${selectedGenre}`
      : 'http://localhost/book-store-backend/api/books.php';

    fetch(url)
      .then(response => response.json())
      .then(data => {
      setBooks(data);
      })
      .catch(error => console.error('Error:', error));
  }, [selectedGenre]);

  return (
    <div className="flex">
      {/*sidebar for genres */}
      <div className="w-1/6 p-4 bg-gray-200">
  <h2 className="text-xl font-bold mb-4">Danh mục thể loại</h2>
  <ul className="space-y-2">
    <li>
      <button
        className={`w-full text-left p-2 rounded ${selectedGenre === '' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
        onClick={() => setSelectedGenre('')}
      >
        Tất cả
      </button>
    </li>
    {genres.map((genre) => (
      <li key={genre.id}>
        <button
          className={`w-full text-left p-2 rounded ${selectedGenre === genre.name ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`}
          onClick={() => setSelectedGenre(genre.name)}
        >
          {genre.name} {/*hiển thị đúng tên thể loại từ genre.name */}
        </button>
      </li>
    ))}
  </ul>
</div>

      {/*books display */}
      <div className="w-5/6 p-4">
        <h1 className="text-3xl font-bold mb-6">Chào mừng đến với Sahafa</h1>

        <div className="grid grid-cols-4 gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="flex flex-col bg-white border p-4 rounded shadow-md hover:shadow-2xl hover:scale-90 transition duration-300 h-[500px]"
              onClick={() => window.location.href = `/books/${book.id}`}

              >
                <div className="h-3/5 w-full rounded-t-lg">
                  <img
                    src={`http://localhost/book-store-backend/public/images/${book.images}`}
                    alt={book.title}
                    className="h-full w-full object-contain mb-4 mt-4 rounded"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <p className="mt-5 mx-auto font-bold text-red-600 text-lg">{book.price} VNĐ</p>
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p>{book.author}</p>
                  <div className="mt-2">
                  <div><strong>Thể loại: </strong>{book.genres}</div>
                  </div>
                </div>

   
              </div>
            ))
          ) : (
            <p className="text-center text-lg">Không có sách nào</p> //hiển thị thông báo khi không có sách
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

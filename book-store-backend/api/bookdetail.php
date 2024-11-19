<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json'); //trả về dữ liệu dưới dạng JSON

$host = 'localhost';
$db = 'bookstore';  
$user = 'root';     
$pass = '';         

//tạo kết nối
$conn = new mysqli($host, $user, $pass, $db);

//kiểm tra kết nối
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//lấy ID sách từ query string
$bookId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($bookId > 0) {
  //lấy dữ liệu sách từ bảng `book`, cùng thông tin tác giả và thể loại
  $sql = "SELECT b.title, b.price, b.images, b.description, b.author, g.name AS genre 
          FROM book b 
          LEFT JOIN book_genre bg ON b.id = bg.book_id
          LEFT JOIN genre g ON bg.genre_id = g.id
          WHERE b.id = $bookId";
  
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    //lấy dữ liệu sách và trả về dưới dạng JSON
    $book = $result->fetch_assoc();
    echo json_encode($book);
  } else {
    echo json_encode(["error" => "Book not found"]);
  }
} else {
  echo json_encode(["error" => "Invalid book ID"]);
}

//đóng kết nối
$conn->close();
?>

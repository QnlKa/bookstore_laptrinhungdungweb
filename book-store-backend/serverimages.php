<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$imageName = $_GET['image'];  // Lấy tên ảnh từ query string
$imagePath = 'images/' . $imageName;  // Tạo đường dẫn tới ảnh trong thư mục images

if (file_exists($imagePath)) {
    header('Content-Type: image/jpeg'); 
    readfile($imagePath);  // Đọc file ảnh và gửi nó tới trình duyệt
} else {
    header("HTTP/1.0 404 Not Found");
    echo "Image not found.";
}
?>
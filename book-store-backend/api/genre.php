<?php
header('Content-Type: application/json'); 
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET'); 
header('Access-Control-Allow-Headers: Content-Type'); 

$host = 'localhost'; 
$db = 'bookstore';   
$user = 'root';      
$pass = '';          

try {
    //kết nối đến cơ sở dữ liệu MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //truy vấn lấy danh sách thể loại từ bảng genre
    $stmt = $pdo->query("SELECT id, name FROM genre");
    
    //fetch tất cả thể loại và lưu vào mảng
    $genres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //trả về danh sách thể loại dưới dạng JSON
    echo json_encode($genres);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

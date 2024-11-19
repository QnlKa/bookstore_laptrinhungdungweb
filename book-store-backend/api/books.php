<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost';
$db = 'bookstore';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //kiểm tra nếu có genre trong query string
    if (isset($_GET['genre']) && !empty($_GET['genre'])) {
        $genre = $_GET['genre'];

        //lấy sách theo thể loại
        $stmt = $pdo->prepare("
            SELECT book.*, GROUP_CONCAT(genre.name) AS genres
            FROM book
            JOIN book_genre ON book.id = book_genre.book_id
            JOIN genre ON book_genre.genre_id = genre.id
            WHERE genre.name = :genre
            GROUP BY book.id
        ");
        $stmt->bindParam(':genre', $genre);
    } else {
        //nếu không có genre, lấy tất cả sách
        $stmt = $pdo->prepare("
            SELECT book.*, GROUP_CONCAT(genre.name) AS genres
            FROM book
            JOIN book_genre ON book.id = book_genre.book_id
            JOIN genre ON book_genre.genre_id = genre.id
            GROUP BY book.id
        ");
    }

    $stmt->execute();
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($books); //trả về danh sách sách dưới dạng JSON
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

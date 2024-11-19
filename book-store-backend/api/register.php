<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost';
$db = 'bookstore';
$user = 'root';
$pass = '';

$data = json_decode(file_get_contents("php://input"));
$username = isset($data->username) ? $data->username : '';
$password = isset($data->password) ? $data->password : '';
$email = isset($data->email) ? $data->email : '';

//kiểm tra nếu thiếu thông tin
if (empty($username) || empty($password) || empty($email)) {
    echo json_encode(["success" => false, "message" => "Chưa điền đủ thông tin"]);
    exit;
}

//kiểm tra nếu tài khoản và mật khẩu giống nhau
if ($username === $password) {
    echo json_encode(["success" => false, "message" => "Tài khoản và mật khẩu không được trùng lặp"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //mã hóa mật khẩu
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    //kiểm tra trùng lặp username hoặc email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Tài khoản đã tồn tại"]);
        exit;
    }

    //lấy dữ liệu người dùng
    $stmt = $pdo->prepare("INSERT INTO users (username, password, email) VALUES (:username, :password, :email)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Đăng ký thành công"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

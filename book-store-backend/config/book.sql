-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 19, 2024 lúc 03:48 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bookstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `images` varchar(255) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `title`, `price`, `author`, `description`, `images`, `genre_id`) VALUES
(1, 'Tôi thấy hoa vàng trên cỏ xanh', '100.000', 'Nguyễn Nhật Ánh', 'Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều. Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo, cùng với người em trai tên Tường. Tường là một cậu bé dễ thương, hiền lành, bao dung, rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ, rắn rết. Cậu bé sống nội tâm, ham đọc sách và rất say mê những câu chuyện cổ tích, đặc biệt là truyện Cóc tía, chính vì vậy mà cậu nuôi nấng một con cóc dưới gầm giường và đặt tên cho nó là \"Cu Cậu\"...', 'book1.jpg', 3),
(2, 'Đèn Nhỏ và những đứa con của biển\r\n', '120.000', 'Huyền Vũ', 'Câu chuyện kể về Đèn Nhỏ, một cô bé sống cùng cha trong một ngọn hải đăng cô đơn giữa biển khơi. Mỗi ngày, Đèn Nhỏ đều leo lên thắp sáng ngọn hải đăng, trở thành một ngọn hải đăng nhỏ bé nhưng ấm áp giữa đêm tối. Một ngày nọ, sự cố xảy ra khi Đèn Nhỏ quên mua diêm. Ngọn hải đăng tắt lịm, kéo theo đó là những sự kiện kỳ lạ và những cuộc phiêu lưu đầy bất ngờ.', 'book2.jpg', 0),
(3, 'Sáu đợt thức tỉnh', '350.000', 'Mur Lafferty', 'Sáu đợt thức tỉnh là một cuốn trinh thám viễn tưởng với bối cảnh tương lai. Truyện từng được đề cử các giải thưởng danh giá như Hugo, Nebula, Goodreads Choice, và hay được ví là phiên bản hiện địa của \"10 người da đen nhỏ\" của Agatha Christie.', 'book3.jpg', 0),
(4, 'Thám tử lừng danh Conan - Tập 2\r\n', '70000', 'Gosho Aoyama\r\n', 'Conan đã quyết định ở nhờ tại văn phòng thám tử Kogoro, bố của Mori Ran - bạn gái cậu, để lần theo tung tích tổ chức bí ẩn kia. Nhằm tránh con mắt người đời, hàng ngày cậu đến trường như một học sinh cấp 1 bình thường. Và với tài suy luận lừng danh của mình, cậu vẫn đứng đằng sau ông bác thám tử \"gà mờ\" Mori Kogoro phá giải những vụ án hóc búa một cách tài tình!!', 'book4.jpg', 9),
(5, 'Thám tử lừng danh Conan - Tập 1', '70.000', 'Gosho Aoyama', 'Kudo Shinichi là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Conan!!', 'book5.jpg', 2),
(6, '48 Nguyên Tắc Chủ Chốt Của Quyền Lực', '160.000', 'Robert Greene & Joost Elffers', 'Quyền lực có sức hấp dẫn vô cùng mạnh mẽ đối với con người trong mọi thời, ở mọi nơi, với mọi giai tầng. Lịch sử xét cho cùng là cuộc đấu tranh triền miên để giành cho bằng được quyền lực cai trị của các tập đoàn thống trị, từ cổ chí kim, từ đông sang tây.\r\nPhi luân lý, xảo quyệt, nhẫn tâm và dồi dào tư liệu, “48 nguyên tắc chủ chốt của quyền lực” của Robert Greene hoàn toàn có thể giúp bạn vươn tới những đỉnh cao quyền lực và cũng có thể giúp bạn đạt được tột đỉnh vinh quang.', 'book6.jpg', 5),
(7, '38 Bức Thư Rockefeller Viết Cho Con Trai', '100.000', 'Thanh Hương', 'NGƯỜI SỐNG TRÊN ĐỜI, NHƯ THẾ NÀO LÀ THIỆN, LẠI NHƯ THẾ NÀO LÀ ÁC? THẾ NÀO LÀ SỰ THIÊN LỆCH, MÀ THẾ NÀO MỚI LÀ CHÍNH ĐÍNH?\nCó người khởi tâm ác mà thực ra lại là làm việc thiện. Nhưng nhà kia giàu có lắm, gặp năm mất mùa, dân cùng cực phải cướp thóc lúa ở chợ ngay giữa ban ngày. Người kia báo với tri huyện, nhưng tri huyện không xử lý việc ấy.', 'book7.jpg', 5);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_genre` (`genre_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_genre` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

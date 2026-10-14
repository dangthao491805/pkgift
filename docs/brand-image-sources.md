# Nguồn ảnh sản phẩm — 14/10/2026

Bổ sung 2,683 mục tham khảo, chia vào các dòng sản phẩm và giữ 32 dòng quà cũ. Có 16,235 URL ảnh trong các bộ gallery; một URL có thể xuất hiện ở nhiều mục nguồn. Các mục là bản ghi catalog, có thể gồm biến thể màu hoặc quy cách chưa thể gộp chắc chắn theo mã chung. Không dùng con số này để tuyên bố có từng ấy sản phẩm tồn kho.

| Nguồn catalog | Mục được đưa vào | Bình giữ nhiệt |
|---|---:|---:|
| ELMICH | 1011 | 65 |
| INOCHI | 530 | 24 |
| TOKYO LIFE | 147 | 15 |
| LocknLock | 995 | 64 |

- ELMICH: https://elmich.vn/products.json?limit=250 — 5 trang API công khai, 1.021 bản ghi; ảnh gốc Bizweb, thumbnail `thumb/large`.
- INOCHI: https://inochi.vn/collections/all — 15 trang, 535 mục; 529 mục đọc được dữ liệu chi tiết, 6 mục chỉ có tên và ảnh danh sách chính thức. Dùng ảnh/thumbnail Haravan. Với Fuji, bỏ khung đầu quảng cáo quà tặng chỉ áp dụng tại website hãng, chọn ảnh sản phẩm có sẵn trong gallery.
- LocknLock: https://www.locknlock.vn/vi-vn/home — rà các nhóm liên quan và gộp các màu có mã model chung rõ ràng. Các bình giữ nhiệt truy cập được đã đọc gallery chi tiết; nhiều dòng khác dùng ảnh danh sách chính thức và giữ link nguồn, không suy diễn thông số còn thiếu.
- TOKYO LIFE: https://tokyolife.vn/ — các danh mục bình, gia dụng, túi/balo, khăn, gối và ô dù. Có sản phẩm do đơn vị này phân phối; dùng thương hiệu sản xuất khi nguồn xác nhận (ví dụ Nakaya), và giữ trống thương hiệu sản xuất nếu chưa xác nhận. Nhãn “Nguồn catalog” tách khỏi nhà sản xuất trong trường hợp đó.

Bỏ phụ kiện thay thế, bản ghi thiếu ảnh, sản phẩm nhãn khác trên trang LocknLock và ô che kính xe. Không lấy hình đối thủ làm thành phẩm PK Gift; không tạo hình giả cho mẫu có thương hiệu. Không lấy giá, chương trình khuyến mãi, tồn kho và lời hứa giao hàng của hãng đưa thành cam kết của PK Gift.

Dữ liệu model gồm `id`, `kind: model`, `type`, `brandId` (nguồn catalog), `brand` (nhà sản xuất nếu xác nhận), `sourceBrand`, mã model/SKU khi có, ảnh chính và URL nguồn. Gallery chứa URL ảnh gốc và thông số vật lý đọc được từ nguồn; thiếu thông số thì không điền. Giá và cá nhân hóa giữ “Liên hệ báo giá”.

Ảnh được đặt bằng CSS `contain`, không kéo giãn, tăng độ phân giải giả hay cắt mất sản phẩm. Khung liền viền và bỏ lớp đệm/nền không đồng nhất. Các ảnh panorama của tài liệu công ty giữ khung rộng 2:1, ảnh sản phẩm riêng dùng khung vuông. Mở ảnh lớn tải ảnh nguyên bản hãng, không giới hạn độ phân giải bằng thumbnail.

Kiểm tra: `node --test tests/*.test.cjs`; kiểm tra cú pháp script, tính đầy đủ model/gallery, URL và tài nguyên HTML. Đối chiếu ảnh đại diện từ bốn nguồn và kiểm tra HTTP ảnh chính. Môi trường hiện không có browser QA; chưa kiểm tra trực quan website trên thiết bị thật.

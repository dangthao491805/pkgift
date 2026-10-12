# Nguồn ảnh và bản nâng chất lượng

9 ảnh bối cảnh được khôi phục từ video gốc 1920×1080, giữ nguyên pixel/màu/ánh sáng; không dùng AI cho các ảnh này.
27 ảnh sản phẩm được nâng bằng built-in ImageGen, kiểm tra bố cục, số lượng, kiểu dáng và màu. Mẫu gốc chỉ khoảng 115–179px; các chi tiết nhỏ không phải dữ liệu quang học có thể phục hồi chính xác. 3 bản AI bị loại do đổi họa tiết/logo/chữ, giữ nguyên nguồn gốc cho bình gốm, chuột và cúp.
Master `*-hq.webp` được mã hóa lossless, bảo toàn toàn bộ pixel của bản đã chọn. `*-640.webp` là bản hiển thị nhẹ; HTML dùng srcset để lấy ảnh lớn khi phù hợp mật độ màn hình. Trang chi tiết dùng master.

## Prompt dùng cho bộ ảnh

Edit this exact original product photo. Improve resolution, natural sharpness and noise/compression artifacts; preserve original aspect ratio, product count, silhouettes, colors, composition, natural lighting and all existing text/logos. Keep unreadable tiny marks indistinct. Do not redesign, add props, relight, oversharpen, smooth into plastic or invent logos. Target 1536px long edge or highest supported. Inspect against original and reject product or text drift.

Tool thực tế trả cạnh dài khoảng 1277–1501px (xấp xỉ 1.5MP). PNG gốc sinh và prompt theo từng ảnh được giữ trong quy trình tạo; website dùng các bản WebP dưới đây.

## Tệp trong mã nguồn

| Ảnh | Master | Kích thước | Phương pháp |
|---|---|---:|---|
| ao-mua-bo | `assets/products/ao-mua-bo-hq.webp` | 1299×1211 | ImageGen + QA |
| ao-mua | `assets/products/ao-mua-hq.webp` | 1344×1170 | ImageGen + QA |
| balo | `assets/products/balo-hq.webp` | 1336×1177 | ImageGen + QA |
| binh-gom | `assets/products/binh-gom-hq.webp` | 157×126 | Nguồn gốc lossless |
| bo-am-chen | `assets/products/bo-am-chen-hq.webp` | 1394×1128 | ImageGen + QA |
| but-go | `assets/products/but-go-hq.webp` | 1277×1232 | ImageGen + QA |
| but-ky | `assets/products/but-ky-hq.webp` | 1415×1111 | ImageGen + QA |
| chuot | `assets/products/chuot-hq.webp` | 157×126 | Nguồn gốc lossless |
| cup | `assets/products/cup-hq.webp` | 152×134 | Nguồn gốc lossless |
| du | `assets/products/du-hq.webp` | 1344×1170 | ImageGen + QA |
| giftset-eco | `assets/products/giftset-eco-hq.webp` | 1394×1128 | ImageGen + QA |
| giftset-tra | `assets/products/giftset-tra-hq.webp` | 1394×1128 | ImageGen + QA |
| giftset-van-phong | `assets/products/giftset-van-phong-hq.webp` | 1400×1123 | ImageGen + QA |
| goi-co | `assets/products/goi-co-hq.webp` | 1402×1122 | ImageGen + QA |
| hop-but | `assets/products/hop-but-hq.webp` | 1400×1123 | ImageGen + QA |
| huy-chuong | `assets/products/huy-chuong-hq.webp` | 1336×1177 | ImageGen + QA |
| khan | `assets/products/khan-hq.webp` | 1419×1108 | ImageGen + QA |
| ky-niem-chuong | `assets/products/ky-niem-chuong-hq.webp` | 1318×1193 | ImageGen + QA |
| loa | `assets/products/loa-hq.webp` | 1405×1119 | ImageGen + QA |
| ly-tre | `assets/products/ly-tre-hq.webp` | 1419×1108 | ImageGen + QA |
| non | `assets/products/non-hq.webp` | 1336×1177 | ImageGen + QA |
| qua-tet | `assets/products/qua-tet-hq.webp` | 1409×1117 | ImageGen + QA |
| set-but-binh | `assets/products/set-but-binh-hq.webp` | 1395×1127 | ImageGen + QA |
| set-cong-nghe | `assets/products/set-cong-nghe-hq.webp` | 1381×1139 | ImageGen + QA |
| so-but | `assets/products/so-but-hq.webp` | 1395×1127 | ImageGen + QA |
| so-tay | `assets/products/so-tay-hq.webp` | 1353×1163 | ImageGen + QA |
| trung-thu | `assets/products/trung-thu-hq.webp` | 1408×1117 | ImageGen + QA |
| tui-canvas | `assets/products/tui-canvas-hq.webp` | 1501×1048 | ImageGen + QA |
| tui-day | `assets/products/tui-day-hq.webp` | 1419×1108 | ImageGen + QA |
| usb | `assets/products/usb-hq.webp` | 1409×1117 | ImageGen + QA |
| tet | `assets/tet-hq.webp` | 1920×1080 | Video gốc |
| branding | `assets/branding-hq.webp` | 1920×1080 | Video gốc |
| gifts | `assets/gifts-hq.webp` | 1920×1080 | Video gốc |
| projects | `assets/projects-hq.webp` | 1920×1080 | Video gốc |
| giftset | `assets/giftset-hq.webp` | 1880×940 | Video gốc |
| thermos | `assets/thermos-hq.webp` | 1880×940 | Video gốc |
| design | `assets/design-hq.webp` | 1880×940 | Video gốc |
| mugs | `assets/mugs-hq.webp` | 1880×940 | Video gốc |
| packaging | `assets/packaging-hq.webp` | 1880×940 | Video gốc |

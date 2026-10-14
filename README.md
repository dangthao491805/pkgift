# Website Phúc Khang Thịnh Phát

Website HTML/CSS/JavaScript thuần, tông đen – vàng kim. Tiêu đề dùng Playfair Display, nội dung và giao diện dùng Inter. Toàn bộ website chạy trực tiếp trên GitHub Pages, không cần Node.js, npm hay bước build.

## Có trong bộ mã nguồn

- Trang chủ với Layered Glassmorphism và Bento Grid; nền parallax nhẹ, tương tác hover nhỏ, tự giảm chuyển động theo cài đặt thiết bị.
- Giới thiệu đầy đủ nội dung định vị, sứ mệnh và quy trình của công ty.
- 32 dòng quà của công ty và 2,683 mục mẫu tham khảo từ ELMICH, INOCHI, TOKYO LIFE, LocknLock; lọc nhóm/dòng/thương hiệu, tìm tên hoặc mã hãng, phân trang và gallery ảnh gốc.
- Danh sách yêu cầu báo giá: chọn mẫu, đổi số lượng, xóa và sao chép.
- Giải pháp, dịch vụ, các trang khách sạn/resort, Tết, Trung thu và 20/10.
- Cẩm nang với 3 bài viết, FAQ, liên hệ, nút gọi/Zalo/bản đồ, dự trù ngân sách.
- Logo, ảnh trích từ tài liệu công ty, video đã nén, catalog PowerPoint tải về.
- Giao diện thích ứng điện thoại/máy tính, metadata SEO, schema tổ chức và công cụ tạo sitemap.

## Đưa lên GitHub Pages

1. Giải nén bộ mã nguồn.
2. Tạo repository, ví dụ `phuc-khang-thinh-phat`.
3. Đưa **các tệp bên trong thư mục đã giải nén** vào gốc repository. `index.html` phải nằm ngay ở gốc, cùng `assets/`, `san-pham/` và `cam-nang/`.
4. Nếu tải qua trình duyệt, có thể tải nhóm trang HTML trước, rồi tải thư mục `assets/` trong lần tiếp theo. Giữ nguyên cấu trúc và tên tệp.
5. Vào **Settings → Pages → Build and deployment → Source → Deploy from a branch**. Chọn nhánh **main**, thư mục **/(root)** rồi **Save**.
6. Mở đường dẫn GitHub Pages được GitHub cung cấp sau khi triển khai hoàn tất.

Nguồn hướng dẫn: [GitHub Docs — cấu hình nguồn xuất bản](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Các đường dẫn nội bộ là đường dẫn tương đối nên dùng được cả ở `username.github.io/ten-repo/` và tên miền riêng. Giữ tệp `.nojekyll` được kèm trong gói.

## Chỉnh sửa thông tin

| Nội dung | Tệp |
| --- | --- |
| Hotline, email, địa chỉ, Zalo | `assets/config.js` |
| Màu, khoảng cách, hiệu ứng, kích thước chữ | `assets/styles.css` |
| Danh sách tìm kiếm, nhóm, tên và ảnh sản phẩm | `assets/catalog.js` |
| Nội dung trang chủ | `index.html` |
| Nội dung giới thiệu | `gioi-thieu.html` |
| Dịch vụ và giải pháp | `dich-vu.html`, `giai-phap.html` |
| Chi tiết sản phẩm | `san-pham/<ten-san-pham>.html` |
| Bài cẩm nang | `cam-nang/<ten-bai>.html` |

Khi đổi thông tin công ty, cập nhật cả phần nội dung HTML, metadata và schema ở đầu các trang để thông tin hiện đúng cả khi JavaScript chưa chạy. Khi sửa sản phẩm, cập nhật `assets/catalog.js` và trang chi tiết tương ứng; đường dẫn ảnh bắt đầu bằng `assets/`.

## Form tư vấn hoạt động như thế nào?

Form gửi trực tiếp bằng AJAX qua **FormSubmit** đến `pkgift.sales@gmail.com`. Người dùng bấm **Gửi đi**, thấy trạng thái đang gửi, thành công hoặc lỗi ngay trên trang. Danh sách sản phẩm, số lượng và thông tin liên hệ được đưa vào nội dung email. Khi lỗi, form giữ dữ liệu và cung cấp hotline, sao chép/tải nội dung hoặc email dự phòng.

**Thiết lập lần đầu:** gửi một yêu cầu kiểm tra từ website, mở `pkgift.sales@gmail.com` (kể cả thư rác) và xác nhận email kích hoạt FormSubmit. Gửi lại một yêu cầu kiểm tra để xác nhận email đến hộp thư. Các trang dùng chung `_url` trong `assets/config.js`. Khi đổi địa chỉ email hoặc URL nhận form, cần xác nhận lại.

`formEndpoint` là địa chỉ AJAX công khai, không chứa mật khẩu/API key. Chỉ hiển thị thành công khi dịch vụ trả xác nhận JSON; thông báo kích hoạt hoặc lỗi không được coi là đã gửi. Website không có cơ sở dữ liệu khách hàng/trang quản trị đơn hàng. FormSubmit có thể giữ bản gửi tối đa 30 ngày. Đã cập nhật trang bảo mật.

## Đặt URL chính thức cho SEO

Gói GitHub không giữ canonical của bản Sites để tránh hướng công cụ tìm kiếm về sai website. Sau khi có URL GitHub Pages hoặc tên miền riêng, có thể dùng công cụ tùy chọn:

```sh
python tools/set-site-url.py https://username.github.io/ten-repo
```

Công cụ cập nhật canonical, URL chia sẻ, schema, robots và sitemap. Sau đó commit/push các tệp đã cập nhật. Website vẫn chạy được trước khi thực hiện bước SEO này.

## Kiểm tra trước khi dùng chính thức

Mã JavaScript, liên kết tệp, nhãn form, ảnh, nội dung định vị và các hàm tìm kiếm/báo giá đã được kiểm tra. Chưa kiểm tra giao diện trực tiếp bằng trình duyệt trong môi trường tạo website. Sau khi đưa lên GitHub, mở thử trên điện thoại và máy tính; thử tìm sản phẩm, đổi số lượng, mở video và gửi form kiểm tra sau khi đã xác nhận email FormSubmit.

Giá và thông số cụ thể không được giả định. Hình sản phẩm là mẫu tham khảo từ tài liệu công ty; mẫu thực tế, giá, in ấn, bảo hành và tiến độ cần xác nhận theo từng đơn hàng. Catalog tải về là tệp PowerPoint gốc được cung cấp, không phải một catalog đã biên tập lại.

Font Inter và Playfair Display được lưu cùng website, có bộ ký tự tiếng Việt. Giấy phép nằm trong `assets/fonts/Inter-OFL.txt` và `assets/fonts/Playfair-Display-OFL.txt`. Nền kính có các lớp, vệt ánh sáng và chuyển động chậm; hiệu ứng giảm trên điện thoại, dừng khi tab ẩn và theo tùy chọn giảm chuyển động của người xem. Phần cập nhật hình thức nằm trong `assets/fonts.css` và `assets/visual.css`.

## Triển khai Cloudflare Workers

Worker hiện tại là `pkgift`. `wrangler.jsonc` chỉ định bộ tệp website tĩnh tại thư mục gốc; `.assetsignore` loại các tệp phát triển khỏi bản Cloudflare. Cấu hình không chứa account_id, API token hoặc mật khẩu.

Trong Cloudflare → Worker `pkgift` → Settings → Build Configuration: dùng nhánh `main`, thư mục gốc của repo và lệnh deploy `npx wrangler deploy`. Website không cần bước build nội dung. Giữ các cấu hình tích hợp Git/tài khoản hiện có. Nếu một lần triển khai báo lỗi, xem phần log của lần build để xác định lỗi cấu hình, token hoặc tải tệp; GitHub Pages vẫn là bản xem dự phòng.

## Catalog và bổ sung mẫu sản phẩm

Trang chủ có tìm kiếm và đường vào các dòng quà. Danh mục lọc theo nhóm/dòng, tìm nhiều từ không dấu và phân trang 18 mục. Bộ lọc dùng các tham số `nhom`, `loai`, `thuong-hieu`, `q`, `sap-xep`, `trang`, nên có thể chia sẻ đường dẫn tới một lựa chọn. Phiên bản script được cập nhật đồng bộ trên các trang.

32 mục hiện tại giới thiệu **dòng quà tham khảo**, được đánh dấu `kind: "collection"`. Không coi chúng là 32 SKU đã xác nhận. `types` là danh sách các dòng đang có dữ liệu; `type`/`typeName` thuộc từng mục. Khi bổ sung model, dùng tên/mã, ảnh, thông số và điều kiện do doanh nghiệp xác nhận. Không tạo hàng trăm mục bằng ảnh lặp lại hoặc thông số tự đoán.

Xem [khung nội dung và phương án phát triển](docs/catalog-content-guide.md). Chạy `node --test tests/*.test.cjs` để kiểm tra tìm kiếm, lọc, phân trang, nội dung yêu cầu và xử lý phản hồi form. Giao diện riêng cho tìm quà/catalog nằm trong `assets/catalog-ui.css`.


## Ảnh và mẫu theo thương hiệu — 14/10/2026

Catalog tham khảo được bổ sung từ các trang hãng/nhà cung cấp, có nguồn đối chiếu cho từng mục. `assets/brand-catalog.js` thêm dữ liệu vào 32 dòng quà trong `assets/catalog.js`; một số mục nguồn là biến thể màu/quy cách và không được xem là số thiết kế vật lý duy nhất. `san-pham/mau-hang.html?mau=<id>` mở đúng model, giữ link model khi gửi yêu cầu báo giá.

Gallery gốc nằm trong `assets/brand-galleries/<thuong-hieu>.json` và chỉ được tải khi mở mẫu của hãng đó. Thẻ danh mục dùng thumbnail chính thức, ảnh lớn dùng URL gốc. `assets/image-layout.css` bỏ đệm ảnh, đồng nhất nền và giữ tỷ lệ sản phẩm trên trang chủ, catalog, trang chi tiết và các khối ảnh nội dung.

Các hình ảnh vẫn được phục vụ từ CDN hãng. Nếu hãng đổi/xóa tệp, cần cập nhật dữ liệu hoặc thay bằng ảnh do công ty cung cấp. Không công bố giá bán lẻ của hãng thành giá báo của PK Gift. Không suy diễn tồn kho, MOQ, thời gian giao, ưu đãi hay quan hệ đại lý. Xem `docs/brand-image-sources.md` và `assets/BRAND_IMAGE_SOURCES.json` để rà nguồn.

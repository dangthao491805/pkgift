/* Các hàm thuần dùng chung; không cần thư viện hoặc bước build. */
window.PK_UTILS = (() => {
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const assetUrl = (path, base = '') => /^https:\/\//i.test(String(path || '')) ? String(path) : base + String(path || '');
  const quantity = value => Math.min(99999, Math.max(1, Math.floor(Number(value) || 1)));
  const cleanCart = (value, products) => {
    if (!Array.isArray(value)) return [];
    const valid = new Set(products.map(p => p.id));
    const unique = new Map();
    value.slice(0, 100).forEach(item => {
      if (item && valid.has(item.id)) unique.set(item.id, {id:item.id, quantity:quantity(item.quantity)});
    });
    return [...unique.values()];
  };
  const searchTerms = value => normalize(value).replace(/gift\s+set/g, 'giftset').replace(/ba\s+lo/g, 'balo').replace(/lock\s*&\s*lock/g, 'locknlock').trim().split(/\s+/).filter(Boolean);
  const filterProducts = (products, query, category, sort = 'featured', type = 'tat-ca', brand = 'tat-ca') => {
    const terms = searchTerms(query);
    const list = products.filter(p => {
      if (category && category !== 'tat-ca' && p.category !== category) return false;
      if (type && type !== 'tat-ca' && p.type !== type) return false;
      if (brand && brand !== 'tat-ca' && p.brandId !== brand) return false;
      const haystack = normalize([p.name,p.description,p.categoryName,p.typeName,p.sku,p.brand,p.sourceBrand,...(p.tags || [])].join(' '));
      return terms.every(term => haystack.includes(term));
    });
    if (sort === 'az') list.sort((a,b) => a.name.localeCompare(b.name,'vi'));
    if (sort === 'za') list.sort((a,b) => b.name.localeCompare(a.name,'vi'));
    return list;
  };
  const paginateProducts = (list, page = 1, size = 18) => {
    const requestedSize = Number(size);
    const pageSize = Number.isInteger(requestedSize) && requestedSize > 0 ? requestedSize : 18;
    const pages = Math.max(1, Math.ceil(list.length / pageSize));
    const requestedPage = Number(page);
    const currentPage = Number.isFinite(requestedPage) ? Math.min(pages, Math.max(1, Math.floor(requestedPage))) : 1;
    const start = (currentPage - 1) * pageSize;
    return {items:list.slice(start, start + pageSize), page:currentPage, pages, start:list.length ? start + 1 : 0, end:Math.min(start + pageSize, list.length)};
  };
  const validateInquiry = data => {
    if (!data.name || data.name.trim().length < 2) return 'Vui lòng nhập họ và tên từ 2 ký tự.';
    const digits = String(data.phone || '').replace(/\D/g,'');
    if (digits.length < 9 || digits.length > 15 || !/^[+()\d .-]+$/.test(data.phone || '')) return 'Vui lòng nhập số điện thoại hợp lệ.';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Vui lòng kiểm tra lại địa chỉ email.';
    const count = Number(data.quantity);
    if (!Number.isInteger(count) || count < 1 || count > 99999) return 'Số lượng dự kiến cần là số nguyên từ 1 đến 99.999.';
    if (String(data.message || '').length > 3000) return 'Nội dung nhu cầu tối đa 3.000 ký tự.';
    if (!data.consent) return 'Vui lòng đồng ý để chúng tôi liên hệ về yêu cầu này.';
    return '';
  };
  const composeInquiry = (data, cart, products, siteUrl = '') => {
    const lines = ['Kính gửi Phúc Khang Thịnh Phát,', '', 'Tôi muốn được tư vấn giải pháp quà tặng với thông tin:',
      `Họ tên: ${data.name || ''}`, `Đơn vị: ${data.company || 'Chưa cung cấp'}`,
      `Điện thoại: ${data.phone || ''}`, `Email: ${data.email || 'Chưa cung cấp'}`,
      `Đối tượng nhận: ${data.audience || 'Cần tư vấn'}`, `Số lượng dự kiến: ${data.quantity || ''}`,
      `Ngân sách mỗi phần: ${data.budget || 'Cần tư vấn'}`, `Ngày cần nhận: ${data.delivery || 'Cần trao đổi'}`,
      `Nhu cầu: ${data.message || 'Nhờ công ty tư vấn thêm.'}`];
    if (cart.length) {
      lines.push('', 'SẢN PHẨM QUAN TÂM:');
      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          lines.push(`- ${product.name}${product.sku ? ' | Mã: ' + product.sku : ''} | Số lượng: ${quantity(item.quantity)}`);
          const path = siteUrl ? new URL(product.path, siteUrl.replace(/\/$/, '') + '/').href : product.path;
          lines.push(`  Trang tham khảo: ${path}`);
        }
      });
    }
    lines.push('', 'Đây là yêu cầu tư vấn; giá và điều kiện đơn hàng cần được hai bên xác nhận.', '', 'Trân trọng.');
    return lines.join('\n');
  };
  const mailto = (email, subject, body) => `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return {normalize,escape,assetUrl,quantity,cleanCart,filterProducts,paginateProducts,validateInquiry,composeInquiry,mailto};
})();

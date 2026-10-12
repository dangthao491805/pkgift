/* Direct email delivery through FormSubmit. No private keys in the browser. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PK_INQUIRY = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function payload(data, body, subject, formUrl, pageUrl) {
    const result = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
      _url: formUrl,
      name: data.name.trim(),
      'Doanh nghiệp / tổ chức': data.company || 'Chưa cung cấp',
      'Số điện thoại': data.phone,
      message: body,
      'Trang gửi yêu cầu': pageUrl,
      'Đồng ý liên hệ tư vấn': 'Có'
    };
    if (data.email) {
      result.email = data.email.trim();
      result._replyto = result.email;
    }
    return result;
  }
  async function send(endpoint, fields, request = globalThis.fetch, timeoutMs = 20000) {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') throw new Error('HTTPS is required.');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await request(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(fields),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('The service did not confirm the request.');
      const result = await response.json();
      const message = String(result.message || '');
      // An activation notice is not confirmation that an inquiry was delivered.
      if (/activat|confirm.{0,35}(email|form)|verify.{0,35}email/i.test(message)) {
        const error = new Error('The receiving form needs email verification.');
        error.code = 'ACTIVATION_REQUIRED';
        throw error;
      }
      if (result.success !== true && result.success !== 'true') {
        throw new Error('The service did not accept the inquiry.');
      }
      return { accepted: true };
    } finally {
      clearTimeout(timeout);
    }
  }
  return { payload, send };
});

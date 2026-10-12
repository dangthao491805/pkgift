const { test } = require('node:test');
const assert = require('node:assert/strict');
const { payload, send } = require('../assets/inquiry.js');
const endpoint = 'https://formsubmit.co/ajax/pkgift.sales@gmail.com';
const response = (value, ok = true) => ({ ok, json: async () => value });

test('accepted response uses one JSON POST and sends reply-to and quote content', async () => {
  const body = 'Bình giữ nhiệt | Số lượng: 100\nBộ sổ bút | Số lượng: 50';
  const fields = payload({name:' Nguyễn Trang ',phone:'0938613943',email:'trang@example.com',company:'Công ty A'},body,'Yêu cầu tư vấn','https://example.com/lien-he.html','https://example.com/san-pham.html');
  let calls = 0;
  const result = await send(endpoint,fields,async (url,request) => {
    calls++;
    assert.equal(url,endpoint);
    assert.equal(request.method,'POST');
    const sent = JSON.parse(request.body);
    assert.equal(sent._replyto,'trang@example.com');
    assert.equal(sent.message,body);
    assert.equal(sent._url,'https://example.com/lien-he.html');
    assert.equal(sent.name,'Nguyễn Trang');
    return response({success:'true',message:'Form submitted successfully.'});
  });
  assert.equal(calls,1);
  assert.equal(result.accepted,true);
});

test('optional email does not create an invalid reply-to address', () => {
  const fields = payload({name:'Trang',phone:'0938613943'},'Nội dung','Tư vấn','https://example.com/contact','https://example.com');
  assert.equal('email' in fields,false);
  assert.equal('_replyto' in fields,false);
});

test('HTTP 200 with boolean or string failure is not treated as sent', async () => {
  for (const success of [false,'false',undefined]) {
    await assert.rejects(send(endpoint,{},async () => response({success,message:'Unable to submit form'})));
  }
});

test('activation notices are not delivery confirmation even with success=true', async () => {
  await assert.rejects(send(endpoint,{},async () => response({success:true,message:'Please activate your form by confirming your email.'})),{code:'ACTIVATION_REQUIRED'});
});

test('HTTP errors and unreadable responses do not report success', async () => {
  await assert.rejects(send(endpoint,{},async () => response({},false)));
  await assert.rejects(send(endpoint,{},async () => ({ok:true,json:async()=>{throw new SyntaxError('Invalid JSON');}})));
});

test('timeouts abort the request and do not retry or mutate submitted fields', async () => {
  const fields = {message:'Nội dung cần được giữ lại'};
  let calls = 0;
  await assert.rejects(send(endpoint,fields,async (_,request) => {
    calls++;
    return new Promise((_,reject) => request.signal.addEventListener('abort',()=>reject(new Error('Aborted')),{once:true}));
  },10));
  assert.equal(calls,1);
  assert.equal(fields.message,'Nội dung cần được giữ lại');
});

test('insecure endpoints are rejected before any request is made', async () => {
  let requested = false;
  await assert.rejects(send('http://example.com',{},async()=>{requested=true;}));
  assert.equal(requested,false);
});

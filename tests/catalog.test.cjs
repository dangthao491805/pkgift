const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const context = vm.createContext({window:{}, URL});
vm.runInContext(fs.readFileSync('assets/catalog.js','utf8'),context);
vm.runInContext(fs.readFileSync('assets/utils.js','utf8'),context);
const catalog = context.window.PK_CATALOG;
const U = context.window.PK_UTILS;
const ids = list => Array.from(list,p=>p.id);

test('Vietnamese search accepts missing accents and words in any order',()=>{
  assert.ok(ids(U.filterProducts(catalog.products,'logo binh nhiet','tat-ca')).includes('pk-005'));
  assert.ok(ids(U.filterProducts(catalog.products,'tay so','tat-ca')).includes('pk-008'));
  assert.equal(U.filterProducts(catalog.products,'so vo nghia','tat-ca').length,0);
});
test('gift set and ba lo match established product names',()=>{
  assert.ok(ids(U.filterProducts(catalog.products,'gift set','tat-ca')).includes('pk-001'));
  assert.deepEqual(ids(U.filterProducts(catalog.products,'ba lo','tat-ca')),['pk-015']);
});
test('type filters intersect category filters without inventing product variants',()=>{
  assert.deepEqual(ids(U.filterProducts(catalog.products,'','tat-ca','featured','but')),['pk-009','pk-028']);
  assert.deepEqual(ids(U.filterProducts(catalog.products,'','eco','featured','but')),['pk-028']);
  assert.equal(U.filterProducts(catalog.products,'','binh-ly','featured','so-tay').length,0);
});
test('catalog pages preserve all records exactly once and clamp invalid pages',()=>{
  const first=U.paginateProducts(catalog.products,1),last=U.paginateProducts(catalog.products,2);
  assert.equal(first.items.length,18);assert.equal(last.items.length,14);
  assert.deepEqual([...ids(first.items),...ids(last.items)],ids(catalog.products));
  assert.equal(U.paginateProducts(catalog.products,999).page,2);
  assert.equal(U.paginateProducts(catalog.products,-7).page,1);
  assert.equal(U.paginateProducts(catalog.products,'bad').page,1);
  const empty=U.paginateProducts([],8);
  assert.equal(empty.start,0);assert.equal(empty.end,0);assert.equal(empty.page,1);
});
test('sorting happens before pagination and does not mutate the catalog',()=>{
  const original=ids(catalog.products);
  const sorted=U.filterProducts(catalog.products,'','tat-ca','az');
  for(let i=1;i<sorted.length;i++)assert.ok(sorted[i-1].name.localeCompare(sorted[i].name,'vi')<=0);
  assert.deepEqual(ids(catalog.products),original);
  assert.equal(U.paginateProducts(sorted,1).items[0].id,sorted[0].id);
});
test('inquiries retain quantity and link to the exact selected reference page',()=>{
  const body=U.composeInquiry({name:'Người phụ trách',phone:'0938613943',quantity:100},[{id:'pk-008',quantity:100}],catalog.products,'https://pkgift.nguyendminhtam02.workers.dev/');
  assert.match(body,/Sổ tay doanh nghiệp \| Số lượng: 100/);
  assert.match(body,/https:\/\/pkgift\.nguyendminhtam02\.workers\.dev\/san-pham\/so-tay\.html/);
});

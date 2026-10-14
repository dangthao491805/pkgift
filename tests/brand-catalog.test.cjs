const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context=vm.createContext({window:{},URL});
for(const file of ['catalog.js','brand-catalog.js','utils.js'])vm.runInContext(fs.readFileSync('assets/'+file,'utf8'),context);
const catalog=context.window.PK_CATALOG,U=context.window.PK_UTILS;
const models=catalog.products.filter(p=>p.kind==='model');

test('four sources can be combined with a thermos type filter',()=>{
 for(const brand of catalog.brands){
  const list=U.filterProducts(catalog.products,'','tat-ca','featured','binh-giu-nhiet',brand.id);
  assert.ok(list.length>0,brand.name);
  assert.ok(list.every(p=>p.brandId===brand.id && p.type==='binh-giu-nhiet'));
 }
 assert.equal(U.filterProducts(catalog.products,'','gia-dung','featured','binh-giu-nhiet','elmich').length,0);
});
test('source models have unique identity, known taxonomy and matching original galleries',()=>{
 const ids=new Set(),types=new Set(catalog.types.map(t=>t.id)),categories=new Set(catalog.categories.map(c=>c.id));
 const galleries=Object.fromEntries(catalog.brands.map(b=>[b.id,JSON.parse(fs.readFileSync('assets/brand-galleries/'+b.id+'.json','utf8'))]));
 for(const p of models){
  assert.ok(!ids.has(p.id));ids.add(p.id);
  assert.ok(types.has(p.type),p.name);assert.ok(categories.has(p.category),p.name);
  assert.ok(/^https:\/\//.test(p.image));assert.ok(/^https:\/\//.test(p.sourceUrl));
  assert.equal(new URL(p.path,'https://example.com/').searchParams.get('mau'),p.id);
  const gallery=galleries[p.brandId][p.id];assert.ok(gallery,p.id);
  assert.equal(gallery.sourceUrl,p.sourceUrl);assert.ok(gallery.images.length>0);
  assert.ok(gallery.images.every(u=>/^https:\/\//.test(u)));
  assert.equal(p.price,undefined);assert.equal(p.stock,undefined);
 }
});
test('merged catalog preserves original gift families and pagination without losses',()=>{
 const families=catalog.products.filter(p=>p.kind==='collection');assert.equal(families.length,32);
 const ids=[];const total=U.paginateProducts(catalog.products,1).pages;
 for(let page=1;page<=total;page++)ids.push(...Array.from(U.paginateProducts(catalog.products,page).items,p=>p.id));
 assert.equal(ids.length,catalog.products.length);assert.equal(new Set(ids).size,ids.length);
});
test('a model is searchable by official SKU and brand without accents',()=>{
 const p=models.find(p=>p.brandId==='locknlock' && p.sku==='LHC1475');assert.ok(p);
 assert.ok(U.filterProducts(catalog.products,'Lock&Lock LHC1475','tat-ca').some(q=>q.id===p.id));
 assert.ok(U.filterProducts(catalog.products,'fuji bear binh','tat-ca').some(q=>q.sourceBrand==='INOCHI'));
});
test('source image paths stay absolute in nested pages and local paths remain relative',()=>{
 const url=models[0].image;assert.equal(U.assetUrl(url,'../'),url);
 assert.equal(U.assetUrl('assets/giftset-hq.webp','../'),'../assets/giftset-hq.webp');
 assert.equal(U.assetUrl('assets/giftset-hq.webp'),'assets/giftset-hq.webp');
});
test('quote drafts retain selected models, quantities, SKU and exact query links',()=>{
 const p=models.find(p=>p.sku);const cart=U.cleanCart([{id:p.id,quantity:70},{id:'pk-008',quantity:30}],catalog.products);
 assert.equal(cart.length,2);
 const body=U.composeInquiry({name:'Khách hàng',phone:'0938613943',quantity:100},cart,catalog.products,'https://pkgift.nguyendminhtam02.workers.dev/');
 assert.ok(body.includes(p.name));assert.ok(body.includes('Mã: '+p.sku));assert.ok(body.includes('Số lượng: 70'));
 assert.ok(body.includes(new URL(p.path,'https://pkgift.nguyendminhtam02.workers.dev/').href));
});
test('retailer references do not fabricate an unknown manufacturer',()=>{
 const unknown=models.filter(p=>p.brandId==='tokyolife' && !p.brand);assert.ok(unknown.length>0);
 assert.ok(unknown.every(p=>p.sourceBrand==='TOKYO LIFE'));
 assert.ok(models.some(p=>p.sourceBrand==='TOKYO LIFE' && p.brand==='Nakaya'));
});

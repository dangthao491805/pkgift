/* Brand model galleries and gift-family model browsers. Native source photos remain intact. */
(() => {
 'use strict';
 const U=window.PK_UTILS, C=window.PK_CONFIG, catalog=window.PK_CATALOG;
 const base=document.documentElement.dataset.base || '';
 const $=(selector,root=document)=>root.querySelector(selector);
 const escape=U.escape;
 const photos=new Map();
 const brands=catalog.brands || [];
 const thumb=(url,brand)=>{
  if(brand==='tokyolife')return 'https://tokyolife.vn/_next/image?url='+encodeURIComponent(url)+'&w=750&q=75';
  if(brand==='elmich' && url.startsWith('https://bizweb.dktcdn.net/') && !url.includes('/thumb/'))return url.replace('https://bizweb.dktcdn.net/','https://bizweb.dktcdn.net/thumb/large/');
  if(brand==='inochi' && /hstatic\.net\//.test(url) && !/_(grande|master|large|compact|small)\./.test(url))return url.replace(/(\.(?:png|jpe?g|webp))(\?.*)?$/i,'_grande$1$2');
  return url;
 };
 const local=path=>U.assetUrl(path,base);
 document.addEventListener('error',event=>{
  const img=event.target;
  if(img instanceof HTMLImageElement && img.dataset.originalPhoto){const original=img.dataset.originalPhoto;delete img.dataset.originalPhoto;img.src=original;}
 },true);

 async function loadGallery(product){
  if(!photos.has(product.brandId)){
   const url=local('assets/brand-galleries/'+product.brandId+'.json?v=20261014-2');
   photos.set(product.brandId,fetch(url).then(r=>{if(!r.ok)throw new Error('gallery');return r.json();}));
  }
  const data=await photos.get(product.brandId);
  return data[product.id] || {images:[product.image],specs:{}};
 }

 const modelRoot=$('[data-model-detail]');
 if(modelRoot){
  const id=new URLSearchParams(location.search).get('mau');
  const p=catalog.products.find(product=>product.id===id && product.kind==='model');
  if(!p){
   modelRoot.innerHTML='<div class="container"><div class="glass empty-state"><h1>Chọn mẫu sản phẩm</h1><p>Khám phá danh mục để xem hình ảnh và thông tin của từng mẫu.</p><a class="btn primary" href="'+base+'san-pham.html">Xem danh mục</a></div></div>';
  }else{
   document.title=p.name+' | Phúc Khang Thịnh Phát';
   const description=$('meta[name="description"]');if(description)description.content=p.name+'. Tư vấn quà tặng doanh nghiệp, số lượng và cách trao tặng tại Phúc Khang Thịnh Phát.';
   const title=$('meta[property="og:title"]');if(title)title.content=p.name;
   const image=$('meta[property="og:image"]');if(image)image.content=p.image;
   const typeLink=base+'san-pham.html?loai='+encodeURIComponent(p.type);
   modelRoot.innerHTML=`<div class="container"><nav class="breadcrumb" aria-label="Đường dẫn"><a href="${base}index.html">Trang chủ</a><span aria-hidden="true">/</span><a href="${base}san-pham.html">Sản phẩm</a><span aria-hidden="true">/</span><a href="${typeLink}">${escape(p.typeName)}</a></nav><div class="product-detail"><div class="model-gallery"><button type="button" class="model-gallery-main" data-enlarge-photo aria-label="Phóng to ảnh ${escape(p.name)}"><img id="model-photo" src="${escape(p.image)}" alt="${escape(p.name)}" width="900" height="900" fetchpriority="high"><span>Xem ảnh lớn ↗</span></button><div class="model-gallery-thumbnails" id="model-thumbnails" aria-label="Các góc ảnh sản phẩm"></div><p class="model-origin">Hình ảnh từ ${escape(p.sourceBrand || p.brand)}. <a href="${escape(p.sourceUrl)}" target="_blank" rel="noopener">Xem thông tin hãng ↗</a></p></div><div class="detail-info"><div class="eyebrow">${escape(p.sourceBrand || p.brand)} · ${escape(p.typeName)}</div><h1>${escape(p.name)}</h1>${p.sku ? '<div class="model-code">Mã hãng: '+escape(p.sku)+'</div>' : ''}<p class="detail-description">${escape(p.description)}</p><dl class="model-specs" id="model-specs"><div><dt>${p.brand ? 'Thương hiệu' : 'Nguồn catalog'}</dt><dd>${escape(p.brand || p.sourceBrand)}</dd></div><div><dt>Dòng sản phẩm</dt><dd>${escape(p.typeName)}</dd></div></dl><div class="hero-buttons"><button type="button" class="btn primary" data-add="${escape(p.id)}">Thêm vào yêu cầu báo giá</button><button type="button" class="btn" data-open="inquiry-dialog" data-subject="${escape('Tôi quan tâm '+p.name+(p.sku?' — mã '+p.sku:''))}">Tư vấn mẫu này</button></div><p class="model-source-note">Mẫu và hình ảnh tham khảo từ catalog hãng. Nguồn hàng, số lượng, phương án cá nhân hóa, bao bì và tiến độ được xác nhận trong báo giá cho từng đơn hàng.</p></div></div></div>`;
   let gallery=[p.image], selected=0;
   const dialog=document.createElement('dialog');dialog.className='model-image-dialog';dialog.id='model-image-dialog';dialog.setAttribute('aria-labelledby','model-image-title');
   dialog.innerHTML=`<div class="dialog-header"><h2 id="model-image-title">${escape(p.name)}</h2><button class="dialog-close" type="button" data-close aria-label="Đóng ảnh">×</button></div><img data-dialog-photo src="${escape(p.image)}" alt="${escape(p.name)}" width="1200" height="1200"><div class="image-nav"><button class="btn" type="button" data-image-step="-1">Ảnh trước</button><span data-image-position>1 / 1</span><button class="btn" type="button" data-image-step="1">Ảnh sau</button></div>`;
   document.body.append(dialog);
   function selectPhoto(index){
    selected=(index+gallery.length)%gallery.length;
    $('#model-photo').src=gallery[selected];
    $('[data-dialog-photo]',dialog).src=gallery[selected];
    $('[data-image-position]',dialog).textContent=(selected+1)+' / '+gallery.length;
    document.querySelectorAll('[data-model-photo]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.modelPhoto)===selected)));
   }
   $('[data-enlarge-photo]',modelRoot).addEventListener('click',()=>{if(typeof dialog.showModal==='function')dialog.showModal();});
   dialog.addEventListener('click',event=>{
    const button=event.target.closest('[data-image-step]');if(button)selectPhoto(selected+Number(button.dataset.imageStep));
    if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}
   });
   document.addEventListener('keydown',event=>{if(dialog.open && ['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();selectPhoto(selected+(event.key==='ArrowLeft'?-1:1));}});
   $('#model-thumbnails').addEventListener('click',event=>{const button=event.target.closest('[data-model-photo]');if(button)selectPhoto(Number(button.dataset.modelPhoto));});
   loadGallery(p).then(data=>{
    gallery=data.images?.length ? data.images : [p.image];
    $('#model-thumbnails').innerHTML=gallery.map((url,index)=>`<button type="button" data-model-photo="${index}" aria-pressed="${index===0}" aria-label="Xem ảnh ${index+1} của ${escape(p.name)}"><img src="${escape(thumb(url,p.brandId))}" data-original-photo="${escape(url)}" alt="Góc ảnh ${index+1}" loading="lazy" decoding="async" width="150" height="150"></button>`).join('');
    const entries=Object.entries(data.specs || {}).filter(([key,value])=>value && !/gia|bao hanh|giao hang/i.test(U.normalize(key)));
    $('#model-specs').innerHTML=`<div><dt>${p.brand ? 'Thương hiệu' : 'Nguồn catalog'}</dt><dd>${escape(p.brand || p.sourceBrand)}</dd></div><div><dt>Dòng sản phẩm</dt><dd>${escape(p.typeName)}</dd></div>`+entries.map(([key,value])=>`<div><dt>${escape(key)}</dt><dd>${escape(Array.isArray(value)?value.join(' · '):value)}</dd></div>`).join('');
    selectPhoto(0);
    const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.name,brand:p.brand ? {'@type':'Brand',name:p.brand} : undefined,image:gallery,sku:p.sku || undefined,description:p.description,url:new URL(p.path,C.siteUrl+'/').href});document.head.append(schema);
   }).catch(()=>{$('#model-thumbnails').innerHTML='<p class="model-origin">Bạn có thể xem thêm ảnh tại trang thông tin hãng hoặc trao đổi với đội ngũ tư vấn.</p>';});
  }
 }

 document.querySelectorAll('[data-model-browser]').forEach(section=>{
  const types=(section.dataset.modelTypes || '').split(',').filter(Boolean);
  const category=section.dataset.modelCategory || '';
  const relevant=catalog.products.filter(p=>p.kind==='model' && (types.length ? types.includes(p.type) : p.category===category));
  if(!relevant.length){section.remove();return;}
  const label=section.dataset.modelTitle || 'Mẫu sản phẩm theo thương hiệu';
  const uid='model-browser-'+section.dataset.modelBrowser;
  section.innerHTML=`<div class="container"><div class="section-heading"><div><div class="eyebrow">Khám phá mẫu cụ thể</div><h2 id="${uid}-title" tabindex="-1">${escape(label)}</h2></div><a class="text-link" href="${base}san-pham.html${types.length===1?'?loai='+encodeURIComponent(types[0]):category?'?nhom='+encodeURIComponent(category):''}">Xem trong danh mục ↗</a></div><div class="model-browser-controls"><div><label for="${uid}-brand">Thương hiệu & nhà cung cấp</label><select id="${uid}-brand"><option value="tat-ca">Tất cả thương hiệu</option>${brands.filter(b=>relevant.some(p=>p.brandId===b.id)).map(b=>'<option value="'+escape(b.id)+'">'+escape(b.name)+'</option>').join('')}</select></div><span class="model-browser-count" aria-live="polite"></span></div><div class="catalog-product-grid"></div><nav class="model-browser-pagination" aria-label="Phân trang mẫu cụ thể"></nav><p class="catalog-footnote">Hình ảnh từ catalog thương hiệu. Chọn mẫu để xem các góc ảnh và gửi yêu cầu tư vấn.</p></div>`;
  let page=1;
  const select=$('select',section),grid=$('.catalog-product-grid',section),pager=$('.model-browser-pagination',section);
  function render(){
   const list=select.value==='tat-ca' ? relevant : relevant.filter(p=>p.brandId===select.value);
   const result=U.paginateProducts(list,page,12);page=result.page;
   grid.innerHTML=result.items.map(window.PK_UI.productCard).join('');
   $('.model-browser-count',section).textContent=list.length+' lựa chọn · Đang xem '+result.start+'–'+result.end;
   pager.hidden=result.pages<=1;
   pager.innerHTML=`<button type="button" class="btn" data-model-page="${page-1}" ${page===1?'disabled':''}>Trang trước</button><span>Trang ${page} / ${result.pages}</span><button type="button" class="btn" data-model-page="${page+1}" ${page===result.pages?'disabled':''}>Trang sau</button>`;
  }
  select.addEventListener('change',()=>{page=1;render();});
  pager.addEventListener('click',event=>{const button=event.target.closest('[data-model-page]');if(button){page=button.dataset.modelPage;render();$('#'+uid+'-title').focus();}});
  render();
 });
})();

"""Optional: update SEO URLs after GitHub Pages or custom-domain setup.
Usage: python tools/set-site-url.py https://username.github.io/repository
"""
from pathlib import Path
from urllib.parse import urlparse
import sys,json,re
ROOT=Path(__file__).resolve().parents[1]
if len(sys.argv)!=2:
    raise SystemExit('Cách dùng: python tools/set-site-url.py https://username.github.io/ten-repo')
origin=sys.argv[1].rstrip('/')
u=urlparse(origin)
if u.scheme!='https' or not u.netloc or u.query or u.fragment:
    raise SystemExit('Nhập URL HTTPS của website, không kèm query hoặc #.')
pages=[]
for p in ROOT.rglob('*.html'):
    if 'tools' in p.relative_to(ROOT).parts:continue
    text=p.read_text();rel=p.relative_to(ROOT).as_posix();url=origin+'/'+rel
    def put(pattern,value):
        global text
        if re.search(pattern,text):text=re.sub(pattern,lambda m:value,text)
        else:text=text.replace('</head>',value+'</head>')
    put(r'<link rel="canonical"[^>]*>',f'<link rel="canonical" href="{url}">')
    put(r'<meta property="og:url"[^>]*>',f'<meta property="og:url" content="{url}">')
    m=re.search(r'<meta property="og:image" content="([^"]*)"',text)
    image='assets/'+(m.group(1).split('/assets/')[-1] if m and '/assets/' in m.group(1) else m.group(1).removeprefix('../').removeprefix('assets/') if m else 'giftset.webp')
    put(r'<meta property="og:image"[^>]*>',f'<meta property="og:image" content="{origin}/{image}">')
    def schema(match):
        data=json.loads(match.group(1));data['url']=origin;data['logo']=origin+'/assets/logo.webp'
        return '<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False)+'</script>'
    text=re.sub(r'<script type="application/ld\+json">(.*?)</script>',schema,text,flags=re.S)
    if rel=='404.html':
        # Absolute base makes this page work even at unknown nested addresses.
        put(r'<base href="[^"]*">',f'<base href="{origin}/">')
    p.write_text(text)
    if 'noindex,follow' not in text:pages.append(rel)
config=ROOT/'assets/config.js'
text=config.read_text();text=re.sub(r"siteUrl:\s*(['\"])(.*?)\1",lambda m:'siteUrl: '+json.dumps(origin),text);config.write_text(text)
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n')
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{origin}/{p}</loc></url>\n' for p in pages)+'</urlset>\n')
print('Đã cập nhật URL, thẻ chia sẻ, schema và sitemap cho',len(pages),'trang.')

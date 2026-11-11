// 한 번 연 뒤에는 인터넷이 약해도 열리도록 앱 파일을 저장해 둡니다.
// 내용을 고친 뒤에는 아래 VERSION 숫자를 하나 올려 주세요.
const VERSION='v26';
const FILES=['./','index.html','mapdata.js','krmap.js','manifest.webmanifest','img/emblem-full.png','img/field1.jpg','img/field2.jpg','img/leaves.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  // 화면은 새 내용 우선, 안 되면 저장본
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});

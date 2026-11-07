(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const book = $('book'), prev = $('prev'), next = $('next'), close = $('close');
  const left = $('leftPage'), right = $('rightPage'), sheet = $('flipSheet');
  const flipFront = $('flipFront'), flipBack = $('flipBack');
  const dialog = $('tocDialog');
  const pages = Array.isArray(window.CODEX_PAGES) ? window.CODEX_PAGES : [];
  if (!pages.length || pages.length % 2 !== 0) throw new Error('Księga wymaga parzystej liczby kart w pages.js.');

  let open = false;
  let busy = false;
  let spread = 0;
  const MAX_SPREAD = pages.length / 2 - 1;
  const save = () => { try { localStorage.setItem('vojtiech-codex-spread', String(spread)); } catch (_) {} };
  try { spread = Math.max(0, Math.min(MAX_SPREAD, Number(localStorage.getItem('vojtiech-codex-spread')) || 0)); } catch (_) {}

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const folioNo = (n) => `<span class="folio-bottom">✧ &nbsp; ${n+1} &nbsp; ✧</span>`;
  const mapSvg = `<svg class="map-svg" viewBox="0 0 300 390" role="img" aria-label="Przykładowa, niehistoryczna mapa włości">
    <rect x="0" y="0" width="300" height="390" fill="#d3ba88"/>
    <path d="M-20 48 C60 38 60 78 147 47 S250 24 320 59 M-20 270 C59 241 115 303 188 253 S278 233 320 283" stroke="#7e998f" stroke-width="11" fill="none" opacity=".72"/>
    <path d="M20 30L80 360M247 25L212 369M0 180L300 198" stroke="#806b47" stroke-width="2" stroke-dasharray="5 7" fill="none"/>
    <path d="M57 143L104 87 192 104 230 170 205 257 117 270 69 230Z" fill="#a88e64" fill-opacity=".55" stroke="#6a5132" stroke-width="3"/>
    <path d="M116 164L149 136 181 164V207H116Z" fill="#6b4030" stroke="#4d2d1e" stroke-width="4"/>
    <path d="M125 165V134H135V156M168 159V130H177V170" stroke="#6b4030" stroke-width="8"/>
    <path d="M122 210H184" stroke="#54351f" stroke-width="4"/>
    <text x="150" y="308" text-anchor="middle" fill="#543b25" font-size="18" font-family="serif">ZIEMIE I GRODY</text>
    <text x="150" y="328" text-anchor="middle" fill="#674c34" font-size="11" font-style="italic">schemat demonstracyjny</text>
    <path d="M249 64L249 105M228 85H270" stroke="#694727" stroke-width="2"/><text x="249" y="55" text-anchor="middle" font-size="12" fill="#694727">N</text>
    <path d="M12 380L288 380" stroke="#64492c" stroke-width="2" opacity=".4"/>
  </svg>`;
  const swordSvg = `<svg class="sword-svg" viewBox="0 0 200 330" role="img" aria-label="Rycina miecza rycerskiego">
    <defs><linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8c7e64"/><stop offset=".5" stop-color="#ded0b4"/><stop offset="1" stop-color="#766b58"/></linearGradient></defs>
    <path d="M100 28 L116 64 L109 232 L100 268 L91 232 L84 64 Z" fill="url(#steel)" stroke="#57412e" stroke-width="4"/>
    <path d="M100 48L100 258" stroke="#705f4b" stroke-width="2"/>
    <path d="M42 237Q100 214 158 237L151 249Q100 238 49 249Z" fill="#6a4826" stroke="#4a311c" stroke-width="4"/>
    <path d="M94 247H106V294H94Z" fill="#4e3525" stroke="#9b764a" stroke-width="4"/>
    <path d="M100 294C76 294 79 318 100 318C121 318 124 294 100 294Z" fill="#ab8247" stroke="#63462b" stroke-width="4"/>
    <path d="M32 184Q100 146 168 184" stroke="#8b6c44" stroke-width="2" fill="none" opacity=".65"/>
    <path d="M32 198Q100 161 168 198" stroke="#8b6c44" stroke-width="1" fill="none" opacity=".5"/>
    <text x="100" y="21" font-size="11" font-family="serif" text-anchor="middle" fill="#86633d">FORTITUDO</text>
  </svg>`;

  function renderPage(page, number) {
    const foot = folioNo(number);
    const title = page.title ? `<h2 class="folio-title">${esc(page.title)}</h2>` : '';
    if (page.type === 'title') return `<div class="folio-content"><div class="folio-cover-title">${esc(page.title)}</div><div class="folio-line"></div><div class="page-title-ornament">❧ ✠ ❧</div><div class="folio-cover-sub">${esc(page.subtitle)}</div><p class="lead-in">${esc(page.text)}</p>${foot}</div>`;
    if (page.type === 'crest') return `<div class="folio-content">${title}<img class="crest-image" src="assets/crest.webp" alt="Oryginalny herb Vojtiecha Havela"/><p class="annotation">${esc(page.note)}</p>${foot}</div>`;
    if (page.type === 'text') return `<div class="folio-content">${title}${(page.paragraphs||[]).map((p,i)=>`<p>${i===0&&page.initial?`<span class="initial">${esc(page.initial)}</span>`:''}${esc(p)}</p>`).join('')}${page.footer?`<p class="annotation">${esc(page.footer)}</p>`:''}${foot}</div>`;
    if (page.type === 'map') return `<div class="folio-content">${title}${mapSvg}<p class="annotation">${esc(page.note)}</p>${foot}</div>`;
    if (page.type === 'drawing') return `<div class="folio-content">${title}${swordSvg}<p class="annotation">${esc(page.note)}</p>${foot}</div>`;
    return `<div class="folio-content">${foot}</div>`;
  }

  const renderSpread = () => {
    left.innerHTML = renderPage(pages[spread*2],spread*2);
    right.innerHTML = renderPage(pages[spread*2+1],spread*2+1);
  };

  function updateUI() {
    $('status').textContent = open ? `${spread*2+1}–${spread*2+2} / ${pages.length}` : 'Okładka';
    $('hint').textContent = open ? 'Kliknij stronę lub użyj strzałek ← →, aby przewracać kartki' : 'Dotknij okładki lub wybierz „Otwórz księgę”';
    prev.disabled = busy || !open || spread === 0;
    next.disabled = busy || (open && spread === MAX_SPREAD);
    next.innerHTML = open ? 'Następna <span>›</span>' : 'Otwórz księgę <span>›</span>';
    close.hidden = !open;
    $('frontCover').setAttribute('aria-hidden',open?'true':'false');
  }

  function openBook() {
    if (busy || open) return;
    busy = true;
    book.classList.remove('settled');
    book.classList.add('open');
    open = true;
    updateUI();
    setTimeout(() => {book.classList.add('settled');busy=false;updateUI();},1360);
  }

  function closeBook() {
    if (!open || busy) return;
    busy=true;book.classList.remove('settled');
    requestAnimationFrame(() => book.classList.remove('open'));
    setTimeout(()=>{open=false;busy=false;updateUI();},1370);
  }

  function turnPage(direction) {
    if (!open || busy) return;
    const destination = spread + direction;
    if (destination < 0 || destination > MAX_SPREAD) return;
    busy=true;
    sheet.className = 'flip-sheet ' + (direction===1?'forward':'backward') + ' show';
    if(direction===1) {
      flipFront.innerHTML = renderPage(pages[spread*2+1],spread*2+1);
      flipBack.innerHTML = renderPage(pages[destination*2],destination*2);
      right.innerHTML = renderPage(pages[destination*2+1],destination*2+1);
    } else {
      flipFront.innerHTML = renderPage(pages[spread*2],spread*2);
      flipBack.innerHTML = renderPage(pages[destination*2+1],destination*2+1);
      left.innerHTML = renderPage(pages[destination*2],destination*2);
    }
    updateUI();
    // Force style flush so the CSS animation always restarts on rapid successive turns.
    void sheet.offsetWidth;
    sheet.classList.add('animate');
    setTimeout(() => {
      spread = destination;
      renderSpread();
      sheet.className='flip-sheet';
      busy = false;
      save();
      updateUI();
    },1240);
  }

  function sizeBook(){
    const vw=window.innerWidth, vh=window.innerHeight;
    const hSpace = vh - (vw < 700 ? 206 : 220);
    const w = Math.max(150,Math.min(452,(vw - (vw<700?24:125))/2, hSpace/1.255));
    document.documentElement.style.setProperty('--pw',w.toFixed(2)+'px');
    document.documentElement.style.setProperty('--ph',(w*1.255).toFixed(2)+'px');
  }

  $('frontCover').addEventListener('click',openBook);
  $('frontCover').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBook();}});
  prev.addEventListener('click',()=>turnPage(-1));
  next.addEventListener('click',()=>open?turnPage(1):openBook());
  close.addEventListener('click',closeBook);
  left.addEventListener('click',()=>turnPage(-1));
  right.addEventListener('click',()=>turnPage(1));
  window.addEventListener('keydown',(e)=>{
    if(dialog.open || e.altKey || e.ctrlKey || e.metaKey) return;
    if(e.key==='ArrowRight') {e.preventDefault();open?turnPage(1):openBook();}
    if(e.key==='ArrowLeft') {e.preventDefault();turnPage(-1);}
    if(e.key==='Home' && open && !busy) {spread=0;renderSpread();save();updateUI();}
    if(e.key==='End' && open && !busy) {spread=MAX_SPREAD;renderSpread();save();updateUI();}
  });
  window.addEventListener('resize',sizeBook);
  $('fullscreen').addEventListener('click',async()=>{
    try {if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();} catch(_) { /* Browser may disallow fullscreen. */ }
  });
  $('toc').addEventListener('click',()=>dialog.showModal());
  $('closeToc').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  const entries=$('tocEntries');
  (window.CODEX_CHAPTERS||[]).forEach(ch=>{
    const b=document.createElement('button');
    b.type='button';b.textContent=ch.title;
    b.addEventListener('click',()=>{
      dialog.close();
      if(busy)return;
      spread=Math.max(0,Math.min(MAX_SPREAD,ch.spread));renderSpread();save();
      if(!open)openBook();else updateUI();
    });
    entries.appendChild(b);
  });

  // Tiny floating motes of dust, like candlelit particles in a medieval scriptorium.
  const canvas=$('dust'),ctx=canvas.getContext('2d');
  let motes=[];
  function fitDust(){
    const d=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.round(window.innerWidth*d);canvas.height=Math.round(window.innerHeight*d);
    canvas.style.width=window.innerWidth+'px';canvas.style.height=window.innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);
    motes=Array.from({length:50},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.4+Math.random()*1.5,speed:.07+Math.random()*.25,phase:Math.random()*6}));
  }
  let frame=0;
  function animateDust(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    frame++;
    for(const p of motes){
      p.y-=p.speed;p.x+=Math.sin(frame/120+p.phase)*.08;
      if(p.y<-5){p.y=innerHeight+5;p.x=Math.random()*innerWidth;}
      ctx.fillStyle='rgba(245,190,104,.43)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    }
    requestAnimationFrame(animateDust);
  }
  if(ctx && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){fitDust();animateDust();window.addEventListener('resize',fitDust);}
  sizeBook();renderSpread();updateUI();
})();

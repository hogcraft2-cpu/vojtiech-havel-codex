(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const book = $('book'), prev = $('prev'), next = $('next'), close = $('close');
  const left = $('leftPage'), right = $('rightPage'), sheet = $('flipSheet');
  const flipFront = $('flipFront'), flipBack = $('flipBack');
  const dialog = $('tocDialog'), readerDialog = $('readerDialog');
  const pages = Array.isArray(window.CODEX_PAGES) ? window.CODEX_PAGES : [];
  if (!pages.length || pages.length % 2 !== 0) throw new Error('Księga wymaga parzystej liczby kart w pages.js.');

  let open = false;
  let busy = false;
  let spread = 0;
  const MAX_SPREAD = pages.length / 2 - 1;
  const soundBtn = $('sound');
  let soundEnabled = true;
  try{ soundEnabled=localStorage.getItem('vojtiech-book-sound')!=='off'; }catch(_){}
  let audioContext;
  function playPaperSound(power=1){
    if(!soundEnabled)return;
    try {
      const API=window.AudioContext||window.webkitAudioContext;
      if(!API)return;
      audioContext ||= new API();
      if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
      const duration=.34, n=Math.floor(audioContext.sampleRate*duration),buff=audioContext.createBuffer(1,n,audioContext.sampleRate),data=buff.getChannelData(0);
      let smooth=0;
      for(let i=0;i<n;i++){
        let u=i/n, env=Math.pow(Math.sin(Math.PI*u),1.5)*(1-u);
        smooth=.73*smooth+(.27*(Math.random()*2-1));
        data[i]=(smooth+(Math.random()*2-1)*.08)*env;
      }
      const src=audioContext.createBufferSource(),lowpass=audioContext.createBiquadFilter(),gain=audioContext.createGain();
      src.buffer=buff;lowpass.type='lowpass';lowpass.frequency.value=1500;gain.gain.value=.18*power;
      src.connect(lowpass);lowpass.connect(gain);gain.connect(audioContext.destination);src.start();
    }catch(_){}
  }
  function updateSound(){
    if(!soundBtn)return;
    soundBtn.textContent=soundEnabled?'♪':'♩';
    soundBtn.title=soundEnabled?'Wyłącz dźwięk kartek':'Włącz dźwięk kartek';
    soundBtn.setAttribute('aria-label',soundBtn.title);
    soundBtn.setAttribute('aria-pressed',String(soundEnabled));
  }
  if(soundBtn){soundBtn.addEventListener('click',()=>{
    soundEnabled=!soundEnabled;
    try{localStorage.setItem('vojtiech-book-sound',soundEnabled?'on':'off')}catch(_){}
    updateSound(); if(soundEnabled)playPaperSound(.3);
  });updateSound();}
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

  // Painted plate placement follows the chronology; each folio remains editable HTML.
  const scenicFolios = {3:'village',7:'training',11:'stables',14:'knight',16:'training',20:'stables',25:'knight',28:'village',31:'training',32:'stables',35:'knight',36:'village'};
  const sceneCaptions = {village:'Přítoky i okolice Kuttenbergu',training:'Pierwsze nauki szermierki',stables:'Stajnia i dawna codzienność',knight:'Jan Švarc i jego giermek'};
  function renderPage(page, number) {
    const foot = folioNo(number);
    const title = page.title ? '<h2 class="folio-title">'+esc(page.title)+'</h2>' : '';
    const wrapper=(body,cls='')=>'<div class="folio-content illuminated-page '+cls+'">'+body+foot+'</div>';
    const smallCross='<span class="folio-glyph" aria-hidden="true">❧ ✠ ❧</span>';
    if(page.type==='backcover') return '<div class="folio-content rear-content"><div class="rear-cover"><span class="rear-border"></span><span class="rear-symbol">✠</span><span class="rear-headline">'+esc(page.title)+'</span><span class="rear-ornament">❧ ✠ ❧</span><span class="rear-subtitle">'+esc(page.subtitle)+'</span></div></div>';
    if(page.type==='title') return wrapper('<div class="folio-prologue">Kronika z początków XV stulecia</div><div class="folio-cover-title">'+esc(page.title)+'</div><div class="folio-line"></div><div class="page-title-ornament">❦ ✠ ❦</div><div class="folio-cover-sub">'+esc(page.subtitle)+'</div><p class="lead-in">'+esc(page.text)+'</p>'+smallCross,'title-illuminated');
    if(page.type==='crest') return wrapper(title+'<img class="crest-image" src="assets/crest.webp" alt="Herb Vojtiecha Havela — czarny kruk"/><p class="annotation">'+esc(page.note)+'</p>'+smallCross,'heraldic-page');
    if(page.type==='illustration') {
      const scene=['village','training','stables','knight'].includes(page.scene)?page.scene:'village';
      return wrapper(title+'<figure class="illustration-frame"><div class="story-illustration scene-'+scene+'" role="img" aria-label="'+esc(page.title)+'"></div><figcaption>'+esc(page.note || sceneCaptions[scene])+'</figcaption></figure>'+smallCross,'illustrated');
    }
    if(page.type==='text'){
      const scene=page.plate || scenicFolios[number];
      const vignette=scene && sceneCaptions[scene]?
        '<figure class="folio-vignette"><span class="folio-vignette-art scene-'+scene+'" role="img" aria-label="'+esc(sceneCaptions[scene])+'"></span><figcaption>'+esc(sceneCaptions[scene])+'</figcaption></figure>':'';
      const initialIsLetter=page.initial&&/^\p{L}$/u.test(page.initial);
      const paragraphs=(page.paragraphs||[]).map((paragraph,i)=>{
        const start=i===0 && page.initial?(initialIsLetter?'<span class="initial">'+esc(page.initial)+'</span>':esc(page.initial)):'';
        return '<p>'+start+esc(paragraph)+'</p>';
      }).join('');
      const chapter=page.title?.startsWith('Rozdział') ? 'chapter-folio' : '';
      return wrapper(title+vignette+paragraphs+(page.footer?'<p class="annotation">'+esc(page.footer)+'</p>':'')+smallCross,'prose-folio '+chapter);
    }
    if(page.type==='map') return wrapper(title+mapSvg+'<p class="annotation">'+esc(page.note)+'</p>','map-page');
    if(page.type==='drawing') return wrapper(title+swordSvg+'<p class="annotation">'+esc(page.note)+'</p>','drawing-page');
    if(page.type==='blank') return wrapper('<div class="blank-message">Tutaj zapisze się dalsza historia</div>','blank-page');
    return wrapper(title+smallCross);
  }

  function fitFolio(el) {
    const node = el.querySelector('.folio-content');
    if (!node) return;
    node.style.fontSize = '';
    node.style.lineHeight = '';
    const base = Number.parseFloat(getComputedStyle(node).fontSize) || 16;
    const min = innerWidth < 500 ? 9 : 12;
    let size = base;
    for(let attempts=0;attempts<18 && node.scrollHeight > node.clientHeight+2 && size>min;attempts++){
      size=Math.max(min,size-.5);
      node.style.fontSize=size+'px';
      node.style.lineHeight='1.32';
    }
  }
  const renderSpread = () => {
    left.innerHTML = renderPage(pages[spread*2],spread*2);
    right.innerHTML = renderPage(pages[spread*2+1],spread*2+1);
    fitFolio(left);fitFolio(right);
    left.classList.toggle('is-backcover',pages[spread*2]?.type==='backcover');
    right.classList.toggle('is-backcover',pages[spread*2+1]?.type==='backcover');
  };

  function updateUI() {
    $('status').textContent = open ? `${spread*2+1}–${spread*2+2} / ${pages.length}` : 'Okładka';
    $('hint').textContent = open ? 'Kliknij stronę lub użyj strzałek ← →, aby przewracać kartki' : 'Dotknij okładki lub wybierz „Otwórz księgę”';
    prev.disabled = busy || !open || spread === 0;
    next.disabled = busy || (open && spread === MAX_SPREAD);
    next.innerHTML = open ? 'Następna <span>›</span>' : 'Otwórz księgę <span>›</span>';
    close.hidden = !open;
    $('reader').disabled = !open || busy;
    $('frontCover').setAttribute('aria-hidden',open?'true':'false');
  }

  function openBook() {
    if (busy || open) return;
    busy = true;
    book.classList.remove('settled');
    book.classList.add('open');
    playPaperSound(.58);
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
    playPaperSound();
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
    fitFolio(flipFront);fitFolio(flipBack);fitFolio(left);fitFolio(right);
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
    const availableHeight=vh-(vw < 700 ? 172 : 172);
    const sideMargin=vw < 700 ? 18 : Math.max(100,Math.round(vw*.1));
    const w=Math.max(145,Math.min(720,(vw-sideMargin)/2,availableHeight/1.30));
    document.documentElement.style.setProperty('--pw',w.toFixed(2)+'px');
    document.documentElement.style.setProperty('--ph',(w*1.30).toFixed(2)+'px');
  }

  $('frontCover').addEventListener('click',openBook);
  $('frontCover').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBook();}});
  prev.addEventListener('click',()=>turnPage(-1));
  next.addEventListener('click',()=>open?turnPage(1):openBook());
  close.addEventListener('click',closeBook);
  left.addEventListener('click',()=>turnPage(-1));
  right.addEventListener('click',()=>turnPage(1));
  window.addEventListener('keydown',(e)=>{
    if(dialog.open || readerDialog.open || e.altKey || e.ctrlKey || e.metaKey) return;
    if(e.key==='ArrowRight') {e.preventDefault();open?turnPage(1):openBook();}
    if(e.key==='ArrowLeft') {e.preventDefault();turnPage(-1);}
    if(e.key==='Home' && open && !busy) {spread=0;renderSpread();save();updateUI();}
    if(e.key==='End' && open && !busy) {spread=MAX_SPREAD;renderSpread();save();updateUI();}
  });
  window.addEventListener('resize',()=>{sizeBook();requestAnimationFrame(()=>{fitFolio(left);fitFolio(right);});});
  $('fullscreen').addEventListener('click',async()=>{
    try {if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();} catch(_) { /* Browser may disallow fullscreen. */ }
  });

  // The optional reader provides legible, scrollable text on narrow screens
  // while the 3D codex stays a two-page, non-scrolling object.
  const readerPages=$('readerPages');
  function showReader(){
    if(!open||busy)return;
    readerPages.innerHTML=
      '<article class="reader-leaf">'+renderPage(pages[spread*2],spread*2)+'</article>'+
      '<article class="reader-leaf">'+renderPage(pages[spread*2+1],spread*2+1)+'</article>';
    readerDialog.showModal();
  }
  $('reader').addEventListener('click',showReader);
  $('closeReader').addEventListener('click',()=>readerDialog.close());
  readerDialog.addEventListener('click',e=>{if(e.target===readerDialog)readerDialog.close();});
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

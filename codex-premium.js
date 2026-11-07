/* Codex Premium: independent progressive enhancement, never replaces story/navigation. */
(() => {
  'use strict';
  document.body.classList.add('codex-premium');
  const book=document.getElementById('book');
  if (!book) return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const desk=document.createElement('div');
  desk.className='scribe-objects';
  desk.setAttribute('aria-hidden','true');
  desk.innerHTML='<svg class="scribe-quill" viewBox="0 0 150 360" aria-hidden="true"><defs><linearGradient id="qshaft" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#3c2517"/><stop offset=".5" stop-color="#e1c48d"/><stop offset="1" stop-color="#856137"/></linearGradient></defs><path d="M74 330 Q88 218 95 120 Q105 52 117 16 Q72 18 43 76 Q32 117 41 149 Q53 120 70 98 Q56 145 65 178 Q72 196 83 187Z" fill="#bfa67a" stroke="#5b4936" stroke-width="3"/><path d="M74 333 Q92 177 116 17" fill="none" stroke="url(#qshaft)" stroke-width="4"/><path d="M83 181L44 149M92 128L51 128M103 76L72 77M78 217L60 196M99 99L123 87" stroke="#765d3e" stroke-width="2"/><path d="M74 332L70 349L80 336Z" fill="#21160e"/></svg><div class="scribe-wax"></div>';
  document.body.appendChild(desk);
  const embers=document.createElement('div');
  embers.className='emberfield';
  embers.setAttribute('aria-hidden','true');
  document.body.appendChild(embers);

  const symbols=['❦','✠','⚜','✧','♜','❧','✥','✣','❃'];
  const decorated=new WeakMap();
  function enrichFolio(article){
    const content=article.querySelector('.folio-content');
    if(!content || decorated.get(article)===content) return;
    decorated.set(article,content);
    const raw=content.querySelector('.folio-bottom')?.textContent || '';
    const number=Number((raw.match(/\d+/)||[])[0])||0;
    if(content.classList.contains('prose-folio') && !content.classList.contains('chapter-folio')){
      const mark=document.createElement('span');
      mark.className='prem-marginalia';
      mark.textContent=symbols[number%symbols.length];
      mark.setAttribute('aria-hidden','true');
      mark.style.setProperty('--marginal-height',(47+(number%4)*6)+'%');
      article.appendChild(mark);
    }
    if(content.classList.contains('chapter-folio')){
      article.dataset.chapterFolio='true';
      const mark=document.createElement('span');
      mark.className='prem-chapter-mark';
      mark.textContent='✠';
      mark.setAttribute('aria-hidden','true');
      article.appendChild(mark);
    } else delete article.dataset.chapterFolio;
  }
  const folios=Array.from(document.querySelectorAll('.folio,.sheet-side'));
  const observer=new MutationObserver(()=>{
    for(const el of folios) enrichFolio(el);
  });
  observer.observe(book,{childList:true,subtree:true});
  folios.forEach(enrichFolio);

  let scheduled=false,glowX=50,glowY=45;
  book.addEventListener('pointermove',e=>{
    if(reduceMotion.matches || !book.classList.contains('open'))return;
    const rect=book.getBoundingClientRect();
    glowX=Math.max(0,Math.min(100,100*(e.clientX-rect.left)/rect.width));
    glowY=Math.max(0,Math.min(100,100*(e.clientY-rect.top)/rect.height));
    if(!scheduled){
      scheduled=true;
      requestAnimationFrame(()=>{
        book.style.setProperty('--glow-x',glowX+'%');
        book.style.setProperty('--glow-y',glowY+'%');
        scheduled=false;
      });
    }
  },{passive:true});
  book.addEventListener('pointerleave',()=>{
    book.style.setProperty('--glow-x','48%');
    book.style.setProperty('--glow-y','37%');
  });
  const flip=document.getElementById('flipSheet');
  if(flip){
    let hadFlip=false;
    const flipWatcher=new MutationObserver(()=>{
      const now=flip.classList.contains('animate');
      if(now&&!hadFlip&&!reduceMotion.matches){
        book.classList.remove('premium-flip');
        void book.offsetWidth;
        book.classList.add('premium-flip');
        setTimeout(()=>book.classList.remove('premium-flip'),1270);
      }
      hadFlip=now;
    });
    flipWatcher.observe(flip,{attributes:true,attributeFilter:['class']});
  }
})();

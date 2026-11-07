/* Atelier composition: handcrafted folio accents without changing story or navigation. */
(() => {
  'use strict';
  const book=document.getElementById('book');
  if (!book) return;
  document.body.classList.add('codex-atelier');
  const symbols=['✥','❦','⚜','✣','✠','❧','✧','♜'];
  const cached=new WeakMap();
  const folios=Array.from(book.querySelectorAll('.folio,.sheet-side'));
  function decorate(article){
    const content=article.querySelector('.folio-content');
    if(!content || cached.get(article)===content)return;
    cached.set(article,content);
    article.querySelectorAll(':scope > .atelier-stamp,:scope > .atelier-border-flower').forEach(el=>el.remove());
    article.classList.remove('atelier-chapter','atelier-column','atelier-plate','atelier-prose',
      'plate-variant-0','plate-variant-1','plate-variant-2','plate-variant-3');
    const n=Number((content.querySelector('.folio-bottom')?.textContent||'').match(/\d+/)?.[0]||0);
    const isChapter=content.classList.contains('chapter-folio');
    const isPlate=content.classList.contains('illustrated');
    const isProse=content.classList.contains('prose-folio');
    const isTitle=content.classList.contains('title-illuminated');
    const isHerald=content.classList.contains('heraldic-page');
    if(isChapter)article.classList.add('atelier-chapter');
    else if(isPlate){article.classList.add('atelier-plate','plate-variant-'+(n%4));}
    else if(isProse)article.classList.add('atelier-prose','atelier-column');
    if(!(isProse||isPlate||isChapter||isHerald||isTitle))return;
    if(isPlate || isChapter || isHerald){
      const mark=document.createElement('span');
      mark.className='atelier-stamp';
      mark.textContent=symbols[(n+2)%symbols.length];
      mark.style.setProperty('--stamp-rotation',((n%7)-4)*5+'deg');
      mark.setAttribute('aria-hidden','true');
      article.appendChild(mark);
    }
    if(n%3===0 || isChapter){
      const flower=document.createElement('span');
      flower.className='atelier-border-flower';
      flower.style.setProperty('--floral-rotation',((n%5)-2)*13+'deg');
      flower.setAttribute('aria-hidden','true');
      article.appendChild(flower);
    }
  }
  // MutationObserver is required because the book reuses DOM elements for every turn.
  let scheduled=false;
  const observer=new MutationObserver(()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      for(const el of folios)decorate(el);
    });
  });
  observer.observe(book,{childList:true,subtree:true});
  folios.forEach(decorate);

  const embers=document.createElement('div');
  embers.className='atelier-embers';
  embers.setAttribute('aria-hidden','true');
  document.body.appendChild(embers);
  const caption=document.createElement('div');
  caption.className='atelier-reading-caption';
  caption.setAttribute('aria-hidden','true');
  caption.textContent='❦  LIBER CHRONICARUM  ❦';
  book.appendChild(caption);

  // Accessibility: effects must never obscure actual prose, and can be disabled.
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches) document.body.classList.add('atelier-still');
})();

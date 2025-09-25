/* delivered-per-instruction */
const EMAIL_TO = ""; // später setzen (mailto-Fallback)

/* Kurz-Utils */
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Burger-Menü – arbeitet mit <nav id="site-nav" hidden> */
(() => {
  const burger = $('.burger');
  const nav = $('#site-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = !nav.hasAttribute('hidden');
    if (open) {
      nav.setAttribute('hidden','');
      burger.setAttribute('aria-expanded','false');
    } else {
      nav.removeAttribute('hidden');
      burger.setAttribute('aria-expanded','true');
    }
  });

  /* Auto-close beim Klick auf Link */
  nav.addEventListener('click', (e)=>{
    if (e.target.tagName === 'A') {
      nav.setAttribute('hidden','');
      burger.setAttribute('aria-expanded','false');
    }
  });
})();

/* Intro-Video: Play/Pause + Mute (iOS sicher) */
(() => {
  const video = $('#introVideo');
  const btnPlayPause = $('#btnPlayPause');
  const btnMute = $('#btnMute');
  if (!video) return;

  video.muted = true;                 // Autoplay auf iOS nur stumm
  video.play().catch(()=>{});         // ok, falls User-Geste fehlt

  btnPlayPause?.addEventListener('click', ()=>{
    if (video.paused) { video.play().catch(()=>{}); } else { video.pause(); }
  });

  btnMute?.addEventListener('click', ()=>{
    video.muted = !video.muted;
    // Button-Text bleibt neutral, keine Dynamik nötig
  });
})();

/* Nur ein Audio gleichzeitig */
document.addEventListener('play',(ev)=>{
  if (ev.target.tagName !== 'AUDIO') return;
  $$('audio').forEach(a => { if (a !== ev.target) a.pause(); });
}, true);

/* Tracks: .track-mini toggelt eigenes .track-drop, schließt andere */
(() => {
  function closeAllDrops(exceptId){
    $$('.track-drop').forEach(el=>{
      if (el.id !== exceptId) el.setAttribute('hidden','');
    });
  }
  document.addEventListener('click',(ev)=>{
    const mini = ev.target.closest('.track-mini');
    if (!mini) return;
    const targetId = mini.getAttribute('data-target');
    const drop = targetId ? $('#'+CSS.escape(targetId)) : null;
    if (!drop) return;
    const isHidden = drop.hasAttribute('hidden');
    closeAllDrops(targetId);
    if (isHidden) drop.removeAttribute('hidden'); else drop.setAttribute('hidden','');
  });
})();

/* BIOS laden – erzeugt teaser/full dynamisch + Mapping für Skank/Skaramush */
(async () => {
  try{
    const res = await fetch('assets/data/bios.html', {cache:'no-store'});
    if(!res.ok) return;
    const html = await res.text();
    const tmp = document.createElement('div'); tmp.innerHTML = html;

    const idMap = (id) => {
      if (id === 'bio-skank') return '#bio-schablonski';
      if (id === 'bio-skara') return '#bio-skaramush';
      return '#'+id; // bio-erling, bio-henri, bio-fleur direkt
    };

    document.querySelectorAll('.bio[data-bio-id]').forEach(box=>{
      const id  = box.dataset.bioId;
      const src = tmp.querySelector(idMap(id));
      if(!src) return;

      const paras = Array.from(src.querySelectorAll('p'));
      if(paras.length===0) return;

      // Teaser = erster Absatz + „… Text erweitern“
      const teaser = document.createElement('div');
      teaser.className = 'bio-teaser';
      teaser.innerHTML = `<p>${paras[0].innerHTML} … <span class="bio-toggle" aria-expanded="false"><b>Text erweitern</b></span></p>`;

      // Full = alle Absätze, initial hidden
      const full = document.createElement('div');
      full.className = 'bio-full';
      full.innerHTML = paras.map(p=>`<p>${p.innerHTML}</p>`).join('');
      full.setAttribute('hidden','');

      box.appendChild(teaser);
      box.appendChild(full);
    });
  }catch(e){}
})();

/* Bio Toggle */
document.addEventListener('click',(ev)=>{
  const btn = ev.target.closest('.bio-toggle');
  if(!btn) return;
  const box = btn.closest('.bio');
  if(!box) return;
  const full = box.querySelector('.bio-full');
  if(!full) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  if (expanded){
    full.setAttribute('hidden','');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = '<b>… Text erweitern</b>';
    box.scrollIntoView({behavior:'smooth', block:'start'});
  } else {
    full.removeAttribute('hidden');
    btn.setAttribute('aria-expanded','true');
    btn.innerHTML = '<b>Text einklappen</b>';
  }
});

/* Kommentar per Mail (mailto-Fallback) */
(() => {
  const form = $('.comment-form');
  if (!form) return;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = $('#c-name')?.value?.trim() || '';
    const msg  = $('#c-message')?.value?.trim() || '';
    if (!msg){
      alert('Bitte eine Nachricht eingeben.');
      return;
    }
    if (!EMAIL_TO){
      alert('Zieladresse fehlt. In assets/js/main.js EMAIL_TO setzen.');
      return;
    }
    const subject = encodeURIComponent('Nachricht von der ROKKO! Records Website');
    const body = encodeURIComponent((name?(`Name: ${name}\n\n`):'') + msg);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  });
})();

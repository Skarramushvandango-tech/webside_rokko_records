/* delivered-per-instruction */
const EMAIL_TO = ""; // später setzen

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* burger-menü (passt zu <nav id="main-nav" class="nav"> + .nav.is-open in CSS) */
const burger = document.querySelector('.burger');
const nav = document.querySelector('#main-nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
/* intro-video sound toggle (passt zu #introVideo und .video-sound-controls mit 2 Buttons) */
const video = document.querySelector('#introVideo');
const btnOn  = document.querySelector('.btn-sound-on');
const btnOff = document.querySelector('.btn-sound-off');

function updateSoundButtons() {
  if (!btnOn || !btnOff || !video) return;
  btnOn.setAttribute('aria-pressed', String(!video.muted));
  btnOff.setAttribute('aria-pressed', String(video.muted));
}

if (video) { video.muted = true; updateSoundButtons(); }

if (btnOn && video) {
  btnOn.addEventListener('click', () => {
    video.muted = false;
    updateSoundButtons();
    if (video.paused) video.play().catch(()=>{});
  });
}
if (btnOff && video) {
  btnOff.addEventListener('click', () => {
    video.muted = true;
    updateSoundButtons();
  });
}

/* video-fallback (setzt auf .video-wrap und #introVideo) */
(function(){
  const wrap = document.querySelector('.video-wrap');
  const vid  = document.querySelector('#introVideo');
  if (!wrap || !vid) return;
  const fallback = () => {
    if (!wrap.classList.contains('video-hero--fallback')) {
      vid.remove();
      wrap.classList.add('video-hero--fallback');
    }
  };
  setTimeout(()=> { if (vid.readyState < 2 || vid.videoWidth === 0) fallback(); }, 1200);
  vid.addEventListener('error', fallback);
})();

/* bios laden (passt zu .bio .bio-teaser .bio-full, data-bio-id=...) */
(async function loadBios(){
  try{
    const res = await fetch('assets/data/bios.html', {cache:'no-store'});
    if(!res.ok) return;
    const html = await res.text();
    const tmp = document.createElement('div'); tmp.innerHTML = html;

    document.querySelectorAll('.bio[data-bio-id]').forEach(box=>{
      const id  = box.dataset.bioId;
      const src = tmp.querySelector('#'+CSS.escape(id));
      if(!src) return;
      const paras = Array.from(src.querySelectorAll('p'));
      if(paras.length===0) return;

      const teaser = box.querySelector('.bio-teaser');
      const full   = box.querySelector('.bio-full');

      if (teaser) {
        teaser.textContent = paras[0].textContent.trim() + ' …';
      }
      if (full) {
        full.innerHTML = paras.map(p=>`<p>${p.innerHTML}</p>`).join('');
        full.setAttribute('hidden','');
      }
    });
  }catch(e){}
})();

/* bio toggle */
document.addEventListener('click',(ev)=>{
  const btn = ev.target.closest('.bio-toggle');
  if(!btn) return;
  const box = btn.closest('.bio');
  const full = box.querySelector('.bio-full');
  const expanded = btn.getAttribute('aria-expanded')==='true';
  if(expanded){
    full.setAttribute('hidden','');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = '<b>… Text erweitern</b>';
  }else{
    full.removeAttribute('hidden');
    btn.setAttribute('aria-expanded','true');
    btn.innerHTML = '<b>Text einklappen</b>';
  }
});

/* releases: toggle auf/zu (kein auto-schließen anderer) */
document.addEventListener('click',(ev)=>{
  const mini = ev.target.closest('.release-mini');
  if(!mini) return;
  const id = mini.dataset.expand;
  const panel = document.getElementById(id);
  if(!panel) return;
  if (panel.hasAttribute('hidden')) panel.removeAttribute('hidden'); else panel.setAttribute('hidden','');
});

/* nur ein audio gleichzeitig */
document.addEventListener('play',(ev)=>{
  if(ev.target.tagName!=='AUDIO') return;
  $$('audio').forEach(a=>{ if(a!==ev.target) a.pause(); });
}, true);

/* kommentar per mail */
const form = $('#comment-form');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const txt = $('#comment-text').value.trim();
    if (!txt) return;
    if (!EMAIL_TO) { alert('zieladresse fehlt.'); return; }
    const subject = encodeURIComponent('Nachricht von der ROKKO! Records Website');
    const body = encodeURIComponent(txt);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  });
}

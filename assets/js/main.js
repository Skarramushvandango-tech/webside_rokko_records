/* ==== Kommentarziel (E-Mail) ==== */
const EMAIL_TO = ""; // später setzen

/* ==== Burger-Menü ==== */
const burger = document.querySelector('.burger');
const nav = document.getElementById('site-nav');

// Sicherheitsgurt: falls hidden vergessen/überschrieben wurde
if (nav && !nav.hasAttribute('hidden')) nav.setAttribute('hidden','');

if (burger && nav) {
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
}

/* ==== Intro-Video Sound Toggle ==== */
const video = document.getElementById('intro-video');
const soundBtn = document.getElementById('sound-toggle');
if (video && soundBtn) {
  soundBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    soundBtn.textContent = `Sound: ${video.muted ? 'aus' : 'an'}`;
    soundBtn.setAttribute('aria-pressed', String(!video.muted));
    if (video.paused) video.play().catch(()=>{});
  });
}

/* ==== Video-Fallback ==== */
(function(){
  const vid = document.getElementById('intro-video');
  const hero = document.querySelector('.video-hero');
  if (!vid || !hero) return;
  const fallback = () => {
    if (!hero.classList.contains('video-hero--fallback')) {
      vid.remove();
      hero.classList.add('video-hero--fallback');
    }
  };
  setTimeout(()=> {
    if (vid.readyState < 2 || vid.videoWidth === 0) fallback();
  }, 1200);
  vid.addEventListener('error', fallback);
})();

/* ==== Bios extern laden ==== */
(async function loadBios(){
  try{
    const res = await fetch('assets/data/bios.html', {cache:'no-store'});
    if(!res.ok) return;
    const html = await res.text();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    // Label-Text
    const aboutBox = document.getElementById('about-text');
    if (aboutBox && aboutBox.dataset.bioId) {
      const src = tmp.querySelector('#'+CSS.escape(aboutBox.dataset.bioId));
      if (src) aboutBox.innerHTML = src.innerHTML;
    }

    // Artists
    document.querySelectorAll('.bio[data-bio-id]').forEach(box=>{
      const id = box.getAttribute('data-bio-id');
      const src = tmp.querySelector('#'+CSS.escape(id));
      if(!src) return;
      const paras = Array.from(src.querySelectorAll('p'));
      if(paras.length === 0) return;

      const previewP = box.querySelector('.bio-preview');
      const fullDiv  = box.querySelector('.bio-full');

      previewP.textContent = paras[0].textContent.trim() + ' …';
      if(paras.length > 1){
        fullDiv.innerHTML = paras.slice(1).map(p=>`<p>${p.innerHTML}</p>`).join('');
      }
    });
  }catch(e){}
})();

/* ==== Bio expand/collapse ==== */
document.addEventListener('click', (ev)=>{
  const btn = ev.target.closest('.bio-toggle');
  if(!btn) return;
  const box = btn.closest('.bio');
  const full = box.querySelector('.bio-full');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
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

/* ==== Releases toggeln ==== */
document.querySelectorAll('.release-mini').forEach(mini => {
  mini.addEventListener('click', () => {
    const targetId = mini.dataset.expand;
    const panel = document.getElementById(targetId);
    if (!panel) return;
    const artistSection = mini.closest('.artist');
    if (artistSection) artistSection.querySelectorAll('.release-panel').forEach(p => p.setAttribute('hidden',''));
    if (panel.hasAttribute('hidden')) panel.removeAttribute('hidden'); else panel.setAttribute('hidden','');
  });
});

/* ==== Nur ein Audio gleichzeitig ==== */
const allAudios = document.querySelectorAll('audio[data-track]');
allAudios.forEach(a => {
  a.addEventListener('play', () => {
    allAudios.forEach(other => { if (other !== a) other.pause(); });
  });
});

/* ==== Kommentar per Mail ==== */
const form = document.getElementById('comment-form');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const txt = document.getElementById('comment-text').value.trim();
    if (!txt) return;
    if (!EMAIL_TO) {
      alert('Zieladresse noch nicht hinterlegt. Bitte E-Mail-Adresse setzen.');
      return;
    }
    const subject = encodeURIComponent('Nachricht von der ROKKO! Records Website');
    const body = encodeURIComponent(txt);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  });
}

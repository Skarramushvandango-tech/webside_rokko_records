// include partials
async function includePartials(){
  const nodes = document.querySelectorAll('[data-include]');
  for (const el of nodes) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, {cache:'no-store'});
      el.innerHTML = await res.text();
    } catch (err) {
      console.error('Include failed', url, err);
      el.innerHTML = '<section class="card"><div class="inner-block">Abschnitt konnte nicht geladen werden.</div></section>';
    }
  }
}

// init menu
function initMenu(){
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', ()=>{
    menu.classList.toggle('menu--open');
    burger.setAttribute('aria-expanded', menu.classList.contains('menu--open'));
  });
}

// hero sound
function initHero(){
  const video = document.getElementById('introVideo');
  const soundBtn = document.getElementById('soundBtn');
  if (!video || !soundBtn) return;
  let muted = true;
  soundBtn.addEventListener('click', ()=>{
    muted = !muted;
    video.muted = muted;
    soundBtn.textContent = muted ? 'Ton: Aus' : 'Ton: An';
    soundBtn.setAttribute('aria-pressed', String(!muted));
  });
}

// bios: teaser inline + expand/collapse
function initBios(){
  function trim(t,max){
    const s = (t||'').replace(/\s+/g,' ').trim();
    if (s.length<=max) return s;
    const cut = s.lastIndexOf(' ', max-1);
    return (cut>0? s.slice(0,cut) : s.slice(0,max)).trim();
  }
  function firstP(html){
    const d = document.createElement('div'); d.innerHTML = html;
    const p = d.querySelector('p'); return p ? p.innerHTML : d.textContent || '';
  }

  fetch('assets/data/bios.html').then(r=>r.text()).then(html=>{
    const src = document.createElement('div'); src.innerHTML = html;
    document.querySelectorAll('.bio').forEach(b=>{
      const id = b.getAttribute('data-bio-id');
      const node = src.querySelector('#'+id);
      if (!node) return;
      const fullHTML = node.innerHTML.trim();
      const first = firstP(fullHTML).replace(/\u00A0/g,'').replace(/<[^>]+>/g,'');
      const teaser = trim(first, 260);

      let textEl = b.querySelector('.bio-text');
      if (!textEl) { textEl = document.createElement('p'); textEl.className='bio-text'; b.prepend(textEl); }

      function setTeaser(){
        textEl.textContent = teaser + ' … ';
        const span = document.createElement('span');
        span.className='bio-toggle';
        span.textContent = 'Text erweitern';
        span.addEventListener('click',(e)=>{ e.stopPropagation(); setFull(); });
        textEl.appendChild(span);
      }
      function setFull(){
        textEl.innerHTML = fullHTML + ' ';
        const span = document.createElement('span');
        span.className='bio-toggle';
        span.textContent = 'Text einklappen';
        span.addEventListener('click',(e)=>{ e.stopPropagation(); setTeaser(); });
        textEl.appendChild(span);
      }

      setTeaser();
    });
  }).catch(()=>{ document.querySelectorAll('.bio .bio-text').forEach(el=>el.textContent='Biografie konnte nicht geladen werden.'); });
}

// Audio players: one at a time
const RELEASES = {
  "henri": {
    "lafemme": {
      cover: "artists/henri_bellieu/cover/la_femme.png",
      tracks: [
        {name:"La Femme - Original Mix", src:"artists/henri_bellieu/audio_files/lafemme/la_femme_main.m4a"},
        {name:"La Femme - Deux Mix", src:"artists/henri_bellieu/audio_files/lafemme/la_femme_deux.m4a"}
      ]
    },
    "colibri": {
      cover: "artists/henri_bellieu/cover/petite_colibri.png",
      tracks: [
        {name:"Petite Colibri - Original Mix", src:"artists/henri_bellieu/audio_files/petitecolibri/petite_colibri_main.m4a"},
        {name:"Petite Colibri - Ennio Mix", src:"artists/henri_bellieu/audio_files/petitecolibri/petite_colibri_ennio_mix.m4a"},
        {name:"Petite Colibri - Nocturne Mix", src:"artists/henri_bellieu/audio_files/petitecolibri/petite_colibri_nocturne_mix.m4a"}
      ]
    }
  },
  "erling": {
    "schlafen": {
      cover: "artists/erling/cover/endlich_schlafen_cover.png",
      tracks: [
        {name:"endlich schlafen - Original Mix", src:"artists/erling/audio_files/schlafen/endlich_schlafen_main.m4a"},
        {name:"endlich schlafen - MonoToni RMX", src:"artists/erling/audio_files/schlafen/endlich_schlafen_monotoni.m4a"}
      ]
    },
    "regen": {
      cover: "artists/erling/cover/regen_cover.png",
      tracks: [
        {name:"Tag an dem es regnet - Original Mix", src:"artists/erling/audio_files/tagregnet/regnet_main.m4a"},
        {name:"Tag an dem es regnet - RMX", src:"artists/erling/audio_files/tagregnet/regnet_rmx.m4a"}
      ]
    }
  },
  "fleurbenuine": {
    "feu": {
      cover: "artists/fleur_et_beunie/cover/feu_leger_cover.png",
      tracks: [
        {name:"Feu Léger - Original Mix", src:"artists/fleur_et_beunie/audio_files/feu_leger/feu_leger_main.m4a"},
        {name:"Feu Léger - Sundown Mix", src:"artists/fleur_et_beunie/audio_files/feu_leger/feu_leger_sundown_mix.m4a"},
        {name:"Feu Léger - House Mix", src:"artists/fleur_et_beunie/audio_files/feu_leger/feu_leger_house_mix.m4a"},
        {name:"Feu Léger - Classic Mix", src:"artists/fleur_et_beunie/audio_files/feu_leger/feu_leger_french_classic_mix.m4a"},
        {name:"Feu Léger - Club Mix", src:"artists/fleur_et_beunie/audio_files/feu_leger/feu_leger_club_mix.m4a"}
      ]
    }
  },
  "skank_schablonski": {
    "merz": {
      cover: "artists/skank_schablonski/cover/kohle_raus_cover.png",
      tracks: [
        {name:"Kohle raus - Original Mix", src:"artists/skank_schablonski/audio_files/kohle_raus/kohle_raus_main.m4a"},
        {name:"Kohle raus - RMX", src:"artists/skank_schablonski/audio_files/kohle_raus/kohle_raus_rmx.m4a"}
      ]
    }
  },
  "skaramush_vandango": {
    "fire": {
      cover: "artists/skaramush_vandango/cover/cover_fire.png",
      tracks: [
        {name:"Set the world on Fire - Original Mix", src:"artists/skaramush_vandango/audio_files/set_fire/set_on_fire_original.m4a"},
        {name:"Set the world on Fire - RMX", src:"artists/skaramush_vandango/audio_files/set_fire/set_on_fire_rmx.m4a"}
      ]
    }
  }
};

let currentAudio = null;
function stopCurrent(){
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if(currentAudio._button) currentAudio._button.dataset.state = 'play';
    if(currentAudio._fill) currentAudio._fill.style.width = '0%';
    currentAudio = null;
  }
}

function initTracks(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.track');
    if(!btn) return;
    const section = btn.closest('.card.artist');
    const artistKey = section.getAttribute('data-artist');
    const releaseKey = btn.getAttribute('data-release');
    const data = (RELEASES[artistKey]||{})[releaseKey];
    if(!data) return;

    const panel = section.querySelector('.album-panel');
    const coverEl = section.querySelector('.album-panel__cover');
    const playersEl = section.querySelector('.album-panel__players');

    coverEl.src = data.cover;
    coverEl.alt = btn.querySelector('.track-title')?.textContent||'Album Cover';

    playersEl.innerHTML = '';
    data.tracks.forEach(t=>{
      const row = document.createElement('div'); row.className='player';
      const title = document.createElement('div'); title.className='player-title'; title.textContent = t.name;
      const controls = document.createElement('div'); controls.className='player-controls';
      const playBtn = document.createElement('button'); playBtn.className='player-btn'; playBtn.type='button'; playBtn.dataset.state='play';
      playBtn.setAttribute('aria-label','Abspielen/Pause');

      const bar = document.createElement('div'); bar.className='player-progress'; bar.setAttribute('role','progressbar'); bar.setAttribute('aria-valuemin','0'); bar.setAttribute('aria-valuemax','100');
      const fill = document.createElement('div'); fill.className='player-progress__fill'; bar.appendChild(fill);

      controls.appendChild(playBtn); controls.appendChild(bar);
      row.appendChild(title); row.appendChild(controls);

      const audio = new Audio(); audio.src = t.src; audio.preload='none';
      audio._button = playBtn; audio._fill = fill;

      playBtn.addEventListener('click', ()=>{
        if(audio.paused){
          stopCurrent();
          audio.play().catch(()=>{});
          currentAudio = audio;
          playBtn.dataset.state='pause';
        } else {
          audio.pause();
          playBtn.dataset.state='play';
        }
      });
      audio.addEventListener('timeupdate', ()=>{
        if(!isFinite(audio.duration) || audio.duration===0) return;
        const p = (audio.currentTime/audio.duration)*100;
        fill.style.width = p + '%';
        bar.setAttribute('aria-valuenow', String(Math.round(p)));
      });
      audio.addEventListener('ended', ()=>{
        playBtn.dataset.state='play';
        fill.style.width='0%';
        if(currentAudio===audio) currentAudio=null;
      });
      audio.addEventListener('error', ()=>{
        const err = document.createElement('div'); err.className='track-error'; err.textContent='Datei konnte nicht geladen werden (Pfad prüfen).';
        row.appendChild(err);
      });
      bar.addEventListener('click', (ev)=>{
        const rect = bar.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const ratio = Math.min(Math.max(x/rect.width,0),1);
        if(isFinite(audio.duration)) audio.currentTime = ratio * audio.duration;
      });

      playersEl.appendChild(row);
    });

    document.querySelectorAll('.album-panel').forEach(p=>{ if(p!==panel){ if(!p.hidden) stopCurrent(); p.hidden=true; }});
    const willOpen = panel.hidden;
    if(!willOpen) stopCurrent();
    panel.hidden = !panel.hidden;
    if(!panel.hidden) panel.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await includePartials();
  initMenu();
  initHero();
  initBios();
  initTracks();
});

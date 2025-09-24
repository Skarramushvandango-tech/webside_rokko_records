/* burger-menü toggeln */
const burger = document.querySelector('.burger');
const nav = document.getElementById('site-nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.hasAttribute('hidden') ? false : true;
    if (open) {
      nav.setAttribute('hidden','');
      burger.setAttribute('aria-expanded','false');
    } else {
      nav.removeAttribute('hidden');
      burger.setAttribute('aria-expanded','true');
    }
  });
}

/* intro-video sound toggler */
const video = document.getElementById('intro-video');
const soundBtn = document.getElementById('sound-toggle');
if (video && soundBtn) {
  soundBtn.addEventListener('click', () => {
    const muted = video.muted;
    video.muted = !muted;
    soundBtn.textContent = `Sound: ${video.muted ? 'aus' : 'an'}`;
    soundBtn.setAttribute('aria-pressed', String(!video.muted));
  });
}

/* bio expand/collapse */
document.querySelectorAll('.bio-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.bio;
    const container = btn.closest('.bio');
    const p = container.querySelector('.bio-text');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      p.classList.add('collapsed');
      btn.setAttribute('aria-expanded','false');
      btn.innerHTML = '<b>Text erweitern</b>';
    } else {
      p.classList.remove('collapsed');
      btn.setAttribute('aria-expanded','true');
      btn.innerHTML = '<b>Text einklappen</b>';
    }
  });
});

/* release-panels toggeln */
document.querySelectorAll('.release-mini').forEach(mini => {
  mini.addEventListener('click', () => {
    const targetId = mini.dataset.expand;
    const panel = document.getElementById(targetId);
    if (!panel) return;
    const isHidden = panel.hasAttribute('hidden');
    // zuerst alle in derselben artists-section schließen
    const artistSection = mini.closest('.artist');
    artistSection.querySelectorAll('.release-panel').forEach(p => p.setAttribute('hidden',''));
    // dann gewünschtes öffnen
    if (isHidden) panel.removeAttribute('hidden');
  });
});

/* nur ein audio gleichzeitig */
const allAudios = document.querySelectorAll('audio[data-track]');
allAudios.forEach(a => {
  a.addEventListener('play', () => {
    allAudios.forEach(other => {
      if (other !== a) other.pause();
    });
  });
});

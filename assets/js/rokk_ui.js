// Vanilla JS: Artist-Accordion, Track-Expander and Mobile Carousel (touch + buttons)
document.addEventListener('DOMContentLoaded', function(){
  // Accordion (Artist open/close)
  document.querySelectorAll('.artist-frame, .artist-card').forEach(frame => {
    const header = frame.querySelector('.artist-photo, .artist-header');
    if(!header) return;
    header.setAttribute('role','button');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
      frame.classList.toggle('expanded');
      const details = frame.querySelector('.artist-bio, .artist-details');
      if(details){
        const expanded = frame.classList.contains('expanded');
        if(expanded){ details.style.maxHeight = details.scrollHeight + 'px'; }
        else { details.style.maxHeight = '0'; }
      }
    });

    // keyboard accessibility
    header.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); header.click(); } });
  });

  // Release-item / Track thumbnails -> expanded player
  document.querySelectorAll('.release-item, .track-thumb').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.release || el.datasetTrack || el.dataset.track;
      if(!id) return;
      const player = document.getElementById('player-' + id);
      if(!player) return;
      const shown = player.style.display === 'block';
      document.querySelectorAll('.release-player').forEach(p => { p.style.display = 'none'; });
      if(!shown){ player.style.display = 'block'; player.scrollIntoView({behavior:'smooth', block:'center'}); }
    });
  });

  // Ensure only one audio plays at a time
  document.addEventListener('play', function(e){ document.querySelectorAll('audio').forEach(a => { if(a !== e.target) a.pause(); }); }, true);

  // Simple mobile carousel activation (adds mobile class for CSS)
  const MOBILE_BREAKPOINT = 768;
  const artistsSection = document.querySelector('#artists');
  function updateCarouselMode(){ if(!artistsSection) return; if(window.innerWidth <= MOBILE_BREAKPOINT){ artistsSection.classList.add('mobile-carousel'); } else { artistsSection.classList.remove('mobile-carousel'); } }
  updateCarouselMode();
  window.addEventListener('resize', updateCarouselMode);
});
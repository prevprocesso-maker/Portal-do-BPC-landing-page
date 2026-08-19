/* Portal do BPC — vídeo hero carregado após a renderização inicial */
(function () {
  'use strict';

  function loadVideo() {
    var video = document.querySelector('video[data-defer-autoplay]');
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.querySelectorAll('source[data-src]').forEach(function (source) {
      source.src = source.getAttribute('data-src');
      source.removeAttribute('data-src');
    });
    video.preload = 'metadata';
    video.load();
    video.play().catch(function () {});
  }

  function schedule() {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadVideo, { timeout: 2500 });
    else window.setTimeout(loadVideo, 1800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
})();

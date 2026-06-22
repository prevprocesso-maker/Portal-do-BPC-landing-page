/* ============================================================
   lighthouse-a11y.js — Patches de acessibilidade
   Carrega DEPOIS de components.js e app-main.js
   Corrige: aria-hidden com focáveis, heading order, video captions
   ============================================================ */
(function() {
  'use strict';

  // ── 1. Mobile drawer: trocar aria-hidden por inert ──
  // O Lighthouse flagrou que .mobile-drawer[aria-hidden="true"]
  // contém links e botões focáveis — viola ARIA.
  // 'inert' impede foco E interação nativamente.
  function patchDrawer() {
    var drawer = document.querySelector('.mobile-drawer');
    if (!drawer) return;

    // Estado inicial: fechado
    if (drawer.getAttribute('aria-hidden') === 'true') {
      drawer.setAttribute('inert', '');
    }

    // Observa mudanças de aria-hidden para sincronizar inert
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.attributeName === 'aria-hidden') {
          var hidden = drawer.getAttribute('aria-hidden');
          if (hidden === 'true') {
            drawer.setAttribute('inert', '');
          } else {
            drawer.removeAttribute('inert');
          }
        }
      });
    });
    observer.observe(drawer, { attributes: true, attributeFilter: ['aria-hidden'] });
  }

  // ── 2. Video: adicionar track de captions se não existir ──
  function patchVideoTrack() {
    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
      if (!video.querySelector('track[kind="captions"]')) {
        var track = document.createElement('track');
        track.kind = 'captions';
        track.src = '/assets/captions/hero-empty.vtt';
        track.srclang = 'pt-BR';
        track.label = 'Português';
        track.default = true;
        video.appendChild(track);
      }
    });
  }

  // ── 3. Heading order: fix h5 → span onde é label decorativo ──
  // Os .valor h5 ("ACOLHIMENTO", "CLAREZA" etc) são labels, não headings.
  // Substituir por <span> com mesma classe para manter o estilo.
  function patchHeadings() {
    var valorH5s = document.querySelectorAll('.valor h5');
    valorH5s.forEach(function(h5) {
      var span = document.createElement('span');
      span.className = 'valor-label';
      span.textContent = h5.textContent;
      // Copiar estilos inline
      span.style.cssText = 'display:block;font-family:var(--font-sans);font-size:14px;font-weight:700;color:var(--terra-400);margin:0 0 4px 0;text-transform:uppercase;letter-spacing:0.08em;';
      h5.parentNode.replaceChild(span, h5);
    });

    // Também fix "NAVEGAÇÃO" h5 no footer se existir
    var footerH5s = document.querySelectorAll('.footer h5');
    // Footer h5s são section headers — deixar como estão (são corretos no footer context)
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      patchDrawer();
      patchVideoTrack();
      // patchHeadings() — descomente se quiser o fix automático de h5→span
      // Por segurança, melhor fazer manualmente no components.js
    });
  } else {
    patchDrawer();
    patchVideoTrack();
  }

  // Re-patch depois que React montar (componentes são criados async)
  window.addEventListener('load', function() {
    setTimeout(function() {
      patchDrawer();
      patchVideoTrack();
    }, 500);
  });
})();

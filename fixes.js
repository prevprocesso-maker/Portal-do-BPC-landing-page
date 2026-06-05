/* ============================================================
   Portal do BPC — fixes.js v3
   Foto retrato + tab Patologias + PWA
   ============================================================ */
(function() {

  /* ---- PWA: manifest + Service Worker ---- */
  if (!document.querySelector('link[rel="manifest"]')) {
    var ml = document.createElement('link');
    ml.rel = 'manifest'; ml.href = '/manifest.json';
    document.head.appendChild(ml);
  }
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }

  /* ---- Foto: mesma proporção do desktop (4:5) no mobile ---- */
  function fixFoto() {
    if (window.innerWidth > 900) return;

    var heroPhoto  = document.querySelector('.hero-photo');
    var heroImg    = document.querySelector('.hero-photo img');
    var sobrePhoto = document.querySelector('.sobre-photo');
    var sobreImg   = document.querySelector('.sobre-photo img');

    if (heroPhoto) {
      /* 4:5 = mesma do desktop; max-width 300px para não ocupar a tela toda */
      heroPhoto.style.cssText += ';aspect-ratio:4/5!important;height:auto!important;max-width:300px!important;max-height:375px!important;margin:0 auto!important;';
    }
    if (heroImg) {
      heroImg.style.cssText += ';object-fit:cover!important;object-position:center top!important;width:100%!important;height:100%!important;';
    }
    if (sobrePhoto) {
      sobrePhoto.style.cssText += ';aspect-ratio:4/5!important;height:auto!important;max-width:280px!important;max-height:350px!important;margin:0 auto!important;';
    }
    if (sobreImg) {
      sobreImg.style.cssText += ';object-fit:cover!important;object-position:center top!important;width:100%!important;height:100%!important;';
    }
  }

  /* ---- Tab Patologias: navega sem recarregar página ---- */
  function fixPatologiasTab() {
    // Encontra o botão Patologias na tab bar
    document.querySelectorAll('.mobile-tab').forEach(function(tab) {
      var txt = tab.textContent.trim();
      if (txt === 'Patologias') {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          // Se estiver no React (index.html): navega para home e rola
          if (window.__bpcNavigate) {
            window.__bpcNavigate('home');
            setTimeout(function() {
              var el = document.getElementById('patologias') ||
                       document.querySelector('[id="patologias"]') ||
                       document.querySelector('.bg-bone');
              if (el) {
                var top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
              }
            }, 300);
          } else {
            // Páginas estáticas: vai para index.html
            window.location.href = 'index.html#patologias';
          }
        }, true);
      }
      if (txt === 'Início') {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.__bpcNavigate) {
            window.__bpcNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = 'index.html';
          }
        }, true);
      }
      if (txt === 'Simulador') {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.__bpcNavigate) {
            window.__bpcNavigate('simulador');
          } else {
            window.location.href = 'index.html#/simulador';
          }
        }, true);
      }
    });
  }

  /* ---- Correções de texto ---- */
  function fixTextos() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      if (!t || t.trim().length < 3) continue;
      if (t.includes('perita que apressa'))
        node.nodeValue = t.replace(/perita que apressa/g, 'perito que apressa');
      if (t.includes('Documentação incompleta, perita'))
        node.nodeValue = 'A perícia médica e social é onde a maioria dos pedidos é negado — não por falta de direito, mas por documentação incompleta ou por não saber como se apresentar. Preparamos tudo que você precisa levar e como agir no dia. Checklist completo em PDF para imprimir.';
    }
  }

  /* ---- Execução ---- */
  function runAll() {
    fixFoto();
    fixTextos();
    fixPatologiasTab();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(runAll, 700); });
  } else {
    setTimeout(runAll, 700);
  }

  // React SPA: re-aplica ao trocar de tela
  setTimeout(function() {
    var obs = new MutationObserver(function() {
      setTimeout(function() { fixFoto(); fixTextos(); fixPatologiasTab(); }, 400);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }, 1500);

  // Re-aplica ao redimensionar
  window.addEventListener('resize', fixFoto);

})();

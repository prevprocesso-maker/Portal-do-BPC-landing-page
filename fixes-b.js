/* ============================================================
   Portal do BPC — fixes.js v3
   Foto retrato + tab Patologias + PWA
   ============================================================ */
(function() {

  /* ---- PWA: manifest + Service Worker + botão instalar ---- */
  if (!document.querySelector('link[rel="manifest"]')) {
    var ml = document.createElement('link');
    ml.rel = 'manifest'; ml.href = '/manifest.json';
    document.head.appendChild(ml);
  }
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    // Mostra botão instalar na tab bar
    var installTab = document.getElementById('bpc-install-tab');
    if (installTab) installTab.style.display = 'flex';
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }
  // Injeta botão "Instalar app" na tab bar (oculto até evento disparar)
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      var tabBar = document.querySelector('.mobile-tab-bar');
      if (tabBar && !document.getElementById('bpc-install-tab')) {
        var btn = document.createElement('button');
        btn.id = 'bpc-install-tab';
        btn.className = 'mobile-tab';
        btn.style.display = 'none';
        btn.style.background = '#c4673a';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.innerHTML = '<svg viewBox="0 0 24 24" style="width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 2v13M8 11l4 4 4-4"/><path d="M2 17v2a2 2 0 002 2h16a2 2 0 002-2v-2"/></svg><span style="font-size:10px;font-weight:700;">Instalar</span>';
        btn.addEventListener('click', function() {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function() { deferredPrompt = null; btn.style.display = 'none'; });
          }
        });
        tabBar.appendChild(btn);
      }
    }, 1500);
  });

  /* ---- Foto: injeta CSS via <style> (React não apaga) ---- */
  function fixFoto() {
    if (document.getElementById('bpc-foto-fix')) return;
    var s = document.createElement('style');
    s.id = 'bpc-foto-fix';
    s.textContent = [
      '@media (max-width:900px){',
      '.hero-photo{aspect-ratio:4/5!important;height:auto!important;max-width:300px!important;max-height:375px!important;margin:0 auto!important;}',
      '.hero-photo img{object-fit:cover!important;object-position:center top!important;width:100%!important;height:100%!important;}',
      '.sobre-photo{aspect-ratio:4/5!important;height:auto!important;max-width:280px!important;max-height:350px!important;margin:0 auto!important;}',
      '.sobre-photo img{object-fit:cover!important;object-position:center top!important;width:100%!important;height:100%!important;}',
      '.hero-grid{grid-template-columns:1fr!important;}',
      '}',
      '@media (max-width:820px){',
      '.sim2{min-height:0!important;padding-bottom:24px!important;}',
      '.sim2 .card{display:flex!important;flex-direction:column!important;}',
      /* Painel de perguntas fica no topo */
      '.sim2 .panel{order:1!important;}',
      /* Support (Carlos Costa) preenche o buraco abaixo */
      '.sim2 .support{order:2!important;min-height:280px!important;background:linear-gradient(180deg,rgba(20,16,12,.05),rgba(20,16,12,.82)),url("assets/dr-carlos-costa.jpg") center 35%/cover no-repeat,var(--bone-2)!important;padding:20px 18px 24px!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;border-radius:0 0 22px 22px!important;}',
      '.sim2 .support::after{display:none!important;}',
      '.sim2 .who{margin-bottom:10px!important;}',
      '.sim2 .reassure{font-size:1.1rem!important;min-height:auto!important;display:block!important;margin-top:0!important;}',
      '.sim2 .reassure .em{color:var(--terra-300)!important;font-style:italic!important;}',
      '.sim2 .pbar-wrap{margin-top:12px!important;}',
      '.sim2 .trust{margin-top:10px!important;font-size:11px!important;}',
      '}'
    ].join('');
    document.head.appendChild(s);
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

/* ============================================================
   Portal do BPC — fixes.js v2
   PWA + correções de texto via DOM (bypassa cache)
   ============================================================ */
(function() {

  /* ---- PWA: manifest + Service Worker ---- */
  if (!document.querySelector('link[rel="manifest"]')) {
    var ml = document.createElement('link');
    ml.rel = 'manifest';
    ml.href = '/manifest.json';
    document.head.appendChild(ml);
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }

  /* ---- Correções de texto ---- */
  function fixTexts() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      if (!t || t.trim().length < 3) continue;

      if (t.includes('perita que apressa'))
        node.nodeValue = t.replace(/perita que apressa/g, 'perito que apressa');

      if (t.includes('perita após 15 minutos'))
        node.nodeValue = t.replace(/perita após 15 minutos/g, 'perícia em 15 minutos');

      if (t.includes('Documentação incompleta, perita'))
        node.nodeValue = 'A perícia médica e social é onde a maioria dos pedidos é negado — não por falta de direito, mas por documentação incompleta ou por não saber como se apresentar. Preparamos tudo que você precisa levar e como agir no dia. Checklist completo em PDF para imprimir.';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(fixTexts, 800); });
  } else {
    setTimeout(fixTexts, 800);
  }

  setTimeout(function() {
    var obs = new MutationObserver(function() { setTimeout(fixTexts, 300); });
    obs.observe(document.body, { childList: true, subtree: true });
  }, 1000);

})();

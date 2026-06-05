/* ============================================================
   Portal do BPC — fixes.js
   Correções de texto via DOM (bypassa cache do components.js)
   ============================================================ */
(function() {
  function fixTexts() {
    // Percorre todos os nós de texto e corrige
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      if (!t) continue;

      // Corrige "perita que apressa" → "perito que apressa"
      if (t.includes('perita que apressa')) {
        node.nodeValue = t.replace(/perita que apressa/g, 'perito que apressa');
      }

      // Corrige "perita após 15 minutos"
      if (t.includes('perita após 15 minutos')) {
        node.nodeValue = t.replace(/perita após 15 minutos/g, 'perícia em 15 minutos');
      }

      // Corrige texto da perícia
      if (t.includes('Documentação incompleta, perita após 15 minutos, palavra mal escolhida')) {
        node.nodeValue = 'A perícia médica e social é onde a maioria dos pedidos é negado — não por falta de direito, mas por documentação incompleta ou por não saber como se apresentar. Preparamos tudo que você precisa levar e como agir no dia. Checklist completo em PDF para imprimir.';
      }
    }
  }

  // Executa após o React renderizar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(fixTexts, 800);
    });
  } else {
    setTimeout(fixTexts, 800);
  }

  // Observa mudanças (para SPA com React)
  var observer = new MutationObserver(function() {
    setTimeout(fixTexts, 300);
  });
  setTimeout(function() {
    observer.observe(document.body, { childList: true, subtree: true, characterData: false });
  }, 1000);
})();

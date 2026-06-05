/* ============================================================
   Portal do BPC — photo-rotation.js
   Troca a foto do hero a cada 3 dias — ciclo de 10 fotos.
   
   COMO USAR:
   1. Salve as 10 fotos em assets/ com os nomes:
      hero-1.jpg, hero-2.jpg, hero-3.jpg ... hero-10.jpg
   2. Este script troca automaticamente baseado na data.
   ============================================================ */
(function () {

  /* Lista de fotos — altere os nomes se necessário */
  var FOTOS = [
    'assets/hero-1.jpg',
    'assets/hero-2.jpg',
    'assets/hero-3.jpg',
    'assets/hero-4.jpg',
    'assets/hero-5.jpg',
    'assets/hero-6.jpg',
    'assets/hero-7.jpg',
    'assets/hero-8.jpg',
    'assets/hero-9.jpg',
    'assets/hero-10.jpg',
  ];

  /* Calcula qual foto mostrar baseado na data (muda a cada 3 dias) */
  function getFotoIndex() {
    var inicio = new Date(2026, 0, 1); // 1 de janeiro de 2026
    var hoje = new Date();
    var dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
    var periodo = Math.floor(dias / 3); // muda a cada 3 dias
    return periodo % FOTOS.length;
  }

  function aplicarFoto() {
    var idx = getFotoIndex();
    var fotoUrl = FOTOS[idx];

    /* Troca hero photo */
    var heroImg = document.querySelector('.hero-photo img');
    if (heroImg) {
      heroImg.src = fotoUrl;
      heroImg.alt = 'Portal do BPC — equipe';
    }

    /* Troca sobre photo também */
    var sobreImg = document.querySelector('.sobre-photo img');
    if (sobreImg) {
      sobreImg.src = fotoUrl;
    }

    /* Mostra qual foto está ativa (para debug — remova depois) */
    console.log('[Photo Rotation] Foto ' + (idx + 1) + ' de ' + FOTOS.length + ' — ' + fotoUrl);
  }

  /* Aplica após o React renderizar */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(aplicarFoto, 600);
    });
  } else {
    setTimeout(aplicarFoto, 600);
  }

  /* Observa mudanças do React (troca de tela) */
  setTimeout(function () {
    var observer = new MutationObserver(function () {
      var heroImg = document.querySelector('.hero-photo img');
      if (heroImg && !heroImg.src.includes('hero-')) {
        aplicarFoto();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }, 1000);

})();

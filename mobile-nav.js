/* ============================================================
   Portal do BPC — mobile-nav.js
   Injeta hambúrguer + gaveta + barra WhatsApp em páginas estáticas.
   Carregue no final do <body>: <script src="mobile-nav.js"></script>
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    /* ---- Esconde CTA desktop no mobile via classe ---- */
    var ctaBtn = headerInner.querySelector('.btn--primary');
    if (ctaBtn) ctaBtn.classList.add('header-cta-desktop');

    /* ---- Lê links do nav existente ---- */
    var navEl = headerInner.querySelector('.header-nav');
    var navLinks = [];
    if (navEl) {
      navEl.querySelectorAll('a').forEach(function (a) {
        navLinks.push({
          href: a.getAttribute('href') || '#',
          label: a.textContent.trim(),
          active: a.classList.contains('active')
        });
      });
    }

    /* ---- Botão hambúrguer ---- */
    var hamburger = document.createElement('button');
    hamburger.className = 'header-hamburger';
    hamburger.setAttribute('aria-label', 'Abrir menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    headerInner.appendChild(hamburger);

    /* ---- Overlay ---- */
    var overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    /* ---- Drawer ---- */
    var logoHref = (document.querySelector('.header-logo') || {}).getAttribute
      ? document.querySelector('.header-logo').getAttribute('href') || 'index.html'
      : 'index.html';

    var navHTML = navLinks.map(function (n) {
      return '<a href="' + n.href + '"' + (n.active ? ' class="active"' : '') + '>' + n.label + '</a>';
    }).join('');

    var drawer = document.createElement('nav');
    drawer.className = 'mobile-drawer';
    drawer.setAttribute('aria-label', 'Menu principal');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="mobile-drawer-header">' +
        '<a href="' + logoHref + '" style="display:flex;align-items:center;gap:10px;text-decoration:none;">' +
          '<img src="assets/logo-monograma-cc.png" alt="Portal do BPC" style="height:40px;width:40px;object-fit:contain;" />' +
          '<span class="header-logo-text">' +
            '<span class="header-logo-text-1" style="font-size:13px;">Portal do</span>' +
            '<span class="header-logo-text-2" style="font-size:20px;">BPC<span class="header-logo-dot">.</span></span>' +
          '</span>' +
        '</a>' +
        '<button class="mobile-drawer-close" aria-label="Fechar menu">\u2715</button>' +
      '</div>' +
      '<div class="mobile-drawer-nav">' + navHTML + '</div>' +
      '<div class="mobile-drawer-cta">' +
        '<a href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">' +
          '<img src="assets/icon-whatsapp.svg" alt="" style="width:22px;height:22px;" />' +
          'Falar no WhatsApp' +
        '</a>' +
      '</div>';
    document.body.appendChild(drawer);

    /* ---- Barra WhatsApp fixa ---- */
    var waBar = document.createElement('div');
    waBar.className = 'wa-sticky-bar';
    waBar.innerHTML =
      '<a href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">' +
        '<img src="assets/icon-whatsapp.svg" alt="" />' +
        'Falar no WhatsApp agora' +
      '</a>';
    document.body.appendChild(waBar);

    /* ---- Funções open / close ---- */
    function openMenu() {
      hamburger.classList.add('open');
      overlay.classList.add('open');
      drawer.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    var closeBtn = drawer.querySelector('.mobile-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    drawer.querySelectorAll('.mobile-drawer-nav a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

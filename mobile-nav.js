/* ============================================================
   Portal do BPC — mobile-nav.js v3
   Tab bar + hambúrguer + prev/next patologias + SW
   ============================================================ */
(function () {
  'use strict';

  /* ---- PWA Service Worker ---- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }

  /* ---- Lista ordenada de patologias para prev/next ---- */
  var PATOLOGIAS_ORDER = [
    { slug: 'autismo-tea', nome: 'Autismo (TEA)' },
    { slug: 'sindrome-de-down', nome: 'Síndrome de Down' },
    { slug: 'paralisia-cerebral', nome: 'Paralisia Cerebral' },
    { slug: 'esclerose-multipla', nome: 'Esclerose Múltipla' },
    { slug: 'doenca-de-parkinson', nome: 'Parkinson' },
    { slug: 'doenca-de-alzheimer', nome: 'Alzheimer' },
    { slug: 'sequelas-de-avc', nome: 'Sequelas de AVC' },
    { slug: 'ela', nome: 'ELA' },
    { slug: 'epilepsia-refrataria', nome: 'Epilepsia Refratária' },
    { slug: 'esquizofrenia', nome: 'Esquizofrenia' },
    { slug: 'transtorno-bipolar', nome: 'Transtorno Bipolar' },
    { slug: 'deficiencia-visual', nome: 'Deficiência Visual' },
    { slug: 'deficiencia-auditiva', nome: 'Deficiência Auditiva' },
    { slug: 'cancer', nome: 'Câncer' },
    { slug: 'insuficiencia-renal', nome: 'Insuf. Renal' },
    { slug: 'cardiopatia-grave', nome: 'Cardiopatia Grave' },
    { slug: 'hiv-aids', nome: 'HIV/AIDS' },
    { slug: 'hepatopatia-grave', nome: 'Hepatopatia Grave' },
    { slug: 'lupus-les', nome: 'Lúpus (LES)' },
    { slug: 'distrofia-muscular', nome: 'Distrofia Muscular' },
    { slug: 'amputacao', nome: 'Amputação' },
    { slug: 'ansiedade-e-bpc', nome: 'Ansiedade' },
    { slug: 'artrite-psoriasica', nome: 'Artrite Psoríasica' },
    { slug: 'artrite-reumatoide', nome: 'Artrite Reumatoide' },
    { slug: 'artrose-avancada', nome: 'Artrose Avançada' },
    { slug: 'atrofia-muscular-espinhal', nome: 'Atrofia Muscular Espinhal' },
    { slug: 'deficit-intelectual', nome: 'Déficit Intelectual' },
    { slug: 'depressao-grave', nome: 'Depressão Grave' },
    { slug: 'diabetes-complicacoes', nome: 'Diabetes (complicações)' },
    { slug: 'doenca-de-charcot', nome: 'Doença de Charcot' },
    { slug: 'doenca-de-huntington', nome: 'Huntington' },
    { slug: 'doenca-de-wilson', nome: 'Wilson' },
    { slug: 'dores-cronicas', nome: 'Dores Crônicas' },
    { slug: 'dpoc-grave', nome: 'DPOC Grave' },
    { slug: 'esclerodermia', nome: 'Esclerodermia' },
    { slug: 'esclerose-tuberosa', nome: 'Esclerose Tuberosa' },
    { slug: 'espinha-bifida', nome: 'Espinha Bífida' },
    { slug: 'fenilcetonuria', nome: 'Fenilcetonúria' },
    { slug: 'fibromialgia', nome: 'Fibromialgia' },
    { slug: 'fibrose-pulmonar', nome: 'Fibrose Pulmonar' },
    { slug: 'hanseniase-sequelas', nome: 'Hanseníase (sequelas)' },
    { slug: 'hernia-de-disco', nome: 'Hérnia de Disco' },
    { slug: 'hidrocefalia', nome: 'Hidrocefalia' },
    { slug: 'hipertensao-e-bpc', nome: 'Hipertensão' },
    { slug: 'insuficiencia-cardiaca-avancada', nome: 'Insuf. Cardíaca' },
    { slug: 'lesao-medular', nome: 'Lesão Medular' },
    { slug: 'lombalgia-cronica', nome: 'Lombalgia Crônica' },
    { slug: 'miastenia-grave', nome: 'Miastenia Grave' },
    { slug: 'neurofibromatose', nome: 'Neurofibromatose' },
    { slug: 'osteoporose-grave', nome: 'Osteoporose Grave' },
    { slug: 'retinose-pigmentar', nome: 'Retinose Pigmentar' },
    { slug: 'sindrome-de-rett', nome: 'Síndrome de Rett' },
    { slug: 'sindrome-de-williams', nome: 'Síndrome de Williams' },
    { slug: 'sindrome-pos-covid', nome: 'Síndrome Pós-Covid' },
    { slug: 'sindrome-tunel-carpo', nome: 'Túnel do Carpo' },
    { slug: 'sindrome-x-fragil', nome: 'Síndrome X Frágil' },
    { slug: 'tdah', nome: 'TDAH' },
    { slug: 'transtorno-de-personalidade-grave', nome: 'Transt. Personalidade' },
    { slug: 'varizes-e-bpc', nome: 'Varizes' },
    { slug: 'vertigo-e-bpc', nome: 'Vertigem' },
  ];

  /* ---- Detecta slug da página atual ---- */
  function getCurrentSlug() {
    var path = window.location.pathname;
    var match = path.match(/\/([^/]+)\.html/);
    return match ? match[1] : '';
  }

  /* ---- Mensagem WhatsApp pré-preenchida ---- */
  function getWaUrl() {
    var base = 'https://wa.me/5521964238080';
    var h1 = document.querySelector('.pp h1, h1');
    if (h1) {
      var doenca = h1.textContent.trim().split('—')[0].trim().split('\n')[0].trim();
      if (doenca && doenca.length < 80) {
        var msg = 'Olá! Tenho ' + doenca + ' e gostaria de saber se tenho direito ao BPC.';
        return base + '?text=' + encodeURIComponent(msg);
      }
    }
    return base + '?text=' + encodeURIComponent('Olá! Gostaria de saber se tenho direito ao BPC.');
  }

  function init() {
    var headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    var currentSlug = getCurrentSlug();
    var currentIdx = PATOLOGIAS_ORDER.findIndex(function (p) { return p.slug === currentSlug; });
    var isPatologiaPage = currentIdx !== -1;
    var waUrl = getWaUrl();

    /* ---- Esconde CTA desktop no mobile ---- */
    var ctaBtn = headerInner.querySelector('.btn--primary');
    if (ctaBtn) ctaBtn.classList.add('header-cta-desktop');

    /* ---- Lê links do nav ---- */
    var navEl = headerInner.querySelector('.header-nav');
    var navLinks = [];
    if (navEl) {
      navEl.querySelectorAll('a').forEach(function (a) {
        navLinks.push({ href: a.getAttribute('href') || '#', label: a.textContent.trim(), active: a.classList.contains('active') });
      });
    }

    /* ---- Hambúrguer ---- */
    var hamburger = document.createElement('button');
    hamburger.className = 'header-hamburger';
    hamburger.setAttribute('aria-label', 'Abrir menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'mobile-drawer');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    headerInner.appendChild(hamburger);

    /* ---- Overlay ---- */
    var overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    /* ---- Drawer ---- */
    var logoEl = document.querySelector('.header-logo');
    var logoHref = logoEl ? (logoEl.getAttribute('href') || 'index.html') : 'index.html';
    var navHTML = navLinks.map(function (n) {
      return '<a href="' + n.href + '"' + (n.active ? ' class="active"' : '') + '>' + n.label + '</a>';
    }).join('');

    var drawer = document.createElement('nav');
    drawer.className = 'mobile-drawer';
    drawer.id = 'mobile-drawer';
    drawer.setAttribute('aria-label', 'Menu principal');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="mobile-drawer-header">' +
        '<a href="' + logoHref + '" style="display:flex;align-items:center;gap:10px;text-decoration:none;">' +
          '<img src="/assets/logo-portal-bpc-oficial.webp" alt="Portal do BPC" style="height:42px;width:150px;object-fit:cover;object-position:center;"/>' +
          '<span class="header-logo-text">' +
            '<span class="header-logo-text-1" style="font-size:13px;">Portal do</span>' +
            '<span class="header-logo-text-2" style="font-size:20px;">BPC<span class="header-logo-dot">.</span></span>' +
          '</span>' +
        '</a>' +
        '<button class="mobile-drawer-close" aria-label="Fechar menu">\u2715</button>' +
      '</div>' +
      '<div class="mobile-drawer-nav">' + navHTML + '</div>' +
      '<div class="mobile-drawer-cta">' +
        '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer">' +
          '<img src="/assets/icon-whatsapp.svg" alt="" style="width:22px;height:22px;"/>' +
          'Falar no WhatsApp' +
        '</a>' +
      '</div>';
    document.body.appendChild(drawer);

    /* ---- Barra de posição no TOPO (visível, intuitivo para idosos) ---- */
    if (isPatologiaPage) {
      var prev = currentIdx > 0 ? PATOLOGIAS_ORDER[currentIdx - 1] : null;
      var next = currentIdx < PATOLOGIAS_ORDER.length - 1 ? PATOLOGIAS_ORDER[currentIdx + 1] : null;
      var total = PATOLOGIAS_ORDER.length;
      var pos = currentIdx + 1;

      /* Barra no topo */
      var posBar = document.createElement('div');
      posBar.className = 'pp-position-bar';
      posBar.innerHTML =
        '<a href="' + (prev ? prev.slug + '.html' : '#') + '" ' + (prev ? '' : 'class="disabled"') + ' aria-label="Patologia anterior" title="' + (prev ? prev.nome : '') + '">&#8592;</a>' +
        '<div class="pp-position-center">' +
          '<strong>' + PATOLOGIAS_ORDER[currentIdx].nome + '</strong>' +
          '<span>Patologia ' + pos + ' de ' + total + '</span>' +
        '</div>' +
        '<a href="' + (next ? next.slug + '.html' : '#') + '" ' + (next ? '' : 'class="disabled"') + ' aria-label="Próxima patologia" title="' + (next ? next.nome : '') + '">&#8594;</a>';

      /* Botão voltar */
      var backBtn = document.createElement('a');
      backBtn.className = 'pp-nav-back';
      backBtn.href = 'index.html#patologias';
      backBtn.innerHTML = '&#8592; Todas as patologias';

      var ppEl = document.querySelector('.pp .container, .pp');
      if (ppEl) {
        ppEl.insertBefore(posBar, ppEl.firstChild);
        ppEl.insertBefore(backBtn, ppEl.firstChild);
      }

      /* Setas grandes no RODAPÉ */
      if (prev || next) {
        var arrows = document.createElement('div');
        arrows.className = 'pp-nav-arrows';
        if (prev) {
          arrows.innerHTML += '<a class="pp-nav-arrow pp-nav-arrow--prev" href="' + prev.slug + '.html">' +
            '<span class="arrow-icon">&#8592;</span>' +
            '<div><span class="arrow-label">Anterior</span><span>' + prev.nome + '</span></div>' +
            '</a>';
        }
        if (next) {
          arrows.innerHTML += '<a class="pp-nav-arrow pp-nav-arrow--next" href="' + next.slug + '.html">' +
            '<div><span class="arrow-label">Próxima</span><span>' + next.nome + '</span></div>' +
            '<span class="arrow-icon">&#8594;</span>' +
            '</a>';
        }
        var ppFoot = document.querySelector('.pp-foot');
        if (ppFoot) ppFoot.parentNode.insertBefore(arrows, ppFoot);
        else if (ppEl) ppEl.appendChild(arrows);
      }
    }

    /* ---- Tab bar ---- */
    var isHome = !isPatologiaPage && (currentSlug === '' || currentSlug === 'index' || window.location.pathname === '/');
    var tabBar = document.createElement('div');
    tabBar.className = 'mobile-tab-bar';
    tabBar.innerHTML =
      '<a href="index.html" class="mobile-tab' + (isHome ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>' +
        'Início' +
      '</a>' +
      '<a href="index.html#patologias" class="mobile-tab' + (isPatologiaPage ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' +
        'Patologias' +
      '</a>' +
      '<a href="index.html#/simulador" class="mobile-tab">' +
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        'Simulador' +
      '</a>' +
      '<a href="' + waUrl + '" class="mobile-tab mobile-tab--wa" target="_blank" rel="noopener noreferrer">' +
        '<img src="/assets/icon-whatsapp.svg" alt="" style="width:24px;height:24px;"/>' +
        'WhatsApp' +
      '</a>';
    document.body.appendChild(tabBar);

    /* ---- Open / Close ---- */
    drawer.setAttribute('inert', '');

    function openMenu() {
      hamburger.classList.add('open'); overlay.classList.add('open'); drawer.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true'); drawer.setAttribute('aria-hidden', 'false');
      drawer.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      var firstFocusable = drawer.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }
    function closeMenu() {
      hamburger.classList.remove('open'); overlay.classList.remove('open'); drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false'); drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', function () { drawer.classList.contains('open') ? closeMenu() : openMenu(); });
    overlay.addEventListener('click', closeMenu);
    var closeBtn = drawer.querySelector('.mobile-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    drawer.querySelectorAll('.mobile-drawer-nav a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('open')) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

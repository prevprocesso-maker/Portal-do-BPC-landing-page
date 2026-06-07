/* ============================================================
   Portal do BPC — mobile-patch.js
   Header com hambúrguer + WhatsApp bar em React puro (sem JSX/Babel).
   Carregado APÓS components.js — substitui Header e WhatsAppFloat.
   ============================================================ */
(function () {
  const { useState, useEffect, createElement: e, Fragment } = React;

  /* ---- Header com hambúrguer ---- */
  function Header({ active, onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      const handler = () => setScrolled(window.scrollY > 24);
      window.addEventListener('scroll', handler);
      return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const nav = [
      { id: 'home', label: 'Início' },
      { id: 'patologias', label: 'Patologias', page: 'patologias.html' },
      { id: 'pericias', label: 'Perícias' },
      { id: 'estrangeiro', label: 'Estrangeiro' },
      { id: 'simulador', label: 'Simulador' },
      { id: 'blog', label: 'Blog' },
      { id: 'faq', label: 'Perguntas' },
    ];

    function handleNavClick(ev, n) {
      setMenuOpen(false);
      if (n.page) { window.location.href = n.page; return; }
      ev.preventDefault();
      if (n.hash) {
        if (active !== 'home') {
          onNavigate('home');
          setTimeout(() => {
            const el = document.querySelector(n.hash);
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
          }, 150);
        } else {
          const el = document.querySelector(n.hash);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
        return;
      }
      onNavigate(n.id);
    }

    return e(Fragment, null,
      e('header', { className: `header ${scrolled ? 'scrolled' : ''}` },
        e('div', { className: 'container header-inner' },
          e('a', { href: '#/', className: 'header-logo', onClick: (ev) => { ev.preventDefault(); onNavigate('home'); } },
            e('img', { src: 'assets/logo-monograma-cc.png', alt: 'Portal do BPC', className: 'header-logo-mark', style: { objectFit: 'contain' } }),
            e('span', { className: 'header-logo-text' },
              e('span', { className: 'header-logo-text-1' }, 'Portal do'),
              e('span', { className: 'header-logo-text-2' }, 'BPC', e('span', { className: 'header-logo-dot' }, '.')),
              e('span', { className: 'header-logo-tagline' }, 'BENEFÍCIO · DIREITO · ACOLHIMENTO')
            )
          ),
          e('nav', { className: 'header-nav' },
            e('button', {
              className: 'header-nav-arrow',
              'aria-label': 'Seção anterior',
              onClick: function() {
                const navIds = nav.map(function(n){ return n.id; });
                const cur = navIds.indexOf(active === 'patologias' ? 'patologias' : active);
                const prev = nav[Math.max(0, cur - 1)];
                if (prev) handleNavClick({ preventDefault: function(){} }, prev);
              }
            }, '←'),
            nav.map(n => e('a', {
              key: n.id,
              href: n.page || n.hash || `#/${n.id}`,
              className: active === n.id ? 'nav-link active' : 'nav-link',
              onClick: (ev) => handleNavClick(ev, n)
            }, e('span', null, n.label))),
            e('button', {
              className: 'header-nav-arrow',
              'aria-label': 'Próxima seção',
              onClick: function() {
                const navIds = nav.map(function(n){ return n.id; });
                const cur = navIds.indexOf(active === 'patologias' ? 'patologias' : active);
                const next = nav[Math.min(nav.length - 1, cur + 1)];
                if (next) handleNavClick({ preventDefault: function(){} }, next);
              }
            }, '→')
          ),
          e('a', {
            className: 'btn btn--primary btn--sm header-cta-desktop',
            href: 'https://wa.me/5521964238080',
            target: '_blank', rel: 'noreferrer'
          }, 'Falar agora →'),
          e('button', {
            className: `header-hamburger${menuOpen ? ' open' : ''}`,
            onClick: () => setMenuOpen(o => !o),
            'aria-label': menuOpen ? 'Fechar menu' : 'Abrir menu',
            'aria-expanded': menuOpen
          }, e('span'), e('span'), e('span'))
        )
      ),
      e('div', {
        className: `mobile-drawer-overlay${menuOpen ? ' open' : ''}`,
        onClick: () => setMenuOpen(false),
        'aria-hidden': 'true'
      }),
      e('nav', {
        className: `mobile-drawer${menuOpen ? ' open' : ''}`,
        'aria-label': 'Menu principal',
        'aria-hidden': String(!menuOpen)
      },
        e('div', { className: 'mobile-drawer-header' },
          e('a', {
            href: '#/',
            onClick: (ev) => { ev.preventDefault(); setMenuOpen(false); onNavigate('home'); },
            style: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }
          },
            e('img', { src: 'assets/logo-monograma-cc.png', alt: 'Portal do BPC', style: { height: 40, width: 40, objectFit: 'contain' } }),
            e('span', { className: 'header-logo-text' },
              e('span', { className: 'header-logo-text-1', style: { fontSize: 13 } }, 'Portal do'),
              e('span', { className: 'header-logo-text-2', style: { fontSize: 20 } }, 'BPC',
                e('span', { className: 'header-logo-dot' }, '.')
              )
            )
          ),
          e('button', { className: 'mobile-drawer-close', onClick: () => setMenuOpen(false), 'aria-label': 'Fechar menu' }, '✕')
        ),
        e('div', { className: 'mobile-drawer-nav' },
          nav.map(n => e('a', {
            key: n.id,
            href: n.page || n.hash || `#/${n.id}`,
            className: active === n.id ? 'active' : '',
            onClick: (ev) => handleNavClick(ev, n)
          }, n.label))
        ),
        e('div', { className: 'mobile-drawer-cta' },
          e('a', { href: 'https://wa.me/5521964238080', target: '_blank', rel: 'noreferrer' },
            e('img', { src: 'assets/icon-whatsapp.svg', alt: '', style: { width: 22, height: 22 } }),
            'Falar no WhatsApp'
          )
        )
      )
    );
  }

  /* ---- WhatsApp float + barra fixa ---- */
  function WhatsAppFloat() {
    return e(Fragment, null,
      e('a', { className: 'wa-float', href: 'https://wa.me/5521964238080', target: '_blank', rel: 'noreferrer', 'aria-label': 'Falar no WhatsApp' },
        e('img', { src: 'assets/icon-whatsapp.svg', alt: '' })
      ),
      e('div', { className: 'mobile-tab-bar' },
        e('a', { href: '#/', className: 'mobile-tab active',
          onClick: function(ev){ ev.preventDefault(); if(window.__bpcNavigate) window.__bpcNavigate('home'); else window.location.hash='#/home'; }
        },
          e('svg', { viewBox: '0 0 24 24' },
            e('path', { d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' }),
            e('polyline', { points: '9,22 9,12 15,12 15,22' })
          ),
          'Início'
        ),
        e('a', { href: '#patologias', className: 'mobile-tab',
          onClick: function(ev){ ev.preventDefault(); if(window.__bpcNavigate) window.__bpcNavigate('home'); window.location.hash='#patologias'; setTimeout(function(){ var el=document.querySelector('#patologias'); if(el) window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'}); },200); }
        },
          e('svg', { viewBox: '0 0 24 24' },
            e('path', { d: 'M9 11l3 3L22 4' }),
            e('path', { d: 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' })
          ),
          'Patologias'
        ),
        e('a', { href: '#/simulador', className: 'mobile-tab',
          onClick: function(ev){ ev.preventDefault(); if(window.__bpcNavigate) window.__bpcNavigate('simulador'); else window.location.hash='#/simulador'; }
        },
          e('svg', { viewBox: '0 0 24 24' },
            e('circle', { cx: '12', cy: '12', r: '10' }),
            e('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
            e('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' })
          ),
          'Simulador'
        ),
        e('a', { href: 'https://wa.me/5521964238080', className: 'mobile-tab mobile-tab--wa', target: '_blank', rel: 'noreferrer' },
          e('img', { src: 'assets/icon-whatsapp.svg', alt: '', style: { width: 24, height: 24 } }),
          'WhatsApp'
        )
      )
    );
  }

  /* Substitui os componentes globais */
  Object.assign(window, { Header, WhatsAppFloat });
})();

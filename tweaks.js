/* ============================================================
   Portal do BPC — Painel de Tweaks
   tweaks.js  (vanilla — independente do React)
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'pdbpc_tweaks_v1';
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "default",
    "accent": "terra",
    "font": "fraunces",
    "grain": "on"
  }/*EDITMODE-END*/;

  const FONT_GOOGLE = {
    fraunces: null, // já carregado
    playfair: 'Playfair+Display:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700',
    dmserif:  'DM+Serif+Display:wght@400&family=IBM+Plex+Sans:wght@400;500;600;700',
    instrument: 'Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700',
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...DEFAULTS, ...saved };
    } catch (e) {
      return { ...DEFAULTS };
    }
  }

  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function applyState(state) {
    const html = document.documentElement;
    if (state.theme && state.theme !== 'default') html.setAttribute('data-theme', state.theme);
    else html.removeAttribute('data-theme');

    if (state.accent && state.accent !== 'terra') html.setAttribute('data-accent', state.accent);
    else html.removeAttribute('data-accent');

    if (state.font && state.font !== 'fraunces') {
      html.setAttribute('data-font', state.font);
      ensureFontLoaded(state.font);
    } else html.removeAttribute('data-font');

    html.setAttribute('data-grain', state.grain === 'off' ? 'off' : 'on');
  }

  function ensureFontLoaded(key) {
    const cfg = FONT_GOOGLE[key];
    if (!cfg) return;
    const id = 'tweaks-font-' + key;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${cfg}&display=swap`;
    document.head.appendChild(link);
  }

  /* ---------- Painel ---------- */
  let state = load();
  applyState(state);

  const ACCENTS = [
    { v: 'terra',    color: '#c4673a' },
    { v: 'olive',    color: '#8a9a76' },
    { v: 'indigo',   color: '#5b6bc4' },
    { v: 'bordeaux', color: '#a04050' },
  ];
  const THEMES = [
    { v: 'default', l: 'Escuro' },
    { v: 'light',   l: 'Claro' },
    { v: 'noir',    l: 'Noir' },
  ];
  const FONTS = [
    { v: 'fraunces',   l: 'Fraunces' },
    { v: 'playfair',   l: 'Playfair' },
    { v: 'dmserif',    l: 'DM Serif' },
    { v: 'instrument', l: 'Instrument' },
  ];

  let panelEl = null;

  function build() {
    if (panelEl) return panelEl;
    panelEl = document.createElement('aside');
    panelEl.className = 'tweaks-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-label', 'Tweaks de design');
    panelEl.innerHTML = `
      <div class="tweaks-head">
        <div class="label">Tweaks<em>.</em></div>
        <button class="tweaks-close" aria-label="Fechar tweaks" data-close>×</button>
      </div>
      <div class="tweaks-body">
        <div class="tweaks-row">
          <div class="key">Acento</div>
          <div class="tweaks-swatches" data-group="accent">
            ${ACCENTS.map(a => `<button class="tweaks-swatch" data-v="${a.v}" style="background:${a.color}" aria-label="${a.v}"></button>`).join('')}
          </div>
        </div>
        <div class="tweaks-row">
          <div class="key">Tema</div>
          <div class="tweaks-seg" data-group="theme">
            ${THEMES.map(t => `<button data-v="${t.v}">${t.l}</button>`).join('')}
          </div>
        </div>
        <div class="tweaks-row">
          <div class="key">Tipografia</div>
          <div class="tweaks-seg" data-group="font">
            ${FONTS.map(f => `<button data-v="${f.v}">${f.l}</button>`).join('')}
          </div>
        </div>
        <div class="tweaks-row">
          <div class="key">Grão (textura)</div>
          <div class="tweaks-seg" data-group="grain">
            <button data-v="on">Ligado</button>
            <button data-v="off">Desligado</button>
          </div>
        </div>
        <button class="tweaks-reset" data-reset>Voltar ao padrão</button>
      </div>
    `;

    panelEl.addEventListener('click', (e) => {
      const t = e.target;
      if (t.matches('[data-close]')) return dismiss();
      if (t.matches('[data-reset]')) { state = { ...DEFAULTS }; save(state); applyState(state); refreshActive(); persistEdits(); return; }
      const group = t.closest('[data-group]');
      if (group && t.dataset.v) {
        const k = group.dataset.group;
        state[k] = t.dataset.v;
        save(state);
        applyState(state);
        refreshActive();
        persistEdits();
      }
    });

    return panelEl;
  }

  function refreshActive() {
    if (!panelEl) return;
    panelEl.querySelectorAll('[data-group]').forEach(g => {
      const k = g.dataset.group;
      g.querySelectorAll('[data-v]').forEach(b => {
        b.classList.toggle('is-active', b.dataset.v === state[k]);
      });
    });
  }

  function persistEdits() {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
    } catch (e) {}
  }

  function show() {
    document.body.appendChild(build());
    refreshActive();
  }
  function hide() {
    if (panelEl && panelEl.parentNode) panelEl.parentNode.removeChild(panelEl);
    panelEl = null;
  }
  function dismiss() {
    hide();
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  }

  // Protocolo do host
  window.addEventListener('message', (e) => {
    if (!e.data) return;
    if (e.data.type === '__activate_edit_mode') show();
    else if (e.data.type === '__deactivate_edit_mode') hide();
  });

  // Anuncia disponibilidade
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();

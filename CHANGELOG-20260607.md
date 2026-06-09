# Changelog — 07/06/2026

## Resumo das alterações

### 1. Vídeo no Hero
- **Arquivo:** `components.js`, `components.jsx`
- **O que:** Adicionado vídeo de fundo no hero com Cloudinary
- **URLs do vídeo:**
  - WebM: `https://res.cloudinary.com/dowbnssen/video/upload/v1780852218/hero_jitabs.webm`
  - MP4: `https://res.cloudinary.com/dowbnssen/video/upload/v1780852218/hero_jitabs.mp4`
- **Comportamento:** Foto `dr-carlos-costa.jpg` aparece como fallback (zIndex:0), vídeo por cima (zIndex:1), overlay gradient (zIndex:2)
- **Overlay:** `linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)`

### 2. FAQ como página separada
- **Arquivos:** `mobile-patch.js`, `app-main.js`, `screens.js`, `components.js`
- **O que:** "Perguntas" no menu agora abre como página separada (#/faq) em vez de fazer scroll
- **Correções:**
  - `mobile-patch.js`: removido `hash: '#faq'` do nav item FAQ (era `{ id: 'faq', label: 'Perguntas', hash: '#faq' }` → `{ id: 'faq', label: 'Perguntas' }`)
  - `app-main.js`: adicionada rota `#/faq` no load inicial, hashchange e render
  - `screens.js`: criada função `ScreenFAQ()` que renderiza `<FAQ />`
  - `components.js`: removido `hash:'#faq'` do nav item

### 3. Logos substituídas
- **Deletadas:** `logo-marca.png`, `logo-portal-bpc.png`, `logo-color.svg`, `favicon.svg`
- **Mantidas (oficiais):** `logo-monograma-cc.png` (monograma CC dourado)
- **Criadas:**
  - `favicon-256.png` — monograma CC em círculo escuro (256x256)
  - `og-cover.png` — imagem de compartilhamento social com monograma + branding (1200x630)
- **Referências atualizadas em:**
  - `index.html`, `termos.html`, `privacidade.html`, `checklist-pericia.html`, `patologias.html`
  - `blog/index.html`, `blog/template-artigo.html`
  - `blog/bpc-idoso-2026/index.html`, `blog/nova-identidade/index.html`, `blog/portaria-inss-1962-2026/index.html`
  - Todas as 60+ páginas de patologias (og-cover.png e favicon-256.png já usavam nomes corretos)

### 4. CSS — Barra entre hero e stats
- **Arquivo:** `styles.css`
- **O que:** Removida barra visível entre hero e seção de estatísticas
- **Correção:** `.stats { border-top: none }`, `.hero + .container { margin-top: -4px }`, `.hero { margin-bottom: 0 !important; padding-bottom: 0 !important }`

---

## Cache bust versions (index.html)
- `components.js?v=20260607h`
- `screens.js?v=20260607c`
- `app-main.js?v=20260607c`
- `mobile-patch.js?v=20260607b`
- `styles.css?v=20260607c`

## Arquivos fonte (.jsx) atualizados
- `components.jsx` — hero com vídeo, overlay, nav FAQ sem hash
- `screens.jsx` — ScreenFAQ adicionada
- `app-main.jsx` — rota FAQ completa

---

## Endereços e serviços

### Site em produção
- **URL:** `https://www.portaldobpc.com.br`
- **Domínio alternativo:** `https://portaldobpc.com.br`

### GitHub (código fonte)
- **Repositório:** `https://github.com/prevprocesso-maker/Portal-do-BPC-landing-page`
- **Branch principal:** `main`

### Vercel (hospedagem)
- **Deploy automático** a partir do GitHub (branch main)
- **Painel:** acessível via `https://vercel.com` com a conta vinculada

### Cloudinary (vídeos/mídia)
- **Vídeo hero (WebM):** `https://res.cloudinary.com/dowbnssen/video/upload/v1780852218/hero_jitabs.webm`
- **Vídeo hero (MP4):** `https://res.cloudinary.com/dowbnssen/video/upload/v1780852218/hero_jitabs.mp4`
- **Cloud name:** `dowbnssen`

### WhatsApp (contato)
- **Número:** +55 21 96423-8080
- **Link direto:** `https://wa.me/5521964238080`

### Google Analytics
- **Measurement ID:** `G-6RVLVTFRGT`
- **Painel:** `https://analytics.google.com`

### Fontes (Google Fonts)
- **Fraunces** (serifada principal)
- **Manrope** (sans-serif)

### Páginas do site
- **Home:** `https://www.portaldobpc.com.br/`
- **Patologias:** `https://www.portaldobpc.com.br/patologias.html`
- **Simulador:** `https://www.portaldobpc.com.br/#/simulador`
- **FAQ:** `https://www.portaldobpc.com.br/#/faq`
- **Blog:** `https://www.portaldobpc.com.br/#/blog`
- **Perícias:** `https://www.portaldobpc.com.br/#/pericias`
- **Estrangeiro:** `https://www.portaldobpc.com.br/#/estrangeiro`
- **BPC Idoso:** `https://www.portaldobpc.com.br/bpc-idoso/`
- **BPC Deficiente:** `https://www.portaldobpc.com.br/bpc-deficiente/`
- **BPC Estrangeiro:** `https://www.portaldobpc.com.br/bpc-estrangeiro/`
- **Perícias (hub):** `https://www.portaldobpc.com.br/pericias/`
- **Termos:** `https://www.portaldobpc.com.br/termos.html`
- **Privacidade:** `https://www.portaldobpc.com.br/privacidade.html`
- **Checklist Perícia:** `https://www.portaldobpc.com.br/checklist-pericia.html`

### 60 Páginas de patologias (exemplos)
- `https://www.portaldobpc.com.br/autismo-tea.html`
- `https://www.portaldobpc.com.br/fibromialgia.html`
- `https://www.portaldobpc.com.br/sindrome-de-down.html`
- (+ 57 páginas individuais no diretório deploy/)

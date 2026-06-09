# Footer com Mapa + Card de Avaliação (com QR Code)

Implemente este bloco no footer do projeto atual. Lado esquerdo é o Google Maps embed do endereço da empresa. Lado direito é um card escuro com gradient terracotta convidando o cliente a avaliar no Google — com QR Code clicável e botão CTA.

---

## Estrutura visual (referência)

```
┌─────────────────────────────────┬───────────────────────────────────┐
│                                 │  ★ ★ ★ ★ ★                        │
│                                 │  UMA AVALIAÇÃO SUA SALVA           │
│                                 │  OUTRA FAMÍLIA                     │
│                                 │                          ┌────┐    │
│   [ GOOGLE MAPS EMBED ]         │  Conseguiu seu          │ QR │    │
│                                 │  benefício com a        │CODE│    │
│   altura mínima 320px           │  gente?                 └────┘    │
│   bordas arredondadas 20px      │  Conta para quem          ⌗       │
│                                 │  ainda está perdido.    APONTE   │
│                                 │                         A CÂMERA │
│                                 │  Tem gente desesperada           │
│                                 │  agora buscando alguém...        │
│                                 │                                   │
│                                 │  [ Avaliar no Google ↗ ]          │
└─────────────────────────────────┴───────────────────────────────────┘
```

---

## Markup (HTML/JSX)

```jsx
<div className="footer-top">
  {/* Mapa à esquerda */}
  <div className="footer-map">
    <iframe
      src="https://www.google.com/maps?q=ENDERECO_AQUI_URL_ENCODED&output=embed"
      width="100%" height="100%"
      style={{ border: 0, display: 'block', filter: 'grayscale(0.3) brightness(0.9)' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Mapa — Nome da Empresa"
    />
  </div>

  {/* Card de avaliação à direita */}
  <a
    href="https://g.page/r/SEU_CODIGO_AQUI/review"
    target="_blank"
    rel="noopener noreferrer"
    className="review-card"
  >
    <div className="review-card-text">
      <div className="review-card-stars" aria-hidden="true">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div className="review-card-kicker">UMA AVALIAÇÃO SUA SALVA OUTRA FAMÍLIA</div>
      <h3 className="review-card-title">
        Conseguiu seu benefício com a gente?
        <em>Conta para quem ainda está perdido.</em>
      </h3>
      <p className="review-card-sub">
        Tem gente desesperada agora buscando por alguém de confiança. Uma avaliação sua pode ser o que faz outra família nos encontrar antes de desistir.
      </p>
      <span className="review-card-btn">
        Avaliar no Google
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </span>
    </div>
    <div className="review-card-qr">
      <div className="review-card-qr-frame">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&format=svg&data=https%3A%2F%2Fg.page%2Fr%2FSEU_CODIGO_AQUI%2Freview&color=1A140E&bgcolor=FFFFFF"
          alt="QR Code para avaliação no Google"
          width="120" height="120" loading="lazy"
        />
      </div>
      <div className="review-card-qr-cap">
        <span className="review-card-qr-cap-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </span>
        <span>Aponte a câmera</span>
      </div>
    </div>
  </a>
</div>
```

> **Substitua:** `ENDERECO_AQUI_URL_ENCODED` (use `encodeURIComponent` no endereço completo), `SEU_CODIGO_AQUI` (código do Google Business Profile para avaliação), e o `title` do iframe pelo nome da empresa.

---

## CSS — adicione no stylesheet principal

```css
/* ============================================================
   FOOTER TOP — Map + Review Card (lado a lado)
   ============================================================ */
.footer-top {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  margin-bottom: 56px;
  align-items: stretch;
}

/* ---- MAPA (esquerda) ---- */
.footer-map {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  min-height: 320px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}
.footer-map iframe { width: 100%; height: 100%; min-height: 320px; }

/* ---- CARD DE AVALIAÇÃO (direita) ---- */
.review-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;
  margin: 0;
  padding: 28px 32px;
  background:
    radial-gradient(circle at 90% 0%, rgba(196, 103, 58, 0.18) 0%, transparent 55%),
    linear-gradient(135deg, rgba(196, 103, 58, 0.06) 0%, rgba(20, 16, 12, 0.4) 100%);
  border: 1px solid rgba(196, 103, 58, 0.18);
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
              border-color 380ms ease,
              box-shadow 380ms ease;
}
.review-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 90% 0%, rgba(245, 200, 69, 0.12) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 380ms ease;
  pointer-events: none;
  z-index: -1;
}
.review-card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 200, 69, 0.5);
  box-shadow: 0 24px 60px rgba(196, 103, 58, 0.20), 0 6px 20px rgba(0, 0, 0, 0.25);
}
.review-card:hover::before { opacity: 1; }

/* Estrelas */
.review-card-stars {
  display: inline-flex;
  gap: 4px;
  font-size: 18px;
  color: #f5c845;
  text-shadow: 0 0 12px rgba(245, 200, 69, 0.4);
  margin-bottom: 14px;
  line-height: 1;
}

/* Kicker (micro-cabeçalho em caixa alta) */
.review-card-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245, 237, 224, 0.65);
  margin-bottom: 8px;
}

/* Título */
.review-card-title {
  font-family: 'Fraunces', Georgia, serif; /* substituir pela serif do projeto */
  font-size: clamp(22px, 2.6vw, 28px);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  color: #f5ede0;
  margin: 0 0 8px;
}
.review-card-title em {
  font-style: italic;
  color: #e89564; /* terracotta claro */
}

/* Subtítulo */
.review-card-sub {
  font-size: 14px;
  color: rgba(245, 237, 224, 0.65);
  line-height: 1.5;
  margin: 0 0 20px;
  max-width: 480px;
}

/* Botão "Avaliar no Google" */
.review-card-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  background: #c4673a; /* terracotta — substituir pela cor primária do projeto */
  color: #fff;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.005em;
  transition: gap 220ms ease, background 220ms ease;
  box-shadow: 0 6px 18px rgba(196, 103, 58, 0.32);
}
.review-card:hover .review-card-btn {
  gap: 14px;
  background: #d97f4f;
}

/* ---- QR CODE (direita do card) ---- */
.review-card-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.review-card-qr-frame {
  padding: 12px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(245, 200, 69, 0.2);
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.review-card:hover .review-card-qr-frame {
  transform: scale(1.04) rotate(-1deg);
}
.review-card-qr-frame img {
  display: block;
  width: 120px;
  height: 120px;
}
.review-card-qr-cap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(245, 237, 224, 0.7);
}
.review-card-qr-cap-icon {
  display: inline-flex;
  color: #e89564;
}

/* ---- RESPONSIVO ---- */
@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr; gap: 20px; }
  .footer-map { min-height: 260px; }
  .footer-map iframe { min-height: 260px; }
}
@media (max-width: 720px) {
  .review-card {
    grid-template-columns: 1fr;
    padding: 24px 22px;
    gap: 24px;
    text-align: left;
  }
  .review-card-qr { align-self: center; }
  .review-card-btn { width: 100%; justify-content: center; }
}
```

---

## Medidas exatas (referência rápida)

| Elemento | Medida |
|---|---|
| Grid colunas (desktop) | `1fr 1.1fr` (card de avaliação 10% maior que o mapa) |
| Gap entre as colunas | 24 px |
| Margem inferior (footer-top) | 56 px |
| Mapa — altura mínima | 320 px (desktop) · 260 px (tablet) |
| Mapa — border-radius | 20 px |
| Mapa — filtro | grayscale 30% + brilho 90% |
| Card — padding | 28 px topo/baixo · 32 px laterais |
| Card — border-radius | 20 px |
| Card — gap interno (texto ↔ QR) | 32 px |
| Estrelas — tamanho | 18 px com glow dourado |
| Kicker — letter-spacing | 0.22em |
| Título — tamanho | clamp(22px, 2.6vw, 28px) — responsivo |
| Botão CTA — padding | 12 × 22 px |
| Botão CTA — border-radius | 999 (pill) |
| QR Code — imagem | 120 × 120 px |
| QR Code — moldura branca | padding 12 px (total 144 × 144) |
| QR Code — border-radius | 14 px |

---

## Checklist de implementação

1. Inserir o bloco `<div class="footer-top">` no início do footer (antes do grid de colunas).
2. Substituir o endereço do iframe (`q=...`) pelo endereço real, codificado com `encodeURIComponent`.
3. Substituir `SEU_CODIGO_AQUI` na URL `g.page/r/.../review` e na geração do QR Code (apareçe nos dois lugares).
4. Adaptar cores ao tema do projeto:
   - `#c4673a` → cor primária (terracotta/laranja)
   - `#d97f4f` → versão clara do primário (hover)
   - `#e89564` → versão ainda mais clara para acento (em itálico do título)
   - `#f5ede0` → cor de texto clara (creme)
   - `#1a140e` → fundo escuro (passado para o QR code via `color=1A140E`)
   - `#f5c845` → dourado das estrelas (não mudar se quiser estrelas Google-like)
5. Confirmar que `loading="lazy"` está no iframe e na imagem do QR.
6. Testar em desktop (>900px), tablet (720-900px) e mobile (<720px).
7. Confirmar acessibilidade: `aria-hidden` nos ícones decorativos, `aria-label` ou texto descritivo nos links/imagens.

## Critério de aceite

- Desktop: mapa e card lado a lado (card 10% mais largo), mesma altura
- Tablet (≤900px): empilhados verticalmente
- Mobile (≤720px): card reorganiza — texto em cima, QR + botão embaixo
- Hover no card inteiro: borda dourada, sombra colorida, QR rotaciona -1° e escala 1.04, botão expande gap
- QR Code funcional — apontar câmera leva à página de avaliação do Google
- Sem layout-shift quando o cursor entra/sai

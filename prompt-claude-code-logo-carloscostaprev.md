# Trocar a logo para o novo monograma CC dourado — carloscostaprev.com.br

Aplique esta mudança ao projeto **carloscostaprev.com.br**. Mantenha o resto do site intacto.

## Contexto
A identidade visual foi unificada. As duas marcas da casa — **CarlosCostaPrev** (escritório) e **Portal do BPC** (sub-produto) — passam a **compartilhar o mesmo símbolo**: o **monograma CC dourado entrelaçado** sobre azul-marinho. O Portal do BPC já foi atualizado; falta aplicar no site do escritório.

> O monograma é a forma gráfica da casa (não "as letras CC do Portal"). Ele representa **Carlos Costa** e dá autoridade às duas marcas.

## Tipografia da identidade (referência)
- **Títulos / nome:** Lora (serifa) — peso 600/700
- **Corpo / legenda:** Geist (sans)

> ⚠️ A troca de FONTES do site é uma mudança maior e **não** faz parte deste handoff. Aqui o foco é **só a logo**. Se for trocar as fontes depois, peça um handoff separado.

---

## 📦 PARTE 1 — Adicionar os arquivos do monograma

Copie estes 4 arquivos para `assets/` do projeto (estão no pacote enviado junto):

| Arquivo | Uso |
|---|---|
| `logo-monograma-cc.png` | **Dourado** — para fundos escuros (header navy, footer escuro). Versão principal. |
| `logo-monograma-cc-navy.png` | **Navy sólido** — para fundos claros/dourados. |
| `logo-monograma-cc-cream.png` | **Creme sólido** — para fundos muito escuros, se precisar de contraste maior. |
| `logo-monograma-cc-gold.png` | Dourado alternativo (chapado). |

São PNGs com fundo **transparente** — funcionam em qualquer superfície.

---

## 🔤 PARTE 2 — Logo do cabeçalho (header)

Localize o bloco do logo no header e troque a marca pelo monograma. O padrão usado no Portal (espelhe a estrutura que já existir no seu header):

```jsx
<a href="#/" className="header-logo" onClick={...}>
  <img
    src="assets/logo-monograma-cc.png"
    alt="CarlosCostaPrev"
    className="header-logo-mark"
    style={{ objectFit: 'contain' }}
  />
  <span className="header-logo-text">
    <span className="header-logo-text-1">CarlosCosta</span>
    <span className="header-logo-text-2">Prev<span className="header-logo-dot">.</span></span>
    <span className="header-logo-tagline">PREVIDÊNCIA · INSS · ACOLHIMENTO</span>
  </span>
</a>
```

CSS de tamanho e alinhamento do logo (importante — replica os ajustes finos do Portal):
```css
.header-logo { display: flex; align-items: center; gap: 9px; }   /* gap pequeno: monograma colado no nome */
.header-logo-mark { width: 64px; height: 64px; flex: none; object-fit: contain; }
.header-logo-text { display: flex; flex-direction: column; line-height: 1; position: relative; }

/* A tagline fica ABSOLUTA, fora do fluxo, pra NÃO empurrar o monograma pra baixo.
   Assim o monograma centraliza no nome (CarlosCosta / Prev.), com ou sem tagline. */
.header-logo-tagline {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  margin-top: 0;
  white-space: nowrap;
}
```

> ⚠️ **Os 2 detalhes que mais importam:** (1) `gap: 9px` (não 16px) pra o monograma ficar perto do nome; (2) tagline `position: absolute` pra o logo centralizar no nome e não "descer" quando a tagline aparece.

> Se o site do escritório usa um wordmark só de texto (sem ícone), basta **adicionar** o `<img>` do monograma à esquerda do texto, mantendo o nome "CarlosCostaPrev".

---

## 🦶 PARTE 3 — Logo do rodapé (footer)

No bloco da marca no footer, use o monograma maior + nome, **centralizado** (`align-items: center`) e com gap pequeno:

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
  <img src="assets/logo-monograma-cc.png" alt="CarlosCostaPrev"
       style={{ height: 84, width: 84, objectFit: 'contain', display: 'block', flex: 'none' }} />
  <div>
    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1, color: 'var(--ink-900)' }}>CarlosCosta</div>
    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, fontStyle: 'italic', lineHeight: 1, color: 'var(--terra-500)', marginTop: 4 }}>Prev<span style={{ color: 'var(--terra-300)' }}>.</span></div>
  </div>
</div>
```

---

## 🔗 PARTE 4 — Card "marca irmã" no footer (aponta pro Portal do BPC)

O site do escritório deve ter o card recíproco apontando pro Portal (espelho do que o Portal tem apontando pro escritório). **O monograma centraliza no NOME** e a descrição fica numa linha própria abaixo, indentada pra alinhar sob o nome:

```jsx
<div className="footer-desc" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra-400, #d99466)', display: 'block', marginBottom: 10 }}>Especialização em BPC/LOAS</span>
  <a href="https://www.portaldobpc.com.br" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src="assets/logo-monograma-cc.png" alt="Portal do BPC" style={{ height: 52, width: 52, objectFit: 'contain', display: 'block', flex: 'none' }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f5ede0', fontWeight: 600, lineHeight: 1.2 }}>Portal do BPC — Idoso e deficiente <span aria-hidden="true">↗</span></span>
    </span>
    <span style={{ display: 'block', marginTop: 6, fontSize: 13, opacity: 0.7, paddingLeft: 64 }}>Benefício de Prestação Continuada (BPC/LOAS)</span>
  </a>
</div>
```

> O `paddingLeft: 64` (= 52 do logo + 12 do gap) alinha a descrição exatamente sob o nome.

---

## ⭐ PARTE 5 — Favicon e meta

- Troque o **favicon** pelo monograma. Gere a partir de `logo-monograma-cc.png` (dourado sobre tile navy) nos tamanhos 32, 180 (apple-touch) e 512.
- Atualize o campo `logo` do JSON-LD (`schema.org`) para o caminho do novo monograma:
  ```json
  "logo": "https://www.carloscostaprev.com.br/assets/logo-monograma-cc.png"
  ```
- `og:image`: se o card social usa a logo antiga, regenere com o monograma.

---

## ✅ Checklist
- [ ] 4 PNGs do monograma em `assets/`
- [ ] Header: monograma + "CarlosCostaPrev" + tagline
- [ ] **Header: `gap: 9px`** (monograma colado no nome)
- [ ] **Header: tagline `position: absolute`** (logo centraliza no nome, não desce)
- [ ] Footer: monograma 84×84 + nome, `align-items: center`
- [ ] Card "Especialização em BPC/LOAS" apontando pro Portal (monograma 52×52, **centralizado no nome**, descrição indentada `paddingLeft: 64`)
- [ ] Favicon trocado (32 / 180 / 512)
- [ ] JSON-LD `logo` atualizado
- [ ] `og:image` regenerado (se aplicável)
- [ ] Remover/arquivar a logo antiga (arco/porta) dos assets

> Nada de mudar cores, layout ou fontes. Só a logo e os pontos acima.

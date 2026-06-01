# Deploy — Otimização de velocidade (Portal do BPC)

Pacote de melhorias de **performance e acessibilidade** da home (`portaldobpc.com.br`).
Não muda visual nem conteúdo — só deixa o site muito mais rápido. Publicar na Vercel.

---

## 1) O que mudou e por quê

| # | Mudança | Ganho |
|---|---------|-------|
| 1 | **Foto do herói** `dr-carlos-costa.jpg`: 4 MB → **75 KB** (recomprimida, 820px) | Maior causa do LCP alto. Sozinha derruba o tempo de carregamento. |
| 2 | **Logos** `logo-marca.png` (332KB→26KB) e `logo-monograma-cc.png` (76KB→26KB) | Imagens grandes demais para o tamanho exibido. |
| 3 | **Babel removido do navegador**: o JSX agora vem **pré-compilado** em `.js` | Eliminou ~640 KB + ~600 ms travando o celular do usuário. |
| 4 | **React de produção** (era "de desenvolvimento") | `react-dom` caiu de 228 KB → ~40 KB. |
| 5 | **`preconnect` + `preload` da fonte e da foto** no `<head>` | Resolve o aviso de "fetchpriority" do LCP e parte do CLS. |
| 6 | **Acessibilidade**: `<label>` ligado ao `<select>` + verde do WhatsApp com contraste correto | Sobe a nota de acessibilidade. |

---

## 2) Arquivos a commitar

**Imagens otimizadas (substituídas):**
- `deploy/assets/dr-carlos-costa.jpg`
- `deploy/assets/logo-marca.png`
- `deploy/assets/logo-monograma-cc.png`

**Novos (JSX pré-compilado para JS puro):**
- `deploy/components.js`
- `deploy/screens.js`
- `deploy/app-main.js`

**Alterados:**
- `deploy/index.html` — head com preconnect/preload; carrega os `.js` compilados; Babel removido
- `deploy/components.jsx` — dimensões/`fetchpriority` na foto, `loading="lazy"`, `aria-label` no select
- `deploy/colors_and_type.css` — comentário sobre a fonte (sem efeito funcional)
- `deploy/styles.css` — verde do WhatsApp com contraste AA
- `deploy/app-main.jsx` — código do App extraído do index (fonte do `app-main.js`)

> Não é preciso remover os `.jsx` antigos — eles ficam como **código-fonte**. O site em produção usa os `.js`.

---

## 3) Como publicar (Vercel)

```bash
git add deploy/
git commit -m "perf: otimiza imagens, pré-compila JSX, React de produção e preconnect"
git push
```
A Vercel publica sozinha. Depois, **abra o site numa aba anônima** (para não pegar cache) e confira que a home carrega normal.

---

## 4) Conferir o resultado

1. Rodar de novo o **PageSpeed Insights** em `https://www.portaldobpc.com.br/` (celular e computador).
2. Esperado: salto grande em **Desempenho**; LCP e bytes de imagem muito menores.

---

## 5) ⚠️ Manutenção (IMPORTANTE)

O site agora carrega os arquivos **compilados** (`components.js`, `screens.js`, `app-main.js`),
não os `.jsx`. **Se você editar um `.jsx`, precisa recompilar** o `.js` correspondente,
senão a mudança não aparece no site.

Duas opções:
- Me pedir para recompilar sempre que mexer num `.jsx` (rápido), **ou**
- Adicionar um passo de build no fluxo do Claude Code (ex.: `@babel/cli` com preset `react`)
  que gere os `.js` automaticamente antes do deploy.

---

## 6) Melhorias opcionais futuras (não bloqueiam)
- Servir as imagens em **WebP/AVIF** (mais leves ainda que JPEG).
- Auto-hospedar React e os `.js` no próprio domínio (tira a dependência da unpkg.com).
- Ajustes finos de acessibilidade que ainda aparecem: sublinhar links de "Política de Privacidade/Termos" dentro de texto, e ordem de títulos (h4→h5) em alguns cards.

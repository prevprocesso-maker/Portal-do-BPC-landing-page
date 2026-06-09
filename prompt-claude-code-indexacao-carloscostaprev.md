# Corrigir indexação no Google — carloscostaprev.com.br

Aplique no projeto **carloscostaprev.com.br**. Objetivo: resolver os erros do Google Search Console (**427 páginas não indexadas, só 5 indexadas, 10 motivos**) e destravar a indexação.

## Contexto / diagnóstico
O site é um **SPA em React com roteamento por hash** (`#/pericias`, `#/patologia/...`). Para o Google, hoje só existe **1 página real (a home `/`)** — por isso quase nada indexa. O Search Console reportou 4 grupos de erro. Abaixo, a causa e a correção de cada um, em ordem de impacto.

---

## 🚨 PARTE 1 — Acesso proibido (403)  [FAZER PRIMEIRO]
**Causa mais provável:** a **Deployment Protection / Vercel Authentication** está LIGADA na produção, bloqueando o Googlebot em todas as páginas.

**Correção (painel da Vercel, não é código):**
- Vercel → projeto `carloscostaprev` → **Settings → Deployment Protection**
- **Production:** mudar para **Disabled** (ou, no mínimo, "Only Preview Deployments").
- Se houver **Password Protection** ou **Vercel Authentication** ativos na produção → desativar.

> Sem isso, nenhuma outra correção adianta — o Google continua levando 403.

Depois, validar: abrir uma aba anônima e acessar `https://www.carloscostaprev.com.br/` — deve abrir sem pedir login. E no GSC → **Inspeção de URL** → "Testar URL ativo" deve dar **"URL disponível para o Google"**.

---

## 🌐 PARTE 2 — Domínio canônico único (resolve "Página com redirecionamento")
Escolher **UMA** versão oficial e redirecionar a outra com **301**:
- Definir o domínio principal na Vercel (ex.: `www.carloscostaprev.com.br`).
- A outra versão (sem www) deve dar **um único 301** para a principal (sem cadeias).
- Usar essa versão **em todos os `<link rel="canonical">`, `og:url` e no `sitemap.xml`**. Nada de misturar http/https ou com/sem barra final.
- Manter `trailingSlash` consistente (recomendo `false`) no `vercel.json`.

---

## 🤖 PARTE 3 — robots.txt (resolve "Bloqueada pelo robots.txt")
Garantir que a produção sirva este `robots.txt` na raiz:

```
User-agent: *
Allow: /

Sitemap: https://www.carloscostaprev.com.br/sitemap.xml
```

> Provavelmente há um robots **antigo/restritivo** ainda no ar. Após o deploy, conferir em `https://www.carloscostaprev.com.br/robots.txt` e reenviar no GSC.

---

## 🗺️ PARTE 4 — Sitemap alinhado à realidade (resolve os "4xx")
Hoje o sitemap promete URLs de caminho (`/bpc-idoso`, `/pericias`, `/patologia/...`) que **não existem como páginas reais** (são rotas de hash) → o Google leva **404**.

**Correção imediata (parar o erro):** deixar no `sitemap.xml` **apenas URLs que retornam 200 de verdade** — home, páginas estáticas (privacidade, termos) e os artigos do blog (que são HTML real). Remover as rotas que só existem como `#/...`.

**Correção definitiva:** ver Parte 5.

---

## 🏗️ PARTE 5 — O conserto que faz ranquear (páginas reais)
Enquanto as páginas internas forem só rotas de hash, o Google **não consegue indexá-las** individualmente. Para ranquear "BPC idoso", "perícia INSS" etc., cada página-chave precisa de **URL própria com HTML real** (como os artigos do blog já são).

Escolha **uma** abordagem:
- **(A) Pré-renderizar / SSG:** migrar para Next.js/Astro, ou gerar HTML estático por rota no build. Melhor solução de SEO.
- **(B) Páginas estáticas manuais:** criar `/bpc-idoso/index.html`, `/bpc-deficiente/index.html`, `/pericias/index.html`, `/bpc-estrangeiro/index.html` e cada `/patologia/<slug>/index.html`, cada uma com `<title>`, meta description, canonical e JSON-LD próprios (reaproveite o template do blog).
- **(C) Roteamento por path + fallback (paliativo):** trocar o hash por History API (`pathname`) e adicionar no `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/((?!assets/|blog/|.*\\.\\w+$).*)", "destination": "/index.html" }] }
  ```
  Ainda assim, sem pré-renderização o conteúdo carrega via JS — o Google às vezes indexa, mas é inferior ao A/B.

> Recomendação: **A** (ou **B** se quiser rápido sem trocar stack). As páginas de patologia são ouro de cauda longa — valem ser HTML real.

---

## 🔁 PARTE 6 — Ecossistema (link entre os dois sites)
Manter o link recíproco no footer (carloscostaprev → portaldobpc e vice-versa) e o JSON-LD com `sameAs`/`legalName` — reforça pro Google que são a mesma empresa.

---

## ✅ Checklist
- [ ] **Vercel:** Deployment Protection da produção = Disabled (corrige 403)
- [ ] Domínio canônico único + 301 da outra versão
- [ ] `robots.txt` novo no ar (Allow: / + Sitemap)
- [ ] `sitemap.xml` só com URLs 200 reais
- [ ] Plano de páginas reais definido (A, B ou C) e iniciado
- [ ] GSC: reenviar sitemap + "Validar correção" em cada motivo
- [ ] Inspeção de URL da home dando "disponível para o Google"

> Ordem de execução: **1 → 3 → 2 → 4** destrava o básico em dias; **5** é o que realmente faz subir no Google.

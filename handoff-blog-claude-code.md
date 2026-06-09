# Handoff — Integrar blog ao site portaldobpc.com.br

> **Para o Claude Code (responsável pelo repositório `prevprocesso-maker/Portal-do-BPC-landing-page`):**
> Integre os arquivos do blog no projeto. Tudo está em `deploy/blog/` no projeto-irmão do Design System.

---

## 📁 Estrutura a integrar

```
deploy/blog/
├── index.html                          ← Listagem (lista de matérias com cards + filtros)
├── template-artigo.html                ← Template reutilizável pra novos artigos
└── bpc-idoso-2026/
    ├── index.html                      ← 1ª matéria publicada
    ├── og.png                          ← Hero 1200×630 (também usada no compartilhamento)
    └── documentos.png                  ← Imagem inline
```

E dois arquivos de assets compartilhados:

```
deploy/assets/equipe-avatar.png         ← Avatar do autor (160×160)
deploy/colors_and_type.css              ← CSS já compartilhado pelo projeto (não duplicar)
```

---

## ✅ O que essa integração precisa entregar

### 1. Roteamento

O site SPA tem `index.html` com state machine de telas (home, simulador, blog, perícias, estrangeiro, faq, patologias).

Hoje existe `ScreenBlog` no `components.jsx` (FAQ-style). **Substituir** essa screen pra renderizar a nova listagem em `deploy/blog/index.html`, e adicionar rota dinâmica:

```js
// hash routing
'#/blog'                       → listagem em deploy/blog/index.html (ou ScreenBlogList)
'#/blog/:slug'                 → matéria em deploy/blog/[slug]/index.html
'#/blog/bpc-idoso-2026'        → primeira matéria já pronta
```

### 2. URLs amigáveis em produção

Vercel suporta clean URLs nativamente:
- `/blog` → renderiza `deploy/blog/index.html`
- `/blog/bpc-idoso-2026` → renderiza `deploy/blog/bpc-idoso-2026/index.html`

Garantir `vercel.json` com:
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 3. Header e Footer compartilhados

O blog atualmente é standalone (não tem o Header e Footer do site). **Injetar** o `<Header>` e `<Footer>` do projeto principal nas páginas do blog, mantendo:
- A navegação ativa "Blog" destacada no header
- Footer idêntico ao resto do site

### 4. Sitemap

Atualizar `sitemap.xml` adicionando:
```xml
<url>
  <loc>https://www.portaldobpc.com.br/blog</loc>
  <lastmod>2026-05-28</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://www.portaldobpc.com.br/blog/bpc-idoso-2026</loc>
  <lastmod>2026-05-28</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### 5. Schema.org

A listagem e a matéria **já vêm com JSON-LD completo** (Article, FAQPage, HowTo, BreadcrumbList). Apenas garantir que nenhum middleware do site remova ou duplique esses scripts.

### 6. GA4

Os arquivos já têm o snippet do GA4 (`G-6RVLVTFRGT`). Se o site já injeta GA4 via layout pai, **remover do head dos arquivos do blog** pra evitar disparo duplicado.

---

## ⚠️ A matéria do BPC Idoso 2026 tem marcadores `[VERIFICAR]`

A 1ª matéria contém placeholders explícitos como `[VERIFICAR VALOR DO SALÁRIO MÍNIMO 2026]` em pontos onde dados precisam ser confirmados em fonte oficial. **NÃO publicar em produção sem revisar essas marcações.**

Banner "RASCUNHO · NÃO PUBLICAR" está no topo. Carlos vai mandar 10 fontes oficiais nos próximos dias e o conteúdo será atualizado antes do deploy real.

**Recomendação:** subir tudo em ambiente de PREVIEW da Vercel (branch separada, ex: `feat/blog`) até a revisão estar concluída. Só promover pra `main` quando os `[VERIFICAR]` forem todos substituídos.

---

## 🎯 Critérios de aceitação

- [ ] `www.portaldobpc.com.br/blog` abre a listagem
- [ ] `www.portaldobpc.com.br/blog/bpc-idoso-2026` abre a matéria
- [ ] Navegação do header destaca "Blog" quando estiver nas páginas do blog
- [ ] Footer aparece em todas as páginas do blog
- [ ] Filtros por categoria funcionam na listagem
- [ ] Sitemap atualizado e enviado ao Google Search Console
- [ ] GA4 dispara `page_view` em ambas as páginas (1 vez, sem duplicar)
- [ ] Schemas validados em search.google.com/test/rich-results
- [ ] Open Graph testado em opengraph.xyz
- [ ] Imagens otimizadas (WebP onde possível, max 200KB)

---

## 📋 Workflow pra próximas matérias

Carlos vai produzir 2 matérias por semana usando o template em `deploy/blog/template-artigo.html`. Cada nova matéria nasce como:

```
deploy/blog/[slug]/
├── index.html                          ← clone do template, editado
├── og.png                              ← imagem hero 1200×630
└── [imagens-inline].png                ← se houver
```

E precisa:
1. Aparecer automaticamente na listagem `deploy/blog/index.html` (manualmente por enquanto, ou via build step que lê o `<head>` de cada artigo)
2. Ser adicionada ao `sitemap.xml`
3. Ser linkada de pelo menos 2 outras matérias relacionadas

---

## 🔗 Links de referência

- Projeto Design System (origem dos arquivos): `[link do projeto]`
- Repositório do site: `github.com/prevprocesso-maker/Portal-do-BPC-landing-page`
- GA4 ID: `G-6RVLVTFRGT`
- Vercel project: `portaldobpc`

---

**Me confirma quando estiver pronto pra subir.** Posso ajudar a debugar qualquer problema de integração.

# Gerar páginas estáticas das patologias (e demais rotas) — portaldobpc

Aplique no projeto **portaldobpc.com.br**. Objetivo: transformar as rotas que hoje são **só hash do SPA** em **HTML real indexável** — sem duplicar conteúdo à mão.

## Já feito (pelo time de design)
Já existem como **HTML real** (não mexer, só manter no sitemap):
- `/` (home, SPA)
- `/bpc-idoso`, `/bpc-deficiente`, `/pericias`, `/bpc-estrangeiro` (páginas-âncora novas)
- `/blog`, `/blog/bpc-idoso-2026`, `/blog/nova-identidade`
- `/privacidade`, `/termos`

O `sitemap.xml` já foi enxugado pra conter só URLs 200 reais.

## O que falta (sua tarefa): as ~20 patologias + simulador
As páginas de patologia (`/patologia/<slug>`) e o `/simulador` ainda são rotas de hash → 404 pro Google.

### Abordagem recomendada — pré-renderizar no build (fonte única)
O conteúdo de cada patologia **já existe** em `screens.jsx`:
- `PATOLOGIAS` (lista: sigla, nome, categoria, slug)
- `PATOLOGIA_DETAIL` (conteúdo por sigla: `legalBase`, `o_que_e`, `criterios`, `docs`, `recurso`, `relacionadas`)
- `PATOLOGIA_DEFAULT` (fallback)
- `CATEGORIAS`

**Crie um script de build** (Node) que:
1. Importa/lê esses dados de `screens.jsx` (extraia os objetos para um módulo `data/patologias.js` compartilhado — assim SPA e gerador usam a MESMA fonte, sem drift).
2. Para cada patologia, renderiza um `/patologia/<slug>/index.html` estático usando o **mesmo template** das páginas-âncora (reaproveite o layout de `deploy/blog/template-artigo.html`), preenchendo:
   - `<title>`: `BPC para <nome> — critérios, documentos e direito | Portal do BPC`
   - meta description única (use o `o_que_e` resumido)
   - canonical `https://www.portaldobpc.com.br/patologia/<slug>`
   - JSON-LD **MedicalCondition** + **FAQPage** + **BreadcrumbList**
   - corpo: o que é, critérios do BPC para a condição, documentos, recurso, relacionadas (links internos entre patologias = ótimo p/ SEO)
3. Gera também `/simulador/index.html` com uma versão **estática indexável** (texto explicando o simulador + CTA), mantendo o simulador interativo via JS para o usuário.
4. Ao final, **gera o `sitemap.xml`** automaticamente a partir da lista de páginas reais (home + âncoras + blog + todas as patologias + simulador). Assim o sitemap nunca mais lista URL inexistente.

### Roteamento (importante)
- Servir cada `/<slug>/index.html` como página real (Vercel `cleanUrls: true` já resolve `/patologia/xxx`).
- Se mantiver o SPA para navegação, troque o **hash** por **History API (pathname)** para que o link interno e a URL real coincidam — e adicione fallback no `vercel.json` apenas para o que NÃO é arquivo real:
  ```json
  { "rewrites": [{ "source": "/((?!assets/|blog/|patologia/|bpc-idoso|bpc-deficiente|pericias|bpc-estrangeiro|simulador|.*\\.\\w+$).*)", "destination": "/index.html" }] }
  ```
- Garanta que cada página estática **renderize o conteúdo no HTML** (não só via JS), senão o ganho de indexação se perde.

### Conteúdo — qualidade > quantidade
- Cada patologia precisa de **texto único** (o `PATOLOGIA_DETAIL` já tem). Onde só houver `PATOLOGIA_DEFAULT` (genérico), **escreva conteúdo específico** antes de publicar — páginas rasas/duplicadas prejudicam o ranking.
- Links cruzados entre patologias relacionadas e para `/bpc-deficiente` e `/pericias`.

## Checklist
- [ ] Dados de patologia extraídos para módulo único compartilhado
- [ ] Script de build gerando `/patologia/<slug>/index.html` (HTML renderizado, não só JS)
- [ ] JSON-LD MedicalCondition + FAQPage + Breadcrumb por página
- [ ] `/simulador` estático indexável (mantendo o interativo)
- [ ] `sitemap.xml` gerado automaticamente das páginas reais
- [ ] Roteamento por path + fallback no vercel.json (se mantiver SPA)
- [ ] Conteúdo genérico (DEFAULT) substituído por texto específico
- [ ] GSC: reenviar sitemap e "Validar correção"

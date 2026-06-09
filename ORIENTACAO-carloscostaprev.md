# Orientação total — carloscostaprev.com.br

Documento mestre do que precisa ser feito no site do escritório **CarlosCostaPrev**. Tudo aqui é tarefa pro **irmão code** (repositório do carloscostaprev). Em ordem de prioridade.

> Contexto: CarlosCostaPrev (escritório, previdência geral) e Portal do BPC (sub-marca, BPC/LOAS) são a mesma casa. O Portal já foi atualizado (identidade + páginas + indexação). Falta espelhar no carloscostaprev.

---

## 🔴 PRIORIDADE 1 — Destravar a indexação no Google
**Sintoma:** Search Console mostra **427 não indexadas, só 5 indexadas**. Site quase invisível no Google.
**Causas e correções:** ver handoff detalhado → `prompt-claude-code-indexacao-carloscostaprev.md`

Resumo da ordem de ataque:
1. **Vercel → Deployment Protection = Disabled** na produção (corrige os erros 403). **É o passo nº 1** — sem isso nada indexa.
2. **robots.txt** novo no ar (`Allow: /` + linha `Sitemap:`).
3. **Domínio canônico único** (www ou sem-www) com 301 da outra versão; usar em todo canonical/OG/sitemap.
4. **sitemap.xml** só com URLs reais (200). Hoje lista rotas de hash que dão 404.

---

## 🟠 PRIORIDADE 2 — Páginas reais (o que faz ranquear)
O site é um SPA com roteamento por hash → o Google só vê a home. As páginas internas precisam virar **HTML real** (como já fizemos no Portal).
- Criar páginas-âncora: aposentadorias, pensões, auxílios, revisões, BPC/LOAS (ponte para o Portal).
- Pré-renderizar no build (fonte única) — mesma lógica do handoff `prompt-claude-code-paginas-patologias.md` do Portal.
- Gerar `sitemap.xml` automático a partir das páginas reais.

---

## 🟡 PRIORIDADE 3 — Identidade visual (logo nova)
Aplicar o monograma dourado e o sistema visual (já entregue).
**Handoff:** `prompt-claude-code-logo-carloscostaprev.md`
- 4 PNGs do monograma em `assets/`
- Header: monograma + "CarlosCostaPrev" + tagline (gap 9px, tagline absoluta)
- Rodapé: monograma 84px + nome
- Card "Especialização em BPC/LOAS" apontando pro Portal
- Favicon + JSON-LD `logo` atualizados

---

## 🟢 PRIORIDADE 4 — Conteúdo de marca + ecossistema
- Publicar o artigo espelho "nova identidade" → handoff `prompt-claude-code-artigo-nova-identidade.md` (com canonical próprio e texto reescrito, sem duplicar o do Portal).
- Footer com card recíproco + JSON-LD `sameAs`/`legalName` ligando os dois sites (reforça "mesma empresa" pro Google) → ver `prompt-claude-code-ecossistema-seo-geo.md`.

---

## 📋 Checklist mestre
- [ ] **P1:** Vercel Deployment Protection OFF (corrige 403)
- [ ] **P1:** robots.txt + domínio canônico + sitemap real
- [ ] **P2:** páginas-âncora em HTML real + sitemap automático
- [ ] **P3:** logo/monograma novo (header, rodapé, favicon)
- [ ] **P4:** artigo "nova identidade" + ecossistema (links + schema)
- [ ] GSC: reenviar sitemap, solicitar indexação, validar correções

## Como medir sucesso
- GSC → "Indexadas" sobe de 5 para dezenas (semanas).
- Buscas "carloscostaprev", "aposentadoria Irajá", "advogado BPC RJ" começam a trazer o site.
- Os dois domínios aparecem associados (mesma empresa).

---

### Handoffs de referência (já prontos, na pasta deploy/)
| Tema | Arquivo |
|---|---|
| Indexação / Google | `prompt-claude-code-indexacao-carloscostaprev.md` |
| Logo / identidade | `prompt-claude-code-logo-carloscostaprev.md` |
| Artigo nova identidade | `prompt-claude-code-artigo-nova-identidade.md` |
| Páginas no build (modelo) | `prompt-claude-code-paginas-patologias.md` |
| Ecossistema SEO/GEO | `prompt-claude-code-ecossistema-seo-geo.md` |

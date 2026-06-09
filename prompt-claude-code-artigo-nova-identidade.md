# Publicar artigo "Nova identidade" no blog do carloscostaprev.com.br

Aplique no projeto **carloscostaprev.com.br**. Crie um artigo de blog espelho do que já está no Portal do BPC, anunciando a nova identidade visual.

## Contexto
As duas marcas da casa (CarlosCostaPrev = escritório/previdência geral; Portal do BPC = sub-marca BPC/LOAS) estão com nova identidade. O Portal do BPC já publicou o artigo em `portaldobpc.com.br/blog/nova-identidade`. Falta o espelho no site do escritório.

## Onde criar
`/blog/nova-identidade/index.html` (mesma estrutura do template de artigo do projeto). Se o blog do carloscostaprev ainda não existir, crie `/blog/` seguindo o mesmo padrão do Portal.

## Ajustes de SEO (importante — NÃO duplicar conteúdo idêntico cru)
Para os dois sites não competirem por conteúdo duplicado, **inverta o protagonista** e use canônica própria:

| Campo | Valor no carloscostaprev |
|---|---|
| `<title>` | `CarlosCostaPrev e Portal do BPC: nova identidade \| CarlosCostaPrev` |
| `canonical` | `https://www.carloscostaprev.com.br/blog/nova-identidade` |
| `og:url` | `https://www.carloscostaprev.com.br/blog/nova-identidade` |
| `og:site_name` | `CarlosCostaPrev` |
| Schema `publisher.name` | `CarlosCostaPrev` |
| H1 / texto | Começar pela **CarlosCostaPrev** (previdência geral) como marca principal e o Portal do BPC como a frente de BPC/LOAS. |

> Reescreva 1ª pessoa do escritório: "A CarlosCostaPrev, escritório de advocacia previdenciária em Irajá/RJ, está de cara nova…". Mantenha os fatos (mesmo WhatsApp, mesmo endereço), mas com texto **reescrito** (não copiado palavra a palavra) para evitar conteúdo duplicado.

## Conteúdo (estrutura)
1. **H1**: Estamos de cara nova — a mesma dedicação de sempre.
2. **Resumo rápido** (TLDR) com: o que é; CarlosCostaPrev (aposentadorias, pensões, auxílios, INSS); Portal do BPC (BPC/LOAS idoso e PcD); o que não muda (WhatsApp 21 96423-8080, sede Irajá/RJ).
3. **O que mudou (e o que não muda)**.
4. **Uma casa, duas marcas** (CarlosCostaPrev em destaque; Portal do BPC como frente de BPC).
5. **Como ajudamos** (aposentadorias, revisões, BPC, recursos).
6. **Onde encontrar** (WhatsApp, sites, Instagram, endereço completo — bom p/ SEO local).
7. **FAQ** (4 perguntas, com schema FAQPage) — mesmas perguntas, respostas reescritas.

## Schemas JSON-LD (incluir)
- `Article` (author/publisher = CarlosCostaPrev)
- `FAQPage`
- `BreadcrumbList` (Início › Blog › Nova identidade)

## Imagem
Use a arte do anúncio (a mesma cara nova) como `og.png` 1080×1080 ou gere uma 1200×630. Coloque `og:image:width/height` corretos.

## Linkagem cruzada (reforça o "mesma empresa" pro Google)
- Neste artigo, **linke** para `https://www.portaldobpc.com.br/blog/nova-identidade` ("nossa frente de BPC/LOAS").
- No artigo do Portal já existe o link recíproco para o carloscostaprev.

## Sitemap
Adicione `https://www.carloscostaprev.com.br/blog/nova-identidade` ao `sitemap.xml`.

## Checklist
- [ ] `/blog/nova-identidade/index.html` criado
- [ ] Título/canonical/OG com domínio carloscostaprev
- [ ] Texto reescrito (não duplicado) com CarlosCostaPrev como protagonista
- [ ] Schema Article + FAQPage + BreadcrumbList
- [ ] og.png da cara nova
- [ ] Link cruzado para portaldobpc.com.br/blog/nova-identidade
- [ ] Card no índice do blog + entrada no sitemap.xml

# SEO & GEO — Portal do BPC

Este arquivo documenta a configuração de SEO e geolocalização aplicada à landing page (`index.html`).

## ✅ Implementado no `<head>` do index.html

### SEO básico
- **Title** focado em palavra-chave principal: `Portal do BPC — BPC/LOAS para idoso e pessoa com deficiência | Irajá/RJ`
- **Meta description** com call-to-action e keywords naturais (153 chars)
- **Meta keywords** (legado, mas alguns crawlers ainda leem): BPC, LOAS, autismo BPC, Síndrome de Down BPC, etc.
- **Canonical URL**: `https://www.portaldobpc.com.br/`
- **Robots**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- **Lang**: `pt-BR`
- **Theme color**: `#c4673a` (terracota — aparece em browsers mobile)

### GEO targeting (Irajá/RJ)
Mesma estratégia do carloscostaprev — diz pro Google que você é **negócio local** de Irajá/RJ:
```
geo.region:    BR-RJ
geo.placename: Irajá, Rio de Janeiro, Brasil
geo.position:  -22.8383;-43.3202
ICBM:          -22.8383, -43.3202
```

### Open Graph + Twitter Cards
Cobertura para compartilhamento em redes sociais (Facebook, LinkedIn, WhatsApp, Twitter).

> ⚠️ **Pendente**: você precisa criar `assets/og-cover.jpg` (1200x630px) — imagem de capa que aparece quando alguém compartilha o link. Sugestão: logo + tagline "BPC/LOAS — Seu portal amigo" em fundo terracota.

### Structured Data (JSON-LD) — o que aparece nos resultados ricos do Google

Foram declarados:

1. **Organization + LegalService + LocalBusiness** — diz pro Google que vocês são uma **empresa local de serviços jurídicos em Irajá**. Endereço, telefone, horário, redes sociais. Isso ajuda a aparecer no Google Maps e no painel lateral de informações.

2. **WebSite + SearchAction** — habilita a caixa de busca dentro do resultado do Google (quando aplicável).

3. **FAQPage** — as 6 perguntas frequentes da seção FAQ foram declaradas como FAQ schema. Google pode exibir essas perguntas direto nos resultados de busca como rich snippets.

4. **BreadcrumbList** — navegação estruturada (será expandida nas páginas de patologia).

## 📁 Arquivos auxiliares

- **`robots.txt`** — permite tudo, aponta pro sitemap
- **`sitemap.xml`** — lista a homepage, simulador, blog, BPC idoso/PcD, e as 20 patologias

Ambos devem ser colocados na **raiz do domínio** (https://www.portaldobpc.com.br/robots.txt e .../sitemap.xml).

## 🎯 Estratégia de palavras-chave

| Volume | Termo | Onde aparece |
|---|---|---|
| Alto | **BPC LOAS** | Title, h1, lead, FAQ |
| Alto | **doenças que dão direito ao BPC** | Section title + 20 cards |
| Alto | **BPC idoso 65 anos** | Especialidades card |
| Alto | **BPC deficiente** | Especialidades card |
| Médio | **simulador BPC** | Hero CTA + página dedicada |
| Médio | **BPC autismo / Down / câncer / Alzheimer** | Páginas de patologia dedicadas |
| Médio | **INSS negou BPC** | Blog + recurso section em cada patologia |
| Local | **advogado BPC Irajá** | GEO meta + LocalBusiness schema |

## 🔧 Próximos passos para SEO

Coisas que **só funcionam depois que o site for de fato deployado** num domínio real:

1. **Verificar no Google Search Console** (https://search.google.com/search-console) — submeter o sitemap.xml e monitorar indexação
2. **Verificar no Google Business Profile** (Google Meu Negócio) — cadastrar Portal do BPC como negócio local de Irajá/RJ. Isso ativa o painel no Google Maps.
3. **Bing Webmaster Tools** — submeter sitemap também
4. **Page Speed**: testar no PageSpeed Insights. Otimizações futuras:
   - Lazy-load das imagens
   - Code splitting do React (hoje é Babel inline, ótimo pra protótipo, ruim pra produção)
   - Minificar CSS/JS
   - Preload de fontes Google Fonts
5. **Conteúdo recorrente**: blog com 1-2 posts por semana sobre BPC/LOAS é o motor de longo prazo

## 🇧🇷 GEO específico para Brasil

- Domínio `.com.br` já passa sinal Brasil-first pro Google
- `lang="pt-BR"` no `<html>` confirma idioma
- `geo.region: BR-RJ` confirma estado
- Endereço em Schema confirma cidade
- `<meta og:locale="pt_BR">` confirma redes sociais

Combinação garante que vocês aparecem para buscas regionais brasileiras antes de competir globalmente.

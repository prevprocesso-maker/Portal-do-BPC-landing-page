# Integração SEO/GEO — CarlosCostaPrev × Portal do BPC

Pacote completo para fechar o **ecossistema digital** entre os dois sites (`carloscostaprev.com.br` e `portaldobpc.com.br`). Aplique em **AMBOS** os projetos — cada bloco mostra exatamente o que vai em cada lado. O objetivo é que o Google entenda que as duas marcas pertencem à **mesma entidade jurídica**, somando autoridade e acelerando o ranqueamento orgânico e local (GEO).

---

## 🎯 Resultado esperado

- Google entende **CarlosCostaPrev + Portal do BPC = mesma empresa** (via `sameAs`, `legalName`, `alternateName`)
- Buscas locais (Irajá/RJ) encontram **os dois sites** com mesma autoridade
- Links cruzados no footer reforçam ao usuário **e** ao crawler
- Resultados em ranqueamento orgânico **e** patrocinado (Google Ads quality score)

---

## 📋 PARTE 1 — Card "FAZ PARTE DO ESCRITÓRIO" no footer

### Onde colocar
No footer de **AMBOS** os sites, logo abaixo do logo + descrição da coluna 1.

### HTML/JSX — para `portaldobpc.com.br` (aponta para CarlosCostaPrev)

```jsx
<p className="footer-desc" style={{
  marginTop: 16,
  paddingTop: 16,
  borderTop: '1px solid rgba(255,255,255,0.08)'
}}>
  <span style={{
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--terra-400, #d99466)',
    display: 'block',
    marginBottom: 6
  }}>
    Faz parte do escritório
  </span>
  <a href="https://www.carloscostaprev.com.br" target="_blank" rel="noopener noreferrer"
     style={{
       display: 'inline-flex',
       alignItems: 'center',
       gap: 6,
       color: '#f5ede0',
       fontWeight: 600,
       textDecoration: 'none'
     }}>
    CarlosCostaPrev — Previdência geral <span aria-hidden="true">↗</span>
  </a>
  <span style={{ display: 'block', marginTop: 4, fontSize: 13, opacity: 0.7 }}>
    Aposentadorias, pensões, auxílios e BPC
  </span>
</p>
```

### HTML/JSX — para `carloscostaprev.com.br` (aponta para Portal do BPC)

```jsx
<p className="footer-desc" style={{
  marginTop: 16,
  paddingTop: 16,
  borderTop: '1px solid rgba(255,255,255,0.08)'
}}>
  <span style={{
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--terra-400, #d99466)',
    display: 'block',
    marginBottom: 6
  }}>
    Especialização em BPC/LOAS
  </span>
  <a href="https://www.portaldobpc.com.br" target="_blank" rel="noopener noreferrer"
     style={{
       display: 'inline-flex',
       alignItems: 'center',
       gap: 6,
       color: '#f5ede0',
       fontWeight: 600,
       textDecoration: 'none'
     }}>
    Portal do BPC — Idoso, deficiente e estrangeiro <span aria-hidden="true">↗</span>
  </a>
  <span style={{ display: 'block', marginTop: 4, fontSize: 13, opacity: 0.7 }}>
    Atendimento humano para o Benefício Assistencial
  </span>
</p>
```

---

## 📋 PARTE 2 — Schema.org JSON-LD (o coração da integração)

### Onde colocar
Dentro de `<head>`, em `<script type="application/ld+json">`. Se já existe um JSON-LD principal, **complemente** as propriedades — não duplique o objeto.

### JSON-LD — para `portaldobpc.com.br`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LegalService", "LocalBusiness"],
      "@id": "https://www.portaldobpc.com.br/#org",
      "name": "Portal do BPC",
      "legalName": "CarlosCostaPrev — Escritório de Advocacia Previdenciária",
      "alternateName": ["Portal do BPC", "CarlosCostaPrev", "CarlosCostaPrev Portal do BPC"],
      "url": "https://www.portaldobpc.com.br/",
      "logo": "https://www.portaldobpc.com.br/assets/logo-color.svg",
      "image": "https://www.portaldobpc.com.br/assets/og-cover.png",
      "description": "Portal de informação e atendimento sobre o BPC/LOAS para idosos a partir de 65 anos e pessoas com deficiência.",
      "telephone": "+55-21-96423-8080",
      "priceRange": "Análise gratuita",
      "areaServed": { "@type": "Country", "name": "Brasil" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Praça Nossa Sra. da Apresentação, 223 — Sala 206",
        "addressLocality": "Irajá",
        "addressRegion": "RJ",
        "postalCode": "21231-230",
        "addressCountry": "BR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": -22.8383, "longitude": -43.3202 },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00", "closes": "18:00"
      },
      "sameAs": [
        "https://www.carloscostaprev.com.br",
        "https://www.instagram.com/portaldobpc",
        "https://www.facebook.com/portaldobpc"
      ]
    }
  ]
}
</script>
```

### JSON-LD — para `carloscostaprev.com.br`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LegalService", "LocalBusiness"],
      "@id": "https://www.carloscostaprev.com.br/#org",
      "name": "CarlosCostaPrev",
      "legalName": "CarlosCostaPrev — Escritório de Advocacia Previdenciária",
      "alternateName": ["CarlosCostaPrev", "Portal do BPC", "CarlosCostaPrev Portal do BPC"],
      "url": "https://www.carloscostaprev.com.br/",
      "logo": "https://www.carloscostaprev.com.br/assets/logo.svg",
      "image": "https://www.carloscostaprev.com.br/assets/og-cover.png",
      "description": "Escritório de advocacia previdenciária no Rio de Janeiro. Aposentadorias, pensões, auxílios do INSS e BPC/LOAS (via portaldobpc.com.br).",
      "telephone": "+55-21-96423-8080",
      "priceRange": "Análise gratuita",
      "areaServed": { "@type": "Country", "name": "Brasil" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Praça Nossa Sra. da Apresentação, 223 — Sala 206",
        "addressLocality": "Irajá",
        "addressRegion": "RJ",
        "postalCode": "21231-230",
        "addressCountry": "BR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": -22.8383, "longitude": -43.3202 },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00", "closes": "18:00"
      },
      "sameAs": [
        "https://www.portaldobpc.com.br",
        "https://www.instagram.com/carloscostaprev",
        "https://www.facebook.com/carloscostaprev"
      ]
    }
  ]
}
</script>
```

> **Por que `sameAs` + `legalName` + `alternateName` juntos:** o Google usa essa combinação para entender que duas URLs distintas representam **a mesma entidade**. Sem isso, ele trata as marcas como concorrentes.

---

## 📋 PARTE 3 — Meta tags geo + Open Graph

### Para `portaldobpc.com.br` (já está aplicado se você já usou)

```html
<!-- Geo targeting -->
<meta name="geo.region" content="BR-RJ" />
<meta name="geo.placename" content="Irajá, Rio de Janeiro, Brasil" />
<meta name="geo.position" content="-22.8383;-43.3202" />
<meta name="ICBM" content="-22.8383, -43.3202" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Portal do BPC" />
<meta property="og:url" content="https://www.portaldobpc.com.br/" />
```

### Para `carloscostaprev.com.br`

```html
<!-- Geo targeting (mesmos valores — mesma localização física) -->
<meta name="geo.region" content="BR-RJ" />
<meta name="geo.placename" content="Irajá, Rio de Janeiro, Brasil" />
<meta name="geo.position" content="-22.8383;-43.3202" />
<meta name="ICBM" content="-22.8383, -43.3202" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="CarlosCostaPrev" />
<meta property="og:url" content="https://www.carloscostaprev.com.br/" />
<meta property="og:description" content="Escritório especializado em previdência social no Rio de Janeiro. Aposentadorias, pensões, INSS e BPC/LOAS (via Portal do BPC). Atendimento humano em Irajá/RJ." />

<!-- Meta description que menciona o portal irmão -->
<meta name="description" content="CarlosCostaPrev — Especialistas em previdência administrativa em Irajá/RJ. Aposentadorias, pensões, auxílios do INSS e BPC/LOAS via portal especializado portaldobpc.com.br. WhatsApp (21) 96423-8080." />
```

---

## 📋 PARTE 4 — Páginas legais (LGPD)

### Privacidade — trecho do "Controlador dos dados" (use em AMBOS)

```html
<p>O controlador dos dados pessoais coletados neste site é:</p>
<p>
  <strong>CarlosCostaPrev — Escritório de Advocacia Previdenciária</strong>
  (operador também da marca <em>Portal do BPC</em> — portaldobpc.com.br)<br/>
  Endereço: Praça Nossa Sra. da Apresentação, 223 — Sala 206,
  Irajá, Rio de Janeiro/RJ — CEP 21231-230<br/>
  WhatsApp: (21) 96423-8080<br/>
  E-mail: contato@[DOMINIO_DO_SITE_ATUAL].com.br
</p>
```

### Termos de Uso — item 1 "Sobre o serviço"

```html
<h2>1. Sobre o [NOME_DA_MARCA]</h2>
<p>
  O [NOME_DA_MARCA] é uma marca operada por <strong>CarlosCostaPrev —
  Escritório de Advocacia Previdenciária</strong>, com sede em
  Praça Nossa Sra. da Apresentação, 223 — Sala 206, Irajá, Rio de Janeiro/RJ.
  [Continuar texto sobre o serviço...]
</p>
```

---

## 📋 PARTE 5 — Página de "ponte" entre os domínios

### Em `carloscostaprev.com.br` — criar rota `/bpc-loas`

Estrutura mínima:

```jsx
<section className="page-bpc-loas">
  <header>
    <h1>BPC/LOAS — Conheça nossa especialização</h1>
    <p>O Benefício de Prestação Continuada é um direito complexo,
       cheio de detalhes técnicos. Por isso criamos um portal exclusivo
       sobre o tema.</p>
  </header>

  <div className="grupos-atendidos">
    {/* 5 cards: Idoso 65+ · Deficiente · Autismo · Pente fino · Estrangeiro */}
  </div>

  <a href="https://www.portaldobpc.com.br" className="cta-portal">
    Acessar o Portal do BPC ↗
  </a>
</section>
```

### Em `portaldobpc.com.br` — criar rota `/previdencia` (opcional, espelho)

Mesma estrutura, mas focado em previdência geral, apontando para CarlosCostaPrev.

---

## 📋 PARTE 6 — Sitemap.xml — incluir página de ponte

### Em `carloscostaprev.com.br/sitemap.xml`

```xml
<url>
  <loc>https://www.carloscostaprev.com.br/bpc-loas</loc>
  <changefreq>monthly</changefreq>
  <priority>0.85</priority>
</url>
```

### Em `portaldobpc.com.br/sitemap.xml` (se criar a página espelho)

```xml
<url>
  <loc>https://www.portaldobpc.com.br/previdencia</loc>
  <changefreq>monthly</changefreq>
  <priority>0.85</priority>
</url>
```

---

## 📋 PARTE 7 — NAP padronizado (Name, Address, Phone)

Garantir que **AMBOS** os sites mostrem os contatos **idênticos**:

| Campo | Valor exato |
|---|---|
| Nome | `CarlosCostaPrev · Portal do BPC` (no Google Meu Negócio) |
| Endereço | `Praça Nossa Sra. da Apresentação, 223 — Sala 206, Irajá, Rio de Janeiro/RJ, CEP 21231-230` |
| Telefone | `(21) 96423-8080` |
| WhatsApp | `https://wa.me/5521964238080` |

> Qualquer variação (sigla "Sra." em vez de "Senhora", vírgulas diferentes, etc.) confunde o Google. **Copia e cola idêntico.**

---

## ✅ Checklist final de implementação

### `carloscostaprev.com.br`
- [ ] Card "ESPECIALIZAÇÃO EM BPC/LOAS" no footer apontando pro Portal do BPC
- [ ] JSON-LD com `sameAs`, `legalName`, `alternateName` (Parte 2)
- [ ] Meta tags geo (Parte 3)
- [ ] OG description mencionando Portal do BPC
- [ ] Páginas legais atualizadas (LGPD com texto da operadora)
- [ ] Página `/bpc-loas` (página de ponte)
- [ ] `sitemap.xml` incluindo `/bpc-loas`
- [ ] NAP exato

### `portaldobpc.com.br` (verificar — provavelmente já está feito)
- [ ] Card "FAZ PARTE DO ESCRITÓRIO" no footer apontando pro CarlosCostaPrev
- [ ] JSON-LD com `sameAs`, `legalName`, `alternateName`
- [ ] Meta tags geo
- [ ] Páginas legais com nome da operadora
- [ ] NAP exato

### Pós-deploy (Search Console)
- [ ] Verificar ambos domínios no Google Search Console
- [ ] Submeter sitemap de ambos
- [ ] Aguardar 7-14 dias para Google reprocessar a relação entre os domínios

---

## 🎯 Critério de aceite

- Google "Rich Results Test" (https://search.google.com/test/rich-results) valida o JSON-LD sem erros em ambos os sites
- A propriedade `sameAs` aparece corretamente nos dois domínios apontando um para o outro
- No "Google Trends" ou "Search Console", após 14 dias, as duas marcas começam a aparecer associadas
- Buscas como "CarlosCostaPrev BPC" mostram **ambos os sites** nos resultados (não competem)
- Em mapa do Google, o perfil Business "CarlosCostaPrev · Portal do BPC" aparece para buscas relacionadas a previdência **e** a BPC em Irajá/RJ

---

## 📞 Substituições por projeto

Antes de aplicar, **revise estas variáveis** no código:

| Placeholder | Substituir por |
|---|---|
| `[NOME_DA_MARCA]` | `CarlosCostaPrev` ou `Portal do BPC` (conforme o site) |
| `[DOMINIO_DO_SITE_ATUAL]` | `carloscostaprev` ou `portaldobpc` |
| `/assets/logo.svg` | Caminho real do logo no projeto |
| `/assets/og-cover.png` | Caminho real da imagem de compartilhamento |
| `instagram.com/...` | Handles reais |
| `facebook.com/...` | Handles reais |
| Coordenadas `geo` | Confirmar latitude/longitude do endereço real |

Tempo estimado total: **30 a 60 minutos** por site.

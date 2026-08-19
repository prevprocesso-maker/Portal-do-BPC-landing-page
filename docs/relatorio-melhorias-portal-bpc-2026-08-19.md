# Relatório de melhorias — Portal do BPC

**Data:** 19 de agosto de 2026  
**Repositório:** `prevprocesso-maker/Portal-do-BPC-landing-page`  
**Escopo:** SEO técnico, GEO/AEO, rastreamento, consentimento, performance, acessibilidade, segurança e consistência estrutural.

## Resumo executivo

O Portal do BPC foi modernizado de forma progressiva, preservando a arquitetura estática existente e os conteúdos publicados. A intervenção alcançou **81 páginas HTML**, das quais **77 são indexáveis**, e normalizou o sitemap para **77 URLs limpas**, compatíveis com `cleanUrls: true` no Vercel.

A homepage passou a entregar um fallback estático acima da dobra com poster WebP, H2 de apoio e CTA WhatsApp enquanto o React termina de carregar. O vídeo hero foi convertido para carregamento ocioso em desktop, as fontes passaram a ser locais e subsetadas, e o painel de desenvolvimento `tweaks.js`/`tweaks.css`, que não era usado por páginas públicas, foi removido do caminho de produção.

## Principais mudanças aplicadas

| Área | Implementação | Resultado verificável |
|---|---|---|
| SEO técnico | Metadados, viewport, canonicals, JSON-LD, `og:*`, Twitter Cards e coerência editorial | 77 páginas indexáveis validadas; cada uma possui title, description, canonical, H1 único e JSON-LD |
| Canonicals | Normalização para URLs limpas sem `.html` | Sitemap e canonicals com 77 URLs sem `.html` |
| GEO/AEO | Endereço visível em Irajá, referências locais, FAQ, dados estruturados e `llms.txt` | Nenhum dado profissional, CNPJ ou OAB foi inventado ou inserido sem comprovação |
| Robots/LLMs | `robots.txt`, `llms.txt` e `sitemap.xml` revisados | `llms.txt` contém H1 e links; robots mantém sitemap e políticas de rastreamento |
| GA4/LGPD | `G-6RVLVTFRGT` centralizado em `analytics-consent.js`, com carregamento após consentimento | Não há tag direta duplicada de GA4 nas páginas HTML |
| GTM | Não instalado no Portal do BPC | Nenhum ID de container foi fornecido para este domínio; o GTM do CarlosCostaPrev não foi copiado para evitar mistura de propriedades |
| Fontes | Google Fonts removido do caminho crítico; fontes locais subsetadas em WOFF2 | Peso total das fontes locais reduzido para aproximadamente 255 KB |
| Hero | Foto convertida para WebP e vídeo adiado | `dr-carlos-costa.webp`: 38.012 bytes, contra 76.895 bytes do JPG original |
| Acessibilidade | Roles ARIA, contraste, foco, links de política, headings, reduced motion e formulário | Lighthouse final: acessibilidade **100** |
| Segurança | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, Referrer-Policy e rel seguro | Validação de links externos e sintaxe aprovada |
| Componentes | Menu móvel, CTA WhatsApp, social links, estados de erro e carregamento | Componentes globais preservados e atualizados sem reescrever a aplicação |

## Desempenho medido localmente

A medição foi feita contra um servidor estático local usando Lighthouse Mobile. Portanto, ela é uma referência comparável para o checkout atual, não substitui dados reais de usuários no CrUX nem a medição do domínio publicado. O Lighthouse apresentou variação entre execuções por causa do custo de inicialização do Chromium e do bundle React carregado via CDN.

| Métrica | Rodada final | Interpretação |
|---|---:|---|
| Performance | 73 | Bom avanço, mas ainda há espaço para otimização do bootstrap React e CSS crítico |
| Acessibilidade | 100 | Todos os audits Lighthouse considerados passaram na rodada final |
| SEO | 100 | Auditoria Lighthouse passou na rodada final |
| LCP | 5,4 s | Ainda acima da meta de 2,5 s; o atraso residual é principalmente de renderização do bundle hero/React |
| TBT | 262 ms | Muito abaixo do TBT observado quando scripts de terceiros bloqueavam a thread; a variação entre rodadas exige mediana em medições futuras |
| CLS | 0,000 | Layout visual estável na rodada final |
| FCP | 2,0 s | Primeiro conteúdo aparece antes do LCP completo |

Em três rodadas anteriores, após a inclusão do fallback estático, a mediana foi **78 de performance**, **5,41 s de LCP**, **79 ms de TBT** e **0 de CLS**. A diferença para a rodada final reforça que a medição deve ser acompanhada por várias execuções e, depois do deploy, por dados reais de usuários.

## Configurações e dependências

O repositório não contém `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `vite.config` ou outro manifesto de dependências npm. Consequentemente, não existe uma árvore npm local contra a qual executar `npm outdated` ou `npm audit`. A aplicação usa scripts estáticos e carrega React 18.3.1 e ReactDOM 18.3.1 por `unpkg`, além de recursos do Google somente quando o consentimento analítico é concedido.

A situação não é um erro de versão detectado, mas uma limitação arquitetural: sem lockfile, a origem CDN não é gerenciada por atualização automatizada. A recomendação de médio prazo é empacotar React, ReactDOM e os bundles da aplicação em uma etapa de build com versões fixadas, ou manter as URLs CDN explicitamente versionadas e monitoradas.

## Pendências técnicas honestas

O maior ponto ainda não resolvido é o LCP. O hero já possui poster local, dimensões explícitas, fallback estático e vídeo adiado, mas o Lighthouse ainda atribui o maior elemento ao bloco renderizado pelo React e registra atraso de pintura. A próxima otimização de alto impacto seria separar o bundle inicial de `screens.js`/`blog-posts.js`, reduzir CSS bloqueante e manter somente o caminho da homepage no bootstrap inicial.

O GA4 foi configurado com consentimento e sem duplicação. A instalação de GTM não foi presumida porque o Portal do BPC não recebeu um ID de container próprio. Para adicionar GTM com segurança, é necessário informar o ID do container destinado a este domínio e definir no próprio container a relação com `G-6RVLVTFRGT`.

## Validações executadas

| Verificação | Resultado |
|---|---|
| HTML, assets, titles, descriptions, canonicals, H1 e JSON-LD | Aprovado |
| Sitemap XML e canonicals | Aprovado; 77 URLs limpas |
| Robots e llms | Aprovado |
| Referências locais de imagens, scripts e stylesheets | Aprovado |
| Links `target="_blank"` | Aprovado com `noopener noreferrer` |
| Sintaxe `components.js`, `mobile-nav.js`, `analytics-consent.js`, `form-validation.js`, `video-defer.js` e `sw.js` | Aprovado |
| `git diff --check` | Aprovado |
| Lighthouse Mobile — acessibilidade e SEO | 100 / 100 na rodada final |

## Conclusão

As correções estruturais do CarlosCostaPrev foram adaptadas ao Portal do BPC sem copiar identificadores de analytics, dados profissionais ou qualificações não confirmadas. O portal agora tem uma base mais sólida para indexação, compreensão local por mecanismos de busca e assistentes, consentimento analítico, acessibilidade e carregamento. A recomendação é publicar este conjunto, aguardar dados de campo e tratar o LCP residual em uma segunda etapa de divisão do bundle e CSS crítico.

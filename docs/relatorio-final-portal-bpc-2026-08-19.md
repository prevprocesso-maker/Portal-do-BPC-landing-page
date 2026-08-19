# Relatório final — Portal do BPC

**Data:** 19 de agosto de 2026  
**Repositório:** [prevprocesso-maker/Portal-do-BPC-landing-page](https://github.com/prevprocesso-maker/Portal-do-BPC-landing-page)  
**Domínio de produção:** [portaldobpc.com.br](https://www.portaldobpc.com.br/)  
**Responsável técnico da entrega:** Manus AI

## Síntese executiva

Foi concluída uma rodada ampla de modernização do Portal do BPC, preservando a arquitetura estática existente. O pacote combina conformidade de linguagem comercial, avisos LGPD, SEO local de Irajá, dados institucionais visíveis, política híbrida para robôs, CTAs contextualizados por patologia, silo reverso para o domínio CarlosCostaPrev e normalização AEO da FAQ principal.

A validação local terminou sem erros: 81 páginas HTML foram analisadas, 77 são indexáveis, as 77 URLs do sitemap foram reconhecidas e nenhum JSON-LD indexável ficou ausente. Os scripts JavaScript também passaram pelo `node --check`, e `git diff --check` não encontrou problemas de whitespace.

> **Importante:** as alterações de FAQ foram editoriais e estruturais. Elas preservam o núcleo do texto já existente e condensam cada resposta em um parágrafo direto de 40–50 palavras; não constituem uma nova auditoria jurídica das leis, portarias, estatísticas ou valores citados no conteúdo original.

## Alterações aplicadas

| Área | Implementação | Resultado verificado |
|---|---|---|
| Conformidade OAB | Substituição de chamadas privadas com “análise gratuita”, “consulta gratuita” e “atendimento gratuito” por “análise técnica”, “análise de viabilidade técnica” ou “orientação inicial”. | Nenhuma ocorrência residual nas extensões HTML, JS e TXT auditadas. |
| LGPD | Aviso visível nas CTAs de patologia e texto atualizado no formulário React, indicando finalidade de análise técnica e conformidade com a Lei 13.709/2018. | 60 CTAs de patologia com aviso; formulário React atualizado. |
| Silo reverso | Link contextual para `carloscostaprev.com.br` com a âncora “especialista previdenciário em Irajá”. | 60 páginas de patologia com link institucional. |
| WhatsApp geolocalizado | Mensagens URL-encoded com Irajá e o tema específico da página. | 60 CTAs localizadas confirmadas. |
| Institucional | CNPJ `15.648.800/0001-80` e responsabilidade judicial de Alexandre Del Rio Furtado, OAB/RJ 270.465, publicados em áreas visíveis. | Todas as páginas públicas/indexáveis cobertas; somente o template e a página auxiliar noindex ficaram fora. |
| Terminologia | Carlos Costa permanece identificado como “Especialista Previdenciário”; a advocacia foi atribuída somente à responsabilidade judicial confirmada. | Auditoria residual sem associação indevida detectada. |
| Robôs e IA | Política híbrida: `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot` e `Bytespider` bloqueados; `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot` e `Claude-SearchBot` permitidos. | `robots.txt` contém `Content-Signal` e sitemap oficial. |
| Sitemap | Sitemap limpo, sem `.html`, sem `urls-para-indexar` e sem referências a redirecionamento 308. | 77 URLs. |
| AEO/FAQ | 48 respostas principais normalizadas em parágrafos diretos de 40–50 palavras. O bloco `FAQPage` da homepage foi sincronizado com os mesmos 48 itens. | 48 pares no componente e 48 perguntas no JSON-LD. |
| Atualização editorial | `dateModified` de 19/08/2026 adicionado ao JSON-LD das 60 páginas de patologia. | 60 páginas confirmadas. |
| CSS/UX | Regras responsivas para `.lgpd-notice`, `.institutional-bridge` e identificação institucional standalone. | CSS aplicado sem alterar a arquitetura estática. |

## Validação técnica

| Verificação | Resultado |
|---|---:|
| `validate_portal_delivery.py` | Passou — 0 erros e 0 avisos |
| Páginas HTML analisadas | 81 |
| Páginas indexáveis | 77 |
| URLs no sitemap | 77 |
| JSON-LD ausente em páginas indexáveis | 0 |
| `node --check components.js` | Passou |
| `node --check screens.js` | Passou |
| `node --check analytics-consent.js` | Passou |
| `node --check mobile-nav.js` | Passou |
| `node --check form-validation.js` | Passou |
| `node --check video-defer.js` | Passou |
| `node --check sw.js` | Passou |
| `git diff --check` | Passou |
| Resíduos comerciais/terminológicos proibidos | 0 ocorrências |

## Commits locais

Os quatro commits abaixo estão presentes localmente na branch `main`:

| Commit | Mensagem |
|---|---|
| `8a66028` | SEO GEO performance and accessibility improvements |
| `3e591fc` | Add verified institutional CNPJ and legal responsibility |
| `8e04073` | Ethical compliance, LGPD notices, silo reverso and localized CTAs |
| `6996240` | Normalize FAQ answers for AEO extraction |

## Publicação no GitHub

A publicação não foi concluída porque o GitHub devolveu HTTP 403 para a credencial atualmente usada pelo Git:

```text
remote: Permission to prevprocesso-maker/Portal-do-BPC-landing-page.git denied to prevprocesso-maker.
fatal: unable to access ...: The requested URL returned error: 403
```

O commit está preservado localmente e a árvore de trabalho está limpa. Para renovar a sessão, execute no ambiente com acesso à conta proprietária:

```bash
gh auth logout -h github.com -u prevprocesso-maker
gh auth login -h github.com -p https -w
gh auth setup-git
cd /home/ubuntu/Portal-do-BPC-landing-page
git push origin main
```

Se a conta correta já estiver autenticada, confirme primeiro com `gh auth status`. Caso a branch `main` esteja protegida, publique uma branch e abra um Pull Request em vez de forçar o push direto.

## Pendências que dependem do proprietário

A substituição de imagens decorativas por fotografias reais do escritório continua aguardando os arquivos fornecidos pelo proprietário. A verificação do Bing Webmaster Tools continua aguardando o valor `msvalidate.01`, e a configuração do Search Console depende do acesso à conta Google responsável pela propriedade. Também é recomendável uma revisão editorial/jurídica humana das citações legais, valores e estatísticas preexistentes antes da publicação definitiva, pois a normalização AEO não substituiu uma checagem de fontes.

## Referências

[1]: https://github.com/prevprocesso-maker/Portal-do-BPC-landing-page "Repositório Portal do BPC"
[2]: https://www.portaldobpc.com.br/ "Portal do BPC — domínio de produção"
[3]: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt "Google Search Central — robots.txt"
[4]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Google Search Central — dados estruturados"

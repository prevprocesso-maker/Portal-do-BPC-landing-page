# Resumo executivo — SEO, GEO e publicação do Portal do BPC

**Data:** 19 de agosto de 2026  
**Repositório:** [prevprocesso-maker/Portal-do-BPC-landing-page](https://github.com/prevprocesso-maker/Portal-do-BPC-landing-page)

## 1. Situação executiva

O Portal do BPC recebeu uma rodada ampla de modernização técnica e editorial. A base atual contém **81 páginas HTML**, sendo **77 indexáveis**, com **77 URLs no sitemap**. A validação estrutural final retornou zero erros e zero warnings; a homepage também alcançou **SEO 100** e **acessibilidade 100** na rodada final do Lighthouse Mobile.

As alterações institucionais mais recentes estão preservadas localmente no commit `3e591fc6425f9d006ec8022e5cd74860d412dc43`, acompanhado do commit anterior `8a6602841f88043eb73aacfd77c2b16b5d5f941`. O remote ainda está no commit `59877972d5f7498b044679118c4b28c4bf74b569`, porque a tentativa de push recebeu HTTP 403.

## 2. Como resolver o HTTP 403

O diagnóstico não é de repositório inexistente nem de branch incorreta. A conta autenticada é `prevprocesso-maker`, o remote aponta para `https://github.com/prevprocesso-maker/Portal-do-BPC-landing-page.git`, e a API informa permissão de push. O problema mais provável é que o Git esteja usando uma credencial HTTPS diferente, antiga, expirada, sem permissão de escrita efetiva ou não correspondente à identidade usada pelo GitHub CLI.

A correção recomendada é renovar a autenticação sem colocar token na URL do remote:

```bash
cd /home/ubuntu/Portal-do-BPC-landing-page

gh auth status
gh api user --jq '.login'
git remote -v

gh auth logout -h github.com -u prevprocesso-maker
gh auth login -h github.com -p https -w
gh auth setup-git
git push origin main
```

Se a conta utilizar um token fine-grained, ele deve ser criado para o proprietário `prevprocesso-maker`, limitado ao repositório `Portal-do-BPC-landing-page`, com a permissão de repositório **Contents: Read and write**. O GitHub recomenda tokens fine-grained quando compatíveis, mas informa que o token não pode ampliar as permissões do usuário e que o acesso é limitado pelo proprietário, repositórios selecionados e permissões concedidas [1].

Se ainda houver 403, verificar a proteção da branch `main`:

```bash
gh api repos/prevprocesso-maker/Portal-do-BPC-landing-page/branches/main/protection
```

Se a branch estiver protegida, o caminho seguro é enviar uma branch nova e abrir um Pull Request:

```bash
git switch -c institutional-data

git push -u origin institutional-data
gh pr create --base main --head institutional-data --title "Add verified institutional CNPJ and legal responsibility"
```

Outra alternativa é mudar para SSH após autenticar uma chave no perfil pessoal, mas não se deve usar uma chave configurada como deploy key de outro repositório. O GitHub documenta que uma deploy key vinculada a outro repositório pode resultar em “permission to repository denied” [2]. Nunca se deve colar um token no remote, em mensagens ou em arquivos versionados; tokens devem ser tratados como senhas [1].

## 3. Próximas páginas para o padrão institucional

A auditoria local encontrou oito páginas ainda sem o CNPJ no HTML. Sete são páginas públicas prioritárias e uma é um artefato técnico que não deve receber reforço de SEO sem revisão de indexação.

| Ordem | Página | Motivo da prioridade | Ação recomendada |
|---:|---|---|---|
| 1 | [`patologias.html`](https://www.portaldobpc.com.br/patologias) | Hub que distribui autoridade para as páginas de doenças | Adicionar NAP, CNPJ/OAB, responsabilidade técnica, JSON-LD de coleção e CTA contextual |
| 2 | [`simulador-v2.html`](https://www.portaldobpc.com.br/simulador-v2) | Principal ponto de conversão e geração de lead | Adicionar identidade institucional, consentimento, eventos de conversão e texto local visível |
| 3 | [`checklist-pericia.html`](https://www.portaldobpc.com.br/checklist-pericia) | Intenção alta de preparação para o INSS | Reforçar autoria, atualização, responsabilidade técnica, FAQ e CTA local |
| 4 | [`blog/recurso-inss/index.html`](https://www.portaldobpc.com.br/blog/recurso-inss) | Usuário com negativa tem intenção imediata de ajuda | Adicionar autoria, CNPJ/OAB, links para perícia e orientação administrativa/judicial delimitada |
| 5 | [`blog/cadunico/index.html`](https://www.portaldobpc.com.br/blog/cadunico) | Tema central para elegibilidade e atualização do BPC | Reforçar GEO, data de atualização, fonte institucional e links internos |
| 6 | [`blog/pericia-medica/index.html`](https://www.portaldobpc.com.br/blog/pericia-medica) | Conteúdo diretamente ligado à decisão do benefício | Padronizar autoria, schema de artigo, FAQ e CTA contextual |
| 7 | [`blog/portaria-inss-1962-2026/index.html`](https://www.portaldobpc.com.br/blog/portaria-inss-1962-2026) | Conteúdo regulatório sensível e sujeito a atualização | Revisar fonte, `dateModified`, autoria e delimitação de informação jurídica |
| 8 | [`urls-para-indexar.html`](https://www.portaldobpc.com.br/urls-para-indexar) | Página técnica/listagem, não uma landing page de usuário | Não priorizar SEO; avaliar `noindex`, remoção do sitemap ou exclusão do deploy público |

A próxima rodada deve começar pelas três primeiras páginas, porque elas combinam maior importância estrutural, conversão e intenção de busca. Depois, a sequência ideal é recurso, CadÚnico e perícia médica; o artigo regulatório deve receber revisão editorial antes de qualquer expansão semântica.

## 4. Otimizações de SEO aplicadas

| Pilar | Entrega |
|---|---|
| Metadados | Titles, descriptions, Open Graph, Twitter Cards, autor, idioma, viewport e referências locais normalizados |
| Indexação | Canonicals e sitemap normalizados para URLs finais limpas, sem `.html` desnecessário |
| Arquitetura | 77 URLs indexáveis, hubs de patologias, guias, simulador, FAQ e blog conectados por links internos |
| Dados estruturados | JSON-LD de Organization/LocalBusiness, WebSite, WebPage, Service, HowTo, FAQPage, ItemList e páginas médicas |
| Qualidade do schema | Dois JSON-LD quebrados em `tdah.html` e `dores-cronicas.html` corrigidos; ratings e reviews não auditáveis removidos |
| Semântica | Hierarquia de headings, HTML semântico, alt text, foco acessível e rel seguro para links externos |
| Conteúdo | Carlos Costa mantido como Especialista Previdenciário; atuação judicial separada e atribuída ao advogado parceiro identificado |
| Segurança | Cabeçalhos de segurança, consentimento antes do GA4, limpeza de scripts de desenvolvimento e links externos seguros |
| Performance | Fontes locais WOFF2 subsetadas, poster WebP, vídeo hero adiado, fallback acima da dobra e remoção de recursos sem uso |

## 5. Otimizações de GEO aplicadas

O portal passou a apresentar sinais locais consistentes e visíveis, sem depender de conteúdo oculto. A homepage e páginas institucionais contextualizam a presença na **Praça Nossa Senhora da Apresentação, 223, Sala 206, Irajá, Rio de Janeiro/RJ, CEP 21231-230**, além de referências à Avenida Monsenhor Félix, Praça de Irajá, Metrô de Irajá e rede de BRT.

Os metadados locais incluem `geo.region`, `geo.placename`, `geo.position` e `ICBM`, enquanto o JSON-LD possui `PostalAddress`, `GeoCoordinates`, telefone, área atendida, horário e links de entidade. O `llms.txt` resume a atuação em BPC/LOAS, a presença física e a delimitação entre Especialista Previdenciário e advogado responsável por atos judiciais.

O NAP — nome, endereço e telefone — foi alinhado entre rodapés, dados estruturados, conteúdo institucional, sitemap e arquivos de orientação para IA. O CNPJ `15.648.800/0001-80` e a OAB/RJ `270.465` agora aparecem de modo visível e estruturado em 72 páginas com bloco institucional.

Não foram inseridas avaliações fictícias, dados ocultos, coordenadas novas sem validação ou qualificações profissionais não confirmadas. O próximo ganho de GEO depende principalmente da consistência do Perfil da Empresa no Google, Bing Places, redes sociais, avaliações reais e verificação externa da entidade.

## 6. Próxima decisão recomendada

A recomendação é **corrigir primeiro a credencial de publicação**, sem alterar o commit local já validado. Depois do push, aplicar o padrão institucional nas três páginas prioritárias — `patologias.html`, `simulador-v2.html` e `checklist-pericia.html` — e executar uma nova validação de sitemap, schema, links, consentimento e Lighthouse antes de expandir para os artigos.

## Referências

[1]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens "GitHub Docs — Managing your personal access tokens"

[2]: https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-to-userrepo-denied-to-userother-repo "GitHub Docs — Error: Permission to user/repo denied to user/other-repo"

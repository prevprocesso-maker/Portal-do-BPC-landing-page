# Plano de crescimento orgânico — Portal do BPC

**Data:** 19 de agosto de 2026  
**Domínio:** https://www.portaldobpc.com.br/  
**Escopo:** link building ético, conteúdo para “BPC LOAS 2026”, Google Search Console, Bing Webmaster Tools e visibilidade em respostas de IA.

## Diagnóstico de partida

A última verificação pública confirmou que a infraestrutura está preparada para indexação: a homepage, o `robots.txt` e o `sitemap.xml` respondem HTTP 200; o sitemap possui 77 URLs sem `.html`; e a homepage contém 48 perguntas no bloco `FAQPage`. Em um teste manual, o domínio apareceu no primeiro resultado orgânico do Google para a busca exata pelo próprio domínio, mas não apareceu entre os principais resultados observados para a busca genérica “BPC LOAS 2026”. Isso indica boa descoberta de marca, porém autoridade temática ainda insuficiente para termos amplos.

O Google recomenda conteúdo útil e confiável para pessoas, termos de busca em locais proeminentes, links rastreáveis e divulgação do site em comunidades relevantes [1]. Essas recomendações não garantem indexação ou posições, mas dão a direção correta para aumentar a cobertura temática sem criar sinais artificiais.

## Estratégia de conteúdo para “BPC LOAS 2026”

A homepage pode funcionar como página pilar, mas deve responder diretamente à intenção ampla e encaminhar o usuário para páginas especializadas. O portal já possui uma base forte: 60 páginas de patologias, guias de perícia, checklist, simulador, páginas sobre idoso e deficiência, recurso e CadÚnico. O próximo passo é organizar essa base em clusters com uma página central e poucas páginas de apoio realmente distintas.

| Cluster | Página pilar sugerida | Conteúdos de apoio prioritários | Intenção principal |
|---|---|---|---|
| Regras de 2026 | “BPC/LOAS 2026: quem tem direito, valor, renda e como pedir” | renda per capita, idade mínima, deficiência, acumulação, CadÚnico e calendário | Informacional ampla |
| Pedido e documentos | “Como pedir o BPC pelo Meu INSS: documentos e etapas” | checklist, prova de renda, biometria, prazo, exigência e acompanhamento | Informacional/processual |
| Perícia e avaliação | “Perícia médica e avaliação social do BPC” | laudo, barreiras, avaliação biopsicossocial, preparação e resultado | Informacional de alta intenção |
| Negativa e recurso | “BPC negado: motivos, exigência e recurso administrativo” | recurso, prazo, documentos complementares e quando buscar responsabilidade judicial | Problema/solução |
| Patologias | “Doenças e deficiências relacionadas ao BPC” | 60 páginas existentes, agrupadas por deficiência, transtorno, doença crônica e sequela | Informacional específica |
| Local | “BPC em Irajá e zona norte do Rio: onde iniciar o atendimento” | endereço real, referências locais, Meu INSS, canais oficiais e orientação presencial | Local/navegacional |

Cada página deve ter uma resposta curta logo abaixo do H1, uma seção “o que muda em 2026”, uma seção de documentos, uma seção de fontes oficiais e links para a próxima etapa. A atualização deve informar exatamente o que mudou e a data da revisão; não se deve alterar o ano no título apenas para parecer atual. O Google recomenda que `lastmod` reflita mudanças significativas e verificáveis, como conteúdo, dados estruturados ou links [5].

O portal deve evitar páginas quase idênticas para cada cidade ou variações artificiais de palavra-chave. O Google classifica como doorway abuse a criação de páginas muito semelhantes para regiões ou consultas específicas que apenas conduzem a uma página final [2]. Para Irajá, é preferível uma página local genuína, com endereço real, referências de deslocamento e serviço efetivamente oferecido, em vez de dezenas de páginas de bairros.

## Link building ético

O objetivo não deve ser “comprar autoridade”, mas produzir materiais que organizações legítimas tenham motivo para citar. O primeiro ativo recomendável é um **calendário BPC/LOAS 2026**, com mudanças de regras, fontes, datas de atualização e links para atos oficiais. O segundo é um **guia de documentos da perícia**, com versão para impressão e linguagem acessível. O terceiro é uma **página de metodologia editorial**, informando como o portal seleciona fontes, atualiza valores e diferencia informação previdenciária de responsabilidade judicial.

| Oportunidade | Como executar | Critério de qualidade |
|---|---|---|
| Fontes públicas e entidades locais | Oferecer guias úteis a CRAS, associações de pessoas com deficiência, grupos de idosos, projetos universitários e entidades comunitárias, sem pedir link obrigatório. | O link nasce do valor do material, não de troca artificial. |
| Jornalismo e imprensa local | Distribuir dados próprios e verificáveis sobre dúvidas recorrentes, mudanças de calendário e acesso ao BPC em Irajá/Rio. | Pauta editorial real; não advertorial disfarçado. |
| Universidades e extensão | Criar material educativo com fontes oficiais para cursos de serviço social, direito e saúde, sem atribuir advocacia a Carlos Costa. | Conteúdo pedagógico original e autoria transparente. |
| YouTube e redes próprias | Publicar vídeos que respondam consultas específicas e apontem para a página correspondente, com transcrição e fontes no site. | Consistência entre vídeo, página e afirmações. |
| Citações institucionais | Manter NAP consistente — nome, endereço e telefone — em perfis legítimos, especialmente Google Business Profile e Bing Places. | Dados verdadeiros e correspondentes à sede publicada. |

Não comprar links para manipular posição, não fazer trocas excessivas, não usar PBNs, diretórios de baixa qualidade, comentários de fórum, widgets distribuídos, guest posts em massa ou âncoras repetidas como “especialista BPC em Irajá”. A política de spam do Google lista essas práticas como link spam [2]. Links publicitários pagos podem existir quando claramente qualificados com `rel="sponsored"` ou `rel="nofollow"` [2].

A distribuição de âncoras deve ser natural: nome da página, “guia do BPC”, “documentos da perícia”, URL nua e expressões descritivas variadas. O silo reverso entre Portal do BPC e CarlosCostaPrev deve permanecer contextual e visível; não deve ser replicado como bloco oculto ou como uma rede artificial de links.

## Configuração do Google Search Console

A configuração preferencial é uma **propriedade de domínio** para `portaldobpc.com.br`, validada por DNS. Ela cobre as variações de protocolo e subdomínios. O Search Console também aceita arquivo HTML, meta tag, Google Analytics e Google Tag Manager [4]. A verificação precisa permanecer acessível porque o Google revalida o token periodicamente [4].

Depois da verificação, seguir esta sequência:

| Etapa | Ação | Evidência de sucesso |
|---|---|---|
| 1 | Adicionar `portaldobpc.com.br` como propriedade de domínio. | Propriedade aparece sem erro no seletor. |
| 2 | Abrir **Indexação → Sitemaps** e enviar `https://www.portaldobpc.com.br/sitemap.xml`. | Status “Sucesso”, data de leitura e URLs descobertas. |
| 3 | Usar **Inspeção de URL** para homepage, página pilar, `bpc-idoso`, `como-conseguir-bpc`, `pericias` e 3 patologias. | URL canônica correta e opção “Solicitar indexação” quando necessário. |
| 4 | Abrir **Indexação → Páginas**. | Queda de “Descoberta — atualmente não indexada” e ausência de erros críticos. |
| 5 | Abrir **Experiência → Core Web Vitals** e HTTPS. | Monitoramento dos dados reais quando houver volume suficiente. |
| 6 | Abrir **Resultados de pesquisa → Pesquisa na Web**. | Dados de consultas, páginas, países, dispositivos e aparência. |

O relatório de Performance do Search Console fornece cliques, impressões, CTR e posição média; permite agrupar por consultas, páginas, países, dispositivos, aparência e datas [3]. Para medir crescimento sem confundir marca com demanda genérica, salvar duas visões: uma de consultas contendo `portaldobpc`, `portal do bpc` ou `carlos costa`; e outra excluindo esses termos. Comparar 28 dias contra os 28 dias anteriores e, mensalmente, 3 meses contra os 3 meses anteriores.

Acompanhar especialmente consultas com muitas impressões e posição média entre 4 e 20. Essas URLs normalmente oferecem o melhor potencial de melhoria de título, introdução, fontes, links internos e CTR. Não interpretar posição média como posição fixa: o próprio Google informa que resultados variam por hora, local, dispositivo e histórico [3].

Exportar mensalmente as tabelas de **Consultas** e **Páginas**. Criar uma planilha com URL, consulta, impressões, cliques, CTR, posição, data da última atualização, fonte editorial e próxima ação. O sitemap é uma indicação de URLs canônicas, não uma garantia de rastreamento ou indexação [5].

## Configuração do Bing Webmaster Tools

O caminho mais simples é importar a propriedade já verificada no Google Search Console. O Bing também permite adicionar o site manualmente e verificar por DNS, arquivo XML `BingSiteAuth.xml`, meta tag ou CNAME [6]. Depois da inclusão, enviar `https://www.portaldobpc.com.br/sitemap.xml` e aguardar a coleta inicial; o Bing informa que os dados podem levar até 48 horas para aparecer [6].

No relatório **Search Performance**, acompanhar as fontes **Web** e **Chat**, além de impressões, cliques, CTR, posição média, páginas indexadas, solicitações de rastreamento e erros [7]. O relatório oferece até seis meses de histórico e permite cruzar palavras-chave com páginas servidas [7]. Exportar CSV mensalmente.

No relatório **AI Performance**, verificar páginas citadas, consultas de grounding, citações totais, média de páginas citadas e tendências. Esse relatório cobre Microsoft Copilot, resumos gerados por IA no Bing e experiências parceiras [8]. Ele mede citações visíveis, não ranking, autoridade, cliques ou tráfego [8]. Registrar separadamente:

| Pergunta | Relatório |
|---|---|
| O portal apareceu e recebeu clique na busca tradicional? | Search Performance — Web |
| O portal foi exibido em Chat/Bing? | Search Performance — Chat |
| Uma página foi citada em resposta gerada por IA? | AI Performance — Pages |
| Em quais temas a página foi citada? | AI Performance — Grounding Queries/Topics |
| O tráfego chegou ao site? | GA4 com UTMs e eventos de conversão |

## Rotina de análise recomendada

Na primeira segunda-feira de cada mês, exportar Search Console, Bing Search Performance e Bing AI Performance. Comparar marca versus não marca, clusters, URLs e dispositivos. Toda vez que uma página subir em impressões sem subir em cliques, revisar título, descrição e intenção; quando subir em posição sem cliques, revisar promessa de SERP e correspondência com o conteúdo; quando cair em impressões, verificar indexação, canônica, atualização do tema e concorrentes.

Para IA, não usar o `robots.txt` como prova de ranking. Ele apenas controla permissões de rastreamento. A prova operacional de citação é o relatório AI Performance do Bing ou uma captura reproduzível de uma resposta pública que mostre a URL como fonte. No Google Modo IA e em outras plataformas, resultados podem variar por localização, conta, momento e consulta; a medição deve ser arquivada com data, consulta, plataforma e URL citada.

## Prioridade de execução

| Prazo | Ação | Motivo |
|---|---|---|
| 0–7 dias | Verificar Search Console por DNS, enviar sitemap e validar 10 URLs estratégicas. | Criar linha de base confiável. |
| 0–7 dias | Adicionar/verificar Bing Webmaster e enviar sitemap. | Habilitar Search Performance e AI Performance. |
| 1–2 semanas | Revisar a homepage como pilar “BPC/LOAS 2026” e reforçar links entre guias. | Melhorar cobertura de intenção sem criar novas páginas finas. |
| 2–4 semanas | Publicar calendário 2026, guia de documentos e metodologia editorial com fontes oficiais. | Criar ativos naturalmente citáveis. |
| 1–3 meses | Fazer relacionamento com entidades locais, imprensa, universidades e organizações de deficiência. | Construir referências editoriais reais. |
| Mensal | Exportar dados, comparar marca/não marca e atualizar páginas com maior potencial. | Transformar SEO em processo mensurável. |

## Referências

[1]: https://developers.google.com/search/docs/essentials "Google Search Essentials"

[2]: https://developers.google.com/search/docs/essentials/spam-policies "Google Spam Policies for Web Search"

[3]: https://support.google.com/webmasters/answer/7576553?hl=pt-BR "Google Search Console — Relatório de Performance"

[4]: https://support.google.com/webmasters/answer/9008080?hl=pt-BR "Google Search Console — Verificar a propriedade"

[5]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Google Search Central — Build and submit a sitemap"

[6]: https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b "Bing Webmaster Tools — Adding a site and verification"

[7]: https://www.bing.com/webmasters/help/search-performance-c680da36 "Bing Webmaster Tools — Search performance"

[8]: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c "Bing Webmaster Tools — AI Performance"

[9]: https://www.google.com/search?q=%22portaldobpc.com.br%22 "Google — busca exata pelo domínio"

[10]: https://www.google.com/search?q=BPC+LOAS+2026 "Google — busca temática BPC/LOAS 2026"

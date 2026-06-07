# UI Kit — Website público

Recriação do **site público** do Portal do BPC, baseada visualmente em carloscostaprev.com.br e estruturada no conteúdo em loasbpc.com.br.

## Componentes (`components.jsx`)

Todos exportados via `Object.assign(window, {…})` para uso entre scripts:

| Componente | Função |
|---|---|
| `<Header />` | Topo fixo com logo, navegação, CTA WhatsApp. Vira blur ao rolar. |
| `<Hero />` | Eyebrow + display heading com itálico + foto placeholder + duplo CTA |
| `<StatsStrip />` | Faixa com 4 stats (idosos atendidos, patologias cobertas, etc) |
| `<Especialidades />` | 2 cards lado-a-lado: BPC Idoso · BPC PcD |
| `<PatologiasGrid />` | Grid das ~20 doenças/condições — cards clicáveis |
| `<SobrePortal />` | Bloco sobre o portal com foto + 4 valores |
| `<Depoimentos />` | 3 cards com ★★★★★ |
| `<Blog />` | 3 artigos em destaque |
| `<FAQ />` | Accordion de perguntas frequentes |
| `<ContactForm />` | Formulário de análise gratuita (envia pro WhatsApp) |
| `<Footer />` | Rodapé com navegação, contato, endereço |
| `<WhatsAppFloat />` | Botão flutuante verde no canto |

## Screens (cada um é uma "rota" simulada)

| Tela | Componentes |
|---|---|
| Landing (`#/`) | Tudo acima |
| Patologia detalhe (`#/patologia/:slug`) | Header, breadcrumb, hero da patologia, conteúdo editorial, CTA, Footer |
| Simulador (`#/simulador`) | Header, wizard de 4 passos, resultado, CTA, Footer |
| Blog index (`#/blog`) | Header, grid de artigos paginado, Footer |

A navegação é click-thru fake (hash-based).

## Como rodar

Abra `index.html`. Toggle das telas pelo header (ou pelos links internos da landing).

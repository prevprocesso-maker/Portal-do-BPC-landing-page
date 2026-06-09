/* ============================================================
   blog-posts.js — Blog index com imagens + artigos completos
   Carregado após screens.js. Sobrescreve ScreenBlog e adiciona
   ScreenBlogPost ao window para uso pelo app-main.js.
   ============================================================ */
(function(){
var el=React.createElement;
var useState=React.useState;
var useEffect=React.useEffect;

/* ─── SVG thumbnail helper ──────────────────────────────────── */
function thumb(svg){
  return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">'+svg+'</svg>');
}

var THUMBS=[
  /* 0 — Como dar entrada sem sair de casa */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><rect x="290" y="70" width="160" height="290" rx="22" fill="none" stroke="rgba(245,237,224,0.45)" stroke-width="8"/><rect x="308" y="102" width="124" height="222" rx="6" fill="rgba(245,237,224,0.07)"/><rect x="322" y="128" width="96" height="10" rx="5" fill="rgba(245,237,224,0.38)"/><rect x="322" y="150" width="74" height="8" rx="4" fill="rgba(245,237,224,0.22)"/><rect x="322" y="170" width="86" height="8" rx="4" fill="rgba(245,237,224,0.22)"/><rect x="322" y="190" width="60" height="8" rx="4" fill="rgba(245,237,224,0.22)"/><circle cx="530" cy="290" r="72" fill="rgba(196,103,58,0.25)"/><circle cx="530" cy="290" r="72" fill="none" stroke="rgba(245,237,224,0.55)" stroke-width="7"/><path d="M500 290 L522 314 L568 262" stroke="rgba(245,237,224,0.88)" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="185" cy="160" r="32" fill="rgba(196,103,58,0.18)"/>'),
  /* 1 — INSS negou */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><rect x="220" y="80" width="220" height="290" rx="14" fill="rgba(245,237,224,0.07)" stroke="rgba(245,237,224,0.3)" stroke-width="7"/><rect x="248" y="125" width="164" height="12" rx="6" fill="rgba(245,237,224,0.35)"/><rect x="248" y="152" width="130" height="9" rx="4.5" fill="rgba(245,237,224,0.2)"/><rect x="248" y="173" width="148" height="9" rx="4.5" fill="rgba(245,237,224,0.2)"/><circle cx="520" cy="255" r="88" fill="rgba(190,50,30,0.2)"/><circle cx="520" cy="255" r="88" fill="none" stroke="rgba(220,70,50,0.75)" stroke-width="12"/><line x1="462" y1="197" x2="578" y2="313" stroke="rgba(220,70,50,0.85)" stroke-width="14" stroke-linecap="round"/><line x1="578" y1="197" x2="462" y2="313" stroke="rgba(220,70,50,0.85)" stroke-width="14" stroke-linecap="round"/>'),
  /* 2 — CadÚnico */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><rect x="180" y="130" width="360" height="240" rx="22" fill="rgba(245,237,224,0.08)" stroke="rgba(245,237,224,0.38)" stroke-width="7"/><circle cx="268" cy="250" r="48" fill="rgba(245,237,224,0.1)" stroke="rgba(245,237,224,0.28)" stroke-width="5"/><circle cx="268" cy="232" r="18" fill="rgba(245,237,224,0.3)"/><path d="M234 276 Q268 258 302 276" stroke="rgba(245,237,224,0.28)" stroke-width="5" fill="none"/><rect x="348" y="200" width="150" height="13" rx="6.5" fill="rgba(245,237,224,0.45)"/><rect x="348" y="228" width="112" height="10" rx="5" fill="rgba(245,237,224,0.27)"/><rect x="194" y="318" width="332" height="10" rx="5" fill="rgba(196,103,58,0.5)"/><path d="M548 376 L572 406 L632 346" stroke="rgba(245,237,224,0.8)" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
  /* 3 — Lei Berenice Piana */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><circle cx="320" cy="230" r="68" fill="rgba(245,237,224,0.07)" stroke="rgba(245,237,224,0.32)" stroke-width="7"/><circle cx="320" cy="198" r="22" fill="rgba(245,237,224,0.38)"/><path d="M286 235 L286 276 Q286 295 306 295 L334 295 Q354 295 354 276 L354 235" stroke="rgba(245,237,224,0.48)" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M428 155 Q518 230 428 305" stroke="rgba(214,133,89,0.72)" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M454 132 Q572 230 454 328" stroke="rgba(224,179,136,0.52)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M478 110 Q618 230 478 350" stroke="rgba(245,237,224,0.28)" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="170" cy="200" r="22" fill="rgba(196,103,58,0.2)"/>'),
  /* 4 — Renda per capita */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><circle cx="280" cy="250" r="70" fill="rgba(245,237,224,0.08)" stroke="rgba(245,237,224,0.38)" stroke-width="7"/><text x="280" y="264" font-family="Georgia,serif" font-size="40" font-weight="bold" fill="rgba(245,237,224,0.52)" text-anchor="middle">R$</text><text x="405" y="262" font-family="Georgia,serif" font-size="36" fill="rgba(245,237,224,0.35)" text-anchor="middle">&#247;</text><circle cx="530" cy="250" r="70" fill="rgba(196,103,58,0.2)" stroke="rgba(196,103,58,0.52)" stroke-width="7"/><text x="530" y="244" font-family="Georgia,serif" font-size="20" fill="rgba(245,237,224,0.45)" text-anchor="middle">n&#xFA; de</text><text x="530" y="268" font-family="Georgia,serif" font-size="20" fill="rgba(245,237,224,0.45)" text-anchor="middle">pessoas</text><circle cx="640" cy="140" r="26" fill="rgba(196,103,58,0.18)"/>'),
  /* 5 — Perícia médica */
  thumb('<rect width="800" height="500" fill="#3d1a0a"/><path d="M296 165 Q296 126 334 126 Q372 126 372 165 L372 234 Q372 274 334 274 Q296 274 296 234 Z" fill="none" stroke="rgba(245,237,224,0.52)" stroke-width="11" stroke-linecap="round"/><path d="M334 274 L334 318 Q334 350 366 350 L398 350 Q430 350 430 318 L430 294" fill="none" stroke="rgba(245,237,224,0.52)" stroke-width="11" stroke-linecap="round"/><circle cx="430" cy="281" r="21" fill="none" stroke="rgba(245,237,224,0.68)" stroke-width="9"/><rect x="468" y="126" width="116" height="164" rx="10" fill="rgba(245,237,224,0.07)" stroke="rgba(245,237,224,0.25)" stroke-width="5"/><line x1="488" y1="164" x2="564" y2="164" stroke="rgba(245,237,224,0.42)" stroke-width="5" stroke-linecap="round"/><line x1="488" y1="188" x2="548" y2="188" stroke="rgba(245,237,224,0.26)" stroke-width="5" stroke-linecap="round"/><line x1="488" y1="212" x2="558" y2="212" stroke="rgba(245,237,224,0.26)" stroke-width="5" stroke-linecap="round"/><circle cx="190" cy="310" r="38" fill="rgba(196,103,58,0.2)"/>'),
];

/* ─── Post data ─────────────────────────────────────────────── */
var POSTS=[
  {
    id:0,cat:'BPC Idoso',date:'12 mai 2026',readTime:'6 min',
    titulo:'Como dar entrada no BPC sem sair de casa',
    desc:'Passo a passo do pedido pelo Meu INSS, sem precisar de advogado.',
    intro:'Muita gente não sabe, mas dá para pedir o BPC inteiramente pelo celular — sem fila, sem 135, sem ir à agência. Veja como funciona na prática.',
    sections:[
      {h:'O que você precisa antes de começar',body:'<p>Antes de abrir o app, deixe tudo separado. Pedido incompleto vai para fila de exigência e atrasa meses.</p><ul><li><strong>CPF e RG do requerente</strong> — foto legível (não precisa de cartório).</li><li><strong>CadÚnico atualizado</strong> nos últimos 24 meses. Sem isso o pedido trava antes de chegar ao perito.</li><li><strong>Comprovante de renda de todos os moradores</strong> — holerite, extrato, ou declaração assinada de que não há renda formal.</li><li><strong>Laudo médico (máx. 90 dias)</strong> com CID-10 — obrigatório para BPC deficiente.</li><li><strong>Comprovante de residência</strong> com até 90 dias: conta de luz, água ou gás.</li></ul>'},
      {h:'Passo a passo no app Meu INSS',body:'<ol><li><strong>Baixe o app</strong> "Meu INSS" (App Store ou Google Play) ou acesse meu.inss.gov.br.</li><li><strong>Crie ou entre na conta gov.br.</strong> Conta nível prata ou ouro dá acesso direto.</li><li>No menu: <strong>"Agendamentos e Solicitações" → "Pedir Benefício"</strong>.</li><li>Escolha <strong>"BPC — Benefício de Prestação Continuada"</strong>. Há dois: BPC Idoso (65+) e BPC Deficiência.</li><li><strong>Preencha os dados</strong> do requerente e dos moradores. O sistema cruza com o CadÚnico automaticamente.</li><li><strong>Anexe os documentos</strong> digitalizados em JPG ou PDF (máx. 2 MB por arquivo). Foto borrada é devolvida.</li><li>Conclua e guarde o <strong>número de protocolo</strong> — com ele você acompanha tudo pelo app.</li></ol>'},
      {h:'Como acompanhar o pedido',body:'<p>No app Meu INSS, em "Consultar Pedidos". O processo leva 30 a 90 dias. Se passar de 90 dias sem decisão, reclame pelo app ou no Procon.</p><p><strong>Atenção ao prazo de exigência:</strong> se o INSS pedir documento complementar, você tem 30 dias para enviar. Depois o pedido é arquivado e precisa ser refeito do zero.</p>'},
      {h:'Quando vale a pena ir presencialmente?',body:'<p>Prefira o atendimento presencial quando: a pessoa tem dificuldade com tecnologia; o laudo é extenso (mais de 20 páginas travam no upload); o pedido foi negado e você quer protocolar recurso com o gerente; ou há necessidade de perícia domiciliar.</p>'},
    ],
    cta:'Ficou com dúvida sobre o seu caso?',
    ctaMsg:'Olá! Vi o artigo sobre como dar entrada no BPC e gostaria de orientação.'
  },
  {
    id:1,cat:'Recurso',date:'08 mai 2026',readTime:'7 min',
    titulo:'INSS negou? Veja os 4 motivos mais comuns',
    desc:'O que fazer quando o benefício é indeferido e como recorrer.',
    intro:'A negativa do BPC não é o fim — é o começo de um processo. Na maioria dos casos os motivos são corrigíveis, mas você tem apenas 30 dias para agir.',
    sections:[
      {h:'1. Renda per capita acima do limite',body:'<p>O BPC exige renda familiar per capita de até ¼ do salário mínimo (R$ 405,25 em 2026). O INSS cruza CadÚnico com Receita Federal — qualquer renda informal de outro morador que apareça nos sistemas pode estourar o limite.</p><p><strong>O que fazer:</strong> revise quem está no grupo familiar e quais rendas foram declaradas. A lei 13.982/2020 permite excluir: BPC já recebido, aposentadoria de idoso de até 1 salário mínimo (Súmula 636 STJ) e Bolsa Família. Muitas famílias que têm direito são negadas por não conhecer essas exclusões legais.</p>'},
      {h:'2. CadÚnico desatualizado',body:'<p>O INSS exige CadÚnico atualizado nos últimos 24 meses. Cadastros mais antigos são rejeitados automaticamente antes de chegar a um analista.</p><p><strong>O que fazer:</strong> vá ao CRAS com documentos de todos os moradores e atualize. O processo leva cerca de 40 minutos. O sistema do INSS sincroniza em até 72 horas.</p>'},
      {h:'3. Laudo médico insuficiente',body:'<p>O laudo precisa ter: CID-10 completo, descrição das limitações funcionais, prognóstico e impacto na vida diária. Laudos que só dizem "paciente portador de X" sem descrever o que a pessoa não consegue fazer são devolvidos.</p><p><strong>O que fazer:</strong> peça ao médico um complemento com descrição funcional — o que o paciente não consegue fazer sozinho, quais atividades exigem ajuda, qual o grau de dependência.</p>'},
      {h:'4. Deficiência não reconhecida como de longo prazo',body:'<p>Pelo decreto 6.214/2007, a deficiência precisa ter caráter de longo prazo (mínimo 2 anos) e causar impedimento à participação em igualdade de condições. Doenças tratáveis raramente qualificam.</p><p><strong>O que fazer:</strong> se a condição tem mais de 2 anos, documente a história — laudos antigos, receituários, internações. A progressão no tempo é argumento decisivo nos recursos.</p>'},
      {h:'Como entrar com recurso',body:'<p>Você tem <strong>30 dias</strong> a partir da carta de indeferimento para protocolar recurso no INSS — gratuito, pelo Meu INSS ou na agência. O recurso vai para a Junta de Recursos (JR). Se a JR negar, cabe recurso ao CRPS e depois ação judicial.</p><p>Com recurso bem fundamentado, 35–45% dos casos são revertidos administrativamente. Na esfera judicial esse número sobe para 60% ou mais.</p>'},
    ],
    cta:'Recebeu carta de indeferimento? Vamos analisar seu caso.',
    ctaMsg:'Olá! O INSS negou meu BPC e preciso de orientação sobre o recurso.'
  },
  {
    id:2,cat:'Documentos',date:'02 mai 2026',readTime:'5 min',
    titulo:'CadÚnico atualizado: por que é tão importante',
    desc:'Sem CadÚnico em dia, o BPC pode ser bloqueado mesmo após aprovação.',
    intro:'O CadÚnico é a porta de entrada para o BPC. Sem ele atualizado, o pedido nem chega à análise — e quem já recebe pode ter o pagamento bloqueado.',
    sections:[
      {h:'O que é o CadÚnico',body:'<p>O Cadastro Único é o banco de dados do governo federal com informações sobre famílias de baixa renda. Criado em 2001, hoje é base de mais de 20 programas: BPC, Bolsa Família, Tarifa Social de Energia, Minha Casa Minha Vida e outros.</p><p>É pelo CadÚnico que o INSS verifica se a renda per capita da família está abaixo de ¼ do salário mínimo e se os dados de endereço e moradores batem com outros sistemas do governo.</p>'},
      {h:'Por que precisa estar atualizado',body:'<p>A lei exige CadÚnico atualizado nos últimos <strong>24 meses</strong> para que o BPC seja concedido ou mantido. O sistema do INSS verifica a data antes de qualquer análise humana.</p><p>Cadastro com mais de 24 meses? O pedido é arquivado por "requisito formal não atendido" — uma recusa que não tem nada a ver com sua condição médica ou financeira real. Frustrante, mas 100% evitável.</p>'},
      {h:'O que acontece com quem já recebe',body:'<p>Quem já recebe o BPC também precisa atualizar o CadÚnico a cada 2 anos. O governo faz varreduras e <strong>bloqueia o pagamento</strong> quando detecta o cadastro vencido. O desbloqueio exige nova visita ao CRAS e pode levar de 30 a 90 dias para o dinheiro voltar.</p>'},
      {h:'Como atualizar: passo a passo',body:'<ol><li>Vá ao <strong>CRAS</strong> mais próximo — na maioria dos municípios não precisa de agendamento.</li><li>Leve documentos de <strong>todos os moradores</strong>: RG, CPF, certidão, comprovante de renda (ou declaração de renda zero), comprovante de residência.</li><li>O atendente atualiza na hora. Leva entre 20 e 60 minutos.</li><li>O sistema do INSS sincroniza em <strong>até 72 horas</strong>.</li></ol><p><strong>Dica:</strong> nascimento de bebê, falecimento de morador ou mudança de endereço? Atualize imediatamente — não espere os 2 anos.</p>'},
    ],
    cta:'Precisa de orientação sobre o CadÚnico ou o BPC?',
    ctaMsg:'Olá! Preciso de orientação sobre o CadÚnico e o BPC.'
  },
  {
    id:3,cat:'BPC deficiente',date:'28 abr 2026',readTime:'6 min',
    titulo:'Lei Berenice Piana e o BPC para autistas',
    desc:'O que diz a lei e como aplicar no caso do seu filho ou familiar.',
    intro:'Desde 2012 a Lei Berenice Piana reconhece o autismo como deficiência para todos os fins legais. Isso abriu o caminho para que pessoas com TEA de qualquer grau possam pleitear o BPC.',
    sections:[
      {h:'O que diz a Lei 12.764/2012',body:'<p>A Lei Berenice Piana instituiu a Política Nacional de Proteção dos Direitos da Pessoa com TEA. O ponto mais importante está no artigo 1º: <em>"A pessoa com transtorno do espectro autista é considerada pessoa com deficiência, para todos os efeitos legais."</em></p><p>Isso significa que a pessoa com TEA tem os mesmos direitos garantidos pela Lei de Inclusão (Lei 13.146/2015) — inclusive o BPC.</p>'},
      {h:'Qualquer grau de autismo dá direito?',body:'<p>A lei não distingue graus. O CID F84.0 basta como diagnóstico clínico. O que o INSS avalia na prática é o <strong>impacto funcional</strong>: em que medida o TEA impede a participação plena na escola, no trabalho e na vida social.</p><p>Autismo nível 1 com boa funcionalidade tem chances menores, mas não é vedado. Nível 2 e 3 têm aprovação muito mais consistente, especialmente com documentação robusta.</p>'},
      {h:'Documentos que fazem diferença',body:'<ul><li><strong>Laudo de neuropediatra ou psiquiatra</strong> com CID F84.0 e nível de suporte (1, 2 ou 3 pelo DSM-5).</li><li><strong>Relatório escolar</strong> — se em AEE, o relatório do professor de sala de recursos tem peso enorme.</li><li><strong>Relatórios terapêuticos</strong> de fonoaudióloga, terapeuta ocupacional, psicóloga — descrevendo limitações específicas.</li><li><strong>Avaliação neuropsicológica</strong> — o documento mais completo e respeitado pelo perito.</li><li><strong>Relato escrito da rotina</strong> pelos pais — descreva o que a criança não consegue fazer sozinha no dia a dia.</li></ul>'},
      {h:'BPC-Escola: atenção aos pais',body:'<p>O BPC-Escola acompanha crianças e adolescentes com deficiência que recebem BPC, com visitas domiciliares e acompanhamento escolar. Para participar, basta manter o CadÚnico atualizado — o acompanhamento é automático.</p>'},
    ],
    cta:'Seu filho tem TEA e você quer saber se tem direito ao BPC?',
    ctaMsg:'Olá! Meu filho tem TEA e gostaria de orientação sobre o BPC.'
  },
  {
    id:4,cat:'Renda',date:'20 abr 2026',readTime:'7 min',
    titulo:'Como calcular a renda per capita corretamente',
    desc:'Erros no cálculo são a causa mais comum de negativa evitável.',
    intro:'O cálculo parece simples — renda total dividida pelo número de moradores — mas os detalhes sobre o que conta (e o que não conta) costumam decidir entre aprovação e negativa.',
    sections:[
      {h:'A fórmula básica',body:'<p><strong>Renda per capita = soma das rendas de todos do grupo familiar ÷ número de membros.</strong></p><p>Em 2026, o limite é de <strong>R$ 405,25</strong> (¼ do salário mínimo de R$ 1.621). Se o resultado for menor que esse valor, o critério de renda está atendido.</p>'},
      {h:'Quem entra no grupo familiar',body:'<p>O grupo familiar é quem mora sob o mesmo teto e divide os mesmos recursos. Entram: cônjuge ou companheiro(a), pais, madrasta ou padrasto, irmãos solteiros, filhos menores de 21 anos (ou qualquer idade se deficientes), avós que morem na casa.</p><p><strong>Não entram:</strong> filhos maiores de 21 anos sem deficiência com renda própria e economias separadas — desde que isso fique claro no CadÚnico.</p>'},
      {h:'O que conta como renda',body:'<p>Tudo que entra regularmente: salário CLT, MEI, trabalho informal declarado, pensão alimentícia, aluguel recebido, aposentadoria, pensão por morte.</p><p><strong>O que NÃO conta (exclusões legais):</strong></p><ul><li>BPC já recebido por outro membro da família (lei desde 2019)</li><li>Aposentadoria de até 1 salário mínimo de idoso do mesmo grupo familiar (Súmula 636 do STJ)</li><li>Bolsa Família e outros programas de transferência de renda</li><li>Seguro-desemprego temporário</li><li>Valores pagos à pessoa com deficiência para assistência médica ou transporte</li></ul>'},
      {h:'Exemplo prático',body:'<p><strong>Família:</strong> mãe (R$ 900 como diarista), pai desempregado, filho com TEA (requerente), avó morando junto (aposentada, R$ 1.621).</p><p><strong>Cálculo incorreto:</strong> (900 + 1.621) ÷ 4 = R$ 630,25 → <em>negado</em>.</p><p><strong>Cálculo correto aplicando exclusões legais:</strong> aposentadoria da avó não conta (Súmula 636 STJ) → 900 ÷ 4 = R$ 225 → <em>aprovado</em>.</p><p>Esse é um dos erros mais comuns: famílias que têm direito são negadas porque não conhecem as exclusões e declaram tudo como renda computável.</p>'},
    ],
    cta:'Quer calcular a renda per capita do seu caso?',
    ctaMsg:'Olá! Preciso de ajuda para calcular a renda per capita para o BPC.'
  },
  {
    id:5,cat:'Perícia',date:'12 abr 2026',readTime:'8 min',
    titulo:'Perícia médica do INSS: como se preparar',
    desc:'Documentos, laudos e o que dizer ao perito para não perder o BPC.',
    intro:'A perícia é o momento mais crítico do processo. Erros evitáveis — aparecer em dia bom, esquecer documentos, minimizar sintomas — derrubam pedidos que deveriam ser aprovados.',
    sections:[
      {h:'O que o perito avalia de verdade',body:'<p>O perito usa a Classificação Internacional de Funcionalidade (CIF) — não apenas o diagnóstico. Ele avalia o <strong>impacto da condição na vida real</strong>: o que a pessoa não consegue fazer sozinha, que barreiras encontra, qual nível de suporte precisa.</p><p>Um diagnóstico grave com boa funcionalidade pode ser negado. Uma condição aparentemente leve com alto impacto documentado pode ser aprovada. A documentação é tudo.</p>'},
      {h:'Lista completa de documentos',body:'<ul><li>RG e CPF (originais)</li><li>Comprovante de residência atualizado</li><li>Agendamento impresso ou digital</li><li>Laudo médico (máx. 90 dias) com CID, prognóstico e limitações funcionais</li><li>Receituários dos últimos 6–12 meses</li><li>Exames complementares: imagem, laboratorial, biópsia</li><li>Relatórios de internação (se houver)</li><li>Caixas ou fotos dos medicamentos em uso</li><li>Equipamentos de apoio — leve no dia</li><li>Relatórios terapêuticos: fisio, fono, TO, psicólogo</li></ul>'},
      {h:'Como se comportar na perícia',body:'<p><strong>Descreva o pior dia, não o melhor.</strong> Muita gente, na ansiedade, demonstra mais capacidade do que normalmente tem. O perito anota o que vê.</p><p><strong>Seja específico.</strong> Não diga "tenho dificuldade para andar". Diga: "consigo caminhar no máximo 50 metros antes de parar por dor, preciso de apoio para escadas e não fico de pé mais de 10 minutos seguidos".</p><p><strong>Leve um acompanhante.</strong> É direito garantido por lei. O acompanhante pode descrever o que o paciente esquece ou minimiza.</p>'},
      {h:'Erros que derrubam a perícia',body:'<ul><li>Tomar medicação logo antes — os sintomas ficam mascarados</li><li>Aparecer muito arrumado se a condição dificulta o autocuidado</li><li>Dizer "estou bem" quando perguntado — o perito quer saber sobre sua vida diária</li><li>Não mencionar as variações: "há dias bons e ruins"</li><li>Levar só laudo, sem exames complementares</li><li>Não mencionar medicamentos de uso contínuo e seus efeitos colaterais</li></ul>'},
    ],
    cta:'Tem perícia marcada? Vamos te preparar com orientação personalizada.',
    ctaMsg:'Olá! Tenho uma perícia do INSS marcada e preciso de orientação.'
  }
];

/* ─── Inject article styles ──────────────────────────────────── */
(function(){
  var st=document.createElement('style');
  st.id='bpc-blog-styles';
  st.textContent='.bpc-art p{margin:0 0 18px}.bpc-art ul,.bpc-art ol{margin:0 0 18px;padding-left:28px}.bpc-art li{margin-bottom:9px;line-height:1.65}.bpc-art strong{color:var(--ink-900);font-weight:600}.bpc-art em{color:var(--terra-400);font-style:italic}.bpc-bc{display:flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:14px;color:var(--ink-500);margin-bottom:24px;flex-wrap:wrap}.bpc-bc a{color:var(--ink-500);text-decoration:none}.bpc-bc a:hover{color:var(--terra-400)}.bpc-bc .sep{color:var(--ink-300)}';
  document.head.appendChild(st);
})();

/* ─── ScreenBlog (with images) ──────────────────────────────── */
function ScreenBlog(){
  return el('section',{className:'hero',style:{paddingBottom:96}},
    el('div',{className:'container'},
      el('div',{className:'eyebrow'},'Blog'),
      el('h1',{className:'display',style:{fontSize:'clamp(2.5rem,4vw,4rem)',marginBottom:16}},
        'Blog BPC/LOAS — ',el('em',null,'guias e artigos')
      ),
      el('p',{className:'lead',style:{color:'var(--ink-500)',marginBottom:56,maxWidth:600}},
        'Artigos sobre BPC/LOAS em linguagem de gente, sem juridiquês.'
      ),
      el('div',{className:'blog-grid'},
        POSTS.map(function(p){
          return el('a',{key:p.id,className:'blog-card',href:'#/blog/'+p.id,style:{textDecoration:'none'}},
            el('div',{className:'blog-thumb',style:{backgroundImage:'url("'+THUMBS[p.id]+'")',backgroundSize:'cover',backgroundPosition:'center'}}),
            el('div',{className:'body'},
              el('div',{className:'cat'},p.cat+' · '+p.date),
              el('h4',null,p.titulo),
              el('p',null,p.desc)
            )
          );
        })
      )
    )
  );
}

/* ─── ScreenBlogPost ─────────────────────────────────────────── */
function ScreenBlogPost(props){
  var postId=props.postId;
  var onNavigate=props.onNavigate;
  var post=POSTS[postId]||POSTS[0];

  useEffect(function(){
    window.scrollTo(0,0);
    document.title=post.titulo+' | Portal do BPC';
  },[postId]);

  return el(React.Fragment,null,
    el('section',{className:'pericia-hero'},
      el('div',{className:'container'},
        el('nav',{className:'bpc-bc','aria-label':'Caminho'},
          el('a',{href:'#/',onClick:function(e){e.preventDefault();onNavigate('home');}},'Início'),
          el('span',{className:'sep'},'/'),
          el('a',{href:'#/blog',onClick:function(e){e.preventDefault();onNavigate('blog');}},'Blog'),
          el('span',{className:'sep'},'/'),
          el('span',null,post.cat)
        ),
        el('div',{style:{maxWidth:760}},
          el('div',{className:'eyebrow',style:{marginBottom:12}},post.cat+' · '+post.date+' · '+post.readTime+' de leitura'),
          el('h1',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(2rem,4vw,3.2rem)',lineHeight:1.1,marginBottom:20,letterSpacing:'-0.02em'}},post.titulo),
          el('p',{className:'lead',style:{color:'var(--ink-500)',fontSize:19,marginBottom:0}},post.intro)
        )
      )
    ),
    el('section',{className:'pericia-body',style:{paddingTop:0}},
      el('div',{className:'container'},
        el('div',{style:{maxWidth:760,margin:'0 auto'}},
          post.sections.map(function(s,i){
            return el('div',{key:i,style:{marginBottom:48}},
              el('h2',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(1.4rem,2.5vw,2rem)',marginBottom:16,letterSpacing:'-0.01em',color:'var(--ink-900)'}},s.h),
              el('div',{className:'bpc-art',style:{fontSize:17,lineHeight:1.75,color:'var(--ink-700)'},dangerouslySetInnerHTML:{__html:s.body}})
            );
          }),
          el('div',{className:'pericia-cta',style:{marginTop:56}},
            el('div',null,
              el('div',{className:'eyebrow'},'Atendimento gratuito'),
              el('h3',null,post.cta),
              el('p',null,'Análise pelo WhatsApp. Atendimento humano, resposta em até 1 dia útil.')
            ),
            el('a',{className:'btn btn--primary btn--lg',href:'https://wa.me/5521964238080?text='+encodeURIComponent(post.ctaMsg),target:'_blank',rel:'noopener'},'💬 Falar no WhatsApp')
          ),
          el('div',{style:{marginTop:48,paddingTop:32,borderTop:'1px solid var(--line)'}},
            el('a',{href:'#/blog',onClick:function(e){e.preventDefault();onNavigate('blog');},style:{color:'var(--terra-400)',fontFamily:'var(--font-sans)',fontSize:15,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8}},'← Voltar para o Blog')
          )
        )
      )
    )
  );
}

Object.assign(window,{ScreenBlog:ScreenBlog,ScreenBlogPost:ScreenBlogPost,BLOG_POSTS:POSTS});
})();

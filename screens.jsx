/* ============================================================
   Portal do BPC — Screens (routed views)
   ============================================================ */

const { useState: useStateS } = React;

/* ---------- Landing ---------- */
function ScreenLanding({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <StatsStrip />
      <Especialidades />
      <PatologiasGrid onNavigate={onNavigate} />
      <SobrePortal />
      <Depoimentos />
      <Blog />
      <FAQ />
      <ContactForm />
      <CTABanner />
    </>
  );
}

/* ---------- Patologia detail: per-patologia content ---------- */
const PATOLOGIA_DETAIL = {
  TEA: {
    legalBase: 'Lei 12.764/2012 (Berenice Piana)',
    minIdade: 'Qualquer',
    duracao: 'Sem prazo mínimo',
    o_que_e: [
      'O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento caracterizada por dificuldades persistentes na comunicação social e em padrões restritos ou repetitivos de comportamento e interesses.',
      'A intensidade varia muito de pessoa para pessoa — daí o termo "espectro". O TEA acompanha a pessoa por toda a vida e, na maioria dos casos, exige apoio contínuo.',
    ],
    legislacao: {
      titulo: 'Lei Berenice Piana — o marco do BPC para o autismo',
      texto: 'A Lei 12.764/2012 equiparou a pessoa com TEA à pessoa com deficiência para todos os efeitos legais. Isso significa que, para fins de BPC, não é preciso provar a deficiência caso a caso — o diagnóstico de TEA já basta para o critério clínico. O que ainda precisa ser comprovado é a renda familiar e os impedimentos funcionais.',
      destaque: 'Não é preciso provar que o autismo "incapacita" — a lei já reconhece como deficiência.',
    },
    docs: [
      { tit: 'Laudo médico com CID F84', desc: 'Emitido por neuropediatra, neurologista ou psiquiatra. Deve descrever o nível de suporte (1, 2 ou 3 — DSM-5).' },
      { tit: 'Relatórios terapêuticos', desc: 'Fonoaudiologia, terapia ocupacional, psicologia, ABA — quanto mais detalhado o impacto funcional, melhor.' },
      { tit: 'Relatório escolar (se em idade escolar)', desc: 'Da AEE / sala de recursos / escola regular, descrevendo apoios necessários e adaptações.' },
      { tit: 'CadÚnico da família atualizado', desc: 'Em nome do responsável legal. Sem CadÚnico, o pedido nem chega ao perito.' },
      { tit: 'Comprovantes de renda de TODOS os moradores', desc: 'Salários, aposentadorias, bicos, bolsa família. Tudo entra na conta da renda per capita.' },
    ],
    pericia: [
      'A avaliação no INSS para BPC PcD tem duas etapas: <strong>perícia médica</strong> (avalia o impedimento) e <strong>avaliação social</strong> (avalia as barreiras na vida diária).',
      'Para o autismo, a avaliação social pesa muito: o perito quer entender como o TEA afeta a rotina — autonomia para comer, vestir-se, comunicar-se, frequentar escola, conviver socialmente.',
      'Leve <strong>vídeos curtos do dia a dia</strong> e exemplos concretos. Não dependa só do laudo.',
    ],
    erros: [
      'Levar apenas o CID sem descrição do nível de suporte',
      'Não atualizar o CadÚnico antes do pedido',
      'Omitir bicos ou ajudas informais — o INSS cruza dados e isso pode dar má-fé',
      'Não levar relatórios terapêuticos recentes (últimos 6 meses)',
      'Esquecer de declarar a criança como dependente quando alguém da família é PJ',
    ],
    recurso: 'Se o BPC for negado por "não configurar deficiência", o recurso é praticamente automático — a Lei Berenice Piana é jurisprudência consolidada. Vale entrar com recurso administrativo em 30 dias e, se negado de novo, ação judicial.',
    relacionadas: ['SD', 'PCx', 'EP'],
  },

  SD: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer',
    duracao: 'Desde o nascimento',
    o_que_e: [
      'A Síndrome de Down é uma condição genética causada pela trissomia do cromossomo 21. Ela acompanha a pessoa por toda a vida e está associada a graus variados de deficiência intelectual, além de características físicas específicas e maior incidência de condições clínicas associadas (cardíacas, tireoidianas, oftalmológicas).',
      'Para fins de BPC, a Síndrome de Down é deficiência reconhecida sem necessidade de comprovação caso a caso — o que precisa ser comprovado é a renda familiar.',
    ],
    legislacao: {
      titulo: 'Lei Brasileira de Inclusão e o BPC',
      texto: 'A LBI (Lei 13.146/2015) consolidou o conceito de pessoa com deficiência adotado pela Convenção da ONU. A Síndrome de Down se enquadra perfeitamente no critério: impedimento de longo prazo de natureza intelectual que, em interação com barreiras sociais, obstrui a participação plena. Não há prazo mínimo de 2 anos a observar — a condição é genética e permanente.',
      destaque: 'Síndrome de Down é deficiência permanente. O direito existe desde o nascimento.',
    },
    docs: [
      { tit: 'Cariótipo (exame genético)', desc: 'Confirma a trissomia 21. Feito normalmente nos primeiros meses de vida — solicite cópia no laboratório se não tiver.' },
      { tit: 'Laudo médico com CID Q90', desc: 'Emitido por pediatra, geneticista ou neurologista. Deve descrever comorbidades (cardiopatia, hipotireoidismo, etc) quando presentes.' },
      { tit: 'Relatórios terapêuticos', desc: 'Fonoaudiologia, fisioterapia, terapia ocupacional, psicopedagogia — descrevendo a frequência e o impacto funcional.' },
      { tit: 'Relatório escolar (se em idade escolar)', desc: 'Da AEE ou escola regular, com descrição de apoios e adaptações necessárias.' },
      { tit: 'CadÚnico atualizado + comprovantes de renda', desc: 'CadÚnico em nome do responsável legal. Comprovantes de renda de todos os moradores da casa.' },
    ],
    pericia: [
      'Para crianças e adolescentes com SD, a perícia é geralmente <strong>tranquila no aspecto clínico</strong> — o cariótipo encerra a discussão sobre deficiência.',
      'O peso real está na <strong>avaliação social</strong>: o que a criança consegue fazer sozinha, que apoios precisa, qual o impacto na rotina da família (afastamento do trabalho de um responsável, gastos com terapias).',
      'Leve um relato escrito da rotina diária. Esse documento, somado aos laudos, normalmente é decisivo.',
    ],
    erros: [
      'Não levar o cariótipo — em casos raros, o INSS pede esse exame específico',
      'CadÚnico desatualizado (mais de 2 anos sem revisão)',
      'Não declarar pensão alimentícia recebida — entra na renda',
      'Pedir BPC quando um dos pais já recebe outro benefício do INSS sem checar regras de cumulação',
      'Não levar nenhum relatório terapêutico recente',
    ],
    recurso: 'Negativa por "não configurar deficiência" para Síndrome de Down praticamente não se sustenta — o recurso administrativo costuma reverter. Negativas por renda exigem revisão da composição familiar (às vezes alguém da casa não devia entrar no cálculo).',
    relacionadas: ['TEA', 'PCx', 'EP'],
  },

  CA: {
    legalBase: 'Lei 8.742/1993 (LOAS) + jurisprudência',
    minIdade: 'Qualquer',
    duracao: '2 anos (ou menos em casos graves)',
    o_que_e: [
      'O termo "câncer" abrange centenas de neoplasias malignas com prognósticos muito diferentes. Para o BPC, o que importa não é o diagnóstico em si, mas o <strong>impacto funcional</strong> da doença e do tratamento na vida da pessoa.',
      'Tumores em tratamento ativo (quimio, radio, cirurgia recente), metástases, ou sequelas permanentes (perda de membro, traqueostomia, colostomia) costumam configurar direito ao BPC com facilidade.',
    ],
    legislacao: {
      titulo: 'BPC e doenças graves — Súmula 78 do TNU',
      texto: 'A Turma Nacional de Uniformização firmou que, em caso de doenças graves, o prazo mínimo de 2 anos pode ser <strong>flexibilizado</strong>. Cânceres avançados, terminais ou em tratamento intensivo podem dar direito imediato ao benefício, mesmo se o diagnóstico for recente.',
      destaque: 'Em câncer grave, não espere 2 anos para pedir o BPC. A jurisprudência permite agora.',
    },
    docs: [
      { tit: 'Laudo oncológico com CID C00–C97', desc: 'Emitido pelo médico oncologista. Deve indicar estadiamento (I a IV) e tratamento em curso.' },
      { tit: 'Histopatológico (biópsia)', desc: 'Documento de laboratório que confirma o diagnóstico.' },
      { tit: 'Plano de tratamento', desc: 'Protocolo de quimioterapia, radioterapia ou imunoterapia, com cronograma.' },
      { tit: 'Relatórios de exames de imagem', desc: 'Tomografia, ressonância, PET-CT — comprovam extensão do tumor e metástases.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Como em todos os casos de BPC. Importante: gastos com remédios não entram como dedução no INSS, mas podem ser usados em ação judicial.' },
    ],
    pericia: [
      'A perícia para câncer costuma ser <strong>presencial e detalhada</strong>. O perito quer ver o estado clínico atual — não apenas o laudo.',
      'Vá vestido com roupas que mostrem cicatrizes, port-a-cath, perda de cabelo (se em quimio). Não é vaidade — é prova visual.',
      'Leve <strong>todos os exames recentes</strong>, mesmo os antigos para mostrar evolução.',
    ],
    erros: [
      'Pedir o BPC sem o tratamento iniciado — perito vê como condição "controlável"',
      'Não levar o estadiamento do tumor',
      'Levar laudo de mais de 3 meses (em câncer, a situação muda rápido)',
      'Não declarar todos os efeitos colaterais e limitações',
      'Esperar terminar o tratamento — o BPC é pra <em>durante</em> também',
    ],
    recurso: 'Negativas em câncer são comuns quando o INSS julga "tratável". O recurso administrativo, e principalmente a via judicial, costumam reverter — especialmente com a Súmula 78 da TNU. Vale a pena insistir.',
    relacionadas: ['IR', 'HP', 'CG'],
  },

  AZ: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer (geralmente 60+)',
    duracao: 'Progressiva e permanente',
    o_que_e: [
      'A Doença de Alzheimer é a forma mais comum de demência. É progressiva, irreversível e leva à perda gradual de memória, linguagem, capacidade de julgamento e autonomia. Em estágios avançados, a pessoa depende totalmente de terceiros para tarefas básicas.',
      'Para o BPC, Alzheimer pode ser pedido como deficiência (a qualquer idade) ou via BPC do idoso (a partir dos 65) — a escolha depende da idade e da renda da família.',
    ],
    legislacao: {
      titulo: 'Caminhos para o BPC com Alzheimer',
      texto: 'Se a pessoa tem 65 anos ou mais, vale a pena pedir <strong>BPC do Idoso</strong> — exige apenas idade + renda, sem perícia médica de incapacidade. Se for mais nova (Alzheimer precoce, antes dos 65), entra-se com <strong>BPC PcD</strong>, que exige a perícia. Os dois benefícios têm o mesmo valor e mesmas regras de renda.',
      destaque: 'Idoso com Alzheimer: peça pelo BPC do Idoso. É mais simples e direto.',
    },
    docs: [
      { tit: 'Laudo neurológico ou geriátrico com CID G30', desc: 'Diagnóstico com estágio (leve, moderado ou grave) e tempo de evolução.' },
      { tit: 'Mini-Exame do Estado Mental (MEEM)', desc: 'Score que mostra grau de comprometimento cognitivo. Aplicado em consulta.' },
      { tit: 'Tomografia ou ressonância de crânio', desc: 'Comprovam atrofia cerebral característica.' },
      { tit: 'Relatório de cuidador ou família', desc: 'Descrição da rotina, das tarefas em que a pessoa precisa de ajuda, episódios de desorientação.' },
      { tit: 'CadÚnico + comprovantes de renda', desc: 'Em nome de um familiar/cuidador, geralmente. A renda do beneficiário também entra.' },
    ],
    pericia: [
      'Em casos avançados, a perícia médica é dispensável (BPC idoso) — basta o cadastro e a renda.',
      'Em Alzheimer precoce (BPC PcD), a avaliação foca na capacidade cognitiva e na dependência de terceiros.',
      'Leve sempre <strong>um acompanhante</strong> que conheça bem a rotina. O perito vai perguntar coisas que o próprio paciente não conseguirá responder.',
    ],
    erros: [
      'Insistir em BPC PcD quando o idoso já tem 65+ — perde tempo',
      'Achar que aposentadoria do cônjuge impede o BPC — depende do valor total',
      'Não levar o MEEM ou outro teste cognitivo aplicado',
      'Não declarar despesas com cuidador (na via judicial isso importa)',
      'Cuidador da família não estar no CadÚnico',
    ],
    recurso: 'Em Alzheimer avançado, recurso negado é raro — quando acontece, é por questões de renda, não de saúde. Revisar composição familiar costuma resolver.',
    relacionadas: ['PK', 'AVC', 'EQ'],
  },

  EQ: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A Esquizofrenia é um transtorno mental grave, crônico e geralmente de início na adolescência ou início da vida adulta. Caracteriza-se por sintomas como delírios, alucinações, desorganização do pensamento e prejuízo importante na vida social e profissional.',
      'É uma das condições mais frequentemente negadas pelo INSS — e também uma das que mais é revertida em recurso ou na justiça.',
    ],
    legislacao: {
      titulo: 'Por que tantas negativas?',
      texto: 'O INSS frequentemente nega BPC para transtornos mentais alegando que o tratamento "controla" a doença, ignorando que o controle medicamentoso não devolve a capacidade plena de trabalho e convivência. A LBI e a Lei 10.216/2001 (Lei Antimanicomial) garantem o reconhecimento dessas condições como deficiência psicossocial.',
      destaque: 'Esquizofrenia controlada não é esquizofrenia curada. O direito ao BPC persiste.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico com CID F20', desc: 'Atualizado (últimos 3 meses), com descrição dos sintomas e do tempo de evolução.' },
      { tit: 'Receitas de medicação contínua', desc: 'Mostram o tratamento ativo (antipsicóticos como risperidona, olanzapina, clozapina, etc).' },
      { tit: 'Histórico de internações (se houver)', desc: 'Resumos de alta de CAPS, hospital psiquiátrico, prontos-socorros.' },
      { tit: 'Relatório psicossocial', desc: 'Do CAPS ou de assistente social, descrevendo o funcionamento social atual.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Em muitos casos, o beneficiário vive com pais idosos — todos os rendimentos entram.' },
    ],
    pericia: [
      'A perícia em transtornos mentais é a <strong>mais subjetiva</strong> do INSS. O dia em que a pessoa está estável, o perito tende a negar.',
      'Leve um <strong>acompanhante</strong> que possa descrever crises e episódios. Não dependa só do laudo.',
      'Se o paciente tiver dificuldade para se expressar, peça à equipe do CAPS para incluir essa observação no relatório psicossocial.',
    ],
    erros: [
      'Apresentar-se à perícia "bem vestido e calmo" — o perito vai considerar como sinal de controle',
      'Não levar acompanhante (familiar, cuidador ou profissional do CAPS)',
      'Esconder o uso de medicação — pelo contrário, leve as receitas todas',
      'Não pedir o relatório psicossocial antes da perícia',
      'Acreditar que primeira negativa = fim — quase nunca é',
    ],
    recurso: 'Esquizofrenia é uma das patologias com <strong>maior taxa de reversão em recurso e na justiça</strong>. Se você foi negado, não desista. O caminho costuma ser: recurso administrativo → ação judicial com pedido de tutela antecipada.',
    relacionadas: ['TB', 'AZ', 'TEA'],
  },

  PK: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer (geralmente 60+)',
    duracao: 'Progressiva e permanente',
    o_que_e: [
      'A Doença de Parkinson é uma doença neurodegenerativa caracterizada por tremor de repouso, rigidez muscular, lentidão dos movimentos (bradicinesia) e instabilidade postural. Evolui em estágios — leves, moderados e graves — ao longo de décadas.',
      'O direito ao BPC se configura quando a doença avança a ponto de incapacitar a pessoa para tarefas básicas do dia a dia, mesmo com medicação.',
    ],
    legislacao: {
      titulo: 'Estágio importa — escala de Hoehn & Yahr',
      texto: 'O INSS usa a escala de Hoehn & Yahr (1 a 5) para classificar a gravidade da Parkinson. Estágios 3 a 5 (instabilidade postural, dependência para caminhar, confinamento à cadeira ou cama) costumam configurar deficiência para fins de BPC com tranquilidade. Estágios 1 e 2 exigem documentação mais detalhada do impacto funcional.',
      destaque: 'Parkinson em estágio 3+ na escala Hoehn & Yahr é deficiência presumida.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G20', desc: 'Atualizado, indicando o estágio na escala Hoehn & Yahr e a resposta ao tratamento (levodopa).' },
      { tit: 'Histórico de medicação', desc: 'Receitas e relatório de uso de levodopa, agonistas dopaminérgicos, etc. Mostra evolução da dose ao longo do tempo.' },
      { tit: 'Avaliação fisioterapêutica', desc: 'Descreve dificuldades de marcha, equilíbrio e necessidade de auxílio.' },
      { tit: 'Relatório de quedas (se houver)', desc: 'Quedas frequentes são sinal de Parkinson avançado e pesam na perícia.' },
      { tit: 'CadÚnico + comprovantes de renda', desc: 'Como em todos os pedidos de BPC.' },
    ],
    pericia: [
      'A perícia para Parkinson varia muito conforme o <strong>horário</strong> — em períodos "off" (quando o efeito do medicamento passa), os sintomas são mais evidentes.',
      'Se possível, marque a perícia <strong>antes de tomar a medicação do dia</strong> — converse com seu neurologista sobre isso.',
      'Leve um acompanhante. Tremor, lentidão e dificuldade de fala podem dificultar a comunicação direta com o perito.',
    ],
    erros: [
      'Tomar a medicação logo antes da perícia (sintomas ficam mascarados)',
      'Não levar a evolução do uso de levodopa (doses crescentes ao longo dos anos)',
      'Apresentar laudo sem o estágio Hoehn & Yahr',
      'Não declarar quedas, episódios de congelamento (freezing)',
      'Esperar chegar ao estágio 5 — direito existe antes',
    ],
    recurso: 'Negativas em Parkinson estágio 3+ são revertidas com facilidade — basta apresentar avaliação atualizada do neurologista. Em estágios iniciais, recurso administrativo pode pedir nova perícia em momento "off".',
    relacionadas: ['AZ', 'EL', 'AVC'],
  },

  EL: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer',
    duracao: 'Permanente, progressiva',
    o_que_e: [
      'A Esclerose Lateral Amiotrófica (ELA) é uma doença neurodegenerativa rara, rapidamente progressiva, que ataca os neurônios motores responsáveis pelo movimento voluntário. Leva à paralisia progressiva — primeiro de membros, depois da fala, da deglutição e, por fim, da respiração.',
      'É uma das poucas condições em que o BPC é praticamente automático e urgente. A expectativa de vida média é de 3 a 5 anos após o diagnóstico — o tempo é precioso.',
    ],
    legislacao: {
      titulo: 'ELA na lista de doenças graves',
      texto: 'A ELA está na lista oficial de doenças graves do INSS (Portaria Interministerial MTP/MS 22/2022) e tem direito a <strong>dispensa de carência</strong> e <strong>isenção de IR sobre pensão</strong>. Para o BPC, isso significa reconhecimento praticamente automático da deficiência. A regra dos 2 anos é flexibilizada pela jurisprudência.',
      destaque: 'ELA é urgência social. O BPC deve sair em semanas, não em meses.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G12.2', desc: 'Idealmente emitido por neurologista especializado em doenças neuromusculares.' },
      { tit: 'Eletroneuromiografia (ENMG)', desc: 'Exame que confirma o padrão de desnervação típico da ELA.' },
      { tit: 'Critérios de El Escorial', desc: 'Documentação que classifica o caso como "definitivo", "provável" ou "possível" — referência mundial.' },
      { tit: 'Avaliação multidisciplinar', desc: 'Fisioterapia, fono, nutricionista — mostra a progressão.' },
      { tit: 'CadÚnico atualizado', desc: 'Em casos graves vale acionar o assistente social do hospital pra agilizar.' },
    ],
    pericia: [
      'A perícia para ELA costuma ser <strong>excepcionalmente rápida e favorável</strong>. Em alguns casos, é dispensada via análise documental.',
      'Se a marcação está demorando, peça <strong>prioridade</strong> com base na portaria de doenças graves.',
      'Vale considerar entrada simultânea com ação judicial em casos avançados — tempo é literalmente vida.',
    ],
    erros: [
      'Não acionar o serviço social do hospital onde faz tratamento',
      'Esperar a marcação normal do INSS sem solicitar prioridade',
      'Não levar a ENMG',
      'Documentação incompleta (laudo sem El Escorial)',
    ],
    recurso: 'Praticamente inexistente em ELA. Se houver negativa, ação judicial com tutela antecipada costuma resolver em dias.',
    relacionadas: ['PK', 'EM', 'DM'],
  },

  PCx: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer (geralmente desde a infância)',
    duracao: 'Permanente',
    o_que_e: [
      'A Paralisia Cerebral (PC) é um grupo de desordens permanentes do desenvolvimento do movimento e da postura, causadas por uma lesão não-progressiva no cérebro em desenvolvimento (antes, durante ou logo após o parto).',
      'Apesar da lesão cerebral não progredir, suas <strong>consequências</strong> evoluem — contraturas, deformidades, dor, complicações respiratórias. A pessoa com PC frequentemente precisa de apoios contínuos durante toda a vida.',
    ],
    legislacao: {
      titulo: 'PC como deficiência reconhecida',
      texto: 'A PC se enquadra na definição de deficiência da LBI sem qualquer dificuldade — é, por natureza, um impedimento de longo prazo (vitalício) de natureza física e/ou intelectual. O BPC é praticamente certo desde a confirmação do diagnóstico, faltando apenas a comprovação de renda familiar.',
      destaque: 'Paralisia cerebral é deficiência permanente. Pedido pode ser feito a qualquer idade.',
    },
    docs: [
      { tit: 'Laudo neurológico ou pediátrico com CID G80', desc: 'Especificando o tipo (espástica, atáxica, discinética, mista) e o nível funcional motor grosso (GMFCS de I a V).' },
      { tit: 'Relatórios terapêuticos contínuos', desc: 'Fisioterapia, fonoaudiologia, terapia ocupacional, equoterapia — comprovam a necessidade permanente de reabilitação.' },
      { tit: 'Relatório escolar ou de inclusão', desc: 'Se em idade escolar, descreve os apoios da AEE.' },
      { tit: 'Receitas de medicação e órteses', desc: 'Anticonvulsivantes, miorrelaxantes, AFOs, cadeira de rodas — mostram apoios.' },
      { tit: 'CadÚnico + comprovantes de renda', desc: 'Em nome do responsável legal.' },
    ],
    pericia: [
      'A perícia para PC é geralmente <strong>tranquila no aspecto médico</strong> — o diagnóstico é claro e o impacto, visível.',
      'O foco é entender o nível funcional: a pessoa caminha sozinha? Com apoio? Usa cadeira de rodas? Precisa de ajuda para vestir, comer, higiene?',
      'Leve relatos concretos do dia a dia — quem ajuda, em quê, por quanto tempo.',
    ],
    erros: [
      'Não especificar o GMFCS (classificação funcional motora)',
      'Apresentar só laudo, sem relatórios terapêuticos',
      'Não declarar que um dos pais teve que parar de trabalhar para cuidar',
      'CadÚnico em nome da pessoa com PC (precisa ser do responsável)',
      'Esquecer relatórios escolares quando aplicável',
    ],
    recurso: 'Negativas para PC são raras quando o GMFCS está em III, IV ou V. Em casos mais leves (GMFCS I-II), pode haver discussão — vale a pena recorrer com avaliações funcionais detalhadas.',
    relacionadas: ['TEA', 'SD', 'EP'],
  },

  AVC: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos a partir do evento',
    o_que_e: [
      'O AVC (Acidente Vascular Cerebral) é uma interrupção súbita do fluxo sanguíneo no cérebro — por entupimento (isquêmico) ou rompimento (hemorrágico) de vasos. As <strong>sequelas</strong> dependem da área afetada e da rapidez do atendimento.',
      'Para o BPC, o que importa não é o AVC em si, mas as sequelas <strong>permanentes</strong> — hemiplegia, afasia, disfagia, perda cognitiva. A pessoa precisa apresentar essas limitações há pelo menos 2 anos (ou ter prognóstico de permanência confirmado por especialista).',
    ],
    legislacao: {
      titulo: 'AVC e o prazo de 2 anos',
      texto: 'A regra dos 2 anos pode atrapalhar pedidos recém-pós-AVC. Mas a jurisprudência admite que, quando há laudo prognóstico de <strong>permanência</strong> da sequela (paralisia, afasia grave), o INSS deve reconhecer o impedimento antes dos 2 anos. Vale insistir.',
      destaque: 'Sequelas graves não esperam 2 anos. Laudo prognóstico abre o caminho.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID I60-I69', desc: 'Indicando tipo de AVC, área afetada e sequelas atuais.' },
      { tit: 'Tomografia ou ressonância pós-AVC', desc: 'Demonstram área de lesão definitiva.' },
      { tit: 'Avaliação fisioterapêutica / fonoaudiológica', desc: 'Descreve limitações motoras, de fala e deglutição.' },
      { tit: 'Avaliação cognitiva (se aplicável)', desc: 'Em AVCs que afetam memória, atenção, linguagem.' },
      { tit: 'CadÚnico + renda', desc: 'Em muitos casos, o cônjuge ou filhos passam a sustentar a casa.' },
    ],
    pericia: [
      'A perícia para sequelas de AVC é <strong>visual</strong> — o perito observa marcha, fala, força nos membros.',
      'Não esconda as limitações por orgulho. Mostre a hemiparesia, a afasia, a dificuldade de equilíbrio.',
      'Leve acompanhante, principalmente se houver afasia (dificuldade de fala).',
    ],
    erros: [
      'Pedir antes dos 2 anos sem laudo prognóstico de permanência',
      'Não levar exames de imagem pós-AVC',
      'Tentar disfarçar limitações na hora da perícia',
      'Não documentar reabilitação contínua (fisio, fono)',
      'Esquecer de declarar afastamento do trabalho ou aposentadoria por invalidez prévia (impacta cumulação)',
    ],
    recurso: 'Negativas comuns: "tempo insuficiente" (antes dos 2 anos) ou "sequela parcial". Recurso com laudo prognóstico reverte na maioria dos casos.',
    relacionadas: ['PK', 'AZ', 'CG'],
  },

  CG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer',
    duracao: '2 anos (flexibilizável)',
    o_que_e: [
      'Cardiopatia grave é o conjunto de doenças do coração que comprometem significativamente a capacidade funcional — insuficiência cardíaca avançada, cardiopatia isquêmica grave, miocardiopatias, valvopatias graves, transplantados.',
      'O critério funcional mais usado é a <strong>classificação NYHA</strong> (New York Heart Association), de I a IV. Classe III (sintomas com pequenos esforços) e IV (sintomas em repouso) costumam dar direito ao BPC.',
    ],
    legislacao: {
      titulo: 'NYHA III e IV — deficiência presumida',
      texto: 'Pacientes em NYHA III ou IV têm a capacidade laboral plena prejudicada de forma severa — não conseguem trabalhar sem agravar a doença. A Portaria MS 1.298/2013 lista a "cardiopatia grave" entre as doenças com critérios objetivos para reconhecimento da incapacidade, e a jurisprudência consolida isso para fins de BPC.',
      destaque: 'NYHA III ou IV = direito presumido ao BPC. Vai do papel.',
    },
    docs: [
      { tit: 'Laudo cardiológico com CID I50, I25, I42, etc', desc: 'Atualizado, indicando classe NYHA e fração de ejeção.' },
      { tit: 'Ecocardiograma', desc: 'Mostra função do coração — fração de ejeção (FE) < 40% indica disfunção importante.' },
      { tit: 'Teste de esforço ou cintilografia', desc: 'Quando viável — mostra capacidade funcional cardíaca.' },
      { tit: 'Receitas de medicação contínua', desc: 'Betabloqueador, IECA, espironolactona, diurético — protocolo de IC.' },
      { tit: 'CadÚnico + comprovantes de renda', desc: 'Padrão BPC.' },
    ],
    pericia: [
      'A perícia para cardiopatia grave costuma ser <strong>baseada em laudos e exames</strong> — não há muita avaliação física.',
      'Leve o ecocardiograma mais recente. A <strong>fração de ejeção</strong> é o número que o perito olha primeiro.',
      'Se você é transplantado ou tem CDI/marcapasso, leve a carteira do dispositivo.',
    ],
    erros: [
      'Levar laudo sem classe NYHA explícita',
      'Não atualizar o ecocardiograma (mais de 1 ano)',
      'Esquecer de declarar internações recentes por descompensação',
      'Pedir BPC quando ainda em fase de investigação diagnóstica',
      'Não levar lista de medicações atual',
    ],
    recurso: 'Negativas para cardiopatia grave geralmente partem de laudo desatualizado ou ausência de classe NYHA. Recurso com nova documentação resolve a maioria.',
    relacionadas: ['IR', 'AVC', 'HP'],
  },

  IR: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Insuficiência Renal Crônica (IRC) em estágio terminal exige <strong>hemodiálise</strong> — sessões de 4 horas, 3 vezes por semana, em centro especializado, pelo resto da vida (ou até transplante).',
      'O tratamento, somado às complicações da doença (anemia, fragilidade óssea, restrição alimentar e hídrica, exaustão pós-sessão), incapacita o paciente para a maioria das atividades laborais e dá direito ao BPC quase de forma automática.',
    ],
    legislacao: {
      titulo: 'Doença renal e o BPC',
      texto: 'A IRC em hemodiálise está entre as doenças listadas na Portaria Interministerial MTP/MS 22/2022, que permite <strong>dispensa de carência</strong> em benefícios previdenciários. Para o BPC, isso significa que o INSS reconhece a deficiência sem dificuldade — desde que haja documentação adequada da terapia renal substitutiva (TRS).',
      destaque: 'Hemodiálise é incompatível com vida laboral plena. O BPC é direito quase certo.',
    },
    docs: [
      { tit: 'Laudo nefrológico com CID N18.5 ou N18.6', desc: 'Diagnóstico da IRC em estágio 5 (terminal) e indicação de hemodiálise.' },
      { tit: 'Comprovante do centro de hemodiálise', desc: 'Declaração da clínica indicando frequência, horários e duração do tratamento.' },
      { tit: 'Exames de função renal', desc: 'Creatinina, ureia, clearance — mostram o estágio da doença.' },
      { tit: 'Cartão de SUS ou registro do tratamento pelo SUS', desc: 'Hemodiálise é quase sempre via SUS — esse vínculo prova o tratamento contínuo.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Pacientes em diálise frequentemente vivem com renda muito baixa por causa do tempo de tratamento.' },
    ],
    pericia: [
      'A perícia para IRC em hemodiálise é geralmente <strong>rápida e favorável</strong> — o tratamento fala por si.',
      'Se o paciente tem <strong>fístula arteriovenosa</strong> visível no braço, mostre. É a marca da diálise.',
      'Caso o pedido seja em transição pré-transplante, leve a declaração de fila do SUS para transplante.',
    ],
    erros: [
      'Não levar declaração da clínica de diálise',
      'Marcar perícia em horário próximo a uma sessão (paciente fica exausto) — peça outro horário',
      'Não levar a fístula visível ou registro de cateter',
      'Achar que o tratamento "tá indo bem" significa "não precisa de BPC" — não é assim',
    ],
    recurso: 'Negativas para IRC em diálise são raras e revertidas com facilidade em recurso. Geralmente o problema, quando há, é de renda.',
    relacionadas: ['CG', 'CA', 'HP'],
  },

  EM: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MTP/MS 22/2022',
    minIdade: 'Qualquer',
    duracao: 'Permanente, recidivante',
    o_que_e: [
      'A Esclerose Múltipla é uma doença autoimune crônica do sistema nervoso central. O sistema imune ataca a bainha de mielina dos nervos, causando lesões espalhadas pelo cérebro e medula.',
      'Os sintomas variam — fraqueza, perda de equilíbrio, fadiga incapacitante, visão dupla, alterações cognitivas — e aparecem em surtos ou de forma progressiva. O impacto funcional <strong>cresce com o tempo</strong>.',
    ],
    legislacao: {
      titulo: 'EM e a escala EDSS',
      texto: 'A EM está na lista de doenças com <strong>dispensa de carência</strong> do INSS. Para o BPC, o critério usado é a escala EDSS (Expanded Disability Status Scale). EDSS ≥ 4 (limitação para caminhar mais de 500m sem ajuda) costuma configurar deficiência.',
      destaque: 'EM com EDSS 4 ou mais já configura direito ao BPC.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G35', desc: 'Indicando EDSS atual e tipo (surto-remissão, primária ou secundária progressiva).' },
      { tit: 'Ressonância magnética', desc: 'Mostra placas desmielinizantes em encéfalo e/ou medula.' },
      { tit: 'Histórico de surtos e tratamento', desc: 'Lista de medicações imunomoduladoras (interferon, fingolimode, natalizumabe, ocrelizumabe).' },
      { tit: 'Avaliação neuropsicológica e fisioterapêutica', desc: 'Pega limitações cognitivas e motoras que o laudo médico costuma subdescrever.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Padrão BPC.' },
    ],
    pericia: [
      'A EM é traiçoeira: <strong>a fadiga, principal sintoma incapacitante, é invisível</strong>. Não dependa de o perito "ver" a doença.',
      'Mantenha um diário de sintomas — quantos dias por mês não conseguiu fazer tarefas básicas.',
      'Leve relatório neuropsicológico se houver "embotamento cognitivo" — alteração comum mas raramente registrada.',
    ],
    erros: [
      'Apresentar-se em dia "bom" sem mencionar a variabilidade dos sintomas',
      'Não levar escalas de fadiga (MFIS, FSS)',
      'Esquecer o EDSS no laudo',
      'Não declarar limitações cognitivas',
      'Achar que medicação "controla" significa "cura"',
    ],
    recurso: 'EM com EDSS 4+ é revertida com facilidade em recurso. Em casos com EDSS 2-3, vale ação judicial — a jurisprudência tem reconhecido limitações cognitivas e fadiga.',
    relacionadas: ['EL', 'PK', 'AVC'],
  },

  EP: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A Epilepsia refratária é a forma da doença em que as crises convulsivas <strong>não são controladas</strong> por medicação adequada (após pelo menos 2 esquemas terapêuticos completos). As crises podem ser diárias, semanais ou mensais — sempre imprevisíveis.',
      'Para o BPC, o que importa não é o diagnóstico de epilepsia em si, mas a refratariedade e o impacto funcional — risco de queda, restrição para trabalho, direção, vida social.',
    ],
    legislacao: {
      titulo: 'Epilepsia refratária e BPC',
      texto: 'A epilepsia controlada raramente dá direito ao BPC. A refratária, sim — porque a imprevisibilidade das crises configura impedimento de longo prazo para vida laboral e social plena. Vale especialmente quando há crises tônico-clônicas (com perda de consciência) frequentes.',
      destaque: 'O critério é refratariedade — não o diagnóstico em si.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G40', desc: 'Tipo da epilepsia, frequência atual de crises, medicações tentadas.' },
      { tit: 'Eletroencefalograma (EEG)', desc: 'De preferência mais de um, mostrando o padrão epileptogênico.' },
      { tit: 'Histórico de medicação', desc: 'Lista completa de antiepilépticos tentados e razões de falha (efeitos colaterais, falta de controle).' },
      { tit: 'Diário de crises', desc: 'Documento simples mantido por familiar, com datas e duração das crises. Pesa muito na perícia.' },
      { tit: 'CadÚnico + renda', desc: 'Padrão.' },
    ],
    pericia: [
      'Crise não acontece na hora da perícia. O perito julga pelo <strong>diário de crises</strong> e pelos registros de pronto-socorro.',
      'Leve cópias de boletins de PA por crises, fotos de hematomas/lesões pós-queda, relatos de familiares testemunhas.',
      'Para epilepsia em criança, leve relatório escolar — frequentemente há prejuízo cognitivo associado.',
    ],
    erros: [
      'Não manter diário de crises',
      'Apresentar apenas o laudo, sem histórico medicamentoso',
      'Não declarar episódios de status epilepticus',
      'Esquecer registros de internação',
      'Pedir BPC com epilepsia controlada — não é o caso',
    ],
    recurso: 'Negativas comuns alegam "controle medicamentoso". Recurso com diário de crises atualizado costuma resolver. Crises focais que afetam consciência também contam — esclarecer no recurso.',
    relacionadas: ['PCx', 'TEA', 'EM'],
  },

  TB: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Lei 10.216/2001',
    minIdade: 'Qualquer (geralmente 18+)',
    duracao: '2 anos',
    o_que_e: [
      'O Transtorno Bipolar é caracterizado por oscilações de humor entre episódios depressivos (tristeza profunda, anedonia, ideação suicida) e episódios de mania ou hipomania (euforia, impulsividade, gastos descontrolados, redução de sono). Existem subtipos (tipo I, tipo II, ciclotímico).',
      'Quando os episódios são frequentes, intensos e geram <strong>prejuízo importante no funcionamento social, ocupacional e financeiro</strong>, configura-se o direito ao BPC.',
    ],
    legislacao: {
      titulo: 'Saúde mental e BPC',
      texto: 'A Lei 10.216/2001 (Lei Antimanicomial) consagra a saúde mental como direito. A LBI reconhece o impedimento psicossocial como deficiência. O TB grave, com múltiplos episódios e internações, se enquadra no critério de impedimento de longo prazo.',
      destaque: 'Bipolar grave é deficiência psicossocial. O direito existe.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico com CID F31', desc: 'Atualizado, com tipo (I ou II), histórico de episódios e tratamento.' },
      { tit: 'Histórico de internações', desc: 'Resumos de alta de hospital psiquiátrico ou CAPS.' },
      { tit: 'Receitas de medicação', desc: 'Estabilizadores de humor (lítio, valproato, lamotrigina), antipsicóticos, antidepressivos.' },
      { tit: 'Relatório psicossocial do CAPS', desc: 'Quando aplicável — descreve impacto no funcionamento diário.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Padrão.' },
    ],
    pericia: [
      'Igual à esquizofrenia, a perícia em TB é <strong>subjetiva</strong>. Em fase eutímica (estável), o perito pode achar que "não tem nada".',
      'Leve histórico completo de episódios. O TB se prova pela <strong>recorrência</strong>, não pelo dia da perícia.',
      'Acompanhante familiar é essencial — descreve episódios que o paciente minimiza ou esquece.',
    ],
    erros: [
      'Apresentar-se em fase eutímica sem documentar histórico de crises',
      'Esconder uso de medicação',
      'Não levar relatos de cuidadores ou familiares',
      'Esquecer registros de tentativas de suicídio (quando existem)',
      'Apresentar só laudo de uma consulta isolada',
    ],
    recurso: 'TB grave tem boa taxa de reversão em recurso e ação judicial. Documentação de internações + receitas crônicas + relato de comportamento em fase aguda costuma convencer.',
    relacionadas: ['EQ', 'AZ', 'TEA'],
  },

  DV: {
    legalBase: 'Lei 13.146/2015 (LBI) + Decreto 5.296/2004',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Deficiência Visual abrange cegueira (acuidade visual menor que 0,05 no melhor olho com correção) e baixa visão grave (acuidade entre 0,05 e 0,3, ou campo visual menor que 60°). Pode ser congênita ou adquirida.',
      'Para o BPC, o critério é objetivo — o oftalmologista mede a acuidade visual e o campo. Direito reconhecido com facilidade quando preenchidos os parâmetros do Decreto 5.296/2004.',
    ],
    legislacao: {
      titulo: 'Critérios objetivos',
      texto: 'O Decreto 5.296/2004 define com precisão o que é deficiência visual. Cegueira: acuidade visual ≤ 0,05 no melhor olho com a melhor correção óptica; baixa visão: acuidade entre 0,3 e 0,05; ou campo visual <60°. <strong>Visão monocular</strong> (cegueira em um olho apenas) também é reconhecida como deficiência pela Lei 14.126/2021.',
      destaque: 'Visão monocular: lei nova (14.126/2021) garante o reconhecimento.',
    },
    docs: [
      { tit: 'Laudo oftalmológico com CID H54', desc: 'Indicando acuidade visual no melhor olho com correção, campo visual e causa.' },
      { tit: 'Exames complementares', desc: 'Campimetria, retinografia, OCT, fundoscopia — dependendo da causa.' },
      { tit: 'Relatório de reabilitação visual', desc: 'Quando aplicável — uso de bengala, leitor de tela, escrita Braille.' },
      { tit: 'Histórico de tratamento', desc: 'Cirurgias, injeções intravítreas, transplantes — mostram cronicidade.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Padrão.' },
    ],
    pericia: [
      'Perícia para DV é geralmente <strong>objetiva e rápida</strong>. O perito refaz a medida de acuidade.',
      'Vá com correção óptica em dia (óculos / lentes mais recentes).',
      'Para visão monocular, leve a Lei 14.126/2021 impressa — peritos antigos ainda desconhecem.',
    ],
    erros: [
      'Não levar campimetria (campo visual)',
      'Levar laudo só com graduação (miopia, astigmatismo) sem acuidade visual',
      'Não declarar uso de leitor de tela ou Braille (importam pra avaliação social)',
      'Apresentar correção desatualizada',
    ],
    recurso: 'DV negada por "visão preservada em um olho" pede recurso direto com a Lei 14.126/2021. Reverte com facilidade.',
    relacionadas: ['DA', 'SD', 'AVC'],
  },

  DA: {
    legalBase: 'Lei 13.146/2015 (LBI) + Decreto 5.296/2004',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Deficiência Auditiva, para fins de BPC, é a <strong>perda bilateral, parcial ou total, de 41 decibéis (dB) ou mais</strong>, medida pelas frequências de 500Hz, 1.000Hz, 2.000Hz e 3.000Hz.',
      'Pode ser congênita ou adquirida (idade, ruído, doenças, ototóxicos). Implante coclear não elimina a deficiência — é apoio, não cura.',
    ],
    legislacao: {
      titulo: 'Audiometria — o exame que decide',
      texto: 'O Decreto 5.296/2004 estabelece o limiar de 41dB bilateral como critério objetivo. Audiograma bilateral é o documento decisivo. Para crianças com surdez congênita, BPC é praticamente certo. Para perda adquirida em adulto, documentar o tempo de evolução.',
      destaque: 'Perda bilateral ≥ 41dB é deficiência objetiva. Audiograma resolve.',
    },
    docs: [
      { tit: 'Audiograma bilateral atualizado', desc: 'Tonal e vocal, com medidas em todas as frequências exigidas.' },
      { tit: 'Laudo otorrinolaringológico com CID H90', desc: 'Tipo de perda (condutiva, neurossensorial, mista) e causa.' },
      { tit: 'Histórico de tratamento e órteses', desc: 'AASI (aparelho auditivo), implante coclear, terapia fonoaudiológica.' },
      { tit: 'Relatório fonoaudiológico', desc: 'Avalia desenvolvimento de linguagem (em crianças) ou prejuízo comunicativo (em adultos).' },
      { tit: 'CadÚnico + renda familiar', desc: 'Padrão.' },
    ],
    pericia: [
      'A perícia para DA é <strong>baseada no audiograma</strong>. O perito raramente repete o exame.',
      'Se você usa AASI ou implante coclear, leve, mas <strong>na perícia retire</strong> — a perda real é sem o apoio.',
      'Para crianças, leve histórico de fono e desenvolvimento de linguagem.',
    ],
    erros: [
      'Audiograma desatualizado (mais de 1 ano)',
      'Não levar laudo otorrinolaringológico',
      'Apresentar audiograma feito só em uma orelha',
      'Esquecer relatório de fono em crianças',
      'Não declarar episódios de zumbido e tontura associados',
    ],
    recurso: 'DA negada por "uso de aparelho" é absurdo jurídico — aparelho é apoio, não cura. Recurso com Lei 13.146/2015 reverte.',
    relacionadas: ['DV', 'TEA', 'SD'],
  },

  HV: {
    legalBase: 'Lei 8.742/1993 + Lei 7.670/1988',
    minIdade: 'Qualquer',
    duracao: '2 anos (geralmente flexibilizado)',
    o_que_e: [
      'A infecção pelo HIV, em si, não é deficiência para fins de BPC. Mas a <strong>AIDS</strong> (síndrome da imunodeficiência adquirida) — com infecções oportunistas, neoplasias associadas, perda de peso, demência, ou CD4 muito baixo — frequentemente é.',
      'Também conta: efeitos colaterais graves de antirretrovirais, lipodistrofia incapacitante, neuropatia, transtornos mentais associados.',
    ],
    legislacao: {
      titulo: 'AIDS e o BPC',
      texto: 'A Lei 7.670/1988 reconheceu há décadas que pessoas com HIV/AIDS têm direito a benefícios assistenciais e previdenciários. Para o BPC, o critério é o impacto funcional — geralmente comprovado quando há AIDS instalada (CD4 < 200, ou doença definidora de AIDS).',
      destaque: 'AIDS instalada ou CD4 baixo: direito ao BPC reconhecido há décadas.',
    },
    docs: [
      { tit: 'Laudo infectologista com CID B20-B24', desc: 'Estágio clínico, CD4 atual e mais recente nadir, carga viral, histórico de doenças oportunistas.' },
      { tit: 'Exames de CD4 e carga viral', desc: 'Vários, para mostrar evolução. CD4 < 200 é critério forte.' },
      { tit: 'Histórico de internações', desc: 'Resumos de alta de pneumonias, tuberculose, criptococose, neurotoxoplasmose, etc.' },
      { tit: 'Receitas de antirretrovirais', desc: 'Esquema atual e mudanças por falha ou intolerância.' },
      { tit: 'CadÚnico + renda', desc: 'Padrão. Confidencialidade preservada.' },
    ],
    pericia: [
      'O sigilo é direito do paciente — o perito é obrigado a manter confidencialidade.',
      'Não tenha vergonha de descrever sintomas e limitações. O perito vê isso o tempo todo.',
      'Leve o histórico completo de doenças oportunistas — cada uma conta.',
    ],
    erros: [
      'Pedir BPC com HIV controlado, sem AIDS — geralmente é negado',
      'Não levar histórico de CD4 baixo (mesmo que tenha melhorado)',
      'Esquecer doenças oportunistas tratadas no passado',
      'Não declarar efeitos colaterais incapacitantes (lipodistrofia, neuropatia)',
      'Apresentar só exames recentes sem evolução',
    ],
    recurso: 'AIDS com CD4 baixo histórico tem boa taxa de reversão. Para HIV controlado sem doença definidora, é mais difícil — depende do impacto funcional documentado.',
    relacionadas: ['CA', 'HP', 'IR'],
  },

  HP: {
    legalBase: 'Lei 8.742/1993 + Portaria MS 1.298/2013',
    minIdade: 'Qualquer',
    duracao: '2 anos (flexibilizável)',
    o_que_e: [
      'Hepatopatia grave inclui cirrose avançada (Child-Pugh B ou C), hepatite crônica em estágio terminal, hepatocarcinoma, e candidatos a transplante. As complicações — ascite, encefalopatia, varizes esofágicas, sangramento — incapacitam para vida laboral plena.',
      'Para o BPC, o critério é o estágio funcional, não apenas o diagnóstico.',
    ],
    legislacao: {
      titulo: 'Child-Pugh e o BPC',
      texto: 'A classificação de Child-Pugh (A, B, C) é o referencial. Child-Pugh B com complicações e Child-Pugh C praticamente garantem reconhecimento da deficiência. A cirrose está na lista de doenças com <strong>dispensa de carência</strong>.',
      destaque: 'Cirrose Child-Pugh B com complicações ou C: direito praticamente certo.',
    },
    docs: [
      { tit: 'Laudo hepatologista com CID K70-K77 ou C22', desc: 'Etiologia (HCV, HBV, alcoólica, NASH, autoimune), Child-Pugh, MELD score.' },
      { tit: 'Exames laboratoriais', desc: 'Função hepática, albumina, bilirrubina, INR, plaquetas. Mostram gravidade.' },
      { tit: 'Ultrassom / tomografia abdominal', desc: 'Mostram cirrose, varizes, hepatocarcinoma.' },
      { tit: 'Histórico de complicações', desc: 'Ascite tratada, encefalopatia, sangramento por varizes, ligadura elástica.' },
      { tit: 'CadÚnico + renda', desc: 'Padrão.' },
    ],
    pericia: [
      'Perícia para hepatopatia grave é <strong>baseada em laudos</strong>. Pouca avaliação física.',
      'O perito olha primeiro o MELD score e o Child-Pugh.',
      'Se você está em fila de transplante, leve a declaração — pesa muito.',
    ],
    erros: [
      'Laudo sem Child-Pugh ou MELD',
      'Exames laboratoriais desatualizados',
      'Não declarar histórico de descompensações',
      'Pedir BPC com hepatite crônica sem cirrose — geralmente negado',
      'Esquecer a fila de transplante quando aplicável',
    ],
    recurso: 'Hepatopatia grave negada geralmente parte de documentação incompleta. Recurso com laudos atualizados costuma reverter.',
    relacionadas: ['CA', 'IR', 'CG'],
  },

  LE: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer (mais comum 15-45 anos)',
    duracao: '2 anos',
    o_que_e: [
      'O Lúpus Eritematoso Sistêmico (LES) é uma doença autoimune crônica em que o organismo ataca diversos órgãos — pele, articulações, rins, sangue, coração, sistema nervoso. Pode variar de leve a gravíssimo.',
      'Para o BPC, o critério é o <strong>acometimento sistêmico</strong> — nefrite lúpica (rins), neurolúpus, vasculite, citopenias graves. Lúpus discoide isolado dificilmente dá direito.',
    ],
    legislacao: {
      titulo: 'Lúpus grave e BPC',
      texto: 'O LES com acometimento de órgão-alvo (rins, sistema nervoso, sangue) configura impedimento de longo prazo. O uso de corticoide crônico em alta dose, imunossupressores, e os surtos imprevisíveis pesam favoravelmente. Vale também atestar fadiga incapacitante e fotossensibilidade extrema.',
      destaque: 'Lúpus sistêmico com órgão-alvo = direito ao BPC.',
    },
    docs: [
      { tit: 'Laudo reumatológico com CID M32', desc: 'Critérios diagnósticos preenchidos (ACR/EULAR), órgãos acometidos, surtos recentes.' },
      { tit: 'Exames laboratoriais', desc: 'FAN, anti-DNA, anti-Sm, complemento, hemograma, função renal, urina.' },
      { tit: 'Biópsia renal (se nefrite)', desc: 'Indica classe da nefrite lúpica (I a VI). Classes III, IV, V e VI são graves.' },
      { tit: 'Histórico de medicação', desc: 'Hidroxicloroquina, corticoide, micofenolato, ciclofosfamida, rituximabe, belimumabe.' },
      { tit: 'CadÚnico + renda', desc: 'Padrão.' },
    ],
    pericia: [
      'Lúpus tem fases de atividade e remissão. Em remissão, o perito tende a subestimar.',
      'Documente surtos, internações, mudanças de medicação.',
      'Fotos de lesões cutâneas em surto são úteis — lúpus é doença visível quando ativo.',
    ],
    erros: [
      'Apresentar-se em fase de remissão sem mostrar histórico',
      'Não levar histórico de medicação imunossupressora',
      'Esquecer biópsia renal quando aplicável',
      'Apresentar só laudo de uma consulta — sem evolução',
      'Não declarar fadiga e fotossensibilidade',
    ],
    recurso: 'Lúpus negado por "doença controlada" reverte com histórico de surtos + medicação contínua. Em casos com órgão-alvo grave, recurso administrativo basta.',
    relacionadas: ['IR', 'CA', 'EM'],
  },

  DM: {
    legalBase: 'Lei 13.146/2015 (LBI) + Portaria MTP/MS 22/2022',
    minIdade: 'Qualquer (geralmente desde a infância)',
    duracao: 'Permanente, progressiva',
    o_que_e: [
      'As Distrofias Musculares são doenças genéticas que causam degeneração progressiva dos músculos. A mais conhecida é a Distrofia Muscular de Duchenne (DMD), que afeta meninos desde os primeiros anos de vida e leva à perda da marcha entre 8-14 anos, com sobrevida geralmente até 20-30 anos.',
      'Existem outras formas — Becker, cintura-membros, fascioescapuloumeral, miotônica — com gravidades variadas. Todas são <strong>progressivas e incuráveis</strong>.',
    ],
    legislacao: {
      titulo: 'Distrofias na lista de doenças graves',
      texto: 'As distrofias musculares estão na lista de doenças com <strong>dispensa de carência</strong> e tem reconhecimento facilitado como deficiência. Em Duchenne especificamente, o BPC é praticamente automático a partir do diagnóstico genético confirmado.',
      destaque: 'Duchenne: BPC desde o diagnóstico. Faltam só renda e CadÚnico.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G71', desc: 'Tipo de distrofia (Duchenne, Becker, etc), idade de início, estágio funcional atual.' },
      { tit: 'Exame genético', desc: 'Confirmação molecular da mutação. Fundamental — encerra a discussão diagnóstica.' },
      { tit: 'Biópsia muscular (quando feita)', desc: 'Histologia que confirma distrofia.' },
      { tit: 'Relatórios fisioterapêuticos', desc: 'Avaliação funcional motora, escala de Vignos, uso de órteses, cadeira de rodas.' },
      { tit: 'CadÚnico + renda', desc: 'Padrão. Cuidador frequentemente é familiar.' },
    ],
    pericia: [
      'Para Duchenne em criança, a perícia é <strong>visual</strong> — sinal de Gowers, marcha anserina, pseudo-hipertrofia de panturrilhas.',
      'Leve laudo genético — encerra a discussão sobre diagnóstico.',
      'Em distrofias do adulto, a documentação funcional pesa mais.',
    ],
    erros: [
      'Não fazer ou não levar o exame genético',
      'Apresentar laudo sem estágio funcional',
      'Esquecer relatório fisioterapêutico',
      'Não declarar uso de órteses, cadeira de rodas, ventilação não-invasiva',
      'CadÚnico em nome da pessoa com distrofia (precisa ser do responsável em menores)',
    ],
    recurso: 'Distrofia muscular com diagnóstico genético confirmado é praticamente irrecorrível negar. Quando há negativa, é por questões de renda.',
    relacionadas: ['EL', 'PCx', 'SD'],
  },
};

const PATOLOGIA_DEFAULT = {
  legalBase: 'Lei 8.742/1993 (LOAS)',
  minIdade: 'Qualquer',
  duracao: '2 anos (mínimo)',
  o_que_e: [
    'Esta patologia se caracteriza por impedimentos de longo prazo de natureza física, mental, intelectual ou sensorial, que em interação com diversas barreiras podem obstruir a participação plena e efetiva da pessoa na sociedade em igualdade de condições com as demais.',
    'O reconhecimento do direito ao BPC depende de avaliação médica e social específica, conduzida pelo INSS.',
  ],
  legislacao: {
    titulo: 'Lei Orgânica da Assistência Social (LOAS)',
    texto: 'A Lei 8.742/1993 garante o BPC à pessoa com deficiência cujo impedimento tem duração mínima de 2 anos, comprovado por perícia, e cuja renda familiar per capita seja inferior a ¼ do salário mínimo.',
    destaque: 'O BPC é direito constitucional — não favor. Não exige contribuição prévia.',
  },
  docs: [
    { tit: 'Laudo médico atualizado com CID', desc: 'Últimos 6 meses, com descrição do impacto funcional.' },
    { tit: 'Exames complementares', desc: 'Que comprovem o diagnóstico e o estágio da doença.' },
    { tit: 'Relatórios de outros profissionais', desc: 'Fisioterapeuta, fonoaudiólogo, psicólogo (quando aplicável).' },
    { tit: 'CadÚnico da família atualizado', desc: 'Em nome de um dos integrantes.' },
    { tit: 'Comprovantes de renda', desc: 'De todos os que moram na mesma casa.' },
  ],
  pericia: [
    'A perícia do INSS avalia o impacto funcional da doença na vida diária — não apenas o diagnóstico.',
    'Vale a pena se preparar: descrever rotina, dificuldades, dependência de outras pessoas para tarefas básicas.',
  ],
  erros: [
    'Levar laudo antigo (mais de 6 meses)',
    'CadÚnico desatualizado ou em nome de outra pessoa',
    'Omitir renda informal',
    'Não levar relatórios de outros profissionais',
  ],
  recurso: 'Em caso de negativa, cabe recurso administrativo em 30 dias. Se negado novamente, ação judicial. Muitos casos são revertidos com documentação reforçada.',
  relacionadas: [],
};

/* ---------- Patologia detail ---------- */
function ScreenPatologia({ patologia, onNavigate }) {
  const p = patologia || PATOLOGIAS.find(x => x.sigla === 'TEA') || PATOLOGIAS[0];
  const d = PATOLOGIA_DETAIL[p.sigla] || PATOLOGIA_DEFAULT;
  const cat = CATEGORIAS[p.cat] || CATEGORIAS.cronica;
  const relacionadas = (d.relacionadas || []).map(s => PATOLOGIAS.find(x => x.sigla === s)).filter(Boolean);

  return (
    <section className="hero" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="breadcrumb">
          <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Início</a>
          <span className="sep">/</span>
          <a href="#patologias" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('patologias')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Patologias</a>
          <span className="sep">/</span>
          <span>{p.nome}</span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: cat.bg, color: cat.fg, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: cat.dot }} />
          {cat.label}
        </div>

        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', marginBottom: 20, maxWidth: 900 }}>
          {p.nome}<span style={{ color: 'var(--terra-500)' }}>.</span>
        </h1>
        <p className="lead" style={{ marginBottom: 56, color: 'var(--ink-500)', maxWidth: 720 }}>{p.resumo}</p>

        {/* Quick facts row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 72 }}>
          <FactCard kicker="Base legal" valor={d.legalBase} />
          <FactCard kicker="Idade mínima" valor={d.minIdade} />
          <FactCard kicker="Duração do quadro" valor={d.duracao} />
        </div>
      </div>

      {/* Two-column content area */}
      <div className="container patologia-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 64, alignItems: 'flex-start' }}>
        <article style={{ minWidth: 0 }}>
          {/* O que é */}
          <section style={{ marginBottom: 64 }} id="o-que-e">
            <div className="eyebrow">Definição</div>
            <h2>O que é</h2>
            {d.o_que_e.map((t, i) => <p key={i} style={{ fontSize: 18, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t }} />)}
          </section>

          {/* Legislação */}
          <section style={{ marginBottom: 64 }} id="legislacao">
            <div className="eyebrow">Base legal</div>
            <h2>{d.legislacao.titulo}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: d.legislacao.texto }} />
            <div style={{ marginTop: 24, padding: '24px 28px', background: 'var(--terra-900)', borderLeft: '4px solid var(--terra-500)', borderRadius: '4px 16px 16px 4px' }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Em uma frase</div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontStyle: 'italic', color: 'var(--ink-900)', margin: 0, lineHeight: 1.4 }}>
                "{d.legislacao.destaque}"
              </p>
            </div>
          </section>

          {/* Documentos */}
          <section style={{ marginBottom: 64 }} id="documentos">
            <div className="eyebrow">Documentação</div>
            <h2>O que você precisa juntar</h2>
            <p style={{ fontSize: 17, color: 'var(--ink-500)', marginBottom: 28 }}>A documentação certa é o que faz diferença entre o BPC aprovado na primeira tentativa e o BPC negado.</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {d.docs.map((doc, i) => (
                <li key={i} style={{ display: 'flex', gap: 18, padding: '20px 0', borderTop: '1px solid var(--line)' }}>
                  <div style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: 'var(--terra-100)', color: 'var(--terra-700)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: 17, fontFamily: 'var(--font-sans)', color: 'var(--ink-900)' }}>{doc.tit}</h4>
                    <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-500)', lineHeight: 1.5 }}>{doc.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Perícia */}
          <section style={{ marginBottom: 64 }} id="pericia">
            <div className="eyebrow">Perícia médica e social</div>
            <h2>Como o INSS vai te avaliar</h2>
            {d.pericia.map((t, i) => <p key={i} style={{ fontSize: 18, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t }} />)}
          </section>

          {/* Erros */}
          <section style={{ marginBottom: 64 }} id="erros">
            <div className="eyebrow">Atenção</div>
            <h2>Erros que <em>derrubam</em> o pedido</h2>
            <div style={{ background: 'var(--err-bg)', borderRadius: 16, padding: '24px 28px' }}>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {d.erros.map((e, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', fontSize: 17, color: 'var(--ink-900)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--err)', fontWeight: 700, flex: 'none' }}>✕</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recurso */}
          <section style={{ marginBottom: 64 }} id="recurso">
            <div className="eyebrow">Negativa do INSS</div>
            <h2>Se o pedido for negado</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: d.recurso }} />
          </section>

          {/* Patologias relacionadas */}
          {relacionadas.length > 0 && (
            <section style={{ marginBottom: 64 }}>
              <div className="eyebrow">Relacionadas</div>
              <h2>Outras patologias semelhantes</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
                {relacionadas.map(r => {
                  const rcat = CATEGORIAS[r.cat];
                  return (
                    <a key={r.sigla} className="pat-card" href={`#/patologia/${r.sigla}`} onClick={(e) => { e.preventDefault(); onNavigate('patologia', r); }}>
                      <div className="ic" style={{ background: rcat.bg, color: rcat.fg }}>{r.sigla}</div>
                      <h4>{r.nome}</h4>
                      <p>{r.resumo}</p>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        {/* Side TOC */}
        <aside style={{ position: 'sticky', top: 'calc(var(--header-h) + 32px)', alignSelf: 'flex-start' }}>
          <div style={{ padding: '20px 22px', background: 'var(--bone)', border: '1px solid var(--line)', borderRadius: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Nesta página</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['o-que-e', 'O que é'],
                ['legislacao', 'Base legal'],
                ['documentos', 'Documentos'],
                ['pericia', 'Perícia INSS'],
                ['erros', 'Erros comuns'],
                ['recurso', 'Se for negado'],
              ].map(([id, lbl]) => (
                <li key={id}>
                  <a href={`#${id}`} style={{ fontSize: 15, color: 'var(--ink-700)', textDecoration: 'none', display: 'block', padding: '6px 0' }}>{lbl}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 16, padding: '24px 22px', background: 'var(--terra-500)', borderRadius: 16, color: '#fff' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.2, fontWeight: 600, marginBottom: 10 }}>Conversar é grátis.</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, margin: '0 0 16px 0' }}>Nossa equipe analisa seu caso e tira dúvidas pelo WhatsApp.</p>
            <a className="btn" style={{ background: '#fff', color: 'var(--terra-700)', width: '100%', justifyContent: 'center' }} href="https://wa.me/5521964238080">Falar agora →</a>
          </div>
        </aside>
      </div>

      {/* Bottom CTA */}
      <div className="container" style={{ marginTop: 96 }}>
        <div className="cta-banner">
          <div>
            <h2>Quer entender se você se enquadra <em>no seu caso</em>?</h2>
            <p>Análise gratuita pela nossa equipe.</p>
          </div>
          <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080">Falar no WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function FactCard({ kicker, valor }) {
  return (
    <div style={{ padding: '20px 22px', background: 'var(--bone)', borderRadius: 16, border: '1px solid var(--line)' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{kicker}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--ink-900)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{valor}</div>
    </div>
  );
}

/* ---------- Simulador ---------- */
function ScreenSimulador({ onNavigate }) {
  const [step, setStep] = useStateS(0);
  const [answers, setAnswers] = useStateS({});

  const steps = [
    {
      q: 'Para quem é o benefício?',
      key: 'quem',
      opts: [
        { v: 'idoso', l: 'Para um idoso (65 anos ou mais)' },
        { v: 'pcd', l: 'Para uma pessoa com deficiência' },
        { v: 'nao_sei', l: 'Não tenho certeza' },
      ],
    },
    {
      q: 'A pessoa já recebe outro benefício do INSS?',
      key: 'outro_bnf',
      opts: [
        { v: 'nao', l: 'Não recebe nada do INSS' },
        { v: 'sim', l: 'Recebe (aposentadoria, pensão, etc)' },
        { v: 'nao_sei', l: 'Não sei dizer' },
      ],
    },
    {
      q: 'Qual a renda total da família por mês?',
      key: 'renda',
      opts: [
        { v: 'ate_353', l: 'Menos de R$ 353 por pessoa' },
        { v: 'ate_700', l: 'Entre R$ 353 e R$ 700 por pessoa' },
        { v: 'mais', l: 'Mais de R$ 700 por pessoa' },
      ],
    },
    {
      q: 'O CadÚnico da família está atualizado?',
      key: 'cad',
      opts: [
        { v: 'sim', l: 'Sim, atualizado nos últimos 2 anos' },
        { v: 'desatualizado', l: 'Está desatualizado' },
        { v: 'nao_sei', l: 'Não sei / não tem CadÚnico' },
      ],
    },
  ];

  if (step >= steps.length) {
    // Result screen
    const elegivel = answers.quem !== undefined && answers.outro_bnf === 'nao' && answers.renda === 'ate_353';
    return (
      <section className="hero" style={{ paddingBottom: 96 }}>
        <div className="container-narrow">
          <div className="wizard">
            <div className="wizard-steps">
              {steps.map((_, i) => <div key={i} className="wizard-step done"></div>)}
            </div>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              {elegivel ? (
                <>
                  <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--ok-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 36 }}>✓</div>
                  <div className="eyebrow" style={{ justifyContent: 'center' }}>Resultado da análise</div>
                  <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>Você <em>pode</em> ter direito ao BPC.</h1>
                  <p className="lead" style={{ color: 'var(--ink-500)', marginBottom: 32 }}>
                    Suas respostas indicam que os requisitos básicos podem estar preenchidos. O próximo passo é a documentação.
                  </p>
                </>
              ) : (
                <>
                  <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--warn-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 36 }}>?</div>
                  <div className="eyebrow" style={{ justifyContent: 'center' }}>Resultado da análise</div>
                  <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>Seu caso exige <em>análise</em>.</h1>
                  <p className="lead" style={{ color: 'var(--ink-500)', marginBottom: 32 }}>
                    Algumas das suas respostas indicam pontos que precisam ser olhados de perto. Vale uma conversa.
                  </p>
                </>
              )}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080">Falar com nossa equipe</a>
                <button className="btn btn--secondary btn--lg" onClick={() => { setStep(0); setAnswers({}); }}>Refazer simulação</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const cur = steps[step];

  return (
    <section className="hero" style={{ paddingBottom: 96 }}>
      <div className="container-narrow">
        <div className="wizard">
          <div className="wizard-steps">
            {steps.map((_, i) => (
              <div key={i} className={`wizard-step ${i < step ? 'done' : i === step ? 'active' : ''}`}></div>
            ))}
          </div>
          <div className="eyebrow">Simulador · passo {step + 1} de {steps.length}</div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 32 }}>{cur.q}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {cur.opts.map(o => (
              <button
                key={o.v}
                className="btn btn--secondary"
                style={{ justifyContent: 'flex-start', padding: '18px 22px', fontSize: 17, textAlign: 'left' }}
                onClick={() => { setAnswers({ ...answers, [cur.key]: o.v }); setStep(step + 1); }}
              >
                {o.l}
              </button>
            ))}
          </div>
          <button className="btn btn--ghost" onClick={() => { if (step > 0) setStep(step - 1); else onNavigate('home'); }}>
            ← {step === 0 ? 'Voltar ao início' : 'Pergunta anterior'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog index ---------- */
function ScreenBlog() {
  const posts = [
    { cat: 'BPC Idoso', titulo: 'Como dar entrada no BPC sem sair de casa', desc: 'Passo a passo do pedido pelo Meu INSS.', date: '12 mai 2026' },
    { cat: 'Recurso', titulo: 'INSS negou? Veja os 4 motivos mais comuns', desc: 'O que fazer quando o benefício é indeferido.', date: '08 mai 2026' },
    { cat: 'Documentos', titulo: 'CadÚnico atualizado: por que é tão importante', desc: 'Sem CadÚnico em dia, o BPC pode ser bloqueado.', date: '02 mai 2026' },
    { cat: 'BPC PcD', titulo: 'Lei Berenice Piana e o BPC para autistas', desc: 'O que diz a lei e como aplicar no seu caso.', date: '28 abr 2026' },
    { cat: 'Renda', titulo: 'Como calcular a renda per capita corretamente', desc: 'Erros comuns que levam à negativa.', date: '20 abr 2026' },
    { cat: 'Perícia', titulo: 'Perícia médica do INSS: como se preparar', desc: 'Documentos, laudos e o que dizer ao perito.', date: '12 abr 2026' },
  ];
  return (
    <section className="hero" style={{ paddingBottom: 96 }}>
      <div className="container">
        <div className="eyebrow">Blog</div>
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: 16 }}>Conteúdo que <em>esclarece</em>.</h1>
        <p className="lead" style={{ color: 'var(--ink-500)', marginBottom: 56, maxWidth: 600 }}>
          Artigos técnicos sobre BPC/LOAS, em linguagem acessível.
        </p>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <a key={i} className="blog-card" href={`#/blog/${i}`}>
              <div className="blog-thumb"></div>
              <div className="body">
                <div className="cat">{p.cat} · {p.date}</div>
                <h4>{p.titulo}</h4>
                <p>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ScreenLanding, ScreenPatologia, ScreenSimulador, ScreenBlog });

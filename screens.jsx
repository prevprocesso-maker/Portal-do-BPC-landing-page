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
      <RecursosDestaque onNavigate={onNavigate} />
      <SobrePortal />
      <NossoEscritorio />
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
      'A avaliação no INSS para BPC deficiente tem duas etapas: <strong>perícia médica</strong> (avalia o impedimento) e <strong>avaliação social</strong> (avalia as barreiras na vida diária).',
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
      texto: 'Se a pessoa tem 65 anos ou mais, vale a pena pedir <strong>BPC do Idoso</strong> — exige apenas idade + renda, sem perícia médica de incapacidade. Se for mais nova (Alzheimer precoce, antes dos 65), entra-se com <strong>BPC deficiente</strong>, que exige a perícia. Os dois benefícios têm o mesmo valor e mesmas regras de renda.',
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
      'Em Alzheimer precoce (BPC deficiente), a avaliação foca na capacidade cognitiva e na dependência de terceiros.',
      'Leve sempre <strong>um acompanhante</strong> que conheça bem a rotina. O perito vai perguntar coisas que o próprio paciente não conseguirá responder.',
    ],
    erros: [
      'Insistir em BPC deficiente quando o idoso já tem 65+ — perde tempo',
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
            <a className="btn btn--lg" style={{ background: '#25D366', color: '#fff', width: '100%', justifyContent: 'center', boxShadow: '0 6px 20px rgba(37, 211, 102, 0.28)' }} href="https://wa.me/5521964238080">Falar agora →</a>
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
const SIM_QUEM_LABEL = {
  idoso: 'Idoso (65 anos ou mais)',
  pcd: 'Pessoa com deficiência',
  estrangeiro: 'Estrangeiro residente no Brasil',
  pente_fino_user: 'Beneficiário em pente fino (revisão)',
};
const SIM_SITUACAO_LABEL = {
  nunca: 'Nunca deu entrada no BPC',
  negado: 'Deu entrada e foi negado (cabe recurso)',
  pente_fino: 'Já recebia e caiu no pente fino (revisão)',
};
const SIM_BENEFICIO_LABEL = {
  nao: 'Não recebe nenhum benefício',
  sim_inss: 'Já recebe benefício do INSS (aposentadoria, pensão, auxílio)',
  sim_outro: 'Recebe outro benefício do governo (não Bolsa Família)',
  bolsa: 'Recebe apenas Bolsa Família',
};
const SIM_CAD_LABEL = {
  sim: 'Atualizado nos últimos 2 anos',
  desatualizado: 'Desatualizado (mais de 2 anos)',
  nao: 'Não tenho / não sei',
};
const SALARIO_MIN_2026 = 1621;
const TETO_FAMILIAR = SALARIO_MIN_2026; // R$ 1.621 — limite máximo de renda familiar total
const TETO_PER_CAPITA = SALARIO_MIN_2026 / 4; // R$ 405,25 — limite legal estrito (¼ do salário mínimo)

function fmtBR(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const SIM_ICONS = {
  idoso: '<path d="M11 7a3 3 0 100-6 3 3 0 000 6z"/><path d="M8 22v-6l-2-2 1-5a3 3 0 013-2 3 3 0 013 2"/><path d="M14 9v13M14 13h3"/>',
  pcd: '<circle cx="12" cy="4" r="2"/><path d="M12 6v8h5l3 5"/><path d="M12 14a6 6 0 11-5 9"/>',
  estr: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  pente: '<path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 4v4h-4"/>',
  doc: '<path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M8 13h8M8 17h6"/>',
  alert: '<path d="M10.3 3.3 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.3 3.3a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  refresh: '<path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 4v4h-4"/>',
  no: '<circle cx="12" cy="12" r="9"/><path d="M9 12h6"/>',
  gov: '<path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"/>',
  bolsa: '<path d="M6 8h12l1 12H5z"/><path d="M9 8a3 3 0 016 0"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0012 6 4.5 4.5 0 002 8.5C2 12 5.5 15 12 21c2-1.8 3.7-3.3 5-4.7"/>'
};
function SimIc({ d }) { return <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: d }} />; }
const SIM_CHOICE = {
  quem: { q: 'Para quem é o benefício?', sub: 'O BPC/LOAS atende estes casos. Qual é o seu?', opts: [
    { v: 'idoso', ic: 'idoso', l: 'Idoso (65 anos ou mais)', d: 'Baixa renda, sem aposentadoria' },
    { v: 'pcd', ic: 'pcd', l: 'Pessoa com deficiência', d: 'De qualquer idade, inclusive crianças' },
    { v: 'estrangeiro', ic: 'estr', l: 'Estrangeiro residente no Brasil', d: 'Naturalizado, refugiado ou com residência permanente' },
    { v: 'pente_fino_user', ic: 'pente', l: 'Já recebia e foi suspenso ou cessado', d: 'Pente fino, revisão, aumento de renda ou CadÚnico desatualizado' }
  ]},
  situacao: { q: 'Qual a situação hoje?', sub: 'Isso muda completamente o caminho a seguir.', opts: [
    { v: 'nunca', ic: 'doc', l: 'Nunca dei entrada no BPC', d: 'Quero pedir pela primeira vez' },
    { v: 'negado', ic: 'alert', l: 'Dei entrada e foi negado', d: 'Cabe recurso administrativo ou judicial' },
    { v: 'pente_fino', ic: 'refresh', l: 'Já recebia e caiu no pente fino', d: 'Benefício suspenso/cessado em revisão' }
  ]},
  ja_recebe: { q: 'A pessoa já recebe algum benefício?', sub: 'O BPC não acumula com aposentadoria, pensão ou auxílio do INSS. Bolsa Família pode somar.', opts: [
    { v: 'nao', ic: 'no', l: 'Não recebe nada', d: 'Pode pedir o BPC' },
    { v: 'bolsa', ic: 'bolsa', l: 'Apenas Bolsa Família', d: 'Não impede o BPC' },
    { v: 'sim_inss', ic: 'gov', l: 'Aposentadoria, pensão ou auxílio do INSS', d: 'Em regra não cabe — mas vale conversar' },
    { v: 'sim_outro', ic: 'info', l: 'Outro benefício do governo', d: 'Vamos analisar caso a caso' }
  ]},
  cad: { q: 'O CadÚnico da família está atualizado?', sub: 'Sem CadÚnico em dia, o BPC não sai (ou pode ser bloqueado).', opts: [
    { v: 'sim', ic: 'ok', l: 'Sim, atualizado nos últimos 2 anos' },
    { v: 'desatualizado', ic: 'clock', l: 'Está desatualizado (mais de 2 anos)' },
    { v: 'nao', ic: 'info', l: 'Não tenho CadÚnico / não sei' }
  ]}
};
const SIM_EYEBROW = { quem: 'Quem vai receber', situacao: 'A sua situação', ja_recebe: 'Benefícios atuais', patologia: 'A condição', pessoas_casa: 'A sua família', renda_total: 'A renda da casa', cad: 'CadÚnico' };

function ScreenSimulador({ onNavigate }) {
  const [step, setStep] = useStateS(0);
  const [answers, setAnswers] = useStateS({ quem: null, situacao: null, ja_recebe: null, patologia: null, pessoas_casa: 1, renda_total: '', cad: null, nome: '', sobrenome: '', relato: '' });

  const steps = [{ kind: 'choice', key: 'quem' }];
  if (answers.quem !== 'pente_fino_user') { steps.push({ kind: 'choice', key: 'situacao' }); steps.push({ kind: 'choice', key: 'ja_recebe' }); }
  const pulaPat = answers.quem === 'idoso' || answers.quem === 'estrangeiro' || answers.quem === 'pente_fino_user' || answers.situacao === 'pente_fino';
  if (answers.quem === 'pcd' && !pulaPat) steps.push({ kind: 'patologia', key: 'patologia' });
  steps.push({ kind: 'pessoas', key: 'pessoas_casa' });
  steps.push({ kind: 'renda', key: 'renda_total' });
  steps.push({ kind: 'choice', key: 'cad' });
  steps.push({ kind: 'contato', key: 'contato' });
  const idx = Math.min(step, steps.length - 1);
  const cur = steps[idx];

  const set = (k, v) => setAnswers(a => ({ ...a, [k]: v }));
  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => { if (step > 0) setStep(s => s - 1); else onNavigate('home'); };
  const pick = (key, val) => {
    if (key === 'quem' && val === 'pente_fino_user') setAnswers(a => ({ ...a, quem: val, situacao: 'pente_fino' }));
    else set(key, val);
    next();
  };

  const rendaCents = parseInt(String(answers.renda_total).replace(/\D/g, ''), 10) || 0;
  const renda = rendaCents / 100;
  const pessoas = Math.max(1, Number(answers.pessoas_casa) || 1);
  const perCapita = renda / pessoas;
  const recebeOutro = answers.ja_recebe === 'sim_inss' || answers.ja_recebe === 'sim_outro';
  const soft = renda > 0 && renda <= TETO_FAMILIAR && !recebeOutro;

  const reassure = (() => {
    const k = cur.key;
    if (k === 'quem') return 'Vamos descobrir <span class="em">juntos</span> se você tem direito. É rápido e gratuito.';
    if (k === 'situacao') return 'Cada situação tem um caminho. Vou te mostrar <span class="em">o seu</span>.';
    if (k === 'ja_recebe') return 'Sem pressa. Responda com <span class="em">calma</span>.';
    if (k === 'patologia') return 'Não precisa de termo técnico — escolha o que <span class="em">mais se parece</span>.';
    if (k === 'pessoas_casa') return 'Estamos <span class="em">quase lá</span>.';
    if (k === 'renda_total') return 'Esse é o ponto que mais gera dúvida. <span class="em">Eu te ajudo</span>.';
    if (k === 'cad') return 'Última informação importante.';
    if (k === 'contato') {
      if (answers.situacao === 'negado') return 'Uma negativa <span class="em">não é o fim</span>. Vamos olhar o seu caso.';
      if (answers.quem === 'pente_fino_user' || answers.situacao === 'pente_fino') return 'Vamos <span class="em">recuperar</span> o que é seu.';
      return 'Pronto. Vou <span class="em">preparar seu atendimento</span>.';
    }
    return '';
  })();

  const buildWhatsAppUrl = () => {
    const nomeCompleto = `${answers.nome || ''} ${answers.sobrenome || ''}`.trim();
    const L = [`Olá! Sou ${nomeCompleto || '[nome]'}, vim pelo Portal do BPC.`, '', '📋 *Resumo do meu caso:*',
      `• Beneficiário: ${SIM_QUEM_LABEL[answers.quem] || '—'}`, `• Situação: ${SIM_SITUACAO_LABEL[answers.situacao] || '—'}`];
    if (answers.ja_recebe) L.push(`• Benefício atual: ${SIM_BENEFICIO_LABEL[answers.ja_recebe] || '—'}`);
    if (answers.patologia) L.push(`• Condição: ${answers.patologia}`);
    L.push(`• Pessoas em casa: ${pessoas}`);
    if (renda > 0) L.push(`• Renda familiar: R$ ${fmtBR(renda)}/mês (R$ ${fmtBR(perCapita)} por pessoa)`);
    L.push(`• CadÚnico: ${SIM_CAD_LABEL[answers.cad] || '—'}`);
    if ((answers.relato || '').trim()) { L.push('', '🗒️ *Nas minhas palavras:*', answers.relato.trim()); }
    L.push('', 'Gostaria de conversar sobre o meu caso.');
    return `https://wa.me/5521964238080?text=${encodeURIComponent(L.join('\n'))}`;
  };

  const eyebrow = SIM_EYEBROW[cur.key] || 'Simulação';

  const renderChoice = () => {
    const cfg = SIM_CHOICE[cur.key];
    return (
      <>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="q">{cfg.q}</h1>
        {cfg.sub && <p className="q-sub">{cfg.sub}</p>}
        <div className="opts">
          {cfg.opts.map(o => (
            <button key={o.v} className="opt" onClick={() => pick(cur.key, o.v)}>
              <span className="ic"><SimIc d={SIM_ICONS[o.ic]} /></span>
              <span className="tx"><b>{o.l}</b>{o.d && <small>{o.d}</small>}</span>
              <span className="arrow">→</span>
            </button>
          ))}
        </div>
      </>
    );
  };

  const renderPatologia = () => {
    const cats = ['desenv', 'neuro', 'mental', 'sensorial', 'onco', 'cronica'];
    return (
      <>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="q">Qual é a condição principal?</h1>
        <p className="q-sub">Se houver mais de uma, escolha a mais grave — a gente detalha depois.</p>
        <div className="opts">
          {cats.map(c => {
            const lista = PATOLOGIAS.filter(p => p.cat === c);
            if (lista.length === 0) return null;
            const cat = CATEGORIAS[c];
            return (
              <div key={c}>
                <div className="opt-group" style={{ color: cat.fg }}>{cat.label}</div>
                {lista.map(p => (
                  <button key={p.sigla} className="opt" onClick={() => { set('patologia', p.nome); next(); }}>
                    <span className="tx"><b>{p.nome}</b></span><span className="arrow">→</span>
                  </button>
                ))}
              </div>
            );
          })}
          <div className="opt-group">Outra</div>
          <button className="opt" onClick={() => { set('patologia', 'Outra (a detalhar)'); next(); }}>
            <span className="tx"><b>Outra condição</b><small>Vou detalhar pelo WhatsApp</small></span><span className="arrow">→</span>
          </button>
        </div>
      </>
    );
  };

  const renderPessoas = () => {
    const v = Math.max(1, Number(answers.pessoas_casa) || 1);
    return (
      <>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="q">Quantas pessoas moram na casa?</h1>
        <p className="q-sub">Conte todo mundo que mora junto — cônjuge, filhos, pais, irmãos. <strong>Inclua a própria pessoa que vai receber.</strong></p>
        <div className="stepper">
          <button onClick={() => set('pessoas_casa', Math.max(1, v - 1))} disabled={v <= 1} aria-label="Diminuir">−</button>
          <div className="val"><div className="n">{v}</div><div className="u">{v === 1 ? 'pessoa' : 'pessoas'}</div></div>
          <button onClick={() => set('pessoas_casa', Math.min(15, v + 1))} disabled={v >= 15} aria-label="Aumentar">+</button>
        </div>
        <button className="btn btn--primary" onClick={next}>Continuar →</button>
      </>
    );
  };

  const renderRenda = () => {
    const digits = String(answers.renda_total ?? '').replace(/\D/g, '');
    const cents = digits === '' ? 0 : parseInt(digits, 10);
    const numv = cents / 100;
    const display = digits === '' ? '' : numv.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pc = numv / pessoas;
    let fb = null;
    if (numv <= 0) fb = <div className="feedback neutral"><SimIc d={SIM_ICONS.info} /><span>Some tudo que entra na casa por mês. Bolsa Família não conta.</span></div>;
    else if (pc <= TETO_PER_CAPITA) fb = <div className="feedback ok"><SimIc d={SIM_ICONS.ok} /><span>R$ {fmtBR(pc)} por pessoa — <b>dentro do critério legal</b> (¼ do salário). Ótimo sinal.</span></div>;
    else if (numv <= TETO_FAMILIAR) fb = <div className="feedback warn"><SimIc d={SIM_ICONS.alert} /><span>R$ {fmtBR(pc)} por pessoa fica acima do critério estrito, <b>mas há jurisprudência</b> que amplia o limite. Vale analisar.</span></div>;
    else fb = <div className="feedback warn"><SimIc d={SIM_ICONS.alert} /><span>Renda acima de 1 salário mínimo — mas gastos com <b>saúde e deficiência</b> podem ser descontados. Não desista sem conversar.</span></div>;
    return (
      <>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="q">Qual a renda total da família?</h1>
        <p className="q-sub">Salários, aposentadorias, pensões, bicos. <strong>Não</strong> some Bolsa Família.</p>
        <div className="field">
          <label>Renda somada por mês</label>
          <div className="money"><span className="cur">R$</span>
            <input inputMode="numeric" placeholder="0,00" value={display} onChange={e => set('renda_total', e.target.value.replace(/\D/g, '').slice(0, 9))} autoFocus />
          </div>
          {fb}
        </div>
        <button className="btn btn--primary mt" onClick={next} disabled={numv <= 0}>Continuar →</button>
      </>
    );
  };

  const recapLine = (k, val) => (<div className="rl"><span>{k}</span><b>{val || '—'}</b></div>);

  const renderContato = () => {
    const ready = (answers.nome || '').trim().length >= 2;
    const first = (answers.nome || '').trim().split(' ')[0];
    return (
      <>
        <div className="eyebrow">Quase lá — só falta você</div>
        <h1 className="q">{ready ? `Prazer, ${first}!` : 'Como podemos te chamar?'}</h1>
        <p className="q-sub">
          {soft ? <>Pelo que você me contou, <span style={{ color: 'var(--terra-300)' }}>vale muito a pena dar entrada</span>.</>
                : <>Mesmo com pontos de atenção, <span style={{ color: 'var(--terra-300)' }}>o seu caso merece ser analisado</span>.</>} Deixe seu nome e eu preparo seu atendimento já com o resumo.
        </p>
        <div className="row2">
          <input className="inp" placeholder="Nome" value={answers.nome} onChange={e => set('nome', e.target.value)} />
          <input className="inp" placeholder="Sobrenome" value={answers.sobrenome} onChange={e => set('sobrenome', e.target.value)} />
        </div>
        <div className="note-wrap">
          <label className="note-label" htmlFor="sim-relato">✍️ Escreva aqui, com suas palavras, o que você está vivendo <span>(opcional — mas ajuda muito)</span></label>
          <textarea className="note" id="sim-relato" placeholder="Escreva aqui... Ex.: Cuido sozinha do meu filho com autismo e não consigo trabalhar. Já tentei dar entrada e não sei o que fazer." value={answers.relato} onChange={e => set('relato', e.target.value)} />
        </div>
        <div className="res-recap">
          {recapLine('Beneficiário', SIM_QUEM_LABEL[answers.quem])}
          {recapLine('Situação', SIM_SITUACAO_LABEL[answers.situacao])}
          {answers.patologia && recapLine('Condição', answers.patologia)}
          {recapLine('Pessoas em casa', String(pessoas))}
          {renda > 0 && recapLine('Renda por pessoa', `R$ ${fmtBR(perCapita)}`)}
          {recapLine('CadÚnico', SIM_CAD_LABEL[answers.cad])}
        </div>
        <a className="btn btn--wa" href={ready ? buildWhatsAppUrl() : '#'} target="_blank" rel="noopener noreferrer"
           onClick={e => { if (!ready) e.preventDefault(); }} style={{ opacity: ready ? 1 : 0.5, pointerEvents: ready ? 'auto' : 'none' }}>
          <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.087zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          Falar com a equipe no WhatsApp
        </a>
      </>
    );
  };

  return (
    <section className="sim2">
      <div className="card">
        <aside className="support">
          <div className="who">
            <span className="av" aria-hidden="true"></span>
            <span><span className="nm">Carlos Costa</span><span className="rl">Especialista previdenciário</span></span>
          </div>
          <p className="reassure" dangerouslySetInnerHTML={{ __html: reassure }}></p>
          <div className="pbar-wrap">
            <div className="pbar-label">Passo {idx + 1} de {steps.length}</div>
            <div className="pbar">{steps.map((_, i) => <span key={i} className={i <= step ? 'on' : ''}></span>)}</div>
          </div>
          <div className="trust"><b>Gratuito</b> <span className="sep">·</span> <b>Sigiloso</b> <span className="sep">·</span> <b>Sem compromisso</b></div>
        </aside>
        <main className="panel">
          <button className="back" onClick={back}>{step === 0 ? '← Voltar ao site' : '← Voltar'}</button>
          <div className="view" key={step}>
            {cur.kind === 'choice' && renderChoice()}
            {cur.kind === 'patologia' && renderPatologia()}
            {cur.kind === 'pessoas' && renderPessoas()}
            {cur.kind === 'renda' && renderRenda()}
            {cur.kind === 'contato' && renderContato()}
          </div>
        </main>
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
    { cat: 'BPC deficiente', titulo: 'Lei Berenice Piana e o BPC para autistas', desc: 'O que diz a lei e como aplicar no seu caso.', date: '28 abr 2026' },
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

/* ========================================================
   ScreenPericias — perícia médica e social com lead-gate
   ======================================================== */
function ScreenPericias({ onNavigate }) {
  const [tab, setTab] = useStateS('medica');
  const [form, setForm] = useStateS({ nome: '', whatsapp: '', open: false });

  // formatar telefone (21) 96423-8080
  const formatPhone = (raw) => {
    const d = raw.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  };

  const phoneDigits = form.whatsapp.replace(/\D/g, '');
  const isValid = form.nome.trim().length >= 3 && phoneDigits.length >= 10;

  const submitGate = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Open WhatsApp pre-filled lead + checklist in new tab
    const msg = encodeURIComponent(
      `Olá! Sou ${form.nome.trim()}, baixei o checklist da perícia BPC no site. Gostaria de orientação sobre o meu caso.`
    );
    window.open('checklist-pericia.html', '_blank', 'noopener');
    setTimeout(() => {
      window.open(`https://wa.me/5521964238080?text=${msg}`, '_blank', 'noopener');
    }, 400);
    setForm({ nome: '', whatsapp: '', open: false });
  };

  /* ----- conteúdo das abas ----- */
  const TAB_DATA = {
    medica: {
      label: 'Perícia médica',
      kicker: 'Avalia clinicamente a deficiência ou condição',
      passos: [
        { n: '01', t: 'Agendamento', d: 'Pelo app Meu INSS ou ligando 135. Em algumas situações é automático após o requerimento.' },
        { n: '02', t: 'Comparecimento', d: 'Na agência marcada, com 30min de antecedência. Em casos de imobilidade, perícia domiciliar.' },
        { n: '03', t: 'Avaliação', d: 'Em média 15 minutos. O perito lê laudos, faz exame físico e perguntas sobre a rotina.' },
        { n: '04', t: 'Resultado', d: 'Disponível em 5 a 30 dias no Meu INSS — conceder, indeferir ou exigir mais exames.' },
      ],
      docsTitle: 'Documentos essenciais para levar',
      docs: [
        { t: 'Documento de identidade com foto', n: 'RG, CNH ou CTPS.' },
        { t: 'CPF', n: 'Pode ser o digital pelo gov.br.' },
        { t: 'Comprovante de residência', n: 'Atualizado (90 dias).' },
        { t: 'Agendamento impresso ou no celular', n: 'Sem isso, em algumas agências você é mandado embora.' },
        { t: 'Laudo médico atualizado (90 dias)', n: 'Com CID, prognóstico, tempo de tratamento.' },
        { t: 'Receituários dos últimos 6 meses', n: 'Mostram que o tratamento é contínuo.' },
        { t: 'Exames complementares', n: 'Laboratoriais, imagem, biópsias.' },
        { t: 'Relatórios de internação', n: 'Se houver.' },
        { t: 'Caixa ou foto dos medicamentos', n: 'A complexidade do tratamento fala por si.' },
        { t: 'Equipamentos de apoio', n: 'Cadeira de rodas, bengala, andador — leve no dia.' },
      ],
      dicasTitle: 'Como se comportar',
      dicas: [
        { n: '01', t: 'Não minimize sua condição', d: 'Descreva a PIOR fase, não o melhor dia. "Estou bem hoje" derruba o pedido.' },
        { n: '02', t: 'Mostre os medicamentos', d: 'Caixas, receitas, frequência. Visual é poderoso.' },
        { n: '03', t: 'Descreva a rotina', d: 'Quem ajuda, o que você não consegue fazer sozinho.' },
        { n: '04', t: 'Use os equipamentos', d: 'Se usa bengala, vá com bengala. Não dispense em hipótese alguma.' },
        { n: '05', t: 'Roupas confortáveis', d: 'Que permitam mostrar limitações (subir manga, agachar).' },
        { n: '06', t: 'Acompanhante', d: 'Direito garantido por lei para idoso 60+ e deficiente. Use.' },
      ],
    },
    social: {
      label: 'Perícia social',
      kicker: 'Só para deficiente — avalia o impacto da deficiência no dia a dia',
      passos: [
        { n: '01', t: 'Agendamento', d: 'Costuma vir junto com a médica, ou em momento separado, conforme a agência.' },
        { n: '02', t: 'Entrevista', d: 'Com assistente social do INSS. Pode ser na agência ou visita domiciliar.' },
        { n: '03', t: 'Avaliação social', d: 'Perguntas sobre família, renda, cuidados, barreiras do dia a dia.' },
        { n: '04', t: 'Relatório', d: 'Vai junto com o laudo médico para a decisão final do INSS.' },
      ],
      docsTitle: 'Documentos da família para mostrar',
      docs: [
        { t: 'Documentos de todos os moradores', n: 'RG, CPF, certidão de nascimento de cada um.' },
        { t: 'CadÚnico atualizado nos últimos 24 meses', n: 'Sem isso o BPC não sai.' },
        { t: 'Comprovantes de renda de todos', n: 'Carteira assinada, declaração de bicos, pensões.' },
        { t: 'Comprovantes de despesa médica', n: 'Medicamentos, fralda, terapia, transporte para tratamento.' },
        { t: 'Receituários e laudos de dependência', n: 'Que mostrem precisar de outra pessoa.' },
        { t: 'Declaração escolar ou de AEE', n: 'No caso de criança/adolescente deficiente.' },
        { t: 'Fotos da residência', n: 'Mostrando barreiras de acessibilidade ou adaptações.' },
        { t: 'Contas de água, luz, gás', n: 'Comprovam o endereço informado.' },
      ],
      dicasTitle: 'Perguntas que costumam fazer',
      dicas: [
        { n: '?', t: 'Quem mora na casa?', d: 'Liste TODOS — inclusive agregados e parentes.' },
        { n: '?', t: 'Quanto cada um ganha?', d: 'Inclua bicos, pensões e benefícios. Exceto Bolsa Família.' },
        { n: '?', t: 'Quem cuida do requerente?', d: 'Pessoa, parentesco, horas por dia.' },
        { n: '?', t: 'Faz tratamento? Onde?', d: 'SUS, particular, frequência, deslocamento.' },
        { n: '?', t: 'Recebe ajuda de alguém?', d: 'Familiar, igreja, ONG — declare tudo.' },
        { n: '?', t: 'Trabalha mesmo informal?', d: 'Bico, marmita, costura em casa — informe a renda real.' },
      ],
    },
  };

  const data = TAB_DATA[tab];

  return (
    <>
      <section className="pericia-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Início</a>
            <span className="sep">/</span>
            <span>Perícias</span>
          </div>
          <div className="pericia-hero-grid">
            <div>
              <div className="eyebrow">Guia oficial · perícia BPC</div>
              <h1>O dia da perícia <em>não</em> pode ser improviso.</h1>
              <p className="lead">
                Você esperou meses por essa data. Em 15 minutos um perito decide se sua família vai receber o BPC ou começar tudo de novo. <strong>A maioria das negativas não é falta de direito — é falta de preparação</strong>. Reunimos aqui o que levar, como se comportar e o que evitar dizer.
              </p>
              <div className="pericia-stats">
                <div className="pericia-stat">
                  <div className="num">70%</div>
                  <div className="lbl">das negativas vêm da perícia</div>
                </div>
                <div className="pericia-stat">
                  <div className="num">15min</div>
                  <div className="lbl">é a duração média da avaliação</div>
                </div>
                <div className="pericia-stat">
                  <div className="num">2x</div>
                  <div className="lbl">perícias para deficiente (médica + social)</div>
                </div>
              </div>
            </div>
            <div className="pericia-hero-cta">
              <div className="card-checklist">
                <div className="eyebrow">Material de apoio</div>
                <h3>Checklist completo da perícia</h3>
                <p>Lista impressa com todos os documentos, dicas de comportamento e erros a evitar. Leve no dia da perícia.</p>
                <ul className="card-features">
                  <li>✓ 24 itens de documentação</li>
                  <li>✓ 10 dicas de comportamento</li>
                  <li>✓ 5 erros que derrubam o pedido</li>
                  <li>✓ Pronto para imprimir em A4</li>
                </ul>
                <button className="btn btn--primary btn--lg" style={{ width: '100%' }} onClick={() => setForm({ ...form, open: true })}>
                  📥 Baixar checklist grátis
                </button>
                <p className="card-note">Em troca, deixe seu nome e WhatsApp — sem spam, só esse contato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pericia-body">
        <div className="container">
          <div className="pericia-tabs" role="tablist">
            {Object.entries(TAB_DATA).map(([k, v]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                className={`pericia-tab ${tab === k ? 'is-active' : ''}`}
                onClick={() => setTab(k)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="eyebrow" style={{ marginTop: 40 }}>{data.kicker}</div>
          <h2 className="pericia-h2">Como <em>funciona</em> a {data.label.toLowerCase()}</h2>

          <div className="pericia-steps">
            {data.passos.map(p => (
              <div className="step-card" key={p.n}>
                <div className="step-n">{p.n}</div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </div>
            ))}
          </div>

          <h2 className="pericia-h2" style={{ marginTop: 80 }}>{data.docsTitle}</h2>
          <div className="pericia-docs">
            {data.docs.map((d, i) => (
              <div className="doc-row" key={i}>
                <div className="doc-check">✓</div>
                <div>
                  <strong>{d.t}</strong>
                  <div className="doc-note">{d.n}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="pericia-h2" style={{ marginTop: 80 }}>{data.dicasTitle}</h2>
          <div className="pericia-tips">
            {data.dicas.map(d => (
              <div className="tip-card" key={d.n}>
                <div className="tip-num">{d.n}</div>
                <h5>{d.t}</h5>
                <p>{d.d}</p>
              </div>
            ))}
          </div>

          <div className="pericia-cta">
            <div>
              <div className="eyebrow">Pronto pra perícia?</div>
              <h3>Baixe o checklist e leve impresso no dia.</h3>
              <p>O documento reúne tudo que vimos aqui em uma folha A4 que cabe na pasta.</p>
            </div>
            <button className="btn btn--primary btn--lg" onClick={() => setForm({ ...form, open: true })}>
              📥 Baixar checklist em PDF
            </button>
          </div>
        </div>
      </section>

      {/* ============== Lead-gate modal ============== */}
      {form.open && (
        <div className="lead-modal-backdrop" onClick={() => setForm({ ...form, open: false })}>
          <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lead-modal-close" onClick={() => setForm({ ...form, open: false })} aria-label="Fechar">×</button>
            <div className="eyebrow">Quase lá</div>
            <h3>Receba o checklist no <em>WhatsApp</em></h3>
            <p style={{ color: 'var(--ink-500)', marginBottom: 24 }}>
              Deixe seu nome e número que abrimos o checklist pra imprimir <strong>e</strong> mandamos no seu WhatsApp pra você ter sempre à mão.
            </p>
            <form onSubmit={submitGate} className="lead-form">
              <label>
                <span>Nome completo</span>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="João da Silva"
                  autoFocus
                />
              </label>
              <label>
                <span>WhatsApp</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  inputMode="numeric"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: formatPhone(e.target.value) })}
                  placeholder="(21) 96423-8080"
                />
              </label>
              <p className="lgpd-note">
                🔒 Seus dados são tratados em conformidade com a LGPD (Lei 13.709/2018). Usados apenas para enviar o checklist.
              </p>
              <button type="submit" className="btn btn--primary btn--lg" disabled={!isValid} style={{ width: '100%' }}>
                Baixar checklist agora →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================
   ScreenEstrangeiro — BPC para estrangeiros (idoso + PCD)
   SEO/GEO targeted: imigrantes, refugiados, naturalizados
   ======================================================== */
function ScreenEstrangeiro({ onNavigate }) {
  const [tab, setTab] = useStateS('quem');

  const TABS = [
    { v: 'quem', l: 'Quem tem direito' },
    { v: 'docs', l: 'Documentos' },
    { v: 'como', l: 'Como pedir' },
    { v: 'comum', l: 'Erros comuns' },
  ];

  const CONTENT = {
    quem: {
      kicker: 'Lei 8.742/93 + Decreto 6.214/2007 + STF RE 587.970',
      h: 'Estrangeiro <em>tem</em> direito ao BPC.',
      lead: 'Desde a decisão do STF em 2017 (RE 587.970), estrangeiros residentes no Brasil têm acesso ao BPC nas mesmas condições que brasileiros. Não importa a nacionalidade — importa a residência regular no país.',
      cards: [
        {
          n: '01',
          t: 'Estrangeiro naturalizado',
          d: 'Quem adquiriu cidadania brasileira por naturalização. Direito automático — mesmo regime do brasileiro nato.',
        },
        {
          n: '02',
          t: 'Residente permanente',
          d: 'Estrangeiro com CRNM (Carteira de Registro Nacional Migratório) válida ou antigo RNE permanente. Idoso 65+ ou deficiente.',
        },
        {
          n: '03',
          t: 'Refugiado reconhecido',
          d: 'Quem tem reconhecimento de refúgio pelo CONARE. Equiparado ao residente para fins de BPC.',
        },
        {
          n: '04',
          t: 'Solicitante de refúgio',
          d: 'Tem protocolo do CONARE. Acesso por equiparação após decisão STF — mas exige análise técnica.',
        },
        {
          n: '05',
          t: 'Apátrida',
          d: 'Pessoa sem nacionalidade reconhecida. Lei 13.445/2017 garante mesmos direitos do residente.',
        },
        {
          n: '06',
          t: 'Visto humanitário',
          d: 'Venezuelanos, haitianos, afegãos sob acolhida humanitária. Acesso após residência regular comprovada.',
        },
      ],
    },
    docs: {
      kicker: 'O que levar — documentação específica',
      h: 'Os <em>documentos</em> que mudam tudo.',
      lead: 'A documentação do estrangeiro tem itens próprios. Faltar um único item pode atrasar o pedido em meses.',
      docs: [
        { t: 'CRNM (Carteira de Registro Nacional Migratório)', n: 'Substitui o antigo RNE. Deve estar VÁLIDA — vencida bloqueia o pedido. Renovação na Polícia Federal.' },
        { t: 'CPF brasileiro', n: 'Obrigatório. Emitido na Receita Federal mediante apresentação da CRNM.' },
        { t: 'Comprovante de residência no Brasil', n: 'Conta de luz, água ou contrato de aluguel em endereço brasileiro.' },
        { t: 'CadÚnico atualizado nos últimos 24 meses', n: 'Fundamental. Faça no CRAS do bairro — gratuito e obrigatório.' },
        { t: 'Termo de Refúgio (refugiado)', n: 'Documento emitido pelo CONARE — substitui passaporte para fins de identificação.' },
        { t: 'Protocolo de Refúgio (solicitante)', n: 'Documento provisório enquanto aguarda decisão do CONARE.' },
        { t: 'Certidão de nascimento ou casamento', n: 'Original ou traduzida por tradutor juramentado no Brasil.' },
        { t: 'Comprovante de tempo de residência', n: 'Não há mais exigência de tempo mínimo após STF 2017 — mas comprovar ajuda na perícia social.' },
        { t: 'Laudo médico (se deficiente)', n: 'Em português ou traduzido. Médico brasileiro de preferência.' },
        { t: 'Comprovante de renda familiar', n: 'De todos os moradores brasileiros e estrangeiros da casa.' },
      ],
    },
    como: {
      kicker: 'Passo a passo do requerimento',
      h: 'Como <em>pedir</em> o BPC sendo estrangeiro.',
      lead: 'O processo é o MESMO do brasileiro, com requisitos documentais específicos. Não precisa de advogado pra pedido inicial.',
      steps: [
        { n: '01', t: 'Regularizar a CRNM', d: 'Antes de tudo: a Carteira de Registro Nacional Migratório precisa estar VÁLIDA. Vencida = pedido bloqueado. Renove na Polícia Federal.' },
        { n: '02', t: 'Obter CPF brasileiro', d: 'Apresentar CRNM na Receita Federal. CPF é GRATUITO. Pode ser emitido em qualquer Receita ou Correios.' },
        { n: '03', t: 'Inscrever no CadÚnico', d: 'Vá ao CRAS do seu bairro com documentos de todos os moradores. Cadastro é gratuito e válido por 2 anos.' },
        { n: '04', t: 'Requerer no Meu INSS', d: 'Site ou app gov.br Meu INSS. Faça login com CPF + senha gov.br. Clique em "Novo pedido" → "Benefício Assistencial".' },
        { n: '05', t: 'Perícias (médica + social)', d: 'Idoso 65+: só perícia social. Deficiente: as duas. Leve TODOS os documentos no dia (CRNM, CPF, CadÚnico, laudos).' },
        { n: '06', t: 'Acompanhar e responder', d: 'Resultado em 30-90 dias no Meu INSS. INSS pode pedir documentos extras — responda no prazo (30 dias) ou pedido cai.' },
      ],
    },
    comum: {
      kicker: 'Onde 9 em cada 10 pedidos falham',
      h: 'Erros que <em>derrubam</em> pedidos de estrangeiros.',
      lead: 'A maioria das negativas vem de falhas evitáveis. Conhecer os erros = conseguir o BPC mais rápido.',
      errors: [
        { t: 'CRNM vencida ou em processo de renovação', d: 'Sem CRNM válida na data do pedido, o INSS recusa automaticamente. Renove ANTES de iniciar o processo.' },
        { t: 'Não ter CadÚnico ou estar desatualizado', d: 'Maior causa de negativa entre estrangeiros. CRAS sequer registra sem documentos completos — chegue com TUDO.' },
        { t: 'Documentos sem tradução juramentada', d: 'Certidões em espanhol, inglês ou francês precisam de tradução juramentada brasileira. Não é qualquer tradutor.' },
        { t: 'Cargo de "Solicitante de refúgio" sem CRNM provisória', d: 'Precisa do protocolo do CONARE + CRNM provisória emitida pela PF. Sem os dois, INSS questiona.' },
        { t: 'Pedido feito antes da decisão do CONARE', d: 'Solicitantes de refúgio com pedido pendente: aguardar decisão evita questionamento. Em alguns casos cabe judicialização.' },
        { t: 'Endereço informal não comprovado', d: 'Abrigo, casa de parente, ocupação — declarações de testemunha (próprio ou terceiros) ajudam, mas trazem fragilidade.' },
        { t: 'Renda recebida no exterior', d: 'Pensão estrangeira, ajuda de família de fora — DECLARE. INSS cruza dados e o que está oculto vira fraude.' },
        { t: 'Idoso sem 65 anos completos', d: 'Mesmo critério do brasileiro: 65 anos cravados. Ano só não basta — precisa da data de nascimento confirmada.' },
      ],
    },
  };

  const data = CONTENT[tab];

  return (
    <>
      <section className="pericia-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Início</a>
            <span className="sep">/</span>
            <span>BPC para estrangeiros</span>
          </div>
          <div className="pericia-hero-grid">
            <div>
              <div className="eyebrow">Guia oficial · BPC estrangeiro</div>
              <h1>BPC para <em>estrangeiros</em>.<br/>Você tem o mesmo direito.</h1>
              <p className="lead">
                Imigrante, refugiado, naturalizado, apátrida — quem reconstruiu a vida no Brasil tem direito ao BPC <strong>nas mesmas condições do brasileiro nato</strong>. O Supremo já decidiu isso em 2017. As regras de documentação são específicas (CRNM, CONARE, tradução juramentada) e um detalhe esquecido significa meses a mais de espera — a gente caminha junto.
              </p>
              <div className="pericia-stats">
                <div className="pericia-stat">
                  <div className="num">2017</div>
                  <div className="lbl">decisão histórica do STF que abriu o direito</div>
                </div>
                <div className="pericia-stat">
                  <div className="num">R$ 1.621</div>
                  <div className="lbl">mesmo valor do brasileiro nato em 2026</div>
                </div>
                <div className="pericia-stat">
                  <div className="num">65+</div>
                  <div className="lbl">idoso · ou deficiente (qualquer idade)</div>
                </div>
              </div>
            </div>
            <div className="pericia-hero-cta">
              <div className="card-checklist">
                <div className="eyebrow">Atendimento humano</div>
                <h3>Documentação complexa? A gente organiza.</h3>
                <p>BPC para estrangeiro tem regras específicas: CRNM, tradução juramentada, CONARE. Um erro atrasa meses. Conversamos no WhatsApp e organizamos juntos.</p>
                <ul className="card-features">
                  <li>✓ Análise gratuita do caso</li>
                  <li>✓ Orientação sobre CRNM e CONARE</li>
                  <li>✓ Atendimento em português · espanhol</li>
                  <li>✓ Acompanhamento até o deferimento</li>
                </ul>
                <a className="btn btn--primary btn--lg" style={{ width: '100%' }} href="https://wa.me/5521964238080?text=Ol%C3%A1!%20Sou%20estrangeiro%20e%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20o%20BPC.">
                  💬 Falar com especialista
                </a>
                <p className="card-note">(21) 96423-8080 · resposta em até 1 dia útil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pericia-body">
        <div className="container">
          <div className="pericia-tabs" role="tablist">
            {TABS.map(t => (
              <button
                key={t.v}
                role="tab"
                aria-selected={tab === t.v}
                className={`pericia-tab ${tab === t.v ? 'is-active' : ''}`}
                onClick={() => setTab(t.v)}
              >
                {t.l}
              </button>
            ))}
          </div>

          <div className="eyebrow" style={{ marginTop: 40 }}>{data.kicker}</div>
          <h2 className="pericia-h2" dangerouslySetInnerHTML={{ __html: data.h }} />
          <p style={{ color: 'var(--ink-500)', fontSize: 17, maxWidth: 720, marginBottom: 40 }}>{data.lead}</p>

          {data.cards && (
            <div className="pericia-steps">
              {data.cards.map(c => (
                <div className="step-card" key={c.n}>
                  <div className="step-n">{c.n}</div>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          )}

          {data.docs && (
            <div className="pericia-docs">
              {data.docs.map((d, i) => (
                <div className="doc-row" key={i}>
                  <div className="doc-check">✓</div>
                  <div>
                    <strong>{d.t}</strong>
                    <div className="doc-note">{d.n}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.steps && (
            <div className="pericia-steps">
              {data.steps.map(s => (
                <div className="step-card" key={s.n}>
                  <div className="step-n">{s.n}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          )}

          {data.errors && (
            <div className="pericia-docs">
              {data.errors.map((e, i) => (
                <div className="doc-row" key={i} style={{ borderColor: '#d4a3a3', background: '#fcf3f0' }}>
                  <div className="doc-check" style={{ background: '#d04437' }}>×</div>
                  <div>
                    <strong>{e.t}</strong>
                    <div className="doc-note">{e.d}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pericia-cta">
            <div>
              <div className="eyebrow">Tem dúvida sobre seu caso?</div>
              <h3>Atendemos imigrantes, refugiados e naturalizados.</h3>
              <p>BPC para estrangeiros exige documentação específica. Um erro atrasa o pedido em meses. Vamos organizar juntos pelo WhatsApp.</p>
            </div>
            <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080?text=Ol%C3%A1!%20Sou%20estrangeiro%20e%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20o%20BPC.">
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ScreenLanding, ScreenPatologia, ScreenSimulador, ScreenBlog, ScreenPericias, ScreenEstrangeiro });


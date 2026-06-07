/* ============================================================
   Portal do BPC — PATOLOGIA_DETAIL (entradas extras)
   40 patologias que faltavam no PATOLOGIA_DETAIL original.
   Carregado ANTES de screens.jsx. Expõe via window.
   ============================================================ */

window.PATOLOGIA_DETAIL_EXTRA = {

  /* ── DESENVOLVIMENTO ── */

  DI: {
    legalBase: 'Lei 13.146/2015 (LBI) + Decreto 6.214/2007',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'O déficit intelectual (DI) é caracterizado por funcionamento intelectual significativamente abaixo da média (QI inferior a 70) associado a limitações em habilidades adaptativas como comunicação, autocuidado, vida doméstica e trabalho.',
      'A classificação vai de leve (F70) a profundo (F73). Para o BPC, o grau do déficit e o impacto funcional na vida diária são determinantes.',
    ],
    legislacao: {
      titulo: 'LBI e o reconhecimento do déficit intelectual',
      texto: 'A Lei Brasileira de Inclusão reconhece o déficit intelectual como deficiência para todos os efeitos legais. O Decreto 6.214/2007 estabelece que a avaliação deve considerar os impedimentos e as barreiras sociais, não apenas o QI isolado.',
      destaque: 'Déficit intelectual moderado a profundo tem alta taxa de aprovação — leve exige mais comprovação funcional.',
    },
    docs: [
      { tit: 'Laudo neuropsicológico com CID F70-F79', desc: 'Teste de QI (WISC ou WAIS) com pontuação e classificação. Fundamental.' },
      { tit: 'Relatório escolar / APAE', desc: 'Descrição do desempenho acadêmico, adaptações necessárias e apoios oferecidos.' },
      { tit: 'Relatórios terapêuticos', desc: 'Fonoaudiologia, terapia ocupacional, psicopedagogia — impacto funcional detalhado.' },
      { tit: 'Laudo médico com etiologia', desc: 'Neurologista ou psiquiatra descrevendo a causa (genética, perinatal, etc) quando conhecida.' },
      { tit: 'CadÚnico + renda familiar', desc: 'Atualizado, em nome do responsável legal.' },
    ],
    pericia: [
      'A perícia para DI foca em <strong>habilidades adaptativas</strong>: a pessoa consegue se alimentar sozinha, vestir-se, usar transporte, manusear dinheiro?',
      'Leve um acompanhante que conheça a rotina. O perito vai perguntar sobre autonomia em atividades básicas e instrumentais.',
      'O teste de QI é a base, mas a avaliação social pesa muito — descreva as barreiras concretas do dia a dia.',
    ],
    erros: [
      'Levar apenas o laudo médico sem teste neuropsicológico (WISC/WAIS)',
      'Não atualizar relatórios escolares (devem ser dos últimos 6 meses)',
      'Omitir a necessidade de supervisão constante',
      'Não declarar que a pessoa não consegue trabalhar de forma independente',
      'CadÚnico desatualizado ou sem o beneficiário como dependente',
    ],
    recurso: 'Negativas por "déficit leve" podem ser revertidas com teste neuropsicológico detalhado e relatórios que demonstrem o impacto funcional real. A via judicial costuma ser favorável.',
    relacionadas: ['TEA', 'SD', 'XF'],
  },

  ET: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer',
    duracao: 'Permanente (congênita)',
    o_que_e: [
      'A Esclerose Tuberosa (ET) é uma doença genética que causa o crescimento de tumores benignos em múltiplos órgãos — cérebro, rins, coração, pele, pulmões. Os sintomas mais impactantes para o BPC são epilepsia (em 80% dos casos) e déficit intelectual.',
      'A gravidade varia enormemente: alguns pacientes têm apenas manchas na pele, enquanto outros enfrentam epilepsia refratária e deficiência intelectual severa.',
    ],
    legislacao: {
      titulo: 'ET como deficiência — base legal',
      texto: 'A LBI garante o reconhecimento quando há impedimentos de longo prazo. Na ET, epilepsia refratária e/ou déficit cognitivo configuram impedimento permanente. O BPC não exige que todos os sintomas estejam presentes — basta que um deles cause limitação funcional significativa.',
      destaque: 'ET com epilepsia refratária ou déficit intelectual: elegível. Casos leves exigem mais comprovação.',
    },
    docs: [
      { tit: 'Laudo genético ou clínico com CID Q85.1', desc: 'Diagnóstico de ET confirmado por critérios clínicos ou teste genético (TSC1/TSC2).' },
      { tit: 'Laudos de ressonância e exames de imagem', desc: 'Comprovam túberes cerebrais, angiomiolipomas renais, rabdomioma cardíaco.' },
      { tit: 'Relatório de epilepsia', desc: 'EEG, frequência de crises, medicações em uso e resposta ao tratamento.' },
      { tit: 'Avaliação neuropsicológica', desc: 'Se houver déficit intelectual, teste de QI e relatório funcional.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado, em nome do responsável legal.' },
    ],
    pericia: [
      'A perícia avalia o <strong>conjunto dos sintomas</strong>: epilepsia + cognição + necessidade de acompanhamento médico contínuo.',
      'Leve documentação de TODOS os órgãos afetados, mesmo que o sintoma principal seja a epilepsia.',
      'Se a criança falta à escola por crises, leve declaração escolar com registro de faltas.',
    ],
    erros: [
      'Apresentar apenas o diagnóstico genético sem descrever os sintomas funcionais',
      'Não levar o histórico de crises epilépticas',
      'Omitir tratamentos multidisciplinares em andamento',
      'Não mencionar o impacto na rotina familiar e escolar',
    ],
    recurso: 'Em casos com epilepsia refratária, o recurso costuma ser favorável. Casos leves exigem mais fundamentação sobre impacto funcional.',
    relacionadas: ['EP', 'DI', 'NF'],
  },

  EB: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer (desde o nascimento)',
    duracao: 'Permanente (congênita)',
    o_que_e: [
      'A Espinha Bífida é uma malformação congênita do tubo neural que pode causar paralisia dos membros inferiores, bexiga neurogênica, hidrocefalia e déficit intelectual. A gravidade depende do nível da lesão.',
      'A forma mais grave (mielomeningocele) causa paraplegia e exige uso de cadeira de rodas, sondagem vesical e acompanhamento multidisciplinar permanente.',
    ],
    legislacao: {
      titulo: 'Malformação congênita e o BPC',
      texto: 'Por ser condição congênita e permanente, a Espinha Bífida se enquadra diretamente nos critérios da LBI. Não há prazo de 2 anos a observar — a deficiência existe desde o nascimento.',
      destaque: 'Espinha bífida com comprometimento motor: direito desde o nascimento.',
    },
    docs: [
      { tit: 'Laudo neurocirúrgico com CID Q05', desc: 'Especifica o nível da lesão, tipo (meningocele, mielomeningocele) e cirurgias realizadas.' },
      { tit: 'Relatório de urologia', desc: 'Documenta bexiga neurogênica, necessidade de sondagem, infecções recorrentes.' },
      { tit: 'Relatório de fisioterapia/reabilitação', desc: 'Nível funcional motor, uso de cadeira de rodas, órteses.' },
      { tit: 'Laudo de neurocirurgia (DVP)', desc: 'Se houver hidrocefalia com válvula, documentar revisões e complicações.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A perícia é geralmente favorável quando há comprometimento motor evidente.',
      'Leve a criança/pessoa com os equipamentos que usa (cadeira, órteses, fraldas, sondas).',
      'Documente todas as complicações: infecções urinárias, úlceras de pressão, cirurgias.',
    ],
    erros: [
      'Não documentar a necessidade de sondagem vesical (impacto funcional enorme)',
      'Esquecer de mencionar hidrocefalia quando presente',
      'Não levar relatórios de reabilitação atualizados',
    ],
    recurso: 'Negativas são raras em espinha bífida com mielomeningocele. Quando ocorrem, geralmente são por questão de renda.',
    relacionadas: ['LM', 'HC', 'PCx'],
  },

  SR: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer (geralmente diagnóstico entre 6-18 meses)',
    duracao: 'Permanente',
    o_que_e: [
      'A Síndrome de Rett é um transtorno genético do neurodesenvolvimento causado por mutação no gene MECP2, quase exclusivo do sexo feminino. Após desenvolvimento inicial aparentemente normal, ocorre regressão das habilidades motoras e de linguagem.',
      'Características incluem movimentos estereotipados das mãos, perda da fala, epilepsia e escoliose. A maioria das pacientes requer cuidados permanentes.',
    ],
    legislacao: {
      titulo: 'Rett e a CID F84.2',
      texto: 'A Síndrome de Rett está classificada nos Transtornos Globais do Desenvolvimento (F84.2). A LBI garante o reconhecimento como deficiência. Por ser progressiva e permanente, não há questionamento sobre o prazo de 2 anos.',
      destaque: 'Síndrome de Rett: deficiência permanente com alta taxa de aprovação.',
    },
    docs: [
      { tit: 'Laudo genético (mutação MECP2)', desc: 'Confirma o diagnóstico. Na ausência, laudo clínico detalhado com critérios diagnósticos.' },
      { tit: 'Laudo neurológico com CID F84.2', desc: 'Descreve o estágio da doença, nível de dependência e complicações.' },
      { tit: 'Relatórios terapêuticos multidisciplinares', desc: 'Fisioterapia, fono, TO — todos descrevendo o nível funcional atual.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A avaliação tende a ser favorável dada a gravidade evidente da condição.',
      'Leve um <strong>relato detalhado da rotina diária</strong> mostrando a dependência total ou quase total em AVDs.',
      'Vídeos do dia a dia podem ajudar o perito a entender o impacto.',
    ],
    erros: [
      'Não levar o teste genético quando disponível',
      'Apresentar laudos antigos sem descrever a progressão',
      'Não mencionar complicações associadas (epilepsia, escoliose, problemas respiratórios)',
    ],
    recurso: 'Negativas em Rett são muito raras. Quando ocorrem, recurso administrativo costuma resolver.',
    relacionadas: ['TEA', 'PCx', 'DI'],
  },

  SW: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer (desde o nascimento)',
    duracao: 'Permanente (congênita)',
    o_que_e: [
      'A Síndrome de Williams é causada pela deleção de 26-28 genes na região 7q11.23 do cromossomo 7. Prevalência de 1:7.500. Causa déficit intelectual (leve a moderado), cardiopatia congênita (estenose aórtica supravalvar), personalidade hipersociável e dificuldades visuoespaciais.',
      'Apesar da sociabilidade aparente, a maioria dos pacientes necessita de apoio contínuo para vida independente.',
    ],
    legislacao: {
      titulo: 'SW como deficiência genética',
      texto: 'A LBI e o Decreto 6.214/2007 reconhecem condições genéticas permanentes como deficiência para fins de BPC. O diagnóstico genético confirmado encerra a discussão clínica — resta comprovar a renda.',
      destaque: 'Diagnóstico genético confirmado + renda = alta chance de aprovação.',
    },
    docs: [
      { tit: 'Teste genético (FISH ou array-CGH)', desc: 'Confirma a deleção 7q11.23 — documento mais importante.' },
      { tit: 'Laudo cardiológico', desc: 'Ecocardiograma documentando estenose aórtica ou outras cardiopatias.' },
      { tit: 'Avaliação neuropsicológica', desc: 'Teste de QI e perfil cognitivo — documenta o déficit intelectual.' },
      { tit: 'Relatórios terapêuticos', desc: 'Fono, TO, psicopedagogia — impacto funcional.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O teste genético é decisivo. Leve sempre a cópia original ou autenticada.',
      'A personalidade hipersociável pode confundir o perito — o acompanhante deve explicar que isso mascara as dificuldades reais.',
      'Documente a necessidade de supervisão em atividades cotidianas.',
    ],
    erros: [
      'Não levar o teste genético',
      'O perito interpretar a sociabilidade como sinal de autonomia',
      'Não documentar as dificuldades visuoespaciais e de aprendizagem',
    ],
    recurso: 'Com diagnóstico genético confirmado, recurso por negativa clínica é praticamente automático.',
    relacionadas: ['SD', 'DI', 'XF'],
  },

  XF: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer',
    duracao: 'Permanente (genética)',
    o_que_e: [
      'A Síndrome do X Frágil é a causa genética mais comum de deficiência intelectual hereditária. Causada pela expansão do trinucleotídeo CGG no gene FMR1. Afeta mais meninos (déficit moderado a grave) do que meninas (geralmente leve).',
      'Além do déficit intelectual, causa hiperatividade, ansiedade social, problemas de linguagem e características físicas sutis (orelhas grandes, face alongada).',
    ],
    legislacao: {
      titulo: 'X Frágil e o BPC',
      texto: 'Como condição genética permanente com déficit intelectual, o X Frágil se enquadra diretamente na LBI. A confirmação por teste genético molecular é a base do pedido.',
      destaque: 'Mutação completa (>200 CGG) em meninos: elegibilidade alta.',
    },
    docs: [
      { tit: 'Teste genético molecular (CID Q99.2)', desc: 'PCR ou Southern Blot confirmando expansão CGG >200 (mutação completa) ou 55-200 (pré-mutação).' },
      { tit: 'Avaliação neuropsicológica', desc: 'QI e perfil funcional adaptativo.' },
      { tit: 'Relatórios terapêuticos', desc: 'Fono, psicologia, TO — impacto em comunicação e comportamento.' },
      { tit: 'Relatório escolar', desc: 'AEE, adaptações curriculares, apoios necessários.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O teste genético é a peça central. Sem ele, a perícia pode ser inconclusiva.',
      'Em meninas com pré-mutação, o impacto pode ser sutil — reforce com relatórios funcionais detalhados.',
      'Documente problemas de comportamento (ansiedade, impulsividade) além do déficit cognitivo.',
    ],
    erros: [
      'Não ter o teste genético molecular',
      'Confundir pré-mutação com mutação completa nos documentos',
      'Não documentar o impacto comportamental além do cognitivo',
    ],
    recurso: 'Mutação completa com déficit intelectual documentado: recurso favorável. Pré-mutação com sintomas leves: mais difícil.',
    relacionadas: ['DI', 'TEA', 'SW'],
  },

  TDAH: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'O TDAH é um transtorno do neurodesenvolvimento caracterizado por desatenção, hiperatividade e impulsividade. Por si só, o TDAH raramente dá direito ao BPC — o INSS e a jurisprudência entendem que, na maioria dos casos, não configura impedimento de longo prazo para participação social.',
      'A exceção são casos graves com comorbidades (TEA, déficit intelectual, transtornos de conduta) que juntas causem limitação funcional severa.',
    ],
    legislacao: {
      titulo: 'Por que o TDAH quase nunca dá BPC',
      texto: 'O BPC exige impedimento de longo prazo que limite a participação social. O TDAH isolado, mesmo grave, geralmente responde a tratamento (medicação + terapia) e não impede a participação plena quando tratado. A Portaria 37/2026 reforçou que condições tratáveis não configuram deficiência para fins de BPC.',
      destaque: 'TDAH isolado: via de regra, não elegível. Com comorbidades graves: avaliar caso a caso.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico/neurológico com CID F90', desc: 'Deve descrever a gravidade e o impacto funcional.' },
      { tit: 'Laudos de comorbidades', desc: 'TEA, déficit intelectual, transtorno de conduta — se presentes, são a chave.' },
      { tit: 'Relatório escolar detalhado', desc: 'Reprovações, evasão, incapacidade de acompanhar mesmo com apoio.' },
      { tit: 'Histórico de tratamento', desc: 'Mostrar que mesmo com medicação o impacto funcional persiste.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito vai avaliar se o TDAH causa <strong>impedimento de longo prazo</strong>. Na maioria dos casos, a resposta é não.',
      'Se houver comorbidades graves (TEA nível 2-3, DI), elas são o fundamento real do pedido — não o TDAH isolado.',
      'Não leve o pedido focado no TDAH: foque nas comorbidades e no impacto funcional conjunto.',
    ],
    erros: [
      'Pedir BPC citando apenas TDAH sem comorbidades',
      'Não documentar a falha do tratamento medicamentoso',
      'Esperar que o diagnóstico de TDAH por si só garanta o benefício',
      'Não ter relatório escolar mostrando o impacto acadêmico grave',
    ],
    recurso: 'TDAH isolado: recurso raramente favorável. Com comorbidades graves documentadas: chances melhores, especialmente na via judicial.',
    relacionadas: ['TEA', 'DI', 'DG'],
  },

  /* ── NEUROLÓGICA (extras) ── */

  AME: {
    legalBase: 'Lei 13.146/2015 (LBI) + Portaria MTP/MS 22/2022',
    minIdade: 'Qualquer (geralmente desde a infância)',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A Atrofia Muscular Espinhal (AME) é uma doença neuromuscular hereditária causada pela mutação do gene SMN1. Causa fraqueza muscular progressiva, podendo afetar respiração, deglutição e mobilidade.',
      'Existem tipos I (grave, início infantil) a IV (adulto, mais brando). Tipos I e II têm alta taxa de aprovação no BPC.',
    ],
    legislacao: {
      titulo: 'AME e o BPC',
      texto: 'Como doença genética progressiva e permanente, a AME se enquadra claramente nos critérios da LBI. O tipo e a gravidade determinam a facilidade da aprovação.',
      destaque: 'AME tipo I e II: elegibilidade praticamente automática.',
    },
    docs: [
      { tit: 'Teste genético com CID G12.1', desc: 'Confirma a deleção/mutação do gene SMN1. Essencial.' },
      { tit: 'Laudo neurológico', desc: 'Tipo de AME, grau de fraqueza, função respiratória, deglutição.' },
      { tit: 'Relatório de fisioterapia motora e respiratória', desc: 'Nível funcional, uso de ventilação, cadeira de rodas.' },
      { tit: 'Relatórios de equipe multidisciplinar', desc: 'Nutrição (via gastrostomia?), fono, TO.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A condição clínica é geralmente evidente. Leve a criança/pessoa com todos os equipamentos.',
      'Documente a necessidade de ventilação mecânica, quando presente — isso pesa enormemente.',
      'O custo do tratamento (Spinraza, Zolgensma) pode ser mencionado como barreira adicional.',
    ],
    erros: [
      'Não ter o teste genético confirmatório',
      'Classificar incorretamente o tipo de AME nos laudos',
      'Não documentar a dependência de ventilação/alimentação assistida',
    ],
    recurso: 'Negativas em AME tipo I-II são quase inexistentes. Tipo III-IV pode exigir mais documentação funcional.',
    relacionadas: ['DM', 'EL', 'LM'],
  },

  CMT: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A Doença de Charcot-Marie-Tooth (CMT) é a neuropatia hereditária mais comum. Causa fraqueza e atrofia muscular progressiva, começando pelos pés e mãos, com perda de sensibilidade.',
      'A evolução é lenta mas contínua. Em estágios avançados, causa dificuldade de marcha, quedas frequentes e perda de função manual.',
    ],
    legislacao: {
      titulo: 'CMT e elegibilidade ao BPC',
      texto: 'A CMT é condição permanente e progressiva. O BPC é condicional ao grau de comprometimento funcional — formas leves com boa adaptação podem ser negadas, enquanto formas moderadas a graves com impacto na marcha e autonomia são elegíveis.',
      destaque: 'CMT com dificuldade de marcha e perda funcional das mãos: elegível.',
    },
    docs: [
      { tit: 'ENMG + laudo neurológico com CID G60.0', desc: 'Eletroneuromiografia comprovando a neuropatia. Laudo com grau de comprometimento.' },
      { tit: 'Teste genético (quando disponível)', desc: 'Confirma o subtipo (CMT1A, CMT2, CMTX, etc).' },
      { tit: 'Relatório de fisioterapia', desc: 'Testes de equilíbrio, marcha, força de preensão, uso de órteses.' },
      { tit: 'Fotos dos pés e mãos', desc: 'Documentam atrofia, deformidades (pé cavo), calosidades.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito vai avaliar a marcha, o equilíbrio e a força manual. Não minimize suas dificuldades.',
      'Use as órteses que usa no dia a dia durante a perícia.',
      'Leve documentação da progressão ao longo dos anos (laudos antigos + atuais).',
    ],
    erros: [
      'Não levar a ENMG — é o exame que prova a neuropatia',
      'Aparecer sem órteses na perícia',
      'Não documentar a progressão da doença',
    ],
    recurso: 'Negativas em CMT moderada-grave costumam ser revertidas com ENMG detalhada e relatórios funcionais.',
    relacionadas: ['DM', 'AME', 'MG'],
  },

  HTG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer (geralmente 30-50 anos)',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A Doença de Huntington é uma doença neurodegenerativa hereditária autossômica dominante causada pela expansão do trinucleotídeo CAG no gene HTT. Causa movimentos involuntários (coreia), declínio cognitivo progressivo e alterações psiquiátricas.',
      'É progressiva e fatal. Não há cura. O tratamento é paliativo e focado no controle dos sintomas.',
    ],
    legislacao: {
      titulo: 'Huntington e o BPC',
      texto: 'Como doença degenerativa progressiva e incurável, a Doença de Huntington configura impedimento permanente. A Portaria MS 1.298/2013 lista as doenças que dispensam prazo mínimo. A jurisprudência é favorável.',
      destaque: 'Huntington diagnosticada: elegibilidade alta, independente do estágio.',
    },
    docs: [
      { tit: 'Teste genético com CID G10', desc: 'Confirma expansão CAG ≥36 no gene HTT. Diagnóstico definitivo.' },
      { tit: 'Laudo neurológico', desc: 'Estágio da doença (UHDRS), comprometimento motor e cognitivo.' },
      { tit: 'Avaliação neuropsicológica', desc: 'Documenta o declínio cognitivo progressivo.' },
      { tit: 'Relatório psiquiátrico', desc: 'Alterações de comportamento, depressão, psicose quando presentes.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O teste genético é definitivo. Leve sempre o resultado original.',
      'A coreia (movimentos involuntários) é visualmente evidente — o perito observará na consulta.',
      'Documente a perda progressiva de autonomia com relato do cuidador.',
    ],
    erros: [
      'Não ter feito o teste genético confirmatório',
      'Não levar avaliação neuropsicológica (o perito pode subestimar o declínio cognitivo)',
      'Não documentar a necessidade de cuidador',
    ],
    recurso: 'Negativas em Huntington confirmada são extremamente raras. Recurso praticamente automático.',
    relacionadas: ['PK', 'AZ', 'EL'],
  },

  HC: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: 'Quando sequelas são permanentes',
    o_que_e: [
      'A Hidrocefalia é o acúmulo excessivo de líquor no cérebro, podendo ser congênita ou adquirida. O tratamento principal é cirúrgico (derivação ventrículo-peritoneal — DVP). O BPC depende das sequelas.',
      'Hidrocefalia tratada com sucesso e sem sequelas não gera BPC. Quando há déficit cognitivo, motor ou epilepsia persistente, é elegível.',
    ],
    legislacao: {
      titulo: 'Hidrocefalia e elegibilidade condicional',
      texto: 'O BPC não é para o diagnóstico, mas para as sequelas. Hidrocefalia com DVP funcionante e sem sequelas: o INSS nega. Com sequelas cognitivas, motoras ou epilepsia: a LBI ampara.',
      destaque: 'O que dá BPC não é a hidrocefalia — são as sequelas permanentes.',
    },
    docs: [
      { tit: 'Laudo neurocirúrgico com CID G91', desc: 'Tipo de hidrocefalia, causa, cirurgias realizadas, revisões de válvula.' },
      { tit: 'Exames de imagem', desc: 'TC ou RM mostrando dilatação ventricular, posição da DVP.' },
      { tit: 'Avaliação neuropsicológica', desc: 'Quando há suspeita de déficit cognitivo.' },
      { tit: 'Relatórios de reabilitação', desc: 'Fisioterapia, fono — demonstram o impacto funcional das sequelas.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito vai avaliar as <strong>sequelas</strong>, não a hidrocefalia em si.',
      'Se a pessoa funciona normalmente com a DVP, o perito provavelmente negará.',
      'Documente TODAS as complicações: revisões cirúrgicas, infecções, crises convulsivas.',
    ],
    erros: [
      'Basear o pedido apenas no diagnóstico de hidrocefalia sem documentar sequelas',
      'Não levar o histórico de cirurgias e revisões de válvula',
      'Não ter avaliação neuropsicológica quando há déficit cognitivo',
    ],
    recurso: 'Negativa por "hidrocefalia tratada": recurso exige comprovação detalhada das sequelas persistentes.',
    relacionadas: ['EB', 'PCx', 'EP'],
  },

  LM: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Lesão Medular causa paraplegia (membros inferiores) ou tetraplegia (quatro membros) dependendo do nível da lesão. Causas: trauma (acidente), doença (tumor medular, mielite) ou congênita (espinha bífida).',
      'Além da paralisia, causa bexiga e intestino neurogênicos, dor neuropática e risco de úlceras de pressão. A dependência de terceiros é geralmente alta.',
    ],
    legislacao: {
      titulo: 'Lesão medular e o BPC',
      texto: 'Paraplegia e tetraplegia são deficiências físicas permanentes reconhecidas pela LBI. A elegibilidade é alta quando documentada. O desafio está na renda, não na condição clínica.',
      destaque: 'Lesão medular completa: elegibilidade praticamente automática.',
    },
    docs: [
      { tit: 'Laudo médico com CID G82', desc: 'Nível da lesão (ex: T4 completa), causa, data, sequelas funcionais.' },
      { tit: 'RM da coluna', desc: 'Comprova a lesão e sua extensão.' },
      { tit: 'Relatório de reabilitação', desc: 'Grau de dependência, uso de cadeira de rodas, órteses.' },
      { tit: 'Relatório de urologia', desc: 'Bexiga neurogênica, necessidade de sondagem.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A deficiência é evidente na perícia. Vá com cadeira de rodas e equipamentos habituais.',
      'Documente os custos com fraldas, sondas, medicações — na via judicial, isso importa para flexibilizar a renda.',
      'Se houver dor neuropática crônica, documente com receituários de medicação.',
    ],
    erros: [
      'Não levar a RM da coluna',
      'Não documentar bexiga neurogênica (impacta muito na avaliação funcional)',
      'Esquecer de mencionar custos com insumos médicos',
    ],
    recurso: 'Negativas em lesão medular são raras e quase sempre por renda. Revisão da composição familiar costuma resolver.',
    relacionadas: ['PCx', 'EB', 'AMP'],
  },

  MG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos ou mais',
    o_que_e: [
      'A Miastenia Grave é uma doença autoimune neuromuscular que causa fraqueza muscular flutuante. Os anticorpos atacam os receptores de acetilcolina na junção neuromuscular, prejudicando a contração muscular.',
      'A fraqueza piora com o uso e melhora com o repouso. Em formas graves, afeta respiração (crise miastênica), deglutição e mobilidade.',
    ],
    legislacao: {
      titulo: 'Miastenia e elegibilidade condicional',
      texto: 'A MG controlada com medicação pode não configurar impedimento de longo prazo. Formas refratárias ao tratamento, com crises miastênicas recorrentes ou dependência de imunossupressores pesados, são elegíveis.',
      destaque: 'MG refratária ao tratamento: elegível. MG controlada: via de regra, negada.',
    },
    docs: [
      { tit: 'Laudo neurológico com CID G70.0', desc: 'Classificação MGFA (I a V), anticorpos anti-AChR ou anti-MuSK.' },
      { tit: 'ENMG com estimulação repetitiva', desc: 'Comprova o bloqueio neuromuscular — exame fundamental.' },
      { tit: 'Histórico de crises miastênicas', desc: 'Internações em UTI, necessidade de ventilação mecânica.' },
      { tit: 'Lista de medicações', desc: 'Piridostigmina, prednisona, azatioprina, rituximabe — mostra a gravidade do tratamento.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A fraqueza pode não ser evidente no momento da perícia (é flutuante). Leve <strong>documentação detalhada</strong>.',
      'Se possível, agende a perícia para o final do dia quando a fraqueza é maior.',
      'Documente a incapacidade de manter atividades prolongadas (trabalho, cuidado dos filhos).',
    ],
    erros: [
      'Aparecer "bem" na perícia e o perito interpretar como controle da doença',
      'Não levar a ENMG',
      'Não documentar crises miastênicas e internações prévias',
    ],
    recurso: 'Negativa por "doença controlada": recurso com ENMG, histórico de crises e classificação MGFA detalhada.',
    relacionadas: ['DM', 'AME', 'EM'],
  },

  NF: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Neurofibromatose (NF) é uma doença genética com dois tipos principais: NF1 (mais comum, manchas café com leite + neurofibromas) e NF2 (schwannomas vestibulares bilaterais com risco de surdez).',
      'A elegibilidade ao BPC depende das complicações: tumores sintomáticos, déficit neurológico, deformidades ósseas, déficit intelectual ou surdez.',
    ],
    legislacao: {
      titulo: 'NF e elegibilidade condicional',
      texto: 'NF sem complicações significativas não dá BPC. NF com complicações graves (tumores cerebrais, surdez bilateral, déficit intelectual, escoliose grave, dor crônica incapacitante) é elegível pela LBI.',
      destaque: 'O que dá BPC são as complicações da NF, não o diagnóstico isolado.',
    },
    docs: [
      { tit: 'Laudo genético/clínico com CID Q85.0', desc: 'Diagnóstico de NF1 ou NF2 com descrição das complicações.' },
      { tit: 'Exames de imagem', desc: 'RM demonstrando neurofibromas plexiformes, gliomas, schwannomas.' },
      { tit: 'Audiometria (NF2)', desc: 'Documenta a perda auditiva bilateral.' },
      { tit: 'Relatórios de especialistas', desc: 'Neurocirurgião, ortopedista, oftalmologista — cada complicação documentada.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Documente TODAS as complicações, não apenas as manchas na pele.',
      'Para NF2: a perda auditiva bilateral é o argumento mais forte.',
      'Fotos dos neurofibromas visíveis ajudam na documentação.',
    ],
    erros: [
      'Basear o pedido apenas nas manchas café com leite (são cosméticas)',
      'Não documentar dor crônica causada por neurofibromas',
      'Não levar RM mostrando os tumores internos',
    ],
    recurso: 'Negativa por "NF sem impedimento": recurso focando nas complicações específicas e seu impacto funcional.',
    relacionadas: ['ET', 'DA', 'DV'],
  },

  WD: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer (geralmente 5-35 anos)',
    duracao: 'Permanente (quando há sequelas)',
    o_que_e: [
      'A Doença de Wilson é um distúrbio genético do metabolismo do cobre que causa acúmulo tóxico no fígado e no cérebro. Pode causar cirrose hepática, tremor, distonia, disartria e alterações psiquiátricas.',
      'Com tratamento (penicilamina, zinco), a progressão pode ser controlada, mas sequelas neurológicas e hepáticas podem ser permanentes.',
    ],
    legislacao: {
      titulo: 'Wilson e o BPC',
      texto: 'A elegibilidade depende das sequelas. Wilson tratada sem sequelas significativas não gera BPC. Com cirrose avançada ou dano neurológico permanente (tremor, distonia incapacitante), é elegível.',
      destaque: 'Sequelas neurológicas ou hepáticas permanentes: elegível. Doença controlada sem sequelas: negada.',
    },
    docs: [
      { tit: 'Laudo com CID E83.0', desc: 'Diagnóstico com dosagem de ceruloplasmina, cobre urinário e/ou biópsia hepática.' },
      { tit: 'Exames hepáticos', desc: 'Elastografia, biópsia, exames de função hepática mostrando grau de comprometimento.' },
      { tit: 'RM de crânio', desc: 'Mostra lesões nos gânglios da base quando há envolvimento neurológico.' },
      { tit: 'Laudo neurológico', desc: 'Descreve tremor, distonia, disartria e seu impacto funcional.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito vai focar nas sequelas, não no diagnóstico. Documente o impacto funcional detalhadamente.',
      'Se houver tremor ou distonia, não tente controlar durante a perícia — mostre como realmente é.',
      'Leve o histórico de evolução: exames antigos vs. atuais mostrando a progressão.',
    ],
    erros: [
      'Basear o pedido no diagnóstico sem documentar sequelas funcionais',
      'Não levar RM de crânio quando há sintomas neurológicos',
      'Omitir o uso contínuo de medicação e seus efeitos colaterais',
    ],
    recurso: 'Negativa com sequelas documentadas: recurso com RM, exames hepáticos e relatório neurológico detalhado.',
    relacionadas: ['HP', 'PK', 'AZ'],
  },

  /* ── SAÚDE MENTAL (extras) ── */

  DG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Lei 10.216/2001',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A depressão grave (Transtorno Depressivo Maior com episódios graves, CID F32.2/F33.2) é uma condição psiquiátrica que pode causar incapacidade funcional severa — impossibilidade de trabalhar, cuidar de si, manter relações sociais.',
      'Para o BPC, não basta ter depressão: é necessário demonstrar que a condição é grave, de longa duração e causa impedimento funcional real. A taxa de negativa é alta.',
    ],
    legislacao: {
      titulo: 'Por que a depressão é tão negada no INSS',
      texto: 'O INSS frequentemente nega BPC para depressão alegando que o tratamento "controla" a doença. A Lei 10.216/2001 e a LBI reconhecem transtornos mentais graves como deficiência psicossocial, mas a comprovação é subjetiva e depende da perícia.',
      destaque: 'Depressão grave resistente ao tratamento: pode ser elegível. Depressão leve-moderada: via de regra, negada.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico com CID F32.2 ou F33.2', desc: 'Atualizado, com descrição dos episódios, duração e impacto funcional.' },
      { tit: 'Receituários de pelo menos 2 anos', desc: 'Antidepressivos, ansiolíticos, antipsicóticos — mostram tratamento contínuo.' },
      { tit: 'Histórico de internações', desc: 'CAPS, hospital psiquiátrico, emergências por ideação suicida.' },
      { tit: 'Relatório do CAPS', desc: 'Funcionamento social, adesão ao tratamento, evolução.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A perícia em depressão é <strong>extremamente subjetiva</strong>. O dia em que a pessoa está "bem" pode custar a negativa.',
      'Leve acompanhante que possa relatar os episódios graves, a rotina real, os dias de cama.',
      'Não se arrume demais para a perícia — vista-se como se veste normalmente.',
    ],
    erros: [
      'Apresentar-se bem vestido e articulado — o perito interpreta como controle',
      'Não ter acompanhante que relate a realidade dos episódios',
      'Não levar histórico de internações ou atendimentos de emergência',
      'Ter menos de 2 anos de tratamento documentado',
    ],
    recurso: 'Alta taxa de reversão na via judicial. Laudos detalhados do CAPS e histórico de internações são decisivos.',
    relacionadas: ['EQ', 'TB', 'ANS'],
  },

  ANS: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'Os Transtornos de Ansiedade (TAG, Pânico, Fobias — CID F41) são as condições psiquiátricas mais comuns na população. Na grande maioria dos casos, NÃO dão direito ao BPC porque respondem a tratamento.',
      'A exceção são casos graves com agorafobia incapacitante, ataques de pânico diários ou ansiedade refratária que impedem completamente a vida social e profissional.',
    ],
    legislacao: {
      titulo: 'Ansiedade e o BPC — exceção, não regra',
      texto: 'O INSS e a jurisprudência tratam a ansiedade como condição tratável. Para configurar BPC, é necessário demonstrar que o tratamento falhou e que o impedimento persiste por mais de 2 anos com impacto funcional severo.',
      destaque: 'Ansiedade isolada: quase sempre negada. Com comorbidades graves e refratariedade: avaliar.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico com CID F41', desc: 'Descrever a gravidade, frequência de crises, impacto funcional e refratariedade ao tratamento.' },
      { tit: 'Histórico de tratamento (2+ anos)', desc: 'Múltiplas medicações tentadas sem controle adequado.' },
      { tit: 'Laudos de comorbidades', desc: 'Depressão grave, TEPT, fobias — se presentes, fortalecem o caso.' },
      { tit: 'Relatório do CAPS', desc: 'Frequência, atividades, funcionamento social.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito tende a negar ansiedade. Foque na <strong>incapacidade funcional concreta</strong>: não sair de casa, não usar transporte, não trabalhar.',
      'Comorbidades (depressão, TEPT) são geralmente o fundamento real do pedido.',
      'Leve relato detalhado de como a ansiedade afeta a rotina diária.',
    ],
    erros: [
      'Pedir BPC citando apenas ansiedade sem comorbidades',
      'Não ter pelo menos 2 anos de tratamento documentado',
      'Não descrever a incapacidade funcional em termos concretos',
    ],
    recurso: 'Ansiedade isolada: recurso raramente favorável. Com comorbidades graves e longo histórico de tratamento: possível na via judicial.',
    relacionadas: ['DG', 'TB', 'TPG'],
  },

  TPG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Lei 10.216/2001',
    minIdade: 'Qualquer (geralmente 18+)',
    duracao: '2 anos',
    o_que_e: [
      'Os Transtornos de Personalidade Graves (Borderline — F60.3, Antissocial — F60.2, entre outros) causam padrões persistentes de instabilidade emocional, impulsividade e dificuldade nos relacionamentos.',
      'Para o BPC, exige-se comprovação de que o transtorno causa impedimento funcional de longo prazo — não apenas comportamento difícil, mas impossibilidade real de participação social.',
    ],
    legislacao: {
      titulo: 'Transtorno de personalidade e o BPC',
      texto: 'A Lei 10.216/2001 reconhece os transtornos mentais graves como condições que merecem proteção. No entanto, o INSS é resistente a conceder BPC para transtornos de personalidade, considerando-os "tratáveis" ou "comportamentais".',
      destaque: 'Alta dificuldade de aprovação. Exige documentação psiquiátrica robusta e de longo prazo.',
    },
    docs: [
      { tit: 'Laudo psiquiátrico com CID F60', desc: 'Diagnóstico detalhado com descrição dos padrões comportamentais e impacto funcional.' },
      { tit: 'Histórico de tratamento (2+ anos)', desc: 'Psicoterapia, medicações, CAPS — comprovam cronicidade.' },
      { tit: 'Histórico de internações', desc: 'Emergências psiquiátricas, tentativas de suicídio documentadas.' },
      { tit: 'Relatório psicossocial', desc: 'CAPS ou assistente social descrevendo o funcionamento social.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito pode ser cético. Documente a incapacidade com fatos concretos: empregos perdidos, relacionamentos rompidos, internações.',
      'Leve acompanhante que conheça a rotina e os episódios de crise.',
      'Comorbidades (depressão grave, TEPT) fortalecem o caso.',
    ],
    erros: [
      'Não ter diagnóstico formal por psiquiatra (muitos casos são subdiagnosticados)',
      'Apresentar menos de 2 anos de acompanhamento psiquiátrico',
      'Não documentar o impacto funcional objetivo (apenas descrever emoções)',
    ],
    recurso: 'Via judicial com perícia independente costuma ser mais favorável que o recurso administrativo.',
    relacionadas: ['DG', 'EQ', 'TB'],
  },

  /* ── SENSORIAL (extras) ── */

  RP: {
    legalBase: 'Lei 13.146/2015 (LBI) + Decreto 5.296/2004',
    minIdade: 'Qualquer',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A Retinose Pigmentar é uma distrofia hereditária da retina que causa perda progressiva da visão periférica (visão tubular) e cegueira noturna, podendo evoluir para cegueira total.',
      'A elegibilidade ao BPC depende do grau de perda visual documentado por campimetria e acuidade visual.',
    ],
    legislacao: {
      titulo: 'RP e deficiência visual',
      texto: 'O Decreto 5.296/2004 define deficiência visual como acuidade visual ≤0,05 no melhor olho com correção, ou campo visual ≤60°. Retinose pigmentar avançada geralmente atende esses critérios.',
      destaque: 'Campo visual ≤60° ou acuidade ≤0,05: elegível como deficiência visual.',
    },
    docs: [
      { tit: 'Laudo oftalmológico com CID H35.5', desc: 'Acuidade visual corrigida + campimetria visual computadorizada.' },
      { tit: 'Campimetria visual', desc: 'Documenta a redução do campo visual (graus) — exame mais importante.' },
      { tit: 'Eletrorretinografia (ERG)', desc: 'Confirma a distrofia retiniana e sua extensão.' },
      { tit: 'Exame de fundo de olho', desc: 'Mostra os espículas ósseas e atrofia do epitélio pigmentar.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A campimetria é o exame decisivo. Leve a mais recente (últimos 6 meses).',
      'Demonstre as dificuldades práticas: não enxergar à noite, tropeçar em obstáculos laterais, não poder dirigir.',
      'A doença é progressiva — leve campimetrias anteriores para mostrar a evolução.',
    ],
    erros: [
      'Não levar campimetria atualizada',
      'Basear o pedido apenas na acuidade central (que pode estar preservada)',
      'Não documentar o impacto na vida diária (mobilidade, trabalho)',
    ],
    recurso: 'Com campimetria mostrando campo ≤60°, o recurso é forte. Sem esse exame, é difícil.',
    relacionadas: ['DV', 'DA'],
  },

  VER: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'A vertigem (tontura rotatória) pode ter diversas causas: VPPB, Ménière, neurite vestibular, schwannoma. Na grande maioria dos casos, NÃO dá direito ao BPC porque é tratável ou autolimitada.',
      'Exceção: Doença de Ménière refratária bilateral ou vertigem central por lesão neurológica permanente.',
    ],
    legislacao: {
      titulo: 'Vertigem e o BPC — exceção rara',
      texto: 'O INSS quase sempre nega BPC para vertigem. A condição precisa ser permanente, bilateral e refratária ao tratamento para configurar impedimento de longo prazo.',
      destaque: 'Vertigem isolada: quase sempre negada. Ménière bilateral refratária: avaliar.',
    },
    docs: [
      { tit: 'Laudo otorrinolaringológico com CID H81', desc: 'Diagnóstico específico, causa, tratamentos tentados.' },
      { tit: 'Exames vestibulares', desc: 'Videonistagmografia, VEMP, audiometria.' },
      { tit: 'Histórico de tratamento', desc: 'Medicações, reabilitação vestibular, procedimentos cirúrgicos.' },
      { tit: 'Relatórios de impacto funcional', desc: 'Incapacidade de trabalhar, quedas frequentes, impossibilidade de dirigir.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito provavelmente negará. Foque na <strong>incapacidade funcional objetiva</strong>.',
      'Documente quedas, atendimentos de emergência, incapacidade de exercer atividades profissionais.',
      'A causa vestibular precisa ser comprovada por exames objetivos, não apenas relato.',
    ],
    erros: [
      'Pedir BPC por VPPB (é autolimitada e tratável)',
      'Não ter exames vestibulares objetivos',
      'Não documentar a falha de múltiplos tratamentos',
    ],
    recurso: 'Raramente favorável. A via judicial exige perícia especializada em otoneurologia.',
    relacionadas: ['DA', 'DV'],
  },

  /* ── CRÔNICA (extras) ── */

  ICA: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A Insuficiência Cardíaca Avançada (classe funcional III-IV da NYHA) causa limitação severa para atividades diárias — falta de ar aos mínimos esforços ou em repouso, edema, fadiga incapacitante.',
      'Diferente da cardiopatia leve, a IC avançada é potencialmente elegível ao BPC pela gravidade do impacto funcional.',
    ],
    legislacao: {
      titulo: 'IC avançada e o BPC',
      texto: 'A Portaria MS 1.298/2013 lista cardiopatia grave como doença que pode dispensar o prazo mínimo de 2 anos. IC classe III-IV é claramente incapacitante e a jurisprudência reconhece.',
      destaque: 'IC classe III-IV (NYHA): elegível. IC classe I-II: geralmente negada.',
    },
    docs: [
      { tit: 'Laudo cardiológico com CID I50', desc: 'Classificação NYHA (III ou IV), fração de ejeção (FE), tratamento em curso.' },
      { tit: 'Ecocardiograma recente', desc: 'FE reduzida (<40%), dilatação ventricular, valvopatias.' },
      { tit: 'BNP/NT-proBNP', desc: 'Marcador laboratorial de gravidade da IC.' },
      { tit: 'Teste ergométrico ou TC6M', desc: 'Documenta a capacidade funcional objetivamente.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A classificação NYHA é fundamental. Certifique-se de que o laudo especifica classe III ou IV.',
      'Se usar marcapasso, CDI ou necessitar transplante, documente.',
      'Demonstre a limitação: não consegue subir escadas, caminhar mais de 100m, etc.',
    ],
    erros: [
      'Laudo sem classificação NYHA',
      'Ecocardiograma desatualizado (mais de 6 meses)',
      'Não documentar internações por descompensação',
    ],
    recurso: 'IC classe III-IV com FE baixa: recurso favorável. IC leve: difícil.',
    relacionadas: ['CG', 'HIP', 'IR'],
  },

  HAN: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Lei 11.520/2007',
    minIdade: 'Qualquer',
    duracao: 'Permanente (quando há sequelas)',
    o_que_e: [
      'A Hanseníase (Mal de Hansen) é uma doença infecciosa crônica que pode causar lesões nervosas permanentes, deformidades, perda de sensibilidade e amputações. O tratamento cura a infecção, mas as sequelas são irreversíveis.',
      'Para o BPC, o que conta são as sequelas — não a doença ativa.',
    ],
    legislacao: {
      titulo: 'Hanseníase e o BPC — proteção legal forte',
      texto: 'A Lei 11.520/2007 oferece proteção especial aos ex-pacientes de hanseníase. Há pensão especial para internados compulsórios. Para os demais com sequelas, o BPC é o caminho quando há impedimento funcional e renda compatível.',
      destaque: 'Sequelas permanentes da hanseníase: elegível. Doença tratada sem sequelas: negada.',
    },
    docs: [
      { tit: 'Laudo dermatológico/neurológico com CID A30', desc: 'Grau de incapacidade da OMS (0, 1 ou 2). Grau 2 = deficiência visível.' },
      { tit: 'Avaliação de sensibilidade', desc: 'Monofilamentos de Semmes-Weinstein — documenta a perda sensitiva.' },
      { tit: 'Fotos das deformidades', desc: 'Mão em garra, pé caído, úlceras, amputações.' },
      { tit: 'Relatório de reabilitação', desc: 'Uso de órteses, próteses, adaptações.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Leve os resultados dos testes de sensibilidade — mostram objetivamente a neuropatia.',
      'Deformidades visíveis (mão em garra, pé caído) pesam muito na avaliação.',
      'Se houve estigma/discriminação que impede trabalho, documente.',
    ],
    erros: [
      'Pedir BPC durante o tratamento sem documentar sequelas',
      'Não ter o grau de incapacidade da OMS documentado',
      'Omitir o estigma social como barreira funcional',
    ],
    recurso: 'Grau de incapacidade 2 da OMS: recurso favorável. Grau 0-1 sem sequelas funcionais: difícil.',
    relacionadas: ['AMP', 'LM', 'DV'],
  },

  DBC: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado isoladamente)',
    o_que_e: [
      'O Diabetes Mellitus tipo 1 ou 2, por si só, quase NUNCA dá direito ao BPC. O INSS e a jurisprudência consideram diabetes uma condição tratável que não configura impedimento de longo prazo.',
      'A exceção são as complicações graves: retinopatia diabética com cegueira, nefropatia com hemodiálise, neuropatia com amputação, pé diabético crônico.',
    ],
    legislacao: {
      titulo: 'Por que diabetes isolada não dá BPC',
      texto: 'O BPC exige impedimento que limite a participação social. Diabetes controlada com insulina permite vida funcional. A Portaria 37/2026 reforçou que condições tratáveis não configuram deficiência.',
      destaque: 'Diabetes isolada: não elegível. Complicações graves: avaliar como condição separada (cegueira, amputação, hemodiálise).',
    },
    docs: [
      { tit: 'Laudos das complicações', desc: 'O pedido deve focar na complicação, não no diabetes. Ex: laudo oftalmológico para retinopatia.' },
      { tit: 'Exames comprovando complicações', desc: 'Fundo de olho (retinopatia), creatinina/clearance (nefropatia), ENMG (neuropatia).' },
      { tit: 'Histórico de amputações', desc: 'Se houver, documentar com CID Z89 e relatório cirúrgico.' },
      { tit: 'Receituários de insulina', desc: 'Mostram a gravidade e o custo do tratamento.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Não peça BPC por diabetes — peça pelas <strong>complicações</strong>.',
      'Se houver amputação, retinopatia ou nefropatia, o CID principal deve ser o da complicação.',
      'Documente a incapacidade funcional causada pelas complicações, não pela diabetes em si.',
    ],
    erros: [
      'Pedir BPC citando diabetes tipo 2 como diagnóstico principal',
      'Não documentar as complicações específicas',
      'Esperar que insulinodependência por si só justifique o BPC',
    ],
    recurso: 'Diabetes isolada: recurso quase nunca favorável. Com complicações graves documentadas: avaliar pelo CID da complicação.',
    relacionadas: ['DV', 'IR', 'AMP'],
  },

  PCV: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação recente e controversa',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A Síndrome Pós-COVID (Long COVID) causa fadiga crônica, névoa mental, dispneia, dor, alterações cognitivas e outros sintomas persistentes após a infecção por SARS-CoV-2.',
      'Para o BPC, a dificuldade é enorme: não há critérios diagnósticos objetivos consolidados, os sintomas são subjetivos e o INSS é muito resistente.',
    ],
    legislacao: {
      titulo: 'Pós-COVID e o BPC — território novo',
      texto: 'O CID U09.9 (condição pós-COVID-19) foi criado em 2021. Ainda não há jurisprudência consolidada sobre BPC para Long COVID. Os poucos casos favoráveis envolvem sequelas objetivas (fibrose pulmonar, AVC pós-COVID, cardiopatia).',
      destaque: 'Long COVID com sintomas subjetivos: altíssima dificuldade. Sequelas objetivas: avaliar pelo CID da sequela.',
    },
    docs: [
      { tit: 'Comprovação de infecção prévia', desc: 'PCR ou sorologia positiva + laudos de internação quando houver.' },
      { tit: 'Laudo com CID U09.9', desc: 'Descrição dos sintomas persistentes (>12 semanas) e impacto funcional.' },
      { tit: 'Exames das sequelas', desc: 'TC de tórax (fibrose), ECO (cardiopatia), neuropsicológico (déficit cognitivo).' },
      { tit: 'Histórico de tratamento', desc: 'Reabilitação pulmonar, medicações, acompanhamento multidisciplinar.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Foque nas <strong>sequelas objetivas</strong>: exames de imagem, testes funcionais, avaliação neuropsicológica.',
      'Sintomas puramente subjetivos (fadiga, névoa mental) são muito difíceis de comprovar na perícia.',
      'Se possível, peça pelo CID da sequela específica (fibrose = J84, cardiopatia = I50), não pelo U09.9 genérico.',
    ],
    erros: [
      'Basear o pedido em sintomas subjetivos sem exames objetivos',
      'Usar apenas o CID U09.9 genérico',
      'Não ter pelo menos 6 meses de documentação de persistência dos sintomas',
    ],
    recurso: 'Via judicial com perícia especializada e exames objetivos. Recurso administrativo: muito difícil.',
    relacionadas: ['FP', 'DPOC', 'DG'],
  },

  HIP: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'A hipertensão arterial sistêmica, por si só, NÃO dá direito ao BPC. É uma condição extremamente comum, tratável e que, na maioria dos casos, não causa impedimento funcional.',
      'A exceção é a cardiopatia hipertensiva grave (CID I11) com insuficiência cardíaca avançada, que é avaliada como cardiopatia, não como hipertensão.',
    ],
    legislacao: {
      titulo: 'Hipertensão e o BPC — quase nunca',
      texto: 'O INSS nega sistematicamente BPC para hipertensão. A jurisprudência também é desfavorável. Hipertensão é condição tratável e não configura deficiência.',
      destaque: 'Hipertensão isolada: não elegível. Cardiopatia hipertensiva grave: avaliar como IC avançada.',
    },
    docs: [
      { tit: 'Laudos das complicações', desc: 'Eco (cardiopatia), clearance (nefropatia), fundo de olho (retinopatia).' },
      { tit: 'MAPA 24h', desc: 'Monitorização ambulatorial da pressão arterial.' },
      { tit: 'Ecocardiograma', desc: 'Se houver cardiopatia hipertensiva (hipertrofia ventricular, IC).' },
    ],
    pericia: [
      'Não peça BPC por hipertensão. Se houver complicação grave, peça por ela.',
      'Cardiopatia hipertensiva grave → peça como IC avançada (CID I50).',
      'Nefropatia hipertensiva → peça como insuficiência renal (CID N18).',
    ],
    erros: [
      'Pedir BPC citando hipertensão como diagnóstico principal',
      'Não investigar complicações que poderiam ser o fundamento real',
    ],
    recurso: 'Hipertensão isolada: recurso não favorável. Com complicações: tratar como a condição específica.',
    relacionadas: ['ICA', 'CG', 'IR'],
  },

  VAR: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'Varizes (insuficiência venosa crônica) quase NUNCA dão direito ao BPC. É condição comum, tratável cirurgicamente e que raramente causa impedimento funcional de longo prazo.',
      'A exceção são casos de insuficiência venosa crônica grave (CEAP C5-C6) com úlceras venosas crônicas que não cicatrizam e impedem o trabalho.',
    ],
    legislacao: {
      titulo: 'Varizes e o BPC — exceção extrema',
      texto: 'O INSS nega sistematicamente. Varizes são condição tratável. Apenas casos de insuficiência venosa crônica gravíssima com úlceras refratárias podem ser considerados.',
      destaque: 'Varizes comuns: não elegível. Úlceras venosas crônicas refratárias: possível, mas difícil.',
    },
    docs: [
      { tit: 'Laudo vascular com CID I83', desc: 'Classificação CEAP, descrição das úlceras, tempo de evolução.' },
      { tit: 'Eco-Doppler venoso', desc: 'Documenta a insuficiência venosa e sua gravidade.' },
      { tit: 'Fotos das úlceras', desc: 'Documentação visual da gravidade.' },
      { tit: 'Histórico de tratamentos', desc: 'Cirurgias, curativos, internações — mostra a refratariedade.' },
    ],
    pericia: [
      'Foque nas úlceras crônicas e na impossibilidade de trabalhar, não nas varizes em si.',
      'Documente o custo com curativos e a necessidade de cuidados contínuos.',
    ],
    erros: [
      'Pedir BPC por varizes sem complicações',
      'Não ter classificação CEAP documentada',
    ],
    recurso: 'CEAP C5-C6 com úlceras refratárias: possível na via judicial. CEAP C1-C4: não favorável.',
    relacionadas: ['HIP', 'DBC'],
  },

  FEN: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer (diagnóstico neonatal)',
    duracao: 'Permanente (quando há déficit intelectual)',
    o_que_e: [
      'A Fenilcetonúria (PKU) é um erro inato do metabolismo em que o corpo não consegue processar o aminoácido fenilalanina. Sem dieta especial rigorosa, causa déficit intelectual progressivo e irreversível.',
      'Com diagnóstico precoce (teste do pezinho) e dieta, o desenvolvimento é normal. O BPC aplica-se quando há déficit intelectual já instalado ou quando a dieta especial representa custo proibitivo.',
    ],
    legislacao: {
      titulo: 'PKU e o BPC',
      texto: 'PKU com déficit intelectual instalado é elegível como deficiência intelectual (CID F70-F79). PKU sem déficit mas com necessidade de dieta especial cara pode ser argumentada pela via judicial (custo como barreira).',
      destaque: 'PKU com DI: elegível. PKU controlada sem DI: difícil, mas judicializável pelo custo da dieta.',
    },
    docs: [
      { tit: 'Teste do pezinho ou dosagem de FAL com CID E70.0', desc: 'Confirma o diagnóstico de PKU.' },
      { tit: 'Avaliação neuropsicológica', desc: 'Se houver déficit intelectual, QI e perfil funcional.' },
      { tit: 'Laudos de nutrição', desc: 'Dieta especial, fórmulas metabólicas, custo mensal.' },
      { tit: 'Receituários da fórmula metabólica', desc: 'Comprovam o tratamento contínuo e o custo.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Se há DI, o pedido é pela deficiência intelectual — a PKU é a causa.',
      'Se não há DI, o argumento é o custo proibitivo da dieta especial como barreira.',
      'Documente o custo mensal das fórmulas metabólicas.',
    ],
    erros: [
      'Pedir BPC apenas pelo diagnóstico de PKU sem documentar DI ou custo',
      'Não levar o teste do pezinho ou dosagem de fenilalanina',
    ],
    recurso: 'PKU com DI: recurso favorável. PKU sem DI: via judicial argumentando custo proibitivo.',
    relacionadas: ['DI', 'WD'],
  },

  DC: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'Dores crônicas sem lesão estrutural identificável (CID R52) — como dor difusa, dor neuropática sem causa, síndrome dolorosa complexa — quase nunca dão BPC.',
      'O INSS exige causa objetiva e impedimento funcional comprovável. Dor é subjetiva e difícil de mensurar na perícia.',
    ],
    legislacao: {
      titulo: 'Dor crônica e o BPC — exceção rara',
      texto: 'A legislação não proíbe BPC para dor crônica, mas a comprovação é extremamente difícil. Sem causa estrutural identificável, o perito tende a negar. A jurisprudência é heterogênea.',
      destaque: 'Dor crônica sem causa estrutural: altíssima dificuldade. Com causa documentada: avaliar pela patologia de base.',
    },
    docs: [
      { tit: 'Laudo médico com CID R52', desc: 'Descrição da dor, localização, duração, impacto funcional.' },
      { tit: 'Exames que excluem outras causas', desc: 'RM, TC, EMG — mostram que houve investigação adequada.' },
      { tit: 'Histórico de tratamento', desc: 'Múltiplas medicações, bloqueios, fisioterapia — comprovam refratariedade.' },
      { tit: 'Relatório de equipe de dor', desc: 'Se acompanhado em clínica de dor, relatório detalhado.' },
    ],
    pericia: [
      'O perito quase certamente negará dor sem causa objetiva. Foque em demonstrar a <strong>incapacidade funcional</strong>.',
      'Se houver uma causa (fibromialgia, neuropatia), peça pelo CID dessa condição.',
      'Documente o uso crônico de opioides ou outros analgésicos potentes.',
    ],
    erros: [
      'Pedir BPC apenas por "dor" sem investigação diagnóstica',
      'Não ter pelo menos 2 anos de tratamento documentado',
      'Não identificar uma patologia de base que justifique a dor',
    ],
    recurso: 'Muito difícil. A via judicial com perícia especializada em dor é a melhor chance.',
    relacionadas: ['FM', 'LC', 'HD'],
  },

  /* ── REUMATOLÓGICA ── */

  FM: {
    legalBase: 'Lei 8.742/1993 (LOAS) — alta dificuldade',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A Fibromialgia é uma síndrome de dor crônica generalizada acompanhada de fadiga, distúrbios do sono, névoa mental e pontos dolorosos. Não há exame que a comprove — o diagnóstico é clínico.',
      'Para o BPC, a fibromialgia enfrenta altíssima taxa de negativa. O INSS considera doença tratável e não incapacitante na maioria dos casos.',
    ],
    legislacao: {
      titulo: 'Fibromialgia e o BPC — batalha conhecida',
      texto: 'Não há lei que proíba BPC para fibromialgia, mas a jurisprudência é dividida. O principal desafio é provar o impedimento funcional de longo prazo quando não há exame objetivo que confirme a doença.',
      destaque: 'Fibromialgia incapacitante com comorbidades: possível. Fibromialgia isolada leve: quase sempre negada.',
    },
    docs: [
      { tit: 'Laudo reumatológico com CID M79.7', desc: 'Diagnóstico formal, pontos dolorosos, gravidade, impacto funcional.' },
      { tit: 'Receituários crônicos', desc: 'Antidepressivos (duloxetina), pregabalina, opioides — mostram gravidade do tratamento.' },
      { tit: 'Laudos de comorbidades', desc: 'Depressão grave, ansiedade, artrite — fortalecem o caso.' },
      { tit: 'Relatório de fisioterapia/reabilitação', desc: 'Frequência, resposta ao tratamento, limitações persistentes.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito provavelmente negará. Foque nas <strong>comorbidades</strong> (depressão grave, artrite) como fundamento paralelo.',
      'Leve diário de sintomas dos últimos meses mostrando os dias de incapacidade.',
      'Não se arrume demais para a perícia — vista-se como se veste quando está em crise.',
    ],
    erros: [
      'Basear todo o pedido apenas na fibromialgia sem comorbidades',
      'Não ter pelo menos 2 anos de tratamento documentado',
      'Não documentar o impacto funcional em termos concretos',
      'Apresentar-se bem no dia da perícia sem relato de acompanhante',
    ],
    recurso: 'Via judicial com perícia reumatológica especializada é a melhor chance. Recurso administrativo: muito difícil.',
    relacionadas: ['DC', 'DG', 'AR'],
  },

  AR: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos ou mais',
    o_que_e: [
      'A Artrite Reumatoide (AR) é uma doença autoimune que causa inflamação crônica das articulações, levando a destruição articular progressiva, deformidades e incapacidade funcional.',
      'A elegibilidade ao BPC depende do grau de comprometimento articular e funcional. AR controlada com metotrexato pode não configurar impedimento.',
    ],
    legislacao: {
      titulo: 'AR e o BPC — depende da gravidade',
      texto: 'AR com destruição articular documentada por raio-X (erosões, deformidades) e limitação funcional importante é elegível. AR leve ou controlada geralmente não.',
      destaque: 'AR erosiva com deformidades e limitação funcional: elegível. AR controlada sem erosões: geralmente negada.',
    },
    docs: [
      { tit: 'Laudo reumatológico com CID M05', desc: 'Diagnóstico, DAS28, número de articulações acometidas, deformidades.' },
      { tit: 'Raio-X das mãos e pés', desc: 'Mostra erosões ósseas e deformidades — prova objetiva.' },
      { tit: 'Exames laboratoriais', desc: 'Fator reumatoide, anti-CCP, VHS, PCR — confirmam atividade da doença.' },
      { tit: 'Fotos das deformidades', desc: 'Desvio ulnar, boutonnière, pescoço de cisne.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'As deformidades das mãos são visualmente impactantes. Mostre ao perito.',
      'Documente a perda de força de preensão e a incapacidade de realizar tarefas manuais.',
      'Leve a lista completa de medicações (biológicos como adalimumabe custam caro — isso conta na via judicial).',
    ],
    erros: [
      'Não levar raio-X mostrando as erosões',
      'Apresentar apenas exames laboratoriais sem documentação funcional',
      'Não documentar a perda de força e destreza manual',
    ],
    recurso: 'AR erosiva com deformidades: recurso favorável. AR sem erosões: mais difícil.',
    relacionadas: ['APs', 'ESD', 'LE'],
  },

  APs: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos',
    o_que_e: [
      'A Artrite Psoriásica é uma artrite inflamatória crônica associada à psoríase. Pode causar destruição articular, entesite (inflamação de tendões) e dactilite (dedos em salsicha).',
      'A elegibilidade depende do comprometimento funcional — formas leves com psoríase cutânea não dão BPC; formas graves com destruição articular podem.',
    ],
    legislacao: {
      titulo: 'Artrite psoriásica e o BPC',
      texto: 'Mesma lógica da AR: o que importa é o comprometimento articular e funcional, não o diagnóstico isolado. Formas mutilantes e com entesite incapacitante são elegíveis.',
      destaque: 'APs com destruição articular: condicional. APs cutânea sem artrite grave: negada.',
    },
    docs: [
      { tit: 'Laudo reumatológico com CID L40.5', desc: 'Forma da artrite (oligoarticular, poliarticular, mutilante), DAPSA ou DAS28.' },
      { tit: 'Raio-X e RM articular', desc: 'Erosões, sacroileíte, entesite documentada por imagem.' },
      { tit: 'Laudo dermatológico', desc: 'Extensão e gravidade da psoríase (PASI).' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Mostre as articulações acometidas e as lesões cutâneas.',
      'Documente a perda funcional: dificuldade para caminhar, usar as mãos, vestir-se.',
      'Leve fotos das crises articulares (articulações inchadas).',
    ],
    erros: [
      'Basear o pedido na psoríase cutânea sem documentar o comprometimento articular',
      'Não ter exames de imagem das articulações',
    ],
    recurso: 'APs mutilante: recurso favorável. APs leve: difícil.',
    relacionadas: ['AR', 'LE', 'ESD'],
  },

  ESD: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer',
    duracao: '2 anos ou mais',
    o_que_e: [
      'A Esclerodermia (Esclerose Sistêmica) é uma doença autoimune que causa fibrose progressiva da pele e de órgãos internos (pulmões, coração, rins, trato gastrointestinal).',
      'A forma difusa é grave e potencialmente fatal. A forma limitada (CREST) é mais branda. A elegibilidade depende do envolvimento de órgãos.',
    ],
    legislacao: {
      titulo: 'Esclerodermia e o BPC',
      texto: 'Esclerodermia difusa com fibrose pulmonar, hipertensão pulmonar ou comprometimento renal é claramente elegível. A forma limitada com acometimento apenas cutâneo pode ser negada.',
      destaque: 'Esclerodermia difusa com envolvimento de órgãos: elegível. Forma limitada cutânea: condicional.',
    },
    docs: [
      { tit: 'Laudo reumatológico com CID M34', desc: 'Forma (difusa/limitada), órgãos acometidos, anticorpos (anti-Scl70, anticentrômero).' },
      { tit: 'TC de tórax', desc: 'Documenta fibrose pulmonar — complicação mais grave.' },
      { tit: 'Ecocardiograma', desc: 'Avalia hipertensão pulmonar (pressão artéria pulmonar).' },
      { tit: 'Prova de função pulmonar', desc: 'CVF e DLCO — avaliam a capacidade respiratória.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O envolvimento pulmonar é o argumento mais forte. Leve TC de tórax e espirometria.',
      'Documente as dificuldades cutâneas: esclerodactilia (dedos endurecidos), dificuldade para abrir a boca, Raynaud grave.',
      'Se houver úlceras digitais, fotografe.',
    ],
    erros: [
      'Não investigar envolvimento pulmonar (muitas vezes assintomático no início)',
      'Basear o pedido apenas nas alterações cutâneas',
      'Não levar espirometria',
    ],
    recurso: 'Fibrose pulmonar + esclerodermia: recurso favorável. Forma limitada sem órgãos: difícil.',
    relacionadas: ['FP', 'LE', 'AR'],
  },

  ART: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação condicional',
    minIdade: 'Qualquer (geralmente 50+)',
    duracao: '2 anos',
    o_que_e: [
      'A Artrose (Osteoartrite) é a doença articular degenerativa mais comum. Na maioria dos casos, NÃO dá direito ao BPC — é considerada parte do envelhecimento natural.',
      'A exceção é a artrose avançada com destruição articular grave, deformidade e incapacidade para a marcha ou atividades manuais, especialmente quando a cirurgia (prótese) não é viável.',
    ],
    legislacao: {
      titulo: 'Artrose e o BPC — casos graves',
      texto: 'Artrose leve a moderada não configura deficiência. Artrose avançada (graus III-IV de Kellgren-Lawrence) com limitação funcional severa pode ser elegível, especialmente se o paciente não pode ser operado.',
      destaque: 'Artrose KL III-IV com impossibilidade cirúrgica: condicional. Artrose leve-moderada: não elegível.',
    },
    docs: [
      { tit: 'Raio-X com classificação de Kellgren-Lawrence', desc: 'Grau III ou IV — prova objetiva da gravidade.' },
      { tit: 'Laudo ortopédico com CID M15-M19', desc: 'Articulações acometidas, grau de deformidade, motivo de contraindicação cirúrgica.' },
      { tit: 'Relatório de fisioterapia', desc: 'Amplitude de movimento, capacidade de marcha, uso de auxiliares.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'O perito vai perguntar sobre cirurgia (prótese). Se não fez, explique o motivo (risco, contraindicação, fila de espera).',
      'Demonstre a limitação de marcha: use bengala, andador, se necessário.',
      'Artrose de joelho bilateral com incapacidade de marcha: argumento mais forte.',
    ],
    erros: [
      'Pedir BPC por artrose leve sem raio-X avançado',
      'Não explicar por que não fez cirurgia de prótese',
      'Não documentar a limitação de marcha objetivamente',
    ],
    recurso: 'KL III-IV bilateral com contraindicação cirúrgica: recurso possível. KL I-II: não favorável.',
    relacionadas: ['AR', 'OPG', 'LC'],
  },

  OPG: {
    legalBase: 'Lei 8.742/1993 (LOAS) + LBI',
    minIdade: 'Qualquer (geralmente 60+)',
    duracao: '2 anos ou mais',
    o_que_e: [
      'A Osteoporose grave com fraturas patológicas (CID M80) pode causar deformidade vertebral, dor crônica e limitação severa da mobilidade. A condição por si só (CID M81 sem fraturas) não dá BPC.',
      'O BPC é para os casos com fraturas que causaram sequelas: cifose acentuada, perda de altura, compressão medular, incapacidade de marcha.',
    ],
    legislacao: {
      titulo: 'Osteoporose e o BPC',
      texto: 'Osteoporose sem fraturas (M81) não é deficiência. Osteoporose com fraturas patológicas (M80) e sequelas funcionais pode configurar impedimento.',
      destaque: 'Fraturas vertebrais com cifose grave e dor crônica: condicional. Osteoporose sem fraturas: não elegível.',
    },
    docs: [
      { tit: 'Densitometria óssea', desc: 'T-score comprovando osteoporose (<-2.5).' },
      { tit: 'Raio-X ou RM da coluna', desc: 'Documenta fraturas vertebrais, acunhamento, cifose.' },
      { tit: 'Laudo ortopédico com CID M80', desc: 'Fraturas, deformidades, limitação funcional.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'Documente as fraturas e suas consequências funcionais.',
      'Cifose acentuada e dor crônica que impedem atividades: argumento mais forte.',
      'Se houve múltiplas fraturas, leve o histórico completo.',
    ],
    erros: [
      'Pedir BPC por osteoporose sem fraturas',
      'Usar CID M81 em vez de M80 (com fraturas)',
      'Não documentar o impacto funcional das fraturas',
    ],
    recurso: 'Múltiplas fraturas vertebrais com deformidade: recurso possível. Osteoporose sem fraturas: não favorável.',
    relacionadas: ['ART', 'LC', 'AMP'],
  },

  /* ── RESPIRATÓRIA ── */

  DPOC: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer (geralmente 50+)',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A DPOC (Doença Pulmonar Obstrutiva Crônica) é causada principalmente pelo tabagismo. Causa obstrução progressiva do fluxo aéreo, dispneia, tosse crônica e exacerbações frequentes.',
      'Para o BPC, a DPOC precisa ser classificada como GOLD III (grave) ou IV (muito grave), com limitação respiratória severa comprovada por espirometria.',
    ],
    legislacao: {
      titulo: 'DPOC e o BPC',
      texto: 'DPOC GOLD I-II geralmente não gera BPC — o INSS considera controlável com broncodilatadores. GOLD III-IV com VEF1 <50% predito configura impedimento funcional significativo. A Portaria MS 1.298/2013 lista doenças respiratórias graves.',
      destaque: 'DPOC GOLD III-IV: condicional. DPOC GOLD I-II: geralmente negada.',
    },
    docs: [
      { tit: 'Espirometria com CID J44', desc: 'VEF1 <50% predito (GOLD III) ou <30% (GOLD IV). Exame fundamental.' },
      { tit: 'TC de tórax', desc: 'Enfisema, bronquiectasias, complicações.' },
      { tit: 'Gasometria arterial', desc: 'Hipoxemia crônica — se usar O2 domiciliar, este é o documento.' },
      { tit: 'Prescrição de O2 domiciliar', desc: 'Comprova a dependência de oxigênio — muito impactante.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A espirometria é o exame decisivo. Leve a mais recente.',
      'Se usa O2 domiciliar, leve a prescrição e, se possível, vá com o equipamento.',
      'Documente exacerbações que levaram a internação.',
    ],
    erros: [
      'Não ter espirometria (o perito pode solicitar e atrasar)',
      'Não documentar o uso de O2 domiciliar',
      'Não levar histórico de internações por exacerbação',
    ],
    recurso: 'GOLD III-IV com espirometria e O2 domiciliar: recurso favorável. GOLD I-II: difícil.',
    relacionadas: ['FP', 'ICA', 'CA'],
  },

  FP: {
    legalBase: 'Lei 8.742/1993 (LOAS) + Portaria MS 1.298/2013',
    minIdade: 'Qualquer (geralmente 50+)',
    duracao: 'Permanente e progressiva',
    o_que_e: [
      'A Fibrose Pulmonar (especialmente a Idiopática — FPI) é uma doença progressiva e irreversível em que o tecido pulmonar é substituído por cicatriz, reduzindo progressivamente a capacidade respiratória.',
      'A sobrevida média na FPI é de 3-5 anos. O único tratamento definitivo é o transplante pulmonar.',
    ],
    legislacao: {
      titulo: 'Fibrose pulmonar e o BPC',
      texto: 'Como doença progressiva, irreversível e potencialmente fatal, a fibrose pulmonar se enquadra nas doenças graves que podem dispensar o prazo de 2 anos. A elegibilidade depende do grau de comprometimento funcional.',
      destaque: 'FPI diagnosticada com CVF <70% e/ou DLCO <50%: elegível.',
    },
    docs: [
      { tit: 'TC de tórax de alta resolução com CID J84.1', desc: 'Padrão UIP (fibrose com faveolamento) — diagnóstico por imagem.' },
      { tit: 'Prova de função pulmonar', desc: 'CVF e DLCO — medem a capacidade respiratória restante.' },
      { tit: 'TC6M (teste de caminhada de 6 minutos)', desc: 'Mede a dessaturação ao esforço — prova funcional objetiva.' },
      { tit: 'Prescrição de O2 domiciliar', desc: 'Se necessário, comprova a gravidade.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A TC de tórax e a espirometria são decisivas. Leve as mais recentes.',
      'Se a pessoa dessatura ao caminhar, o TC6M comprova objetivamente.',
      'Documente a progressão: espirometrias anteriores vs. atuais mostrando a piora.',
    ],
    erros: [
      'Não levar TC de alta resolução',
      'Não ter espirometria com DLCO',
      'Não documentar a necessidade de O2',
    ],
    recurso: 'FPI com CVF <70% e DLCO <50%: recurso favorável. Fibrose leve e estável: mais difícil.',
    relacionadas: ['DPOC', 'ESD', 'ICA'],
  },

  /* ── ORTOPÉDICA ── */

  AMP: {
    legalBase: 'Lei 13.146/2015 (LBI)',
    minIdade: 'Qualquer',
    duracao: 'Permanente',
    o_que_e: [
      'A amputação de membro ou segmento é uma deficiência física permanente. As causas mais comuns são trauma (acidente), diabetes (pé diabético) e doença vascular.',
      'Para o BPC, a amputação é deficiência reconhecida. A elegibilidade é condicional ao nível da amputação e ao impacto funcional — amputação de um dedo, por exemplo, pode não configurar impedimento.',
    ],
    legislacao: {
      titulo: 'Amputação e o BPC',
      texto: 'A LBI reconhece a perda de membro como deficiência física. Amputação de membro inferior (acima ou abaixo do joelho) ou superior tem alta taxa de aprovação. Amputações menores (dedos, falanges) dependem do impacto funcional.',
      destaque: 'Amputação de membro: elegível. Amputação de dedo isolado: condicional.',
    },
    docs: [
      { tit: 'Laudo médico com CID Z89', desc: 'Nível da amputação, causa, data, lateralidade.' },
      { tit: 'Relatório de reabilitação', desc: 'Uso de prótese, capacidade de marcha, independência funcional.' },
      { tit: 'Fotos', desc: 'Documentação visual do coto e da prótese (quando usada).' },
      { tit: 'Relatório funcional', desc: 'Atividades que consegue/não consegue fazer. Necessidade de adaptações.' },
      { tit: 'CadÚnico + renda', desc: 'Atualizado.' },
    ],
    pericia: [
      'A deficiência é visualmente evidente. Vá à perícia com/sem prótese como usa no dia a dia.',
      'Se a prótese é insuficiente para atividades laborais, documente.',
      'Amputações bilaterais ou de membro dominante pesam mais.',
    ],
    erros: [
      'Não levar laudo descrevendo o nível exato da amputação',
      'Não documentar a limitação funcional residual mesmo com prótese',
    ],
    recurso: 'Amputação de membro: raramente negada. Quando é, geralmente por renda.',
    relacionadas: ['LM', 'DBC', 'HAN'],
  },

  HD: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'A Hérnia de Disco é extremamente comum e, na grande maioria dos casos, NÃO dá direito ao BPC. O INSS considera condição tratável (cirurgia, fisioterapia, medicação).',
      'A exceção são casos gravíssimos: síndrome da cauda equina com bexiga neurogênica, falha cirúrgica com deficit neurológico permanente, ou estenose espinhal grave com incapacidade de marcha.',
    ],
    legislacao: {
      titulo: 'Hérnia de disco e o BPC — exceção extrema',
      texto: 'O INSS nega sistematicamente BPC para hérnia de disco. A jurisprudência é desfavorável na maioria dos casos. Apenas sequelas neurológicas permanentes comprovadas podem configurar impedimento.',
      destaque: 'Hérnia de disco isolada: não elegível. Síndrome da cauda equina / deficit motor permanente: avaliar.',
    },
    docs: [
      { tit: 'RM da coluna com CID M51', desc: 'Mostra a hérnia, seu tamanho e relação com as raízes nervosas.' },
      { tit: 'ENMG', desc: 'Comprova radiculopatia e deficit neurológico objetivo.' },
      { tit: 'Laudo neurocirúrgico', desc: 'Se operou: resultado. Se não: por que não (contraindicação, falha prévia).' },
      { tit: 'Relatório de fisioterapia', desc: 'Resposta ao tratamento conservador.' },
    ],
    pericia: [
      'Hérnia sem deficit neurológico: perito negará. Foque no <strong>deficit motor comprovado por ENMG</strong>.',
      'Se houve cirurgia sem melhora, documente a falha cirúrgica.',
      'Síndrome da cauda equina: argumento forte se documentada.',
    ],
    erros: [
      'Pedir BPC por hérnia de disco sem deficit neurológico',
      'Não ter ENMG comprovando radiculopatia',
      'Basear o pedido apenas na dor (subjetiva)',
    ],
    recurso: 'Deficit motor permanente pós-cirúrgico: recurso possível. Hérnia sem deficit: não favorável.',
    relacionadas: ['LC', 'LM', 'DC'],
  },

  LC: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'A Lombalgia Crônica (dor lombar persistente) é uma das queixas mais comuns na população. Na grande maioria dos casos, NÃO dá direito ao BPC. O INSS considera condição tratável e sem impedimento funcional.',
      'A exceção são casos com causa estrutural grave: estenose espinhal severa, espondilolistese grau III-IV, fratura vertebral com deficit neurológico.',
    ],
    legislacao: {
      titulo: 'Lombalgia e o BPC — via de regra, negada',
      texto: 'A jurisprudência é massivamente desfavorável para lombalgia crônica sem causa estrutural grave. O INSS trata como condição tratável.',
      destaque: 'Lombalgia sem causa estrutural: não elegível. Estenose espinhal severa / deficit motor: avaliar.',
    },
    docs: [
      { tit: 'RM da coluna com CID M54.5', desc: 'Mostra a causa estrutural quando presente.' },
      { tit: 'ENMG', desc: 'Comprova radiculopatia se houver.' },
      { tit: 'Laudo ortopédico/neurocirúrgico', desc: 'Diagnóstico específico, gravidade, impossibilidade cirúrgica.' },
      { tit: 'Relatório de fisioterapia', desc: 'Mostra a falha do tratamento conservador.' },
    ],
    pericia: [
      'Lombalgia inespecífica: perito negará. Foque na <strong>causa estrutural</strong>.',
      'Se houver estenose espinhal: documente a claudicação neurogênica (incapacidade de caminhar).',
      'ENMG com radiculopatia objetiva fortalece o caso.',
    ],
    erros: [
      'Pedir BPC por "dor lombar" sem diagnóstico estrutural',
      'Não ter RM da coluna',
      'Basear o pedido apenas na dor sem deficit funcional objetivo',
    ],
    recurso: 'Causa estrutural grave com deficit motor: recurso possível. Lombalgia inespecífica: não favorável.',
    relacionadas: ['HD', 'DC', 'ART'],
  },

  STC: {
    legalBase: 'Lei 8.742/1993 (LOAS) — aplicação restrita',
    minIdade: 'Qualquer',
    duracao: '2 anos (raramente configurado)',
    o_que_e: [
      'A Síndrome do Túnel do Carpo (STC) é a compressão do nervo mediano no punho, causando dor, formigamento e fraqueza na mão. É extremamente comum e tratável cirurgicamente.',
      'Para o BPC, a STC quase NUNCA é elegível. A exceção são casos bilaterais graves pós-cirúrgicos com deficit motor permanente e perda de força de preensão.',
    ],
    legislacao: {
      titulo: 'STC e o BPC — exceção extrema',
      texto: 'O INSS nega sistematicamente. STC é condição cirurgicamente tratável. Apenas casos com deficit permanente bilateral pós-cirúrgico são considerados.',
      destaque: 'STC bilateral com deficit motor permanente pós-cirúrgico: avaliar. STC tratável: não elegível.',
    },
    docs: [
      { tit: 'ENMG bilateral com CID G56.0', desc: 'Comprova a compressão do nervo e seu grau.' },
      { tit: 'Laudo ortopédico/neurocirúrgico', desc: 'Resultado pós-cirúrgico, motivo de falha quando houver.' },
      { tit: 'Teste de força de preensão', desc: 'Dinamometria — prova objetiva de fraqueza.' },
    ],
    pericia: [
      'STC unilateral tratável: perito negará. Foque no <strong>deficit bilateral permanente</strong>.',
      'Demonstre a impossibilidade de realizar atividades manuais básicas.',
    ],
    erros: [
      'Pedir BPC por STC unilateral sem cirurgia',
      'Não ter ENMG',
      'Não documentar a falha cirúrgica quando ocorreu',
    ],
    recurso: 'Deficit motor bilateral permanente: recurso possível. STC tratável: não favorável.',
    relacionadas: ['HD', 'DC', 'AR'],
  },

};

/* ============================================================
   Triagem "Por onde começo?" — Portal do BPC
   Máquina de estados simples + roteiro personalizado.
   ============================================================ */
(function(){
  var WA = '5521964238080';

  // ---------- icons ----------
  var I = {
    idoso:'<path d="M12 7a3 3 0 100-6 3 3 0 000 6z"/><path d="M9 22v-7l-2-2 1-4a3 3 0 013-2h0a3 3 0 013 2l1 4-2 2v7"/>',
    pcd:'<circle cx="12" cy="4" r="2"/><path d="M12 6v8h5l3 5"/><path d="M12 14a6 6 0 11-5 9"/>',
    duvida:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2 2-2 3.5"/><path d="M12 17h.01"/>',
    doc:'<path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8l-6-5z"/><path d="M8 13h8M8 17h6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
    alert:'<path d="M10.3 3.3 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.3 3.3a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    heart:'<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0012 6 4.5 4.5 0 002 8.5C2 12 5.5 15 12 21c2-1.8 3.7-3.3 5-4.7"/>',
    pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>'
  };
  function svg(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>';}

  // ---------- questions ----------
  var Q1 = {
    eyebrow:'Pergunta 1 de 3', q:'Para quem é o benefício?',
    sub:'O BPC/LOAS atende dois grupos. Qual é o seu caso?',
    opts:[
      {k:'idoso', ic:I.idoso, t:'Pessoa idosa', s:'65 anos ou mais'},
      {k:'pcd', ic:I.pcd, t:'Pessoa com deficiência', s:'De qualquer idade, inclusive crianças'},
      {k:'duvida', ic:I.duvida, t:'Ainda não sei', s:'Quero entender se tenho direito'}
    ]
  };
  var Q2 = {
    eyebrow:'Pergunta 2 de 3', q:'Em que momento você está?',
    sub:'Cada etapa pede um cuidado diferente. Onde você está agora?',
    opts:[
      {k:'antes', ic:I.doc, t:'Ainda não dei entrada', s:'Quero saber como pedir'},
      {k:'aguardando', ic:I.clock, t:'Já pedi e estou aguardando', s:'O pedido está em análise'},
      {k:'pericia', ic:I.cal, t:'Tenho perícia marcada', s:'Médica ou avaliação social'},
      {k:'negado', ic:I.alert, t:'Fui negado ou cortado', s:'O INSS indeferiu ou cessou o BPC'}
    ]
  };
  // Q3 varies by momento
  var Q3 = {
    antes:{eyebrow:'Pergunta 3 de 3', q:'O que você já tem em mãos?', sub:'Isso define o seu primeiro passo.',
      opts:[
        {k:'laudos', ic:I.doc, t:'Tenho laudos e relatórios médicos', s:'Documentos da condição de saúde'},
        {k:'cadunico', ic:I.check, t:'Tenho o CadÚnico atualizado', s:'Cadastro feito no CRAS'},
        {k:'nada', ic:I.duvida, t:'Ainda não tenho nada', s:'Estou começando do zero'}
      ]},
    aguardando:{eyebrow:'Pergunta 3 de 3', q:'Faz quanto tempo que você deu entrada?', sub:'O tempo de análise tem prazos que podem ser cobrados.',
      opts:[
        {k:'curto', ic:I.clock, t:'Menos de 45 dias', s:'Ainda dentro do prazo comum'},
        {k:'medio', ic:I.clock, t:'Entre 45 e 90 dias', s:'Começando a demorar'},
        {k:'longo', ic:I.alert, t:'Mais de 90 dias', s:'Passou bastante do prazo'}
      ]},
    pericia:{eyebrow:'Pergunta 3 de 3', q:'Qual perícia você tem marcada?', sub:'A preparação é diferente para cada uma.',
      opts:[
        {k:'medica', ic:I.cal, t:'Perícia médica', s:'Com o perito médico do INSS'},
        {k:'social', ic:I.cal, t:'Avaliação social', s:'Com o assistente social'},
        {k:'ambas', ic:I.cal, t:'As duas', s:'Médica e social'},
        {k:'naosei', ic:I.duvida, t:'Não sei dizer', s:'Recebi a marcação mas tenho dúvida'}
      ]},
    negado:{eyebrow:'Pergunta 3 de 3', q:'Quando você recebeu a negativa?', sub:'O prazo para recorrer é curto — por isso esta pergunta importa tanto.',
      opts:[
        {k:'recente', ic:I.alert, t:'Há menos de 30 dias', s:'Ou ainda não sei a data certa'},
        {k:'passou', ic:I.clock, t:'Há mais de 30 dias', s:'Já faz algumas semanas'},
        {k:'incerto', ic:I.duvida, t:'Não tenho certeza', s:'Preciso conferir a data'}
      ]}
  };

  // ---------- state ----------
  var state = {paraQuem:null, momento:null, detalhe:null};
  var app = document.getElementById('app');
  var back = document.getElementById('back');
  var prog = document.getElementById('progress').children;

  function setProgress(n){ for(var i=0;i<prog.length;i++) prog[i].className = i<n?'on':''; }

  function renderQuestion(def, onPick){
    var html = '<div class="step"><div class="eyebrow">'+def.eyebrow+'</div>'+
      '<h1 class="q">'+def.q+'</h1><p class="q-sub">'+def.sub+'</p><div class="opts">';
    def.opts.forEach(function(o){
      html += '<button class="opt" data-k="'+o.k+'">'+
        '<span class="ic">'+svg(o.ic)+'</span>'+
        '<span class="tx"><b>'+o.t+'</b><small>'+o.s+'</small></span>'+
        '<span class="arrow">→</span></button>';
    });
    html += '</div></div>';
    app.innerHTML = html;
    Array.prototype.forEach.call(app.querySelectorAll('.opt'), function(b){
      b.addEventListener('click', function(){ onPick(b.getAttribute('data-k')); });
    });
    window.scrollTo(0,0);
  }

  function step1(){
    state={paraQuem:null,momento:null,detalhe:null};
    setProgress(1); back.hidden=false; back.textContent='← Voltar ao site';
    back.onclick=function(){ window.location.href='index.html'; };
    renderQuestion(Q1, function(k){ state.paraQuem=k; step2(); });
  }
  function step2(){
    setProgress(2); back.hidden=false; back.textContent='← Voltar'; back.onclick=step1;
    renderQuestion(Q2, function(k){ state.momento=k; step3(); });
  }
  function step3(){
    setProgress(3); back.hidden=false; back.textContent='← Voltar'; back.onclick=step2;
    renderQuestion(Q3[state.momento], function(k){ state.detalhe=k; showResult(); });
  }

  // ---------- result builder ----------
  function buildResult(){
    var pq=state.paraQuem, m=state.momento, d=state.detalhe;
    var quem = pq==='idoso' ? 'pessoa idosa' : (pq==='pcd' ? 'pessoa com deficiência' : 'quem precisa do BPC');

    var ack, title, steps=[], alert=null;

    if(m==='negado'){
      ack='<b>Uma negativa não é o fim — e muitas vezes não é justa.</b> O INSS indefere milhares de pedidos por falhas de análise e de perícia. Dá para reverter.';
      title='Seu roteiro para reverter a negativa';
      steps=[
        {t:'Pegue a carta de indeferimento', d:'É o documento que diz o motivo da negativa. Você encontra no app/site Meu INSS, em "Consultar pedidos".'},
        {t:'Identifique o motivo', d:'Renda acima do limite? Perícia não reconheceu a deficiência? O caminho da revisão depende disso.'},
        {t:'Reúna provas que faltaram', d:'Laudos recentes, exames, relatórios e comprovantes da sua situação — tudo que reforce o seu caso.'},
        {t:'Recorra no prazo certo', d:'Cabe recurso administrativo e, em muitos casos, ação judicial com boa chance de êxito.'}
      ];
      if(d==='recente') alert={t:'Você tem até 30 dias',d:'O prazo para o recurso administrativo é curto. Quanto antes você agir, mais opções tem. Vale falar com a equipe ainda esta semana.'};
      else if(d==='passou') alert={t:'Passou de 30 dias? Ainda há caminho',d:'Mesmo fora do prazo do recurso, normalmente é possível entrar com pedido novo ou ação judicial. Não desista.'};
    }
    else if(m==='pericia'){
      var qual = d==='medica'?'perícia médica':(d==='social'?'avaliação social':(d==='ambas'?'perícia médica e avaliação social':'sua perícia'));
      ack='<b>A perícia é decisiva — e dá para chegar preparado.</b> Muita gente é negada não por falta de direito, mas por não saber o que mostrar e o que dizer no dia.';
      title='Como se preparar para a '+qual;
      if(d==='social'||d==='ambas') steps.push({t:'Avaliação social: mostre a sua realidade',d:'O assistente social avalia seu dia a dia, sua renda e suas barreiras. Fale com sinceridade sobre as dificuldades — não minimize.'});
      if(d==='medica'||d==='ambas'||d==='naosei') steps.push({t:'Perícia médica: leve TODA a documentação',d:'Laudos, exames, receitas e relatórios atualizados, de preferência com CID. Leve cópias organizadas por data.'});
      steps.push({t:'Não esconda nem exagere',d:'Descreva os sintomas e limitações como eles realmente são nos seus piores e melhores dias.'});
      steps.push({t:'Chegue cedo e acompanhado, se precisar',d:'Leve documento com foto e o número do pedido. Você pode ir com um acompanhante.'});
      alert={t:'Faltou algum documento?',d:'Se você não tem todos os laudos, ainda dá tempo de organizar. A equipe pode te dizer exatamente o que levar para a sua '+qual+'.'};
    }
    else if(m==='aguardando'){
      ack='<b>Aguardar tem limite.</b> O INSS tem prazo para responder, e a demora excessiva pode ser cobrada — inclusive na Justiça.';
      title='O que fazer enquanto você aguarda';
      steps=[
        {t:'Acompanhe pelo Meu INSS',d:'Confira o andamento em "Consultar pedidos". Fique de olho em exigências (pendências) — elas têm prazo para resposta.'},
        {t:'Responda exigências rápido',d:'Se aparecer "cumprir exigência", o INSS está pedindo um documento. Não deixe vencer, ou o pedido pode ser arquivado.'},
        {t:'Guarde tudo',d:'Protocolo, datas e prints. Servem de prova caso a demora precise ser questionada.'}
      ];
      if(d==='longo') alert={t:'Mais de 90 dias é demora demais',d:'Quando o INSS passa muito do prazo, é possível exigir uma resposta — inclusive por mandado de segurança. Vale conversar com a equipe.'};
      else if(d==='medio') alert={t:'Começou a demorar',d:'Entre 45 e 90 dias já é hora de acompanhar de perto. Se travar, a equipe pode ajudar a destravar.'};
    }
    else { // antes
      ack='<b>Você está no melhor momento: o começo.</b> Pedir do jeito certo desde a entrada evita a maior causa de negativa — pedido mal instruído.';
      title='Seu roteiro para dar entrada';
      if(d==='nada'){
        steps=[
          {t:'Faça (ou atualize) o CadÚnico no CRAS',d:'É obrigatório para o BPC. Procure o CRAS do seu bairro com documentos de todos da casa.'},
          {t:'Reúna a documentação médica',d:pq==='pcd'?'Laudos, exames e relatórios que comprovem a deficiência, de preferência com CID.':'Documentos pessoais e comprovantes de idade e residência.'},
          {t:'Dê entrada no Meu INSS',d:'Pelo app/site ou pelo 135. Guarde o número do protocolo.'},
          {t:'Prepare-se para a perícia/avaliação',d:'Depois da entrada, o INSS agenda a avaliação. Chegar preparado faz toda a diferença.'}
        ];
      } else if(d==='cadunico'){
        steps=[
          {t:'Confirme se o CadÚnico está atualizado',d:'Ele precisa ter sido feito ou revisado nos últimos 24 meses, com a renda correta.'},
          {t:'Organize a documentação médica',d:pq==='pcd'?'Laudos e exames atualizados que comprovem a deficiência (com CID).':'Comprovantes de idade, identidade e residência.'},
          {t:'Dê entrada no Meu INSS',d:'Com o CadÚnico em dia, o pedido anda melhor. Guarde o protocolo.'}
        ];
      } else { // laudos
        steps=[
          {t:'Garanta o CadÚnico no CRAS',d:'Mesmo com laudos em mãos, o BPC exige o CadÚnico atualizado. É o passo que mais gente esquece.'},
          {t:'Organize seus laudos por data',d:'Documentos recentes e com CID pesam mais. Faça cópias e mantenha os originais.'},
          {t:'Dê entrada no Meu INSS',d:'Anexe a documentação e guarde o número do protocolo.'},
          {t:'Prepare-se para a perícia',d:'Você já largou na frente com os laudos. A equipe pode revisar antes de você enviar.'}
        ];
      }
    }
    if(pq==='duvida'){
      steps.unshift({t:'Primeiro: você tem direito?',d:'O BPC é para idosos (65+) ou pessoas com deficiência, em famílias de baixa renda. Em 2 minutos a equipe confirma o seu caso.'});
    }

    // ---- rota para uma página que JÁ existe no site (não duplicar conteúdo) ----
    var route;
    if(pq==='duvida'){
      route={label:'Simular se eu tenho direito ao BPC', href:'index.html#/simulador'};
    } else if(m==='pericia'){
      route={label:'Abrir o guia completo de perícias', href:'index.html#/pericias'};
    } else if(m==='negado'){
      route={label:'Entender os motivos de negativa (FAQ)', href:'index.html#faq'};
    } else if(m==='aguardando'){
      route={label:'Ver as perguntas mais frequentes', href:'index.html#faq'};
    } else { // antes
      route = pq==='pcd'
        ? {label:'Ver requisitos e documentos (deficiência)', href:'index.html#/patologia/pcd'}
        : {label:'Ver requisitos e documentos (idoso)', href:'index.html#/patologia/idoso'};
    }

    // WhatsApp message
    var resumo = 'Olá! Fiz a triagem no Portal do BPC. ';
    resumo += 'Sou/represento '+quem+'. ';
    var mapM = {antes:'Ainda não dei entrada no pedido.',aguardando:'Já dei entrada e estou aguardando.',pericia:'Tenho perícia marcada.',negado:'Fui negado ou meu BPC foi cortado.'};
    resumo += mapM[m]+' ';
    resumo += 'Gostaria de orientação sobre o próximo passo.';
    var wa = 'https://wa.me/'+WA+'?text='+encodeURIComponent(resumo);

    return {ack:ack,title:title,steps:steps,alert:alert,wa:wa,route:route};
  }

  function showResult(){
    setProgress(3); back.hidden=false; back.textContent='← Voltar'; back.onclick=step3;
    var r = buildResult();
    var html='<div class="result">'+
      '<div class="ack">'+svg(I.heart)+'<p>'+r.ack+'</p></div>'+
      '<div class="roteiro"><h2>'+r.title+'</h2>';
    r.steps.forEach(function(s,i){
      html+='<div class="stepitem"><div class="n">'+(i+1)+'</div>'+
        '<div class="c"><b>'+s.t+'</b><span>'+s.d+'</span></div></div>';
    });
    html+='</div>';
    if(r.alert) html+='<div class="alert">'+svg(I.alert)+'<p><b>'+r.alert.t+'.</b> '+r.alert.d+'</p></div>';
    html+='<div class="cta">'+
      '<a class="btn btn--wa" href="'+r.wa+'" target="_blank" rel="noopener">'+
        '<svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.087zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>'+
        'Falar com a equipe no WhatsApp</a>'+
      '<a class="btn btn--ghost" href="'+r.route.href+'">'+r.route.label+' →</a>'+
      '<button class="restart" id="restart">Refazer a triagem</button>'+
      '</div></div>';
    app.innerHTML=html;
    document.getElementById('restart').addEventListener('click', step1);
    window.scrollTo(0,0);
  }

  step1();
})();

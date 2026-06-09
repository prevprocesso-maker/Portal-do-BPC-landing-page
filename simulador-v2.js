/* ============================================================
   Simulador BPC — experiência "um atendimento, não um formulário"
   Protótipo vanilla JS. Lógica fiel ao simulador do site.
   ============================================================ */
(function(){
  var WA='5521964238080';
  var SALARIO=1621, TETO_FAM=1621, TETO_PC=1621/4;

  function fmtBR(v){return v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});}
  function svg(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>';}

  var I={
    idoso:'<path d="M11 7a3 3 0 100-6 3 3 0 000 6z"/><path d="M8 22v-6l-2-2 1-5a3 3 0 013-2 3 3 0 013 2"/><path d="M14 9v13M14 13h3"/>',
    pcd:'<circle cx="12" cy="4" r="2"/><path d="M12 6v8h5l3 5"/><path d="M12 14a6 6 0 11-5 9"/>',
    estr:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    pente:'<path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 4v4h-4"/>',
    doc:'<path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M8 13h8M8 17h6"/>',
    alert:'<path d="M10.3 3.3 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.3 3.3a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    refresh:'<path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 4v4h-4"/>',
    no:'<circle cx="12" cy="12" r="9"/><path d="M9 12h6"/>',
    coin:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3h4"/>',
    gov:'<path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"/>',
    bolsa:'<path d="M6 8h12l1 12H5z"/><path d="M9 8a3 3 0 016 0"/>',
    ok:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    heart:'<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0012 6 4.5 4.5 0 002 8.5C2 12 5.5 15 12 21c2-1.8 3.7-3.3 5-4.7"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };

  // ---------- choice configs ----------
  var CHOICE={
    quem:{q:'Para quem é o benefício?', sub:'O BPC/LOAS atende estes casos. Qual é o seu?', opts:[
      {v:'idoso', ic:I.idoso, l:'Idoso (65 anos ou mais)', d:'Baixa renda, sem aposentadoria'},
      {v:'pcd', ic:I.pcd, l:'Pessoa com deficiência', d:'De qualquer idade, inclusive crianças'},
      {v:'estrangeiro', ic:I.estr, l:'Estrangeiro residente no Brasil', d:'Naturalizado, refugiado ou com residência permanente'},
      {v:'pente_fino_user', ic:I.pente, l:'Já recebia e foi suspenso ou cessado', d:'Pente fino, revisão, aumento de renda ou CadÚnico desatualizado'}
    ]},
    situacao:{q:'Qual a situação hoje?', sub:'Isso muda completamente o caminho a seguir.', opts:[
      {v:'nunca', ic:I.doc, l:'Nunca dei entrada no BPC', d:'Quero pedir pela primeira vez'},
      {v:'negado', ic:I.alert, l:'Dei entrada e foi negado', d:'Cabe recurso administrativo ou judicial'},
      {v:'pente_fino', ic:I.refresh, l:'Já recebia e caiu no pente fino', d:'Benefício suspenso/cessado em revisão'}
    ]},
    ja_recebe:{q:'A pessoa já recebe algum benefício?', sub:'O BPC não acumula com aposentadoria, pensão ou auxílio do INSS. Bolsa Família pode somar.', opts:[
      {v:'nao', ic:I.no, l:'Não recebe nada', d:'Pode pedir o BPC'},
      {v:'bolsa', ic:I.bolsa, l:'Apenas Bolsa Família', d:'Não impede o BPC'},
      {v:'sim_inss', ic:I.gov, l:'Aposentadoria, pensão ou auxílio do INSS', d:'Em regra não cabe — mas vale conversar'},
      {v:'sim_outro', ic:I.info, l:'Outro benefício do governo', d:'Vamos analisar caso a caso'}
    ]},
    cad:{q:'O CadÚnico da família está atualizado?', sub:'Sem CadÚnico em dia, o BPC não sai (ou pode ser bloqueado).', opts:[
      {v:'sim', ic:I.ok, l:'Sim, atualizado nos últimos 2 anos'},
      {v:'desatualizado', ic:I.clock, l:'Está desatualizado (mais de 2 anos)'},
      {v:'nao', ic:I.info, l:'Não tenho CadÚnico / não sei'}
    ]}
  };

  var QUEM_LABEL={idoso:'Idoso (65+)',pcd:'Pessoa com deficiência',estrangeiro:'Estrangeiro residente',pente_fino_user:'Benefício suspenso/cessado'};
  var SIT_LABEL={nunca:'Nunca deu entrada',negado:'Foi negado (cabe recurso)',pente_fino:'Pente fino (revisão)'};
  var BEN_LABEL={nao:'Não recebe nada',bolsa:'Só Bolsa Família',sim_inss:'Recebe do INSS',sim_outro:'Outro benefício'};
  var CAD_LABEL={sim:'Atualizado',desatualizado:'Desatualizado',nao:'Não tem / não sabe'};

  // compact patologia list (grupos)
  var PATOL=[
    ['Desenvolvimento e neuro',['Autismo (TEA)','Síndrome de Down','Paralisia cerebral','Microcefalia','Deficiência intelectual']],
    ['Saúde mental',['Esquizofrenia','Transtorno bipolar','Depressão grave']],
    ['Sensorial',['Cegueira / baixa visão','Surdez']],
    ['Oncológico e crônico',['Câncer','Doença renal crônica','HIV/AIDS','Esclerose múltipla']]
  ];

  // reassurance per step
  function reassureFor(key){
    var s=state.answers;
    if(key==='quem') return 'Vamos descobrir <span class="em">juntos</span> se você tem direito. É rápido e gratuito.';
    if(key==='situacao') return 'Cada situação tem um caminho. Vou te mostrar <span class="em">o seu</span>.';
    if(key==='ja_recebe') return 'Sem pressa. Responda com <span class="em">calma</span>.';
    if(key==='patologia') return 'Não precisa de termo técnico — escolha o que <span class="em">mais se parece</span>.';
    if(key==='pessoas_casa') return 'Estamos <span class="em">quase lá</span>.';
    if(key==='renda_total') return 'Esse é o ponto que mais gera dúvida. <span class="em">Eu te ajudo</span>.';
    if(key==='cad') return 'Última informação importante.';
    if(key==='contato'){
      if(s.situacao==='negado') return 'Uma negativa <span class="em">não é o fim</span>. Vamos olhar o seu caso.';
      if(s.quem==='pente_fino_user'||s.situacao==='pente_fino') return 'Vamos <span class="em">recuperar</span> o que é seu.';
      return 'Pronto. Vou <span class="em">preparar seu atendimento</span>.';
    }
    return '';
  }

  // ---------- state ----------
  var state={step:0, answers:{quem:null,situacao:null,ja_recebe:null,patologia:null,pessoas_casa:1,renda_total:'',cad:null,nome:'',sobrenome:'',relato:''}};

  function buildSteps(){
    var a=state.answers, steps=[{kind:'choice',key:'quem'}];
    if(a.quem!=='pente_fino_user'){steps.push({kind:'choice',key:'situacao'});steps.push({kind:'choice',key:'ja_recebe'});}
    var pulaPat=a.quem==='idoso'||a.quem==='estrangeiro'||a.quem==='pente_fino_user'||a.situacao==='pente_fino';
    if(a.quem==='pcd'&&!pulaPat) steps.push({kind:'patologia',key:'patologia'});
    steps.push({kind:'pessoas',key:'pessoas_casa'});
    steps.push({kind:'renda',key:'renda_total'});
    steps.push({kind:'choice',key:'cad'});
    steps.push({kind:'contato',key:'contato'});
    return steps;
  }

  var app=document.getElementById('app'),
      back=document.getElementById('back'),
      reassure=document.getElementById('reassure'),
      pbar=document.getElementById('pbar'),
      plabel=document.getElementById('pbar-label');

  function set(k,v){state.answers[k]=v;}
  function curStep(){var s=buildSteps();return s[Math.min(state.step,s.length-1)];}

  function updateChrome(){
    var steps=buildSteps(), cur=steps[Math.min(state.step,steps.length-1)];
    // progress bar
    pbar.innerHTML='';
    for(var i=0;i<steps.length;i++){var sp=document.createElement('span');if(i<=state.step)sp.className='on';pbar.appendChild(sp);}
    plabel.textContent='Passo '+(Math.min(state.step,steps.length-1)+1)+' de '+steps.length;
    reassure.innerHTML=reassureFor(cur.key);
    back.hidden=false;
    back.textContent = state.step===0 ? '← Voltar ao site' : '← Voltar';
  }

  // animated render
  function render(html, after){
    var prev=app.querySelector('.view');
    function paint(){
      app.innerHTML='<div class="view">'+html+'</div>';
      updateChrome();
      if(after) after(app.querySelector('.view'));
      app.scrollIntoView?null:null;
      window.scrollTo(0,0);
    }
    if(prev){prev.classList.add('out');setTimeout(paint,200);}else paint();
  }

  // ---------- navigation ----------
  function go(n){ state.step=n; route(); }
  function next(){ state.step++; route(); }
  function back_(){ if(state.step>0){state.step--;route();} else window.location.href='index.html'; }
  back.onclick=function(){back_();};

  function pick(key,val){
    if(key==='quem'&&val==='pente_fino_user'){set('quem',val);set('situacao','pente_fino');}
    else set(key,val);
    next();
  }

  // ---------- renderers ----------
  function renderChoice(key){
    var cfg=CHOICE[key];
    var h='<div class="eyebrow">'+stepEyebrow()+'</div><h1 class="q">'+cfg.q+'</h1>'+
      (cfg.sub?'<p class="q-sub">'+cfg.sub+'</p>':'')+'<div class="opts">';
    cfg.opts.forEach(function(o){
      h+='<button class="opt" data-v="'+o.v+'"><span class="ic">'+svg(o.ic)+'</span>'+
         '<span class="tx"><b>'+o.l+'</b>'+(o.d?'<small>'+o.d+'</small>':'')+'</span>'+
         '<span class="arrow">→</span></button>';
    });
    h+='</div>';
    render(h,function(v){Array.prototype.forEach.call(v.querySelectorAll('.opt'),function(b){b.onclick=function(){pick(key,b.getAttribute('data-v'));};});});
  }

  function renderPatologia(){
    var h='<div class="eyebrow">'+stepEyebrow()+'</div><h1 class="q">Qual é a condição principal?</h1>'+
      '<p class="q-sub">Se houver mais de uma, escolha a mais grave — a gente detalha depois.</p><div class="opts">';
    PATOL.forEach(function(g){
      h+='<div style="font-size:12px;font-weight:700;color:var(--terra-400);text-transform:uppercase;letter-spacing:.12em;margin:8px 2px 2px;">'+g[0]+'</div>';
      g[1].forEach(function(n){h+='<button class="opt" data-n="'+n+'"><span class="tx"><b>'+n+'</b></span><span class="arrow">→</span></button>';});
    });
    h+='<button class="opt" data-n="Outra (a detalhar)"><span class="tx"><b>Outra condição</b><small>Vou detalhar pelo WhatsApp</small></span><span class="arrow">→</span></button></div>';
    render(h,function(v){Array.prototype.forEach.call(v.querySelectorAll('.opt'),function(b){b.onclick=function(){set('patologia',b.getAttribute('data-n'));next();};});});
  }

  function renderPessoas(){
    function draw(){
      var val=Math.max(1,Number(state.answers.pessoas_casa)||1);
      var h='<div class="eyebrow">'+stepEyebrow()+'</div><h1 class="q">Quantas pessoas moram na casa?</h1>'+
        '<p class="q-sub">Conte todo mundo que mora junto — cônjuge, filhos, pais, irmãos. <b>Inclua a própria pessoa que vai receber.</b></p>'+
        '<div class="stepper"><button id="dec" '+(val<=1?'disabled':'')+'>−</button>'+
        '<div class="val"><div class="n">'+val+'</div><div class="u">'+(val===1?'pessoa':'pessoas')+'</div></div>'+
        '<button id="inc" '+(val>=15?'disabled':'')+'>+</button></div>'+
        '<button class="btn btn--primary" id="cont">Continuar →</button>';
      render(h,function(v){
        v.querySelector('#dec').onclick=function(){set('pessoas_casa',Math.max(1,val-1));draw();};
        v.querySelector('#inc').onclick=function(){set('pessoas_casa',Math.min(15,val+1));draw();};
        v.querySelector('#cont').onclick=next;
      });
    }
    draw();
  }

  function renderRenda(){
    function fb(){
      var digits=String(state.answers.renda_total||'').replace(/\D/g,'');
      var num=(digits===''?0:parseInt(digits,10))/100;
      var pessoas=Math.max(1,Number(state.answers.pessoas_casa)||1);
      var pc=num/pessoas;
      var el=document.getElementById('fbk'); if(!el)return;
      if(num<=0){el.className='feedback neutral';el.innerHTML=svg(I.info)+'<span>Some tudo que entra na casa por mês. Bolsa Família não conta.</span>';return;}
      if(pc<=TETO_PC){el.className='feedback ok';el.innerHTML=svg(I.ok)+'<span>R$ '+fmtBR(pc)+' por pessoa — <b>dentro do critério legal</b> (¼ do salário). Ótimo sinal.</span>';}
      else if(num<=TETO_FAM){el.className='feedback warn';el.innerHTML=svg(I.alert)+'<span>R$ '+fmtBR(pc)+' por pessoa fica acima do critério estrito, <b>mas há jurisprudência</b> que amplia o limite. Vale analisar.</span>';}
      else {el.className='feedback warn';el.innerHTML=svg(I.alert)+'<span>Renda acima de 1 salário mínimo — mas gastos com <b>saúde e deficiência</b> podem ser descontados. Não desista sem conversar.</span>';}
    }
    var h='<div class="eyebrow">'+stepEyebrow()+'</div><h1 class="q">Qual a renda total da família?</h1>'+
      '<p class="q-sub">Salários, aposentadorias, pensões, bicos. <b>Não</b> some Bolsa Família.</p>'+
      '<div class="field"><label>Renda somada por mês</label>'+
      '<div class="money"><span class="cur">R$</span><input id="renda" inputmode="numeric" placeholder="0,00" /></div>'+
      '<div class="feedback neutral" id="fbk"></div></div>'+
      '<button class="btn btn--primary mt" id="cont">Continuar →</button>';
    render(h,function(v){
      var inp=v.querySelector('#renda');
      function fmtInput(){
        var d=String(state.answers.renda_total||'').replace(/\D/g,'');
        var formatted = d===''?'':( (parseInt(d,10)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) );
        inp.value=formatted; inp.setAttribute('value',formatted);
      }
      fmtInput(); fb();
      inp.oninput=function(){var d=inp.value.replace(/\D/g,'').slice(0,9);set('renda_total',d);fmtInput();fb();};
      inp.focus();
      v.querySelector('#cont').onclick=next;
    });
  }

  function eligivelSoft(){
    var a=state.answers;
    var num=(String(a.renda_total||'').replace(/\D/g,'')==='')?0:parseInt(String(a.renda_total).replace(/\D/g,''),10)/100;
    var rendaOk=num>0&&num<=TETO_FAM;
    var recebeOutro=a.ja_recebe==='sim_inss'||a.ja_recebe==='sim_outro';
    return rendaOk&&!recebeOutro;
  }

  function buildWA(){
    var a=state.answers, nome=((a.nome||'')+' '+(a.sobrenome||'')).trim();
    var pessoas=Math.max(1,Number(a.pessoas_casa)||1);
    var num=(String(a.renda_total||'').replace(/\D/g,'')==='')?0:parseInt(String(a.renda_total).replace(/\D/g,''),10)/100;
    var L=['Olá! Sou '+(nome||'[nome]')+', vim pelo Portal do BPC.','','📋 *Resumo do meu caso:*',
      '• Beneficiário: '+(QUEM_LABEL[a.quem]||'—'),
      '• Situação: '+(SIT_LABEL[a.situacao]||'—')];
    if(a.ja_recebe) L.push('• Benefício atual: '+(BEN_LABEL[a.ja_recebe]||'—'));
    if(a.patologia) L.push('• Condição: '+a.patologia);
    L.push('• Pessoas em casa: '+pessoas);
    if(num>0) L.push('• Renda familiar: R$ '+fmtBR(num)+'/mês (R$ '+fmtBR(num/pessoas)+' por pessoa)');
    L.push('• CadÚnico: '+(CAD_LABEL[a.cad]||'—'));
    if((a.relato||'').trim()){ L.push('','🗒️ *Nas minhas palavras:*', a.relato.trim()); }
    L.push('','Gostaria de conversar sobre o meu caso.');
    return 'https://wa.me/'+WA+'?text='+encodeURIComponent(L.join('\n'));
  }

  function renderContato(){
    var a=state.answers;
    function draw(){
      var nome=a.nome||'', sob=a.sobrenome||'';
      var ready=nome.trim().length>=2;
      var pessoas=Math.max(1,Number(a.pessoas_casa)||1);
      var num=(String(a.renda_total||'').replace(/\D/g,'')==='')?0:parseInt(String(a.renda_total).replace(/\D/g,''),10)/100;
      var soft=eligivelSoft();
      var head = soft
        ? 'Pelo que você me contou, <span style="color:var(--terra-300)">vale muito a pena dar entrada</span>.'
        : 'Mesmo com pontos de atenção, <span style="color:var(--terra-300)">o seu caso merece ser analisado</span>.';
      var h='<div class="eyebrow">Quase lá — só falta você</div>'+
        '<h1 class="q">'+(nome.trim()? 'Prazer, '+nome.trim().split(' ')[0]+'!' : 'Como podemos te chamar?')+'</h1>'+
        '<p class="q-sub">'+head+' Deixe seu nome e eu preparo seu atendimento já com o resumo.</p>'+
        '<div class="row2"><input class="inp" id="nm" placeholder="Nome" value="'+nome.replace(/"/g,'&quot;')+'" />'+
        '<input class="inp" id="sb" placeholder="Sobrenome" value="'+sob.replace(/"/g,'&quot;')+'" /></div>'+
        '<div class="note-wrap"><label class="note-label" for="relato">✍️ Escreva aqui, com suas palavras, o que você está vivendo <span>(opcional — mas ajuda muito)</span></label>'+
        '<textarea class="note" id="relato" placeholder="Escreva aqui... Ex.: Cuido sozinha do meu filho com autismo e não consigo trabalhar. Já tentei dar entrada e não sei o que fazer.">'+(a.relato||'').replace(/</g,'&lt;')+'</textarea></div>'+
        '<div class="res-recap">'+
          recapLine('Beneficiário',QUEM_LABEL[a.quem])+
          recapLine('Situação',SIT_LABEL[a.situacao])+
          (a.patologia?recapLine('Condição',a.patologia):'')+
          recapLine('Pessoas em casa',String(pessoas))+
          (num>0?recapLine('Renda por pessoa','R$ '+fmtBR(num/pessoas)):'')+
          recapLine('CadÚnico',CAD_LABEL[a.cad])+
        '</div>'+
        '<a class="btn btn--wa" id="wa" '+(ready?'':'aria-disabled="true"')+' href="'+(ready?buildWA():'#')+'" '+(ready?'target="_blank" rel="noopener"':'')+'>'+
          svg2wa()+'Falar com a equipe no WhatsApp</a>'+
        (ready?'':'<p style="font-size:13px;color:var(--ink-500);text-align:center;margin-top:12px;">Digite seu nome para liberar o atendimento.</p>');
      render(h,function(v){
        var nm=v.querySelector('#nm'), sb=v.querySelector('#sb');
        nm.oninput=function(){a.nome=nm.value;}; 
        sb.oninput=function(){a.sobrenome=sb.value;};
        nm.onblur=draw; sb.onblur=draw;
        var rel=v.querySelector('#relato'); if(rel){rel.oninput=function(){a.relato=rel.value;};}
        var wa=v.querySelector('#wa');
        wa.onclick=function(e){ if(!(a.nome||'').trim()){e.preventDefault();nm.focus();} };
      });
    }
    draw();
  }
  function recapLine(k,val){return '<div class="rl"><span>'+k+'</span><b>'+(val||'—')+'</b></div>';}
  function svg2wa(){return '<svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.087zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';}

  var EYEBROW={quem:'Quem vai receber',situacao:'A sua situação',ja_recebe:'Benefícios atuais',patologia:'A condição',pessoas_casa:'A sua família',renda_total:'A renda da casa',cad:'CadÚnico'};
  function stepEyebrow(){var cur=curStep();return EYEBROW[cur.key]||'Simulação';}

  // ---------- router ----------
  function route(){
    var cur=curStep();
    if(cur.kind==='choice') renderChoice(cur.key);
    else if(cur.kind==='patologia') renderPatologia();
    else if(cur.kind==='pessoas') renderPessoas();
    else if(cur.kind==='renda') renderRenda();
    else if(cur.kind==='contato') renderContato();
  }

  route();
})();

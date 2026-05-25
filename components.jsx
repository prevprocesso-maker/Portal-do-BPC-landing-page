/* ============================================================
   Portal do BPC — UI Kit components
   All shared components live here. Exposed via window.* at bottom.
   ============================================================ */

const { useState, useEffect, useRef } = React;

/* ---------- Patologias data ----------
   cat: 'neuro' | 'mental' | 'sensorial' | 'onco' | 'cronica' | 'desenv'
*/
const PATOLOGIAS = [
  { sigla: 'TEA', cat: 'desenv', nome: 'Autismo (TEA)', resumo: 'Lei Berenice Piana equipara o autismo à pessoa com deficiência para todos os efeitos legais.' },
  { sigla: 'SD',  cat: 'desenv', nome: 'Síndrome de Down', resumo: 'Trissomia do cromossomo 21 — direito reconhecido por lei desde o nascimento.' },
  { sigla: 'PCx', cat: 'desenv', nome: 'Paralisia cerebral', resumo: 'Disfunção motora e cognitiva de origem cerebral, manifestada na infância.' },

  { sigla: 'EM',  cat: 'neuro', nome: 'Esclerose múltipla', resumo: 'Doença autoimune que afeta o sistema nervoso central.' },
  { sigla: 'PK',  cat: 'neuro', nome: 'Doença de Parkinson', resumo: 'Doença neurodegenerativa do movimento.' },
  { sigla: 'AZ',  cat: 'neuro', nome: 'Doença de Alzheimer', resumo: 'Demência com perda progressiva de função cognitiva.' },
  { sigla: 'AVC', cat: 'neuro', nome: 'Sequelas de AVC', resumo: 'Limitações duradouras após acidente vascular cerebral.' },
  { sigla: 'EL',  cat: 'neuro', nome: 'ELA', resumo: 'Esclerose lateral amiotrófica — doença neuromotora progressiva.' },
  { sigla: 'EP',  cat: 'neuro', nome: 'Epilepsia refratária', resumo: 'Crises não controladas com impacto funcional significativo.' },

  { sigla: 'EQ',  cat: 'mental', nome: 'Esquizofrenia', resumo: 'Transtorno mental grave de longa duração.' },
  { sigla: 'TB',  cat: 'mental', nome: 'Transtorno bipolar', resumo: 'Em quadros com prejuízo funcional importante.' },

  { sigla: 'DV',  cat: 'sensorial', nome: 'Deficiência visual', resumo: 'Cegueira total ou baixa visão grave em ambos os olhos.' },
  { sigla: 'DA',  cat: 'sensorial', nome: 'Deficiência auditiva', resumo: 'Surdez bilateral profunda comprovada.' },

  { sigla: 'CA',  cat: 'onco', nome: 'Câncer', resumo: 'Neoplasias malignas com impedimento de longa duração.' },

  { sigla: 'IR',  cat: 'cronica', nome: 'Insuficiência renal', resumo: 'Doença renal crônica em hemodiálise.' },
  { sigla: 'CG',  cat: 'cronica', nome: 'Cardiopatia grave', resumo: 'Doenças do coração que limitam a vida diária.' },
  { sigla: 'HV',  cat: 'cronica', nome: 'HIV / AIDS', resumo: 'Quadro avançado com impedimentos importantes.' },
  { sigla: 'HP',  cat: 'cronica', nome: 'Hepatopatia grave', resumo: 'Cirrose, hepatite crônica avançada.' },
  { sigla: 'LE',  cat: 'cronica', nome: 'Lúpus (LES)', resumo: 'Doença autoimune sistêmica grave.' },
  { sigla: 'DM',  cat: 'cronica', nome: 'Distrofia muscular', resumo: 'Doenças degenerativas musculares (Duchenne, etc).' },
];

const CATEGORIAS = {
  desenv:    { label: 'Desenvolvimento',  bg: '#f4e3d4', fg: '#813f22', dot: '#c4673a' },
  neuro:     { label: 'Neurológica',      bg: '#e6ebe0', fg: '#353f2a', dot: '#5a6b4a' },
  mental:    { label: 'Saúde mental',     bg: '#dee6ee', fg: '#2d4456', dot: '#4d6b85' },
  sensorial: { label: 'Sensorial',        bg: '#f8ecd0', fg: '#5e4408', dot: '#c89020' },
  onco:      { label: 'Oncológica',       bg: '#f3dcd8', fg: '#6d2a25', dot: '#a8413a' },
  cronica:   { label: 'Crônica',          bg: '#f1eadf', fg: '#3d3128', dot: '#6b5a4d' },
};

/* ---------- Header ---------- */
function Header({ active, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const nav = [
    { id: 'home', label: 'Início' },
    { id: 'patologias', label: 'Patologias', hash: '#patologias' },
    { id: 'pericias', label: 'Perícias' },
    { id: 'estrangeiro', label: 'Estrangeiro' },
    { id: 'simulador', label: 'Simulador' },
    { id: 'faq', label: 'Perguntas', hash: '#faq' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#/" className="header-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src="assets/logo-marca.png" alt="Portal do BPC" className="header-logo-mark" />
          <span className="header-logo-text">
            <span className="header-logo-text-1">Portal do</span>
            <span className="header-logo-text-2">BPC<span className="header-logo-dot">.</span></span>
            <span className="header-logo-tagline">BENEFÍCIO · DIREITO · ACOLHIMENTO</span>
          </span>
        </a>
        <nav className="header-nav">
          {nav.map(n => (
            <a
              key={n.id}
              href={n.hash || `#/${n.id}`}
              className={active === n.id ? 'active' : ''}
              onClick={(e) => {
                if (n.hash) return;
                e.preventDefault();
                onNavigate(n.id);
              }}
            >{n.label}</a>
          ))}
        </nav>
        <a className="btn btn--primary btn--sm" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
          Falar agora →
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">ATENDIMENTO HUMANO · IRAJÁ, RJ</div>
          <h1 className="display" style={{ marginBottom: 20 }}>
            Você não precisa enfrentar o INSS <em>sozinho</em>.
          </h1>
          <p className="lead" style={{ marginBottom: 32, maxWidth: 540 }}>
            Documentação que confunde, prazo que aperta, perita que apressa, negativa sem explicação. O <strong>BPC</strong> existe para quem mais precisa — <strong>idoso de 65+ ou pessoa com deficiência</strong> em situação de vulnerabilidade. A gente te ajuda a chegar lá com a documentação certa, sem promessas e sem pressa.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
            <button className="btn btn--secondary btn--lg" onClick={() => onNavigate('simulador')}>
              Simular meu caso →
            </button>
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 24, color: 'var(--ink-500)', fontSize: 15, flexWrap: 'wrap' }}>
            <span>✓ Análise gratuita do seu caso</span>
            <span>✓ Sem promessas que ninguém cumpre</span>
            <span>✓ Resposta no mesmo dia</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src="assets/dr-carlos-costa.jpg" alt="Dr. Carlos Costa e equipe do Portal do BPC" style={{ objectFit: 'cover', objectPosition: 'top center', width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats strip ---------- */
function StatsStrip() {
  const items = [
    { n: '20+', l: 'patologias e condições cobertas em detalhe' },
    { n: 'R$ 1.621', l: 'valor mensal do BPC em 2026' },
    { n: '65+', l: 'idade mínima para BPC do idoso' },
    { n: '0', l: 'contribuição necessária para receber' },
  ];
  return (
    <div className="container">
      <div className="stats">
        {items.map((it, i) => (
          <div className="stat" key={i}>
            <div className="n">{it.n}</div>
            <div className="l">{it.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Especialidades ---------- */
function Especialidades() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Quem tem direito</div>
          <h2>Dois caminhos, <em>um direito</em>.</h2>
          <p>Talvez ninguém tenha explicado direito qual é o seu caso. Em poucos minutos você entende qual porta abre pra sua família.</p>
        </div>
        <div className="especialidades-grid">
          <div className="esp-card">
            <div className="kicker">BPC para Idoso</div>
            <h3>A partir dos 65 anos.</h3>
            <p className="desc">Para quem trabalhou a vida toda em bicos, informalmente, ou nem teve essa chance — e hoje precisa de dignidade. <strong>Não importa se nunca contribuiu ao INSS</strong>: o que conta é idade, renda da família e situação de vulnerabilidade.</p>
            <ul>
              <li>Idade mínima de 65 anos completos</li>
              <li>Renda familiar per capita até ¼ do salário mínimo</li>
              <li>Não receber outro benefício do INSS</li>
              <li>Cadastro no CadÚnico atualizado</li>
            </ul>
            <a className="btn btn--secondary" href="#/patologia/idoso">Saber mais →</a>
          </div>
          <div className="esp-card">
            <div className="kicker">BPC para Pessoa com Deficiência</div>
            <h3>Qualquer idade.</h3>
            <p className="desc">Quando o impedimento dura, limita e desestrutura a rotina da família. Vale para deficiência física, mental, intelectual ou sensorial — desde o recém-nascido até o adulto que perdeu autonomia depois de doença grave.</p>
            <ul>
              <li>Deficiência física, mental, intelectual ou sensorial</li>
              <li>Impedimento de longa duração (mín. 2 anos)</li>
              <li>Renda familiar per capita até ¼ do salário mínimo</li>
              <li>Avaliação médica e social do INSS</li>
            </ul>
            <a className="btn btn--secondary" href="#/patologia/pcd">Ver as 20 patologias →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Patologias grid ---------- */
function PatologiasGrid({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const cats = ['all', ...Object.keys(CATEGORIAS)];
  const filtered = filter === 'all' ? PATOLOGIAS : PATOLOGIAS.filter(p => p.cat === filter);
  return (
    <section className="bg-bone" id="patologias">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Doenças e condições · 20 patologias</div>
          <h2>O que pode dar direito ao <em>BPC</em>.</h2>
          <p>Cada doença tem uma história diferente dentro do INSS. Encontre a sua aqui — o que prova, o que costuma ser negado, o que o perito vai olhar. Análise sempre individual.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {cats.map(c => {
            const isActive = filter === c;
            const meta = c === 'all' ? { label: 'Todas', dot: 'var(--ink-500)' } : CATEGORIAS[c];
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                  padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                  border: '1px solid ' + (isActive ? 'transparent' : 'var(--line)'),
                  background: isActive ? 'var(--terra-500)' : 'var(--bone)',
                  color: isActive ? '#fff' : 'var(--ink-900)',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'all 180ms var(--ease-out)',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: meta.dot }} />
                {meta.label}
                {c !== 'all' && <span style={{ opacity: 0.6, fontWeight: 400 }}>· {PATOLOGIAS.filter(p => p.cat === c).length}</span>}
              </button>
            );
          })}
        </div>
        <div className="patologias-grid">
          {filtered.map(p => {
            const cat = CATEGORIAS[p.cat];
            return (
              <a key={p.sigla} className="pat-card" href={`#/patologia/${p.sigla}`} onClick={(e) => { e.preventDefault(); onNavigate('patologia', p); }}>
                <div className="ic" style={{ background: cat.bg, color: cat.fg }}>{p.sigla}</div>
                <h4>{p.nome}</h4>
                <p>{p.resumo}</p>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: cat.fg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: cat.dot }} />
                  {cat.label}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Recursos em destaque (perícias + estrangeiro) ---------- */
function RecursosDestaque({ onNavigate }) {
  const cards = [
    {
      id: 'pericias',
      kicker: 'Onde a maioria das negativas começa',
      title: 'Perícia médica e social',
      desc: 'Documentação incompleta, perita após 15 minutos, palavra mal escolhida — e o pedido cai. A gente reúne tudo o que você precisa levar e como se comportar. Checklist em PDF para imprimir.',
      stat: '34',
      statLabel: 'itens no checklist',
      cta: 'Ver guia da perícia',
      icon: '🩺',
    },
    {
      id: 'estrangeiro',
      kicker: 'Direito garantido pelo STF',
      title: 'BPC para estrangeiros',
      desc: 'Imigrante, refugiado, naturalizado ou apátrida — você tem o mesmo direito do brasileiro nato. As regras são específicas (CRNM, CONARE, tradução juramentada) e um erro a menos significa meses a menos esperando.',
      stat: '6',
      statLabel: 'situações contempladas',
      cta: 'Ver guia para estrangeiro',
      icon: '🌎',
    },
  ];

  return (
    <section className="destaque-bloco" id="recursos">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 40, maxWidth: 720 }}>
          <div className="eyebrow">Recursos especiais</div>
          <h2>Os dois pontos onde o seu <em>pedido</em> mais arrisca cair.</h2>
          <p style={{ color: 'var(--ink-500)', fontSize: 17, marginTop: 12, maxWidth: 620 }}>
            Perícia e situação de estrangeiro são onde a maioria das negativas acontece — não por falta de direito, mas por falta de preparação. Os guias completos estão a um clique.
          </p>
        </div>
        <div className="destaque-grid">
          {cards.map(c => (
            <a
              key={c.id}
              href={`#/${c.id}`}
              onClick={(e) => { e.preventDefault(); onNavigate(c.id); }}
              className="destaque-card"
            >
              <div className="destaque-icon" aria-hidden="true">{c.icon}</div>
              <div className="destaque-kicker">{c.kicker}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="destaque-foot">
                <div className="destaque-stat">
                  <span className="num">{c.stat}</span>
                  <span className="lbl">{c.statLabel}</span>
                </div>
                <span className="destaque-cta">{c.cta} <span aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sobre ---------- */
function SobrePortal() {
  return (
    <section>
      <div className="container sobre-grid">
        <div className="sobre-photo" style={{ background: 'var(--bone)', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
          <img src="assets/dr-carlos-costa.jpg" alt="Dr. Carlos Costa, especialista em BPC" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        </div>
        <div>
          <div className="eyebrow">Sobre o portal</div>
          <h2>Informação <em>clara</em> para uma decisão difícil.</h2>
          <p className="lead">Você liga pro 135 e fica em espera. Lê o site do INSS e fica mais perdido. Procura advogado e tem medo do honorário. <strong>O Portal do BPC nasceu pra desfazer esse nó.</strong></p>
          <p style={{ color: 'var(--ink-500)' }}>
            Aqui é informação em linguagem de gente, sobre seus direitos. Lista de doenças com critérios reais, simulador honesto, atendimento humano por WhatsApp. Sem juridiquês. Sem promessas que ninguém cumpre.
          </p>
          <div className="valores-grid">
            <div className="valor"><h5>Acolhimento</h5><p>Quem chega aqui está em momento difícil.</p></div>
            <div className="valor"><h5>Clareza</h5><p>Linguagem simples, sem juridiquês.</p></div>
            <div className="valor"><h5>Acessibilidade</h5><p>Texto grande, alto contraste, leitor de tela.</p></div>
            <div className="valor"><h5>Direito</h5><p>BPC não é favor — é direito constitucional.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Nosso escritório ---------- */
function NossoEscritorio() {
  const fotos = [
    { src: 'assets/escritorio-1-justica.jpg', label: 'Sala de reunião', cap: 'Justiça · Direito · Ordem' },
    { src: 'assets/escritorio-2-sala.jpg', label: 'Gabinete principal', cap: 'Atendimento individual' },
    { src: 'assets/escritorio-3-recepcao.jpg', label: 'Recepção', cap: 'Onde tudo começa' },
    { src: 'assets/escritorio-4-atendimento.jpg', label: 'Espaço de atendimento', cap: 'Ambiente acolhedor' },
  ];
  return (
    <section className="bg-terra-50" id="escritorio">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Visite o escritório</div>
          <h2>Nosso <em>espaço</em>.</h2>
          <p style={{ color: 'var(--ink-500)', maxWidth: 600, margin: '12px auto 0', textAlign: 'center' }}>
            Atendimento presencial em Irajá, no Rio de Janeiro. Um lugar onde a sua história é escutada com calma — sem fila, sem senha, sem ser tratado como número.
          </p>
        </div>
        <div className="escritorio-grid">
          {fotos.map((f, i) => (
            <figure className="esc-card" key={i}>
              <div className="esc-photo">
                <img src={f.src} alt={f.label} loading="lazy" />
              </div>
              <figcaption>
                <div className="esc-label">{f.label}</div>
                <div className="esc-cap">{f.cap}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Depoimentos ---------- */
function Depoimentos() {
  const items = [
    { stars: 5, quote: 'O BPC da minha mãe foi negado duas vezes. Aqui no portal entendi onde estava o erro na documentação. Pedido aprovado.', who: 'Ana L. · Zona Norte/RJ' },
    { stars: 5, quote: 'Eu não sabia que autismo dava direito. A página da patologia explicou tudo passo a passo. Salvou nossa família.', who: 'Marcos S. · Guarulhos/SP' },
    { stars: 5, quote: 'Atendimento humano de verdade. Não me trataram como número. Hoje minha mãe recebe o benefício e tem dignidade.', who: 'Júlia M. · Salvador/BA' },
  ];
  return (
    <section className="bg-terra-50">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Quem já passou por aqui</div>
          <h2>Histórias <em>reais</em>.</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-300)', marginTop: 8 }}><em>* Exemplos ilustrativos. Depoimentos reais serão publicados com autorização dos beneficiários.</em></p>
        </div>
        <div className="depoimentos-grid">
          {items.map((it, i) => (
            <div className="dep-card" key={i}>
              <div className="stars">{'★'.repeat(it.stars)}</div>
              <blockquote>"{it.quote}"</blockquote>
              <div className="who">— {it.who}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog ---------- */
function Blog() {
  const items = [
    { cat: 'BPC Idoso', titulo: 'Como dar entrada no BPC sem sair de casa', desc: 'Passo a passo do pedido pelo Meu INSS, sem precisar de advogado.' },
    { cat: 'Recurso', titulo: 'INSS negou? Veja os 4 motivos mais comuns', desc: 'O que fazer quando o benefício é indeferido e como recorrer.' },
    { cat: 'Documentos', titulo: 'CadÚnico atualizado: por que é tão importante', desc: 'Sem CadÚnico em dia, o BPC pode ser bloqueado mesmo após aprovação.' },
  ];
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Blog</div>
          <h2>Conteúdo que <em>esclarece</em>.</h2>
          <p>Artigos sobre direitos, documentos e o passo a passo do BPC.</p>
        </div>
        <div className="blog-grid">
          {items.map((it, i) => (
            <a className="blog-card" key={i} href={`#/blog/${i}`}>
              <div className="blog-thumb"></div>
              <div className="body">
                <div className="cat">{it.cat}</div>
                <h4>{it.titulo}</h4>
                <p>{it.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="btn btn--secondary" href="#/blog">Ver todos os artigos →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ_ITEMS = [
  /* ===== BPC IDOSO ===== */
  { cat: 'idoso', q: 'Idoso de 65+ que recebe pensão por morte do INSS pode receber o BPC?', a: 'Em regra, não. O BPC não pode ser acumulado com aposentadoria, pensão por morte, auxílio-doença ou qualquer outro benefício do INSS. A única exceção é a assistência médica e a pensão especial reparatória. Se a pensão recebida for de valor baixo e a renda familiar per capita continuar dentro do limite (até R$ 405,25), em alguns casos é possível renunciar à pensão para pleitear o BPC — mas essa decisão exige análise técnica, porque pensão é vitalícia e o BPC pode ser cessado.' },
  { cat: 'idoso', q: 'Meu filho mora comigo e ganha um salário mínimo. Perco o BPC por causa disso?', a: 'Depende do cálculo per capita. A regra: soma-se TODA a renda da casa (incluindo o salário do filho) e divide pelo número de moradores. Se o resultado ficar até R$ 405,25 por pessoa, o direito ao BPC é mantido. Exemplo: filho ganha R$ 1.621 (1 SM), casal com mais 2 idosos → 4 pessoas. R$ 1.621 ÷ 4 = R$ 405,25/pessoa — exatamente no limite. Já se houver outra renda na casa, ultrapassa.' },
  { cat: 'idoso', q: 'Idoso pode receber BPC se continuar fazendo bico ou trabalho informal?', a: 'Sim, desde que a renda total da família continue dentro do limite. O BPC não exige que a pessoa pare de trabalhar — exige apenas que a renda familiar per capita seja inferior a ¼ do salário mínimo. Mas atenção: rendas declaradas em Imposto de Renda, MEI ativo ou contribuições recentes ao INSS podem ser detectadas no pente fino e levar à cessação do benefício se não estiverem informadas no CadÚnico.' },
  { cat: 'idoso', q: 'Idoso preso ou em cumprimento de pena pode receber BPC?', a: 'Não enquanto estiver recluso. O BPC fica SUSPENSO durante o período de prisão (regime fechado ou semiaberto). Quando o idoso é solto, o benefício pode ser RESTABELECIDO mediante pedido formal ao INSS, com cópia do alvará de soltura, comprovação de endereço e CadÚnico atualizado.' },
  { cat: 'idoso', q: 'Meu pai faleceu recebendo BPC. A família continua recebendo o benefício?', a: 'NÃO. O BPC é intransferível e não gera pensão por morte para os herdeiros. Diferente da aposentadoria, o BPC é um benefício PESSOAL e termina com o falecimento do titular. A família tem direito apenas a eventuais parcelas atrasadas que o titular tinha a receber em vida (não pagas pelo INSS).' },
  { cat: 'idoso', q: 'Idoso estrangeiro residente no Brasil tem direito ao BPC?', a: 'Sim, desde 2007 (Decreto 6.214/2007). Estrangeiro naturalizado brasileiro ou estrangeiro com residência permanente comprovada no Brasil tem o mesmo direito que o brasileiro nato, atendendo aos demais requisitos (idade 65+, renda per capita até ¼ do SM, CadÚnico). É preciso apresentar RNE (Registro Nacional de Estrangeiro) ou CRNM atualizado.' },

  /* ===== BPC PESSOA COM DEFICIÊNCIA ===== */
  { cat: 'deficiencia', q: 'Tenho laudo médico — basta isso para conseguir o BPC?', a: 'Não. O laudo é importante, mas não é suficiente. A concessão do BPC para pessoa com deficiência exige a APROVAÇÃO em DUAS perícias do INSS: a perícia MÉDICA (avalia a deficiência clinicamente) e a perícia SOCIAL (avalia barreiras no dia a dia, dependência, impacto familiar). Muitos pedidos são negados na perícia social mesmo com laudo robusto, porque o perito entende que a pessoa "tem autonomia". Por isso a documentação social é tão importante quanto a médica.' },
  { cat: 'deficiencia', q: 'Autismo (TEA) sempre dá direito ao BPC?', a: 'Não automaticamente. A Lei 12.764/2012 equipara o autismo a deficiência para todos os fins legais, então o autista tem proteção pela LBI. Porém, o BPC depende de DUAS coisas: (1) a deficiência precisa gerar impedimentos de longo prazo (mín. 2 anos) que limitem a participação plena na sociedade, e (2) renda familiar per capita ≤ ¼ do SM. Autistas de níveis 2 e 3 (suporte substancial e muito substancial) costumam obter o benefício. Nível 1 (suporte leve) gera negativa frequente — cabe recurso com documentação reforçada.' },
  { cat: 'deficiencia', q: 'Posso trabalhar com carteira assinada e receber BPC ao mesmo tempo?', a: 'Sim, com regras específicas. A Lei 13.146/2015 (Estatuto da Pessoa com Deficiência) criou o "BPC Trabalho": a pessoa com deficiência pode aceitar emprego formal, MEI ou aprendizagem, e o BPC fica SUSPENSO (não cessado). Se o emprego acabar ou a renda voltar a ser incompatível, o benefício pode ser REATIVADO sem nova perícia, mediante simples requerimento. Esse direito é pouco conhecido e dificultado por orientações incorretas em agências do INSS.' },
  { cat: 'deficiencia', q: 'Sou hipertenso, diabético, tenho problema de coluna. Isso dá direito ao BPC?', a: 'Não automaticamente. Hipertensão, diabetes e problemas ortopédicos são doenças crônicas, mas para gerar BPC precisam causar IMPEDIMENTO de longo prazo na vida em sociedade — não basta o diagnóstico. Se as comorbidades juntas geram incapacidade real (não consegue trabalhar, depende de cuidados, usa muletas/cadeira), há chance. Cada caso exige avaliação técnica. Importante: a perícia avalia FUNÇÃO, não diagnóstico.' },
  { cat: 'deficiencia', q: 'Câncer dá direito automático ao BPC?', a: 'Não. Mesmo o câncer maligno não gera concessão automática do BPC. O paciente precisa demonstrar (1) impedimento de longo prazo (mínimo 2 anos), (2) renda familiar dentro do limite, e (3) aprovar nas perícias do INSS. Em casos de câncer avançado ou em tratamento agressivo (quimio/radio), a tendência é deferimento, mas exige laudo oncológico detalhado, relatórios atualizados e, idealmente, estadiamento TNM. Cânceres em remissão raramente conseguem o BPC.' },
  { cat: 'deficiencia', q: 'Esquizofrenia, depressão grave, transtorno bipolar dão direito ao BPC?', a: 'Podem dar, mas exigem comprovação rigorosa. Transtornos psiquiátricos graves (esquizofrenia CID F20, transtorno bipolar grave CID F31, depressão recorrente grave CID F33.2) podem gerar BPC se demonstrarem incapacidade contínua para a vida social/laboral por mais de 2 anos. É preciso histórico psiquiátrico longo (mínimo 12 meses de tratamento), receituários, registros de internação se houver, e relatório detalhado do psiquiatra. Quadros leves ou tratados com sucesso geralmente são negados.' },
  { cat: 'deficiencia', q: 'Criança com Síndrome de Down recebe BPC automaticamente?', a: 'Sim, com prioridade. A Lei 13.146/2015 e o Decreto 6.214/2007 garantem o direito ao BPC para pessoas com Síndrome de Down, e a Súmula 78 da TNU (Turma Nacional de Uniformização) dispensa a perícia de longo prazo — basta comprovar o diagnóstico (cariótipo 47, XX/XY+21) e a renda familiar. O CadÚnico é obrigatório, e o requerimento pode ser feito pelo responsável legal. Idade não é obstáculo: desde recém-nascidos.' },

  /* ===== RENDA FAMILIAR ===== */
  { cat: 'renda', q: 'Bolsa Família entra no cálculo da renda familiar para o BPC?', a: 'NÃO. O artigo 20-A da LOAS (Lei 8.742/1993) é expresso: o Programa Bolsa Família e o antigo Auxílio Brasil NÃO entram no cálculo do per capita para fins de BPC. Outros benefícios sociais (Brasil Sem Miséria, Renda Brasil) também são isentos. O que ENTRA no cálculo: salários, aposentadorias, pensões, BPC de outro morador, alugueis, pensão alimentícia recebida.' },
  { cat: 'renda', q: 'Marido se separou mas continua morando em casa. Conta como família?', a: 'Sim, conta. O conceito de "família" para o BPC é quem MORA NA MESMA CASA, independentemente de vínculo afetivo ou jurídico. Mesmo ex-cônjuge, parente distante ou agregado conta se compartilhar o mesmo endereço. Se houver separação formal mas convivência no mesmo imóvel, o INSS considera grupo familiar. A única forma de excluir alguém é comprovar residência separada (água, luz, declaração de IPTU).' },
  { cat: 'renda', q: 'Recebo pensão alimentícia dos meus filhos. Entra na renda do BPC?', a: 'Sim. Pensão alimentícia recebida (filhos para pai/mãe, ou ex-cônjuge) entra no cálculo da renda familiar para fins de BPC. Independe se é judicial, extrajudicial ou informal. Já a pensão alimentícia PAGA (que sai da família) NÃO é deduzida — a regra antiga que permitia abater está revogada desde 2015. Esse é um ponto que pega muita gente de surpresa.' },
  { cat: 'renda', q: 'Aluguel de um quartinho ou cômodo entra na renda?', a: 'Sim. Qualquer renda em dinheiro entra no cálculo, incluindo aluguel de quarto, cômodo, garagem ou imóvel. Mesmo aluguel informal (sem contrato) é considerado se houver indícios (depósito recorrente, declaração de morador). Se o aluguel for a única renda da família e a pessoa for idosa/deficiente, é possível argumentar exceções legais — mas o INSS começa pela regra estrita.' },
  { cat: 'renda', q: 'Filho com BPC mora em casa. A renda dele conta na soma para meu BPC?', a: 'Em regra, SIM — e isso causa problemas. O BPC de um morador entra no cálculo do per capita dos demais, podendo derrubar pedidos. Exceção importante: a Súmula 79 da TNU determina que o BPC do idoso ou deficiente que JÁ recebe NÃO entra no cálculo de outro pedido de BPC no mesmo grupo familiar. Mas o INSS frequentemente desconhece a súmula e nega — cabe recurso.' },

  /* ===== PROCESSO / PERÍCIA / RECURSOS ===== */
  { cat: 'processo', q: 'Quanto tempo leva para o INSS analisar o pedido de BPC?', a: 'Pela Lei 13.146/2015 e Lei 14.331/2022, o INSS tem até 90 dias para decidir após o requerimento + entrega de documentos. Na prática, BPC idoso costuma levar 30 a 60 dias. BPC deficiente demora mais (90 a 180 dias) porque depende de duas perícias. Atrasos acima de 90 dias podem ser denunciados via Ouvidoria do INSS, MPF, Defensoria Pública ou ação de mandado de segurança — esses canais costumam acelerar.' },
  { cat: 'processo', q: 'O INSS negou meu BPC. Como funciona o recurso?', a: 'Você tem 30 dias para entrar com RECURSO ADMINISTRATIVO no INSS (CRPS — Conselho de Recursos da Previdência Social). É gratuito e pode ser feito sozinho via Meu INSS ou com advogado/defensor. Se o recurso administrativo também for negado (ou demorar muito), cabe AÇÃO JUDICIAL na Justiça Federal. Estatísticas: cerca de 40% dos recursos administrativos são revertidos; na esfera judicial, taxa de êxito sobe para 60-70% quando a documentação é bem fundamentada.' },
  { cat: 'processo', q: 'Como funciona a perícia médica do INSS para BPC?', a: 'A perícia é AGENDADA pelo Meu INSS após o requerimento. Você comparece à agência (ou faz exame domiciliar se imobilizado). O perito tem em média 15 minutos para avaliar, faz perguntas sobre rotina, dor, limitações, medicação. Ele lê seus laudos mas dá MAIS PESO à observação clínica do momento. Dica: leve TUDO (laudos antigos, exames, receituários, declarações escolares de pessoa com deficiência), use roupas confortáveis, descreva a pior fase da doença, não minimize.' },
  { cat: 'processo', q: 'Posso pedir o BPC sozinho no Meu INSS, sem advogado?', a: 'Sim. O requerimento de BPC é GRATUITO e pode ser feito por qualquer pessoa diretamente no aplicativo/site Meu INSS, ou ligando 135. Não precisa de advogado para o pedido inicial. Advogado se justifica em três momentos: (1) negativa do INSS, para recurso; (2) caso judicializado; (3) situações complexas (acumulação, pente fino, BPC trabalho). A consulta inicial costuma ser gratuita.' },
  { cat: 'processo', q: 'Caí no pente fino e meu BPC foi suspenso. Como restabelecer?', a: 'Primeiro passo: identificar o motivo da suspensão (acessar Meu INSS → Histórico de Mensagens, ou ligar 135). Motivos comuns: (1) CadÚnico desatualizado — atualize no CRAS imediatamente; (2) renda familiar acima do limite por novo membro/emprego — explique a situação; (3) auditoria do TCU/CGU — exige defesa documentada em 30 dias. Se não defender, o benefício é CESSADO. Restabelecimento exige nova perícia em alguns casos.' },

  /* ===== CADÚNICO / DOCUMENTAÇÃO ===== */
  { cat: 'cadunico', q: 'Preciso fazer o CadÚnico ANTES de pedir o BPC?', a: 'Sim, obrigatoriamente. Desde 2016 (Decreto 8.805) o cadastro no CadÚnico é PRÉ-REQUISITO para o BPC. Sem cadastro ativo, o INSS automaticamente nega. O cadastro é gratuito, feito no CRAS (Centro de Referência de Assistência Social) da sua região. Leve documentos de todos os moradores: RG, CPF, certidão de nascimento, comprovante de residência, comprovantes de renda (ou declaração de ausência). Validade: 2 anos.' },
  { cat: 'cadunico', q: 'Meu CadÚnico está desatualizado. O que pode acontecer?', a: 'Risco alto de cessação do BPC. O CadÚnico tem validade de 2 anos. Após esse prazo, ele entra em status DESATUALIZADO e o INSS pode (e geralmente vai) suspender ou cessar o benefício automaticamente, sem prévio aviso. Solução: vá ao CRAS antes do vencimento e atualize. Se já caiu, atualize urgentemente e dê entrada em pedido de RESTABELECIMENTO no Meu INSS — costuma sair em 30 a 90 dias.' },
  { cat: 'cadunico', q: 'O BPC dá direito a benefícios extras (Vale-Gás, Tarifa Social de Energia)?', a: 'Sim. Como beneficiário do BPC inscrito no CadÚnico, você tem direito a: (1) Tarifa Social de Energia Elétrica (desconto de 10% a 65% na conta de luz); (2) Vale-Gás (auxílio bimestral para botijão); (3) ID Jovem (deficiente até 29 anos — meia-passagem interestadual); (4) Isenção de tarifa em transporte público municipal em várias cidades; (5) Isenção de IPVA em alguns estados se houver veículo adaptado em nome do deficiente. Não é automático — precisa requerer separadamente em cada órgão.' },
  { cat: 'cadunico', q: 'Posso ter conta poupança ou conjunta recebendo BPC?', a: 'Sim, pode. Não há proibição de conta bancária para beneficiário do BPC. Pode ter conta corrente, poupança, conta digital (Nubank, PicPay, etc.) e até conta conjunta. O que NÃO pode: ter dinheiro guardado em valor significativo (movimentação alta), recebimento de salários, transferências grandes recorrentes — o INSS cruza dados com o Bacen periodicamente e pode questionar. Manter saldo médio compatível com a renda declarada no CadÚnico evita problemas.' },
];

const FAQ_CATS = [
  { v: 'all', l: 'Todas' },
  { v: 'idoso', l: 'BPC Idoso' },
  { v: 'deficiencia', l: 'BPC Deficiência' },
  { v: 'renda', l: 'Renda familiar' },
  { v: 'processo', l: 'Processo & perícia' },
  { v: 'cadunico', l: 'CadÚnico & extras' },
];

function FAQ() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = norm(query.trim());
  const filtered = FAQ_ITEMS
    .filter(it => filter === 'all' || it.cat === filter)
    .filter(it => !q || norm(it.q).includes(q) || norm(it.a).includes(q));
  return (
    <section id="faq" className="bg-bone">
      <div className="container-narrow">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Perguntas frequentes</div>
          <h2>Tire suas <em>dúvidas</em>.</h2>
          <p style={{ color: 'var(--ink-500)', maxWidth: 620, margin: '12px auto 0', textAlign: 'center' }}>
            {FAQ_ITEMS.length} das perguntas que mais aparecem no nosso WhatsApp. <strong>Clique em qualquer pergunta para abrir a resposta</strong> — explicação direta com as referências legais (LOAS, Lei 13.146/2015, Decreto 6.214/2007, súmulas da TNU). Sua dúvida não está aqui? A gente responde no WhatsApp.
          </p>
        </div>
        <div className="faq-search" role="search">
          <span className="faq-search-icon" aria-hidden="true">🔎</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por palavra-chave: autismo, pensão, recurso, CadÚnico…"
            aria-label="Pesquisar nas perguntas frequentes"
          />
          {query && (
            <button className="faq-search-clear" onClick={() => setQuery('')} aria-label="Limpar pesquisa">×</button>
          )}
        </div>
        <div className="faq-filters" role="tablist">
          {FAQ_CATS.map(c => (
            <button
              key={c.v}
              role="tab"
              aria-selected={filter === c.v}
              className={`faq-filter ${filter === c.v ? 'is-active' : ''}`}
              onClick={() => setFilter(c.v)}
            >
              {c.l}
              <span className="faq-filter-count">
                {c.v === 'all' ? FAQ_ITEMS.length : FAQ_ITEMS.filter(it => it.cat === c.v).length}
              </span>
            </button>
          ))}
        </div>
        <div className="faq">
          {filtered.length === 0 && (
            <div className="faq-empty">
              <p>Nada encontrado pra <strong>"{query}"</strong>.</p>
              <a className="btn btn--primary" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">Perguntar no WhatsApp</a>
            </div>
          )}
          {filtered.map((it, i) => (
            <details className="faq-item" key={`${filter}-${q}-${i}`}>
              <summary>{it.q}</summary>
              <div className="answer">{it.a}</div>
            </details>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ color: 'var(--ink-500)', fontSize: 15, marginBottom: 16 }}>
            Sua dúvida não está aqui?
          </p>
          <a href="https://wa.me/5521964238080" className="btn btn--primary">
            Perguntar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact Form ---------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <section>
      <div className="container-narrow">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Análise gratuita</div>
          <h2>Fale com a <em>nossa equipe</em>.</h2>
          <p>Preencha abaixo e te respondemos no WhatsApp no mesmo dia. Sem compromisso.</p>
        </div>
        <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
              <h3>Pedido recebido!</h3>
              <p style={{ color: 'var(--ink-500)' }}>Em alguns minutos você vai receber uma mensagem nossa no WhatsApp. Estamos com você.</p>
            </div>
          ) : (
            <>
              <div className="form-row two">
                <div className="field"><label>Seu nome</label><input type="text" placeholder="Como devo te chamar?" required /></div>
                <div className="field"><label>Seu WhatsApp</label><input type="tel" placeholder="(00) 00000-0000" required /></div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Para quem é o benefício?</label>
                  <select required>
                    <option value="">Selecione...</option>
                    <option>Para mim — BPC idoso (65+)</option>
                    <option>Para mim — BPC deficiente</option>
                    <option>Para meu pai ou minha mãe</option>
                    <option>Para meu filho ou minha filha</option>
                    <option>Para outra pessoa da família</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Conta um pouco da situação (opcional)</label>
                  <textarea placeholder="Diagnóstico, idade, renda da família, se já tentou pedir antes..."></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                Enviar pelo WhatsApp →
              </button>
              <label style={{ display: 'flex', gap: 10, marginTop: 16, fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.5, cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: 3, accentColor: 'var(--terra-500)' }} />
                <span>
                  Concordo com a <a href="privacidade.html" target="_blank">Política de Privacidade</a> e os <a href="termos.html" target="_blank">Termos de Uso</a>. Autorizo o contato pelo WhatsApp informado.
                </span>
              </label>
              <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-400, var(--ink-500))', lineHeight: 1.5, opacity: 0.75, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span aria-hidden="true">🔒</span>
                <span>Tratamos seus dados em conformidade com a <strong>LGPD</strong> (Lei 13.709/2018). Usados apenas para responder seu contato.</span>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- CTA Banner ---------- */
function CTABanner() {
  return (
    <section className="tight">
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2>Vamos conversar sobre <em>o seu caso</em>?</h2>
            <p>Análise gratuita, sem compromisso. Te respondemos no mesmo dia, em português claro.</p>
          </div>
          <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080">
            Falar no WhatsApp agora
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* TOP STRIP — Map + Google review CTA (visualmente destacado) */}
        <div className="footer-top">
          {/* Map */}
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps?q=Pra%C3%A7a+Nossa+Senhora+da+Apresenta%C3%A7%C3%A3o,+223,+Iraj%C3%A1,+Rio+de+Janeiro,+RJ,+21231-230&output=embed"
              width="100%" height="100%" style={{ border: 0, display: 'block', filter: 'grayscale(0.3) brightness(0.9)' }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Mapa — Portal do BPC, Irajá/RJ">
            </iframe>
          </div>

          {/* Google Review CTA */}
          <a
            href="https://g.page/r/CcJNe240Go7AEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="review-card"
          >
            <div className="review-card-text">
              <div className="review-card-stars" aria-hidden="true">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="review-card-kicker">Sua história ajuda outra família</div>
              <h3 className="review-card-title">A gente ajudou você? <em>Conta no Google.</em></h3>
              <p className="review-card-sub">Uma avaliação em 30 segundos ajuda quem ainda está perdido no INSS a nos encontrar.</p>
              <span className="review-card-btn">
                Avaliar no Google
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </span>
            </div>
            <div className="review-card-qr">
              <div className="review-card-qr-frame">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&format=svg&data=https%3A%2F%2Fg.page%2Fr%2FCcJNe240Go7AEBM%2Freview&color=1A140E&bgcolor=FFFFFF" alt="QR Code para avaliar o Portal do BPC no Google" width="120" height="120" loading="lazy" />
              </div>
              <div className="review-card-qr-cap">
                <span className="review-card-qr-cap-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </span>
                <span>Aponte a câmera</span>
              </div>
            </div>
          </a>
        </div>

        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src="assets/logo-marca.png" alt="Portal do BPC" style={{ height: 84, width: 84, objectFit: 'contain', display: 'block' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1, color: 'var(--ink-900)' }}>Portal do</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, fontStyle: 'italic', lineHeight: 1, color: 'var(--terra-500)', marginTop: 4 }}>BPC<span style={{color:'var(--terra-300)'}}>.</span></div>
              </div>
            </div>
            <p className="footer-desc">Informação clara e atendimento humano sobre o Benefício de Prestação Continuada (BPC/LOAS).</p>
            <p className="footer-desc" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra-400, #d99466)', display: 'block', marginBottom: 6 }}>Faz parte do escritório</span>
              <a href="https://www.carloscostaprev.com.br" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f5ede0', fontWeight: 600, textDecoration: 'none' }}>
                CarlosCostaPrev — Previdência geral <span aria-hidden="true">↗</span>
              </a>
              <span style={{ display: 'block', marginTop: 4, fontSize: 13, opacity: 0.7 }}>Aposentadorias, pensões, auxílios e BPC</span>
            </p>
          </div>
          <div>
            <h5>Navegação</h5>
            <ul>
              <li><a href="#/">Início</a></li>
              <li><a href="#patologias">Patologias</a></li>
              <li><a href="#/simulador">Simulador</a></li>
              <li><a href="#/blog">Blog</a></li>
              <li><a href="#faq">Perguntas frequentes</a></li>
            </ul>
          </div>
          <div>
            <h5>Conteúdo</h5>
            <ul>
              <li><a href="#">BPC para idoso</a></li>
              <li><a href="#">BPC para deficiente</a></li>
              <li><a href="#">Como dar entrada</a></li>
              <li><a href="#">Recurso de negativa</a></li>
              <li><a href="#">Documentos necessários</a></li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li>
                <a href="https://wa.me/5521964238080" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <img src="assets/icon-whatsapp.svg" alt="" style={{ width: 18, height: 18 }} />
                  WhatsApp: (21) 96423-8080
                </a>
              </li>
            </ul>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <a href="https://www.instagram.com/portaldobpc" target="_blank" rel="noreferrer" aria-label="Instagram" style={socialBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/portaldobpc" target="_blank" rel="noreferrer" aria-label="Facebook" style={socialBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://g.page/portaldobpc/review" target="_blank" rel="noreferrer" aria-label="Avaliar no Google" style={socialBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.6 7.6H22l-6.2 4.6 2.3 7.5L12 17.3 5.9 21.7l2.3-7.5L2 9.6h7.4z"/></svg>
              </a>
            </div>
            <h5 style={{ marginTop: 28 }}>Endereço</h5>
            <p className="footer-desc" style={{ margin: 0 }}>
              Praça Nossa Sra. da Apresentação, 223 — Sala 206<br/>
              Irajá · Rio de Janeiro · RJ<br/>
              CEP 21231-230
            </p>
          </div>
        </div>

        {/* (Map + Review CTA agora no topo do footer — ver .footer-top) */}

        <div className="footer-bottom">
          <div>
            <div>© 2026 Portal do BPC. Todos os direitos reservados.</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Portal do BPC é uma marca operada por <strong>CarlosCostaPrev — Escritório de Advocacia Previdenciária</strong> · Irajá, Rio de Janeiro/RJ.</div>
          </div>
          <span><a href="privacidade.html" style={{ color: 'inherit' }}>Privacidade</a> · <a href="termos.html" style={{ color: 'inherit' }}>Termos</a></span>
        </div>
      </div>
    </footer>
  );
}

const socialBtn = {
  width: 38, height: 38, borderRadius: 999,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(255,255,255,0.08)', color: 'var(--cream)',
  textDecoration: 'none', transition: 'all 200ms var(--ease-out)',
  border: '1px solid rgba(255,255,255,0.1)',
};

/* ---------- WhatsApp Float ---------- */
function WhatsAppFloat() {
  return (
    <a className="wa-float" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
      <img src="assets/icon-whatsapp.svg" alt="" />
    </a>
  );
}

Object.assign(window, {
  Header, Hero, StatsStrip, Especialidades, PatologiasGrid, RecursosDestaque,
  SobrePortal, NossoEscritorio, Depoimentos, Blog, FAQ, ContactForm, CTABanner,
  Footer, WhatsAppFloat, PATOLOGIAS, CATEGORIAS,
});

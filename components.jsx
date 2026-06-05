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

/* slug de patologia → nome do arquivo estático (ex.: "Autismo (TEA)" → autismo-tea.html) */
function patSlug(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}

/* ---------- Header ---------- */
function Header({ active, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = [
    { id: 'home', label: 'Início' },
    { id: 'patologias', label: 'Patologias', page: 'patologias.html' },
    { id: 'pericias', label: 'Perícias' },
    { id: 'estrangeiro', label: 'Estrangeiro' },
    { id: 'simulador', label: 'Simulador' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'Perguntas', hash: '#faq' },
  ];

  function handleNavClick(e, n) {
    setMenuOpen(false);
    if (n.page) { window.location.href = n.page; return; }
    e.preventDefault();
    if (n.hash) {
      if (active !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.querySelector(n.hash);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(n.hash);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
      return;
    }
    onNavigate(n.id);
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#/" className="header-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src="assets/logo-monograma-cc.png" alt="Portal do BPC" className="header-logo-mark" style={{ objectFit: 'contain' }} />
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
                href={n.page || n.hash || `#/${n.id}`}
                className={active === n.id ? 'nav-link active' : 'nav-link'}
                onClick={(e) => handleNavClick(e, n)}
              >
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <a className="btn btn--primary btn--sm header-cta-desktop" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
            Falar agora →
          </a>
          <button
            className={`header-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div
        className={`mobile-drawer-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-label="Menu principal" aria-hidden={!menuOpen}>
        <div className="mobile-drawer-header">
          <a href="#/" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="assets/logo-monograma-cc.png" alt="Portal do BPC" style={{ height: 40, width: 40, objectFit: 'contain' }} />
            <span className="header-logo-text">
              <span className="header-logo-text-1" style={{ fontSize: 13 }}>Portal do</span>
              <span className="header-logo-text-2" style={{ fontSize: 20 }}>BPC<span className="header-logo-dot">.</span></span>
            </span>
          </a>
          <button className="mobile-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">✕</button>
        </div>
        <div className="mobile-drawer-nav">
          {nav.map(n => (
            <a
              key={n.id}
              href={n.page || n.hash || `#/${n.id}`}
              className={active === n.id ? 'active' : ''}
              onClick={(e) => handleNavClick(e, n)}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="mobile-drawer-cta">
          <a href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
            <img src="assets/icon-whatsapp.svg" alt="" style={{ width: 22, height: 22 }} />
            Falar no WhatsApp
          </a>
        </div>
      </nav>
    </>
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
          <img src="assets/dr-carlos-costa.jpg" alt="Carlos Costa e equipe do Portal do BPC" width={820} height={1020} fetchpriority="high" decoding="async" style={{ objectFit: 'cover', objectPosition: 'top center', width: '100%', height: '100%' }} />
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
            <a className="btn btn--secondary" href="bpc-idoso/">Saber mais →</a>
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
            <a className="btn btn--secondary" href="patologias.html">Ver as 25 patologias →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Patologias grid ---------- */
const CID_MAP = { TEA:'F84.0', SD:'Q90', PCx:'G80', EM:'G35', PK:'G20', AZ:'G30', AVC:'I69', EL:'G12.2', EP:'G40', EQ:'F20', TB:'F31', DV:'H54', DA:'H90.3', CA:'C00–C97', IR:'N18', CG:'I50', HV:'B20–B24', HP:'K74', LE:'M32', DM:'G71.0' };
const CIF_KW = { TEA:'linguagem interacao social comunicacao', SD:'intelectual fala aprendizagem autocuidado', PCx:'movimento mobilidade comunicacao', EM:'mobilidade fadiga visao', PK:'movimento marcha tremor fala', AZ:'memoria orientacao autocuidado', AVC:'motora fala cognitiva mobilidade', EL:'movimento fala degluticao respiracao', EP:'consciencia seguranca crises', EQ:'pensamento percepcao autocuidado', TB:'humor energia trabalho', DV:'visao mobilidade leitura', DA:'audicao comunicacao', CA:'dor fadiga imunidade mobilidade', IR:'fadiga hemodialise', CG:'cardiovascular esforco mobilidade', HV:'imunologica estigma', HP:'fadiga ascite', LE:'articular renal fadiga dor', DM:'neuromuscular mobilidade' };
function patNorm(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}

function PatologiasGrid({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const cats = ['all', ...Object.keys(CATEGORIAS)];
  const qn = patNorm(q);
  const filtered = PATOLOGIAS.filter(p => (filter === 'all' || p.cat === filter) && (qn === '' || patNorm(p.nome + p.sigla + p.resumo + (CID_MAP[p.sigla]||'') + (CIF_KW[p.sigla]||'') + 'cid cif funcionalidade').includes(qn)));
  return (
    <section className="bg-bone" id="patologias">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Doenças e condições · 25 patologias</div>
          <h2>O que pode dar direito ao <em>BPC</em>.</h2>
          <p>Cada doença tem uma história diferente dentro do INSS. Encontre a sua aqui — o que prova, o que costuma ser negado, o que o perito vai olhar. Análise sempre individual.</p>
        </div>
        <div style={{ maxWidth: 820, margin: '0 auto 30px', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ flex: '1 1 250px', background: 'var(--bone)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra-400)', marginBottom: 6 }}>CID — o diagnóstico</div>
            <span style={{ fontSize: 14.5, color: 'var(--ink-500)', lineHeight: 1.55 }}>O código da doença (ex.: F84, Q90). É o que a <strong style={{ color: 'var(--ink-900)' }}>perícia médica</strong> do INSS confirma.</span>
          </div>
          <div style={{ flex: '1 1 250px', background: 'var(--bone)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra-400)', marginBottom: 6 }}>CIF — a funcionalidade</div>
            <span style={{ fontSize: 14.5, color: 'var(--ink-500)', lineHeight: 1.55 }}>O quanto a condição impede a vida diária. É o que a <strong style={{ color: 'var(--ink-900)' }}>avaliação social</strong> mede.</span>
          </div>
        </div>
        <p style={{ maxWidth: 760, margin: '0 auto 40px', textAlign: 'center', fontSize: 15.5, color: 'var(--ink-700)', lineHeight: 1.65 }}>
          Ter o diagnóstico não basta sozinho: o BPC por deficiência exige <strong>impedimento de longo prazo somado a barreiras na participação</strong>. É a união do <strong>CID</strong> (o que você tem) com a <strong>CIF</strong> (o quanto isso te limita) que garante o direito — e cada patologia abaixo traz as duas classificações.
        </p>
        <div style={{ maxWidth: 520, margin: '0 auto 18px', position: 'relative' }}>
          <svg viewBox="0 0 24 24" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, stroke: 'var(--ink-500)', fill: 'none', strokeWidth: 2 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nome ou CID (ex.: autismo, F84, Q90)…" aria-label="Buscar patologia por nome ou CID" style={{ width: '100%', padding: '14px 18px 14px 44px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--bone)', color: 'var(--ink-900)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none' }} />
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
        {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--ink-500)', margin: '8px 0 32px' }}>Nenhuma patologia encontrada. Tente o nome ou o CID (ex.: <strong>F84</strong>, <strong>Q90</strong>).</p>}
        <div className="patologias-grid">
          {filtered.map(p => {
            const cat = CATEGORIAS[p.cat];
            return (
              <a key={p.sigla} className="pat-card" href={`/${patSlug(p.nome)}.html`}>
                <div className="ic" style={{ background: cat.bg, color: cat.fg }}>{p.sigla}</div>
                <h4>{p.nome}</h4>
                <p>{p.resumo}</p>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, fontSize: 12, fontWeight: 600, color: cat.fg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: cat.dot }} />{cat.label}</span>
                  <span style={{ color: 'var(--ink-500)', letterSpacing: '0.04em' }}>CID {CID_MAP[p.sigla] || '—'}</span>
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
          <img src="assets/dr-carlos-costa.jpg" alt="Carlos Costa, especialista em BPC" width={820} height={1020} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
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
  /* BPC IDOSO */
  { cat: 'idoso', q: 'Idoso de 65+ que recebe pensão por morte do INSS pode receber o BPC?', a: 'Em regra, não. O BPC não pode ser acumulado com aposentadoria, pensão por morte, auxílio-doença ou qualquer outro benefício do INSS. A única exceção é a assistência médica e a pensão especial reparatória. Se a pensão recebida for de valor baixo e a renda familiar per capita continuar dentro do limite (até R$ 405,25), em alguns casos é possível renunciar à pensão para pleitear o BPC — mas exige análise técnica.' },
  { cat: 'idoso', q: 'Meu filho mora comigo e ganha um salário mínimo. Perco o BPC?', a: 'Depende do cálculo per capita. Soma-se TODA a renda da casa (incluindo o salário do filho) e divide pelo número de moradores. Se o resultado ficar até R$ 405,25 por pessoa, o direito ao BPC é mantido. Exemplo: filho ganha R$ 1.621, casal com mais 2 idosos = 4 pessoas. R$ 1.621 ÷ 4 = R$ 405,25/pessoa — exatamente no limite.' },
  { cat: 'idoso', q: 'Idoso pode receber BPC fazendo bico ou trabalho informal?', a: 'Sim, desde que a renda total da família continue dentro do limite. O BPC não exige parar de trabalhar — exige renda familiar per capita inferior a 1/4 do salário mínimo. Em 2026, com o pente fino cruzando CadÚnico, CNIS e movimentações Pix em tempo real, rendas não declaradas podem levar à cessação do benefício.' },
  { cat: 'idoso', q: 'Idoso preso ou em cumprimento de pena pode receber BPC?', a: 'Não em regime fechado. O BPC fica SUSPENSO durante esse período. Quando o idoso é solto, o benefício pode ser RESTABELECIDO mediante pedido formal ao INSS, com cópia do alvará de soltura, comprovação de endereço e CadÚnico atualizado. Em regime semiaberto ou liberdade assistida, o benefício pode continuar sendo pago.' },
  { cat: 'idoso', q: 'Meu pai faleceu recebendo BPC. A família continua recebendo?', a: 'NÃO. O BPC é intransferível e não gera pensão por morte para os herdeiros. Diferente da aposentadoria, o BPC é PESSOAL e termina com o falecimento do titular. A família tem direito apenas a eventuais parcelas atrasadas não pagas pelo INSS.' },
  { cat: 'idoso', q: 'Idoso de 65+ ainda precisa fazer perícia social em 2026?', a: 'A regra ficou mais leve. Para o BPC do idoso em 2026, a Portaria 33/2025 (reavaliação) e o procedimento de pedido inicial dispensam, na maioria dos casos, a entrevista presencial — a análise é feita pelo CadÚnico atualizado e cruzamento de dados. Apenas em situações específicas há convocação. Já para o BPC deficiente, perícia médica + avaliação social continuam obrigatórias.' },

  /* BPC DEFICIÊNCIA */
  { cat: 'deficiencia', q: 'Tenho laudo médico — basta isso para o BPC?', a: 'Não. O laudo é importante, mas não suficiente. A concessão do BPC para pessoa com deficiência exige aprovação em DUAS avaliações: a perícia MÉDICA (avalia clinicamente) e a avaliação SOCIAL (avalia barreiras no dia a dia). Juntas formam a avaliação biopsicossocial prevista na Lei 13.146/2015.' },
  { cat: 'deficiencia', q: 'Autismo (TEA) sempre dá direito ao BPC?', a: 'Não automaticamente. A Lei 12.764/2012 equipara o autismo a deficiência para todos os fins legais. Porém, o BPC depende de (1) impedimentos de longo prazo (mín. 2 anos) que limitem participação plena, e (2) renda familiar per capita até 1/4 do SM. Autistas nível 2 e 3 costumam obter o benefício. Nível 1 (suporte leve) gera negativa frequente — cabe recurso com documentação reforçada.' },
  { cat: 'deficiencia', q: 'Posso trabalhar com carteira assinada e receber BPC?', a: 'Em regra não acumula com salário, mas a Lei 13.146/2015 criou o BPC Trabalho: a pessoa com deficiência pode aceitar emprego formal, MEI ou aprendizagem, e o BPC fica SUSPENSO (não cessado). Em 2026, novas regras permitem solicitar ao INSS meio salário mínimo como incentivo à inclusão produtiva. Se o emprego acabar, o benefício pode ser REATIVADO sem nova perícia.' },
  { cat: 'deficiencia', q: 'Hipertensão, diabetes, problema de coluna dão direito ao BPC?', a: 'Não automaticamente. Doenças crônicas precisam causar IMPEDIMENTO de longo prazo na vida em sociedade — não basta o diagnóstico. Se as comorbidades geram incapacidade real (não consegue trabalhar, depende de cuidados), há chance. A perícia avalia FUNÇÃO, não diagnóstico.' },
  { cat: 'deficiencia', q: 'Câncer dá direito automático ao BPC?', a: 'Não. Mesmo câncer maligno não gera concessão automática. Exige (1) impedimento de longo prazo (2+ anos), (2) renda familiar dentro do limite, (3) aprovação nas perícias. Câncer avançado ou em tratamento agressivo tende a deferimento, mas exige laudo oncológico detalhado e estadiamento TNM.' },
  { cat: 'deficiencia', q: 'Esquizofrenia, depressão grave, transtorno bipolar dão BPC?', a: 'Podem dar, exigem comprovação rigorosa. Transtornos psiquiátricos graves (CID F20, F31, F33.2) podem gerar BPC se demonstrarem incapacidade contínua por mais de 2 anos. Necessário histórico psiquiátrico longo (mín. 12 meses), receituários, registros de internação se houver, e relatório detalhado do psiquiatra.' },
  { cat: 'deficiencia', q: 'Criança com Síndrome de Down recebe BPC automaticamente?', a: 'Sim, com prioridade. A Lei 13.146/2015 e o Decreto 6.214/2007 garantem o direito. A Súmula 78 da TNU dispensa a perícia de longo prazo — basta comprovar diagnóstico (cariótipo 47, XX/XY+21) e renda familiar. CadÚnico é obrigatório. Idade não é obstáculo: desde recém-nascidos.' },
  { cat: 'deficiencia', q: 'Reavaliação do BPC do meu filho com deficiência permanente é obrigatória?', a: 'Não, se for permanente e irreversível. A Portaria 33/2025 dispensa a perícia médica de reavaliação para deficiências permanentes irreversíveis (com laudo prognóstico desfavorável). MAS a avaliação social continua obrigatória. Idosos 65+, beneficiários retornados após trabalho ou após interrupção do auxílio-inclusão também estão dispensados (2 anos).' },

  /* BPC ESTRANGEIRO */
  { cat: 'estrangeiro', q: 'Estrangeiro pode receber BPC no Brasil em 2026?', a: 'Sim. Com base no STF (RE 587.970/2017) e na Lei 8.742/93, estrangeiros com situação migratória regular têm direito ao BPC nas mesmas condições do brasileiro nato. Hoje há cerca de 1,8 milhão de estrangeiros com CRNM ativa no Brasil. Naturalizados, residentes permanentes, refugiados (CONARE) e portadores de visto humanitário podem solicitar.' },
  { cat: 'estrangeiro', q: 'Qual a diferença entre CRNM, DPRNM e Protocolo de Refúgio?', a: 'CRNM (Carteira de Registro Nacional Migratório) é o documento definitivo — válido 5 anos para refugiados e 10 anos para residência permanente; emitida pela Polícia Federal. DPRNM (Documento Provisório) e Protocolo de Refúgio são para solicitantes de refúgio enquanto o CONARE analisa o pedido — valem 1 ano e são renováveis. Os 3 garantem direito a CPF, CTPS, SUS e — desde 2017 — BPC.' },
  { cat: 'estrangeiro', q: 'Solicitante de refúgio (sem decisão do CONARE) pode pedir BPC?', a: 'Sim, com base no DPRNM e Protocolo de Refúgio. Como o ACNUR e a Polícia Federal reconhecem que solicitantes de refúgio têm direito de acesso a serviços públicos e benefícios sociais, é possível requerer o BPC apresentando o DPRNM válido + CPF + CadÚnico. Em casos de negativa por INSS desconhecendo a regra, cabe recurso ou judicialização — a jurisprudência tem reconhecido o direito.' },
  { cat: 'estrangeiro', q: 'Refugiado venezuelano, haitiano ou afegão com visto humanitário tem direito ao BPC?', a: 'Sim, desde que tenha CRNM ou Protocolo de Refúgio válido, atenda aos critérios de idade (65+) ou deficiência e a renda familiar per capita esteja dentro do limite. Os principais grupos de refugiados reconhecidos no Brasil são sírios (25%), venezuelanos (18%) e afegãos (12%). O acesso ao BPC é o mesmo do brasileiro nato — o que muda é a documentação migratória específica.' },
  { cat: 'estrangeiro', q: 'Minha CRNM venceu enquanto eu estava no processo de renovação. Posso pedir BPC?', a: 'Em regra não — o INSS rejeita pedidos com documento vencido na data do requerimento. Solução: leve à Polícia Federal o protocolo de renovação imediatamente, peça orientação sobre CRNM provisória (alguns casos liberam) ou aguarde a emissão da nova carteira (60-90 dias).' },
  { cat: 'estrangeiro', q: 'Documentos do meu país de origem precisam ser traduzidos?', a: 'Sim. Certidões de nascimento, casamento, laudos médicos e qualquer documento em outro idioma precisam de tradução juramentada brasileira para terem validade no BPC. A lista de tradutores juramentados está nas Juntas Comerciais estaduais (no RJ: jucerja.rj.gov.br). Custo médio: R$ 80-150 por página. Sem essa tradução, o INSS desconsidera o documento.' },
  { cat: 'estrangeiro', q: 'Tempo mínimo de residência no Brasil é exigido para o BPC do estrangeiro?', a: 'NÃO. Após a decisão do STF em 2017 (RE 587.970), não existe mais exigência de tempo mínimo. O critério é apenas: ter situação migratória regular (CRNM, DPRNM ou Protocolo de Refúgio válidos), atender aos critérios de idade ou deficiência, e renda familiar dentro do limite. Antes do STF, havia exigência de 15 anos — essa regra foi derrubada como inconstitucional.' },

  /* RENDA FAMILIAR */
  { cat: 'renda', q: 'Bolsa Família entra no cálculo da renda familiar para o BPC?', a: 'NÃO. O artigo 20-A da LOAS é expresso: Bolsa Família e antigo Auxílio Brasil NÃO entram no cálculo do per capita para fins de BPC. Outros benefícios sociais também são isentos. O que ENTRA: salários, aposentadorias, pensões, BPC de outro morador (com exceção da Súmula 79 TNU), aluguéis, pensão alimentícia recebida.' },
  { cat: 'renda', q: 'Marido se separou mas continua morando em casa. Conta como família?', a: 'Sim. O conceito de família para o BPC é quem MORA NA MESMA CASA, independentemente de vínculo afetivo ou jurídico. Mesmo ex-cônjuge, parente distante ou agregado conta se compartilhar o mesmo endereço. A única forma de excluir alguém é comprovar residência separada (água, luz, declaração de IPTU, contrato de aluguel em outro endereço).' },
  { cat: 'renda', q: 'Recebo pensão alimentícia. Entra na renda do BPC?', a: 'Sim. Pensão alimentícia RECEBIDA entra no cálculo. Independe se é judicial, extrajudicial ou informal. Já a pensão alimentícia PAGA (que sai da família) NÃO é deduzida — a regra antiga que permitia abater está revogada desde 2015.' },
  { cat: 'renda', q: 'Em 2026, gastos com saúde podem ser deduzidos da renda familiar?', a: 'Sim — é uma das mudanças importantes da Lei 15.077/2024. Gastos comprovados com saúde (medicamentos contínuos, terapias, fralda geriátrica, transporte para tratamento) podem ser abatidos da renda familiar no cálculo do per capita. Isso facilita o deferimento para famílias que ficavam de fora por margem pequena. Bolsas de estágio também deixaram de contar.' },
  { cat: 'renda', q: 'Filho com BPC mora em casa. A renda dele conta para meu BPC?', a: 'A regra clássica diz sim, mas a Súmula 79 da TNU determina que o BPC do idoso ou deficiente que JÁ recebe NÃO entra no cálculo de outro pedido de BPC no mesmo grupo familiar. Além disso, projeto em tramitação (PL 1624/22) propõe deduzir até 1 salário mínimo quando houver mais de um idoso/deficiente na mesma casa. O INSS frequentemente desconhece a súmula e nega — cabe recurso.' },

  /* PERÍCIA MÉDICA */
  { cat: 'pericia_medica', q: 'Como funciona a perícia médica do INSS para BPC em 2026?', a: 'A perícia é AGENDADA pelo Meu INSS após o requerimento. O perito tem em média 15 a 30 minutos para avaliar. Em 2026, com a Portaria oficial de telemedicina, pode ser presencial (na agência APS) ou remota (perito por videoconferência, mas o segurado vai presencialmente à APS para triagem). O perito lê laudos mas dá MAIS PESO à observação clínica do momento. Documentação incompleta é a principal causa de indeferimento.' },
  { cat: 'pericia_medica', q: 'Posso fazer perícia médica do BPC por videoconferência?', a: 'Em parte. A nova Portaria oficializa a teleperícia: o perito atende remotamente, MAS o segurado precisa comparecer presencialmente a uma Agência da Previdência Social (APS). Lá passa por triagem, apresenta documentos, assina termo de consentimento e aguarda em sala equipada com câmera/áudio. Em regiões sem peritos locais, esse formato vem acelerando filas. Idosos 65+ e deficiências permanentes irreversíveis costumam estar dispensados.' },
  { cat: 'pericia_medica', q: 'O que levar para a perícia médica do BPC?', a: 'Documentação completa: RG ou CIN com biometria, CPF, comprovante de residência, laudo médico atualizado (90 dias) com CID, prognóstico e tempo de tratamento, receituários dos últimos 6 meses, exames complementares, relatórios de internação, declaração escolar (se TEA/criança deficiente), caixas dos medicamentos em uso, equipamentos de apoio (cadeira, bengala, andador) e acompanhante (direito garantido para idoso 60+ e deficiente).' },
  { cat: 'pericia_medica', q: 'Por que minha perícia médica foi negada se eu tenho laudo grave?', a: 'Em 2026, as principais causas de indeferimento são: (1) laudo desatualizado (mais de 90 dias) ou sem CID e prognóstico, (2) ausência de histórico de tratamento longo, (3) minimizar a condição na entrevista ("estou melhor hoje"), (4) faltar declaração de impacto funcional, (5) não usar equipamentos de apoio, (6) não levar acompanhante quando o caso exige. Em recurso administrativo, 40% das negativas são revertidas com documentação reforçada.' },
  { cat: 'pericia_medica', q: 'Diferença entre perícia médica comum e avaliação biopsicossocial?', a: 'Perícia médica comum (auxílio-doença, aposentadoria por invalidez — Lei 8.213/91) avalia apenas o aspecto clínico. Avaliação biopsicossocial (BPC deficiente e aposentadoria da pessoa com deficiência — LC 142/2013) considera diagnóstico clínico + funcionalidade global + impacto social. Desde 02/03/2026, a Resolução CNJ 630/2025 obriga a Justiça a também usar avaliação biopsicossocial nos processos de BPC.' },

  /* PERÍCIA SOCIAL */
  { cat: 'pericia_social', q: 'O que é avaliação social do INSS e quem faz ela?', a: 'É uma entrevista estruturada conduzida por assistente social federal do INSS, prevista no art. 20, parágrafo 6 da Lei 8.742/93. Avalia a realidade socioeconômica do requerente e o IMPACTO da deficiência no dia a dia: rotina familiar, cuidadores, barreiras de mobilidade, gastos com saúde, acesso à educação/trabalho. Em 2026, é regida pelas Portarias 33/2025 (reavaliação) e 34/2025 (pedido inicial). Só existe para BPC deficiente e aposentadoria da pessoa com deficiência.' },
  { cat: 'pericia_social', q: 'A avaliação social pode ser feita em casa (visita domiciliar)?', a: 'Sim, mas é exceção. Em 2026 há 3 modalidades: (1) presencial em agência do INSS (regra geral), (2) por videoconferência em entidade parceira (regiões com poucos assistentes), (3) DOMICILIAR — para casos excepcionais comprovados, como pessoa acamada, com mobilidade muito reduzida ou impossibilidade de deslocamento atestada por laudo. A escolha não é do segurado — é decisão operacional do INSS.' },
  { cat: 'pericia_social', q: 'O que perguntam na avaliação social do BPC?', a: 'A assistente social pergunta sobre: composição familiar (todos que moram juntos, idade, parentesco), renda de cada morador (formal e informal), gastos fixos da casa (aluguel, conta de luz, medicamentos), quem cuida do requerente e quantas horas por dia, acesso a tratamento (SUS ou particular), barreiras de mobilidade na residência, acesso a escola/trabalho. Tudo é registrado em formulário padronizado.' },
  { cat: 'pericia_social', q: 'Avaliação social do CRAS é a mesma do INSS?', a: 'NÃO são a mesma coisa. A avaliação social do CRAS é uma triagem municipal opcional, anterior ao pedido (alguns municípios fazem para preparar a família). A do INSS é a OFICIAL — obrigatória DEPOIS do pedido, conduzida por assistente social federal, e é ela que tem peso na decisão de conceder ou negar o BPC. Passar bem no CRAS não garante deferimento no INSS.' },
  { cat: 'pericia_social', q: 'O que preparar para tirar de letra a avaliação social?', a: 'Reúna documentos de TODOS os moradores (RG, CPF, comprovantes de renda formal e informal — declare bicos!), CadÚnico atualizado (24 meses), comprovantes de gastos (medicamentos, fralda, transporte para tratamento, terapias), receituários e laudos que mostrem dependência, declaração escolar/AEE se for criança/adolescente, fotos da residência mostrando barreiras de acessibilidade. Descreva a rotina real: quem ajuda no banho, alimentação, locomoção. Honestidade pesa mais que tentar parecer pior.' },

  /* MUDANÇAS 2026 */
  { cat: 'mudancas', q: 'O que muda no BPC em 2026?', a: 'Pacote da Lei 15.077/2024 e Portarias 33/2025 e 34/2025: (1) valor subiu para R$ 1.621 mensais; (2) biometria obrigatória — novos pedidos até 30/04/2026, beneficiários atuais até 31/12/2026; (3) CadÚnico precisa ser atualizado no máximo a cada 24 meses; (4) pente fino cruza automaticamente CadÚnico, CNIS e movimentações Pix; (5) gastos com saúde podem ser abatidos da renda; (6) bolsas de estágio deixaram de contar; (7) teleperícia oficializada; (8) Justiça e INSS unificaram critérios biopsicossociais.' },
  { cat: 'mudancas', q: 'Biometria obrigatória — como atualizar?', a: 'Em 2026, todo beneficiário e novo requerente precisa ter biometria registrada em sistemas oficiais (TSE/Justiça Eleitoral, CIN/Carteira de Identidade Nacional, ou no próprio INSS). A forma mais simples é tirar a CIN nova com biometria no Detran/Posto de Identificação. Prazo: novos pedidos até 30/04/2026; quem já recebe tem até 31/12/2026. Sem biometria, o pagamento é bloqueado automaticamente.' },
  { cat: 'mudancas', q: 'Como funcionam os 3 prazos antes da cessação definitiva do BPC?', a: 'O INSS aplica 3 etapas: (1) BLOQUEIO temporário — 30 dias para regularizar; (2) SUSPENSÃO — mais 30 dias adicionais se ainda não regularizar; (3) CESSAÇÃO definitiva — corte do benefício após esgotados os 60 dias. Em qualquer ponto até a cessação ainda é possível regularizar. A perda definitiva acontece somente quando a pessoa ignora repetidamente as notificações.' },
  { cat: 'mudancas', q: 'Pix e movimentação bancária podem fazer o BPC ser cortado?', a: 'Em 2026, o cruzamento de dados é em tempo real. O sistema cruza CadÚnico + CNIS + Bacen + Receita Federal. Movimentações altas no Pix, recebimentos regulares de salário, conta poupança com saldo incompatível — tudo pode disparar alerta automático e levar a bloqueio. Não é proibido ter conta bancária, mas movimentações precisam ser COMPATÍVEIS com a renda declarada no CadÚnico. Recebimento de bicos? Declare no CadÚnico.' },
  { cat: 'mudancas', q: 'Posso pedir o BPC pela Justiça sem passar pelo INSS?', a: 'A regra é tentar primeiro a via administrativa (Meu INSS, gratuito). Se negado, cabe recurso ao CRPS em 30 dias. Esgotada a via administrativa, pode-se judicializar. Desde 02/03/2026, a Resolução CNJ 630/2025 unificou os critérios: a Justiça agora também aplica avaliação biopsicossocial similar à do INSS — não mais só análise médica como antes. Estatística histórica: 40% de êxito em recurso administrativo, 60-70% na esfera judicial.' },

  /* CADÚNICO E PROCESSO */
  { cat: 'cadunico', q: 'Quanto tempo leva para o INSS analisar o pedido de BPC?', a: 'Pela Lei 13.146/2015 e Lei 14.331/2022, o INSS tem até 90 dias para decidir após o requerimento + entrega de documentos. Na prática, BPC idoso costuma levar 30 a 60 dias. BPC deficiente demora mais (90 a 180 dias) porque depende de duas perícias. Atrasos acima de 90 dias podem ser denunciados via Ouvidoria do INSS, MPF, Defensoria Pública ou ação de mandado de segurança.' },
  { cat: 'cadunico', q: 'O INSS negou meu BPC. Como funciona o recurso?', a: 'Você tem 30 dias para entrar com RECURSO ADMINISTRATIVO no INSS (CRPS — Conselho de Recursos da Previdência Social). É gratuito e pode ser feito sozinho via Meu INSS ou com advogado. Se o recurso administrativo também for negado, cabe AÇÃO JUDICIAL na Justiça Federal. Cerca de 40% dos recursos administrativos são revertidos; na esfera judicial, taxa de êxito sobe para 60-70%.' },
  { cat: 'cadunico', q: 'Posso pedir o BPC sozinho no Meu INSS, sem advogado?', a: 'Sim. O requerimento de BPC é GRATUITO e pode ser feito por qualquer pessoa diretamente no aplicativo/site Meu INSS, ou ligando 135. Não precisa de advogado para o pedido inicial. Advogado se justifica em três momentos: (1) negativa do INSS, para recurso; (2) caso judicializado; (3) situações complexas (acumulação, pente fino, BPC trabalho, estrangeiro com documentação atípica).' },
  { cat: 'cadunico', q: 'Preciso fazer o CadÚnico ANTES de pedir o BPC?', a: 'Sim, obrigatoriamente. Desde 2016 (Decreto 8.805/2016 e reforçado pela Instrução Normativa SAGICAD/SNBA nº 1/2026) o cadastro no CadÚnico é PRÉ-REQUISITO para o BPC. Sem cadastro ativo, o INSS automaticamente nega. O cadastro é gratuito, feito no CRAS. A Instrução Normativa de 2026 desativou o Formulário de Impossibilidade — todos precisam estar efetivamente cadastrados.' },
  { cat: 'cadunico', q: 'Meu CadÚnico está desatualizado. O que pode acontecer?', a: 'Risco alto de cessação do BPC. O CadÚnico tem validade de 24 meses. Após esse prazo, ele entra em status DESATUALIZADO e o INSS pode suspender ou cessar o benefício automaticamente. Em 2026, com o cruzamento automático de dados, isso acontece mais rápido. Solução: vá ao CRAS imediatamente e atualize. Se já caiu, atualize e dê entrada em pedido de RESTABELECIMENTO no Meu INSS.' },
  { cat: 'cadunico', q: 'O BPC dá direito a Vale-Gás e Tarifa Social de Energia?', a: 'Sim. Como beneficiário do BPC inscrito no CadÚnico, você tem direito a: Tarifa Social de Energia Elétrica (desconto 10-65%), Vale-Gás bimestral, ID Jovem (deficiente até 29 anos), isenções municipais de transporte, isenção de IPVA em alguns estados se houver veículo adaptado. Não é automático — precisa requerer separadamente em cada órgão.' },
  { cat: 'cadunico', q: 'Qual o valor do BPC em 2026?', a: 'Um salário mínimo mensal: R$ 1.621,00 em 2026. O valor é reajustado anualmente acompanhando o salário mínimo (em 2026 o reajuste foi de 6,79% em relação a 2025). O BPC NÃO tem 13º salário (por ser benefício assistencial, não previdenciário). Atendemos online em todo o Brasil — consulte gratuitamente pelo WhatsApp.' },
];

const FAQ_CATS = [
  { v: 'all', l: 'Todas' },
  { v: 'mudancas', l: 'Mudanças 2026' },
  { v: 'idoso', l: 'BPC Idoso' },
  { v: 'deficiencia', l: 'BPC Deficiência' },
  { v: 'estrangeiro', l: 'BPC Estrangeiro' },
  { v: 'renda', l: 'Renda familiar' },
  { v: 'pericia_medica', l: 'Perícia médica' },
  { v: 'pericia_social', l: 'Perícia social' },
  { v: 'cadunico', l: 'CadÚnico & extras' },
];

function FAQ() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const INITIAL_LIMIT = 6;
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = norm(query.trim());
  const filtered = FAQ_ITEMS
    .filter(it => filter === 'all' || it.cat === filter)
    .filter(it => !q || norm(it.q).includes(q) || norm(it.a).includes(q));
  // Show all if searching, filtering, or user clicked "show more"
  const isFiltering = filter !== 'all' || q.length > 0;
  const showAll = isFiltering || expanded;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
  const hiddenCount = filtered.length - visible.length;
  // Reset expansion when filter or query changes
  useEffect(() => { setExpanded(false); }, [filter, query]);
  return (
    <section id="faq" className="bg-bone">
      <div className="container-narrow">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Perguntas frequentes</div>
          <h2>Tire suas <em>dúvidas</em>.</h2>
          <p style={{ color: 'var(--ink-500)', maxWidth: 640, margin: '12px auto 0', textAlign: 'center' }}>
            <strong>{FAQ_ITEMS.length} perguntas</strong> que mais aparecem no nosso WhatsApp — <strong>pesquise por palavra-chave</strong> ou <strong>filtre por tema</strong>. Atualizamos com base na lei vigente (LOAS, Lei 15.077/2024, Portarias 33 e 34/2025). Atendemos online em todo o Brasil.
          </p>
        </div>

        {/* SEARCH — destacado, magnético */}
        <div className="faq-search" role="search">
          <span className="faq-search-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise: autismo, perícia, biometria, refugiado, CadÚnico, 2026..."
            aria-label="Pesquisar nas perguntas frequentes"
          />
          {query && (
            <button className="faq-search-clear" onClick={() => setQuery('')} aria-label="Limpar pesquisa">×</button>
          )}
        </div>

        {/* FILTROS — chips com hover */}
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

        {/* Contador de resultados */}
        {isFiltering && filtered.length > 0 && (
          <div className="faq-result-count">
            Mostrando <strong>{filtered.length}</strong> {filtered.length === 1 ? 'resultado' : 'resultados'}
            {q && <> para <em>"{query}"</em></>}
          </div>
        )}

        <div className="faq">
          {filtered.length === 0 && (
            <div className="faq-empty">
              <div className="faq-empty-icon" aria-hidden="true">🔍</div>
              <h4>Nada encontrado para <em>"{query}"</em></h4>
              <p>Manda sua dúvida direto no WhatsApp — a gente responde em até 1h útil.</p>
              <a className="btn btn--primary" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">Perguntar no WhatsApp</a>
            </div>
          )}
          {visible.map((it, i) => (
            <details className="faq-item" key={`${filter}-${q}-${i}`}>
              <summary>
                <span className="faq-q">{it.q}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12" className="faq-toggle-v"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                </span>
              </summary>
              <div className="answer">{it.a}</div>
            </details>
          ))}
        </div>

        {/* Mostrar mais perguntas */}
        {!showAll && hiddenCount > 0 && (
          <div className="faq-expand">
            <button className="btn btn--secondary btn--lg faq-expand-btn" onClick={() => setExpanded(true)}>
              Ver mais {hiddenCount} {hiddenCount === 1 ? 'pergunta' : 'perguntas'} ↓
            </button>
            <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-500)' }}>
              Ou use a pesquisa acima para encontrar sua dúvida específica
            </p>
          </div>
        )}
        {showAll && filter === 'all' && q.length === 0 && filtered.length > INITIAL_LIMIT && (
          <div className="faq-expand">
            <button className="btn btn--ghost faq-expand-btn" onClick={() => { setExpanded(false); window.scrollTo({ top: document.getElementById('faq').offsetTop - 80, behavior: 'smooth' }); }}>
              ↑ Recolher
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 56 }}>
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
                  <label htmlFor="lead-para-quem">Para quem é o benefício?</label>
                  <select id="lead-para-quem" name="para-quem" aria-label="Para quem é o benefício?" required>
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
              <button type="submit" className="btn btn--lg btn--whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
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
              <img src="assets/logo-monograma-cc.png" alt="Portal do BPC" style={{ height: 84, width: 84, objectFit: 'contain', display: 'block' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, lineHeight: 1, color: 'var(--ink-900)' }}>Portal do</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, fontStyle: 'italic', lineHeight: 1, color: 'var(--terra-500)', marginTop: 4 }}>BPC<span style={{color:'var(--terra-300)'}}>.</span></div>
              </div>
            </div>
            <p className="footer-desc">Informação clara e atendimento humano sobre o Benefício de Prestação Continuada (BPC/LOAS).</p>
            <div className="footer-desc" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra-400, #d99466)', display: 'block', marginBottom: 10 }}>Faz parte do escritório</span>
              <a href="https://www.carloscostaprev.com.br" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src="assets/logo-monograma-cc.png" alt="CarlosCostaPrev" style={{ height: 52, width: 52, objectFit: 'contain', display: 'block', flex: 'none' }} />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f5ede0', fontWeight: 600, lineHeight: 1.2 }}>CarlosCostaPrev — Previdência geral <span aria-hidden="true">↗</span></span>
                </span>
                <span style={{ display: 'block', marginTop: 6, fontSize: 13, opacity: 0.7, paddingLeft: 64 }}>Aposentadorias, pensões, auxílios e BPC</span>
              </a>
            </div>
          </div>
          <div>
            <h5>Navegação</h5>
            <ul>
              <li><a href="#/">Início</a></li>
              <li><a href="#patologias">Patologias</a></li>
              <li><a href="#/pericias">Perícias</a></li>
              <li><a href="#/estrangeiro">Estrangeiro</a></li>
              <li><a href="#/simulador">Simulador</a></li>
              <li><a href="#/blog">Blog</a></li>
              <li><a href="#faq">Perguntas frequentes</a></li>
            </ul>
          </div>
          <div>
            <h5>Conteúdo</h5>
            <ul>
              <li><a href="/bpc-idoso">BPC para idoso</a></li>
              <li><a href="/bpc-deficiente">BPC para deficiente</a></li>
              <li><a href="/pericias">Perícia médica e social</a></li>
              <li><a href="/bpc-estrangeiro">BPC para estrangeiro</a></li>
              <li><a href="/blog/bpc-idoso-2026">Como dar entrada no BPC</a></li>
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
            <div className="footer-social">
              <a href="https://www.instagram.com/portaldobpc" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn social-btn--ig">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="social-btn-label">Instagram</span>
              </a>
              <a href="https://www.facebook.com/portaldobpc" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn social-btn--fb">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                <span className="social-btn-label">Facebook</span>
              </a>
              <a href="https://g.page/portaldobpc/review" target="_blank" rel="noreferrer" aria-label="Avaliar no Google" className="social-btn social-btn--gg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.6 7.6H22l-6.2 4.6 2.3 7.5L12 17.3 5.9 21.7l2.3-7.5L2 9.6h7.4z"/></svg>
                <span className="social-btn-label">Avaliar</span>
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
    <>
      <a className="wa-float" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <img src="assets/icon-whatsapp.svg" alt="" />
      </a>
      <div className="wa-sticky-bar">
        <a href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
          <img src="assets/icon-whatsapp.svg" alt="" />
          Falar no WhatsApp agora
        </a>
      </div>
    </>
  );
}

Object.assign(window, {
  Header, Hero, StatsStrip, Especialidades, PatologiasGrid, RecursosDestaque,
  SobrePortal, NossoEscritorio, Depoimentos, Blog, FAQ, ContactForm, CTABanner,
  Footer, WhatsAppFloat, PATOLOGIAS, CATEGORIAS,
});

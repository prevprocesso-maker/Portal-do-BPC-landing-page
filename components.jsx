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
    { id: 'simulador', label: 'Simulador' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'Perguntas', hash: '#faq' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#/" className="header-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src="assets/logo-mono-light.svg" alt="Portal do BPC" />
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
          <div className="eyebrow">WWW.PORTALDOBPC.COM.BR · SEU PORTAL AMIGO</div>
          <h1 className="display" style={{ marginBottom: 20 }}>
            O benefício que pode mudar a <em>vida</em> da sua família.
          </h1>
          <p className="lead" style={{ marginBottom: 32, maxWidth: 540 }}>
            O <strong>BPC/LOAS</strong> é um salário mínimo mensal pago pelo INSS a <strong>idosos a partir de 65 anos</strong> e <strong>pessoas com deficiência</strong> em situação de vulnerabilidade. Você não precisa ter contribuído pra receber.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn--primary btn--lg" href="https://wa.me/5521964238080" target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
            <button className="btn btn--secondary btn--lg" onClick={() => onNavigate('simulador')}>
              Simular meu caso →
            </button>
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 24, color: 'var(--ink-500)', fontSize: 15 }}>
            <span>✓ Análise gratuita</span>
            <span>✓ Sem compromisso</span>
            <span>✓ Resposta no mesmo dia</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src="assets/photo-hero-placeholder.svg" alt="Família acolhida pelo Portal do BPC" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats strip ---------- */
function StatsStrip() {
  const items = [
    { n: '20+', l: 'patologias e condições cobertas em detalhe' },
    { n: 'R$ 1.412', l: 'valor mensal do BPC em 2026' },
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
          <p>O BPC pode ser concedido para idosos ou para pessoas com deficiência. Veja qual situação se aplica ao seu caso.</p>
        </div>
        <div className="especialidades-grid">
          <div className="esp-card">
            <div className="kicker">BPC para Idoso</div>
            <h3>A partir dos 65 anos.</h3>
            <p className="desc">Não importa se nunca contribuiu para o INSS. O que conta é a idade, a renda da família e a situação de vulnerabilidade.</p>
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
            <p className="desc">Para quem tem impedimento de longa duração (mínimo 2 anos) que dificulta a participação plena na sociedade.</p>
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
          <p>Lista das principais doenças e condições que costumam configurar deficiência de longa duração. A análise é sempre individual.</p>
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

/* ---------- Sobre ---------- */
function SobrePortal() {
  return (
    <section>
      <div className="container sobre-grid">
        <div className="sobre-photo" style={{ background: 'var(--bone)', border: '1px solid var(--line)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="assets/illustration-acolhimento.svg" alt="" style={{ width: '80%', maxWidth: 360 }} />
          </div>
        </div>
        <div>
          <div className="eyebrow">Sobre o portal</div>
          <h2>Informação <em>clara</em> para uma decisão difícil.</h2>
          <p className="lead">O Portal do BPC nasceu pra desfazer um nó: o BPC é um direito complexo, mas quem mais precisa dele é justamente quem tem menos acesso à informação técnica.</p>
          <p style={{ color: 'var(--ink-500)' }}>
            Aqui você encontra explicações em linguagem simples, lista de doenças com critérios atualizados, simulador de elegibilidade e atendimento humano por WhatsApp. Sem juridiquês. Sem promessas que ninguém pode cumprir.
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
function FAQ() {
  const items = [
    { q: 'Quem pode receber o BPC?', a: 'Idosos a partir de 65 anos OU pessoas com deficiência de longa duração (mínimo 2 anos), em ambos os casos com renda familiar per capita de até ¼ do salário mínimo.' },
    { q: 'Preciso ter contribuído ao INSS?', a: 'Não. O BPC é um benefício assistencial — não exige contribuição prévia. É diferente da aposentadoria, que exige tempo de contribuição.' },
    { q: 'O INSS me negou. Ainda dá pra recorrer?', a: 'Sim. Cabe recurso administrativo em 30 dias e, em último caso, ação judicial. Muitas negativas são revertidas quando a documentação é reforçada.' },
    { q: 'Qual o valor do BPC em 2026?', a: 'Um salário mínimo mensal, ou seja, R$ 1.412,00 em 2026. O valor é reajustado anualmente.' },
    { q: 'O BPC dá 13º salário?', a: 'Não. Por ser um benefício assistencial (e não previdenciário), o BPC não tem 13º salário.' },
    { q: 'Como conta a renda da família?', a: 'Soma-se tudo que entra na casa por mês (salários, aposentadorias, bicos) e divide pelo número de pessoas que moram juntas. Esse valor precisa ser menor que ¼ do salário mínimo.' },
  ];
  return (
    <section id="faq" className="bg-bone">
      <div className="container-narrow">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Perguntas frequentes</div>
          <h2>Tire suas <em>dúvidas</em>.</h2>
        </div>
        <div className="faq">
          {items.map((it, i) => (
            <details className="faq-item" key={i} open={i === 0}>
              <summary>{it.q}</summary>
              <div className="answer">{it.a}</div>
            </details>
          ))}
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
                    <option>Para mim — BPC PcD (deficiência)</option>
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
            <h2>Pronto para garantir <em>o que é seu</em>?</h2>
            <p>Análise gratuita. Sem compromisso. Te respondemos no mesmo dia.</p>
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
        <div className="footer-grid">
          <div>
            <img src="assets/logo-mono-light.svg" alt="Portal do BPC" style={{ height: 50 }} />
            <p className="footer-desc">Informação clara e atendimento humano sobre o Benefício de Prestação Continuada (BPC/LOAS).</p>
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
              <li><a href="#">BPC para PcD</a></li>
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

        {/* Map */}
        <div style={{ marginTop: 8, marginBottom: 32, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <iframe
            src="https://www.google.com/maps?q=Pra%C3%A7a+Nossa+Senhora+da+Apresenta%C3%A7%C3%A3o,+223,+Iraj%C3%A1,+Rio+de+Janeiro,+RJ,+21231-230&output=embed"
            width="100%" height="260" style={{ border: 0, display: 'block', filter: 'grayscale(0.3) brightness(0.9)' }}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Mapa — Portal do BPC, Irajá/RJ">
          </iframe>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Portal do BPC. Todos os direitos reservados.</span>
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
  Header, Hero, StatsStrip, Especialidades, PatologiasGrid,
  SobrePortal, Depoimentos, Blog, FAQ, ContactForm, CTABanner,
  Footer, WhatsAppFloat, PATOLOGIAS, CATEGORIAS,
});

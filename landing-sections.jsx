/* ============================================================
   Portal do BPC — Landing Page Sections
   ============================================================ */

const { useState: useStateLS } = React;

/* ---------- Hero ---------- */
function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Portal do BPC</h1>
        <p>Seu guia completo para entender e solicitar o Benefício de Prestação Continuada.</p>
        <button onClick={() => onNavigate('patologia-list')} className="btn btn-primary">
          Explorar Patologias
        </button>
      </div>
    </section>
  );
}

/* ---------- StatsStrip ---------- */
function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="stat-item">
        <h3>25+</h3>
        <p>Patologias cobertas</p>
      </div>
      <div className="stat-item">
        <h3>99%</h3>
        <p>Informação atualizada</p>
      </div>
      <div className="stat-item">
        <h3>24/7</h3>
        <p>Acesso ao portal</p>
      </div>
    </section>
  );
}

/* ---------- Especialidades ---------- */
function Especialidades() {
  const patologias = ['Autismo (TEA)', 'Síndrome de Down', 'Câncer', 'Epilepsia', 'HIV/AIDS'];
  return (
    <section className="especialidades">
      <h2>Patologias Cobertas</h2>
      <div className="patologia-grid">
        {patologias.map(p => (
          <div key={p} className="patologia-card">{p}</div>
        ))}
      </div>
    </section>
  );
}

/* ---------- RecursosDestaque ---------- */
function RecursosDestaque({ onNavigate }) {
  return (
    <section className="recursos-destaque">
      <h2>Recursos Essenciais</h2>
      <div className="recursos-grid">
        <div className="recurso-card">
          <h3>Base Legal</h3>
          <p>Entenda as leis que garantem o BPC</p>
          <button onClick={() => onNavigate('legislacao')}>Saiba mais</button>
        </div>
        <div className="recurso-card">
          <h3>Documentação</h3>
          <p>Lista completa de documentos necessários</p>
          <button onClick={() => onNavigate('docs')}>Acessar</button>
        </div>
        <div className="recurso-card">
          <h3>Perícia Médica</h3>
          <p>Prepare-se para a perícia do INSS</p>
          <button onClick={() => onNavigate('pericia')}>Preparar</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Hero, StatsStrip, Especialidades, RecursosDestaque
});

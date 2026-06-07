const { useState, useEffect } = React;

function App() {
  const [screen, setScreen] = useState('home');
  const [patologia, setPatologia] = useState(null);

  // Initial route from hash (e.g. #/patologia/TEA)
  useEffect(() => {
    const h = window.location.hash;
    const m = h.match(/^#\/patologia\/(\w+)/);
    if (m) {
      const p = PATOLOGIAS.find(x => x.sigla === m[1]);
      if (p) { setPatologia(p); setScreen('patologia'); return; }
    }
    if (h === '#/simulador') setScreen('simulador');
    else if (h === '#/blog') setScreen('blog');
    else if (h === '#/pericias') setScreen('pericias');
    else if (h === '#/estrangeiro' || h === '#/bpc-estrangeiro') setScreen('estrangeiro');
  }, []);

  // Hashchange listener: tab bar e links externos navegam corretamente
  useEffect(() => {
    function handleHash() {
      const h = window.location.hash;
      if (h === '#/simulador') { setScreen('simulador'); }
      else if (h === '#/pericias') { setScreen('pericias'); }
      else if (h === '#/estrangeiro' || h === '#/bpc-estrangeiro') { setScreen('estrangeiro'); }
      else if (h === '#/blog') { setScreen('blog'); }
      else if (h === '#/' || h === '#/home') { setScreen('home'); }
    }
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll to top (sem animação suave) ao trocar de tela
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ''; });
  }, [screen]);

  // Dynamic <title> for SEO (also helps shareable links until SSR is in place)
  useEffect(() => {
    const base = 'Portal do BPC — BPC/LOAS para idoso e pessoa com deficiência';
    if (screen === 'patologia' && patologia) {
      document.title = `BPC para ${patologia.nome} — ${base}`;
    } else if (screen === 'simulador') {
      document.title = `Simulador BPC gratuito — ${base}`;
    } else if (screen === 'pericias') {
      document.title = `Perícia médica e social do BPC — checklist e orientações | Portal do BPC`;
    } else if (screen === 'estrangeiro') {
      document.title = `BPC para estrangeiro — imigrante, refugiado, naturalizado | Portal do BPC`;
    } else if (screen === 'blog') {
      document.title = `Blog — Conteúdo sobre BPC/LOAS | Portal do BPC`;
    } else {
      document.title = `${base} | Irajá/RJ`;
    }
  }, [screen, patologia]);

  const navigate = (s, payload) => {
    if (s === 'patologia') setPatologia(payload);
    setScreen(s);
    window.location.hash = '#/' + s;
  };
  window.__bpcNavigate = navigate;

  return (
    <>
      <Header active={screen === 'patologia' ? 'patologias' : screen} onNavigate={navigate} />
      <main>
        {screen === 'home' && <ScreenLanding onNavigate={navigate} />}
        {screen === 'patologia' && <ScreenPatologia patologia={patologia} onNavigate={navigate} />}
        {screen === 'simulador' && <ScreenSimulador onNavigate={navigate} />}
        {screen === 'pericias' && <ScreenPericias onNavigate={navigate} />}
        {screen === 'estrangeiro' && <ScreenEstrangeiro onNavigate={navigate} />}
        {screen === 'blog' && <ScreenBlog />}
        {screen === 'patologias' && <ScreenLanding onNavigate={navigate} />}
      </main>
      {screen !== 'home' && <Footer />}
      {screen === 'home' && <Footer />}
      <WhatsAppFloat />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

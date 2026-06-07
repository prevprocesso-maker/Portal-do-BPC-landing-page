/* ============================================================
   Portal do BPC — Patologia Detail Data & Component
   ============================================================ */

/* slug de patologia */
function patSlug(s){
  return String(s).toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}

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
  // ... mais patologias vêm aqui (SD, CA, AZ, EQ, PK, EL, PCx, AVC, CG, IR, EM, EP, TB, DV, DA, HV, HP, LE)
};

function PatologiaDetail({ codigo, onNavigate }) {
  const data = PATOLOGIA_DETAIL[codigo];
  if (!data) return <div>Patologia não encontrada</div>;

  return (
    <section className="patologia-detail">
      <h2>{codigo}</h2>
      <div className="detail-meta">
        <p><strong>Base Legal:</strong> {data.legalBase}</p>
        <p><strong>Idade Mínima:</strong> {data.minIdade}</p>
        <p><strong>Duração:</strong> {data.duracao}</p>
      </div>

      <div className="detail-section">
        <h3>O Que É?</h3>
        {data.o_que_e.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="detail-section">
        <h3>{data.legislacao.titulo}</h3>
        <p>{data.legislacao.texto}</p>
        <blockquote>{data.legislacao.destaque}</blockquote>
      </div>

      <div className="detail-section">
        <h3>Documentação Necessária</h3>
        <ul>
          {data.docs.map((d, i) => (
            <li key={i}>
              <strong>{d.tit}:</strong> {d.desc}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h3>Perícia Médica</h3>
        {data.pericia.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
      </div>

      <div className="detail-section">
        <h3>Erros Comuns</h3>
        <ul>
          {data.erros.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>

      <div className="detail-section">
        <h3>Recurso</h3>
        <p>{data.recurso}</p>
      </div>

      {data.relacionadas && (
        <div className="detail-section">
          <h3>Patologias Relacionadas</h3>
          <div className="relacionadas-grid">
            {data.relacionadas.map(rel => (
              <button
                key={rel}
                onClick={() => onNavigate('patologia', rel)}
                className="btn-link"
              >
                {rel}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, {
  PatologiaDetail, PATOLOGIA_DETAIL, patSlug
});

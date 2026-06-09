# Deploy — Melhorias Mobile Portal do BPC

## O que foi feito
Melhorias completas de responsividade mobile no Portal do BPC:
- Menu hambúrguer com gaveta lateral em todas as páginas
- Barra WhatsApp fixa no fundo do celular
- Layout e fotos corrigidos para mobile
- CSS responsivo aprimorado

## Arquivos para subir ao servidor (portaldobpc.com.br)

### Arquivos NOVOS (nunca existiram no servidor):
- `mobile-nav.js` — script do menu hambúrguer

### Arquivos ALTERADOS:
- `styles.css` — CSS mobile completo
- `index.html` — agora carrega Babel + JSX para melhorias React
- `components.jsx` — hambúrguer + barra WA no componente Header
- Todas as páginas HTML de patologia listadas abaixo

### Lista completa de HTMLs alterados:
amputacao.html, ansiedade-e-bpc.html, artrite-psoriasica.html, artrite-reumatoide.html,
artrose-avancada.html, atrofia-muscular-espinhal.html, autismo-tea.html, cancer.html,
cardiopatia-grave.html, como-conseguir-bpc.html, deficiencia-auditiva.html,
deficiencia-visual.html, deficit-intelectual.html, depressao-grave.html,
diabetes-complicacoes.html, distrofia-muscular.html, doenca-de-alzheimer.html,
doenca-de-charcot.html, doenca-de-huntington.html, doenca-de-parkinson.html,
doenca-de-wilson.html, dores-cronicas.html, dpoc-grave.html, ela.html,
epilepsia-refrataria.html, esclerodermia.html, esclerose-multipla.html,
esclerose-tuberosa.html, espinha-bifida.html, esquizofrenia.html, fenilcetonuria.html,
fibromialgia.html, fibrose-pulmonar.html, hanseniase-sequelas.html, hepatopatia-grave.html,
hernia-de-disco.html, hidrocefalia.html, hipertensao-e-bpc.html, hiv-aids.html,
insuficiencia-cardiaca-avancada.html, insuficiencia-renal.html, lesao-medular.html,
lombalgia-cronica.html, lupus-les.html, miastenia-grave.html, neurofibromatose.html,
osteoporose-grave.html, paralisia-cerebral.html, retinose-pigmentar.html,
sequelas-de-avc.html, sindrome-de-down.html, sindrome-de-rett.html,
sindrome-de-williams.html, sindrome-pos-covid.html, sindrome-tunel-carpo.html,
sindrome-x-fragil.html, tdah.html, transtorno-bipolar.html,
transtorno-de-personalidade-grave.html, varizes-e-bpc.html, vertigo-e-bpc.html

## Prompt para o Claude Code

```
Faça o deploy dos arquivos de melhorias mobile do Portal do BPC para o servidor.

Arquivos na pasta `deploy/` do repositório precisam ser publicados em portaldobpc.com.br.

Suba os seguintes arquivos (ordem importante):

1. PRIMEIRO — arquivos de suporte:
   - deploy/styles.css → raiz do site
   - deploy/mobile-nav.js → raiz do site (ARQUIVO NOVO)

2. DEPOIS — página principal:
   - deploy/index.html → raiz do site
   - deploy/components.jsx → raiz do site

3. POR ÚLTIMO — páginas de patologia (61 arquivos):
   Todos os .html listados acima → raiz do site

Confirme após o upload que mobile-nav.js está acessível em:
https://www.portaldobpc.com.br/mobile-nav.js
```

## Verificação pós-deploy
Abrir no celular (modo mobile real ou DevTools 375px):
- [ ] Header mostra 3 linhas (hambúrguer) em vez do menu completo
- [ ] Clicar no hambúrguer abre a gaveta lateral
- [ ] Barra verde do WhatsApp fixa na parte de baixo
- [ ] Páginas de patologia (ex: autismo-tea.html) também têm hambúrguer

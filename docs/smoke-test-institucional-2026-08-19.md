# Smoke test institucional — Portal do BPC

**URL local:** `http://127.0.0.1:4181/index.html?institutional=20260819b`  
**Data:** 19 de agosto de 2026

A homepage foi recarregada após o patch cirúrgico do `index.html`. O DOM renderizado confirmou:

| Verificação | Resultado |
|---|---|
| CNPJ visível | Aprovado — `15.648.800/0001-80` |
| Alexandre visível | Aprovado — `Alexandre Del Rio Furtado` |
| OAB visível | Aprovado — `OAB/RJ 270.465` |
| `taxID` no JSON-LD | Aprovado |
| Pessoa Alexandre no JSON-LD | Aprovado |
| `aggregateRating` no JSON-LD | Ausente, conforme correção de confiança |
| Footer React | Renderizado com Carlos Costa como Especialista Previdenciário e responsabilidade judicial separada |

O smoke test não submeteu formulário, não abriu WhatsApp e não executou operação externa. A validação estrutural posterior confirmou 81 páginas HTML, 77 páginas indexáveis, 77 URLs no sitemap e zero erros ou warnings.

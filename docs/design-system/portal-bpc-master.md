# Design system — Portal do BPC

**Status:** baseline visual e de acessibilidade, versão 2026-08-20.

## Direção

O Portal do BPC usa uma direção editorial institucional: fundo quente escuro, terracota como acento, Inter para interface e Lora para títulos. O objetivo é facilitar leitura, confiança e próxima ação, sem efeitos que concorram com o conteúdo previdenciário.

## Tokens principais

| Categoria | Tokens reais | Uso |
|---|---|---|
| Superfície | `--cream: #14100c`, `--bone: #1f1812`, `--bone-2: #2a2018` | Fundo, cards e estados elevados. |
| Terracota | `--terra-500: #c4673a`, `--terra-700: #a8542d`, `--terra-800: #813f22` | `terra-500` para acento; `terra-700`/`terra-800` para CTA com texto branco. |
| Texto | `--ink-900: #f5ede0`, `--ink-500: #b9a995` | Texto principal e secundário. `--ink-300` não deve ser usado para texto funcional normal. |
| Verde | `--wa: #075e54`, `--wa-dark: #054a43` | WhatsApp. O texto branco mantém contraste forte. |
| Foco | `--focus-ring: #f5c845` | Foco visível por teclado e entrada assistiva. |

## Escala tipográfica

A escala usa Inter local para interface e Lora local para títulos. O corpo normal é `1.125rem`, o texto pequeno recomendado é `1rem` e o texto mínimo funcional deve ser revisado antes de ficar abaixo de `0.875rem`. A linha deve permanecer entre `1.5` e `1.7` em parágrafos editoriais.

## Escala de espaçamento

A base é 4 px: `--space-1` 4 px, `--space-2` 8 px, `--space-3` 12 px, `--space-4` 16 px, `--space-6` 24 px, `--space-8` 32 px, `--space-12` 48 px, `--space-16` 64 px, `--space-24` 96 px e `--space-32` 128 px. Blocos de conteúdo devem ter mais respiro entre seções do que dentro de controles.

## Estados obrigatórios

| Componente | Estados mínimos |
|---|---|
| Link e navegação | Padrão, hover quando aplicável, `:focus-visible`, ativo, visitado quando relevante e indisponível quando houver. |
| Botão | Padrão, hover, foco, pressionado, desabilitado e carregando (`aria-busy`). |
| Formulário | Padrão, foco, preenchido, erro com `aria-invalid`, mensagem associada por `aria-describedby`, sucesso e carregando. |
| CTA WhatsApp | Contraste estável, foco visível, estado pressionado e aviso LGPD próximo quando houver coleta ou conversa orientada. |
| Movimento | Toda animação não essencial deve ser reduzida em `prefers-reduced-motion: reduce`. |

## Critérios de aceite

O texto normal deve ser validado com contraste de pelo menos 4,5:1; texto grande pode usar 3:1 quando se enquadrar na definição correspondente. Os alvos de ponteiro devem ter pelo menos 24 × 24 CSS pixels ou espaçamento equivalente. A página não pode criar overflow horizontal em 390 px, 412 px, 768 px, 1024 px ou 1440 px. Alterações visuais não podem remover headings, links, dados estruturados, avisos LGPD, dados institucionais ou a arquitetura estática.

## Regra para futuras alterações

Não trocar a paleta inteira para resolver um único contraste. Criar ou ajustar tokens semânticos de componente, validar o par real sobre o fundo renderizado e só então alterar o seletor global. Efeitos de glow, halo, blur e grid são decorativos: devem ser reduzidos quando competirem com texto, CTA, formulário ou conteúdo de patologia.

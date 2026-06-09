# Redesign de ícones sociais no footer

Aplique esta mudança ao projeto atual. Mantenha o resto do site intacto.

## Contexto
Footer tinha 3 ícones sociais sem vida (círculos cinzas iguais). Quero redesenhá-los com identidade de marca, animação no hover e expansão pra mostrar o nome.

## Objetivo final
3 botões pílula 44×44 px no estado padrão, expandem pra 130 px no hover mostrando o nome da rede, cada um com:
- Background gradiente da cor real da marca
- Sombra colorida combinando
- SVG cresce 5% no hover
- O botão sobe 3 px (translateY)

## Marcas e cores
| Marca | Gradient | Sombra hover |
|---|---|---|
| Instagram | `linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)` | `rgba(220, 39, 67, 0.45)` |
| Facebook | `linear-gradient(135deg, #1877f2 0%, #0a5dc9 100%)` | `rgba(24, 119, 242, 0.45)` |
| Google Review | `linear-gradient(135deg, #f5c845 0%, #d99466 50%, #c4673a 100%)` | `rgba(245, 200, 69, 0.4)` — texto escuro no hover |

## Markup JSX (substitua o bloco atual de ícones sociais)
```jsx
<div className="footer-social">
  <a href="https://www.instagram.com/SEU_HANDLE" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn social-btn--ig">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
    <span className="social-btn-label">Instagram</span>
  </a>
  <a href="https://www.facebook.com/SEU_HANDLE" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn social-btn--fb">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
    </svg>
    <span className="social-btn-label">Facebook</span>
  </a>
  <a href="https://g.page/SEU_HANDLE/review" target="_blank" rel="noreferrer" aria-label="Avaliar no Google" className="social-btn social-btn--gg">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.6 7.6H22l-6.2 4.6 2.3 7.5L12 17.3 5.9 21.7l2.3-7.5L2 9.6h7.4z"/>
    </svg>
    <span className="social-btn-label">Avaliar</span>
  </a>
</div>
```

> Troque `SEU_HANDLE` pelas URLs reais. Se as variantes de marca não forem essas 3, ajuste classes (`--ig`, `--fb`, `--gg`) e gradients.

## CSS — adicione ao stylesheet do projeto
```css
/* Footer social icons — brand-colored expand-on-hover */
.footer-social {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.social-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #f5ede0; /* substituir pela cor de texto clara do projeto */
  text-decoration: none;
  overflow: hidden;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
              width 320ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 280ms ease,
              border-color 280ms ease,
              background 320ms ease;
}

.social-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 320ms ease;
  pointer-events: none;
}

.social-btn svg {
  position: relative;
  z-index: 2;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.social-btn-label {
  position: relative;
  z-index: 2;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: opacity 200ms ease 100ms,
              width 320ms cubic-bezier(0.22, 1, 0.36, 1),
              margin-left 320ms ease;
  white-space: nowrap;
  color: #fff;
}

.social-btn:hover {
  width: 130px;
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  color: #fff;
}

.social-btn:hover::before { opacity: 1; }
.social-btn:hover svg  { transform: scale(1.05); }
.social-btn:hover .social-btn-label {
  opacity: 1;
  width: auto;
  margin-left: 10px;
}

/* Instagram — gradient brand */
.social-btn--ig::before {
  background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}
.social-btn--ig:hover {
  box-shadow: 0 12px 28px rgba(220, 39, 67, 0.45);
}

/* Facebook — brand blue */
.social-btn--fb::before {
  background: linear-gradient(135deg, #1877f2 0%, #0a5dc9 100%);
}
.social-btn--fb:hover {
  box-shadow: 0 12px 28px rgba(24, 119, 242, 0.45);
}

/* Google review — gold for stars (texto escuro no hover por contraste) */
.social-btn--gg::before {
  background: linear-gradient(135deg, #f5c845 0%, #d99466 50%, #c4673a 100%);
}
.social-btn--gg:hover {
  box-shadow: 0 12px 28px rgba(245, 200, 69, 0.4);
  color: #1a140e;
}

@media (max-width: 480px) {
  .social-btn { width: 42px; height: 42px; }
  .social-btn:hover { width: 110px; }
  .social-btn-label { font-size: 11px; }
}
```

## Checklist de implementação
1. Localize o bloco antigo de ícones sociais no footer e substitua pelo JSX acima.
2. Remova qualquer `style={...}` antigo ou objeto `socialBtn = {...}` que dava estilo inline aos ícones.
3. Adicione o CSS no stylesheet principal (depois do bloco de estilos do footer).
4. Atualize as URLs (`SEU_HANDLE`) para os handles reais do projeto.
5. Adapte a cor de texto base (`#f5ede0`) ao tema do site se for diferente.
6. Confirme acessibilidade: cada `<a>` deve ter `aria-label`.
7. Teste responsivo em ≤ 480 px — labels precisam ficar legíveis.

## Critério de aceite
- Estado padrão: 3 botões 44×44 px iguais e discretos
- Hover: expansão suave para ~130 px, gradient da marca aparece, sombra colorida, label entra
- Sem layout-shift quando o cursor entra/sai
- Acessível por teclado (Tab + Enter)

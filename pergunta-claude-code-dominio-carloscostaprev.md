# Pergunta pro Claude Code — domínio do CarlosCostaPrev

> Cole isto na conversa com o Claude Code que cuida do site `carloscostaprev.com.br`.

---

## Contexto

Acabei de configurar o Google Analytics 4 (GA4) com 2 propriedades separadas:

- **Portal do BPC** → ID `G-6RVLVTFRGT` → instalado no `www.portaldobpc.com.br` ✅ funcionando
- **CarlosCostaPrev** → ID `G-T7ZNB2FXZY` → você (Claude Code) instalou o snippet nas 14 páginas HTML do site CarlosCostaPrev

O GA4 da propriedade CarlosCostaPrev **está recebendo eventos** (vi atividade em tempo real durante o teste). Então o snippet está instalado e funcionando em algum lugar.

## Problema

Quando tento abrir o site público em **uma aba anônima** com a URL:

```
https://www.carloscostaprev.com.br
```

o Chrome retorna:

```
Não é possível acessar esse site
DNS_PROBE_FINISHED_NXDOMAIN
```

Ou seja: o domínio `carloscostaprev.com.br` **não tem registro DNS** — não existe publicamente.

## O que preciso saber de você (Claude Code)

Por favor me responda:

### 1. Onde está hospedado o site CarlosCostaPrev hoje?

Marque o que se aplica:

- [ ] Vercel — me passe a URL pública do projeto (ex: `algo-xyz.vercel.app`)
- [ ] GitHub Pages — me passe a URL (ex: `usuario.github.io/repo`)
- [ ] Netlify, Cloudflare Pages, Render, ou outro — qual e qual URL?
- [ ] Hospedagem tradicional (cPanel, KingHost, Hostinger) — qual?
- [ ] Só roda localmente (`localhost`) por enquanto
- [ ] Não está no ar em lugar nenhum — só repositório no GitHub

### 2. Qual é o domínio público correto?

- [ ] `www.carloscostaprev.com.br` (e o DNS ainda não foi apontado / não foi registrado)
- [ ] `www.carloscostaprev.com` (sem `.br`)
- [ ] Outro: ___________
- [ ] O domínio ainda não foi escolhido / comprado

### 3. Se você instalou o GA4 num ambiente, qual?

O snippet `G-T7ZNB2FXZY` está rodando agora em qual URL exatamente? (Foi nessa URL que você gerou os eventos de teste.)

### 4. Status do domínio `carloscostaprev.com.br`

- [ ] Está registrado no Registro.br (mas DNS não configurado)
- [ ] Não está registrado, precisa comprar
- [ ] Está registrado E apontado, mas pode estar com DNS pendente de propagação
- [ ] Não sei

### 5. Próximo passo recomendado

Baseado nas respostas acima, qual seria o próximo passo? Ex:
- "Registrar o domínio no Registro.br"
- "Apontar o DNS do Registro.br pra Vercel/GitHub/etc"
- "Trocar o domínio configurado no Vercel"
- "Comprar SSL"

---

Me responda com clareza, especialmente os itens 1, 2 e 3 — são os que vão me dizer se o site existe ou se ainda precisa ser publicado.

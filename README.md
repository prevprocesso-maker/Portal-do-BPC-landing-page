# 🚀 Deploy do Portal do BPC na Vercel

Esta pasta (`deploy/`) contém **tudo** que precisa ir pra Vercel. Caminho mais rápido até o site estar no ar em `www.portaldobpc.com.br`.

---

## ✅ Antes de começar (pré-requisitos)

- [ ] Conta no **GitHub** — https://github.com/signup (grátis)
- [ ] Conta na **Vercel** — https://vercel.com/signup (grátis, dá pra logar com GitHub)
- [ ] Conta no **Google Analytics 4** — https://analytics.google.com (grátis)
- [ ] Acesso ao **Registro.br** onde está o domínio portaldobpc.com.br
- [ ] Algum cliente de Git (Git Desktop, VSCode, ou linha de comando)

---

## 📋 Passo a passo

### 1️⃣ Pegar o Measurement ID do Google Analytics

1. Acessa https://analytics.google.com
2. Cria conta → propriedade → fluxo de dados pra "www.portaldobpc.com.br"
3. Copia o **Measurement ID** (formato `G-XXXXXXXXXX`)
4. Abre `deploy/index.html` e troca os 2 lugares onde tem `G-XXXXXXXXXX` pelo ID real

### 2️⃣ Subir pra GitHub

```bash
# Dentro da pasta deploy/
cd deploy/

# Iniciar repositório
git init
git add .
git commit -m "Portal do BPC — primeira versão"

# Criar repositório no GitHub (interface web): https://github.com/new
# Nome: portaldobpc
# Pode ser privado

# Conectar e enviar
git remote add origin https://github.com/SEU_USUARIO/portaldobpc.git
git branch -M main
git push -u origin main
```

> **Não sabe Git?** Usa o **GitHub Desktop** (https://desktop.github.com) — interface gráfica, arrasta-e-solta. Faz tudo isso clicando.

### 3️⃣ Conectar Vercel ao GitHub

1. https://vercel.com → "Add New Project"
2. Seleciona o repositório `portaldobpc`
3. Framework Preset: **Other**
4. Build Command: **(deixa em branco)**
5. Output Directory: **(deixa em branco)**
6. Install Command: **(deixa em branco)**
7. Clica em **Deploy**

Em ~30 segundos a Vercel te dá uma URL temporária tipo `portaldobpc-abc.vercel.app` — clica e confere que o site abre certo.

### 4️⃣ Apontar o domínio portaldobpc.com.br

No painel da Vercel:
1. Vai no projeto → **Settings** → **Domains**
2. Clica em "Add Domain"
3. Digita `www.portaldobpc.com.br` → Add
4. Digita também `portaldobpc.com.br` (sem www) — vai redirecionar pro www
5. Vercel mostra os **registros DNS** que você precisa configurar:

   ```
   Tipo     Nome    Valor
   ──────  ──────  ────────────────────────────
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

   **(use exatamente os valores que a Vercel mostrar — podem mudar)**

6. Vai no painel do **Registro.br**:
   - Login → Meus Domínios → portaldobpc.com.br → Editar DNS
   - Adiciona os 2 registros acima

7. **Espera de 10 minutos a 1 hora** pra DNS propagar. A Vercel detecta automaticamente.

8. Quando estiver pronto, a Vercel ativa HTTPS sozinha (Let's Encrypt) — não precisa fazer nada.

### 5️⃣ Verificar no Google Search Console

1. https://search.google.com/search-console
2. Adicionar propriedade → digita `https://www.portaldobpc.com.br`
3. Verificação por DNS — copia o código TXT que o Google mostra
4. Volta no Registro.br → adiciona registro TXT
5. No Google Search Console, clica em "Verificar"
6. Depois disso, vai em **Sitemaps** → cola `https://www.portaldobpc.com.br/sitemap.xml` → enviar

### 6️⃣ Cadastrar Google Meu Negócio

1. https://business.google.com → "Adicionar empresa"
2. Nome: **Portal do BPC**
3. Categoria: **Advogado** (ou "Serviços de assistência social")
4. Endereço: **Praça N.S. da Apresentação, 223 — Sala 206, Irajá, RJ, 21231-230**
5. Telefone: **(21) 96423-8080**
6. Site: **https://www.portaldobpc.com.br**

Vai chegar uma carta pelo Correios em 8-15 dias com código de verificação. Depois disso, o Portal aparece no Google Maps.

---

## 🔄 Atualizar o site depois

Toda vez que mudar algo:
```bash
cd deploy/
git add .
git commit -m "Mudança: descrição do que foi feito"
git push
```

Vercel detecta o push e atualiza o site sozinha em ~30 segundos.

---

## 📁 O que tem nesta pasta

```
deploy/
├── index.html              ← Página principal
├── privacidade.html        ← Política de Privacidade (LGPD)
├── termos.html             ← Termos de Uso
├── components.jsx          ← Componentes React do site
├── screens.jsx             ← Telas (patologias, simulador, blog)
├── styles.css              ← Estilos do site
├── colors_and_type.css     ← Cores e tipografia (paleta dark)
├── robots.txt              ← Permite indexação no Google
├── sitemap.xml             ← Lista de URLs pro Google
├── vercel.json             ← Config Vercel (rewrites privacidade/termos)
└── assets/                 ← Logos, ícones, OG cover, etc.
```

---

## ⚠️ Coisas pra fazer depois que estiver no ar

- [ ] Trocar `G-XXXXXXXXXX` no index.html pelo Measurement ID real do GA4
- [ ] Confirmar que aparece o banner de cookies LGPD na primeira visita
- [ ] Testar formulário de contato (preencher e ver mensagem de sucesso)
- [ ] Testar todos os links do menu e footer
- [ ] Compartilhar o link no WhatsApp pra ver se a OG cover aparece bonita
- [ ] Adicionar o site no **Bing Webmaster Tools** (5% do tráfego BR)

---

## 🆘 Travou em algum passo?

Manda mensagem que a gente resolve. Os pontos mais comuns:

| Problema | Solução |
|---|---|
| "Domain not configured" na Vercel | Esperar mais 1h pra DNS propagar |
| Site abre mas sem estilo | Verificar paths em `deploy/index.html` — devem ser relativos sem `../` |
| Google Analytics não conta visitas | Aceitou cookies na primeira visita? Tem ID correto? |
| Banner de cookies não fecha | Limpar localStorage do navegador e testar de novo |

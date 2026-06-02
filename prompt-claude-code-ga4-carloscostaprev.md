# Adicionar Google Analytics 4 (GA4) ao site CarlosCostaPrev

> **Para o Claude Code (ou quem mantém o site www.carloscostaprev.com.br):**
> Esta tarefa instala o Google Analytics 4 com banner de consentimento LGPD-compliant.
> Tempo estimado: 10-15 min. Tudo é independente do conteúdo existente — não toca em nada além de `<head>`, fim do `<body>` e dependências de um banner de cookies.

---

## Contexto

O ecossistema `CarlosCostaPrev` está usando GA4 com **2 propriedades separadas** embaixo da mesma conta:

| Site | Measurement ID | Status |
|---|---|---|
| `www.portaldobpc.com.br` | `G-6RVLVTFRGT` | Já instalado |
| `www.carloscostaprev.com.br` | **`G-T7ZNB2FXZY`** | **← Esta tarefa instala este aqui** |

**Conta GA4:** `CarlosCostaPrev` (logado em `prevprocesso@gmail.com`)

---

## O que precisa ser feito

### 1. Inserir o snippet GA4 dentro de `<head>` em **todas as páginas HTML do site**

> Se for SPA/SSG com layout único, basta no template/layout principal. Se for site multi-página com HTML separado por arquivo, replicar em cada um.

```html
<!-- ===== Analytics (Google Analytics 4) ===== -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T7ZNB2FXZY"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // anonymize_ip + sem cookies persistentes até consentimento (LGPD-compliant)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
  });
  gtag('config', 'G-T7ZNB2FXZY', { 'anonymize_ip': true });
</script>
```

**Posição recomendada:** o mais cedo possível dentro de `<head>`, logo após `<meta charset>` e antes dos `<link rel="stylesheet">`.

### 2. Garantir que existe banner LGPD de cookies

Se o site **já tem banner de cookies** (Cookiebot, OneTrust, banner próprio, etc), só garantir que ao clicar em "Aceitar" ele dispara `gtag('consent', 'update', { 'analytics_storage': 'granted' });`.

Se o site **não tem banner**, adicionar o banner abaixo (o mesmo padrão usado no Portal do BPC — copia/cola direto, ele já tem a integração com gtag):

```html
<!-- ===== LGPD Cookie Banner (cola antes de </body>) ===== -->
<div id="cookie-banner" style="display:none;position:fixed;bottom:20px;left:20px;right:20px;max-width:560px;margin:0 auto;background:#1f1812;border:1px solid #382a20;border-radius:16px;padding:20px 24px;z-index:9999;color:#f5ede0;font-family:system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
  <p style="margin:0 0 14px 0;font-size:15px;line-height:1.5;">
    Usamos cookies para entender como o site é usado e melhorar sua experiência.
    <a href="/privacidade" style="color:#d68559;">Saiba mais</a>.
  </p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <button id="cookie-accept" style="flex:1;min-width:120px;padding:10px 16px;border-radius:999px;border:none;background:#c4673a;color:#fff;font-weight:600;font-size:14px;cursor:pointer;">Aceitar</button>
    <button id="cookie-reject" style="flex:1;min-width:120px;padding:10px 16px;border-radius:999px;border:1px solid #382a20;background:transparent;color:#f5ede0;font-weight:600;font-size:14px;cursor:pointer;">Rejeitar</button>
  </div>
</div>

<script>
  (function() {
    const key = 'ccp_cookie_consent_v1';
    const saved = localStorage.getItem(key);
    const banner = document.getElementById('cookie-banner');
    function grant() {
      localStorage.setItem(key, 'granted');
      banner.style.display = 'none';
      if (window.gtag) gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    function deny() {
      localStorage.setItem(key, 'denied');
      banner.style.display = 'none';
    }
    if (!saved) banner.style.display = 'block';
    else if (saved === 'granted' && window.gtag) gtag('consent', 'update', { 'analytics_storage': 'granted' });
    document.getElementById('cookie-accept').onclick = grant;
    document.getElementById('cookie-reject').onclick = deny;
  })();
</script>
```

**Detalhe:** o key do localStorage é diferente do Portal do BPC (`ccp_cookie_consent_v1` vs `pdbpc_cookie_consent_v1`) — proposital pra cada site ter seu próprio consentimento.

### 3. Página de Política de Privacidade

O banner referencia `/privacidade`. Se essa página não existir no site, criar uma básica seguindo o modelo do Portal do BPC (LGPD-compliant: explica que coleta dados anonimizados via GA4, finalidade analítica, direitos do titular). Se for relevante, posso fornecer o conteúdo base.

---

## Critérios de aceitação

- [ ] Snippet GA4 com ID `G-T7ZNB2FXZY` em todas as páginas dentro de `<head>`
- [ ] Consent mode default = denied (não envia dados sem opt-in)
- [ ] `anonymize_ip: true` configurado
- [ ] Banner LGPD aparece na primeira visita, some após aceitar/rejeitar
- [ ] Banner persiste a escolha no localStorage (não reaparece toda vez)
- [ ] `gtag('consent', 'update')` é chamado quando usuário aceita
- [ ] Site continua funcionando normalmente após deploy
- [ ] Em `view-source:www.carloscostaprev.com.br` aparece `G-T7ZNB2FXZY` (não placeholder)

---

## Como verificar que funciona (depois do deploy)

1. Abre `https://www.carloscostaprev.com.br` numa **aba anônima**
2. Aceita os cookies no banner
3. Vai pra `https://analytics.google.com`
4. Topo: troca pra propriedade **CarlosCostaPrev**
5. Menu lateral → **Relatórios** → **Tempo real**
6. Em ~30-60s deve aparecer "1 usuário ativo"

Se der ruim:
- Confere se aceitou os cookies (sem consent, GA4 não envia nada — é o comportamento correto, mas parece quebrado)
- Confere no source da página se `G-T7ZNB2FXZY` aparece (e não placeholder)
- Testa sem bloqueador de anúncios (uBlock, AdBlock bloqueiam GA4)

---

## Não fazer

- ❌ Não usar o ID `G-6RVLVTFRGT` neste site (é do Portal do BPC, manteria os dados misturados)
- ❌ Não habilitar `ad_storage: 'granted'` por padrão (LGPD)
- ❌ Não instalar tag manager (GTM) se não houver necessidade — o snippet direto resolve
- ❌ Não enviar dados de identificação pessoal (e-mail, telefone, nome) como event parameters

---

## Referência — implementação no Portal do BPC

O Portal do BPC já tem este padrão funcionando, no arquivo `deploy/index.html` do projeto irmão. Se quiser ver a implementação completa de referência (incluindo o banner LGPD em produção), conferir lá — é o mesmo padrão que esta tarefa replica.

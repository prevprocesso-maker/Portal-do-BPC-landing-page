# Guia de deploy e verificação — Portal do BPC

## Estado verificado em 19/08/2026

A situação atual ainda é: `HEAD` local `d092f18`, `origin/main` remoto `5987797` e produção respondendo HTTP 200, porém com a versão anterior. Em produção foram encontrados 77 URLs no sitemap, 65 contendo `.html`, 28 perguntas no FAQPage e `GPTBot` com `Allow: /`.

## 1. Corrigir o HTTP 403 e publicar o commit

Execute no terminal com a conta proprietária do repositório:

```bash
cd /home/ubuntu/Portal-do-BPC-landing-page

gh auth status
gh auth logout -h github.com -u prevprocesso-maker
gh auth login -h github.com -p https -w
gh auth setup-git

git fetch origin
git push origin main
```

Depois confirme que o remoto recebeu o commit:

```bash
git rev-parse --short HEAD
git ls-remote origin refs/heads/main
```

A saída de `git ls-remote` deverá começar pelo mesmo commit local, atualmente `d092f18`, ou por um commit posterior.

Se ainda houver 403, confira a permissão da conta:

```bash
gh repo view prevprocesso-maker/Portal-do-BPC-landing-page --json nameWithOwner,viewerPermission
```

A propriedade `viewerPermission` precisa ser `WRITE`, `MAINTAIN` ou `ADMIN`. Se retornar `READ`, a conta deve ser adicionada pelo proprietário do repositório com permissão de escrita, ou a autenticação deve ser trocada para a conta correta.

## 2. Forçar deploy pela integração Git da Vercel

Depois que `git push origin main` funcionar, acesse o projeto na Vercel e abra **Deployments**. Localize o deployment associado ao commit `d092f18` e aguarde o status **Ready**. Se o projeto já estiver integrado ao GitHub, esse push normalmente cria o deployment automaticamente.

Para forçar um novo deployment pela interface, abra o menu do deployment e selecione **Redeploy**. Se a interface oferecer a opção de reutilizar o build cache, desative-a para executar uma compilação limpa.

Confirme também em **Project Settings → Git** que o projeto está conectado ao repositório correto e que a branch de produção é `main`. O diretório de publicação deve ser o diretório que contém `index.html`, `robots.txt` e `sitemap.xml`; não use `deploy/` se ele não estiver definido como Root Directory do projeto Vercel.

## 3. Forçar deploy pela linha de comando da Vercel

Execute na raiz correta do projeto:

```bash
cd /home/ubuntu/Portal-do-BPC-landing-page
npx vercel login
npx vercel link --yes
npx vercel --prod --yes
```

O comando `vercel link` deve apontar para o projeto Vercel já existente, não criar outro projeto com nome diferente. Se aparecer uma escolha de equipe ou projeto, selecione o projeto que atende `portaldobpc.com.br`.

Se a Vercel estiver configurada para publicar a pasta `deploy/`, primeiro confirme que essa pasta contém a versão atualizada de `index.html`, `robots.txt` e `sitemap.xml`. Caso contrário, publique a raiz do repositório, onde estão os arquivos atualizados.

## 4. Verificar Sitemap em Linux, Git Bash ou WSL

```bash
curl -LfsS https://www.portaldobpc.com.br/sitemap.xml > /tmp/sitemap.xml
curl -Lso /dev/null -w "%{http_code}\n" https://www.portaldobpc.com.br/sitemap.xml

grep -o '<loc>' /tmp/sitemap.xml | wc -l
grep -c '\.html' /tmp/sitemap.xml
grep -c 'urls-para-indexar' /tmp/sitemap.xml
```

Resultados esperados após o deploy:

```text
HTTP: 200
URLs: 77
URLs com .html: 0
urls-para-indexar: 0
```

## 5. Verificar Sitemap no Windows PowerShell

```powershell
$sitemap = (Invoke-WebRequest -Uri "https://www.portaldobpc.com.br/sitemap.xml" -UseBasicParsing).Content

[regex]::Matches($sitemap, '<loc>').Count
[regex]::Matches($sitemap, '\.html').Count
$sitemap -match 'urls-para-indexar'
```

Os resultados devem ser `77`, `0` e `False`, respectivamente.

## 6. Verificar robots.txt em Linux ou Git Bash

```bash
curl -LfsS https://www.portaldobpc.com.br/robots.txt > /tmp/robots.txt

grep -A1 -E '^User-agent: GPTBot' /tmp/robots.txt
grep -A1 -E '^User-agent: ClaudeBot' /tmp/robots.txt
grep -A1 -E '^User-agent: Google-Extended' /tmp/robots.txt
grep -A1 -E '^User-agent: OAI-SearchBot' /tmp/robots.txt
grep -A1 -E '^User-agent: PerplexityBot' /tmp/robots.txt
```

A política esperada é `Disallow: /` para `GPTBot`, `ClaudeBot` e `Google-Extended`; e `Allow: /` para `OAI-SearchBot` e `PerplexityBot`.

## 7. Verificar robots.txt no PowerShell

```powershell
$robots = (Invoke-WebRequest -Uri "https://www.portaldobpc.com.br/robots.txt" -UseBasicParsing).Content

$robots -match '(?ms)User-agent:\s*GPTBot\s+Disallow:\s*/'
$robots -match '(?ms)User-agent:\s*ClaudeBot\s+Disallow:\s*/'
$robots -match '(?ms)User-agent:\s*Google-Extended\s+Disallow:\s*/'
$robots -match '(?ms)User-agent:\s*OAI-SearchBot\s+Allow:\s*/'
$robots -match '(?ms)User-agent:\s*PerplexityBot\s+Allow:\s*/'
```

Todos os cinco comandos devem retornar `True`.

## 8. Validar FAQPage com 48 perguntas

### Linux, Git Bash ou WSL

```bash
curl -LfsS https://www.portaldobpc.com.br/ > /tmp/index.html

 grep -o 'FAQPage' /tmp/index.html | wc -l
grep -o '"@type"[[:space:]]*:[[:space:]]*"Question"' /tmp/index.html | wc -l
```

### PowerShell

```powershell
$html = (Invoke-WebRequest -Uri "https://www.portaldobpc.com.br/" -UseBasicParsing).Content

[regex]::Matches($html, 'FAQPage').Count
[regex]::Matches($html, '"@type"\s*:\s*"Question"').Count
```

Os resultados esperados são `1` bloco `FAQPage` e `48` objetos `Question`.

## 9. Validação semântica visual

Além da contagem local, valide a URL pública em [Google Rich Results Test](https://search.google.com/test/rich-results) e em [Schema Markup Validator](https://validator.schema.org/). Cole `https://www.portaldobpc.com.br/` e confirme que o JSON-LD é legível, que o tipo `FAQPage` está presente e que não existem erros de sintaxe.

A validação local continua disponível na raiz do projeto:

```bash
python3 /home/ubuntu/validate_portal_delivery.py
```

O resultado esperado é `errors: 0`, `warnings: 0`, `indexable_pages: 77` e `sitemap_urls: 77`.

# Deploy do Portal do BPC — o que subir e por quê

Publicar estas mudanças em **portaldobpc.com.br** (Vercel). Tudo já está pronto na pasta `deploy/`.

## Arquivos NOVOS (criar/commitar)
- `deploy/bpc-idoso/index.html` — página real BPC idoso (SEO + schema)
- `deploy/bpc-deficiente/index.html` — página real BPC deficiente
- `deploy/pericias/index.html` — página real Perícias
- `deploy/bpc-estrangeiro/index.html` — página real BPC estrangeiro
- `deploy/blog/nova-identidade/index.html` + `deploy/blog/nova-identidade/og.png` — artigo "nova identidade"

## Arquivos ALTERADOS
- `deploy/sitemap.xml` — enxugado: agora só URLs reais (200). Removidas as rotas de hash que davam 404.
- `deploy/blog/index.html` — card do artigo "nova identidade" na grade
- `deploy/components.jsx` — rodapé com links reais (`/bpc-idoso`, `/bpc-deficiente`, `/pericias`, `/bpc-estrangeiro`, `/blog/bpc-idoso-2026`) + monograma já aplicado

## Conferir no deploy
- `cleanUrls: true` no `vercel.json` faz `/bpc-idoso` servir `deploy/bpc-idoso/index.html` (sem rewrite extra). Validar que cada uma abre com **200**.
- `robots.txt` em produção deve ser o que está em `deploy/robots.txt` (Allow: / + Sitemap).

## Depois do deploy (Search Console — portaldobpc)
1. **Sitemaps** → reenviar `https://www.portaldobpc.com.br/sitemap.xml`.
2. **Inspeção de URL** → "Solicitar indexação" para:
   - `/bpc-idoso`, `/bpc-deficiente`, `/pericias`, `/bpc-estrangeiro`
   - `/blog/nova-identidade`
3. Nos motivos de "não indexada" (404), clicar em **"Validar correção"**.
4. Aguardar re-rastreamento (dias a 2-3 semanas). O número de não indexadas cai conforme o Google reprocessa as URLs antigas (que agora ou existem, ou saíram do sitemap).

## Próxima fase (separada)
Gerar no build as ~20 páginas de patologia + `/simulador` — ver `prompt-claude-code-paginas-patologias.md`.

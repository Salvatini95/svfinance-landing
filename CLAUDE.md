# CLAUDE.md — svfinance-landing
> Schema operacional sv-protocol v1.0. Regras transversais em `~/.claude/CLAUDE.md` global.
> Este arquivo cobre a landing page institucional do SV Finance.

---

## Projeto

- **Nome:** svfinance-landing
- **Descrição:** Landing page estática do ecossistema SV Finance.
  Vitrine de entrada para os dois produtos: SV App (SaaS self-service)
  e SV Soluções (implementação customizada).
- **sv-protocol:** v1.0
- **Repo:** github.com/Svfinance/svfinance-landing
- **Branch:** `main`

---

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sem framework)
- Sem build step — arquivos estáticos direto
- Deploy: Vercel (automático via push na main)
- Teste local: Live Server (VS Code extension) ou `open index.html`

---

## Topologia

| Ambiente | URL |
|---|---|
| Produção | `https://svfinance.com.br` e `https://www.svfinance.com.br` |
| Dev local | Live Server → `localhost:5500` ou abrir `index.html` direto |

**Deploy:** push na main → Vercel detecta → publica automaticamente (sem build).

---

## Estrutura

```
svfinance-landing/
  index.html            # página única
  css/
    style.css           # estilos principais
  js/
    main.js             # interatividade (toggle planos, scroll reveal, carrossel)
  img/
    guilherme.jpg       # foto fundador (⬜ pendente asset real)
    jackeline.jpg       # foto co-fundadora (⬜ pendente asset real)
    post-1.jpg          # posts Instagram (⬜ pendentes assets reais)
    post-2.jpg
    post-3.jpg
    post-4.jpg
    post-5.jpg
    post-6.jpg
```

---

## Seções da landing (estado atual)

| Seção | Status | Observação |
|---|---|---|
| Hero com logo spinning 360° Y-axis | ✅ | |
| Dashboard SVG inline | ✅ | Placeholder até screenshot real |
| Cards 3D parallax (Linear-inspired) | ✅ | |
| Seção "Para quem" | ✅ | MEIs, pequenas empresas, contadores |
| Tabela de planos com toggle mensal/anual | ✅ | Preços reais fundador |
| Seção fundadores | ✅ | Guilherme + Jackeline Afonso |
| Carrossel Instagram | ✅ | 6 posts `@svfinance_` (placeholders até imgs reais) |
| Responsividade | ✅ | 6 breakpoints: mobile XS → 4K |
| Fotos reais dos fundadores | ⬜ | Aguarda assets |
| Posts reais do Instagram | ⬜ | Aguarda assets |

---

## Posts Instagram no carrossel

IDs dos posts ativos:
```
DZNhKAnzkRq, DZIMOirxNgF, DZFnbUdlhZf
DY966sSz7xm, DYzr1folkAg, DYmtSa6RM35
```

Perfil: `@svfinance_` (Instagram e TikTok)

---

## Planos exibidos

| Plano | Mensal | Anual |
|---|---|---|
| Free Trial | R$0 · 7 dias | — |
| Pro Fundador | R$49/mês | R$39/mês (R$468/ano) |
| Business Fundador | R$99/mês | R$79/mês (R$948/ano) |

CTA principal → `https://app.svfinance.com.br`

---

## Fora do escopo deste repo

- Qualquer lógica de backend ou autenticação
- React, Vue ou qualquer framework JS
- Conexão com a API (`api.svfinance.com.br`)
- Build steps ou bundlers
- Conteúdo específico de implementações SV Soluções

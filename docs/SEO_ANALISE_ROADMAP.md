# SEO Retech Core — Análise e Roadmap

**Data:** 2026-10-05 · **Autor:** Alan Rezende (com Claude Code) · **Site:** https://core.theretech.com.br
**Implementação:** [API PR #2](https://github.com/alanrezendeee/retech-dados-brasileiros-api/pull/2) · [Admin PR #2](https://github.com/alanrezendeee/retech-dados-brasileiros-admin/pull/2)

Objetivo: colocar as páginas de **API de Artigos Penais** e **API de CEP** no topo do Google. Este documento registra o diagnóstico feito em 2026-10-05, o roadmap em três fases, e separa o que é tarefa manual (não-código) do que é código.

---

## 1. Diagnóstico

O site não aparecia em nenhuma busca do Google (`site:core.theretech.com.br` retornava zero páginas em 2026-10-05). Enquanto isso não muda, nenhuma otimização de página produz resultado. Os oito problemas abaixo estão em ordem de impacto.

| # | Problema | Evidência | Efeito no ranking |
|---|---|---|---|
| 1 | Site não indexado | `site:` sem resultados; não há `noindex`; só 1 backlink (theretech.com.br) | Nenhuma página concorre a nada |
| 2 | Sitemap com ~35 URLs em 404 | `/blog/*`, `/apis/cnpj`, `/apis/geografia`, `/docs`, `/geo/estados/*` não existiam; `lastModified` mudava a cada build | Google desconfia do sitemap e rastreia menos |
| 3 | `/ferramentas/penal` sem metadata | Título da home e `canonical` apontando para `https://core.theretech.com.br` | Google trata a página como cópia da home |
| 4 | Conteúdo invisível ao crawler | Páginas `use client`; respostas do FAQ fora do HTML (acordeão fechado); 250 a 630 palavras visíveis por página | Páginas finas para as keywords-alvo |
| 5 | Sem navegação interna | `/apis/penal` e `/apis/cep` tinham 2 links internos cada; sem header, footer ou breadcrumb | Autoridade não circula; páginas órfãs |
| 6 | Structured data genérico e arriscado | Mesmo JSON-LD `SoftwareApplication` em todas as páginas, com `aggregateRating 4.9/127` sem avaliações reais; sem `FAQPage` nem `BreadcrumbList` | Risco de ação manual por rich result enganoso; sem rich snippets |
| 7 | Detalhes técnicos | Títulos com sufixo duplicado; `og-image.png` e `og-api-penal.png` em 404; `llms.txt` desatualizado; `www` não resolve; docs Redoc 100% client-side | Previews quebrados, descoberta por IA prejudicada |
| 8 | Sem conteúdo de cauda longa | Nenhuma página por artigo penal, por CEP ou por cidade; blog prometido no sitemap não existia | Os 2.438 dispositivos e milhões de CEPs não geravam páginas rastreáveis |

## 2. Concorrência e keywords-alvo

Artigos penais é a aposta fácil: não existe concorrente de API no Google, só PDFs do Planalto, Jus e STJ. CEP é a aposta difícil: ViaCEP, BrasilAPI, AwesomeAPI, Cepify e CEP.rest já rankeiam com anos de backlinks e posts no TabNews.

| Keyword | Intenção | Quem rankeia hoje | Página nossa |
|---|---|---|---|
| api artigos penais / api código penal | dev jurídico | ninguém (PDFs, Justia, Jus) | `/apis/penal` |
| art 121 código penal pena, art 157 cp, artigo 33 lei de drogas | estudante, advogado, cidadão | Jusbrasil, Planalto, Jus | `/penal/artigo/[slug]` (864 páginas) |
| lista de crimes hediondos, artigos mais citados do código penal | pesquisa | portais jurídicos | `/blog` |
| consultar artigo penal online | ferramenta | portais jurídicos | `/ferramentas/penal` |
| api cep gratuita / api de cep | dev | ViaCEP, AwesomeAPI, Cepify, CEP.rest | `/apis/cep` |
| alternativa ao viacep, viacep fora do ar | dev | TabNews, GitHub issues | `/blog/alternativa-viacep` |
| cep 01001-000, cep da rua X, ceps de São Paulo | cidadão | Correios, sites de CEP | `/cep/consulta?cep=`, `/cep/[uf]/[cidade]` |
| consultar cep grátis | ferramenta | Correios, ViaCEP | `/ferramentas/consultar-cep` |

## 3. Roadmap

Três fases, cada uma destravando a próxima: sem indexação o conteúdo não conta; sem conteúdo os links não têm para onde apontar.

| Fase | Quando | Foco | Entregas | Gate para a próxima |
|---|---|---|---|---|
| 1 | Semana 1 | Destravar a indexação | Search Console + sitemap; sitemap sem 404; metadata e canonical certos; header, footer, breadcrumb; JSON-LD por página; OG images | Site indexado (3 a 14 dias após enviar o sitemap) |
| 2 | Semanas 2 a 4 | Conteúdo que rankeia | Landings penal e CEP reescritas; 864 páginas de artigo penal; páginas de CEP e cidade; blog com 7 posts; `llms.txt` e OpenAPI públicos | Páginas programáticas no ar e indexadas |
| 3 | Contínuo | Autoridade e links | Posts TabNews e dev.to; listas awesome, GitHub, SDKs; Product Hunt e comunidades; avaliações reais; 1 post novo por semana | — |

A Fase 1 é quase toda código e sai em um dia; o gate depende do Google. A Fase 2 é onde o ranking nasce: as 864 páginas de artigo penal usam os dados que já existem na API e atacam uma keyword sem concorrente; as páginas de CEP disputam com ViaCEP e só vencem com a Fase 3.

## 4. Tarefas manuais (não-código) — Alan

As cinco primeiras destravam a indexação e cabem em uma tarde.

**Semana 1**

- [ ] Google Search Console: adicionar a propriedade `core.theretech.com.br` (o token de verificação já está no `app/layout.tsx`), enviar `https://core.theretech.com.br/sitemap.xml` e usar "Inspecionar URL → Solicitar indexação" em `/`, `/apis/penal`, `/ferramentas/penal`, `/apis/cep`, `/ferramentas/consultar-cep`, `/ferramentas/buscar-cep`.
- [ ] Bing Webmaster Tools: importar a propriedade do Search Console e enviar o sitemap.
- [ ] DNS (Cloudflare): criar `www.core.theretech.com.br` como CNAME; o redirect 301 para o apex já está no `next.config.ts`.
- [ ] Railway (admin): criar uma API key dedicada ao site (tenant próprio, escopo `all`, sem rate limit baixo) e definir `SEO_API_KEY` nas variáveis do serviço (`BACKEND_URL` já existe). As páginas programáticas de artigo penal e CEP são renderizadas no servidor com essa chave; sem ela o site usa a chave demo nos endpoints `/public/*`, com rate limit por IP.
- [ ] Google Analytics 4: conferir que o cadastro (`/painel/register`) está marcado como conversão, para medir cadastros vindos de busca orgânica.

**Semanas 2 a 4**

- [ ] Publicar um post no TabNews apresentando a API de artigos penais (formato "criei uma API de…"), com link para `/apis/penal`.
- [ ] Publicar no TabNews e no dev.to um post sobre a API de CEP com fallback e cache, com benchmark contra ViaCEP e BrasilAPI.
- [ ] Abrir PR nas listas `awesome-brasil` / `public-apis` / `apis-brasileiras` no GitHub adicionando a Retech Core.
- [ ] Criar repositório público `theretech/retech-core-examples` com exemplos em Node, PHP e Python apontando para o site.

**Contínuo**

- [ ] Pedir avaliações reais a 5 a 10 tenants. Só depois disso o `aggregateRating` volta ao JSON-LD, com números verdadeiros.
- [ ] Lançamento no Product Hunt e postagem em comunidades (Discord/Telegram de devs BR, LinkedIn).
- [ ] Toda semana: no Search Console, ver quais queries já aparecem nas posições 5 a 20 e reforçar essas páginas (conteúdo e links internos).

## 5. Tarefas de código

Todos os 18 itens estão implementados (API PR #2 e Admin PR #2). Build local: 1.006 páginas pré-renderizadas; sitemap com 6.486 URLs (865 penal, 5.598 CEP, 8 blog, estáticas).

| # | Repo | Tarefa | Fase | Status |
|---|---|---|---|---|
| 1 | admin | `sitemap.ts` dinâmico: só URLs existentes, `lastModified` fixo por página, inclusão das páginas novas (artigos penais, cidades, blog) | 1 | Feito |
| 2 | admin | `layout.tsx` em `/ferramentas/penal` com title, description e canonical próprios | 1 | Feito |
| 3 | admin | Títulos sem sufixo duplicado (template do root + títulos absolutos nas páginas); canonical global removido do root | 1 | Feito |
| 4 | admin | Header e footer globais nas páginas públicas (`components/seo/public-shell.tsx`) | 1 | Feito |
| 5 | admin | Componente `Breadcrumb` com JSON-LD `BreadcrumbList` | 1 | Feito |
| 6 | admin | JSON-LD: removido `aggregateRating` fabricado; `Organization` + `WebSite` no root; `WebAPI`/`WebApplication` + `FAQPage` por landing | 1 | Feito |
| 7 | admin | Imagens Open Graph geradas por código (`lib/seo/og.tsx` + `opengraph-image.tsx` por rota, inclusive dinâmicas por artigo e post) | 1 | Feito |
| 8 | admin | `/apis/penal` e `/ferramentas/penal` reescritas como server components: FAQ visível no HTML, 1.400 a 2.900 palavras, H2 por intenção, exemplos de código, links internos | 2 | Feito |
| 9 | admin | `/apis/cep`, `/ferramentas/consultar-cep` e `/ferramentas/buscar-cep` com o mesmo tratamento | 2 | Feito |
| 10 | API | `GET /penal/arvore/{idUnico}`: caput + parágrafos, incisos e alíneas em uma chamada, com anterior/próximo | 2 | Feito |
| 11 | admin | Páginas programáticas `/penal/artigo/[slug]` (864, ISR diário) com texto oficial, pena, dispositivos, breadcrumb, JSON-LD `Legislation` | 2 | Feito |
| 12 | admin | Hub `/penal/artigos` por legislação (todos os 864 links no HTML) | 2 | Feito |
| 13 | admin | `/cep/consulta?cep=` server-rendered com `PostalAddress`, links para cidade/UF e CTA da API | 2 | Feito |
| 14 | admin | `/cep`, `/cep/[uf]` (27) e `/cep/[uf]/[cidade]` (5.570; 57 pré-renderizadas) via `GET /cep/cidade` e geografia | 2 | Feito |
| 15 | admin | Blog `/blog` + 7 posts com `BlogPosting` + FAQ | 2 | Feito |
| 16 | admin | `llms.txt` atualizado (Penal, limites reais, endpoints) | 2 | Feito |
| 17 | admin | `robots.txt` e redirect `www` → apex em `next.config.ts` | 1 | Feito |
| 18 | admin | `/docs` server-rendered e indexável (resumo + link para o Redoc) | 2 | Feito |

### Convenções para páginas públicas novas

- Server component dentro de `PublicShell`, com `Breadcrumb`, `Faq` (FAQ visível + `FAQPage`) e `JsonLd`.
- `layout.tsx` com `title` (sem sufixo "| Retech Core": o template do root adiciona), `description` de 150 a 160 caracteres e `alternates.canonical` exato. O root layout **não** define canonical.
- Dados server-side via `lib/seo/api.ts` (usa `SEO_API_KEY` + `BACKEND_URL`).
- Nunca `aggregateRating` sem avaliações reais.
- Toda página nova entra em `app/sitemap.ts` com `lastModified` fixo.
- OG: `opengraph-image.tsx` usando `lib/seo/og.tsx` (Satori exige `display: flex` em divs com mais de um filho).

## 6. Como medir

Meta de 90 dias: primeira página para "api artigos penais" e "api código penal" e top 10 para 50+ consultas de artigo ("art 157 cp" etc.); para CEP, top 20 de "api cep gratuita" e "alternativa viacep".

| Métrica | Onde ver | Mês 1 | Mês 2 | Mês 3 |
|---|---|---|---|---|
| Páginas indexadas | Search Console → Páginas | 20 | 900 | 1.500+ |
| Impressões orgânicas / semana | Search Console → Desempenho | 500 | 5.000 | 20.000 |
| Cliques orgânicos / semana | Search Console | 20 | 300 | 1.500 |
| Posição média "api artigos penais" | Search Console (filtro por consulta) | top 20 | top 5 | 1 a 3 |
| Cadastros vindos de orgânico | GA4 → Aquisição → Organic Search → conversão | 5 | 30 | 100 |
| Domínios de referência | Search Console → Links | 3 | 10 | 25 |

Revisão semanal: queries entre as posições 5 e 20 são as que respondem mais rápido a reforço de conteúdo e links internos.

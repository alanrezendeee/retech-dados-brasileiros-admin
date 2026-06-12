# Spec — Pricing v2 (Frontend)

## Fonte única

`lib/data/plans.ts` exporta:

- `FREE_DAILY_LIMIT = 100`
- `plans: PricingPlan[]` (free, starter, pro, business) — usados na grid
- `enterprisePlan` — renderizado como banner full-width abaixo da grid

## Componentes

### `components/pricing/PricingPlans.tsx`

- Grid 4 colunas (free/starter/pro/business) + banner Enterprise full-width
- `featured` → Starter (badge "Mais Popular")
- CTAs:
  - Free → `/painel/register`
  - Starter/Pro/Business/Enterprise → WhatsApp (`https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>?text=Olá! Tenho interesse no plano <nome> do RetechHub.`), nova aba
- ENV obrigatória: `NEXT_PUBLIC_WHATSAPP_NUMBER` (DDI+DDD, só dígitos — ex. `5511999999999`). Build falha se ausente (`lib/data/plans.ts` lança erro).

## Textos atualizados (1.000/dia → 100/dia)

- `app/page.tsx` (hero bullet + stat)
- `app/layout.tsx` (JSON-LD)
- `app/precos/page.tsx`, `app/precos/layout.tsx` (metadata com novos preços)
- `app/apis/cep/{page,layout}.tsx`, `app/apis/penal/page.tsx`
- `app/playground/page.tsx`, `app/contato/page.tsx`
- `app/ferramentas/{consultar-cep,penal,validar-cnpj}/page.tsx`
- `app/painel/register/{page,layout}.tsx`
- `app/legal/termos/page.tsx` (tabela de limites por plano)

NÃO alterados (refletem backend atual, follow-up): `app/admin/settings/page.tsx`, `components/tenants/tenant-drawer.tsx`.

## Backend (delegar ao repo da API depois)

- Default `requests/dia` do plano free: 1000 → 100
- Rate limit por minuto por plano: free 5, starter 30, pro 120, business 600
- Scope/flag para busca reversa CEP (`/cep/buscar`) bloqueada no free
- Grandfathering de tenants existentes (manter 1.000/dia por 60–90 dias)

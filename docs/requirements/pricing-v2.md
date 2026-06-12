# Pricing v2 — Reestruturação de Planos

## Contexto

Free atual (1.000 req/dia ≈ 30k/mês) é mais generoso que qualquer concorrente pago de CNPJ:

- CNPJá: free 50 créditos/mês (cache 45 dias); pagos desde ~R$ 20
- ReceitaWS: free 3 req/min sem QSA/Simples; comercial desde ~R$ 149/mês
- CNPJ.ws: API pública 3 req/min
- Infosimples / API Full: sem free real (pay-per-use / pré-pago)
- ViaCEP / BrasilAPI: CEP grátis ilimitado → CEP é commodity, não monetiza

Consequência: free canibaliza os planos pagos; CNPJ (nosso ativo monetizável) sai de graça em volume. Além disso, Pro/Business estavam com botão "Em Breve" — não existia caminho de compra.

## Objetivo

Forçar conversão para pago sem matar aquisição:

1. Free vira plano de desenvolvimento/teste (100 req/dia), não de produção
2. Criar degrau barato (Starter R$ 29) — equivale ao free antigo, agora cobrado
3. Diferenciar por recurso (busca reversa CEP e APIs novas só em pagos), não só volume
4. Enterprise sob medida mantido (banner dedicado)
5. CTAs pagos capturam intenção via e-mail até checkout self-service existir

## Grade aprovada

| Plano | Preço | Req/dia | Req/min | Keys | Diferenciais |
|---|---|---|---|---|---|
| Free | R$ 0 | 100 | 5 | 1 | APIs principais, dashboard, docs |
| Starter | R$ 29/mês | 1.000 | 30 | 2 | + busca reversa CEP, novas APIs ao lançar, suporte email |
| Pro | R$ 79/mês | 10.000 | 120 | 5 | + acesso antecipado a APIs novas, suporte prioritário |
| Business | R$ 199/mês | 100.000 | 600 | ilimitadas | + WhatsApp, SLA 99,5% |
| Enterprise | sob medida | custom | custom | custom | infra dedicada, IP whitelist, SLA 99,9%, 24/7 |

Plano destaque ("Mais Popular"): **Starter** — é o degrau de conversão.

## Fora de escopo (follow-ups)

- Checkout self-service (Stripe/Pagar.me)
- Enforcement no backend (limite default ainda é 1.000/dia — ajustar para 100 + rate por minuto por plano)
- Grandfathering: contas existentes mantêm 1.000/dia por 60–90 dias com aviso
- Notificações de 80% de cota + e-mail de upsell
- Plano anual com desconto (2 meses grátis)

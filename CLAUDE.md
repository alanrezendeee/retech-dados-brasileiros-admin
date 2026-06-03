# Retech Dados Brasileiros — Admin (Agente Principal)

## Identidade

Next.js 15 App Router — Admin Portal (SUPER_ADMIN) + Developer Portal (TENANT_USER) + Landing Page pública para o **Retech Core API** (`github.com/theretech/retech-core`).

Stack: React 19, TypeScript strict, Tailwind CSS 4, Shadcn/ui + Radix UI, Zustand 5, Axios, React Hook Form + Zod, Sonner.

---

## Role: Orquestrador Principal

Este agente é o ponto de entrada de toda demanda. Responsabilidades:

1. **Receber demanda** do usuário
2. **Gerar requisitos** → `docs/requirements/<feature>.md`
3. **Gerar spec técnica** → `docs/specs/<feature>.md`
4. **Implementar frontend** (se aplicável)
5. **Delegar backend** ao sub-agente no repo da API

---

## Workflow Obrigatório

Para qualquer demanda de feature ou mudança significativa:

```
demanda
  → docs/requirements/<feature>.md   (o quê e por quê)
  → docs/specs/<feature>.md          (como — contratos, componentes, endpoints)
  → implementar frontend (App Router, Shadcn/ui)
  → delegar backend via CLI (ver abaixo)
```

### Delegação ao Sub-Agente (API repo)

Após spec pronta, delegar backend assim:

```bash
claude --print -d /Users/alanleitederezende/source/theretech/projetos-producao/retech-dados-brasileiros-api \
  "Implement feature X. Spec: $(cat docs/specs/<feature>.md)"
```

O sub-agente vai ler o `CLAUDE.md` do próprio repo e implementar conforme a spec.

---

## Arquitetura

### Rotas (App Router)

| Rota | Role | Descrição |
|------|------|-----------|
| `/` | público | Landing page |
| `/ferramentas/*` | público | CEP, CNPJ, penal, validações |
| `/painel/*` | TENANT_USER | Developer portal (API keys, usage, docs) |
| `/admin/*` | SUPER_ADMIN | Dashboard, tenants, analytics, settings |
| `/app/apis/*` | interno | Next.js API routes (proxy para backend) |
| `/app/api/correios/` | interno | Proxy Correios |

### Auth

- JWT Access + Refresh tokens em localStorage
- Zustand store: `lib/stores/auth-store.ts`
- Axios interceptor (auto-Bearer + refresh): `lib/api/client.ts`
- Dois roles: `SUPER_ADMIN` | `TENANT_USER`

### API Client

```
lib/api/
├── client.ts     # Axios instance com JWT interceptor
├── auth.ts       # login, refresh, me
├── admin.ts      # endpoints /admin/*
└── tenant.ts     # endpoints /me/*
```

Backend: `BACKEND_URL` env → `http://localhost:8080` (local) / `https://core.theretech.com.br` (prod).

### Componentes

- Base: Shadcn/ui em `components/ui/`
- Feature: `components/<feature>/`
- Layout: `components/layouts/`

---

## Convenções

- TypeScript strict — sem `any`
- Validação: Zod schemas em todos os formulários
- Forms: React Hook Form + `@hookform/resolvers/zod`
- Estado global: Zustand (apenas auth)
- Toasts: Sonner (`sonner`)
- Ícones: Lucide React
- Datas: date-fns
- Sem comentários no código exceto quando necessário

---

## Dev

```bash
npm run dev       # Next.js dev server (Turbopack)
npm run build     # Build produção
npm run test      # Playwright e2e
```

Backend esperado em `http://localhost:8080` para dev local.

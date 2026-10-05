# retech-core-admin — Admin & Developer Portal

Frontend React (Next.js 14) para gerenciamento do RetechHub API.

**Domínio**: `core.theretech.com.br`

---

## 🎯 Sobre

Interface web moderna para:
- **Admin Dashboard** (`/admin/*`) - Super administradores gerenciam todo o sistema
- **Developer Portal** (`/painel/*`) - Desenvolvedores gerenciam suas API Keys

---

## 🏗️ Arquitetura

```
core.theretech.com.br
├─ /              → Landing page pública
├─ /admin/*       → Admin Dashboard (SUPER_ADMIN)
├─ /painel/*      → Developer Portal (TENANT_USER)
└─ /api/*         → Proxy → Backend Go (retech-core:8080)
```

### Rewrites (Next.js)

O Next.js atua como proxy para o backend Go:

```typescript
// next.config.ts
rewrites: [
  {
    source: '/api/:path*',
    destination: 'http://retech-core:8080/:path*'
  }
]
```

---

## 🚀 Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **UI**: Shadcn/ui + Tailwind CSS
- **Forms**: React Hook Form + Zod
- **State**: Zustand (auth global)
- **HTTP**: Axios (com interceptors JWT)
- **Icons**: Lucide React (via Shadcn)
- **TypeScript**: Strict mode

---

## 📦 Estrutura de Pastas

```
retech-core-admin/
├── app/
│   ├── admin/               # Admin dashboard
│   │   ├── login/          
│   │   ├── dashboard/      
│   │   ├── tenants/        
│   │   ├── apikeys/        
│   │   └── analytics/      
│   │
│   ├── painel/             # Developer portal
│   │   ├── login/          
│   │   ├── register/       
│   │   ├── dashboard/      
│   │   ├── apikeys/        
│   │   ├── usage/          
│   │   └── docs/           
│   │
│   └── page.tsx            # Landing page
│
├── components/
│   ├── ui/                 # Shadcn components
│   ├── layouts/            # Layouts (admin, painel)
│   └── auth/               # Auth components
│
├── lib/
│   ├── api/                # API clients
│   │   ├── client.ts       # Axios config
│   │   ├── auth.ts         # Auth endpoints
│   │   └── ...
│   ├── stores/             # Zustand stores
│   │   └── auth-store.ts   
│   └── utils.ts            # Utilities
│
└── next.config.ts          # Next.js config (rewrites)
```

---

## 🔧 Setup Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp env.example .env.local
```

Edite `.env.local`:

```bash
# Backend local
BACKEND_URL=http://localhost:8080

# Public API (proxy)
NEXT_PUBLIC_API_URL=/api

# App
NEXT_PUBLIC_APP_NAME=RetechHub
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse:
- Landing: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- Painel: http://localhost:3000/painel/login

### 4. Backend (retech-core)

Certifique-se que o backend Go está rodando:

```bash
cd ../retech-core
go run cmd/api/main.go
```

---

## 🎨 Páginas Implementadas

### Landing Page (`/`)
- ✅ Hero section com CTA
- ✅ Features da API
- ✅ Pricing (Free, Pro, Business)
- ✅ Footer completo

### Admin (`/admin/*`)
- ✅ Login (apenas SUPER_ADMIN)
- ✅ Dashboard com KPIs
- ✅ Layout com sidebar
- 🚧 Gerenciar Tenants
- 🚧 Gerenciar API Keys
- 🚧 Analytics

### Painel (`/painel/*`)
- ✅ Login (TENANT_USER)
- ✅ Registro self-service
- ✅ Dashboard com uso
- ✅ Plano atual e limites
- 🚧 Gerenciar minhas API Keys
- 🚧 Ver meu uso
- 🚧 Documentação

---

## 🔐 Autenticação

### JWT Flow

1. **Login** → POST /api/auth/login
2. **Recebe** → accessToken + refreshToken
3. **Armazena** → localStorage + Zustand
4. **Usa** → Header Authorization: Bearer {token}
5. **Refresh** → Automático via interceptor quando 401

### Auth Store (Zustand)

```typescript
const { user, isAuthenticated, setAuth, logout } = useAuthStore();
```

### Axios Interceptor

- Adiciona automaticamente Bearer token
- Auto-refresh quando token expira
- Redirect para login quando falha

---

## 🎨 Design System

### Cores

- **Admin**: Blue/Purple (profissional, enterprise)
- **Painel**: Indigo/Purple (moderno, developer-friendly)

### Componentes Shadcn/ui

Instalados:
- Button, Card, Input, Label
- Form, Table, Badge, Avatar
- Dropdown Menu, Separator

Para adicionar mais:
```bash
npx shadcn@latest add <component>
```

---

## 🚀 Deploy no Railway

### 1. Configurar variáveis

```bash
BACKEND_URL=http://retech-core:8080
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_APP_URL=https://core.theretech.com.br
```

### 2. Deploy

```bash
# Railway detecta Next.js automaticamente
git push origin main
```

### 3. Configurar domínio

No Railway:
1. Settings → Domains
2. Custom Domain → `core.theretech.com.br`
3. Configurar DNS (A ou CNAME)

---

## 📚 Próximas Implementações

### FASE 2: Admin Dashboard (em andamento)
- [ ] Lista de tenants (tabela completa)
- [ ] Detalhes do tenant
- [ ] Criar/editar tenant
- [ ] Ativar/desativar tenant
- [ ] Lista de API Keys (global)
- [ ] Criar/revogar keys
- [ ] Analytics global

### FASE 3: Developer Portal (em andamento)
- [ ] Gerenciar minhas API Keys
- [ ] Ver meu uso (gráficos)
- [ ] Histórico de requests
- [ ] Documentação interativa
- [ ] Configurações de perfil

### FASE 4: Features Avançadas
- [ ] Gráficos com Recharts
- [ ] Logs em tempo real
- [ ] Exportar relatórios
- [ ] Webhooks
- [ ] Dark mode
- [ ] Mobile responsive

---

## 🧪 Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint
```

---

## 📖 Documentação

- [ROADMAP.md](../retech-core/ROADMAP.md) - Planejamento completo
- [Backend README](../retech-core/README.md) - API documentation

---

## 🤝 Contribuindo

Este é um projeto interno da The Retech.

---

**Versão**: 0.1.0 (Alpha)  
**Status**: 🟡 Em desenvolvimento ativo  
**Última atualização**: 2025-10-20

import Link from 'next/link';
import LandingNavbar from '@/components/landing/navbar';
import LandingFooter from '@/components/landing/footer';
import ScrollToTop from '@/components/landing/scroll-to-top';
import PricingPlans from '@/components/pricing/PricingPlans';
import { apiCatalog, totalApis, liveApis, apiProgressPct } from '@/lib/data/apis';

/* ─── Dados estáticos ─── */
const marqueeItems = [
  'Consulta de CEP',
  'Validação de CNPJ',
  'Dados IBGE',
  'Artigos Penais',
  'Busca Reversa de CEP',
  'Validação de CPF',
  'Tabela FIPE',
  'Cotação de Moedas',
  'Feriados Nacionais',
  'Bancos Brasileiros',
  'Rastreamento Correios',
  'SELIC / CDI / IPCA',
  'Operadora de Telefone',
  'Dados Judiciais',
  'Transparência Pública',
];

const differentials = [
  {
    icon: '⚡',
    title: 'Performance Otimizada',
    body: 'Respostas em ~160ms com cache Redis em 3 camadas e fallback automático entre múltiplas fontes de dados públicos.',
  },
  {
    icon: '🎯',
    title: 'Tudo em um Só Lugar',
    body: 'Não perca tempo integrando 5+ APIs diferentes. CEP, CNPJ, CPF, Geografia, Dados Jurídicos — tudo unificado.',
  },
  {
    icon: '🔒',
    title: 'Segurança Enterprise',
    body: 'API Keys + Rate Limiting + Logs de auditoria. Tudo que você espera de uma API profissional, sem burocracia.',
  },
  {
    icon: '📊',
    title: 'Dashboard Inteligente',
    body: 'Monitore seu uso em tempo real. Veja quais endpoints você mais usa e gerencie suas API keys facilmente.',
  },
  {
    icon: '🔄',
    title: 'Alta Disponibilidade',
    body: 'Fallback automático entre 3 fontes de dados garante que você nunca fique sem resposta, mesmo em falhas externas.',
  },
  {
    icon: '📚',
    title: 'Docs & SDK Prontos',
    body: 'Documentação OpenAPI 3.0 completa, exemplos em Node.js, Python e cURL. Integração em menos de 10 minutos.',
  },
];

const techStack = [
  {
    name: 'Go (Golang)',
    desc: 'Backend ultra-rápido',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    invert: false,
  },
  {
    name: 'PostgreSQL',
    desc: 'Banco de CEPs próprio',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    invert: false,
  },
  {
    name: 'MongoDB',
    desc: 'Banco NoSQL escalável',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    invert: false,
  },
  {
    name: 'Redis',
    desc: 'Cache de alta perf.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    invert: false,
  },
  {
    name: 'Railway',
    desc: 'Deploy automatizado',
    icon: 'https://railway.app/brand/logo-light.svg',
    invert: false,
  },
  {
    name: 'AWS',
    desc: 'Infraestrutura cloud',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    invert: false,
    tint: 'brightness(0) invert(1)',
  },
  {
    name: 'TorreServer',
    desc: 'Infraestrutura dedicada',
    icon: '/logo-torreserver.svg',
    invert: false,
  },
  {
    name: 'Next.js',
    desc: 'Frontend moderno',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    invert: true,
  },
];

const apis = apiCatalog;

const statusBadge = (s: string) => {
  if (s === 'live')
    return (
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
      >
        Disponível
      </span>
    );
  if (s === 'soon')
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
        Em breve
      </span>
    );
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10">
      Futuro
    </span>
  );
};

export default function HomePage() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      <LandingNavbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,230,118,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center w-full">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#00e676' }}
            >
              API · DADOS · BRASIL
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            O hub definitivo de{' '}
            <br className="hidden sm:block" />
            <span style={{ color: '#00e676' }}>dados públicos brasileiros.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Uma única integração. {totalApis} APIs essenciais. Respostas em ~160ms com
            cache inteligente e fallback automático.
          </p>

          {/* Bullet list */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/60 mb-12">
            {[
              'CEP, CNPJ, CPF e muito mais',
              'Fallback entre 3 fontes de dados',
              '1.000 requests/dia grátis',
              'Sem cartão de crédito',
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span style={{ color: '#00e676' }}>✓</span> {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              href="/painel/register"
              className="inline-block text-base font-bold px-8 py-3.5 rounded-xl transition-all"
              style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
            >
              Começar Grátis
            </Link>
            <Link
              href="/#apis"
              className="inline-block text-base font-semibold px-8 py-3.5 rounded-xl border transition-all text-white/70 hover:text-white hover:border-white/30"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              Ver APIs disponíveis
            </Link>
          </div>

          {/* Stats */}
          <div
            className="inline-flex flex-wrap justify-center gap-6 px-8 py-4 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            {[
              { value: String(totalApis), label: 'APIs Planejadas' },
              { value: '~160ms', label: 'Tempo Médio' },
              { value: '1.000/dia', label: 'Requests Grátis' },
              { value: 'R$ 0', label: 'Sem cartão' },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div
                  className="text-2xl font-black"
                  style={{ color: '#00e676' }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTE AGORA ── */}
      <section className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              DISPONÍVEL AGORA
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Comece a usar{' '}
              <span style={{ color: '#00e676' }}>imediatamente.</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Teste nossas APIs gratuitamente, sem cadastro. Veja funcionando em
              tempo real e copie o código pronto para o seu projeto.
            </p>
          </div>

          {/* Ferramentas — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Playground — linha inteira */}
            <Link href="/playground" className="group lg:col-span-5">
              <div
                className="rounded-2xl border p-8 transition-all group-hover:border-[rgba(0,230,118,0.4)] flex flex-col sm:flex-row sm:items-center gap-6"
                style={{
                  backgroundColor: '#111',
                  borderColor: 'rgba(0,230,118,0.2)',
                }}
              >
                <div className="text-5xl shrink-0">🎮</div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: '#00e676' }}
                  >
                    API Playground
                  </h3>
                  <p className="text-sm text-white/40">
                    Teste <strong className="text-white/60">CEP, CNPJ e Geografia</strong>{' '}
                    diretamente no navegador, sem cadastro. Veja a resposta em tempo real
                    e copie o código pronto para o seu projeto.
                  </p>
                </div>
                <span
                  className="shrink-0 inline-block text-sm font-semibold px-5 py-2.5 rounded-xl"
                  style={{ backgroundColor: 'rgba(0,230,118,0.12)', color: '#00e676' }}
                >
                  Testar agora →
                </span>
              </div>
            </Link>

            {/* Consultar CEP */}
            <Link href="/ferramentas/consultar-cep" className="group">
              <div
                className="h-full rounded-2xl border p-6 transition-all group-hover:border-white/20"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl mb-4">📮</div>
                <h3 className="text-base font-bold text-white mb-1">Consultar CEP</h3>
                <p className="text-sm text-white/40 mb-4">
                  Busca <strong className="text-white/60">gratuita</strong> de endereços
                  brasileiros com dados completos.
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Consultar grátis →
                </span>
              </div>
            </Link>

            {/* Buscar CEP */}
            <Link href="/ferramentas/buscar-cep" className="group relative">
              <div
                className="h-full rounded-2xl border p-6 transition-all group-hover:border-white/20"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className="absolute -top-2.5 right-4 text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
                >
                  NOVO
                </span>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-base font-bold text-white mb-1">Buscar CEP</h3>
                <p className="text-sm text-white/40 mb-4">
                  <strong className="text-white/60">Busca reversa:</strong> encontre o CEP
                  pelo endereço (rua + cidade).
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Buscar agora →
                </span>
              </div>
            </Link>

            {/* Validar CNPJ */}
            <Link href="/ferramentas/validar-cnpj" className="group">
              <div
                className="h-full rounded-2xl border p-6 transition-all group-hover:border-white/20"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-base font-bold text-white mb-1">Validar CNPJ</h3>
                <p className="text-sm text-white/40 mb-4">
                  Dados completos da{' '}
                  <strong className="text-white/60">Receita Federal</strong> com QSA e CNAEs.
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Validar grátis →
                </span>
              </div>
            </Link>

            {/* Artigos Penais */}
            <Link href="/ferramentas/penal" className="group">
              <div
                className="h-full rounded-2xl border p-6 transition-all group-hover:border-white/20"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-base font-bold text-white mb-1">Artigos Penais</h3>
                <p className="text-sm text-white/40 mb-4">
                  Consulte{' '}
                  <strong className="text-white/60">artigos do Código Penal</strong>{' '}
                  brasileiro (CP + LCP).
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Consultar grátis →
                </span>
              </div>
            </Link>

            {/* Estados e Municípios */}
            <Link href="/playground" className="group">
              <div
                className="h-full rounded-2xl border p-6 transition-all group-hover:border-white/20"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-base font-bold text-white mb-1">Estados e Municípios</h3>
                <p className="text-sm text-white/40 mb-4">
                  Todos os <strong className="text-white/60">estados e cidades</strong>{' '}
                  do Brasil via IBGE.
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Consultar grátis →
                </span>
              </div>
            </Link>
          </div>

          {/* APIs para desenvolvedores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/apis/cep" className="group">
              <div
                className="rounded-2xl border p-6 transition-all group-hover:border-white/20 flex items-center gap-5"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl shrink-0">⚡</div>
                <div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ color: '#00e676' }}
                  >
                    API de CEP
                  </h3>
                  <p className="text-sm text-white/40">
                    <strong className="text-white/60">3 fontes</strong> com fallback
                    automático · Cache inteligente ·{' '}
                    <strong className="text-white/60">~160ms</strong>
                  </p>
                </div>
                <span
                  className="ml-auto shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,230,118,0.1)', color: '#00e676' }}
                >
                  Docs →
                </span>
              </div>
            </Link>

            <Link href="/apis/penal" className="group">
              <div
                className="rounded-2xl border p-6 transition-all group-hover:border-white/20 flex items-center gap-5"
                style={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl shrink-0">⚖️</div>
                <div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ color: '#00e676' }}
                  >
                    API de Artigos Penais
                  </h3>
                  <p className="text-sm text-white/40">
                    <strong className="text-white/60">10 legislações</strong> · Cache
                    permanente ·{' '}
                    <strong className="text-white/60">122 artigos</strong>
                  </p>
                </div>
                <span
                  className="ml-auto shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,230,118,0.1)', color: '#00e676' }}
                >
                  Docs →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div
        className="overflow-hidden py-4 border-y"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-sm font-medium text-white/40"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#00e676' }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SOBRE O PROJETO ── */}
      <section className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: '#00e676' }}
              >
                SOBRE O RETECHHUB
              </p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6 text-white">
                Dados públicos,{' '}
                <span style={{ color: '#00e676' }}>sem complicação.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                O <strong className="text-white">RetechHub</strong> nasceu da
                frustração de integradores brasileiros: APIs públicas
                fragmentadas, instáveis e sem documentação. Criamos uma camada
                unificada sobre as fontes oficiais — IBGE, Receita Federal,
                Correios — com cache inteligente, fallback automático e uma API
                RESTful moderna.
              </p>
              <p className="text-white/40 text-base leading-relaxed mb-8">
                Um produto da{' '}
                <a
                  href="https://theretech.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: '#00e676' }}
                >
                  The Retech
                </a>
                , empresa especializada em software sob medida, IA e automação.
                Liderada por{' '}
                <strong className="text-white/60">
                  Alan Rezende
                </strong>
                , arquiteto de software com mais de 10 anos de experiência.
              </p>
              <ul className="space-y-3">
                {[
                  'Arquitetura antes de código — DDD, cache em camadas',
                  'IA como ferramenta real — não buzzword',
                  'Entrega com engenharia — CI/CD, observabilidade, performance',
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-sm text-white/50"
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: '#00e676' }}
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card de stats */}
            <div
              className="rounded-2xl border p-8"
              style={{
                backgroundColor: '#111',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: '#00e676' }}
              >
                Por que RetechHub?
              </p>
              <div className="space-y-5">
                {[
                  {
                    q: 'IBGE direto',
                    a: 'Lento, sem cache, sem fallback, sem suporte',
                  },
                  {
                    q: 'Receita Federal direta',
                    a: 'CAPTCHA, instável, rate limit agressivo',
                  },
                  {
                    q: 'APIs gratuitas do mercado',
                    a: 'Sem SLA, sem suporte, dados desatualizados',
                  },
                  {
                    q: 'RetechHub',
                    a: '~160ms, 3 fontes, fallback automático, dashboard',
                    highlight: true,
                  },
                ].map((row) => (
                  <div
                    key={row.q}
                    className="flex items-start gap-4 p-3 rounded-xl"
                    style={{
                      backgroundColor: row.highlight
                        ? 'rgba(0,230,118,0.06)'
                        : 'transparent',
                      border: row.highlight
                        ? '1px solid rgba(0,230,118,0.15)'
                        : 'none',
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-sm font-semibold"
                      style={{ color: row.highlight ? '#00e676' : '#fff' }}
                    >
                      {row.highlight ? '★' : '✗'}
                    </span>
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{ color: row.highlight ? '#00e676' : '#fff' }}
                      >
                        {row.q}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {row.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              POR QUE RETECHHUB
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              6 motivos para não voltar{' '}
              <br className="hidden sm:block" />
              <span style={{ color: '#00e676' }}>às APIs fragmentadas.</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Performance, confiabilidade e experiência de developer — a
              combinação que transforma dados públicos em vantagem competitiva.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {differentials.map((d) => (
              <div
                key={d.title}
                className="p-8 hover:bg-white/[0.04] transition-colors"
                style={{ backgroundColor: '#0d0d0d' }}
              >
                <div className="text-3xl mb-4">{d.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {d.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APIs ── */}
      <section
        id="apis"
        className="py-24"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              CATÁLOGO DE APIS
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              {totalApis} APIs essenciais.{' '}
              <span style={{ color: '#00e676' }}>Uma integração só.</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Da consulta de CEP ao rastreamento de encomendas — tudo que
              desenvolvedores brasileiros precisam, unificado e documentado.
            </p>

            {/* Progress bar */}
            <div className="max-w-md mx-auto mt-8">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Progresso geral</span>
                <span style={{ color: '#00e676' }}>
                  {apiProgressPct}% — {liveApis}/{totalApis} APIs
                </span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${apiProgressPct}%`,
                    background:
                      'linear-gradient(90deg, #00e676, #00acc1)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {apis.map((api) => (
              <div
                key={api.name}
                className="rounded-xl border p-4 hover:border-white/20 transition-all"
                style={{
                  backgroundColor:
                    api.status === 'live'
                      ? 'rgba(0,230,118,0.04)'
                      : '#111',
                  borderColor:
                    api.status === 'live'
                      ? 'rgba(0,230,118,0.15)'
                      : 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{api.icon}</span>
                  {statusBadge(api.status)}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {api.name}
                </h3>
                <p className="text-xs text-white/40">{api.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-white/30">
              Tem uma sugestão de API?{' '}
              <Link
                href="/contato"
                className="transition-colors"
                style={{ color: '#00e676' }}
              >
                Entre em contato
              </Link>{' '}
              e ajude a moldar o roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              STACK TÉCNICA
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Construído com{' '}
              <span style={{ color: '#00e676' }}>tecnologia de ponta.</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Performance, escalabilidade e confiabilidade não são acidente —
              são resultado de escolhas técnicas inteligentes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center gap-3 rounded-2xl border p-6 hover:border-white/20 transition-all"
                style={{
                  backgroundColor: '#111',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.icon}
                  alt={t.name}
                  className="w-12 h-12"
                  style={{ filter: ('tint' in t && t.tint) ? t.tint : t.invert ? 'invert(1)' : undefined }}
                />
                <div className="text-center">
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            {[
              {
                icon: '⚡',
                title: 'Velocidade',
                body: 'Go + Redis + MongoDB = ~160ms em média. Cache em 3 camadas com processamento do servidor <5ms.',
              },
              {
                icon: '📈',
                title: 'Escalabilidade',
                body: 'MongoDB escala horizontalmente, Go gerencia milhares de conexões simultâneas com eficiência.',
              },
              {
                icon: '🛡️',
                title: 'Confiabilidade',
                body: 'Railway garante 99.9% de uptime, backups automáticos e deploy com zero downtime.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-8 text-center"
                style={{ backgroundColor: '#0d0d0d' }}
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓDIGO ── */}
      <section className="py-24" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              INTEGRAÇÃO
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Pronto em{' '}
              <span style={{ color: '#00e676' }}>menos de 10 minutos.</span>
            </h2>
            <p className="text-white/40 mt-4">
              API RESTful, bem documentada e com exemplos em múltiplas
              linguagens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Exemplo REST */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b text-xs text-white/40"
                style={{
                  backgroundColor: '#111',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#00e676' }}
                />
                Consultar CEP — cURL
              </div>
              <pre
                className="p-5 text-sm leading-relaxed overflow-x-auto"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                <code>
                  <span style={{ color: '#00e676' }}>curl</span>
                  {' -H '}
                  <span style={{ color: '#80cbc4' }}>{'"X-API-Key: rtc_sua_chave"'}</span>
                  {' \\\n'}
                  {'  '}
                  <span style={{ color: '#80cbc4' }}>
                    {'"https://core.theretech.com.br/cep/01310-100"'}
                  </span>
                  {'\n\n'}
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {'// Resposta\n'}
                  </span>
                  {'{\n'}
                  {'  '}
                  <span style={{ color: '#ce93d8' }}>&quot;cep&quot;</span>
                  {': '}
                  <span style={{ color: '#a5d6a7' }}>&quot;01310-100&quot;</span>
                  {',\n'}
                  {'  '}
                  <span style={{ color: '#ce93d8' }}>&quot;logradouro&quot;</span>
                  {': '}
                  <span style={{ color: '#a5d6a7' }}>&quot;Avenida Paulista&quot;</span>
                  {',\n'}
                  {'  '}
                  <span style={{ color: '#ce93d8' }}>&quot;cidade&quot;</span>
                  {': '}
                  <span style={{ color: '#a5d6a7' }}>&quot;São Paulo&quot;</span>
                  {',\n'}
                  {'  '}
                  <span style={{ color: '#ce93d8' }}>&quot;estado&quot;</span>
                  {': '}
                  <span style={{ color: '#a5d6a7' }}>&quot;SP&quot;</span>
                  {'\n}'}
                </code>
              </pre>
            </div>

            {/* Exemplo JS */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b text-xs text-white/40"
                style={{
                  backgroundColor: '#111',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#ffb74d' }}
                />
                JavaScript — Node.js
              </div>
              <pre
                className="p-5 text-sm leading-relaxed overflow-x-auto"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                <code>
                  <span style={{ color: '#ce93d8' }}>const</span>
                  {' '}
                  <span style={{ color: '#82b1ff' }}>api</span>
                  {' = axios.'}
                  <span style={{ color: '#ffe082' }}>create</span>
                  {'({\n'}
                  {'  baseURL: '}
                  <span style={{ color: '#a5d6a7' }}>
                    {'"https://core.theretech.com.br"'}
                  </span>
                  {',\n'}
                  {'  headers: {\n'}
                  {"    'X-API-Key': "}
                  <span style={{ color: '#a5d6a7' }}>
                    {'"rtc_sua_chave"'}
                  </span>
                  {'\n  }\n});\n\n'}
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {'// Consultar CEP\n'}
                  </span>
                  <span style={{ color: '#ce93d8' }}>const</span>
                  {' '}
                  <span style={{ color: '#82b1ff' }}>res</span>
                  {' = '}
                  <span style={{ color: '#ce93d8' }}>await</span>
                  {' api.'}
                  <span style={{ color: '#ffe082' }}>get</span>
                  {'('}
                  <span style={{ color: '#a5d6a7' }}>
                    {'"cep/01310-100"'}
                  </span>
                  {');\n'}
                  {'console.'}
                  <span style={{ color: '#ffe082' }}>log</span>
                  {'(res.data);'}
                </code>
              </pre>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/painel/docs"
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl border transition-all text-white/60 hover:text-white hover:border-white/30"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              Ver documentação completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#00e676' }}
            >
              PLANOS
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Comece de graça.{' '}
              <span style={{ color: '#00e676' }}>Escale quando precisar.</span>
            </h2>
          </div>
          <PricingPlans variant="landing" />
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,230,118,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Pronto para escalar
            <br />
            <span style={{ color: '#00e676' }}>com dados de verdade?</span>
          </h2>
          <p className="text-white/40 text-lg mb-10">
            Crie sua conta gratuita agora e comece a integrar em minutos.
            Sem cartão de crédito. Sem burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/painel/register"
              className="inline-block text-base font-bold px-10 py-4 rounded-xl transition-all"
              style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
            >
              Criar Conta Grátis
            </Link>
            <Link
              href="https://theretech.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-base font-semibold px-10 py-4 rounded-xl border transition-all text-white/60 hover:text-white hover:border-white/30"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              Conhecer a The Retech ↗
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
      <ScrollToTop />
    </div>
  );
}

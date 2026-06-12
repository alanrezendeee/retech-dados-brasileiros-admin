import Link from 'next/link';

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string | number;
  priceLabel: string;
  badge?: { text: string };
  badgeHighlight?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonDisabled?: boolean;
  buttonHref?: string;
  featured?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfeito para testar e projetos pequenos',
    price: 'R$ 0',
    priceLabel: '/mês',
    features: [
      { text: '1.000 requests/dia', highlight: true },
      { text: 'CEP, CNPJ, Artigos Penais, Geografia e Estados/Municípios' },
      { text: 'Cache 3 camadas' },
      { text: 'Dashboard de uso' },
      { text: 'Documentação completa' },
      { text: 'Suporte via email' },
    ],
    buttonText: 'Começar Grátis',
    buttonHref: '/painel/register',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para aplicações em crescimento',
    price: 'R$ 49',
    priceLabel: '/mês',
    badge: { text: 'Em Breve' },
    features: [
      { text: '10.000 requests/dia', highlight: true },
      { text: 'CEP, CNPJ, Artigos Penais, Geografia e Estados/Municípios' },
      { text: '+ novas APIs conforme lançamento' },
      { text: 'Cache prioritário' },
      { text: 'Dashboard avançado' },
      { text: 'Suporte prioritário' },
    ],
    buttonText: 'Em Breve',
    buttonDisabled: true,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para empresas em crescimento',
    price: 'R$ 149',
    priceLabel: '/mês',
    badge: { text: 'Mais Popular' },
    badgeHighlight: true,
    featured: true,
    features: [
      { text: '100.000 requests/dia', highlight: true },
      { text: 'CEP, CNPJ, Artigos Penais, Geografia e Estados/Municípios' },
      { text: '+ todas as APIs ao lançar (inclui Premium)' },
      { text: 'Cache Redis L1 prioritário' },
      { text: 'Suporte WhatsApp prioritário' },
      { text: 'SLA de 99.5%' },
    ],
    buttonText: 'Em Breve',
    buttonDisabled: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Soluções personalizadas para grandes volumes',
    price: 'Custom',
    priceLabel: 'sob consulta',
    features: [
      { text: 'Requests ilimitados', highlight: true },
      { text: 'CEP, CNPJ, Artigos Penais, Geografia e Estados/Municípios' },
      { text: '+ todas as APIs ao lançar (inclui Premium)' },
      { text: 'Infraestrutura dedicada' },
      { text: 'IP whitelisting' },
      { text: 'SLA de 99.9% + suporte 24/7' },
    ],
    buttonText: 'Falar com Vendas',
    buttonHref: 'mailto:contato@theretech.com.br',
  },
];

interface PricingPlansProps {
  variant?: 'landing' | 'page';
}

export default function PricingPlans({ variant = 'landing' }: PricingPlansProps) {
  const isPage = variant === 'page';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {plans.map((plan) => {
        const isFeatured = !!plan.featured;

        const cardStyle: React.CSSProperties = {
          backgroundColor: isPage
            ? '#0d0d0d'
            : isFeatured
            ? 'rgba(0,230,118,0.06)'
            : '#111',
          border: isFeatured
            ? '1px solid rgba(0,230,118,0.3)'
            : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1rem',
          padding: '1.75rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.2s',
        };

        const btn = plan.buttonHref ? (
          <Link
            href={plan.buttonHref}
            className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-all mt-auto"
            style={
              isFeatured
                ? { backgroundColor: '#00e676', color: '#0a0a0a' }
                : {
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.7)',
                  }
            }
          >
            {plan.buttonText}
          </Link>
        ) : (
          <button
            disabled={plan.buttonDisabled}
            className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-all mt-auto cursor-not-allowed"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            {plan.buttonText}
          </button>
        );

        return (
          <div key={plan.id} style={cardStyle}>
            {/* Badge */}
            {plan.badge && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                style={
                  plan.badgeHighlight
                    ? { backgroundColor: '#00e676', color: '#0a0a0a' }
                    : {
                        backgroundColor: '#1a1a1a',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }
                }
              >
                {plan.badge.text}
              </span>
            )}

            {/* Header */}
            <div className="mb-5">
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: isFeatured ? '#00e676' : '#fff' }}
              >
                {plan.name}
              </h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {plan.description}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span
                  className="text-sm ml-1"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {plan.priceLabel}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="mb-5"
              style={{
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.06)',
              }}
            />

            {/* Features */}
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: isFeatured ? '#00e676' : 'rgba(255,255,255,0.4)' }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      color: f.highlight
                        ? '#fff'
                        : 'rgba(255,255,255,0.5)',
                      fontWeight: f.highlight ? 600 : 400,
                    }}
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {btn}
          </div>
        );
      })}
    </div>
  );
}

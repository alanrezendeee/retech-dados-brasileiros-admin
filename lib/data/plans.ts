export const FREE_DAILY_LIMIT = 100;

export interface PlanFeature {
  text: string;
  highlight?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceLabel: string;
  badge?: { text: string };
  badgeHighlight?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonHref: string;
  featured?: boolean;
}

const SALES_MAILTO = 'mailto:contato@theretech.com.br';

export const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Para desenvolver, testar e validar sua integração',
    price: 'R$ 0',
    priceLabel: '/mês',
    features: [
      { text: '100 requests/dia', highlight: true },
      { text: 'CEP, CNPJ, Geografia e Artigos Penais' },
      { text: '5 requests/minuto' },
      { text: '1 API key' },
      { text: 'Dashboard de uso' },
      { text: 'Documentação completa' },
    ],
    buttonText: 'Começar Grátis',
    buttonHref: '/painel/register',
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Para side-projects e apps em produção',
    price: 'R$ 29',
    priceLabel: '/mês',
    badge: { text: 'Mais Popular' },
    badgeHighlight: true,
    featured: true,
    features: [
      { text: '1.000 requests/dia', highlight: true },
      { text: 'Tudo do Free' },
      { text: '+ Busca Reversa de CEP', highlight: true },
      { text: '+ Novas APIs conforme lançamento' },
      { text: '30 requests/minuto · 2 API keys' },
      { text: 'Suporte via email' },
    ],
    buttonText: 'Quero este plano',
    buttonHref: `${SALES_MAILTO}?subject=Plano%20Starter`,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para aplicações em crescimento',
    price: 'R$ 79',
    priceLabel: '/mês',
    features: [
      { text: '10.000 requests/dia', highlight: true },
      { text: 'Tudo do Starter' },
      { text: '+ Acesso antecipado a novas APIs' },
      { text: '120 requests/minuto · 5 API keys' },
      { text: 'Cache prioritário' },
      { text: 'Suporte prioritário' },
    ],
    buttonText: 'Quero este plano',
    buttonHref: `${SALES_MAILTO}?subject=Plano%20Pro`,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para empresas com alto volume',
    price: 'R$ 199',
    priceLabel: '/mês',
    features: [
      { text: '100.000 requests/dia', highlight: true },
      { text: 'Tudo do Pro' },
      { text: '600 requests/minuto · API keys ilimitadas' },
      { text: 'Cache Redis L1 prioritário' },
      { text: 'Suporte WhatsApp prioritário' },
      { text: 'SLA de 99,5%' },
    ],
    buttonText: 'Quero este plano',
    buttonHref: `${SALES_MAILTO}?subject=Plano%20Business`,
  },
];

export const enterprisePlan = {
  id: 'enterprise',
  name: 'Enterprise',
  description:
    'Volume, contrato e infraestrutura sob medida para sua operação.',
  features: [
    'Requests e rate limit personalizados',
    'Infraestrutura dedicada',
    'IP whitelisting',
    'SLA de 99,9% + suporte 24/7',
    'Contrato e faturamento via NF',
  ],
  buttonText: 'Falar com Vendas',
  buttonHref: `${SALES_MAILTO}?subject=Plano%20Enterprise`,
};

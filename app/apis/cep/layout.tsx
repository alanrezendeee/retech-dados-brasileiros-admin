import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API de CEP Gratuita - Consulta Rápida de Endereços | Retech Core',
  description: 'API de CEP com cache inteligente, múltiplas fontes (ViaCEP + Brasil API) e resposta em <50ms. Plano gratuito com 100 requests/dia. Fallback automático e 99.9% uptime.',
  keywords: [
    'api cep',
    'api cep gratuita',
    'api consulta cep',
    'viacep alternativa',
    'api cep brasil',
    'consultar cep api',
    'api endereço',
    'webservice cep',
    'rest api cep',
    'api cep json'
  ],
  openGraph: {
    title: 'API de CEP Gratuita - Mais Rápida que ViaCEP',
    description: 'Cache inteligente, fallback automático e resposta em <50ms. 100 requests/dia grátis.',
    type: 'website',
    images: [
      {
        url: '/og-api-cep.png',
        width: 1200,
        height: 630,
        alt: 'API de CEP - Retech Core',
      },
    ],
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/apis/cep',
  },
};

export default function APICEPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API de CEP Gratuita: Consulta de Endereço em JSON com Cache',
  description:
    'API de CEP em JSON com várias fontes (ViaCEP, BrasilAPI, OpenCEP), fallback automático e cache em 3 camadas. Busca por CEP ou por endereço. 100 req/dia grátis.',
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
    'api cep json',
    'busca cep por endereço api',
    'brasilapi cep alternativa',
  ],
  openGraph: {
    title: 'API de CEP Gratuita: Consulta de Endereço em JSON com Cache',
    description:
      'Consulta de CEP e busca reversa por endereço em JSON. ViaCEP, BrasilAPI e OpenCEP com fallback automático e cache em 3 camadas. 100 requisições por dia grátis, sem cartão.',
    type: 'website',
    url: 'https://core.theretech.com.br/apis/cep',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/apis/cep',
  },
};

export default function APICEPLayout({ children }: { children: React.ReactNode }) {
  return children;
}

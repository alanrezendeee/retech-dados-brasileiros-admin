import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Documentação da API RetechHub: CEP, CNPJ, Geografia e Artigos Penais',
  description:
    'Referência da API REST RetechHub: autenticação com X-API-Key, endpoints de CEP, CNPJ, geografia IBGE e artigos penais, parâmetros, exemplos em JSON, erros RFC 7807 e limites de uso.',
  keywords: [
    'documentação api cep',
    'api cep documentação',
    'api cnpj documentação',
    'api ibge municipios',
    'api codigo penal',
    'api rest dados brasileiros',
    'x-api-key',
    'rfc 7807',
    'retech core docs',
  ],
  openGraph: {
    title: 'Documentação da API RetechHub',
    description:
      'Endpoints de CEP, CNPJ, geografia IBGE e artigos penais com parâmetros, exemplos em JSON e tratamento de erros.',
    type: 'article',
    url: `${SITE_URL}/docs`,
    locale: 'pt_BR',
  },
  alternates: {
    canonical: `${SITE_URL}/docs`,
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

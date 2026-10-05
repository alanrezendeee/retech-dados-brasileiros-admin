import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'CEP por estado e cidade: consulte CEPs de todo o Brasil',
  description:
    'Lista de CEPs por estado e cidade do Brasil. Consulte qualquer CEP com logradouro, bairro, cidade, UF, código IBGE e DDD. Dados dos Correios via API RetechHub.',
  keywords: [
    'cep',
    'consultar cep',
    'cep por estado',
    'cep por cidade',
    'lista de ceps',
    'buscar cep',
    'cep sp',
    'cep rj',
    'cep mg',
    'o que é cep',
    'estrutura do cep',
  ],
  openGraph: {
    title: 'CEP por estado e cidade: consulte CEPs de todo o Brasil',
    description:
      'Navegue pelos CEPs dos 26 estados e do Distrito Federal, cidade por cidade, ou consulte um CEP específico com todos os dados do endereço.',
    type: 'website',
    url: `${SITE_URL}/cep`,
    locale: 'pt_BR',
  },
  alternates: {
    canonical: `${SITE_URL}/cep`,
  },
};

export default function CepLayout({ children }: { children: React.ReactNode }) {
  return children;
}

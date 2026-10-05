import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultar CEP Grátis: Endereço Completo pelo CEP',
  description:
    'Consulte CEP grátis e veja logradouro, bairro, cidade, UF, DDD e código IBGE em segundos. Ferramenta online sem cadastro, várias fontes e fallback automático.',
  keywords: [
    'consultar cep',
    'consultar cep gratis',
    'buscar cep',
    'buscar endereço por cep',
    'correios cep',
    'cep online',
    'busca cep',
    'consulta cep gratuita',
    'cep gratis',
    'endereço por cep',
    'qual o endereço do cep',
  ],
  openGraph: {
    title: 'Consultar CEP Grátis: Endereço Completo pelo CEP',
    description: 'Digite o CEP e veja rua, bairro, cidade, estado, DDD e código IBGE. Gratuito, sem cadastro, com várias fontes e fallback automático.',
    type: 'website',
    url: 'https://core.theretech.com.br/ferramentas/consultar-cep',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/ferramentas/consultar-cep',
  },
};

export default function ConsultarCEPLayout({ children }: { children: React.ReactNode }) {
  return children;
}

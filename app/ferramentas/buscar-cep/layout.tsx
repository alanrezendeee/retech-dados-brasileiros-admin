import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar CEP por Endereço: Rua, Cidade e Estado',
  description:
    'Descubra o CEP a partir do endereço: informe UF, cidade e rua e veja todos os CEPs correspondentes com bairro e DDD. Busca reversa de CEP grátis e sem cadastro.',
  keywords: [
    'buscar cep por endereço',
    'buscar cep pelo nome da rua',
    'descobrir cep',
    'qual o cep da minha rua',
    'cep por rua',
    'busca reversa cep',
    'encontrar cep',
    'cep pelo endereço',
    'cep da rua',
    'consultar cep por logradouro',
  ],
  openGraph: {
    title: 'Buscar CEP por Endereço: Rua, Cidade e Estado',
    description: 'Informe estado, cidade e rua e veja todos os CEPs correspondentes com bairro e DDD. Gratuito, sem cadastro.',
    type: 'website',
    url: 'https://core.theretech.com.br/ferramentas/buscar-cep',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/ferramentas/buscar-cep',
  },
};

export default function BuscarCEPLayout({ children }: { children: React.ReactNode }) {
  return children;
}

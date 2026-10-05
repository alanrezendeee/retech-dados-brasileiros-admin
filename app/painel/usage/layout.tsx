import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uso da API - Portal do Desenvolvedor | RetechHub',
  description: 'Visualize gráficos detalhados do seu consumo de API, endpoints mais usados e estatísticas de performance.',
  alternates: {
    canonical: 'https://core.theretech.com.br/painel/usage',
  },
};

export default function UsageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


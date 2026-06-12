import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planos e Preços - A partir de R$ 0/mês',
  description: 'Plano Free: R$ 0 com 100 requests/dia. Starter: R$ 29. Pro: R$ 79. Business: R$ 199. Enterprise: sob medida. Sem contrato de fidelidade. Cancele quando quiser.',
  keywords: [
    'precos api',
    'planos api',
    'api gratuita',
    'quanto custa api',
    'plano free',
    'api barata'
  ],
  openGraph: {
    title: 'Planos e Preços - Retech Core API',
    description: 'Plano Free: R$ 0 com 100 requests/dia | Starter: R$ 29 | Pro: R$ 79 | Business: R$ 199',
    type: 'website',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/precos',
  },
};

export default function PrecosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}






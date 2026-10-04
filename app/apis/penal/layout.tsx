import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API de Artigos Penais - Consulta Completa do Código Penal | Retech Core',
  description: 'API de artigos penais brasileiros: 2.438 dispositivos (artigos, parágrafos, incisos e alíneas) de 36 legislações – Código Penal completo (Parte Geral e Especial), LCP, Lei de Drogas, Maria da Penha, Desarmamento, ECA, CTB, Crimes Ambientais, CDC, Lavagem, Tortura, Racismo, Organização Criminosa, Hediondos, Abuso de Autoridade e mais. Textos oficiais do Planalto atualizados. Estrutura hierárquica completa. Ideal para autocomplete e sistemas jurídicos.',
  keywords: [
    'api codigo penal',
    'api artigos penais',
    'api crimes brasileiros',
    'api leis penais',
    'consulta artigo penal',
    'codigo penal api',
    'artigos penais brasil',
    'api juridica',
    'crimes api',
    'lei de contravenções api'
  ],
  openGraph: {
    title: 'API de Artigos Penais - Código Penal Completo',
    description: '2.438 dispositivos penais de 36 legislações brasileiras – Código Penal completo, LCP, Lei de Drogas, Maria da Penha, Desarmamento, ECA, CTB, Crimes Ambientais e leis especiais. Inclui qualificadoras, causas de aumento, incisos e alíneas. Estrutura hierárquica completa. Ideal para autocomplete e sistemas jurídicos.',
    type: 'website',
    images: [
      {
        url: '/og-api-penal.png',
        width: 1200,
        height: 630,
        alt: 'API de Artigos Penais - Retech Core',
      },
    ],
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/apis/penal',
  },
};

export default function APIPenalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


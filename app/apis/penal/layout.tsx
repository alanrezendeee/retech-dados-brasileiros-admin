import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API de Artigos Penais: Código Penal e 35 Leis Especiais em JSON',
  description:
    'API REST de artigos penais: 2.438 dispositivos do Código Penal e de 35 leis especiais em JSON, com penas, parágrafos e incisos. Plano grátis com 100 req/dia.',
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
    'lei de contravenções api',
    'api lei de drogas',
    'api maria da penha',
  ],
  openGraph: {
    title: 'API de Artigos Penais: Código Penal e 35 Leis Especiais em JSON',
    description:
      '2.438 dispositivos penais de 36 legislações brasileiras em JSON: artigos, parágrafos, incisos, alíneas e penas. Textos compilados do Planalto. Plano grátis com 100 req/dia.',
    type: 'website',
    url: 'https://core.theretech.com.br/apis/penal',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/apis/penal',
  },
};

export default function APIPenalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

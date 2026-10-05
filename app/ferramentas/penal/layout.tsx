import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultar Artigo Penal Grátis: Código Penal e Leis Especiais',
  description:
    'Consulte qualquer artigo do Código Penal e de 35 leis especiais: texto oficial do Planalto, pena mínima e máxima, parágrafos e incisos. Grátis e sem cadastro.',
  keywords: [
    'consultar artigo penal',
    'consulta artigo codigo penal',
    'artigo 121 codigo penal',
    'artigo 157 codigo penal',
    'codigo penal comentado',
    'pena do artigo',
    'consultar lei penal',
    'artigos penais',
    'codigo penal online',
    'lei de drogas artigo 33',
  ],
  openGraph: {
    title: 'Consultar Artigo Penal Grátis: Código Penal e Leis Especiais',
    description:
      'Digite o número do artigo e veja o texto oficial, a pena e os parágrafos e incisos. 2.438 dispositivos de 36 legislações. Grátis, sem cadastro.',
    type: 'website',
    url: 'https://core.theretech.com.br/ferramentas/penal',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/ferramentas/penal',
  },
};

export default function FerramentaPenalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Blog RetechHub: CEP, CNPJ e Código Penal para desenvolvedores',
  description:
    'Artigos práticos sobre consulta de CEP, validação de CNPJ e integração do Código Penal em sistemas: tutoriais, comparativos e guias para quem usa dados brasileiros via API.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog RetechHub',
    description: 'Tutoriais e guias sobre CEP, CNPJ e artigos penais para desenvolvedores e equipes jurídicas.',
    locale: 'pt_BR',
    siteName: 'RetechHub',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

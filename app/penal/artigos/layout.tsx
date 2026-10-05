import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo/site';

const TITLE = 'Código Penal e leis penais artigo por artigo: texto e pena';
const DESCRIPTION =
  'Índice completo do Código Penal, Lei de Contravenções Penais, Lei de Drogas, Maria da Penha e mais 32 leis penais, artigo por artigo, com texto integral, parágrafos, incisos e penas.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'código penal artigo por artigo',
    'código penal comentado',
    'artigos do código penal',
    'lei de contravenções penais artigos',
    'lei de drogas artigos',
    'pena do artigo',
    'texto do artigo código penal',
    'leis penais especiais',
  ],
  alternates: { canonical: `${SITE_URL}/penal/artigos` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/penal/artigos`,
    locale: 'pt_BR',
    siteName: 'Retech Core',
  },
};

export default function PenalArtigosLayout({ children }: { children: React.ReactNode }) {
  return children;
}

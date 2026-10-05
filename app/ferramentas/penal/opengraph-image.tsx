import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Consultar artigo penal grátis';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Consultar artigo penal grátis',
    subtitle: 'Texto oficial, pena, parágrafos e incisos de qualquer artigo do Código Penal e leis especiais.',
    badge: 'Ferramenta',
  });
}

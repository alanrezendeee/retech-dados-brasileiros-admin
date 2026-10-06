import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Blog RetechHub';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Blog RetechHub',
    subtitle: 'Guias práticos sobre CEP, CNPJ, Código Penal e integração de APIs de dados brasileiros.',
    badge: 'Blog',
  });
}

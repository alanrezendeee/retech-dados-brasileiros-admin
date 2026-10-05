import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'API de Artigos Penais';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'API de Artigos Penais',
    subtitle: '2.438 dispositivos de 36 legislações: Código Penal completo, Lei de Drogas, Maria da Penha e mais.',
    badge: 'API',
  });
}

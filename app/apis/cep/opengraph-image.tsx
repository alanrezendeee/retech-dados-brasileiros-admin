import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'API de CEP gratuita';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'API de CEP gratuita',
    subtitle: 'Múltiplas fontes com fallback automático, cache em 3 camadas e resposta em milissegundos.',
    badge: 'API',
  });
}

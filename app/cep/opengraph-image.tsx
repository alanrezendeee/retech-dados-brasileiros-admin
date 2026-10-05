import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'CEP por estado e cidade';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'CEP por estado e cidade',
    subtitle: 'Consulte CEPs de todos os 5.570 municípios brasileiros: endereço, bairro, DDD e IBGE.',
    badge: 'Conteúdo',
  });
}

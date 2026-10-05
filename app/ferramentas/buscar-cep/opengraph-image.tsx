import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Buscar CEP por endereço';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Buscar CEP por endereço',
    subtitle: 'Encontre o CEP a partir de rua, cidade e estado. Grátis e sem cadastro.',
    badge: 'Ferramenta',
  });
}

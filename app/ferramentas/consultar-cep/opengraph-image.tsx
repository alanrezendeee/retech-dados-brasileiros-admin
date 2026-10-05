import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Consultar CEP grátis';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Consultar CEP grátis',
    subtitle: 'Endereço completo a partir do CEP: rua, bairro, cidade, UF e DDD. Sem cadastro.',
    badge: 'Ferramenta',
  });
}

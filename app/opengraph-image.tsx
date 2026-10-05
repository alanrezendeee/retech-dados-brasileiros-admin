import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'APIs de dados públicos brasileiros';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'APIs de dados públicos brasileiros',
    subtitle: 'CEP, CNPJ, geografia e Código Penal completo em uma integração. Grátis para começar.',
    badge: 'Retech Core',
  });
}

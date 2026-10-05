import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Validar CNPJ grátis';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Validar CNPJ grátis',
    subtitle: 'Situação cadastral, razão social, QSA e CNAEs direto da Receita Federal.',
    badge: 'Ferramenta',
  });
}

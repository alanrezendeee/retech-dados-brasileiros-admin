import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Documentação da API RetechHub';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Documentação da API RetechHub',
    subtitle: 'Endpoints de CEP, CNPJ, geografia e artigos penais com exemplos de requisição e resposta.',
    badge: 'Docs',
  });
}

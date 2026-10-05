import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Documentação da API Retech Core';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Documentação da API Retech Core',
    subtitle: 'Endpoints de CEP, CNPJ, geografia e artigos penais com exemplos de requisição e resposta.',
    badge: 'Docs',
  });
}

import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';

export const runtime = 'nodejs';
export const alt = 'Código Penal e leis penais artigo por artigo';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: 'Código Penal e leis penais artigo por artigo',
    subtitle: '864 artigos e 2.438 dispositivos com texto oficial, pena e estrutura, atualizados pelo Planalto.',
    badge: 'Conteúdo',
  });
}

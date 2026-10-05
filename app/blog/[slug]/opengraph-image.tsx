import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';
import { getPost } from '@/lib/blog/posts';

export const runtime = 'nodejs';
export const alt = 'Blog Retech Core';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({
    title: post?.title ?? 'Blog Retech Core',
    subtitle: post?.description ?? 'Guias sobre CEP, CNPJ e Código Penal',
    badge: 'Blog',
  });
}

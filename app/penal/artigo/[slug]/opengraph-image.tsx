import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';
import { getPenalArtigos, getPenalArvore, penalSlugToIdUnico } from '@/lib/seo/api';

export const runtime = 'nodejs';
export const alt = 'Artigo penal - texto e pena';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const artigos = await getPenalArtigos();
    const id = penalSlugToIdUnico(slug, artigos);
    const arvore = id ? await getPenalArvore(id) : null;
    if (arvore) {
      const a = arvore.artigo;
      const pena = [a.penaMin, a.penaMax].filter(Boolean).join(' ');
      return ogImage({
        title: `${a.codigoFormatado} – ${a.descricao}`,
        subtitle: pena ? `Pena: ${pena}` : a.legislacaoNome,
        badge: a.legislacaoNome,
      });
    }
  } catch {
    /* fallback abaixo */
  }
  return ogImage({ title: 'Artigo penal', subtitle: 'Texto oficial, pena e dispositivos', badge: 'Código Penal' });
}

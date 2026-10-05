import { MetadataRoute } from 'next';
import { SITE_URL, CONTENT_UPDATED_AT } from '@/lib/seo/site';
import { getPenalArtigos, getUFs, getMunicipios, penalSlug, slugify } from '@/lib/seo/api';
import { getAllPosts } from '@/lib/blog/posts';

// Sitemap gerado no servidor. Regras:
// - só URLs que existem (nada de /blog/x ou /apis/cnpj inexistentes);
// - lastModified fixo por conteúdo (CONTENT_UPDATED_AT / data do post), nunca `new Date()` a cada build;
// - páginas programáticas (artigos penais, UFs, cidades) vêm da API; se a API falhar, o sitemap
//   ainda é gerado com as páginas estáticas.
export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

const fixed = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly', lastModified: string = CONTENT_UPDATED_AT): Entry => ({
  url: `${SITE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: Entry[] = [
    fixed('', 1.0, 'weekly'),
    // APIs
    fixed('/apis/penal', 0.9, 'weekly'),
    fixed('/apis/cep', 0.9, 'weekly'),
    // Ferramentas
    fixed('/ferramentas/penal', 0.8, 'weekly'),
    fixed('/ferramentas/consultar-cep', 0.8, 'weekly'),
    fixed('/ferramentas/buscar-cep', 0.8, 'weekly'),
    fixed('/ferramentas/validar-cnpj', 0.8, 'weekly'),
    // Hubs de conteúdo
    fixed('/penal/artigos', 0.9, 'weekly'),
    fixed('/cep', 0.8, 'weekly'),
    fixed('/blog', 0.8, 'weekly'),
    fixed('/docs', 0.8, 'monthly'),
    fixed('/playground', 0.7, 'monthly'),
    // Institucional
    fixed('/precos', 0.7),
    fixed('/sobre', 0.5),
    fixed('/contato', 0.5),
    fixed('/status', 0.4, 'daily'),
    fixed('/legal/termos', 0.3, 'yearly'),
    fixed('/legal/privacidade', 0.3, 'yearly'),
  ];

  // Blog
  try {
    for (const p of getAllPosts()) {
      entries.push(fixed(`/blog/${p.slug}`, 0.7, 'monthly', p.updatedAt ?? p.publishedAt));
    }
  } catch {
    /* registro de posts indisponível */
  }

  // Artigos penais (864 páginas)
  try {
    const artigos = await getPenalArtigos();
    for (const a of artigos) {
      entries.push(fixed(`/penal/artigo/${penalSlug(a)}`, a.tipo === 'crime' || a.tipo === 'contravencao' ? 0.7 : 0.5, 'monthly'));
    }
  } catch {
    /* API indisponível: sitemap sem páginas de artigo nesta geração */
  }

  // CEP por UF e cidade (27 + 5.570 páginas)
  try {
    const ufs = await getUFs();
    for (const uf of ufs) {
      const sigla = uf.sigla.toLowerCase();
      entries.push(fixed(`/cep/${sigla}`, 0.6, 'monthly'));
      try {
        const municipios = await getMunicipios(uf.sigla);
        for (const m of municipios) {
          entries.push(fixed(`/cep/${sigla}/${slugify(m.nome)}`, 0.4, 'monthly'));
        }
      } catch {
        /* UF sem municípios nesta geração */
      }
    }
  } catch {
    /* API indisponível */
  }

  return entries;
}

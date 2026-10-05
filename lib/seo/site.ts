// Constantes de SEO compartilhadas pelas páginas públicas.
export const SITE_URL = 'https://core.theretech.com.br';
export const SITE_NAME = 'Retech Core';
export const API_DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://api-core.theretech.com.br/docs';
export const API_PUBLIC_BASE = 'https://api-core.theretech.com.br';

// Data de referência usada em lastModified do sitemap para páginas estáticas.
// Atualize quando o conteúdo das páginas mudar de forma relevante.
export const CONTENT_UPDATED_AT = '2026-10-05';

export const ORGANIZATION = {
  name: 'The Retech',
  legalName: 'The Retech LTDA',
  url: 'https://theretech.com.br',
  logo: `${SITE_URL}/logo.png`,
  email: 'suporte@theretech.com.br',
  address: { addressLocality: 'Florianópolis', addressRegion: 'SC', addressCountry: 'BR' },
  sameAs: ['https://theretech.com.br', 'https://github.com/alanrezendeee'],
};

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

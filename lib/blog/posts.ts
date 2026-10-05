// Registro tipado dos posts do blog. O corpo de cada post vive em
// app/blog/[slug]/content/<slug>.tsx; aqui ficam apenas os metadados usados
// pelo índice, pelo sitemap, pelo generateMetadata e pelo JSON-LD.

export type BlogCategory = 'cep' | 'penal' | 'cnpj';

export interface BlogPost {
  slug: string;
  title: string;
  description: string; // 150–160 caracteres (meta description)
  publishedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  category: BlogCategory;
  readingMinutes: number;
  keywords: string[];
}

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string; apiHref: string; apiLabel: string }> = {
  cep: {
    label: 'CEP e endereços',
    description: 'Consulta de CEP, estrutura do código postal brasileiro e integração com a API de CEP.',
    apiHref: '/apis/cep',
    apiLabel: 'API de CEP',
  },
  penal: {
    label: 'Direito penal',
    description: 'Código Penal, leis especiais e como integrar a base de artigos penais em sistemas jurídicos.',
    apiHref: '/apis/penal',
    apiLabel: 'API de Artigos Penais',
  },
  cnpj: {
    label: 'CNPJ e empresas',
    description: 'Validação de CNPJ, situação cadastral na Receita Federal e consulta de dados de empresas.',
    apiHref: '/ferramentas/validar-cnpj',
    apiLabel: 'Validador de CNPJ',
  },
};

const PUBLISHED_AT = '2026-10-05T09:00:00-03:00';

export const POSTS: BlogPost[] = [
  {
    slug: 'alternativa-viacep',
    title: 'Alternativa ao ViaCEP: API de CEP com fallback automático e cache',
    description:
      'ViaCEP fora do ar ou limitando requisições? Veja como migrar para uma API de CEP com várias fontes, cache em 3 camadas e os mesmos campos JSON do ViaCEP.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'cep',
    readingMinutes: 8,
    keywords: ['alternativa viacep', 'viacep fora do ar', 'viacep limite', 'api cep fallback', 'api cep com cache', 'migrar viacep'],
  },
  {
    slug: 'api-cep-gratuita',
    title: 'API de CEP gratuita: como consultar endereço por CEP em Node, PHP e Python',
    description:
      'Tutorial de consulta de CEP via API gratuita com exemplos em Node.js, PHP e Python, tratamento dos erros 400 e 404 e dicas de cache para seus formulários.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'cep',
    readingMinutes: 9,
    keywords: ['api cep gratuita', 'api cep node', 'api cep php', 'api cep python', 'consultar endereço por cep', 'api de cep'],
  },
  {
    slug: 'consultar-cep-gratis',
    title: 'Como consultar CEP grátis (e como funciona o CEP brasileiro)',
    description:
      'Entenda o que significa cada um dos 8 dígitos do CEP, a diferença entre CEP geral e CEP de logradouro e como descobrir o CEP de qualquer endereço de graça.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'cep',
    readingMinutes: 8,
    keywords: ['consultar cep grátis', 'como funciona o cep', 'estrutura do cep', 'cep geral', 'descobrir cep pelo endereço', 'cep correios'],
  },
  {
    slug: 'validar-cnpj-receita-federal',
    title: 'Validar CNPJ na Receita Federal: dígitos verificadores, situação cadastral e API',
    description:
      'Aprenda o algoritmo dos dígitos verificadores do CNPJ com código em JavaScript, o que significa cada situação cadastral e como consultar QSA e CNAEs por API.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'cnpj',
    readingMinutes: 9,
    keywords: ['validar cnpj', 'validar cnpj receita federal', 'dígito verificador cnpj', 'situação cadastral cnpj', 'consulta cnpj api', 'qsa cnpj'],
  },
  {
    slug: 'crimes-hediondos-lista-2026',
    title: 'Lista de crimes hediondos (Lei 8.072/90) atualizada: artigos e penas',
    description:
      'Lista completa dos crimes hediondos e equiparados conforme a redação atual da Lei 8.072/1990, com artigo do Código Penal, pena prevista e efeitos na execução.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'penal',
    readingMinutes: 10,
    keywords: ['crimes hediondos', 'lista crimes hediondos', 'lei 8072', 'crimes hediondos 2026', 'crime hediondo progressão de regime', 'crimes equiparados a hediondos'],
  },
  {
    slug: 'artigos-mais-citados-codigo-penal',
    title: 'Os 20 artigos mais citados do Código Penal: o que dizem e qual a pena',
    description:
      'Do homicídio ao desacato: os 20 artigos do Código Penal mais citados em boletins, denúncias e sentenças, com resumo da conduta e a pena prevista na lei atual.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'penal',
    readingMinutes: 11,
    keywords: ['artigos do código penal', 'artigos mais citados código penal', 'pena do artigo 157', 'artigo 121 pena', 'artigo 171 pena', 'código penal comentado'],
  },
  {
    slug: 'autocomplete-artigos-penais',
    title: 'Como montar um autocomplete de artigos penais no seu sistema jurídico',
    description:
      'Guia para devs: busca de artigos penais com debounce, Combobox em React, filtros por legislação e nível, cache do glossário e idUnico como chave estável.',
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    category: 'penal',
    readingMinutes: 10,
    keywords: ['autocomplete artigos penais', 'api artigos penais', 'software jurídico api', 'combobox react artigos', 'base de artigos do código penal', 'api código penal'],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

// 3 posts relacionados: mesma categoria primeiro, depois os demais, nunca o próprio.
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(
    new Date(iso),
  );
}

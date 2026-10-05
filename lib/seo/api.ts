// Acesso server-side à API Go para páginas públicas renderizadas no servidor
// (artigos penais, CEP, cidades). Nunca importar em componentes client.
//
// Estratégia de credencial:
//   1. SEO_API_KEY (env do serviço no Railway) → chama os endpoints autenticados em BACKEND_URL.
//   2. Sem SEO_API_KEY → usa a chave demo do playground nos endpoints /public/* (rate limit por IP;
//      suficiente para dev local, insuficiente para produção com muitas páginas).
const BACKEND = (process.env.BACKEND_URL || 'https://api-core.theretech.com.br').replace(/\/$/, '');
const SEO_API_KEY = process.env.SEO_API_KEY;

type FetchOpts = { revalidate?: number; tags?: string[] };

async function demoApiKey(): Promise<string> {
  try {
    const res = await fetch(`${BACKEND}/public/playground/status`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const j = await res.json();
      if (j?.apiKey) return j.apiKey as string;
    }
  } catch {
    /* ignore */
  }
  return 'rtc_demo_playground_2024';
}

/**
 * GET autenticado na API. `path` começa com "/" (ex.: "/penal/artigos?nivel=artigo").
 * Retorna o JSON ou null em 404; lança em outros erros.
 */
export async function apiGet<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  const revalidate = opts.revalidate ?? 86400;
  let url: string;
  let key: string;
  if (SEO_API_KEY) {
    url = `${BACKEND}${path}`;
    key = SEO_API_KEY;
  } else {
    url = `${BACKEND}/public${path}`;
    key = await demoApiKey();
  }
  const res = await fetch(url, {
    headers: { 'X-API-Key': key, Accept: 'application/json' },
    next: { revalidate, tags: opts.tags },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} em ${path}`);
  return (await res.json()) as T;
}

// ----------------------------------------------------------------------------
// Tipos (espelham o JSON da API Go)
// ----------------------------------------------------------------------------
export interface PenalResumo {
  codigo: string;
  codigoFormatado: string;
  descricao: string;
  tipo: 'crime' | 'contravencao' | 'disposicao' | 'revogado';
  nivel: 'artigo' | 'paragrafo' | 'inciso' | 'alinea';
  legislacao: string;
  legislacaoNome: string;
  idUnico: string;
}

export interface PenalDispositivo extends PenalResumo {
  artigo: number;
  paragrafo?: number;
  inciso?: string;
  alinea?: string;
  textoCompleto: string;
  penaMin?: string;
  penaMax?: string;
  parte?: string;
  titulo?: string;
  capitulo?: string;
  fonte: string;
  dataAtualizacao: string;
  ordem: number;
}

export interface PenalArvore {
  artigo: PenalDispositivo;
  dispositivos: PenalDispositivo[];
  anterior?: PenalResumo | null;
  proximo?: PenalResumo | null;
}

export interface CepResult {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
  latitude?: number;
  longitude?: number;
  source?: string;
}

export interface CepCidadeItem {
  cep: string;
  cepFormatado: string;
  logradouro: string;
  bairro: string;
}

export interface UF {
  id: number;
  sigla: string;
  nome: string;
  regiao?: { id: number; sigla: string; nome: string };
}

export interface Municipio {
  id: number;
  nome: string;
  uf?: string;
}

// ----------------------------------------------------------------------------
// Penal
// ----------------------------------------------------------------------------
export async function getPenalArtigos(params: { legislacao?: string } = {}): Promise<PenalResumo[]> {
  const q = new URLSearchParams({ nivel: 'artigo' });
  if (params.legislacao) q.set('legislacao', params.legislacao);
  const j = await apiGet<{ data: PenalResumo[] }>(`/penal/artigos?${q.toString()}`, { tags: ['penal'] });
  return j?.data ?? [];
}

export async function getPenalArvore(idUnico: string): Promise<PenalArvore | null> {
  const j = await apiGet<{ data: PenalArvore }>(`/penal/arvore/${encodeURIComponent(idUnico)}`, { tags: ['penal'] });
  return j?.data ?? null;
}

/** Prefixo curto do idUnico (CP, DRG, …) → slug de URL (cp, drg, …). */
export function penalSlug(a: Pick<PenalResumo, 'idUnico' | 'descricao'>): string {
  const [prefix, codigo] = a.idUnico.split(':');
  return `${prefix.toLowerCase()}-${codigo.toLowerCase()}-${slugify(a.descricao)}`.replace(/-+$/, '');
}

/**
 * Resolve um slug de URL para o idUnico, usando a lista de artigos (necessário porque
 * códigos como "121-A" contêm hífen). Escolhe o código mais longo que casa com o início do slug.
 */
export function penalSlugToIdUnico(slug: string, artigos: PenalResumo[]): string | null {
  const s = slug.toLowerCase();
  let best: PenalResumo | null = null;
  for (const a of artigos) {
    const [prefix, codigo] = a.idUnico.split(':');
    const head = `${prefix.toLowerCase()}-${codigo.toLowerCase()}`;
    if (s === head || s.startsWith(head + '-')) {
      if (!best || head.length > best.idUnico.length) best = a;
    }
  }
  return best?.idUnico ?? null;
}

// ----------------------------------------------------------------------------
// CEP / Geo
// ----------------------------------------------------------------------------
export async function getCep(cep: string): Promise<CepResult | null> {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  // /cep/{cep} responde o objeto direto (sem envelope "data"); tolera ambos.
  const j = await apiGet<CepResult & { data?: CepResult }>(`/cep/${clean}`, { revalidate: 60 * 60 * 24 * 7 });
  if (!j) return null;
  const r = j.data ?? j;
  return r && r.cep ? r : null;
}

export async function getCepsDaCidade(uf: string, cidade: string, limit = 300): Promise<{ total: number; items: CepCidadeItem[] }> {
  const q = new URLSearchParams({ uf, cidade, limit: String(limit) });
  const j = await apiGet<{ data: { total: number; items: CepCidadeItem[] } }>(`/cep/cidade?${q.toString()}`, { revalidate: 86400 });
  return j?.data ?? { total: 0, items: [] };
}

export async function getUFs(): Promise<UF[]> {
  const j = await apiGet<{ data: UF[] }>(`/geo/ufs`, { revalidate: 86400 * 30 });
  return j?.data ?? [];
}

export async function getMunicipios(uf: string): Promise<Municipio[]> {
  const j = await apiGet<{ data: Municipio[] }>(`/geo/municipios/${uf.toUpperCase()}`, { revalidate: 86400 * 30 });
  return j?.data ?? [];
}

// ----------------------------------------------------------------------------
export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

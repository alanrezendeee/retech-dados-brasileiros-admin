// Helpers server-side das páginas programáticas de CEP (/cep, /cep/[uf], /cep/[uf]/[cidade], /cep/consulta).
// Todo acesso à API é embrulhado: falha de rede/API vira um resultado vazio com `ok: false`
// para a página renderizar uma mensagem amigável em vez de quebrar o build.
import { getCep, getCepsDaCidade, getMunicipios, getUFs, slugify } from '@/lib/seo/api';
import type { CepCidadeItem, CepResult, Municipio, UF } from '@/lib/seo/api';

export type Safe<T> = { ok: true; data: T } | { ok: false; data: T; error: string };

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<Safe<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error('[seo/cep]', error);
    return { ok: false, data: fallback, error };
  }
}

/** Mantém apenas dígitos. */
export function cepDigits(s: string | undefined | null): string {
  return (s ?? '').replace(/\D/g, '');
}

/** 01001000 → 01001-000. Retorna a entrada original se não tiver 8 dígitos. */
export function formatCep(s: string | undefined | null): string {
  const d = cepDigits(s);
  return d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : (s ?? '');
}

export function isValidCep(s: string | undefined | null): boolean {
  return cepDigits(s).length === 8;
}

// ----------------------------------------------------------------------------
// UFs / municípios
// ----------------------------------------------------------------------------
export const REGIOES_ORDEM = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

// Fallback estático com as 27 UFs (IBGE), usado quando a API não responde.
// Mantém a navegação do hub e os links para /cep/[uf] mesmo sem backend.
export const UFS_FALLBACK: UF[] = [
  { id: 11, sigla: 'RO', nome: 'Rondônia', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 12, sigla: 'AC', nome: 'Acre', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 13, sigla: 'AM', nome: 'Amazonas', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 14, sigla: 'RR', nome: 'Roraima', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 15, sigla: 'PA', nome: 'Pará', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 16, sigla: 'AP', nome: 'Amapá', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 17, sigla: 'TO', nome: 'Tocantins', regiao: { id: 1, sigla: 'N', nome: 'Norte' } },
  { id: 21, sigla: 'MA', nome: 'Maranhão', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 22, sigla: 'PI', nome: 'Piauí', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 23, sigla: 'CE', nome: 'Ceará', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 24, sigla: 'RN', nome: 'Rio Grande do Norte', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 25, sigla: 'PB', nome: 'Paraíba', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 26, sigla: 'PE', nome: 'Pernambuco', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 27, sigla: 'AL', nome: 'Alagoas', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 28, sigla: 'SE', nome: 'Sergipe', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 29, sigla: 'BA', nome: 'Bahia', regiao: { id: 2, sigla: 'NE', nome: 'Nordeste' } },
  { id: 31, sigla: 'MG', nome: 'Minas Gerais', regiao: { id: 3, sigla: 'SE', nome: 'Sudeste' } },
  { id: 32, sigla: 'ES', nome: 'Espírito Santo', regiao: { id: 3, sigla: 'SE', nome: 'Sudeste' } },
  { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro', regiao: { id: 3, sigla: 'SE', nome: 'Sudeste' } },
  { id: 35, sigla: 'SP', nome: 'São Paulo', regiao: { id: 3, sigla: 'SE', nome: 'Sudeste' } },
  { id: 41, sigla: 'PR', nome: 'Paraná', regiao: { id: 4, sigla: 'S', nome: 'Sul' } },
  { id: 42, sigla: 'SC', nome: 'Santa Catarina', regiao: { id: 4, sigla: 'S', nome: 'Sul' } },
  { id: 43, sigla: 'RS', nome: 'Rio Grande do Sul', regiao: { id: 4, sigla: 'S', nome: 'Sul' } },
  { id: 50, sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: { id: 5, sigla: 'CO', nome: 'Centro-Oeste' } },
  { id: 51, sigla: 'MT', nome: 'Mato Grosso', regiao: { id: 5, sigla: 'CO', nome: 'Centro-Oeste' } },
  { id: 52, sigla: 'GO', nome: 'Goiás', regiao: { id: 5, sigla: 'CO', nome: 'Centro-Oeste' } },
  { id: 53, sigla: 'DF', nome: 'Distrito Federal', regiao: { id: 5, sigla: 'CO', nome: 'Centro-Oeste' } },
];

/** Lista de UFs da API; se a API falhar, usa o fallback estático (ok=false). */
export async function loadUFs(): Promise<Safe<UF[]>> {
  const r = await safe(() => getUFs(), []);
  if (r.ok && r.data.length > 0) return r;
  return { ok: false, data: UFS_FALLBACK, error: r.ok ? 'lista vazia' : r.error };
}

export async function resolveUF(sigla: string): Promise<UF | null> {
  const s = sigla.toUpperCase();
  if (!/^[A-Z]{2}$/.test(s)) return null;
  const ufs = await loadUFs();
  return ufs.data.find((u) => u.sigla === s) ?? null;
}

export function groupByRegiao(ufs: UF[]): { regiao: string; ufs: UF[] }[] {
  const map = new Map<string, UF[]>();
  for (const u of ufs) {
    const r = u.regiao?.nome ?? 'Outras';
    if (!map.has(r)) map.set(r, []);
    map.get(r)!.push(u);
  }
  const ordered = [...map.entries()].sort(
    ([a], [b]) => (REGIOES_ORDEM.indexOf(a) + 100) % 100 - ((REGIOES_ORDEM.indexOf(b) + 100) % 100),
  );
  return ordered.map(([regiao, list]) => ({
    regiao,
    ufs: [...list].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
  }));
}

export async function loadMunicipios(uf: string): Promise<Safe<Municipio[]>> {
  const r = await safe(() => getMunicipios(uf), []);
  r.data = [...r.data].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  return r;
}

/** Resolve o slug de cidade (slugify(nome)) para o município da UF. */
export async function resolveMunicipio(uf: string, cidadeSlug: string): Promise<Safe<Municipio | null>> {
  const r = await loadMunicipios(uf);
  const slug = cidadeSlug.toLowerCase();
  const found = r.data.find((m) => slugify(m.nome) === slug) ?? null;
  return r.ok ? { ok: true, data: found } : { ok: false, data: found, error: r.error };
}

export function cidadeHref(uf: string, nome: string): string {
  return `/cep/${uf.toLowerCase()}/${slugify(nome)}`;
}

export function ufHref(uf: string): string {
  return `/cep/${uf.toLowerCase()}`;
}

export function consultaHref(cep: string): string {
  return `/cep/consulta?cep=${cepDigits(cep)}`;
}

// ----------------------------------------------------------------------------
// CEPs
// ----------------------------------------------------------------------------
export type CepsCidade = { total: number; items: CepCidadeItem[] };

export async function loadCepsDaCidade(uf: string, cidade: string, limit = 300): Promise<Safe<CepsCidade>> {
  return safe(() => getCepsDaCidade(uf, cidade, limit), { total: 0, items: [] });
}

export async function loadCep(cep: string): Promise<Safe<CepResult | null>> {
  return safe(() => getCep(cep), null);
}

export function groupByBairro(items: CepCidadeItem[]): { bairro: string; items: CepCidadeItem[] }[] {
  const map = new Map<string, CepCidadeItem[]>();
  for (const it of items) {
    const b = (it.bairro || '').trim() || 'Sem bairro informado';
    if (!map.has(b)) map.set(b, []);
    map.get(b)!.push(it);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
    .map(([bairro, list]) => ({
      bairro,
      items: [...list].sort((a, b) => (a.logradouro || '').localeCompare(b.logradouro || '', 'pt-BR')),
    }));
}

// ----------------------------------------------------------------------------
// Cidades pré-renderizadas: 27 capitais + 30 maiores municípios não capitais (IBGE).
// Nomes conforme a grafia oficial do IBGE (usada por /geo/municipios).
// ----------------------------------------------------------------------------
export const CIDADES_PRINCIPAIS: { uf: string; nome: string }[] = [
  { uf: 'AC', nome: 'Rio Branco' },
  { uf: 'AL', nome: 'Maceió' },
  { uf: 'AP', nome: 'Macapá' },
  { uf: 'AM', nome: 'Manaus' },
  { uf: 'BA', nome: 'Salvador' },
  { uf: 'CE', nome: 'Fortaleza' },
  { uf: 'DF', nome: 'Brasília' },
  { uf: 'ES', nome: 'Vitória' },
  { uf: 'GO', nome: 'Goiânia' },
  { uf: 'MA', nome: 'São Luís' },
  { uf: 'MT', nome: 'Cuiabá' },
  { uf: 'MS', nome: 'Campo Grande' },
  { uf: 'MG', nome: 'Belo Horizonte' },
  { uf: 'PA', nome: 'Belém' },
  { uf: 'PB', nome: 'João Pessoa' },
  { uf: 'PR', nome: 'Curitiba' },
  { uf: 'PE', nome: 'Recife' },
  { uf: 'PI', nome: 'Teresina' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Natal' },
  { uf: 'RS', nome: 'Porto Alegre' },
  { uf: 'RO', nome: 'Porto Velho' },
  { uf: 'RR', nome: 'Boa Vista' },
  { uf: 'SC', nome: 'Florianópolis' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Aracaju' },
  { uf: 'TO', nome: 'Palmas' },
  // 30 maiores municípios não capitais
  { uf: 'SP', nome: 'Guarulhos' },
  { uf: 'SP', nome: 'Campinas' },
  { uf: 'RJ', nome: 'São Gonçalo' },
  { uf: 'RJ', nome: 'Duque de Caxias' },
  { uf: 'RJ', nome: 'Nova Iguaçu' },
  { uf: 'SP', nome: 'São Bernardo do Campo' },
  { uf: 'SP', nome: 'Osasco' },
  { uf: 'SP', nome: 'Santo André' },
  { uf: 'SP', nome: 'Sorocaba' },
  { uf: 'SP', nome: 'Ribeirão Preto' },
  { uf: 'MG', nome: 'Uberlândia' },
  { uf: 'MG', nome: 'Contagem' },
  { uf: 'BA', nome: 'Feira de Santana' },
  { uf: 'SC', nome: 'Joinville' },
  { uf: 'MG', nome: 'Juiz de Fora' },
  { uf: 'PR', nome: 'Londrina' },
  { uf: 'GO', nome: 'Aparecida de Goiânia' },
  { uf: 'RJ', nome: 'Niterói' },
  { uf: 'PA', nome: 'Ananindeua' },
  { uf: 'ES', nome: 'Serra' },
  { uf: 'RS', nome: 'Caxias do Sul' },
  { uf: 'RJ', nome: 'Campos dos Goytacazes' },
  { uf: 'ES', nome: 'Vila Velha' },
  { uf: 'SP', nome: 'São José dos Campos' },
  { uf: 'PE', nome: 'Jaboatão dos Guararapes' },
  { uf: 'SP', nome: 'Mauá' },
  { uf: 'SP', nome: 'São José do Rio Preto' },
  { uf: 'SP', nome: 'Santos' },
  { uf: 'SP', nome: 'Mogi das Cruzes' },
  { uf: 'MG', nome: 'Betim' },
];

export const CAPITAIS: Record<string, string> = Object.fromEntries(
  CIDADES_PRINCIPAIS.slice(0, 27).map((c) => [c.uf, c.nome]),
);

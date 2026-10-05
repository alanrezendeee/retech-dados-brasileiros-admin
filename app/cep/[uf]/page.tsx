import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site';
import CepSearchForm from '../_components/cep-search-form';
import { CAPITAIS, cidadeHref, loadMunicipios, loadUFs, resolveUF, ufHref } from '../_lib/cep';

export const revalidate = 604800; // 7 dias
export const dynamicParams = true;

type Params = { uf: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const ufs = await loadUFs();
    return ufs.data.map((u) => ({ uf: u.sigla.toLowerCase() }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uf: ufParam } = await params;
  const uf = await resolveUF(ufParam);
  if (!uf) return { title: 'Estado não encontrado', robots: { index: false } };
  const title = `CEPs de ${uf.nome} (${uf.sigla}): consulte por cidade`;
  const description = `Lista de todos os municípios de ${uf.nome} (${uf.sigla}) com seus CEPs por bairro e logradouro. Consulte o CEP de qualquer cidade do estado, com código IBGE e DDD.`;
  const canonical = `${SITE_URL}${ufHref(uf.sigla)}`;
  return {
    title,
    description,
    keywords: [`cep ${uf.sigla.toLowerCase()}`, `cep ${uf.nome.toLowerCase()}`, `ceps de ${uf.nome.toLowerCase()}`, `lista de cep ${uf.sigla.toLowerCase()}`, `cep por cidade ${uf.sigla.toLowerCase()}`],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website', locale: 'pt_BR' },
  };
}

function groupByLetter<T extends { nome: string }>(items: T[]): { letra: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const m of items) {
    const letra = m.nome
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .charAt(0)
      .toUpperCase();
    if (!map.has(letra)) map.set(letra, []);
    map.get(letra)!.push(m);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([letra, list]) => ({ letra, items: list }));
}

export default async function CepUfPage({ params }: { params: Promise<Params> }) {
  const { uf: ufParam } = await params;
  // URL canônica é minúscula; maiúscula resolve igual (sem redirect para não quebrar links antigos).
  const uf = await resolveUF(ufParam);
  if (!uf) notFound();

  const municipios = await loadMunicipios(uf.sigla);
  const grupos = groupByLetter(municipios.data);
  const capital = CAPITAIS[uf.sigla];
  const regiao = uf.regiao?.nome;

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'State',
      name: uf.nome,
      alternateName: uf.sigla,
      identifier: String(uf.id),
      url: `${SITE_URL}${ufHref(uf.sigla)}`,
      containedInPlace: { '@type': 'Country', name: 'Brasil', alternateName: 'BR' },
      ...(municipios.data.length
        ? {
            containsPlace: municipios.data.slice(0, 50).map((m) => ({
              '@type': 'City',
              name: m.nome,
              identifier: String(m.id),
              url: `${SITE_URL}${cidadeHref(uf.sigla, m.nome)}`,
            })),
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `CEPs de ${uf.nome} (${uf.sigla})`,
      url: `${SITE_URL}${ufHref(uf.sigla)}`,
      inLanguage: 'pt-BR',
      about: { '@type': 'State', name: uf.nome },
    },
  ];

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-5xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: 'CEP', href: '/cep' }, { label: uf.sigla }]} className="mb-6" />

        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            CEPs de {uf.nome} ({uf.sigla})
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {uf.nome} é uma unidade da federação{regiao ? ` da região ${regiao}` : ''} do Brasil, identificada pela
            sigla {uf.sigla} e pelo código IBGE {uf.id}.{' '}
            {municipios.data.length > 0 ? (
              <>
                O estado possui {municipios.data.length} municípios, listados abaixo em ordem alfabética. Escolha
                uma cidade para ver os CEPs conhecidos por bairro e logradouro
                {capital ? (
                  <>
                    , começando pela capital,{' '}
                    <Link href={cidadeHref(uf.sigla, capital)} className="text-emerald-700 hover:underline">
                      {capital}
                    </Link>
                  </>
                ) : null}
                .
              </>
            ) : (
              <>Escolha uma cidade para ver os CEPs conhecidos por bairro e logradouro.</>
            )}
          </p>
        </header>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-10">
          <h2 className="text-lg font-semibold mb-3">Já sabe o CEP? Consulte direto</h2>
          <CepSearchForm />
        </section>

        <section aria-labelledby="cidades" className="mb-12">
          <h2 id="cidades" className="text-2xl font-bold mb-2">
            Cidades de {uf.nome}
          </h2>
          {municipios.data.length === 0 ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3">
              {municipios.ok
                ? `Nenhum município foi encontrado para ${uf.sigla}.`
                : 'Não foi possível carregar a lista de municípios agora. Tente novamente em alguns instantes ou use a busca de CEP acima.'}
            </div>
          ) : (
            <>
              <nav aria-label="Índice alfabético" className="flex flex-wrap gap-1.5 mb-6 text-sm">
                {grupos.map((g) => (
                  <a key={g.letra} href={`#letra-${g.letra}`} className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100">
                    {g.letra}
                  </a>
                ))}
              </nav>
              <div className="space-y-8">
                {grupos.map((g) => (
                  <div key={g.letra} id={`letra-${g.letra}`}>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">{g.letra}</h3>
                    <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((m) => (
                        <li key={m.id}>
                          <Link href={cidadeHref(uf.sigla, m.nome)} className="text-slate-800 hover:text-emerald-700 hover:underline">
                            CEPs de {m.nome}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="grid gap-4 sm:grid-cols-3 mb-6">
          <Link href="/ferramentas/buscar-cep" className="rounded-xl border border-slate-200 p-5 hover:border-emerald-300">
            <span className="font-semibold text-slate-900">Buscar CEP por endereço</span>
            <p className="text-sm text-slate-600 mt-1">Informe a cidade e o nome da rua em {uf.sigla}.</p>
          </Link>
          <Link href="/apis/cep" className="rounded-xl border border-slate-200 p-5 hover:border-emerald-300">
            <span className="font-semibold text-slate-900">API de CEP</span>
            <p className="text-sm text-slate-600 mt-1">Consultas em JSON para o seu sistema.</p>
          </Link>
          <Link href="/cep" className="rounded-xl border border-slate-200 p-5 hover:border-emerald-300">
            <span className="font-semibold text-slate-900">Outros estados</span>
            <p className="text-sm text-slate-600 mt-1">Voltar ao hub de CEPs por estado.</p>
          </Link>
        </section>
      </main>
    </PublicShell>
  );
}

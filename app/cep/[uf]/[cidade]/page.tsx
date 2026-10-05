import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import { SITE_URL, API_PUBLIC_BASE } from '@/lib/seo/site';
import { slugify } from '@/lib/seo/api';
import CepSearchForm from '../../_components/cep-search-form';
import {
  CIDADES_PRINCIPAIS,
  cidadeHref,
  consultaHref,
  formatCep,
  groupByBairro,
  loadCep,
  loadCepsDaCidade,
  resolveMunicipio,
  resolveUF,
  ufHref,
} from '../../_lib/cep';

export const revalidate = 86400; // 1 dia
export const dynamicParams = true;

type Params = { uf: string; cidade: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    return CIDADES_PRINCIPAIS.map((c) => ({ uf: c.uf.toLowerCase(), cidade: slugify(c.nome) }));
  } catch {
    return [];
  }
}

async function resolve(params: Params) {
  const uf = await resolveUF(params.uf);
  if (!uf) return null;
  const mun = await resolveMunicipio(uf.sigla, params.cidade);
  if (!mun.data) return null;
  return { uf, municipio: mun.data };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params;
  const r = await resolve(p);
  if (!r) return { title: 'Cidade não encontrada', robots: { index: false } };
  const { uf, municipio } = r;
  const title = `CEPs de ${municipio.nome} - ${uf.sigla}: lista de CEPs por bairro e logradouro`;
  const description = `Lista de CEPs de ${municipio.nome}, ${uf.nome} (${uf.sigla}), organizada por bairro e logradouro. Consulte o CEP de ruas e avenidas de ${municipio.nome} com código IBGE e DDD.`;
  const canonical = `${SITE_URL}${cidadeHref(uf.sigla, municipio.nome)}`;
  return {
    title,
    description,
    keywords: [
      `cep ${municipio.nome.toLowerCase()}`,
      `ceps de ${municipio.nome.toLowerCase()}`,
      `cep ${municipio.nome.toLowerCase()} ${uf.sigla.toLowerCase()}`,
      `lista de cep ${municipio.nome.toLowerCase()}`,
      `cep por bairro ${municipio.nome.toLowerCase()}`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website', locale: 'pt_BR' },
  };
}

export default async function CepCidadePage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const r = await resolve(p);
  if (!r) notFound();
  const { uf, municipio } = r;

  const ceps = await loadCepsDaCidade(uf.sigla, municipio.nome);
  const grupos = groupByBairro(ceps.data.items);

  // DDD e coordenadas vêm do primeiro CEP conhecido da cidade (quando houver).
  const primeiro = ceps.data.items[0];
  const amostra = primeiro ? await loadCep(primeiro.cep) : null;
  const ddd = amostra?.data?.ddd;
  const geo = amostra?.data?.latitude && amostra?.data?.longitude ? { lat: amostra.data.latitude, lng: amostra.data.longitude } : null;

  const url = `${SITE_URL}${cidadeHref(uf.sigla, municipio.nome)}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'City',
      name: municipio.nome,
      identifier: String(municipio.id),
      url,
      containedInPlace: {
        '@type': 'State',
        name: uf.nome,
        alternateName: uf.sigla,
        url: `${SITE_URL}${ufHref(uf.sigla)}`,
        containedInPlace: { '@type': 'Country', name: 'Brasil' },
      },
      ...(ddd ? { telephone: `+55 ${ddd}` } : {}),
      ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `CEPs de ${municipio.nome} - ${uf.sigla}`,
      url,
      inLanguage: 'pt-BR',
      about: { '@type': 'City', name: municipio.nome },
      ...(ceps.data.items.length
        ? {
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: ceps.data.total || ceps.data.items.length,
              itemListElement: ceps.data.items.slice(0, 100).map((it, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: `${formatCep(it.cep)} - ${it.logradouro || it.bairro || municipio.nome}`,
                url: `${SITE_URL}${consultaHref(it.cep)}`,
              })),
            },
          }
        : {}),
    },
  ];

  const temCeps = ceps.data.items.length > 0;
  const truncado = ceps.data.total > ceps.data.items.length;

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-5xl mx-auto px-4 py-10">
        <Breadcrumb
          items={[{ label: 'CEP', href: '/cep' }, { label: uf.sigla, href: ufHref(uf.sigla) }, { label: municipio.nome }]}
          className="mb-6"
        />

        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            CEPs de {municipio.nome} - {uf.sigla}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {municipio.nome} é um município de{' '}
            <Link href={ufHref(uf.sigla)} className="text-emerald-700 hover:underline">
              {uf.nome} ({uf.sigla})
            </Link>
            {uf.regiao?.nome ? `, região ${uf.regiao.nome}` : ''}, com código IBGE {municipio.id}
            {ddd ? ` e DDD ${ddd}` : ''}.{' '}
            {temCeps
              ? `Abaixo estão os CEPs de ${municipio.nome} já consultados na nossa base, agrupados por bairro e logradouro.`
              : `Ainda não temos CEPs de ${municipio.nome} listados na nossa base, mas você pode consultar qualquer CEP da cidade abaixo.`}
          </p>
        </header>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { k: 'Estado', v: `${uf.nome} (${uf.sigla})` },
            { k: 'Código IBGE', v: String(municipio.id) },
            { k: 'DDD', v: ddd ?? 'não informado' },
            { k: 'CEPs na base', v: temCeps ? String(ceps.data.total || ceps.data.items.length) : '0' },
          ].map((f) => (
            <div key={f.k} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-widest text-slate-500">{f.k}</dt>
              <dd className="text-lg font-semibold text-slate-900 mt-1">{f.v}</dd>
            </div>
          ))}
        </dl>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-10">
          <h2 className="text-lg font-semibold mb-3">Consultar um CEP de {municipio.nome}</h2>
          <CepSearchForm />
        </section>

        {!ceps.ok && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm px-4 py-3 mb-8">
            Não foi possível carregar a lista de CEPs de {municipio.nome} agora. Tente novamente em alguns instantes
            ou consulte um CEP diretamente pelo formulário acima.
          </p>
        )}

        {temCeps ? (
          <section aria-labelledby="lista" className="mb-12">
            <h2 id="lista" className="text-2xl font-bold mb-2">
              CEPs de {municipio.nome} por bairro
            </h2>
            <p className="text-slate-600 mb-6">
              {grupos.length} {grupos.length === 1 ? 'bairro' : 'bairros'} e {ceps.data.items.length} logradouros
              {truncado ? ` (de ${ceps.data.total} CEPs conhecidos)` : ''}. Clique no CEP para ver o endereço
              completo.
            </p>
            <div className="space-y-8">
              {grupos.map((g) => (
                <div key={g.bairro}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{g.bairro}</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-left text-slate-500">
                        <tr>
                          <th scope="col" className="px-4 py-2 font-medium">
                            Logradouro
                          </th>
                          <th scope="col" className="px-4 py-2 font-medium w-32">
                            CEP
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {g.items.map((it) => (
                          <tr key={it.cep}>
                            <td className="px-4 py-2 text-slate-800">{it.logradouro || municipio.nome}</td>
                            <td className="px-4 py-2">
                              <Link href={consultaHref(it.cep)} className="font-mono text-emerald-700 hover:underline">
                                {it.cepFormatado || formatCep(it.cep)}
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section aria-labelledby="como-achar" className="mb-12">
            <h2 id="como-achar" className="text-2xl font-bold mb-3">
              Como encontrar um CEP em {municipio.nome}
            </h2>
            <div className="text-slate-700 leading-relaxed space-y-3 max-w-3xl">
              <p>
                Municípios menores costumam usar um único CEP geral, terminado em <code>-000</code>, válido para todos
                os endereços da cidade. Já cidades maiores têm CEPs por logradouro e, às vezes, por trecho de rua.
                Nossa lista é construída a partir das consultas feitas na API, por isso {municipio.nome} ainda não
                aparece com CEPs cadastrados.
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Se você tem o CEP, digite-o no formulário acima para ver o endereço completo com bairro, IBGE e
                  DDD.
                </li>
                <li>
                  Se você tem o nome da rua, use a{' '}
                  <Link href="/ferramentas/buscar-cep" className="text-emerald-700 hover:underline">
                    busca de CEP por endereço
                  </Link>{' '}
                  informando {uf.sigla}, {municipio.nome} e o logradouro.
                </li>
                <li>
                  Para integrar no seu sistema, veja a{' '}
                  <Link href="/apis/cep" className="text-emerald-700 hover:underline">
                    API de CEP
                  </Link>
                  .
                </li>
              </ol>
            </div>
          </section>
        )}

        <section aria-labelledby="api" className="rounded-2xl bg-slate-950 text-slate-200 p-6 md:p-8 mb-10">
          <h2 id="api" className="text-xl font-bold text-white mb-2">
            Consulte CEPs de {municipio.nome} via API
          </h2>
          <p className="text-slate-400 mb-4 text-sm">
            Uma requisição GET devolve o endereço completo em JSON. Plano gratuito com 100 consultas por dia.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-xs md:text-sm">
            <code>{`curl ${API_PUBLIC_BASE}/cep/${primeiro ? primeiro.cep.replace(/\D/g, '') : '01001000'} \\
  -H "X-API-Key: SUA_CHAVE"`}</code>
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/apis/cep" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400">
              Conhecer a API de CEP
            </Link>
            <Link href="/docs" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Documentação
            </Link>
          </div>
        </section>

        <nav aria-label="Páginas relacionadas" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: ufHref(uf.sigla), t: `Todas as cidades de ${uf.sigla}`, d: `Lista de municípios de ${uf.nome}.` },
            { href: '/ferramentas/consultar-cep', t: 'Consultar CEP', d: 'Ferramenta gratuita de consulta.' },
            { href: '/ferramentas/buscar-cep', t: 'Buscar CEP por endereço', d: 'Encontre o CEP pelo nome da rua.' },
            { href: '/apis/cep', t: 'API de CEP', d: 'Integre consultas em JSON.' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-xl border border-slate-200 p-4 hover:border-emerald-300">
              <span className="font-semibold text-slate-900">{l.t}</span>
              <p className="text-sm text-slate-600 mt-1">{l.d}</p>
            </Link>
          ))}
        </nav>
      </main>
    </PublicShell>
  );
}

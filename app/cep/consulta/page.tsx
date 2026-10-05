import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import Faq from '@/components/seo/faq';
import { SITE_URL, API_PUBLIC_BASE } from '@/lib/seo/site';
import CepSearchForm from '../_components/cep-search-form';
import { cepDigits, cidadeHref, consultaHref, formatCep, isValidCep, loadCep, loadCepsDaCidade, ufHref } from '../_lib/cep';

// Página dinâmica (lê searchParams). Os fetches em lib/seo/api.ts têm revalidate próprio,
// então o custo por CEP é pago uma vez a cada 7 dias.
type SearchParams = Promise<{ cep?: string | string[] }>;

function pickCep(sp: { cep?: string | string[] }): string {
  const raw = Array.isArray(sp.cep) ? sp.cep[0] : sp.cep;
  return cepDigits(raw);
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const cep = pickCep(await searchParams);
  if (!cep) {
    return {
      title: 'Consultar CEP: endereço completo pelo código postal',
      description:
        'Consulte qualquer CEP do Brasil e veja logradouro, bairro, cidade, UF, código IBGE e DDD. Busca gratuita com dados dos Correios.',
      alternates: { canonical: `${SITE_URL}/cep/consulta` },
    };
  }
  if (!isValidCep(cep)) {
    return { title: 'CEP inválido', robots: { index: false } };
  }
  const r = await loadCep(cep);
  const d = r.data;
  if (!d) return { title: `CEP ${formatCep(cep)} não encontrado`, robots: { index: false } };
  const partes = [d.logradouro, d.bairro, `${d.localidade} - ${d.uf}`].filter(Boolean);
  const title = `CEP ${formatCep(cep)}: ${partes.join(', ')}`;
  const description = `O CEP ${formatCep(cep)} corresponde a ${d.logradouro ? `${d.logradouro}, ` : ''}${d.bairro ? `bairro ${d.bairro}, ` : ''}${d.localidade} - ${d.uf}${d.ddd ? `, DDD ${d.ddd}` : ''}${d.ibge ? `, código IBGE ${d.ibge}` : ''}. Consulte o endereço completo e os CEPs próximos.`;
  const canonical = `${SITE_URL}/cep/consulta?cep=${cep}`;
  return {
    title,
    description,
    keywords: [`cep ${formatCep(cep)}`, `cep ${cep}`, ...(d.logradouro ? [`cep ${d.logradouro.toLowerCase()}`, `cep da ${d.logradouro.toLowerCase()}`] : []), `cep ${d.localidade.toLowerCase()}`],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website', locale: 'pt_BR' },
  };
}

const FAQ_FORM = [
  {
    question: 'O que a consulta de CEP retorna?',
    answer:
      'Logradouro, complemento (quando houver), bairro, cidade, UF, código IBGE do município, DDD e, quando disponíveis, latitude e longitude.',
  },
  {
    question: 'Posso consultar o CEP sem o hífen?',
    answer: 'Sim. Digite apenas os 8 dígitos (ex.: 01001000) ou com hífen (01001-000); os dois formatos são aceitos.',
  },
  {
    question: 'Como encontrar o CEP se eu só sei o nome da rua?',
    answer: 'Use a busca de CEP por endereço, informando estado, cidade e o nome do logradouro.',
  },
];

function FormPage() {
  return (
    <PublicShell>
      <main className="container max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: 'CEP', href: '/cep' }, { label: 'Consulta' }]} className="mb-6" />
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Consultar CEP</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          Informe um CEP de 8 dígitos para ver o endereço completo: logradouro, bairro, cidade, estado, código IBGE
          e DDD. A consulta usa a base dos Correios por meio da API RetechHub.
        </p>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-10">
          <CepSearchForm />
        </div>
        <h2 className="text-xl font-bold mb-3">Como funciona</h2>
        <p className="text-slate-700 leading-relaxed mb-8">
          O CEP tem 8 dígitos no formato 00000-000. Os 5 primeiros indicam região, sub-região, setor, subsetor e
          divisor de subsetor; os 3 últimos identificam o logradouro ou a unidade de distribuição. Ao enviar o
          formulário, a página é gerada no servidor com os dados do endereço e links para a cidade e o estado
          correspondentes. Prefere navegar? Veja a{' '}
          <Link href="/cep" className="text-emerald-700 hover:underline">
            lista de CEPs por estado e cidade
          </Link>
          .
        </p>
        <Faq items={FAQ_FORM} />
      </main>
    </PublicShell>
  );
}

export default async function CepConsultaPage({ searchParams }: { searchParams: SearchParams }) {
  const cep = pickCep(await searchParams);
  if (!cep) return <FormPage />;
  if (!isValidCep(cep)) notFound();

  const r = await loadCep(cep);
  const d = r.data;
  if (!d) notFound();

  const cepFmt = formatCep(cep);
  const ufLower = d.uf.toLowerCase();
  const titulo = [d.logradouro, d.bairro, `${d.localidade} - ${d.uf}`].filter(Boolean).join(', ');

  const vizinhos = await loadCepsDaCidade(d.uf, d.localidade);
  const proximos = vizinhos.data.items
    .filter((it) => cepDigits(it.cep) !== cep && (it.bairro || '').trim().toLowerCase() === (d.bairro || '').trim().toLowerCase())
    .slice(0, 20);

  const url = `${SITE_URL}/cep/consulta?cep=${cep}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'PostalAddress',
      postalCode: cepFmt,
      streetAddress: d.logradouro || undefined,
      addressLocality: d.localidade,
      addressRegion: d.uf,
      addressCountry: 'BR',
      ...(d.bairro ? { description: `Bairro ${d.bairro}` } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `CEP ${cepFmt}: ${titulo}`,
      url,
      inLanguage: 'pt-BR',
      about: {
        '@type': 'Place',
        name: `${d.logradouro ? `${d.logradouro}, ` : ''}${d.localidade} - ${d.uf}`,
        address: { '@type': 'PostalAddress', postalCode: cepFmt, addressLocality: d.localidade, addressRegion: d.uf, addressCountry: 'BR' },
        ...(d.latitude && d.longitude ? { geo: { '@type': 'GeoCoordinates', latitude: d.latitude, longitude: d.longitude } } : {}),
      },
    },
  ];

  const campos: { k: string; v: string | undefined }[] = [
    { k: 'CEP', v: cepFmt },
    { k: 'Logradouro', v: d.logradouro || undefined },
    { k: 'Complemento', v: d.complemento || undefined },
    { k: 'Bairro', v: d.bairro || undefined },
    { k: 'Cidade', v: d.localidade },
    { k: 'UF', v: d.uf },
    { k: 'Código IBGE', v: d.ibge || undefined },
    { k: 'DDD', v: d.ddd || undefined },
    { k: 'Latitude', v: d.latitude ? String(d.latitude) : undefined },
    { k: 'Longitude', v: d.longitude ? String(d.longitude) : undefined },
  ];

  const exemploJson = JSON.stringify(
    {
      data: {
        cep: cepFmt,
        logradouro: d.logradouro,
        ...(d.complemento ? { complemento: d.complemento } : {}),
        bairro: d.bairro,
        localidade: d.localidade,
        uf: d.uf,
        ...(d.ibge ? { ibge: d.ibge } : {}),
        ...(d.ddd ? { ddd: d.ddd } : {}),
        source: 'cache',
      },
    },
    null,
    2,
  );

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-5xl mx-auto px-4 py-10">
        <Breadcrumb
          items={[
            { label: 'CEP', href: '/cep' },
            { label: d.uf, href: ufHref(d.uf) },
            { label: d.localidade, href: cidadeHref(d.uf, d.localidade) },
            { label: cepFmt },
          ]}
          className="mb-6"
        />

        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            CEP {cepFmt}: {titulo}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            O CEP <strong>{cepFmt}</strong> pertence a {d.logradouro ? <>{d.logradouro}, </> : null}
            {d.bairro ? <>bairro {d.bairro}, </> : null}
            na cidade de{' '}
            <Link href={cidadeHref(d.uf, d.localidade)} className="text-emerald-700 hover:underline">
              {d.localidade}
            </Link>
            , estado de{' '}
            <Link href={ufHref(d.uf)} className="text-emerald-700 hover:underline">
              {d.uf}
            </Link>
            {d.ddd ? <>, com DDD {d.ddd}</> : null}.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <section aria-labelledby="dados" className="mb-10">
              <h2 id="dados" className="text-2xl font-bold mb-4">
                Dados do endereço
              </h2>
              <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                {campos
                  .filter((c) => c.v)
                  .map((c) => (
                    <div key={c.k} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3">
                      <dt className="text-sm text-slate-500">{c.k}</dt>
                      <dd className="text-slate-900 font-medium">{c.v}</dd>
                    </div>
                  ))}
              </dl>
            </section>

            {proximos.length > 0 && (
              <section aria-labelledby="proximos" className="mb-10">
                <h2 id="proximos" className="text-2xl font-bold mb-2">
                  CEPs próximos{d.bairro ? ` no bairro ${d.bairro}` : ''}
                </h2>
                <p className="text-slate-600 mb-4 text-sm">
                  Outros logradouros de {d.localidade} - {d.uf} já consultados na nossa base.
                </p>
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
                      {proximos.map((it) => (
                        <tr key={it.cep}>
                          <td className="px-4 py-2 text-slate-800">{it.logradouro || d.localidade}</td>
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
              </section>
            )}

            <section aria-labelledby="api" className="rounded-2xl bg-slate-950 text-slate-200 p-6 md:p-8 mb-10">
              <h2 id="api" className="text-xl font-bold text-white mb-2">
                Consulte este CEP via API
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                A API de CEP do RetechHub devolve os mesmos dados em JSON. Plano gratuito com 100 consultas por
                dia; cadastro em menos de um minuto.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-xs md:text-sm mb-3">
                <code>{`curl ${API_PUBLIC_BASE}/cep/${cep} \\
  -H "X-API-Key: SUA_CHAVE"`}</code>
              </pre>
              <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-xs md:text-sm">
                <code>{exemploJson}</code>
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/painel/register" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400">
                  Criar chave grátis
                </Link>
                <Link href="/apis/cep" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                  API de CEP
                </Link>
                <Link href="/docs" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                  Documentação
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-base font-semibold mb-3">Consultar outro CEP</h2>
              <CepSearchForm compact />
            </div>
            <nav aria-label="Páginas relacionadas" className="rounded-xl border border-slate-200 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Relacionados</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={cidadeHref(d.uf, d.localidade)} className="text-emerald-700 hover:underline">
                    CEPs de {d.localidade} - {d.uf}
                  </Link>
                </li>
                <li>
                  <Link href={ufHref(d.uf)} className="text-emerald-700 hover:underline">
                    Cidades de {d.uf}
                  </Link>
                </li>
                <li>
                  <Link href="/ferramentas/buscar-cep" className="text-emerald-700 hover:underline">
                    Buscar CEP por endereço
                  </Link>
                </li>
                <li>
                  <Link href="/ferramentas/consultar-cep" className="text-emerald-700 hover:underline">
                    Ferramenta de consulta de CEP
                  </Link>
                </li>
                <li>
                  <Link href="/cep" className="text-emerald-700 hover:underline">
                    CEPs por estado
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </main>
    </PublicShell>
  );
}

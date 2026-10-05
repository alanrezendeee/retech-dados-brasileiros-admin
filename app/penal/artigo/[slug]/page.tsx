import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import {
  getPenalArtigos,
  getPenalArvore,
  penalSlug,
  penalSlugToIdUnico,
  type PenalArvore,
  type PenalDispositivo,
  type PenalResumo,
} from '@/lib/seo/api';
import { API_DOCS_URL, API_PUBLIC_BASE, SITE_URL } from '@/lib/seo/site';
import {
  PENAL_ARTIGO_BASE,
  PENAL_HUB_PATH,
  artigoDescription,
  artigoH1,
  artigoNomeCurto,
  artigoNomeLongo,
  artigoTitle,
  buildArvore,
  caputJsonExemplo,
  countArvore,
  dataAtualizacaoIso,
  descricaoExibicao,
  dispositivoLabel,
  formatPena,
  legislacaoAnchor,
  legislacaoCitacao,
  legislationType,
  nivelFilhos,
  plural,
  textoIntro,
  preposicaoNome,
  preposicaoSigla,
  tipoLabel,
  type ArvoreCounts,
  type ArvoreNode,
} from '@/lib/seo/penal';

export const revalidate = 86400;
export const dynamicParams = true;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const artigos = await getPenalArtigos();
    return artigos.map((a) => ({ slug: penalSlug(a) }));
  } catch {
    return [];
  }
}

async function resolve(slug: string): Promise<{ arvore: PenalArvore; artigos: PenalResumo[] } | null> {
  let artigos: PenalResumo[];
  try {
    artigos = await getPenalArtigos();
  } catch {
    return null;
  }
  const idUnico = penalSlugToIdUnico(slug, artigos);
  if (!idUnico) return null;
  const arvore = await getPenalArvore(idUnico);
  if (!arvore?.artigo) return null;
  return { arvore, artigos };
}

function pageUrl(a: Pick<PenalResumo, 'idUnico' | 'descricao'>): string {
  return `${PENAL_ARTIGO_BASE}/${penalSlug(a)}`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) return { title: 'Artigo não encontrado', robots: { index: false } };
  const { artigo, dispositivos } = r.arvore;
  const counts = countArvore(dispositivos, artigo.idUnico);
  const title = artigoTitle(artigo);
  const description = artigoDescription(artigo, counts);
  const canonical = `${SITE_URL}${pageUrl(artigo)}`;
  const iso = dataAtualizacaoIso(artigo.dataAtualizacao);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    keywords: [
      `${artigoNomeCurto(artigo).toLowerCase()} ${artigo.legislacao.toLowerCase()}`,
      `${artigoNomeCurto(artigo).toLowerCase()} ${artigo.legislacaoNome.toLowerCase()}`,
      `${artigoNomeCurto(artigo).toLowerCase()} ${artigo.legislacaoNome.toLowerCase()} pena`,
      descricaoExibicao(artigo).toLowerCase(),
      `${descricaoExibicao(artigo).toLowerCase()} pena`,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      locale: 'pt_BR',
      siteName: 'RetechHub',
      publishedTime: iso,
      modifiedTime: iso,
      section: artigo.legislacaoNome,
    },
  };
}

function tipoClass(tipo: PenalResumo['tipo']): string {
  switch (tipo) {
    case 'crime':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'contravencao':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'revogado':
      return 'bg-slate-100 text-slate-600 border-slate-300';
    default:
      return 'bg-sky-50 text-sky-700 border-sky-200';
  }
}

function Texto({ texto, className = '' }: { texto: string; className?: string }) {
  const partes = texto.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (partes.length <= 1) return <p className={className}>{texto.trim()}</p>;
  return (
    <div className={`space-y-2 ${className}`}>
      {partes.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function PenaLinha({ item, herdada }: { item: PenalDispositivo; herdada?: string | null }) {
  const pena = formatPena(item);
  if (!pena || pena === herdada) return null;
  return (
    <p className="mt-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-900">Pena:</span> {pena}
    </p>
  );
}

function ListaFilhos({ nodes, penaPai }: { nodes: ArvoreNode[]; penaPai?: string | null }) {
  if (nodes.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2 border-l-2 border-slate-200 pl-4">
      {nodes.map((n) => {
        const penaPropria = formatPena(n.item);
        return (
          <li key={n.item.idUnico} id={n.item.codigo} className="text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-900">{dispositivoLabel(n.item)}</span>
            {n.item.textoCompleto ? <> – {textoIntro(n.item.textoCompleto, nivelFilhos(n.children))}</> : null}
            <PenaLinha item={n.item} herdada={penaPai} />
            <ListaFilhos nodes={n.children} penaPai={penaPropria ?? penaPai} />
          </li>
        );
      })}
    </ul>
  );
}

function Paragrafo({ node }: { node: ArvoreNode }) {
  const d = node.item;
  const label = dispositivoLabel(d);
  return (
    <section id={d.codigo} className="scroll-mt-24" aria-labelledby={`h-${d.codigo}`}>
      <h2 id={`h-${d.codigo}`} className="text-xl font-bold text-slate-900">
        {label} – {d.descricao}
      </h2>
      {d.tipo === 'revogado' || /^\(revogad/i.test(d.textoCompleto || '') ? (
        <p className="mt-2 italic text-slate-500">{d.textoCompleto || '(Revogado)'}</p>
      ) : (
        <Texto texto={textoIntro(d.textoCompleto, nivelFilhos(node.children))} className="mt-2 text-slate-800 leading-relaxed" />
      )}
      <PenaLinha item={d} />
      <ListaFilhos nodes={node.children} penaPai={formatPena(d)} />
    </section>
  );
}

function CardLink({ href, titulo, descricao }: { href: string; titulo: string; descricao: string }) {
  return (
    <Link href={href} className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50/40">
      <span className="block text-sm font-semibold text-slate-900">{titulo}</span>
      <span className="mt-1 block text-sm text-slate-600">{descricao}</span>
    </Link>
  );
}

function explicacaoEstrutura(a: PenalDispositivo, c: ArvoreCounts): string {
  const nome = artigoNomeCurto(a);
  if (c.total === 0) {
    return `O ${nome} é composto apenas pelo caput, sem parágrafos, incisos ou alíneas. Todo o conteúdo normativo do dispositivo está no texto principal reproduzido acima.`;
  }
  const partes: string[] = [];
  if (c.paragrafos) partes.push(`${c.paragrafos} ${plural(c.paragrafos, 'parágrafo', 'parágrafos')}`);
  if (c.incisos) partes.push(`${c.incisos} ${plural(c.incisos, 'inciso', 'incisos')}`);
  if (c.alineas) partes.push(`${c.alineas} ${plural(c.alineas, 'alínea', 'alíneas')}`);
  const lista = partes.length > 1 ? `${partes.slice(0, -1).join(', ')} e ${partes[partes.length - 1]}` : partes[0];
  return `Além do caput, o ${nome} reúne ${lista}, totalizando ${c.total} ${plural(c.total, 'dispositivo', 'dispositivos')} subordinados. Eles aparecem abaixo na mesma ordem do texto legal: parágrafos como seções próprias, com incisos e alíneas aninhados em lista.`;
}

function explicacaoTipo(a: PenalDispositivo): string {
  const nome = artigoNomeLongo(a);
  const pena = formatPena(a);
  switch (a.tipo) {
    case 'crime':
      return pena
        ? `O ${nome} é um tipo penal incriminador: descreve a conduta proibida no caput e comina a pena correspondente (${pena}). A pena indicada é a do caput; parágrafos podem prever formas qualificadas, privilegiadas ou causas de aumento e diminuição, cada uma com a sua própria cominação, reproduzida junto ao dispositivo.`
        : `O ${nome} é classificado como crime. O caput descreve a conduta típica; a pena aplicável está nos parágrafos ou em dispositivo correlato da mesma lei, conforme a técnica legislativa adotada na norma.`;
    case 'contravencao':
      return pena
        ? `O ${nome} define uma contravenção penal, infração de menor gravidade punida com prisão simples ou multa, nos termos da Lei de Contravenções Penais. A pena cominada ao caput é: ${pena}.`
        : `O ${nome} define uma contravenção penal, infração de menor gravidade punida com prisão simples ou multa, nos termos da Lei de Contravenções Penais.`;
    case 'revogado':
      return `O ${nome} foi revogado e não produz mais efeitos. Ele permanece neste índice porque continua a ser citado em decisões, doutrina e sistemas que precisam resolver referências históricas. Consulte o texto compilado no Planalto para a redação original e a lei revogadora.`;
    default:
      return `O ${nome} é uma disposição não incriminadora: não descreve crime nem comina pena. Dispositivos desse tipo fixam regras de aplicação da lei penal, definições, causas de exclusão de ilicitude ou culpabilidade, critérios de dosimetria ou normas de organização da própria lei.`;
  }
}

export default async function PenalArtigoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = await resolve(slug);
  if (!r) notFound();
  const { artigo, dispositivos, anterior, proximo } = r.arvore;

  const canonicalPath = pageUrl(artigo);

  const tree = buildArvore(artigo, dispositivos);
  const counts = countArvore(dispositivos, artigo.idUnico);
  const h1 = artigoH1(artigo);
  const nomeLongo = artigoNomeLongo(artigo);
  const nomeCurto = artigoNomeCurto(artigo);
  const pena = formatPena(artigo);
  const iso = dataAtualizacaoIso(artigo.dataAtualizacao);
  const anchorLei = legislacaoAnchor(artigo.legislacaoNome);
  const paragrafos = tree.filter((n) => n.item.nivel === 'paragrafo');
  const incisosCaput = tree.filter((n) => n.item.nivel !== 'paragrafo');
  const jsonExemplo = JSON.stringify(caputJsonExemplo(artigo), null, 2);
  const curl = `curl -H "X-API-Key: SUA_CHAVE" \\\n  "${API_PUBLIC_BASE}/penal/artigos/${artigo.idUnico}"`;
  const curlArvore = `curl -H "X-API-Key: SUA_CHAVE" \\\n  "${API_PUBLIC_BASE}/penal/arvore/${artigo.idUnico}"`;
  const prepNome = preposicaoNome(artigo.legislacaoNome);
  const citacao = `${nomeCurto.toLowerCase()} ${preposicaoSigla(artigo.codigoFormatado)} ${artigo.legislacao}`;

  const legislationLd = {
    '@context': 'https://schema.org',
    '@type': 'Legislation',
    name: h1,
    legislationIdentifier: artigo.codigoFormatado,
    legislationType: legislationType(artigo),
    text: (artigo.textoCompleto || '').slice(0, 500),
    jurisdiction: 'BR',
    inLanguage: 'pt-BR',
    isPartOf: { '@type': 'Legislation', name: artigo.legislacaoNome, legislationIdentifier: artigo.legislacao, jurisdiction: 'BR' },
    url: `${SITE_URL}${canonicalPath}`,
    sameAs: artigo.fonte,
    legislationDate: iso,
    ...(artigo.tipo === 'revogado' ? { legislationLegalForce: 'https://schema.org/NotInForce' } : { legislationLegalForce: 'https://schema.org/InForce' }),
  };
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: artigoTitle(artigo),
    headline: h1,
    url: `${SITE_URL}${canonicalPath}`,
    inLanguage: 'pt-BR',
    datePublished: iso,
    dateModified: iso,
    isPartOf: { '@type': 'WebSite', name: 'RetechHub', url: SITE_URL },
    about: { '@type': 'Legislation', name: h1, legislationIdentifier: artigo.codigoFormatado },
    publisher: { '@type': 'Organization', name: 'The Retech', url: 'https://theretech.com.br' },
  };

  return (
    <PublicShell>
      <main className="container max-w-4xl mx-auto px-4 py-10">
        <JsonLd data={[legislationLd, webPageLd]} />
        <Breadcrumb
          items={[
            { label: 'Código Penal por artigo', href: PENAL_HUB_PATH },
            { label: artigo.legislacaoNome, href: `${PENAL_HUB_PATH}#${anchorLei}` },
            { label: nomeCurto },
          ]}
          className="mb-6"
        />

        <article>
          <header>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{h1}</h1>
            <p className="mt-3 text-lg text-slate-600">
              {artigo.legislacaoNome}
              {artigo.legislacao !== artigo.legislacaoNome ? ` (${artigo.legislacao})` : ''}
              {artigo.capitulo ? ` · ${artigo.capitulo}` : ''}
            </p>
          </header>

          {artigo.tipo === 'revogado' && (
            <div className="mt-6 rounded-xl border border-slate-300 bg-slate-100 p-4 text-slate-800" role="note">
              <p className="font-semibold">Artigo revogado</p>
              <p className="mt-1 text-sm leading-relaxed">
                Este dispositivo foi revogado e não está mais em vigor. A página é mantida para fins de referência
                histórica e para resolver citações a este artigo.
              </p>
            </div>
          )}

          {artigo.tipo === 'disposicao' && (
            <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sky-900" role="note">
              <p className="font-semibold">Disposição não incriminadora</p>
              <p className="mt-1 text-sm leading-relaxed">
                Este artigo não define crime nem comina pena. Ele estabelece regras, conceitos ou critérios aplicáveis a
                outros dispositivos da legislação penal.
              </p>
            </div>
          )}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-labelledby="resumo-heading">
            <h2 id="resumo-heading" className="sr-only">
              Resumo do dispositivo
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Tipo</dt>
                <dd className="mt-1">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tipoClass(artigo.tipo)}`}>
                    {tipoLabel(artigo.tipo)}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Pena (caput)</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {pena ?? (artigo.tipo === 'crime' || artigo.tipo === 'contravencao' ? 'Ver parágrafos' : 'Não se aplica')}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Legislação</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{legislacaoCitacao(artigo)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Dispositivos</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {counts.total === 0
                    ? 'Somente o caput'
                    : [
                        counts.paragrafos ? `${counts.paragrafos} ${plural(counts.paragrafos, 'parágrafo', 'parágrafos')}` : null,
                        counts.incisos ? `${counts.incisos} ${plural(counts.incisos, 'inciso', 'incisos')}` : null,
                        counts.alineas ? `${counts.alineas} ${plural(counts.alineas, 'alínea', 'alíneas')}` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                </dd>
              </div>
              {(artigo.parte || artigo.titulo || artigo.capitulo) && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Posição na lei</dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {[artigo.parte, artigo.titulo, artigo.capitulo].filter(Boolean).join(' › ')}
                  </dd>
                </div>
              )}
            </dl>
          </section>

          <section className="mt-8" aria-labelledby="caput-heading">
            <h2 id="caput-heading" className="text-xl font-bold text-slate-900">
              Texto do {nomeCurto} (caput)
            </h2>
            <blockquote className="mt-3 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/40 px-5 py-4 text-lg leading-relaxed text-slate-900">
              <p className="text-sm font-semibold text-slate-600">{artigo.codigoFormatado}</p>
              <Texto texto={textoIntro(artigo.textoCompleto || '(sem texto)', nivelFilhos(incisosCaput))} className="mt-1" />
              {pena && (
                <p className="mt-3 text-base">
                  <span className="font-semibold">Pena</span> – {pena}.
                </p>
              )}
            </blockquote>
            {incisosCaput.length > 0 && (
              <div className="mt-4">
                <h3 className="text-base font-semibold text-slate-900">Incisos do caput</h3>
                <ListaFilhos nodes={incisosCaput} penaPai={pena} />
              </div>
            )}
          </section>

          {paragrafos.length > 0 && (
            <div className="mt-10 space-y-8">
              {paragrafos.map((n) => (
                <Paragrafo key={n.item.idUnico} node={n} />
              ))}
            </div>
          )}

          <section className="mt-12 space-y-4 text-slate-700 leading-relaxed" aria-labelledby="entenda-heading">
            <h2 id="entenda-heading" className="text-xl font-bold text-slate-900">
              Entenda o {nomeCurto}
            </h2>
            <p>{explicacaoTipo(artigo)}</p>
            <p>{explicacaoEstrutura(artigo, counts)}</p>
            {(artigo.parte || artigo.titulo || artigo.capitulo) && (
              <p>
                Na estrutura {prepNome} {artigo.legislacaoNome}, o {nomeCurto} está
                {artigo.parte ? ` na ${artigo.parte}` : ''}
                {artigo.titulo ? `, ${artigo.titulo}` : ''}
                {artigo.capitulo ? `, ${artigo.capitulo}` : ''}. A posição no texto legal ajuda a interpretar o dispositivo, pois os
                artigos de um mesmo capítulo protegem o mesmo bem jurídico e compartilham regras comuns.
              </p>
            )}
          </section>

          <section className="mt-10" aria-labelledby="pena-heading">
            <h2 id="pena-heading" className="text-xl font-bold text-slate-900">
              Pena do {nomeCurto}
            </h2>
            {pena ? (
              <div className="mt-3 space-y-3 text-slate-700 leading-relaxed">
                <p>
                  A pena cominada ao caput {prepNome} {artigo.legislacaoNome} é{' '}
                  <strong className="text-slate-900">{pena}</strong>.
                </p>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {artigo.penaMin && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Pena privativa de liberdade</dt>
                      <dd className="mt-1 font-medium text-slate-900">{artigo.penaMin}</dd>
                    </div>
                  )}
                  {artigo.penaMax && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Cumulação / alternativa</dt>
                      <dd className="mt-1 font-medium text-slate-900">{artigo.penaMax}</dd>
                    </div>
                  )}
                </dl>
                <p className="text-sm text-slate-600">
                  Os valores são os limites mínimo e máximo abstratos previstos na lei. A pena concreta é fixada pelo juiz
                  conforme as circunstâncias do caso, as qualificadoras e as causas de aumento ou diminuição previstas nos
                  parágrafos deste artigo e na Parte Geral.
                </p>
              </div>
            ) : (
              <p className="mt-3 text-slate-700 leading-relaxed">
                {artigo.tipo === 'revogado'
                  ? 'Dispositivo revogado: não há pena em vigor.'
                  : artigo.tipo === 'disposicao'
                    ? 'Este dispositivo não comina pena, pois não descreve conduta criminosa.'
                    : counts.paragrafos
                      ? 'O caput não traz pena própria; as penas estão cominadas nos parágrafos reproduzidos acima.'
                      : 'A pena deste dispositivo não consta do caput; consulte o texto compilado da lei na fonte oficial.'}
              </p>
            )}
          </section>

          <section className="mt-10" aria-labelledby="fonte-heading">
            <h2 id="fonte-heading" className="text-xl font-bold text-slate-900">
              Legislação e fonte
            </h2>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Norma</dt>
                <dd className="font-medium text-slate-900">{legislacaoCitacao(artigo)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Última atualização dos dados</dt>
                <dd className="font-medium text-slate-900">
                  <time dateTime={iso}>{artigo.dataAtualizacao}</time>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Texto compilado oficial</dt>
                <dd>
                  <a href={artigo.fonte} target="_blank" rel="noopener noreferrer" className="break-all text-emerald-700 underline underline-offset-2 hover:text-emerald-900">
                    {artigo.fonte}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Como citar</dt>
                <dd className="font-medium text-slate-900">
                  {citacao}
                  {artigo.legislacao !== artigo.legislacaoNome ? ` (${artigo.legislacaoNome})` : ''}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              O texto reproduzido nesta página é o da versão compilada publicada pelo Planalto, que incorpora as alterações
              posteriores à redação original. Para fins oficiais, consulte sempre a fonte indicada.
            </p>
          </section>

          <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Artigos vizinhos">
            {anterior ? (
              <Link href={pageUrl(anterior)} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50/40">
                <span className="block text-xs uppercase tracking-wide text-slate-500">← Artigo anterior</span>
                <span className="mt-1 block font-semibold text-slate-900">{anterior.codigoFormatado}</span>
                <span className="block text-sm text-slate-600">{anterior.descricao}</span>
              </Link>
            ) : (
              <span />
            )}
            {proximo ? (
              <Link href={pageUrl(proximo)} className="rounded-xl border border-slate-200 bg-white p-4 text-right hover:border-emerald-300 hover:bg-emerald-50/40">
                <span className="block text-xs uppercase tracking-wide text-slate-500">Próximo artigo →</span>
                <span className="mt-1 block font-semibold text-slate-900">{proximo.codigoFormatado}</span>
                <span className="block text-sm text-slate-600">{proximo.descricao}</span>
              </Link>
            ) : null}
          </nav>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100" aria-labelledby="api-heading">
            <h2 id="api-heading" className="text-xl font-bold text-white">
              Use o {nomeCurto} via API
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              O mesmo dispositivo, em JSON, pela API de Artigos Penais do RetechHub. O identificador único deste artigo é{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-300">{artigo.idUnico}</code>.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
              <code>{curl}</code>
            </pre>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-200">
              <code>{jsonExemplo}</code>
            </pre>
            <p className="mt-4 text-sm text-slate-300">Para receber o artigo com todos os parágrafos, incisos e alíneas em uma única chamada:</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs">
              <code>{curlArvore}</code>
            </pre>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href="/painel/register" className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400">
                Criar conta gratuita
              </Link>
              <Link href="/apis/penal" className="rounded-lg border border-slate-600 px-4 py-2 font-medium text-white hover:bg-slate-800">
                API de Artigos Penais
              </Link>
              <Link href={API_DOCS_URL} className="rounded-lg border border-slate-600 px-4 py-2 font-medium text-white hover:bg-slate-800">
                Documentação
              </Link>
            </div>
          </section>

          <section className="mt-10" aria-labelledby="links-heading">
            <h2 id="links-heading" className="text-xl font-bold text-slate-900">
              Continue navegando
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <CardLink href={`${PENAL_HUB_PATH}#${anchorLei}`} titulo={`Todos os artigos: ${artigo.legislacaoNome}`} descricao="Índice completo da legislação, artigo por artigo." />
              <CardLink href={PENAL_HUB_PATH} titulo="Código Penal e leis penais" descricao="Hub com as 36 legislações cobertas pela base." />
              <CardLink href="/ferramentas/penal" titulo="Consultar artigo penal" descricao="Busque qualquer dispositivo por número ou palavra-chave." />
            </div>
          </section>
        </article>
      </main>
    </PublicShell>
  );
}

import Link from 'next/link';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import Faq, { type FaqItem } from '@/components/seo/faq';
import { getPenalArtigos, penalSlug, type PenalResumo } from '@/lib/seo/api';
import { API_DOCS_URL, API_PUBLIC_BASE, SITE_URL } from '@/lib/seo/site';
import { PENAL_ARTIGO_BASE, PENAL_HUB_PATH, groupByLegislacao, tipoLabel } from '@/lib/seo/penal';

export const revalidate = 86400;

const FAQ: FaqItem[] = [
  {
    question: 'O que são "dispositivos" e por que cada artigo tem parágrafos, incisos e alíneas?',
    answer:
      'Dispositivo é a menor unidade de um texto legal. O artigo é a unidade básica; o seu texto principal é o caput. Parágrafos (§ 1º, § 2º ou parágrafo único) detalham, excepcionam ou agravam o caput. Incisos (I, II, III) enumeram hipóteses dentro do caput ou de um parágrafo, e alíneas (a, b, c) subdividem incisos. Cada página deste índice mostra o artigo com todos os seus dispositivos filhos na ordem em que aparecem na lei.',
  },
  {
    question: 'De onde vêm os textos dos artigos?',
    answer:
      'Todos os textos são extraídos das versões compiladas publicadas pelo Planalto (Presidência da República), que já incorporam as alterações legislativas posteriores. Cada página do índice traz o link para a fonte oficial do dispositivo. Nenhum texto é redigido ou resumido por nós: o que aparece aqui é o texto legal, acompanhado apenas de metadados estruturados (tipo, pena, título e capítulo).',
  },
  {
    question: 'Com que frequência o conteúdo é atualizado?',
    answer:
      'A base é revisada a cada alteração relevante do Código Penal e das leis especiais cobertas. Cada dispositivo registra a data da última conferência com a fonte oficial, exibida na seção "Legislação e fonte" da sua página. As páginas são regeradas automaticamente a cada 24 horas a partir da API.',
  },
  {
    question: 'Como citar um artigo corretamente?',
    answer:
      'Use a forma abreviada consagrada: "art. 121 do CP" para o Código Penal, "art. 21 da LCP" para a Lei de Contravenções Penais e "art. 33 da Lei 11.343/2006" para leis especiais. Para parágrafos e incisos, acrescente a subdivisão: "art. 121, § 2º, I, do CP". Em trabalhos acadêmicos, cite também o nome completo da norma e o endereço do texto compilado no Planalto, que está disponível em cada página.',
  },
  {
    question: 'Como consultar esses artigos pela API?',
    answer:
      'A API de Artigos Penais do RetechHub expõe os mesmos dados em JSON. Liste artigos com GET /penal/artigos (filtros por legislação, tipo e texto), busque um dispositivo com GET /penal/artigos/{idUnico} (ex.: CP:121) e obtenha o artigo com todos os parágrafos, incisos e alíneas com GET /penal/arvore/{idUnico}. Basta criar uma conta gratuita, gerar uma chave e enviar o header X-API-Key.',
  },
];

function tipoClass(tipo: PenalResumo['tipo']): string {
  switch (tipo) {
    case 'crime':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'contravencao':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'revogado':
      return 'bg-slate-100 text-slate-500 border-slate-200';
    default:
      return 'bg-sky-50 text-sky-700 border-sky-200';
  }
}

export default async function PenalArtigosHubPage() {
  let artigos: PenalResumo[] = [];
  let erro = false;
  try {
    artigos = await getPenalArtigos();
  } catch {
    erro = true;
  }
  const grupos = groupByLegislacao(artigos);
  const totalCrimes = artigos.filter((a) => a.tipo === 'crime').length;
  const totalContravencoes = artigos.filter((a) => a.tipo === 'contravencao').length;

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Código Penal e leis penais artigo por artigo',
    url: `${SITE_URL}${PENAL_HUB_PATH}`,
    inLanguage: 'pt-BR',
    about: grupos.map((g) => ({ '@type': 'Legislation', name: g.nome, legislationIdentifier: g.sigla, jurisdiction: 'BR' })),
    numberOfItems: artigos.length,
  };

  return (
    <PublicShell>
      <main className="container max-w-6xl mx-auto px-4 py-10">
        <JsonLd data={collectionLd} />
        <Breadcrumb items={[{ label: 'Código Penal por artigo' }]} className="mb-6" />

        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Código Penal e leis penais artigo por artigo
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Índice completo dos artigos do Código Penal brasileiro e de 35 leis penais especiais, com o texto integral de
            cada dispositivo, seus parágrafos, incisos e alíneas, e a pena cominada quando houver.
          </p>
        </header>

        <section className="mt-8 max-w-3xl space-y-4 text-slate-700 leading-relaxed" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="sr-only">
            Sobre este índice
          </h2>
          <p>
            Esta página reúne, em um único lugar, todos os artigos do Código Penal (Decreto-Lei 2.848/1940), da Lei de
            Contravenções Penais (Decreto-Lei 3.688/1941) e das principais leis penais especiais em vigor no Brasil: Lei de
            Drogas, Estatuto do Desarmamento, Lei Maria da Penha, Estatuto da Criança e do Adolescente, Código de Trânsito
            Brasileiro, Lei de Crimes Ambientais, Código de Defesa do Consumidor, Lei de Lavagem de Dinheiro, Lei de Abuso
            de Autoridade, Código Eleitoral e outras. Cada link abaixo leva à página do artigo, que apresenta o caput, os
            parágrafos, incisos e alíneas na ordem do texto legal, a pena mínima e máxima quando o dispositivo é
            incriminador, a posição do artigo na estrutura da lei (parte, título e capítulo) e o link para o texto
            compilado no Planalto.
          </p>
          <p>
            Os artigos são classificados em quatro tipos. <strong>Crime</strong> indica um tipo penal incriminador com pena
            de reclusão ou detenção. <strong>Contravenção penal</strong> identifica as infrações da Lei de Contravenções
            Penais, punidas com prisão simples ou multa. <strong>Disposição geral</strong> marca dispositivos que não
            definem crime: regras de aplicação da lei penal, conceitos, causas de exclusão de ilicitude, cálculo de pena e
            outras normas da Parte Geral ou de abertura das leis especiais. <strong>Revogado</strong> sinaliza artigos
            que deixaram de vigorar, mantidos no índice porque continuam a ser citados em decisões e doutrina.
          </p>
          <p>
            O conteúdo é o mesmo servido pela API de Artigos Penais do RetechHub, usada por sistemas jurídicos,
            escritórios e aplicações de pesquisa para consultar dispositivos penais de forma estruturada. Para integrar
            esses dados ao seu software, veja a <Link href="/apis/penal" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900">página da API</Link>,
            a <Link href={API_DOCS_URL} className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900">documentação</Link> ou
            experimente a <Link href="/ferramentas/penal" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900">ferramenta de consulta de artigo penal</Link>.
          </p>
        </section>

        {erro ? (
          <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900" role="status">
            <h2 className="text-xl font-semibold">Índice temporariamente indisponível</h2>
            <p className="mt-2 leading-relaxed">
              Não foi possível carregar a lista de artigos agora. A página é regerada automaticamente; tente novamente em
              alguns minutos ou consulte um artigo pela{' '}
              <Link href="/ferramentas/penal" className="underline underline-offset-2">
                ferramenta de consulta
              </Link>
              .
            </p>
          </section>
        ) : (
          <>
            <section className="mt-10" aria-labelledby="resumo-heading">
              <h2 id="resumo-heading" className="sr-only">
                Resumo do índice
              </h2>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Legislações</dt>
                  <dd className="text-2xl font-bold text-slate-900">{grupos.length}</dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Artigos</dt>
                  <dd className="text-2xl font-bold text-slate-900">{artigos.length}</dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Crimes</dt>
                  <dd className="text-2xl font-bold text-slate-900">{totalCrimes}</dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Contravenções</dt>
                  <dd className="text-2xl font-bold text-slate-900">{totalContravencoes}</dd>
                </div>
              </dl>
            </section>

            <nav className="mt-8 rounded-xl border border-slate-200 bg-white p-5" aria-label="Legislações">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ir para a legislação</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {grupos.map((g) => (
                  <li key={g.anchor}>
                    <a
                      href={`#${g.anchor}`}
                      className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      {g.nome} <span className="text-slate-400">({g.artigos.length})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {grupos.map((g) => (
              <section key={g.anchor} id={g.anchor} className="mt-12 scroll-mt-24" aria-labelledby={`${g.anchor}-heading`}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-200 pb-3">
                  <h2 id={`${g.anchor}-heading`} className="text-2xl font-bold text-slate-900">
                    {g.nome}
                  </h2>
                  <span className="text-sm text-slate-500">
                    {g.sigla !== g.nome ? `${g.sigla} · ` : ''}
                    {g.artigos.length} {g.artigos.length === 1 ? 'artigo' : 'artigos'}
                  </span>
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.artigos.map((a) => (
                    <li key={a.idUnico} className="flex items-start gap-2 text-sm leading-snug">
                      <span
                        className={`mt-0.5 shrink-0 rounded border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide ${tipoClass(a.tipo)}`}
                        title={tipoLabel(a.tipo)}
                      >
                        {a.tipo === 'contravencao' ? 'Contrav.' : a.tipo === 'disposicao' ? 'Disp.' : a.tipo === 'revogado' ? 'Revog.' : 'Crime'}
                      </span>
                      <Link
                        href={`${PENAL_ARTIGO_BASE}/${penalSlug(a)}`}
                        className={`hover:underline underline-offset-2 ${a.tipo === 'revogado' ? 'text-slate-500' : 'text-slate-800 hover:text-emerald-800'}`}
                      >
                        {a.codigoFormatado} – {a.descricao}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}

        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8" aria-labelledby="api-heading">
          <h2 id="api-heading" className="text-2xl font-bold text-slate-900">
            Os mesmos dados, em JSON
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Todo artigo deste índice pode ser consultado pela API de Artigos Penais, com parágrafos, incisos, alíneas e
            penas estruturados. Plano gratuito disponível.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
            <code>{`curl -H "X-API-Key: SUA_CHAVE" \\\n  "${API_PUBLIC_BASE}/penal/arvore/CP:121"`}</code>
          </pre>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/apis/penal" className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
              Conhecer a API de Artigos Penais
            </Link>
            <Link href="/painel/register" className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 hover:bg-slate-100">
              Criar conta gratuita
            </Link>
            <Link href="/ferramentas/penal" className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 hover:bg-slate-100">
              Consultar artigo online
            </Link>
          </div>
        </section>

        <Faq items={FAQ} className="mt-16" />
      </main>
    </PublicShell>
  );
}

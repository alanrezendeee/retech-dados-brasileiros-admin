import Link from 'next/link';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import Faq from '@/components/seo/faq';
import JsonLd from '@/components/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site';
import CepSearchForm from './_components/cep-search-form';
import { CAPITAIS, cidadeHref, groupByRegiao, loadUFs, ufHref } from './_lib/cep';

export const revalidate = 604800; // 7 dias

const FAQ = [
  {
    question: 'O que é CEP?',
    answer:
      'CEP é a sigla de Código de Endereçamento Postal, um conjunto de 8 dígitos criado pelos Correios em 1971 para identificar logradouros, bairros, cidades e unidades de distribuição. Ele orienta o encaminhamento e a entrega de correspondências e encomendas em todo o território brasileiro.',
  },
  {
    question: 'Como é formado o CEP de 8 dígitos?',
    answer:
      'O CEP é dividido em duas partes separadas por hífen: os 5 primeiros dígitos identificam a região, a sub-região, o setor, o subsetor e o divisor de subsetor; os 3 últimos (sufixo) identificam o logradouro ou a unidade de distribuição dentro desse subsetor. Exemplo: 01001-000.',
  },
  {
    question: 'Como descobrir o CEP de uma rua?',
    answer:
      'Use a busca por endereço informando o estado, a cidade e o nome do logradouro. Também é possível navegar neste site por estado e cidade até encontrar a lista de CEPs do município, organizada por bairro e logradouro.',
  },
  {
    question: 'Toda cidade tem um CEP único?',
    answer:
      'Não. Cidades pequenas costumam usar um CEP geral para todo o município (terminado em -000). Cidades maiores possuem CEPs por logradouro e, em alguns casos, por trecho de rua ou por edifício (os chamados CEPs de grandes usuários).',
  },
  {
    question: 'Como consultar CEP via API?',
    answer:
      'A API de CEP do RetechHub responde em JSON com logradouro, bairro, cidade, UF, código IBGE e DDD. Basta uma chamada GET para /cep/{cep} enviando sua chave no header X-API-Key. O plano gratuito permite 100 consultas por dia.',
  },
];

export default async function CepHubPage() {
  const ufs = await loadUFs();
  const grupos = groupByRegiao(ufs.data);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CEP por estado e cidade',
    url: `${SITE_URL}/cep`,
    description: 'Hub de CEPs do Brasil organizados por estado e cidade.',
    inLanguage: 'pt-BR',
    hasPart: ufs.data.map((u) => ({
      '@type': 'WebPage',
      name: `CEPs de ${u.nome} (${u.sigla})`,
      url: `${SITE_URL}${ufHref(u.sigla)}`,
    })),
  };

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-5xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: 'CEP' }]} className="mb-6" />

        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">CEP por estado e cidade</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Consulte qualquer CEP do Brasil ou navegue pelos 26 estados e pelo Distrito Federal, cidade por cidade,
            para encontrar o código postal de ruas, avenidas, bairros e municípios.
          </p>
        </header>

        <section aria-labelledby="busca" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8 mb-12">
          <h2 id="busca" className="text-xl font-semibold mb-3">
            Consultar um CEP
          </h2>
          <p className="text-slate-600 mb-4">
            Digite os 8 dígitos para ver logradouro, bairro, cidade, UF, código IBGE e DDD.
          </p>
          <CepSearchForm />
        </section>

        <section aria-labelledby="sobre" className="prose prose-slate max-w-3xl mb-12">
          <h2 id="sobre" className="text-2xl font-bold mb-4">
            O que é o CEP e como ele funciona
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            O Código de Endereçamento Postal (CEP) é o sistema numérico criado pelos Correios em 1971 para organizar
            a entrega de correspondências e encomendas no Brasil. Cada código identifica um logradouro, um trecho de
            logradouro, um bairro, uma localidade ou uma unidade dos Correios. Ele é usado em formulários de
            cadastro, no comércio eletrônico, em sistemas de logística e em qualquer operação que precise localizar
            um endereço com precisão.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Desde 1992 o CEP tem oito dígitos, escritos no formato <code>00000-000</code>. Os cinco primeiros
            dígitos formam a parte geográfica: o primeiro indica a região postal (o Brasil é dividido em dez
            regiões, de 0 a 9), o segundo a sub-região, o terceiro o setor, o quarto o subsetor e o quinto o divisor
            de subsetor. Os três últimos dígitos, chamados de sufixo, identificam o logradouro ou a unidade de
            distribuição dentro daquele subsetor. CEPs terminados em <code>-000</code> geralmente correspondem a
            localidades inteiras, enquanto os demais sufixos apontam para ruas específicas, trechos de ruas, caixas
            postais ou grandes usuários como órgãos públicos e empresas.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            As regiões postais seguem a geografia do país. O estado de São Paulo ocupa as regiões 0 e 1; Rio de
            Janeiro e Espírito Santo, a região 2; Minas Gerais, a região 3; Bahia e Sergipe, a região 4; Pernambuco,
            Alagoas, Paraíba e Rio Grande do Norte, a região 5; Ceará, Piauí, Maranhão, Pará, Amazonas, Acre, Amapá e
            Roraima, a região 6; Distrito Federal, Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul e Rondônia, a
            região 7; Paraná e Santa Catarina, a região 8; e o Rio Grande do Sul, a região 9. Por isso é possível
            reconhecer o estado de um endereço só pelos primeiros dígitos do CEP.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Para pesquisar um CEP você pode informar os oito dígitos no campo acima, buscar pelo nome da rua na{' '}
            <Link href="/ferramentas/buscar-cep" className="text-emerald-700 hover:underline">
              busca por endereço
            </Link>
            , ou escolher abaixo o estado e depois a cidade para ver a lista de CEPs conhecidos daquele município,
            organizada por bairro e logradouro. Desenvolvedores podem integrar a mesma base pela{' '}
            <Link href="/apis/cep" className="text-emerald-700 hover:underline">
              API de CEP
            </Link>{' '}
            do RetechHub.
          </p>
        </section>

        <section aria-labelledby="estados" className="mb-12">
          <h2 id="estados" className="text-2xl font-bold mb-2">
            CEPs por estado
          </h2>
          <p className="text-slate-600 mb-6">
            Escolha a unidade da federação para ver todas as cidades e os CEPs de cada uma.
          </p>
          {!ufs.ok && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm px-4 py-3 mb-6">
              A lista de estados está sendo exibida a partir de dados locais porque a API não respondeu. Os links
              continuam funcionando normalmente.
            </p>
          )}
          <div className="grid gap-8 md:grid-cols-2">
            {grupos.map((g) => (
              <div key={g.regiao}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  Região {g.regiao}
                </h3>
                <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                  {g.ufs.map((u) => (
                    <li key={u.sigla} className="flex items-center justify-between px-4 py-3">
                      <Link href={ufHref(u.sigla)} className="font-medium text-slate-900 hover:text-emerald-700 hover:underline">
                        CEPs de {u.nome} ({u.sigla})
                      </Link>
                      {CAPITAIS[u.sigla] && (
                        <Link
                          href={cidadeHref(u.sigla, CAPITAIS[u.sigla])}
                          className="text-sm text-slate-500 hover:text-emerald-700 hover:underline"
                        >
                          {CAPITAIS[u.sigla]}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="ferramentas" className="mb-12">
          <h2 id="ferramentas" className="text-2xl font-bold mb-4">
            Ferramentas e API
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { href: '/ferramentas/consultar-cep', title: 'Consultar CEP', desc: 'Digite o CEP e veja o endereço completo na hora.' },
              { href: '/ferramentas/buscar-cep', title: 'Buscar CEP por endereço', desc: 'Encontre o CEP a partir do estado, cidade e nome da rua.' },
              { href: '/apis/cep', title: 'API de CEP', desc: 'Integre consultas de CEP em JSON no seu sistema. Plano grátis.' },
              { href: '/docs', title: 'Documentação da API', desc: 'Endpoints, parâmetros, exemplos e códigos de erro.' },
            ].map((c) => (
              <li key={c.href} className="rounded-xl border border-slate-200 p-5 hover:border-emerald-300 transition-colors">
                <Link href={c.href} className="font-semibold text-slate-900 hover:text-emerald-700">
                  {c.title}
                </Link>
                <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <Faq items={FAQ} />
      </main>
    </PublicShell>
  );
}

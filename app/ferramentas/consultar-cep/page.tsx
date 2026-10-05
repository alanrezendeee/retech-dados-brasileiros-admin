import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import Faq, { type FaqItem } from '@/components/seo/faq';
import JsonLd from '@/components/seo/json-ld';
import { ORGANIZATION, absoluteUrl } from '@/lib/seo/site';
import ConsultaCepClient from './consulta-client';

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}
const P = ({ children }: { children: React.ReactNode }) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;

const faqs: FaqItem[] = [
  {
    question: 'Como consultar um CEP nesta página?',
    answer:
      'Digite os 8 números do CEP no campo acima, com ou sem hífen, e clique em Consultar CEP. Em seguida a página mostra logradouro, complemento, bairro, cidade, estado, DDD, código IBGE do município e, quando disponível, as coordenadas.',
  },
  {
    question: 'A consulta de CEP é gratuita? Preciso me cadastrar?',
    answer:
      'Sim, é gratuita e não exige cadastro. A ferramenta usa uma chave de demonstração com limite por endereço IP. Para consultar em volume ou integrar no seu sistema, a API de CEP tem plano gratuito com 100 requisições por dia.',
  },
  {
    question: 'De onde vêm os dados de endereço?',
    answer:
      'A consulta passa pela API de CEP da Retech Core, que combina três fontes públicas (ViaCEP, BrasilAPI e OpenCEP): a consulta em tempo real usa o ViaCEP com troca automática para a BrasilAPI, e a base própria é alimentada em segundo plano pelas três. Os resultados ficam em cache próprio. O rótulo Fonte no resultado indica de onde veio aquela resposta.',
  },
  {
    question: 'Por que o logradouro veio vazio?',
    answer:
      'Cidades pequenas costumam ter um único CEP para toda a localidade (CEP geral). Nesses casos os Correios não atribuem CEP por rua, então o resultado traz apenas cidade e estado. Isso não é um erro da consulta.',
  },
  {
    question: 'O que é o código IBGE que aparece no resultado?',
    answer:
      'É o código de 7 dígitos que o IBGE atribui a cada município brasileiro. Ele é exigido em notas fiscais eletrônicas, integrações com sistemas públicos e cadastros que precisam identificar o município sem ambiguidade de grafia.',
  },
  {
    question: 'O que fazer se o CEP não for encontrado?',
    answer:
      'Confira se digitou os 8 dígitos corretamente. CEPs muito recentes podem ainda não constar nas bases públicas, e CEPs de grandes empresas ou caixas postais às vezes não têm logradouro associado. Se souber a rua e a cidade, use a busca de CEP por endereço para localizar o código correto.',
  },
  {
    question: 'Qual a diferença entre consultar CEP e buscar CEP por endereço?',
    answer:
      'Consultar CEP parte do código e devolve o endereço. Buscar CEP por endereço faz o inverso: você informa estado, cidade e rua e recebe a lista de CEPs daquele logradouro. As duas ferramentas estão disponíveis gratuitamente neste site.',
  },
  {
    question: 'Os dados estão atualizados?',
    answer:
      'Os resultados são renovados a partir das fontes públicas quando o cache expira, e a base própria guarda a data da última verificação de cada CEP. Mudanças de nome de logradouro ou criação de novos CEPs pelos Correios são incorporadas conforme as fontes as publicam.',
  },
  {
    question: 'Posso compartilhar o resultado?',
    answer:
      'Sim. O botão Compartilhar copia um link direto para a consulta, no formato /ferramentas/consultar-cep?cep=01310100. Quem abrir o link verá o mesmo endereço.',
  },
  {
    question: 'Como integrar a consulta de CEP no meu site ou sistema?',
    answer:
      'Use a API de CEP: um GET em /cep/{cep} com o header X-API-Key devolve o mesmo JSON que esta página exibe. A página da API traz exemplos em Node.js, PHP e Python, e o plano gratuito inclui 100 requisições por dia sem cartão de crédito.',
  },
];

export default function ConsultarCEPPage() {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Consultar CEP',
    url: absoluteUrl('/ferramentas/consultar-cep'),
    description:
      'Ferramenta gratuita para consultar CEP e obter logradouro, bairro, cidade, UF, DDD, código IBGE e coordenadas, com múltiplas fontes e fallback automático.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  };

  return (
    <PublicShell>
      <JsonLd data={webApp} />
      <main>
        <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-slate-100">
          <div className="container max-w-4xl mx-auto px-4 pt-8 pb-10">
            <Breadcrumb items={[{ label: 'Ferramentas', href: '/ferramentas/consultar-cep' }, { label: 'Consultar CEP' }]} className="mb-8" />
            <div className="text-center">
              <MapPin className="w-9 h-9 text-indigo-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Consultar CEP grátis</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Digite o CEP e veja o endereço completo: rua, bairro, cidade, estado, DDD e código IBGE. Três fontes
                com troca automática e cache para resposta rápida.
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-slate-500">
                <li>Gratuito</li>
                <li>Sem cadastro</li>
                <li>Todos os CEPs do Brasil</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 py-8">
          <ConsultaCepClient />
        </section>

        <article className="container max-w-4xl mx-auto px-4 pb-20">
          <H2 id="o-que-e">O que é o CEP e o que esta consulta mostra</H2>
          <P>
            O CEP, Código de Endereçamento Postal, é o código de oito dígitos criado pelos Correios em 1972 para
            organizar a distribuição de correspondências no Brasil. Os cinco primeiros dígitos identificam região,
            sub-região, setor, subsetor e divisor de subsetor; os três últimos, chamados de sufixo, identificam o
            logradouro ou um trecho dele. Em cidades grandes, uma avenida longa como a Paulista tem vários CEPs, um
            para cada trecho e lado da via. Em cidades pequenas, um único CEP cobre toda a localidade.
          </P>
          <P>
            Ao consultar um CEP nesta página você recebe o logradouro, o complemento (o trecho da via, quando
            houver), o bairro, a cidade, a UF, o DDD da região, o código IBGE do município e, quando a fonte fornece,
            a latitude e a longitude aproximadas. Esses são os mesmos campos que a{' '}
            <Link href="/apis/cep" className="text-indigo-700 underline">
              API de CEP
            </Link>{' '}
            devolve para sistemas integrados.
          </P>

          <H2 id="como-funciona">Como funciona a consulta</H2>
          <P>
            Ao enviar o formulário, a página chama o endpoint público <code>GET /cep/{'{cep}'}</code> da API da Retech
            Core com uma chave de demonstração. A API verifica primeiro o cache em memória, depois a base própria de
            CEPs já verificados (alimentada em segundo plano a partir de ViaCEP, BrasilAPI e OpenCEP) e, se o CEP
            ainda não estiver lá, consulta o ViaCEP e, em caso de falha, a BrasilAPI. Quando todas as fontes falham, a
            página informa que o CEP não foi encontrado.
          </P>
          <P>
            O rótulo "Fonte" no resultado mostra de onde veio a resposta. "Cache" e "Base própria" indicam que o CEP
            já havia sido consultado antes e foi servido sem acessar nenhum provedor externo, o que costuma levar
            menos de 50 milissegundos de processamento. Na primeira consulta de um CEP, a fonte será ViaCEP ou
            BrasilAPI.
          </P>

          <H2 id="exemplos">Exemplos de consulta</H2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">CEP</th>
                  <th className="p-3 font-semibold">Endereço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-mono">
                    <Link href="/ferramentas/consultar-cep?cep=01310100" className="text-indigo-700 underline">
                      01310-100
                    </Link>
                  </td>
                  <td className="p-3">Avenida Paulista, Bela Vista, São Paulo/SP, DDD 11</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">
                    <Link href="/ferramentas/consultar-cep?cep=20040020" className="text-indigo-700 underline">
                      20040-020
                    </Link>
                  </td>
                  <td className="p-3">Rua da Assembleia, Centro, Rio de Janeiro/RJ, DDD 21</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">
                    <Link href="/ferramentas/consultar-cep?cep=70040010" className="text-indigo-700 underline">
                      70040-010
                    </Link>
                  </td>
                  <td className="p-3">Setor Bancário Norte, Asa Norte, Brasília/DF, DDD 61</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">
                    <Link href="/ferramentas/consultar-cep?cep=88010400" className="text-indigo-700 underline">
                      88010-400
                    </Link>
                  </td>
                  <td className="p-3">Rua Felipe Schmidt, Centro, Florianópolis/SC, DDD 48</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Para navegar por cidade e estado antes de consultar, veja a seção{' '}
            <Link href="/cep" className="text-indigo-700 underline">
              CEPs por estado
            </Link>
            . Se você sabe a rua mas não o CEP, use a ferramenta de{' '}
            <Link href="/ferramentas/buscar-cep" className="text-indigo-700 underline">
              busca de CEP por endereço
            </Link>
            .
          </P>

          <H2 id="para-que-serve">Para que serve consultar o CEP</H2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>
              <strong>Preencher um cadastro ou um checkout</strong> sem erro de digitação no nome da rua, do bairro ou da
              cidade.
            </li>
            <li>
              <strong>Conferir um endereço antes de enviar uma encomenda</strong> ou um documento, evitando devoluções.
            </li>
            <li>
              <strong>Descobrir o código IBGE do município</strong> para emissão de nota fiscal eletrônica ou integração com
              sistemas públicos.
            </li>
            <li>
              <strong>Verificar o DDD</strong> de uma região a partir do endereço.
            </li>
            <li>
              <strong>Ver o formato do JSON</strong> antes de integrar a API de CEP em um sistema.
            </li>
          </ul>

          <H2 id="api">Precisa integrar a consulta de CEP no seu sistema?</H2>
          <P>
            Tudo o que esta página exibe vem da API de CEP, que você pode usar no seu próprio produto. O plano
            gratuito oferece 100 requisições por dia, sem cartão de crédito, e inclui consulta por CEP e busca
            reversa por endereço. Os campos de resposta seguem a convenção do ViaCEP, então migrar um código
            existente costuma se resumir a trocar a URL e adicionar o header da chave. Veja exemplos em Node.js, PHP
            e Python na{' '}
            <Link href="/apis/cep" className="text-indigo-700 underline">
              página da API
            </Link>
            , teste no{' '}
            <Link href="/playground" className="text-indigo-700 underline">
              playground
            </Link>{' '}
            ou leia a{' '}
            <Link href="/docs" className="text-indigo-700 underline">
              documentação
            </Link>
            . Os planos pagos estão em{' '}
            <Link href="/precos" className="text-indigo-700 underline">
              preços
            </Link>
            .
          </P>

          <Faq items={faqs} className="mt-14" />

          <section className="mt-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Integre a consulta de CEP no seu sistema</h2>
            <p className="text-indigo-100 mb-6">API com 100 requisições por dia grátis, sem cartão de crédito.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/painel/register"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
              >
                Criar conta grátis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/apis/cep"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/40 font-semibold hover:bg-white/10 transition-colors"
              >
                Ver a API de CEP
              </Link>
            </div>
          </section>

          <nav aria-label="Páginas relacionadas" className="mt-10 text-sm text-slate-600">
            <p className="font-semibold text-slate-900 mb-2">Relacionados</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/ferramentas/buscar-cep" className="underline hover:text-slate-900">
                  Buscar CEP por endereço
                </Link>
              </li>
              <li>
                <Link href="/apis/cep" className="underline hover:text-slate-900">
                  API de CEP
                </Link>
              </li>
              <li>
                <Link href="/cep" className="underline hover:text-slate-900">
                  CEPs por estado
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/penal" className="underline hover:text-slate-900">
                  Consultar artigo penal
                </Link>
              </li>
              <li>
                <Link href="/blog" className="underline hover:text-slate-900">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </article>
      </main>
    </PublicShell>
  );
}

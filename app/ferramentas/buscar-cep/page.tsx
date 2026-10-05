import Link from 'next/link';
import { Map, ArrowRight } from 'lucide-react';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import Faq, { type FaqItem } from '@/components/seo/faq';
import JsonLd from '@/components/seo/json-ld';
import { ORGANIZATION, absoluteUrl } from '@/lib/seo/site';
import BuscaCepClient from './busca-client';

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
    question: 'Como descobrir o CEP de uma rua?',
    answer:
      'Informe o estado, a cidade e o nome da rua no formulário acima e clique em Buscar CEPs. A ferramenta lista todos os CEPs daquele logradouro, com o trecho (complemento), o bairro e o DDD. Se a rua tiver vários CEPs, escolha o trecho que inclui o número do imóvel.',
  },
  {
    question: 'Preciso digitar o nome completo da rua?',
    answer:
      'Não. A busca aceita nome parcial: "Paulista" encontra "Avenida Paulista", e "Assembleia" encontra "Rua da Assembleia". Evite abreviações como "Av." ou "R." e prefira a parte mais distintiva do nome.',
  },
  {
    question: 'Por que a busca retornou vários CEPs para a mesma rua?',
    answer:
      'Em cidades grandes, os Correios dividem vias longas em trechos, cada um com um CEP próprio, às vezes separando lado par e lado ímpar. O campo de complemento, como "de 612 a 1510 - lado par", indica a faixa de numeração de cada CEP.',
  },
  {
    question: 'A busca de CEP por endereço é gratuita?',
    answer:
      'Sim, e não exige cadastro. A página usa uma chave de demonstração com limite por endereço IP. Para integrar a busca reversa no seu sistema, a API de CEP tem plano gratuito com 100 requisições por dia.',
  },
  {
    question: 'Quais são os requisitos mínimos dos campos?',
    answer:
      'A UF precisa ter 2 letras (SP, RJ, MG). Cidade e logradouro precisam ter pelo menos 3 caracteres. A busca retorna até 50 resultados; se a lista vier cheia, refine o nome da rua.',
  },
  {
    question: 'Minha cidade é pequena e a busca não encontra a rua. O que fazer?',
    answer:
      'Cidades pequenas costumam ter um único CEP para toda a localidade, sem CEP por rua. Nesse caso use a consulta de CEP com o CEP geral do município, ou procure a cidade na seção de CEPs por estado.',
  },
  {
    question: 'De onde vêm os dados?',
    answer:
      'A busca reversa usa a API de CEP da Retech Core, que consulta fontes públicas de CEP com troca automática em caso de falha e guarda os resultados em cache. O rótulo Fonte no resultado indica a origem de cada resposta.',
  },
  {
    question: 'Posso copiar o CEP encontrado?',
    answer:
      'Sim. Cada resultado tem um botão Copiar que coloca o CEP formatado (00000-000) na área de transferência, pronto para colar em um formulário.',
  },
  {
    question: 'Como integrar a busca de CEP por endereço no meu sistema?',
    answer:
      'Use o endpoint GET /cep/buscar da API com os parâmetros uf, cidade e logradouro e o header X-API-Key. A resposta traz results (lista de endereços com CEP), count e source. A página da API de CEP tem exemplos em Node.js, PHP e Python.',
  },
];

export default function BuscarCEPPage() {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Buscar CEP por Endereço',
    url: absoluteUrl('/ferramentas/buscar-cep'),
    description:
      'Ferramenta gratuita de busca reversa de CEP: informe estado, cidade e rua e veja todos os CEPs correspondentes com bairro, trecho e DDD.',
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
            <Breadcrumb items={[{ label: 'Ferramentas', href: '/ferramentas/consultar-cep' }, { label: 'Buscar CEP por endereço' }]} className="mb-8" />
            <div className="text-center">
              <Map className="w-9 h-9 text-indigo-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Buscar CEP por endereço</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Não sabe o CEP? Informe o estado, a cidade e o nome da rua e veja todos os CEPs correspondentes, com o
                trecho da via, o bairro e o DDD.
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-slate-500">
                <li>Gratuito</li>
                <li>Sem cadastro</li>
                <li>Aceita nome parcial da rua</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container max-w-5xl mx-auto px-4 py-8">
          <BuscaCepClient />
        </section>

        <article className="container max-w-4xl mx-auto px-4 pb-20">
          <H2 id="o-que-e">O que é a busca reversa de CEP</H2>
          <P>
            A consulta tradicional parte do CEP e devolve o endereço. A busca reversa faz o caminho contrário: você
            informa o estado, a cidade e o nome da rua, e recebe a lista de CEPs daquele logradouro. É a ferramenta
            certa quando alguém sabe onde mora ou para onde quer enviar uma encomenda, mas não lembra o código, ou
            quando um cadastro antigo tem o endereço escrito por extenso e sem CEP.
          </P>
          <P>
            Como os Correios dividem vias longas em trechos, uma única rua pode ter dezenas de CEPs. O resultado traz,
            para cada CEP, o complemento com a faixa de numeração (por exemplo "de 612 a 1510 - lado par"), o bairro e
            o DDD, para que você escolha o código correto para o número do imóvel.
          </P>

          <H2 id="como-funciona">Como funciona a busca</H2>
          <P>
            Ao enviar o formulário, a página chama o endpoint público <code>GET /cep/buscar</code> da{' '}
            <Link href="/apis/cep" className="text-indigo-700 underline">
              API de CEP
            </Link>{' '}
            da Retech Core com os parâmetros <code>uf</code>, <code>cidade</code> e <code>logradouro</code>. A API
            valida os campos (UF com 2 letras, cidade e logradouro com pelo menos 3 caracteres), verifica se já há
            um resultado em cache para essa combinação e, se não houver, consulta as fontes públicas de CEP. A
            resposta é uma lista com até 50 endereços, cada um com seu CEP.
          </P>
          <P>
            O nome do logradouro pode ser parcial. "Paulista" encontra "Avenida Paulista"; "Assembleia" encontra "Rua
            da Assembleia". Evite abreviações como "Av." e "R." e prefira a parte mais distintiva do nome. Nomes muito
            genéricos, como "Brasil" ou "Sete de Setembro", podem devolver a lista cheia; nesse caso, acrescente mais
            uma palavra do nome.
          </P>

          <H2 id="exemplos">Exemplos de busca</H2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">UF</th>
                  <th className="p-3 font-semibold">Cidade</th>
                  <th className="p-3 font-semibold">Rua</th>
                  <th className="p-3 font-semibold">O que você encontra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3">SP</td>
                  <td className="p-3">São Paulo</td>
                  <td className="p-3">Paulista</td>
                  <td className="p-3">Os CEPs da Avenida Paulista por trecho, como 01310-100 e 01311-000, bairro Bela Vista</td>
                </tr>
                <tr>
                  <td className="p-3">RJ</td>
                  <td className="p-3">Rio de Janeiro</td>
                  <td className="p-3">Atlântica</td>
                  <td className="p-3">Os CEPs da Avenida Atlântica em Copacabana e Leme</td>
                </tr>
                <tr>
                  <td className="p-3">MG</td>
                  <td className="p-3">Belo Horizonte</td>
                  <td className="p-3">Afonso Pena</td>
                  <td className="p-3">Os CEPs da Avenida Afonso Pena, do Centro ao bairro Serra</td>
                </tr>
                <tr>
                  <td className="p-3">SC</td>
                  <td className="p-3">Florianópolis</td>
                  <td className="p-3">Beira Mar</td>
                  <td className="p-3">Os CEPs da Avenida Beira Mar Norte, por trecho</td>
                </tr>
              </tbody>
            </table>
          </div>

          <H2 id="quando-usar">Quando usar a busca por endereço e quando usar a consulta por CEP</H2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>
              <strong>Você tem o CEP e quer o endereço:</strong> use a{' '}
              <Link href="/ferramentas/consultar-cep" className="text-indigo-700 underline">
                consulta de CEP
              </Link>
              . É a forma mais rápida e precisa, porque o CEP identifica o trecho exato.
            </li>
            <li>
              <strong>Você tem o endereço e quer o CEP:</strong> use esta busca e escolha, entre os resultados, o CEP
              cujo complemento inclui o número do imóvel.
            </li>
            <li>
              <strong>Você quer explorar os CEPs de uma cidade:</strong> veja a seção{' '}
              <Link href="/cep" className="text-indigo-700 underline">
                CEPs por estado
              </Link>
              , organizada por UF e município.
            </li>
            <li>
              <strong>Você quer oferecer isso no seu sistema:</strong> integre o endpoint de busca reversa da API de CEP e
              deixe a pessoa escolher o CEP em uma lista.
            </li>
          </ul>

          <H2 id="api">Integre a busca reversa no seu sistema</H2>
          <P>
            O endpoint <code>GET /cep/buscar?uf=SP&cidade=São Paulo&logradouro=Paulista</code> devolve a mesma lista
            que esta página exibe, em JSON, com os campos <code>results</code>, <code>count</code> e{' '}
            <code>source</code>. Ele faz parte da API de CEP, cujo plano gratuito inclui 100 requisições por dia sem
            cartão de crédito. Os exemplos em Node.js, PHP e Python estão na{' '}
            <Link href="/apis/cep" className="text-indigo-700 underline">
              página da API
            </Link>
            ; você também pode testar no{' '}
            <Link href="/playground" className="text-indigo-700 underline">
              playground
            </Link>
            , ler a{' '}
            <Link href="/docs" className="text-indigo-700 underline">
              documentação
            </Link>{' '}
            e comparar os planos em{' '}
            <Link href="/precos" className="text-indigo-700 underline">
              preços
            </Link>
            .
          </P>

          <Faq items={faqs} className="mt-14" />

          <section className="mt-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Integre a busca de CEP no seu sistema</h2>
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
                <Link href="/ferramentas/consultar-cep" className="underline hover:text-slate-900">
                  Consultar CEP
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

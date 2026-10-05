import Link from 'next/link';
import { Scale, ArrowRight } from 'lucide-react';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import Faq, { type FaqItem } from '@/components/seo/faq';
import JsonLd from '@/components/seo/json-ld';
import { ORGANIZATION, absoluteUrl } from '@/lib/seo/site';
import ConsultaPenalClient from './consulta-client';

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
    question: 'Como consultar um artigo do Código Penal nesta ferramenta?',
    answer:
      'Digite o número do artigo no campo acima (por exemplo 121, 155 ou 157) e clique em Consultar. A ferramenta retorna a descrição, o texto do dispositivo, o tipo (crime, contravenção, disposição ou revogado), a legislação, a pena e a localização no título e capítulo da lei.',
  },
  {
    question: 'Como consultar um parágrafo ou inciso específico?',
    answer:
      'Use o identificador completo no formato PREFIXO:ARTIGO.PARAGRAFO.INCISO. Para o inciso II do § 3º do art. 157 (latrocínio), digite CP:157.3.II. Para o § 1º do art. 121 (homicídio privilegiado), digite CP:121.1.',
  },
  {
    question: 'Como consultar artigos de outras leis, como a Lei de Drogas?',
    answer:
      'Cada legislação tem um prefixo curto. Para o art. 33 da Lei de Drogas, digite DRG:33. Se você digitar só o número e ele existir em mais de uma lei, a ferramenta mostra as opções para você escolher. O índice por legislação, logo abaixo do formulário, lista todos os identificadores.',
  },
  {
    question: 'De onde vêm os textos?',
    answer:
      'Dos textos compilados publicados pelo Planalto, com as alterações incorporadas até outubro de 2026. Cada resultado traz o link da fonte oficial e a data da compilação usada.',
  },
  {
    question: 'Quais leis estão disponíveis?',
    answer:
      'O Código Penal completo (Parte Geral e Parte Especial) e 35 leis especiais: Lei de Contravenções Penais, Lei de Drogas, Maria da Penha, Henry Borel, Estatuto do Desarmamento, ECA, Estatuto da Pessoa Idosa, Estatuto da Pessoa com Deficiência, Código de Trânsito, Crimes Ambientais, Código de Defesa do Consumidor, Lei 8.137/90, Lavagem de Dinheiro, Sistema Financeiro Nacional, Mercado de Capitais, Lei Falimentar, Propriedade Industrial, Software, Tortura, Racismo, Organização Criminosa, Crimes Hediondos, Terrorismo, Genocídio, Abuso de Autoridade, Interceptação Telefônica, Código Eleitoral, Transplantes, Biossegurança, Parcelamento do Solo e outras. São 2.438 dispositivos no total.',
  },
  {
    question: 'A consulta é gratuita? Preciso me cadastrar?',
    answer:
      'A ferramenta é gratuita e não exige cadastro. Ela usa uma chave de demonstração com limite por endereço IP. Se você precisa consultar em volume ou integrar no seu sistema, a API de Artigos Penais tem plano gratuito com 100 requisições por dia.',
  },
  {
    question: 'O que significa o tipo "disposicao"?',
    answer:
      'São dispositivos que não tipificam crime nem contravenção, mas trazem regras gerais: definições, causas de exclusão de ilicitude, regras de aplicação da pena, prescrição e normas processuais das leis especiais. Eles não têm pena associada.',
  },
  {
    question: 'Os artigos revogados aparecem?',
    answer:
      'Sim. Eles são marcados com o tipo "revogado" e mantidos para referência, já que ainda podem ser citados em processos antigos ou em estudos de evolução legislativa.',
  },
  {
    question: 'Como ler a pena exibida?',
    answer:
      'O campo Pena mostra a pena privativa de liberdade mínima e máxima prevista no dispositivo, por exemplo "Reclusão, de 6 a 20 anos", e, quando houver, a pena cumulativa de multa. Causas de aumento e diminuição ficam nos parágrafos do mesmo artigo e podem ser consultadas pelo identificador.',
  },
  {
    question: 'Posso compartilhar o resultado?',
    answer:
      'Sim. O botão Compartilhar copia um link direto para o artigo consultado, no formato /ferramentas/penal?codigo=121. Quem abrir o link verá o mesmo resultado.',
  },
];

export default function ConsultarPenalPage() {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Consultar Artigo Penal',
    url: absoluteUrl('/ferramentas/penal'),
    description:
      'Ferramenta gratuita para consultar artigos do Código Penal e de 35 leis especiais brasileiras, com texto oficial, pena e estrutura de parágrafos e incisos.',
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
        <section className="bg-gradient-to-b from-red-50 to-white border-b border-slate-100">
          <div className="container max-w-4xl mx-auto px-4 pt-8 pb-10">
            <Breadcrumb items={[{ label: 'Ferramentas', href: '/ferramentas/consultar-cep' }, { label: 'Consultar artigo penal' }]} className="mb-8" />
            <div className="text-center">
              <Scale className="w-9 h-9 text-red-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Consultar artigo penal grátis</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Digite o número do artigo e veja o texto oficial, a pena mínima e máxima e a posição na lei. Código Penal
                completo e 35 leis especiais, com 2.438 dispositivos.
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-slate-500">
                <li>Gratuito</li>
                <li>Sem cadastro</li>
                <li>Textos compilados do Planalto</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 py-8">
          <ConsultaPenalClient />
        </section>

        <article className="container max-w-4xl mx-auto px-4 pb-20">
          <H2 id="o-que-e">O que é um artigo penal e o que esta ferramenta mostra</H2>
          <P>
            Um artigo penal é a unidade básica de uma lei que define uma conduta proibida e a pena correspondente, ou
            que estabelece regras gerais de aplicação do Direito Penal. O art. 121 do Código Penal, por exemplo, diz
            apenas "Matar alguém" e fixa a pena de reclusão de 6 a 20 anos. Os detalhes que mudam a pena na prática,
            como o homicídio privilegiado (§ 1º) ou o homicídio qualificado (§ 2º), ficam nos parágrafos e incisos do
            mesmo artigo.
          </P>
          <P>
            Esta ferramenta consulta a base de artigos penais da Retech Core e mostra, para cada dispositivo, a
            descrição (o nome usual do crime), o texto integral, o tipo, a legislação, a pena e a localização no
            título e capítulo da norma. Também exibe o identificador único do dispositivo, útil para citar com
            precisão ou para integrar com a{' '}
            <Link href="/apis/penal" className="text-red-700 underline">
              API de Artigos Penais
            </Link>
            .
          </P>

          <H2 id="como-funciona">Como funciona a consulta</H2>
          <P>
            Ao enviar o formulário, a página chama o endpoint público <code>GET /penal/artigos/{'{codigo}'}</code> da
            API com uma chave de demonstração e exibe a resposta. Se você digitar apenas um número, a busca começa pelo
            Código Penal. Se o número não existir no CP mas existir em outra lei, o resultado vem dessa lei. Se existir
            em várias leis, a ferramenta lista as opções para você escolher.
          </P>
          <P>Alguns exemplos de identificadores aceitos:</P>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">Digite</th>
                  <th className="p-3 font-semibold">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-mono">121</td>
                  <td className="p-3">Art. 121 do CP, Homicídio simples, reclusão de 6 a 20 anos</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">CP:121.2.I</td>
                  <td className="p-3">Art. 121, § 2º, I do CP, homicídio qualificado por paga ou promessa de recompensa</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">CP:157.3.II</td>
                  <td className="p-3">Art. 157, § 3º, II do CP, Latrocínio, reclusão de 24 a 30 anos e multa</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">DRG:33</td>
                  <td className="p-3">Art. 33 da Lei 11.343/2006, Tráfico de drogas, reclusão de 5 a 15 anos</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">LCP:42</td>
                  <td className="p-3">Art. 42 da Lei de Contravenções Penais, perturbação do sossego</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            O índice por legislação, disponível no botão "Mostrar índice", carrega todos os artigos da base agrupados
            por lei e permite filtrar pelo nome do crime. É a forma mais rápida de descobrir o identificador de um
            dispositivo de lei especial sem decorar o prefixo.
          </P>

          <H2 id="cobertura">Cobertura: Código Penal e 35 leis especiais</H2>
          <P>
            A base reúne 2.438 dispositivos de 36 legislações: 864 artigos, 761 parágrafos, 731 incisos e 82 alíneas.
            O Código Penal está completo, com os 434 artigos da Parte Geral e da Parte Especial, incluindo as
            qualificadoras, causas de aumento e de diminuição que ficam nos parágrafos. As leis especiais cobertas vão
            da Lei de Contravenções Penais e da Lei de Drogas até normas menos consultadas, como a Lei de Biossegurança
            e a de Parcelamento do Solo Urbano. A lista completa está na página da{' '}
            <Link href="/apis/penal#cobertura" className="text-red-700 underline">
              API de Artigos Penais
            </Link>
            .
          </P>
          <P>
            Os textos vêm das compilações oficiais do Planalto, com as alterações incorporadas até outubro de 2026.
            Cada resultado mostra o link da fonte e a data da compilação, para que você possa conferir o texto na
            origem. Quer ler artigo por artigo, com os parágrafos e incisos relacionados em uma página só? Veja a seção{' '}
            <Link href="/penal/artigos" className="text-red-700 underline">
              Código Penal por artigo
            </Link>
            .
          </P>

          <H2 id="casos-de-uso">Para quem é esta ferramenta</H2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>
              <strong>Estudantes e concurseiros</strong> que precisam conferir rapidamente o texto e a pena de um tipo
              penal durante o estudo.
            </li>
            <li>
              <strong>Advogados, defensores e servidores</strong> que querem citar o dispositivo exato, com parágrafo e
              inciso, em uma peça ou despacho.
            </li>
            <li>
              <strong>Jornalistas e redatores</strong> que precisam checar qual crime corresponde a um artigo mencionado
              em uma notícia ou boletim.
            </li>
            <li>
              <strong>Desenvolvedores</strong> que querem ver o formato dos dados antes de integrar a API em um sistema
              jurídico ou em um autocomplete de petições.
            </li>
          </ul>

          <H2 id="api">Precisa integrar artigos penais no seu sistema?</H2>
          <P>
            Tudo o que esta página exibe vem da API de Artigos Penais, que você pode usar no seu próprio produto. O
            plano gratuito oferece 100 requisições por dia, sem cartão de crédito, e inclui listagem com filtros por
            tipo, legislação e nível, consulta por identificador e busca textual. Veja os exemplos de integração em
            Node.js, PHP e Python na{' '}
            <Link href="/apis/penal" className="text-red-700 underline">
              página da API
            </Link>
            , teste as chamadas no{' '}
            <Link href="/playground" className="text-red-700 underline">
              playground
            </Link>{' '}
            ou consulte a{' '}
            <Link href="/docs" className="text-red-700 underline">
              documentação
            </Link>
            . Os planos pagos estão em{' '}
            <Link href="/precos" className="text-red-700 underline">
              preços
            </Link>
            .
          </P>

          <Faq items={faqs} className="mt-14" />

          <section className="mt-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Integre artigos penais no seu sistema</h2>
            <p className="text-red-100 mb-6">API com 100 requisições por dia grátis, sem cartão de crédito.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/painel/register"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-red-700 font-semibold hover:bg-red-50 transition-colors"
              >
                Criar conta grátis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/apis/penal"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/40 font-semibold hover:bg-white/10 transition-colors"
              >
                Ver a API de Artigos Penais
              </Link>
            </div>
          </section>

          <nav aria-label="Páginas relacionadas" className="mt-10 text-sm text-slate-600">
            <p className="font-semibold text-slate-900 mb-2">Relacionados</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/apis/penal" className="underline hover:text-slate-900">
                  API de Artigos Penais
                </Link>
              </li>
              <li>
                <Link href="/penal/artigos" className="underline hover:text-slate-900">
                  Código Penal por artigo
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/consultar-cep" className="underline hover:text-slate-900">
                  Consultar CEP
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

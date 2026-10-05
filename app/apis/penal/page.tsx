import Link from 'next/link';
import { ArrowRight, Scale, Database, Code2, Zap, Shield, Search, BookOpen } from 'lucide-react';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import Faq, { type FaqItem } from '@/components/seo/faq';
import JsonLd from '@/components/seo/json-ld';
import { API_DOCS_URL, API_PUBLIC_BASE, ORGANIZATION, absoluteUrl } from '@/lib/seo/site';

const BASE = API_PUBLIC_BASE;

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-950 text-slate-100 text-[13px] leading-relaxed p-4 my-4">
      <code>{children}</code>
    </pre>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold text-slate-900 mt-14 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">{children}</h3>;
}

const P = ({ children }: { children: React.ReactNode }) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;

const legislacoes: { nome: string; lei: string }[] = [
  { nome: 'Código Penal (Parte Geral e Parte Especial)', lei: 'Decreto-Lei 2.848/1940' },
  { nome: 'Lei de Contravenções Penais', lei: 'Decreto-Lei 3.688/1941' },
  { nome: 'Lei de Drogas', lei: 'Lei 11.343/2006' },
  { nome: 'Lei Maria da Penha', lei: 'Lei 11.340/2006' },
  { nome: 'Lei Henry Borel', lei: 'Lei 14.344/2022' },
  { nome: 'Estatuto do Desarmamento', lei: 'Lei 10.826/2003' },
  { nome: 'Estatuto da Criança e do Adolescente', lei: 'Lei 8.069/1990' },
  { nome: 'Estatuto da Pessoa Idosa', lei: 'Lei 10.741/2003' },
  { nome: 'Estatuto da Pessoa com Deficiência', lei: 'Lei 13.146/2015' },
  { nome: 'Apoio às pessoas com deficiência (crimes)', lei: 'Lei 7.853/1989' },
  { nome: 'Código de Trânsito Brasileiro (crimes de trânsito)', lei: 'Lei 9.503/1997' },
  { nome: 'Lei de Crimes Ambientais', lei: 'Lei 9.605/1998' },
  { nome: 'Código de Defesa do Consumidor (infrações penais)', lei: 'Lei 8.078/1990' },
  { nome: 'Crimes contra a ordem tributária e econômica', lei: 'Lei 8.137/1990' },
  { nome: 'Crimes contra a economia popular', lei: 'Lei 1.521/1951' },
  { nome: 'Lavagem de dinheiro', lei: 'Lei 9.613/1998' },
  { nome: 'Crimes contra o Sistema Financeiro Nacional', lei: 'Lei 7.492/1986' },
  { nome: 'Crimes contra o mercado de capitais (CVM)', lei: 'Lei 6.385/1976' },
  { nome: 'Crimes falimentares', lei: 'Lei 11.101/2005' },
  { nome: 'Propriedade industrial', lei: 'Lei 9.279/1996' },
  { nome: 'Programas de computador (software)', lei: 'Lei 9.609/1998' },
  { nome: 'Lei de Tortura', lei: 'Lei 9.455/1997' },
  { nome: 'Crimes de racismo', lei: 'Lei 7.716/1989' },
  { nome: 'Discriminação de pessoas com HIV', lei: 'Lei 12.984/2014' },
  { nome: 'Práticas discriminatórias no trabalho', lei: 'Lei 9.029/1995' },
  { nome: 'Organização criminosa', lei: 'Lei 12.850/2013' },
  { nome: 'Crimes hediondos', lei: 'Lei 8.072/1990' },
  { nome: 'Terrorismo', lei: 'Lei 13.260/2016' },
  { nome: 'Genocídio', lei: 'Lei 2.889/1956' },
  { nome: 'Abuso de autoridade', lei: 'Lei 13.869/2019' },
  { nome: 'Interceptação telefônica', lei: 'Lei 9.296/1996' },
  { nome: 'Crimes de responsabilidade de prefeitos', lei: 'Decreto-Lei 201/1967' },
  { nome: 'Código Eleitoral (crimes eleitorais)', lei: 'Lei 4.737/1965' },
  { nome: 'Transplantes de órgãos', lei: 'Lei 9.434/1997' },
  { nome: 'Biossegurança', lei: 'Lei 11.105/2005' },
  { nome: 'Parcelamento do solo urbano', lei: 'Lei 6.766/1979' },
];

const faqs: FaqItem[] = [
  {
    question: 'O que é a API de Artigos Penais da Retech Core?',
    answer:
      'É uma API REST que devolve, em JSON, o texto e os metadados de dispositivos penais brasileiros: artigos, parágrafos, incisos e alíneas do Código Penal e de 35 leis especiais. Cada registro traz descrição, texto completo, tipo (crime, contravenção, disposição ou revogado), legislação, pena mínima e máxima e um identificador único estável.',
  },
  {
    question: 'Quais legislações estão cobertas?',
    answer:
      'São 36 legislações: o Código Penal completo (Parte Geral e Parte Especial, 434 artigos) e 35 leis especiais, entre elas a Lei de Contravenções Penais, Lei de Drogas, Maria da Penha, Henry Borel, Estatuto do Desarmamento, ECA, Estatuto da Pessoa Idosa, Estatuto da Pessoa com Deficiência, Código de Trânsito, Crimes Ambientais, Código de Defesa do Consumidor, Lei 8.137/90, Lavagem de Dinheiro, Sistema Financeiro Nacional, Mercado de Capitais, Lei Falimentar, Propriedade Industrial, Software, Tortura, Racismo, Organização Criminosa, Crimes Hediondos, Terrorismo, Genocídio, Abuso de Autoridade, Interceptação Telefônica, Código Eleitoral, Transplantes, Biossegurança e Parcelamento do Solo.',
  },
  {
    question: 'Quantos dispositivos a base contém?',
    answer:
      'A base reúne 2.438 dispositivos: 864 artigos, 761 parágrafos, 731 incisos e 82 alíneas. Cada um pode ser consultado individualmente pelo seu idUnico, por exemplo CP:121.2.I para o inciso I do § 2º do art. 121 do Código Penal.',
  },
  {
    question: 'De onde vêm os textos? Eles são oficiais?',
    answer:
      'Os textos são extraídos das versões compiladas publicadas pelo Planalto (planalto.gov.br), com as alterações legislativas incorporadas até outubro de 2026. Cada dispositivo retorna o campo fonte com o link da norma e o campo dataAtualizacao com a data da compilação usada.',
  },
  {
    question: 'Como consulto um artigo específico?',
    answer:
      'Use GET /penal/artigos/{codigo}. Para o Código Penal basta o número, como /penal/artigos/121. Para outras leis, ou para parágrafos e incisos, use o idUnico: /penal/artigos/DRG:33 (tráfico, Lei de Drogas) ou /penal/artigos/CP:157.3.II (latrocínio). Se um número existir em mais de uma lei e você não informar o prefixo, a API responde 300 Multiple Choices listando as opções.',
  },
  {
    question: 'Posso buscar por texto, como "matar alguém"?',
    answer:
      'Sim. GET /penal/search?q=matar alguém faz busca textual normalizada (sem acentos e sem diferenciar maiúsculas) na descrição e no texto completo. GET /penal/artigos?q=homicidio também aceita filtro textual e pode ser combinado com tipo, legislacao e nivel.',
  },
  {
    question: 'A API é gratuita?',
    answer:
      'O plano gratuito inclui 100 requisições por dia, sem cartão de crédito, e dá acesso a todos os endpoints de artigos penais. Para volumes maiores existem os planos Starter, Pro, Business e Enterprise, descritos na página de preços.',
  },
  {
    question: 'Como funciona a autenticação?',
    answer:
      'Toda requisição deve enviar o header X-API-Key com a chave gerada no painel do desenvolvedor. A chave precisa ter o escopo penal (ou all). Chaves podem ser revogadas e recriadas a qualquer momento no painel.',
  },
  {
    question: 'Qual o tempo de resposta?',
    answer:
      'Os dispositivos penais são dados estáveis, por isso ficam em cache de longa duração no Redis. Depois da primeira leitura, a resposta sai do cache sem tocar no banco. O header X-Server-Time-Ms informa o tempo de processamento interno de cada chamada.',
  },
  {
    question: 'Os artigos revogados aparecem?',
    answer:
      'Sim, com tipo igual a revogado, para que sistemas jurídicos consigam exibir a referência histórica. Use o filtro tipo=crime ou tipo=contravencao para listar apenas dispositivos vigentes que tipificam condutas.',
  },
  {
    question: 'Posso usar a API em um autocomplete de petições?',
    answer:
      'Esse é um dos usos mais comuns. Chame GET /penal/artigos?nivel=artigo uma vez, guarde a lista no cliente e filtre localmente, ou use o parâmetro q a cada digitação. Os campos codigoFormatado e descricao foram desenhados para serem exibidos diretamente na sugestão.',
  },
  {
    question: 'Com que frequência a base é atualizada?',
    answer:
      'A base é reprocessada quando há alteração legislativa relevante nas normas cobertas. O campo dataAtualizacao de cada dispositivo indica a compilação em vigor e o campo hashConteudo permite detectar mudanças de texto entre versões.',
  },
];

export default function APIPenalPage() {
  const webApi = {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'API de Artigos Penais - Retech Core',
    description:
      'API REST com 2.438 dispositivos penais brasileiros (Código Penal e 35 leis especiais) em JSON: artigos, parágrafos, incisos, alíneas, tipo, legislação e penas.',
    url: absoluteUrl('/apis/penal'),
    documentation: API_DOCS_URL,
    termsOfService: absoluteUrl('/legal/termos'),
    inLanguage: 'pt-BR',
    provider: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL', description: 'Plano gratuito com 100 requisições por dia' },
  };

  return (
    <PublicShell>
      <JsonLd data={webApi} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-red-50 to-white border-b border-slate-100">
          <div className="container max-w-6xl mx-auto px-4 pt-8 pb-14">
            <Breadcrumb items={[{ label: 'APIs', href: '/#apis' }, { label: 'API de Artigos Penais' }]} className="mb-8" />
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full mb-5">
                  <Scale className="w-3.5 h-3.5" /> Dados jurídicos
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                  API de Artigos Penais: Código Penal e leis especiais em JSON
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Consulte 2.438 dispositivos penais de 36 legislações brasileiras por código, por texto ou por filtros.
                  Cada resposta traz descrição, texto completo, tipo, legislação, pena mínima e máxima, com a estrutura
                  hierárquica de artigos, parágrafos, incisos e alíneas preservada.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/painel/register"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                  >
                    Criar chave grátis <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/ferramentas/penal"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Testar no navegador
                  </Link>
                  <a
                    href={API_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Documentação OpenAPI
                  </a>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                  <li>100 requisições/dia grátis</li>
                  <li>Sem cartão de crédito</li>
                  <li>Textos compilados do Planalto</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-950 text-slate-100 p-5 shadow-xl text-[13px] leading-relaxed overflow-x-auto">
                <p className="text-slate-400 mb-2">GET {BASE}/penal/artigos/121</p>
                <pre>
                  <code>{`{
  "success": true,
  "data": {
    "codigo": "121",
    "codigoFormatado": "Art. 121 do CP",
    "idUnico": "CP:121",
    "descricao": "Homicídio simples",
    "textoCompleto": "Matar alguém:",
    "tipo": "crime",
    "nivel": "artigo",
    "legislacao": "CP",
    "legislacaoNome": "Código Penal",
    "titulo": "Título I – Dos Crimes contra a Pessoa",
    "capitulo": "Capítulo I – Dos Crimes contra a Vida",
    "penaMin": "Reclusão, de 6 a 20 anos",
    "fonte": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="container max-w-6xl mx-auto px-4 py-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['2.438', 'dispositivos penais'],
              ['36', 'legislações cobertas'],
              ['864', 'artigos (434 só do Código Penal)'],
              ['1.574', 'parágrafos, incisos e alíneas'],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-slate-200 p-5 flex flex-col-reverse">
                <dt className="text-sm text-slate-500">{l}</dt>
                <dd className="text-3xl font-bold text-slate-900">{n}</dd>
              </div>
            ))}
          </dl>
        </section>

        <article className="container max-w-4xl mx-auto px-4 pb-20">
          <H2 id="o-que-e">O que é a API de Artigos Penais e para que serve</H2>
          <P>
            A API de Artigos Penais é um serviço HTTP que entrega o conteúdo das normas penais brasileiras em formato
            estruturado. Em vez de copiar trechos do Código Penal para dentro do seu sistema, ou de raspar o site do
            Planalto a cada consulta, você faz uma requisição GET e recebe um JSON com o dispositivo pedido, seu texto
            integral e os metadados necessários para exibir, filtrar e relacionar artigos.
          </P>
          <P>
            Ela foi construída para quem desenvolve software jurídico: sistemas de gestão de escritórios, plataformas de
            peticionamento, ferramentas de triagem de boletins de ocorrência, assistentes de redação, dashboards de
            compliance e aplicativos educacionais para concursos e faculdades de Direito. Em todos esses casos o problema
            é o mesmo: a legislação penal está espalhada por dezenas de leis, muda com frequência e precisa ser citada
            com precisão de parágrafo e inciso.
          </P>
          <P>
            Cada dispositivo recebe um identificador único e estável, o <code>idUnico</code>, formado por um prefixo
            curto da legislação e pela posição hierárquica do dispositivo. <code>CP:121</code> é o caput do art. 121 do
            Código Penal; <code>CP:121.2.I</code> é o inciso I do § 2º do mesmo artigo (homicídio qualificado mediante
            paga ou promessa de recompensa); <code>DRG:33</code> é o art. 33 da Lei de Drogas (tráfico). Esse
            identificador pode ser persistido no seu banco como chave estrangeira sem medo de colisão entre leis.
          </P>

          <H2 id="como-funciona">Como funciona: endpoints, exemplo real de request e resposta</H2>
          <P>
            A API expõe três endpoints de leitura, todos autenticados pelo header <code>X-API-Key</code>. A URL base
            de produção é <code>{BASE}</code>.
          </P>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">Endpoint</th>
                  <th className="p-3 font-semibold">O que faz</th>
                  <th className="p-3 font-semibold">Parâmetros</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-mono text-xs whitespace-nowrap">GET /penal/artigos</td>
                  <td className="p-3">Lista dispositivos com filtros. Sem filtros devolve a base inteira (ideal para autocomplete).</td>
                  <td className="p-3">
                    <code>q</code>, <code>tipo</code> (crime, contravencao, disposicao, revogado), <code>legislacao</code>,{' '}
                    <code>nivel</code> (artigo, paragrafo, inciso, alinea)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs whitespace-nowrap">GET /penal/artigos/{'{codigo}'}</td>
                  <td className="p-3">Retorna um dispositivo específico com texto completo, penas, título e capítulo.</td>
                  <td className="p-3">
                    número simples (<code>121</code>) ou idUnico (<code>CP:121.2.I</code>, <code>DRG:33</code>)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs whitespace-nowrap">GET /penal/search</td>
                  <td className="p-3">Busca textual na descrição e no texto completo, sem acentos e sem distinguir maiúsculas.</td>
                  <td className="p-3">
                    <code>q</code> (obrigatório)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <H3>Exemplo 1: consultar o art. 157, § 3º, II (latrocínio)</H3>
          <P>
            O latrocínio não é um artigo próprio: é o inciso II do § 3º do art. 157 do Código Penal. Com o idUnico você
            chega direto nele, sem precisar baixar o artigo inteiro e navegar na árvore.
          </P>
          <Code>{`curl "${BASE}/penal/artigos/CP:157.3.II" \\
  -H "X-API-Key: rtc_sua_chave_aqui"`}</Code>
          <Code>{`{
  "success": true,
  "code": "OK",
  "data": {
    "codigo": "157.3.II",
    "codigoFormatado": "Art. 157, § 3º, II do CP",
    "idUnico": "CP:157.3.II",
    "artigo": 157,
    "paragrafo": 3,
    "inciso": "II",
    "nivel": "inciso",
    "descricao": "Latrocínio",
    "textoCompleto": "morte, a pena é de reclusão, de 24 (vinte e quatro) a 30 (trinta) anos, e multa.",
    "tipo": "crime",
    "legislacao": "CP",
    "legislacaoNome": "Código Penal",
    "titulo": "Título II – Dos Crimes contra o Patrimônio",
    "capitulo": "Capítulo II – Do Roubo e da Extorsão",
    "penaMin": "Reclusão, de 24 a 30 anos",
    "penaMax": "e multa",
    "fonte": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
    "dataAtualizacao": "outubro/2026"
  }
}`}</Code>

          <H3>Exemplo 2: listar só os crimes da Lei de Drogas</H3>
          <Code>{`curl "${BASE}/penal/artigos?legislacao=Lei%2011.343/2006&tipo=crime&nivel=artigo" \\
  -H "X-API-Key: rtc_sua_chave_aqui"`}</Code>
          <Code>{`{
  "success": true,
  "code": "OK",
  "data": [
    { "codigo": "28", "codigoFormatado": "Art. 28 da Lei 11.343/2006", "descricao": "Porte de drogas para consumo pessoal", "tipo": "crime", "nivel": "artigo", "legislacao": "Lei 11.343/2006", "legislacaoNome": "Lei de Drogas", "idUnico": "DRG:28" },
    { "codigo": "33", "codigoFormatado": "Art. 33 da Lei 11.343/2006", "descricao": "Tráfico de drogas", "tipo": "crime", "nivel": "artigo", "legislacao": "Lei 11.343/2006", "legislacaoNome": "Lei de Drogas", "idUnico": "DRG:33" },
    { "codigo": "34", "codigoFormatado": "Art. 34 da Lei 11.343/2006", "descricao": "Tráfico de maquinário, aparelho ou objeto para fabricação de drogas", "tipo": "crime", "nivel": "artigo", "legislacao": "Lei 11.343/2006", "legislacaoNome": "Lei de Drogas", "idUnico": "DRG:34" }
  ],
  "meta": { "total": 3, "query": "", "nivel": "artigo" }
}`}</Code>
          <P>
            A listagem retorna um resumo de cada dispositivo (código, descrição, tipo, nível, legislação e idUnico). Para
            obter texto completo e penas, chame o endpoint individual com o idUnico recebido. Quando um número existe
            em mais de uma lei, como o art. 33, e você consulta apenas <code>/penal/artigos/33</code>, a API tenta o
            Código Penal primeiro; se não houver no CP e houver em várias leis, responde <code>300 Multiple Choices</code>{' '}
            com a lista de opções e a sugestão de usar o prefixo.
          </P>

          <H3>Exemplo 3: busca por texto</H3>
          <Code>{`curl "${BASE}/penal/search?q=matar%20alguem" \\
  -H "X-API-Key: rtc_sua_chave_aqui"`}</Code>
          <P>
            A busca é normalizada: aceita "matar alguem" sem acento e sem diferenciar maiúsculas. O retorno é a mesma
            lista resumida do endpoint de listagem, com o campo <code>meta.total</code>.
          </P>

          <H3>Erros</H3>
          <P>
            Os erros seguem o padrão RFC 7807 (Problem Details). Um dispositivo inexistente devolve 404 com{' '}
            <code>detail</code> explicando o formato esperado; um parâmetro <code>nivel</code> inválido devolve 400; uma
            chave sem o escopo <code>penal</code> devolve 403; e o estouro da cota diária devolve 429 com os headers de
            rate limit.
          </P>

          <H2 id="como-integrar">Como integrar em Node.js, PHP e Python</H2>
          <P>
            A integração é uma chamada HTTP GET com um header. Abaixo, três exemplos completos que consultam o art. 121
            e imprimem descrição e pena. Substitua <code>rtc_sua_chave_aqui</code> pela chave criada no painel.
          </P>
          <H3>Node.js (fetch nativo, Node 18+)</H3>
          <Code>{`const BASE = '${BASE}';
const headers = { 'X-API-Key': process.env.RETECH_API_KEY };

async function artigo(codigo) {
  const res = await fetch(\`\${BASE}/penal/artigos/\${encodeURIComponent(codigo)}\`, { headers });
  if (res.status === 300) {
    const multi = await res.json();
    throw new Error('Ambíguo: ' + multi.data.legislacoes.join(', '));
  }
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const { data } = await res.json();
  return data;
}

const a = await artigo('121');
console.log(a.codigoFormatado, '-', a.descricao, '|', a.penaMin);
// Art. 121 do CP - Homicídio simples | Reclusão, de 6 a 20 anos

// autocomplete: carrega só os artigos (sem parágrafos/incisos) uma vez
const lista = await fetch(\`\${BASE}/penal/artigos?nivel=artigo\`, { headers }).then(r => r.json());
console.log(lista.meta.total, 'artigos para o autocomplete');`}</Code>

          <H3>PHP (cURL)</H3>
          <Code>{`<?php
$base = '${BASE}';
$codigo = 'CP:157.3.II';

$ch = curl_init("$base/penal/artigos/" . rawurlencode($codigo));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['X-API-Key: ' . getenv('RETECH_API_KEY'), 'Accept: application/json'],
    CURLOPT_TIMEOUT        => 10,
]);
$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200) {
    throw new RuntimeException("Erro HTTP $status: $body");
}
$artigo = json_decode($body, true)['data'];
echo $artigo['codigoFormatado'], ' - ', $artigo['descricao'], PHP_EOL;
echo 'Pena: ', $artigo['penaMin'], ' ', $artigo['penaMax'] ?? '', PHP_EOL;
// Art. 157, § 3º, II do CP - Latrocínio
// Pena: Reclusão, de 24 a 30 anos e multa`}</Code>

          <H3>Python (requests)</H3>
          <Code>{`import os
import requests

BASE = "${BASE}"
HEADERS = {"X-API-Key": os.environ["RETECH_API_KEY"]}

def buscar(texto: str):
    r = requests.get(f"{BASE}/penal/search", params={"q": texto}, headers=HEADERS, timeout=10)
    r.raise_for_status()
    return r.json()["data"]

for d in buscar("violencia domestica"):
    print(d["idUnico"], d["codigoFormatado"], "-", d["descricao"])

# filtros combinados: só contravenções, só artigos
r = requests.get(f"{BASE}/penal/artigos", params={"tipo": "contravencao", "nivel": "artigo"}, headers=HEADERS)
print(r.json()["meta"]["total"], "contravenções")`}</Code>
          <P>
            Para explorar os endpoints sem escrever código, use o{' '}
            <Link href="/playground" className="text-red-700 underline">
              playground interativo
            </Link>{' '}
            ou a{' '}
            <Link href="/docs" className="text-red-700 underline">
              documentação completa
            </Link>
            , que inclui a especificação OpenAPI e os códigos de erro.
          </P>

          <H2 id="cobertura">Cobertura dos dados: 36 legislações, 2.438 dispositivos</H2>
          <P>
            A base foi montada a partir dos textos compilados do Planalto, com as alterações incorporadas até outubro de
            2026, e passa por um processo de extração que preserva a hierarquia de cada norma. Isso significa que o § 2º
            do art. 121 é um registro próprio, filho do art. 121, e cada inciso dele é outro registro, filho do
            parágrafo. Os campos <code>parte</code>, <code>titulo</code> e <code>capitulo</code> permitem reconstruir o
            índice do Código Penal no seu produto.
          </P>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 my-6 text-sm">
            {legislacoes.map((l) => (
              <div key={l.lei} className="flex justify-between gap-3 py-1.5 border-b border-slate-100">
                <span className="text-slate-700">{l.nome}</span>
                <span className="text-slate-400 whitespace-nowrap">{l.lei}</span>
              </div>
            ))}
          </div>
          <P>
            Os dispositivos são classificados em quatro tipos. <strong>crime</strong> e{' '}
            <strong>contravencao</strong> identificam os tipos penais propriamente ditos, com pena associada.{' '}
            <strong>disposicao</strong> cobre regras gerais sem pena, como as da Parte Geral do Código Penal (tempo do
            crime, concurso de pessoas, prescrição) e os artigos processuais das leis especiais.{' '}
            <strong>revogado</strong> marca dispositivos que deixaram de vigorar, mantidos para referência histórica.
          </P>
          <P>
            Quer navegar artigo por artigo antes de integrar? A seção{' '}
            <Link href="/penal/artigos" className="text-red-700 underline">
              Código Penal por artigo
            </Link>{' '}
            publica cada dispositivo em uma página própria, com os parágrafos e incisos relacionados, e serve como
            referência pública do mesmo conteúdo que a API entrega.
          </P>

          <H2 id="precos">Preços e limites</H2>
          <P>
            O plano gratuito oferece 100 requisições por dia e acesso a todos os endpoints desta API, sem cartão de
            crédito. Como a base de artigos é estável, muitos projetos cabem nesse limite: basta carregar a lista uma
            vez por dia e consultar dispositivos individuais sob demanda. Para aplicações com mais tráfego, os planos
            Starter, Pro, Business e Enterprise ampliam a cota diária e o limite por minuto. Veja a tabela completa em{' '}
            <Link href="/precos" className="text-red-700 underline">
              preços e planos
            </Link>
            .
          </P>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>Autenticação por chave (<code>X-API-Key</code>) com escopos por API; a chave pode ser restrita apenas a artigos penais.</li>
            <li>Headers de rate limit em todas as respostas para você acompanhar o consumo.</li>
            <li>Painel com histórico de uso, logs e gestão de várias chaves por conta.</li>
            <li>Sem contrato de fidelidade: o upgrade e o downgrade acontecem no painel.</li>
          </ul>

          <H2 id="comparacao">Por que não raspar o Planalto ou manter uma planilha</H2>
          <P>
            A alternativa mais comum à API é manter uma tabela própria de artigos, preenchida à mão ou extraída do HTML
            do Planalto. Funciona no começo, mas cria três problemas recorrentes: o texto desatualiza a cada reforma
            legislativa, a estrutura de parágrafos e incisos fica achatada em uma única string, e cada lei nova exige
            um novo trabalho de extração. A API resolve isso centralizando a compilação, versionando o conteúdo com{' '}
            <code>hashConteudo</code> e expondo a hierarquia como registros independentes.
          </P>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">Critério</th>
                  <th className="p-3 font-semibold">Planilha ou scraping próprio</th>
                  <th className="p-3 font-semibold">API de Artigos Penais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3">Hierarquia</td>
                  <td className="p-3">Geralmente um texto por artigo</td>
                  <td className="p-3">Artigo, parágrafo, inciso e alínea como registros próprios</td>
                </tr>
                <tr>
                  <td className="p-3">Identificador</td>
                  <td className="p-3">Número do artigo (colide entre leis)</td>
                  <td className="p-3">idUnico com prefixo da lei (CP:121, DRG:33)</td>
                </tr>
                <tr>
                  <td className="p-3">Penas</td>
                  <td className="p-3">Dentro do texto, sem campo próprio</td>
                  <td className="p-3">Campos penaMin e penaMax separados</td>
                </tr>
                <tr>
                  <td className="p-3">Busca</td>
                  <td className="p-3">LIKE no banco, sensível a acento</td>
                  <td className="p-3">Busca normalizada por descrição e texto</td>
                </tr>
                <tr>
                  <td className="p-3">Atualização</td>
                  <td className="p-3">Manual, por lei</td>
                  <td className="p-3">Centralizada, com data e hash por dispositivo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <H2 id="casos-de-uso">Casos de uso</H2>
          <div className="grid sm:grid-cols-2 gap-5 my-6">
            {[
              {
                icon: Search,
                t: 'Autocomplete em petições e BOs',
                d: 'Ao digitar "157" ou "roubo", o sistema sugere o artigo com o codigoFormatado e preenche a capitulação com o idUnico, evitando erro de digitação na peça.',
              },
              {
                icon: Database,
                t: 'Sistemas de gestão jurídica',
                d: 'Vincule cada processo aos dispositivos imputados por idUnico e gere relatórios por tipo penal, legislação ou faixa de pena.',
              },
              {
                icon: Code2,
                t: 'Assistentes e chatbots jurídicos',
                d: 'Use a busca textual como etapa de recuperação (RAG) para que o modelo responda com o texto oficial do dispositivo e a fonte do Planalto.',
              },
              {
                icon: BookOpen,
                t: 'Educação e concursos',
                d: 'Monte flashcards, quizzes e simulados a partir dos artigos e das penas, filtrando por legislação ou por capítulo do Código Penal.',
              },
              {
                icon: Shield,
                t: 'Compliance e segurança corporativa',
                d: 'Mapeie condutas de risco (lavagem, crimes contra o SFN, Lei 8.137) para os dispositivos correspondentes e mantenha o material de treinamento atualizado.',
              },
              {
                icon: Zap,
                t: 'Dosimetria e calculadoras de pena',
                d: 'Parta de penaMin e penaMax do tipo penal e aplique as causas de aumento e diminuição, que também estão na base como parágrafos e incisos.',
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-slate-200 p-5">
                <c.icon className="w-5 h-5 text-red-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{c.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <Faq items={faqs} className="mt-16" />

          <section className="mt-16 rounded-2xl bg-slate-950 text-white p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Comece com 100 requisições por dia, grátis</h2>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Crie sua conta, gere uma chave com escopo penal e faça a primeira chamada em menos de cinco minutos. Sem
              cartão de crédito.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/painel/register"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
              >
                Criar conta grátis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 font-semibold hover:bg-white/10 transition-colors"
              >
                Abrir playground
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Guias no blog
              </Link>
            </div>
          </section>

          <nav aria-label="Páginas relacionadas" className="mt-12 text-sm text-slate-600">
            <p className="font-semibold text-slate-900 mb-2">Relacionados</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/ferramentas/penal" className="underline hover:text-slate-900">
                  Consultar artigo penal (ferramenta grátis)
                </Link>
              </li>
              <li>
                <Link href="/penal/artigos" className="underline hover:text-slate-900">
                  Código Penal por artigo
                </Link>
              </li>
              <li>
                <Link href="/apis/cep" className="underline hover:text-slate-900">
                  API de CEP
                </Link>
              </li>
              <li>
                <Link href="/docs" className="underline hover:text-slate-900">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/precos" className="underline hover:text-slate-900">
                  Preços
                </Link>
              </li>
            </ul>
          </nav>
        </article>
      </main>
    </PublicShell>
  );
}

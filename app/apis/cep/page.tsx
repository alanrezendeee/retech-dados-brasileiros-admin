import Link from 'next/link';
import { ArrowRight, MapPin, Database, Code2, Zap, Shield, Search, Truck, ShoppingCart, FileText } from 'lucide-react';
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

const faqs: FaqItem[] = [
  {
    question: 'O que é a API de CEP da Retech Core?',
    answer:
      'É uma API REST que recebe um CEP de 8 dígitos e devolve o endereço em JSON: logradouro, complemento, bairro, cidade, UF, código IBGE do município, DDD e, quando disponível, latitude e longitude. Também faz o caminho inverso: a partir de UF, cidade e logradouro, devolve a lista de CEPs correspondentes.',
  },
  {
    question: 'Qual a diferença para usar o ViaCEP ou a BrasilAPI diretamente?',
    answer:
      'A Retech Core usa ViaCEP, BrasilAPI e OpenCEP como fontes: na consulta em tempo real troca automaticamente do ViaCEP para a BrasilAPI quando uma delas falha ou demora, e em segundo plano um crawler alterna entre as três para alimentar a base própria. O resultado é guardado em cache em três camadas (Redis, MongoDB e PostgreSQL), então a maior parte das consultas não depende de nenhum provedor externo. Você integra um único contrato de resposta e ganha chave de API, painel de uso e limites previsíveis.',
  },
  {
    question: 'Qual é o tempo de resposta?',
    answer:
      'Quando o CEP está em cache, a resposta típica fica abaixo de 50 ms de processamento no servidor. Na primeira consulta de um CEP ainda não cacheado, o tempo depende da fonte externa consultada. O header X-Server-Time-Ms informa o tempo de processamento interno de cada chamada.',
  },
  {
    question: 'Quantas requisições posso fazer de graça?',
    answer:
      'O plano gratuito oferece 100 requisições por dia, sem cartão de crédito, com acesso aos endpoints de consulta por CEP e de busca por endereço. Planos pagos ampliam a cota diária e o limite por minuto.',
  },
  {
    question: 'Como funciona a autenticação?',
    answer:
      'Envie o header X-API-Key com a chave criada no painel do desenvolvedor. A chave precisa ter o escopo cep (ou all). Você pode criar várias chaves por conta, por exemplo uma por ambiente, e revogar qualquer uma delas no painel.',
  },
  {
    question: 'O que significa o campo "source" na resposta?',
    answer:
      'Indica de onde veio o dado daquela resposta: redis-cache, postgres (base própria, alimentada pelo crawler a partir de ViaCEP, BrasilAPI e OpenCEP), mongodb-cache, viacep ou brasilapi. É útil para depuração e para medir quanto das suas consultas está sendo servido do cache.',
  },
  {
    question: 'A API retorna latitude e longitude?',
    answer:
      'Sim, quando a fonte consultada fornece coordenadas para o CEP. Os campos latitude e longitude são omitidos da resposta quando não há coordenada disponível, então trate-os como opcionais.',
  },
  {
    question: 'Como faço busca de CEP por endereço (busca reversa)?',
    answer:
      'Use GET /cep/buscar com os parâmetros uf, cidade e logradouro. Cidade e logradouro precisam ter pelo menos 3 caracteres e a UF deve ter 2 letras. A resposta traz results (lista de endereços com CEP), count e source.',
  },
  {
    question: 'O que acontece quando o CEP não existe?',
    answer:
      'A API responde 404 com um corpo no formato RFC 7807 (type, title, status, detail). CEPs com formato inválido, como menos de 8 dígitos, recebem 400. Esses erros não consomem a cota diária de forma diferente das respostas com sucesso.',
  },
  {
    question: 'Os dados são atualizados?',
    answer:
      'As entradas de cache têm prazo de validade configurável e são renovadas a partir das fontes quando expiram. A camada PostgreSQL guarda a data da última verificação de cada CEP, então um endereço que mudou nos Correios é atualizado no próximo ciclo.',
  },
  {
    question: 'Posso usar a API no frontend, direto do navegador?',
    answer:
      'Para produção, recomendamos chamar a API a partir do seu backend ou de uma função serverless, para não expor a chave. Para testes rápidos existe o playground e as ferramentas públicas de consulta e busca de CEP, que usam uma chave de demonstração com limite por IP.',
  },
  {
    question: 'Existe SDK oficial?',
    answer:
      'A API é HTTP puro com JSON, então qualquer cliente HTTP funciona. Esta página traz exemplos em Node.js, PHP e Python, e a documentação OpenAPI permite gerar clientes tipados para outras linguagens.',
  },
];

export default function APICEPPage() {
  const webApi = {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'API de CEP - Retech Core',
    description:
      'API REST de consulta de CEP e busca de CEP por endereço, em JSON, com múltiplas fontes (ViaCEP, BrasilAPI, OpenCEP), fallback automático e cache em três camadas.',
    url: absoluteUrl('/apis/cep'),
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
        <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-slate-100">
          <div className="container max-w-6xl mx-auto px-4 pt-8 pb-14">
            <Breadcrumb items={[{ label: 'APIs', href: '/#apis' }, { label: 'API de CEP' }]} className="mb-8" />
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full mb-5">
                  <MapPin className="w-3.5 h-3.5" /> Endereços
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                  API de CEP gratuita: endereço completo em JSON, com cache e fallback
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Consulte qualquer CEP do Brasil e receba logradouro, bairro, cidade, UF, código IBGE, DDD e
                  coordenadas. Três fontes com troca automática em caso de falha, cache em três camadas e um único
                  contrato de resposta. Também faz busca reversa: do endereço para o CEP.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/painel/register"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Criar chave grátis <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/ferramentas/consultar-cep"
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
                  <li>Resposta típica abaixo de 50 ms em cache</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-950 text-slate-100 p-5 shadow-xl text-[13px] leading-relaxed overflow-x-auto">
                <p className="text-slate-400 mb-2">GET {BASE}/cep/01310100</p>
                <pre>
                  <code>{`{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "de 612 a 1510 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "ddd": "11",
  "latitude": -23.5648,
  "longitude": -46.6522,
  "source": "redis-cache"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="container max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              [Database, '3 fontes', 'ViaCEP, BrasilAPI e OpenCEP com fallback automático'],
              [Zap, '3 camadas de cache', 'Redis, MongoDB e PostgreSQL'],
              [Search, '2 sentidos', 'CEP para endereço e endereço para CEP'],
              [Shield, 'Chave e escopo', 'X-API-Key com escopo cep e painel de uso'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Database;
              return (
                <div key={t as string} className="rounded-xl border border-slate-200 p-5">
                  <I className="w-5 h-5 text-indigo-600 mb-3" />
                  <p className="font-semibold text-slate-900">{t as string}</p>
                  <p className="text-sm text-slate-500">{d as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        <article className="container max-w-4xl mx-auto px-4 pb-20">
          <H2 id="o-que-e">O que é a API de CEP e para que serve</H2>
          <P>
            O CEP (Código de Endereçamento Postal) é o código de oito dígitos que os Correios usam para identificar
            logradouros, trechos de logradouro, bairros e localidades em todo o Brasil. Em sistemas de software, o CEP
            é a chave mais confiável para padronizar endereços: a partir dele, um formulário pode preencher rua, bairro,
            cidade e estado sem que a pessoa digite nada, e um sistema de logística pode calcular frete e roteirizar
            entregas com dados consistentes.
          </P>
          <P>
            A API de CEP da Retech Core expõe essa consulta como um endpoint HTTP com resposta em JSON. Você envia o
            CEP e recebe o endereço estruturado, com o código IBGE do município (útil para integrações com notas
            fiscais e sistemas públicos), o DDD da região e, quando disponível, as coordenadas geográficas. O endpoint
            de busca reversa resolve o problema oposto: quando a pessoa sabe a rua e a cidade, mas não o CEP.
          </P>
          <P>
            Em vez de depender de um único provedor público, a API consulta três fontes e mantém o resultado em cache
            próprio. Para quem integra, isso significa um único contrato de resposta, uma única chave, e menos
            incidentes quando um dos provedores públicos fica instável.
          </P>

          <H2 id="como-funciona">Como funciona: endpoints, exemplo real de request e resposta</H2>
          <P>
            A API tem dois endpoints de leitura, ambos autenticados pelo header <code>X-API-Key</code>. A URL base de
            produção é <code>{BASE}</code>.
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
                  <td className="p-3 font-mono text-xs whitespace-nowrap">GET /cep/{'{cep}'}</td>
                  <td className="p-3">Retorna o endereço de um CEP de 8 dígitos (com ou sem hífen).</td>
                  <td className="p-3">
                    <code>cep</code> na URL
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs whitespace-nowrap">GET /cep/buscar</td>
                  <td className="p-3">Busca reversa: lista os CEPs de um logradouro em uma cidade.</td>
                  <td className="p-3">
                    <code>uf</code> (2 letras), <code>cidade</code> (mín. 3 caracteres), <code>logradouro</code> (mín. 3 caracteres)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <H3>Exemplo 1: consultar um CEP</H3>
          <Code>{`curl "${BASE}/cep/01310100" \\
  -H "X-API-Key: rtc_sua_chave_aqui"`}</Code>
          <Code>{`HTTP/1.1 200 OK
Content-Type: application/json
X-Server-Time-Ms: 1.84

{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "de 612 a 1510 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "ddd": "11",
  "latitude": -23.5648,
  "longitude": -46.6522,
  "source": "redis-cache",
  "cachedAt": "2026-10-01T12:34:56Z"
}`}</Code>
          <P>
            Os campos <code>complemento</code>, <code>ibge</code>, <code>ddd</code>, <code>latitude</code>,{' '}
            <code>longitude</code> e <code>cachedAt</code> são omitidos quando não há valor. O campo{' '}
            <code>source</code> informa a origem daquela resposta: <code>redis-cache</code>, <code>postgres</code>,{' '}
            <code>mongodb-cache</code>, <code>viacep</code> ou <code>brasilapi</code>.
          </P>

          <H3>Exemplo 2: buscar CEPs pelo endereço</H3>
          <Code>{`curl "${BASE}/cep/buscar?uf=SP&cidade=S%C3%A3o%20Paulo&logradouro=Paulista" \\
  -H "X-API-Key: rtc_sua_chave_aqui"`}</Code>
          <Code>{`{
  "results": [
    { "cep": "01310-100", "logradouro": "Avenida Paulista", "complemento": "de 612 a 1510 - lado par", "bairro": "Bela Vista", "localidade": "São Paulo", "uf": "SP", "ibge": "3550308", "ddd": "11" },
    { "cep": "01310-200", "logradouro": "Avenida Paulista", "complemento": "de 1512 a 2132 - lado par", "bairro": "Bela Vista", "localidade": "São Paulo", "uf": "SP", "ibge": "3550308", "ddd": "11" },
    { "cep": "01311-000", "logradouro": "Avenida Paulista", "complemento": "até 610 - lado par", "bairro": "Bela Vista", "localidade": "São Paulo", "uf": "SP", "ibge": "3550308", "ddd": "11" }
  ],
  "count": 3,
  "source": "viacep"
}`}</Code>
          <P>
            A busca reversa aceita nome parcial do logradouro ("Paulista" encontra "Avenida Paulista") e devolve até
            50 resultados. Quanto mais específico o logradouro, menor e mais precisa a lista. O resultado também é
            cacheado, então buscas repetidas pela mesma combinação são servidas sem consultar a fonte.
          </P>

          <H3>Erros</H3>
          <P>
            Os erros seguem o padrão RFC 7807. CEP com formato inválido devolve 400; CEP inexistente em todas as fontes
            devolve 404; chave sem o escopo <code>cep</code> devolve 403; e o estouro da cota devolve 429 com os headers
            de rate limit indicando quando a janela reinicia.
          </P>

          <H2 id="como-integrar">Como integrar em Node.js, PHP e Python</H2>
          <P>
            O caso clássico é o preenchimento automático de formulário de endereço. Abaixo, três exemplos que consultam
            um CEP e tratam o erro 404. Substitua <code>rtc_sua_chave_aqui</code> pela chave criada no painel e, em
            produção, chame a API a partir do seu backend para não expor a chave no navegador.
          </P>
          <H3>Node.js (fetch nativo, Node 18+)</H3>
          <Code>{`const BASE = '${BASE}';
const headers = { 'X-API-Key': process.env.RETECH_API_KEY };

export async function consultarCep(cep) {
  const limpo = String(cep).replace(/\\D/g, '');
  if (limpo.length !== 8) throw new Error('CEP deve ter 8 dígitos');

  const res = await fetch(\`\${BASE}/cep/\${limpo}\`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

const end = await consultarCep('01310-100');
console.log(end.logradouro, '-', end.bairro, '-', end.localidade + '/' + end.uf);
// Avenida Paulista - Bela Vista - São Paulo/SP

// busca reversa
const url = new URL(\`\${BASE}/cep/buscar\`);
url.search = new URLSearchParams({ uf: 'SP', cidade: 'São Paulo', logradouro: 'Paulista' }).toString();
const { results, count } = await fetch(url, { headers }).then(r => r.json());
console.log(count, 'CEPs;', results[0].cep);`}</Code>

          <H3>PHP (cURL)</H3>
          <Code>{`<?php
function consultarCep(string $cep): ?array {
    $limpo = preg_replace('/\\D/', '', $cep);
    if (strlen($limpo) !== 8) {
        throw new InvalidArgumentException('CEP deve ter 8 dígitos');
    }

    $ch = curl_init("${BASE}/cep/$limpo");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ['X-API-Key: ' . getenv('RETECH_API_KEY'), 'Accept: application/json'],
        CURLOPT_TIMEOUT        => 10,
    ]);
    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status === 404) return null;
    if ($status !== 200) throw new RuntimeException("Erro HTTP $status: $body");
    return json_decode($body, true);
}

$e = consultarCep('01310-100');
echo "{$e['logradouro']}, {$e['bairro']} - {$e['localidade']}/{$e['uf']} (IBGE {$e['ibge']})", PHP_EOL;
// Avenida Paulista, Bela Vista - São Paulo/SP (IBGE 3550308)`}</Code>

          <H3>Python (requests)</H3>
          <Code>{`import os
import re
import requests

BASE = "${BASE}"
HEADERS = {"X-API-Key": os.environ["RETECH_API_KEY"]}

def consultar_cep(cep: str) -> dict | None:
    limpo = re.sub(r"\\D", "", cep)
    if len(limpo) != 8:
        raise ValueError("CEP deve ter 8 dígitos")
    r = requests.get(f"{BASE}/cep/{limpo}", headers=HEADERS, timeout=10)
    if r.status_code == 404:
        return None
    r.raise_for_status()
    return r.json()

def buscar_por_endereco(uf: str, cidade: str, logradouro: str) -> list[dict]:
    r = requests.get(f"{BASE}/cep/buscar", params={"uf": uf, "cidade": cidade, "logradouro": logradouro}, headers=HEADERS, timeout=10)
    r.raise_for_status()
    return r.json()["results"]

e = consultar_cep("01310-100")
print(e["logradouro"], e["localidade"], e["uf"], e.get("ddd"))

for item in buscar_por_endereco("SP", "São Paulo", "Paulista"):
    print(item["cep"], item["logradouro"], item.get("complemento", ""))`}</Code>
          <P>
            Para testar sem escrever código, use o{' '}
            <Link href="/playground" className="text-indigo-700 underline">
              playground
            </Link>{' '}
            ou as ferramentas públicas de{' '}
            <Link href="/ferramentas/consultar-cep" className="text-indigo-700 underline">
              consulta de CEP
            </Link>{' '}
            e{' '}
            <Link href="/ferramentas/buscar-cep" className="text-indigo-700 underline">
              busca de CEP por endereço
            </Link>
            . A{' '}
            <Link href="/docs" className="text-indigo-700 underline">
              documentação
            </Link>{' '}
            traz a especificação OpenAPI completa.
          </P>

          <H2 id="cobertura">Cobertura dos dados: fontes, cache e atualização</H2>
          <P>
            A API usa três provedores públicos de CEP: ViaCEP, BrasilAPI e OpenCEP. Na consulta em tempo real, a
            ordem é fixa e a troca de fonte é automática: se o ViaCEP devolve erro, demora além do limite ou não
            conhece o CEP, a BrasilAPI é consultada. Em segundo plano, um crawler alterna entre ViaCEP, BrasilAPI e
            OpenCEP para alimentar e revalidar a base própria, distribuindo a carga entre os provedores. Só depois de
            todas as fontes falharem a API responde 404. Esse desenho reduz a dependência de um único provedor sem
            exigir nenhuma lógica extra no seu código.
          </P>
          <P>
            O resultado de cada consulta é armazenado em três camadas. O <strong>Redis</strong> guarda as respostas
            mais recentes em memória e serve a maior parte das chamadas repetidas. O <strong>PostgreSQL</strong> mantém
            uma base própria de CEPs já verificados, com a data da última verificação, e é alimentado em segundo plano.
            O <strong>MongoDB</strong> funciona como camada persistente de longo prazo. Na prática, um CEP consultado
            uma vez passa a ser servido do cache nas consultas seguintes, com tempo de processamento tipicamente
            abaixo de 50 ms.
          </P>
          <P>
            A cobertura é a dos Correios: CEPs de logradouro, CEPs únicos de localidades pequenas, CEPs de grandes
            usuários e caixas postais comunitárias. Para explorar CEPs por estado e cidade antes de integrar, veja a
            seção{' '}
            <Link href="/cep" className="text-indigo-700 underline">
              CEPs por estado
            </Link>
            .
          </P>

          <H2 id="precos">Preços e limites</H2>
          <P>
            O plano gratuito inclui 100 requisições por dia, sem cartão de crédito, com acesso à consulta por CEP e à
            busca reversa. Como o cache fica do lado da API, você não precisa implementar cache local para caber no
            limite em projetos pequenos. Para e-commerces, marketplaces e sistemas de logística, os planos Starter,
            Pro, Business e Enterprise ampliam a cota diária e o limite por minuto. A tabela completa está em{' '}
            <Link href="/precos" className="text-indigo-700 underline">
              preços e planos
            </Link>
            .
          </P>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>Chave de API com escopo <code>cep</code>, revogável a qualquer momento no painel.</li>
            <li>Headers de rate limit em cada resposta e histórico de uso por chave.</li>
            <li>Mesma conta e mesma chave para as outras APIs da plataforma, como a de artigos penais.</li>
            <li>Sem contrato de fidelidade: upgrade e downgrade direto no painel.</li>
          </ul>

          <H2 id="comparacao">Comparação: Retech Core, ViaCEP e BrasilAPI</H2>
          <P>
            ViaCEP e BrasilAPI são serviços públicos, gratuitos e amplamente usados, e a própria Retech Core os consulta
            como fontes. A diferença está no que fica em volta da consulta: a Retech Core adiciona troca automática de
            fonte, cache próprio, autenticação por chave com escopos, painel de uso e um contrato de resposta único
            que inclui a busca reversa. Para um script pontual, chamar o ViaCEP direto é perfeitamente razoável. Para
            um produto em produção, que precisa de previsibilidade e de um ponto único de integração, a camada
            adicional costuma compensar.
          </P>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 font-semibold">Critério</th>
                  <th className="p-3 font-semibold">ViaCEP / BrasilAPI (direto)</th>
                  <th className="p-3 font-semibold">Retech Core</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3">Fontes</td>
                  <td className="p-3">Uma por integração</td>
                  <td className="p-3">ViaCEP, BrasilAPI e OpenCEP, com fallback automático e crawler em segundo plano</td>
                </tr>
                <tr>
                  <td className="p-3">Cache</td>
                  <td className="p-3">Você implementa, se precisar</td>
                  <td className="p-3">Três camadas do lado da API (Redis, MongoDB, PostgreSQL)</td>
                </tr>
                <tr>
                  <td className="p-3">Autenticação e limites</td>
                  <td className="p-3">Sem chave; limites por IP, não documentados por conta</td>
                  <td className="p-3">Chave por conta, escopos, cota diária e headers de rate limit</td>
                </tr>
                <tr>
                  <td className="p-3">Busca por endereço</td>
                  <td className="p-3">Disponível no ViaCEP, com formato próprio</td>
                  <td className="p-3">Mesmo contrato de resposta da consulta por CEP</td>
                </tr>
                <tr>
                  <td className="p-3">Painel e histórico de uso</td>
                  <td className="p-3">Não</td>
                  <td className="p-3">Sim, por chave</td>
                </tr>
                <tr>
                  <td className="p-3">Vendor lock-in</td>
                  <td className="p-3">Baixo</td>
                  <td className="p-3">Baixo: resposta compatível com os campos do ViaCEP, fácil de trocar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Os nomes dos campos (<code>cep</code>, <code>logradouro</code>, <code>bairro</code>,{' '}
            <code>localidade</code>, <code>uf</code>, <code>ibge</code>, <code>ddd</code>) seguem a convenção do ViaCEP,
            então migrar um código existente costuma se resumir a trocar a URL base e adicionar o header da chave.
          </P>

          <H2 id="casos-de-uso">Casos de uso</H2>
          <div className="grid sm:grid-cols-2 gap-5 my-6">
            {[
              {
                icon: ShoppingCart,
                t: 'Checkout de e-commerce',
                d: 'Preencha rua, bairro, cidade e UF a partir do CEP e reduza erros de digitação que geram devolução de pedido.',
              },
              {
                icon: Truck,
                t: 'Logística e cálculo de frete',
                d: 'Use o código IBGE e as coordenadas para calcular frete, definir áreas de entrega e validar se um endereço é atendido.',
              },
              {
                icon: FileText,
                t: 'Cadastros e CRMs',
                d: 'Padronize endereços de clientes e fornecedores na entrada, com o município no formato exigido por notas fiscais.',
              },
              {
                icon: Search,
                t: 'Busca de CEP para quem não sabe o CEP',
                d: 'Ofereça um campo de busca por rua e cidade e deixe a pessoa escolher o CEP correto entre os resultados.',
              },
              {
                icon: Database,
                t: 'Higienização de bases',
                d: 'Reprocesse bases antigas em lote, corrigindo bairros e cidades a partir do CEP de cada registro.',
              },
              {
                icon: Code2,
                t: 'Apps mobile e formulários web',
                d: 'Chame a API pelo seu backend e devolva o endereço ao app, mantendo a chave fora do cliente.',
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-slate-200 p-5">
                <c.icon className="w-5 h-5 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{c.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <Faq items={faqs} className="mt-16" />

          <section className="mt-16 rounded-2xl bg-slate-950 text-white p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Comece com 100 requisições por dia, grátis</h2>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Crie sua conta, gere uma chave com escopo cep e faça a primeira consulta em menos de cinco minutos. Sem
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
                <Link href="/ferramentas/consultar-cep" className="underline hover:text-slate-900">
                  Consultar CEP (ferramenta grátis)
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/buscar-cep" className="underline hover:text-slate-900">
                  Buscar CEP por endereço
                </Link>
              </li>
              <li>
                <Link href="/cep" className="underline hover:text-slate-900">
                  CEPs por estado
                </Link>
              </li>
              <li>
                <Link href="/apis/penal" className="underline hover:text-slate-900">
                  API de Artigos Penais
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

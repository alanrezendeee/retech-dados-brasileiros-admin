import Link from 'next/link';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import { API_DOCS_URL, API_PUBLIC_BASE, CONTENT_UPDATED_AT, ORGANIZATION, SITE_URL } from '@/lib/seo/site';

export const revalidate = 86400;

// Página estática e indexável com a visão geral da API pública. A referência completa (Redoc)
// é renderizada no cliente em API_DOCS_URL e não é lida pelos crawlers; aqui fica o texto.

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-slate-950 text-slate-100 p-4 text-xs md:text-sm leading-relaxed my-4">
      <code>{children}</code>
    </pre>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <p className="my-3 flex flex-wrap items-center gap-2 font-mono text-sm">
      <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">{method}</span>
      <span className="text-slate-900">{path}</span>
    </p>
  );
}

function ParamTable({ rows }: { rows: { nome: string; tipo: string; desc: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 my-4">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Parâmetro
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Tipo
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.nome}>
              <td className="px-3 py-2 font-mono text-slate-900">{r.nome}</td>
              <td className="px-3 py-2 text-slate-600">{r.tipo}</td>
              <td className="px-3 py-2 text-slate-700">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SECOES = [
  { id: 'introducao', label: 'Introdução' },
  { id: 'autenticacao', label: 'Autenticação' },
  { id: 'base-url', label: 'Base URL e formato' },
  { id: 'cep', label: 'API de CEP' },
  { id: 'cnpj', label: 'API de CNPJ' },
  { id: 'geo', label: 'API de Geografia' },
  { id: 'penal', label: 'API de Artigos Penais' },
  { id: 'erros', label: 'Erros (RFC 7807)' },
  { id: 'rate-limit', label: 'Limites de uso' },
  { id: 'primeiros-passos', label: 'Primeiros passos' },
  { id: 'exemplos', label: 'Exemplos em código' },
  { id: 'boas-praticas', label: 'Boas práticas' },
  { id: 'recursos', label: 'Recursos' },
];

export default function DocsPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Documentação da API Retech Core',
    description:
      'Referência da API REST de dados brasileiros: autenticação, endpoints de CEP, CNPJ, geografia e artigos penais, erros e limites.',
    url: `${SITE_URL}/docs`,
    inLanguage: 'pt-BR',
    dateModified: CONTENT_UPDATED_AT,
    proficiencyLevel: 'Beginner',
    author: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
    publisher: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url, logo: { '@type': 'ImageObject', url: ORGANIZATION.logo } },
    about: { '@type': 'SoftwareApplication', name: 'Retech Core API', applicationCategory: 'DeveloperApplication', url: SITE_URL },
  };

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-6xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: 'Documentação' }]} className="mb-6" />
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <nav aria-label="Sumário" className="sticky top-24 text-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Nesta página</p>
              <ul className="space-y-1.5">
                {SECOES.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate-600 hover:text-emerald-700">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={API_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-slate-900 text-white px-3 py-2 text-xs font-semibold hover:bg-slate-700"
              >
                Referência completa (OpenAPI)
              </a>
            </nav>
          </aside>

          <article className="max-w-3xl">
            <header className="mb-10">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Documentação da API Retech Core</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Guia de integração da API REST de dados públicos brasileiros: consulta de CEP, CNPJ, geografia do
                IBGE e artigos do Código Penal e de leis especiais. Todas as respostas são em JSON e todas as
                chamadas usam o mesmo cabeçalho de autenticação.
              </p>
            </header>

            <section id="introducao" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Introdução</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                A Retech Core reúne em uma única API dados que normalmente exigem várias integrações: a base de CEPs
                dos Correios, o cadastro de CNPJ da Receita Federal, a malha de estados e municípios do IBGE e os
                textos compilados da legislação penal publicados pelo Planalto. Cada domínio tem seu próprio grupo
                de endpoints, mas o formato das respostas, o tratamento de erros e os limites de uso são iguais em
                toda a API.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                As consultas são somente leitura e idempotentes: você sempre usa o método HTTP GET. Os dados de CEP e
                CNPJ passam por camadas de cache (Redis, PostgreSQL e MongoDB) para que consultas repetidas sejam
                respondidas em poucos milissegundos sem depender das fontes externas. O campo <code>source</code>
                presente em algumas respostas indica de onde o dado foi obtido.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Esta página é um resumo legível dos endpoints públicos. A especificação OpenAPI completa, com todos
                os schemas, fica na{' '}
                <a href={API_DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                  referência interativa
                </a>
                , e você pode testar cada chamada sem cadastro no{' '}
                <Link href="/playground" className="text-emerald-700 hover:underline">
                  playground
                </Link>
                .
              </p>
            </section>

            <section id="autenticacao" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Autenticação</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Toda requisição deve enviar a chave de API no cabeçalho <code>X-API-Key</code>. A chave é criada no
                painel do desenvolvedor logo após o cadastro e pode ser revogada ou regenerada a qualquer momento.
                Chaves começam com o prefixo <code>rtc_</code> e são vinculadas a um tenant, que é a unidade usada
                para contabilizar o consumo e os limites do plano.
              </p>
              <Code>{`curl ${API_PUBLIC_BASE}/cep/01001000 \\
  -H "X-API-Key: rtc_sua_chave_aqui" \\
  -H "Accept: application/json"`}</Code>
              <p className="text-slate-700 leading-relaxed mb-3">
                O plano gratuito permite 100 requisições por dia e 5 por minuto, o suficiente para desenvolvimento e
                projetos pequenos. Os planos pagos elevam esses limites e liberam recursos adicionais, como a busca
                reversa de CEP. Veja a tabela completa na página de{' '}
                <Link href="/precos" className="text-emerald-700 hover:underline">
                  preços
                </Link>
                .
              </p>
              <p className="text-slate-700 leading-relaxed">
                Uma requisição sem chave, ou com chave inválida ou revogada, recebe o status <code>401</code>. Nunca
                exponha a chave em código que roda no navegador: faça as chamadas a partir do seu backend ou de uma
                função serverless.
              </p>
            </section>

            <section id="base-url" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Base URL e formato das respostas</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Todos os endpoints ficam sob a URL base abaixo e respondem apenas em JSON com codificação UTF-8. Os
                caminhos desta página são relativos a ela.
              </p>
              <Code>{API_PUBLIC_BASE}</Code>
              <p className="text-slate-700 leading-relaxed mb-3">
                Respostas de sucesso embrulham o resultado em um objeto com a propriedade <code>data</code>. Listas
                vêm como arrays dentro de <code>data</code> e, quando há paginação ou contagem, os metadados
                acompanham o objeto. Esse envelope é constante em toda a API, o que simplifica o tratamento no
                cliente.
              </p>
              <Code>{`{
  "data": { ... }
}`}</Code>
              <p className="text-slate-700 leading-relaxed">
                Cada resposta também inclui um cabeçalho <code>X-Request-ID</code> que identifica a chamada nos
                nossos logs. Guarde esse valor ao abrir um chamado de suporte.
              </p>
            </section>

            <section id="cep" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">API de CEP</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Consulta de endereço a partir do Código de Endereçamento Postal, com cache em três camadas e
                fallback automático entre fontes. Aceita o CEP com ou sem hífen. Veja também a{' '}
                <Link href="/apis/cep" className="text-emerald-700 hover:underline">
                  página da API de CEP
                </Link>{' '}
                e as{' '}
                <Link href="/cep" className="text-emerald-700 hover:underline">
                  listas de CEP por estado e cidade
                </Link>
                .
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-1">Consultar CEP</h3>
              <Endpoint method="GET" path="/cep/{cep}" />
              <ParamTable rows={[{ nome: 'cep', tipo: 'path, string', desc: '8 dígitos, com ou sem hífen. Ex.: 01001000 ou 01001-000.' }]} />
              <Code>{`GET /cep/01001000

{
  "data": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "ddd": "11",
    "source": "cache"
  }
}`}</Code>
              <p className="text-slate-700 leading-relaxed mb-3">
                Os campos <code>complemento</code>, <code>ibge</code>, <code>ddd</code>, <code>latitude</code> e{' '}
                <code>longitude</code> são opcionais e só aparecem quando a fonte os informa. Um CEP inexistente
                retorna <code>404</code>.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-1">Buscar CEP por endereço (busca reversa)</h3>
              <Endpoint method="GET" path="/cep/buscar?uf=SP&cidade=São Paulo&logradouro=Paulista" />
              <ParamTable
                rows={[
                  { nome: 'uf', tipo: 'query, string', desc: 'Sigla do estado com 2 letras.' },
                  { nome: 'cidade', tipo: 'query, string', desc: 'Nome do município (mínimo 3 caracteres).' },
                  { nome: 'logradouro', tipo: 'query, string', desc: 'Nome ou parte do nome da rua (mínimo 3 caracteres).' },
                ]}
              />
              <p className="text-slate-700 leading-relaxed">
                Retorna em <code>data</code> um array de endereços com o mesmo formato da consulta por CEP. Este
                endpoint está disponível a partir do plano Starter; no plano gratuito ele responde <code>403</code>.
              </p>
            </section>

            <section id="cnpj" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">API de CNPJ</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Dados cadastrais de empresas a partir do número do CNPJ: razão social, nome fantasia, situação
                cadastral, data de abertura, porte, natureza jurídica, capital social, endereço, CNAE principal e
                secundários e o quadro de sócios e administradores (QSA).
              </p>
              <Endpoint method="GET" path="/cnpj/{numero}" />
              <ParamTable rows={[{ nome: 'numero', tipo: 'path, string', desc: '14 dígitos, com ou sem pontuação. Ex.: 00000000000191.' }]} />
              <Code>{`GET /cnpj/00000000000191

{
  "data": {
    "cnpj": "00000000000191",
    "razao_social": "BANCO DO BRASIL SA",
    "nome_fantasia": "DIRECAO GERAL",
    "descricao_situacao_cadastral": "ATIVA",
    "data_situacao_cadastral": "2005-11-03",
    "data_inicio_atividade": "1966-08-01",
    "porte": "DEMAIS",
    "descricao_natureza_juridica": "Sociedade de Economia Mista",
    "capital_social": 120000000000,
    "logradouro": "SAUN QUADRA 5 LOTE B TORRES I, II E III",
    "numero": "SN",
    "bairro": "ASA NORTE",
    "cep": "70040912",
    "municipio": "BRASILIA",
    "uf": "DF",
    "cnae_fiscal": { "codigo": "6421200", "descricao": "Bancos comerciais" },
    "cnaes_secundarios": [ ... ],
    "qsa": [ { "nome_socio": "...", "qualificacao_socio": "..." } ]
  }
}`}</Code>
              <p className="text-slate-700 leading-relaxed">
                O número é validado pelos dígitos verificadores antes da consulta; um CNPJ com dígitos inválidos
                retorna <code>400</code>, e um CNPJ bem formado mas inexistente retorna <code>404</code>.
              </p>
            </section>

            <section id="geo" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">API de Geografia (IBGE)</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Estados e municípios conforme a divisão territorial do IBGE, com códigos oficiais, região e, para os
                municípios, microrregião e região imediata. Útil para preencher selects de UF e cidade, validar
                cadastros e cruzar com o código IBGE devolvido pela API de CEP.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-1">Listar estados</h3>
              <Endpoint method="GET" path="/geo/ufs" />
              <Code>{`{
  "data": [
    { "id": 35, "sigla": "SP", "nome": "São Paulo", "regiao": { "id": 3, "sigla": "SE", "nome": "Sudeste" } },
    ...
  ]
}`}</Code>

              <h3 className="text-lg font-semibold mt-6 mb-1">Detalhar um estado</h3>
              <Endpoint method="GET" path="/geo/ufs/{sigla}" />
              <ParamTable rows={[{ nome: 'sigla', tipo: 'path, string', desc: 'Sigla da UF com 2 letras (SP, RJ, MG...).' }]} />

              <h3 className="text-lg font-semibold mt-6 mb-1">Listar municípios</h3>
              <Endpoint method="GET" path="/geo/municipios?uf=SC" />
              <Endpoint method="GET" path="/geo/municipios/{uf}" />
              <ParamTable rows={[{ nome: 'uf', tipo: 'query ou path, string', desc: 'Sigla do estado. As duas formas retornam a mesma lista.' }]} />
              <Code>{`GET /geo/municipios/SC

{
  "data": [
    { "id": 4205407, "nome": "Florianópolis", "microrregiao": { ... }, "regiao-imediata": { ... } },
    ...
  ]
}`}</Code>
              <p className="text-slate-700 leading-relaxed">
                O campo <code>id</code> é o código IBGE de 7 dígitos do município, o mesmo valor que aparece no campo{' '}
                <code>ibge</code> da consulta de CEP.
              </p>
            </section>

            <section id="penal" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">API de Artigos Penais</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Dispositivos do Código Penal (Decreto-Lei 2.848/1940), da Lei de Contravenções Penais e de 35 leis
                especiais, como a Lei de Drogas, a Lei Maria da Penha e o Estatuto do Desarmamento, com texto
                completo, penas, parágrafos, incisos e alíneas. Cada dispositivo tem um identificador único no
                formato <code>PREFIXO:codigo</code> (por exemplo <code>CP:121</code>). Veja a{' '}
                <Link href="/apis/penal" className="text-emerald-700 hover:underline">
                  página da API de Artigos Penais
                </Link>
                .
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-1">Listar e filtrar artigos</h3>
              <Endpoint method="GET" path="/penal/artigos?q=homicidio&tipo=crime&legislacao=CP&nivel=artigo" />
              <ParamTable
                rows={[
                  { nome: 'q', tipo: 'query, string', desc: 'Texto livre buscado na descrição e no texto do dispositivo.' },
                  { nome: 'tipo', tipo: 'query, string', desc: 'crime, contravencao, disposicao ou revogado. Vazio retorna todos.' },
                  { nome: 'legislacao', tipo: 'query, string', desc: 'Sigla ou nome da lei: CP, LCP, "Lei 11.343/2006" etc.' },
                  { nome: 'nivel', tipo: 'query, string', desc: 'artigo, paragrafo, inciso ou alinea. Use artigo para listar só os cabeçalhos.' },
                ]}
              />
              <Code>{`{
  "data": [
    {
      "codigo": "121",
      "codigoFormatado": "Art. 121",
      "descricao": "Homicídio simples",
      "tipo": "crime",
      "nivel": "artigo",
      "legislacao": "CP",
      "legislacaoNome": "Código Penal",
      "idUnico": "CP:121"
    }
  ]
}`}</Code>

              <h3 className="text-lg font-semibold mt-6 mb-1">Detalhar um dispositivo</h3>
              <Endpoint method="GET" path="/penal/artigos/{codigo}" />
              <ParamTable rows={[{ nome: 'codigo', tipo: 'path, string', desc: 'Código do artigo (121, 121-A, 155...). Para leis especiais use o idUnico.' }]} />
              <p className="text-slate-700 leading-relaxed mb-3">
                Retorna o dispositivo com <code>textoCompleto</code>, <code>penaMin</code>, <code>penaMax</code>, parte,
                título e capítulo da lei, fonte e data de atualização.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-1">Busca textual</h3>
              <Endpoint method="GET" path="/penal/search?q=furto" />
              <ParamTable rows={[{ nome: 'q', tipo: 'query, string', desc: 'Termo de busca. Retorna os dispositivos mais relevantes em todas as legislações.' }]} />

              <h3 className="text-lg font-semibold mt-6 mb-1">Árvore de um artigo</h3>
              <Endpoint method="GET" path="/penal/arvore/{idUnico}" />
              <ParamTable rows={[{ nome: 'idUnico', tipo: 'path, string', desc: 'Identificador único, ex.: CP:121. Retorna o artigo, todos os seus parágrafos, incisos e alíneas em ordem, e os artigos anterior e próximo.' }]} />
              <Code>{`GET /penal/arvore/CP:121

{
  "data": {
    "artigo": { "idUnico": "CP:121", "codigoFormatado": "Art. 121", ... },
    "dispositivos": [ { "nivel": "paragrafo", "paragrafo": 1, ... }, ... ],
    "anterior": { "idUnico": "CP:120", ... },
    "proximo": { "idUnico": "CP:121-A", ... }
  }
}`}</Code>
            </section>

            <section id="erros" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Erros (RFC 7807)</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Erros seguem o formato Problem Details definido na RFC 7807. O corpo sempre traz <code>type</code>,{' '}
                <code>title</code>, <code>status</code> e <code>detail</code>, e o status HTTP repete o valor do campo{' '}
                <code>status</code>. Trate o <code>detail</code> como mensagem para humanos e o <code>status</code>{' '}
                como base para a lógica do cliente.
              </p>
              <Code>{`HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "CEP não encontrado"
}`}</Code>
              <div className="overflow-x-auto rounded-lg border border-slate-200 my-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Quando ocorre
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['400', 'Parâmetro inválido ou ausente: CEP com menos de 8 dígitos, CNPJ com dígito verificador errado, filtro desconhecido.'],
                      ['401', 'Cabeçalho X-API-Key ausente, chave inválida ou revogada.'],
                      ['403', 'Recurso não incluído no seu plano (ex.: busca reversa de CEP no plano gratuito).'],
                      ['404', 'Registro não encontrado: CEP, CNPJ, UF, município ou artigo inexistente.'],
                      ['429', 'Limite diário ou por minuto excedido. Veja os cabeçalhos de rate limit.'],
                      ['500', 'Todas as fontes externas falharam e não há cópia em cache. Repita a chamada em alguns segundos.'],
                    ].map(([s, d]) => (
                      <tr key={s}>
                        <td className="px-3 py-2 font-mono text-slate-900">{s}</td>
                        <td className="px-3 py-2 text-slate-700">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="rate-limit" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Limites de uso e cabeçalhos</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Os limites são aplicados por tenant, não por chave: todas as chaves de uma mesma conta compartilham a
                mesma cota. Há dois contadores independentes, um diário (reinicia à meia-noite) e um por minuto. Quando um deles é atingido a API responde <code>429</code> e informa os
                cabeçalhos abaixo para você saber quanto esperar.
              </p>
              <Code>{`X-RateLimit-Limit-Day: 100
X-RateLimit-Remaining-Day: 0
X-RateLimit-Reset-Day: 1759633200

X-RateLimit-Limit-Minute: 5
X-RateLimit-Remaining-Minute: 0
X-RateLimit-Reset-Minute: 1759590060
Retry-After: 42`}</Code>
              <p className="text-slate-700 leading-relaxed mb-3">
                Os valores de <code>Reset</code> são timestamps Unix em segundos. Implemente uma espera com
                backoff a partir de <code>Retry-After</code> em vez de repetir a chamada imediatamente. Consultas
                atendidas pelo cache também contam para a cota, então armazene localmente respostas que não mudam
                com frequência, como listas de UFs e municípios.
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 my-4">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Plano
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Por dia
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Por minuto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Free', '100', '5'],
                      ['Starter', '1.000', '30'],
                      ['Pro', '10.000', '120'],
                      ['Business', '100.000', '600'],
                      ['Enterprise', 'sob medida', 'sob medida'],
                    ].map(([p, d, m]) => (
                      <tr key={p}>
                        <td className="px-3 py-2 font-medium text-slate-900">{p}</td>
                        <td className="px-3 py-2 text-slate-700">{d}</td>
                        <td className="px-3 py-2 text-slate-700">{m}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="primeiros-passos" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Primeiros passos</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                Da criação da conta à primeira resposta em JSON são quatro passos, e nenhum deles exige cartão de
                crédito ou aprovação manual.
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-slate-700 leading-relaxed">
                <li>
                  <strong>Crie sua conta</strong> em{' '}
                  <Link href="/painel/register" className="text-emerald-700 hover:underline">
                    /painel/register
                  </Link>{' '}
                  informando nome, e-mail e senha. A conta nasce no plano gratuito.
                </li>
                <li>
                  <strong>Gere uma chave de API</strong> no painel do desenvolvedor. Dê um nome descritivo à chave
                  (por exemplo, o ambiente ou o sistema que vai usá-la) para facilitar a rotação depois.
                </li>
                <li>
                  <strong>Faça a primeira chamada</strong> com o comando curl da seção de autenticação, trocando a
                  chave de exemplo pela sua. Se a resposta trouxer o objeto <code>data</code>, a integração está
                  funcionando.
                </li>
                <li>
                  <strong>Acompanhe o consumo</strong> no painel, que mostra as requisições do período e quanto da
                  cota diária ainda está disponível.
                </li>
              </ol>
            </section>

            <section id="exemplos" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Exemplos em código</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                A API não exige SDK: qualquer cliente HTTP capaz de enviar um cabeçalho funciona. Abaixo, a consulta
                de CEP em JavaScript (Node.js 18 ou superior, com <code>fetch</code> nativo) e em Python com a
                biblioteca <code>requests</code>. Nos dois casos a chave é lida de uma variável de ambiente para não
                ficar gravada no código-fonte.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-1">JavaScript (Node.js)</h3>
              <Code>{`const res = await fetch('${API_PUBLIC_BASE}/cep/01001000', {
  headers: { 'X-API-Key': process.env.RETECH_API_KEY },
});

if (!res.ok) {
  const problem = await res.json(); // RFC 7807
  throw new Error(\`\${problem.status} \${problem.title}: \${problem.detail}\`);
}

const { data } = await res.json();
console.log(data.logradouro, data.bairro, data.localidade, data.uf);`}</Code>
              <h3 className="text-lg font-semibold mt-6 mb-1">Python</h3>
              <Code>{`import os
import requests

res = requests.get(
    "${API_PUBLIC_BASE}/cep/01001000",
    headers={"X-API-Key": os.environ["RETECH_API_KEY"]},
    timeout=5,
)
res.raise_for_status()
data = res.json()["data"]
print(data["logradouro"], data["bairro"], data["localidade"], data["uf"])`}</Code>
              <p className="text-slate-700 leading-relaxed">
                Para CNPJ, geografia e artigos penais basta trocar o caminho da URL; o cabeçalho, o envelope{' '}
                <code>data</code> e o tratamento de erros são idênticos. Exemplos em outras linguagens, como PHP, estão
                nas páginas de cada API.
              </p>
            </section>

            <section id="boas-praticas" className="mb-12">
              <h2 className="text-2xl font-bold mb-3">Boas práticas de integração</h2>
              <ul className="list-disc pl-6 space-y-3 text-slate-700 leading-relaxed">
                <li>
                  <strong>Valide antes de consultar.</strong> Um CEP tem exatamente 8 dígitos e um CNPJ tem 14, com
                  dígitos verificadores calculáveis. Rejeitar entradas malformadas no cliente evita gastar cota com
                  respostas <code>400</code>.
                </li>
                <li>
                  <strong>Guarde o que não muda.</strong> A lista de estados e municípios do IBGE muda raramente;
                  armazene-a localmente e atualize uma vez por mês. Endereços de CEP também podem ser cacheados por
                  dias no seu lado.
                </li>
                <li>
                  <strong>Defina timeouts e tente de novo com cautela.</strong> Use um timeout de alguns segundos e
                  repita apenas em <code>429</code> (respeitando <code>Retry-After</code>) e em <code>500</code>, com
                  intervalo crescente. Nunca repita automaticamente um <code>401</code> ou <code>403</code>.
                </li>
                <li>
                  <strong>Use uma chave por ambiente.</strong> Separe chaves de desenvolvimento, homologação e
                  produção. Se uma vazar, revogue só ela no painel sem afetar as demais.
                </li>
                <li>
                  <strong>Registre o X-Request-ID.</strong> Grave o identificador de cada chamada nos seus logs; ele
                  é a forma mais rápida de o suporte localizar uma requisição específica.
                </li>
                <li>
                  <strong>Trate campos opcionais como opcionais.</strong> Campos como <code>complemento</code>,{' '}
                  <code>ddd</code>, <code>ibge</code> e as coordenadas podem estar ausentes dependendo da fonte; não
                  assuma que sempre existirão.
                </li>
              </ul>
            </section>

            <section id="recursos" className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Recursos</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { href: API_DOCS_URL, t: 'Referência OpenAPI completa', d: 'Todos os endpoints e schemas, interativa.', ext: true },
                  { href: '/playground', t: 'Playground', d: 'Teste as chamadas no navegador sem cadastro.' },
                  { href: '/painel/register', t: 'Criar conta grátis', d: 'Gere sua chave e comece com 100 req/dia.' },
                  { href: '/status', t: 'Status da plataforma', d: 'Disponibilidade e incidentes em tempo real.' },
                  { href: '/apis/cep', t: 'API de CEP', d: 'Detalhes, comparação e exemplos de código.' },
                  { href: '/apis/penal', t: 'API de Artigos Penais', d: 'Cobertura das legislações e casos de uso.' },
                ].map((l) => (
                  <li key={l.href} className="rounded-xl border border-slate-200 p-4 hover:border-emerald-300">
                    {l.ext ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-emerald-700">
                        {l.t}
                      </a>
                    ) : (
                      <Link href={l.href} className="font-semibold text-slate-900 hover:text-emerald-700">
                        {l.t}
                      </Link>
                    )}
                    <p className="text-sm text-slate-600 mt-1">{l.d}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>
    </PublicShell>
  );
}

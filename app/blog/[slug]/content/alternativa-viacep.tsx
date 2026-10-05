import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Code, Callout, TableWrap } from '../../_components/article-ui';

export default function AlternativaViacep() {
  return (
    <>
      <p>
        O ViaCEP é, há mais de uma década, o jeito padrão de consultar CEP em projetos brasileiros. Ele é gratuito, não exige cadastro e
        responde um JSON simples. Por isso mesmo, está em milhares de formulários de checkout, cadastros de clientes e integrações de
        logística. O problema aparece quando ele para de responder: não há status page, não há SLA, não há canal de suporte e, nos
        horários de pico, parte das requisições volta com erro ou com o código 429 (Too Many Requests).
      </p>
      <p>
        Este artigo mostra o que uma alternativa ao ViaCEP precisa ter para não repetir o mesmo problema, como funciona uma API de CEP
        com fallback automático entre fontes e cache em três camadas, e como migrar seu código mantendo exatamente os mesmos campos
        JSON. No fim há uma tabela comparativa honesta, inclusive com os casos em que continuar no ViaCEP faz sentido.
      </p>

      <h2 id="por-que-o-viacep-cai">Por que o ViaCEP cai (e por que isso é esperado)</h2>
      <p>
        O ViaCEP é um serviço mantido por voluntários e oferecido sem custo. Como não há chave de API, não há como distinguir um
        e-commerce que faz 50 consultas por dia de um robô que faz 50 mil por minuto. A única defesa possível é limitar por IP, e é
        exatamente isso que acontece: quando muitos usuários atrás do mesmo IP (uma empresa, um provedor, um cluster de servidores)
        consultam ao mesmo tempo, todos passam a receber 429 ou timeouts.
      </p>
      <p>Na prática, três sintomas aparecem com frequência em quem depende apenas do ViaCEP:</p>
      <ul>
        <li>
          <strong>Timeouts intermitentes</strong> em horários comerciais, que travam o preenchimento automático do endereço e deixam o
          usuário olhando para um spinner.
        </li>
        <li>
          <strong>Bloqueio por volume</strong> em servidores que fazem a consulta pelo backend, já que todas as requisições saem do
          mesmo IP.
        </li>
        <li>
          <strong>Ausência de cache</strong>: cada consulta vai para a origem, mesmo que o mesmo CEP tenha sido consultado segundos
          antes por outro cliente.
        </li>
      </ul>
      <p>
        Nada disso é defeito do ViaCEP. É a consequência natural de um serviço público sem identificação de quem consome. A pergunta
        certa não é &quot;qual serviço nunca cai&quot;, e sim &quot;como minha aplicação continua funcionando quando uma fonte cai&quot;.
      </p>

      <h2 id="o-que-uma-alternativa-precisa-ter">O que uma alternativa ao ViaCEP precisa ter</h2>
      <p>Antes de trocar uma dependência por outra, vale listar o que resolve o problema de verdade:</p>
      <ol>
        <li>
          <strong>Mais de uma fonte de dados.</strong> Se a API consulta apenas um provedor, ela herda a indisponibilidade dele. O
          mínimo são duas fontes com fallback automático.
        </li>
        <li>
          <strong>Cache agressivo.</strong> CEPs mudam raramente. Um CEP consultado uma vez pode ser servido do cache por dias sem
          risco relevante.
        </li>
        <li>
          <strong>Chave de API.</strong> Parece burocracia, mas é o que permite dar um limite justo a cada cliente em vez de bloquear
          todo mundo por IP.
        </li>
        <li>
          <strong>Formato compatível.</strong> Se os campos forem os mesmos do ViaCEP, a migração vira uma troca de URL, não uma
          reescrita.
        </li>
        <li>
          <strong>Status público e erros padronizados.</strong> Você precisa saber quando o problema é seu e quando é do provedor.
        </li>
      </ol>

      <h2 id="como-funciona-o-fallback">Como funciona o fallback automático na API de CEP da Retech Core</h2>
      <p>
        A <Link href="/apis/cep">API de CEP da Retech Core</Link> foi desenhada em torno dessa lista. Uma consulta a{' '}
        <code>GET /cep/01310100</code> percorre, em ordem, as seguintes camadas e para na primeira que responde:
      </p>
      <ol>
        <li>
          <strong>Redis (memória).</strong> CEPs consultados recentemente respondem em menos de 1 ms. O campo <code>source</code> da
          resposta vem como <code>redis-cache</code>.
        </li>
        <li>
          <strong>Base própria em PostgreSQL.</strong> Uma tabela de CEPs alimentada continuamente por um crawler em segundo plano.
          Mesmo se todas as fontes externas sumirem, os CEPs já conhecidos continuam sendo servidos.
        </li>
        <li>
          <strong>Cache persistente em MongoDB.</strong> Terceira camada, que guarda o histórico de respostas das fontes externas.
        </li>
        <li>
          <strong>ViaCEP.</strong> Primeira fonte externa consultada quando o CEP ainda não está em nenhum cache.
        </li>
        <li>
          <strong>BrasilAPI.</strong> Fallback acionado automaticamente quando o ViaCEP falha, demora ou devolve 429. Em segundo plano, um crawler alimenta a base própria (PostgreSQL) a partir de ViaCEP, BrasilAPI e OpenCEP.
        </li>
      </ol>
      <p>
        O resultado é que uma queda do ViaCEP não chega ao seu usuário. Nos CEPs mais consultados do país, a resposta nem sequer sai
        do cache. Nos CEPs raros, a API tenta a próxima fonte sem que você precise programar nada. Você pode acompanhar a saúde das
        fontes na página de <Link href="/status">status</Link>.
      </p>

      <Callout tone="tip" title="Dica">
        <p>
          O cabeçalho de resposta <code>X-Server-Time-Ms</code> informa quanto tempo o servidor levou. Use-o para medir quantas das
          suas consultas estão sendo atendidas pelo cache.
        </p>
      </Callout>

      <h2 id="guia-de-migracao">Guia de migração: mesmos campos, outra URL</h2>
      <p>
        A resposta da API usa os mesmos nomes de campo do ViaCEP: <code>cep</code>, <code>logradouro</code>, <code>complemento</code>,{' '}
        <code>bairro</code>, <code>localidade</code>, <code>uf</code>, <code>ibge</code> e <code>ddd</code>. Isso foi intencional:
        qualquer código que já lê a resposta do ViaCEP continua funcionando sem alterações. As únicas diferenças são a URL base e o
        cabeçalho <code>X-API-Key</code>.
      </p>

      <h3>Antes: consulta direta ao ViaCEP</h3>
      <Code lang="js" title="antes.js">{`async function buscarCep(cep) {
  const limpo = cep.replace(/\\D/g, '');
  const res = await fetch(\`https://viacep.com.br/ws/\${limpo}/json/\`);
  if (!res.ok) throw new Error('ViaCEP indisponível');
  const data = await res.json();
  if (data.erro) throw new Error('CEP não encontrado');
  return data; // { cep, logradouro, complemento, bairro, localidade, uf, ibge, ddd }
}`}</Code>

      <h3>Depois: API de CEP com fallback e cache</h3>
      <Code lang="js" title="depois.js">{`const API_KEY = process.env.RETECH_API_KEY; // gere em /painel/apikeys

async function buscarCep(cep) {
  const limpo = cep.replace(/\\D/g, '');
  const res = await fetch(\`https://api-core.theretech.com.br/cep/\${limpo}\`, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (res.status === 404) throw new Error('CEP não encontrado');
  if (res.status === 400) throw new Error('CEP deve ter 8 dígitos');
  if (!res.ok) throw new Error(\`Erro \${res.status}\`);
  return res.json(); // mesmos campos + source e, quando disponível, latitude/longitude
}`}</Code>

      <p>Repare em três mudanças de comportamento que simplificam o código:</p>
      <ul>
        <li>
          <strong>CEP inexistente devolve 404</strong>, e não um 200 com <code>{'{ "erro": true }'}</code>. Você deixa de precisar
          inspecionar o corpo para descobrir se deu certo.
        </li>
        <li>
          <strong>CEP malformado devolve 400</strong> com uma mensagem no padrão RFC 7807 (<code>type</code>, <code>title</code>,{' '}
          <code>status</code>, <code>detail</code>).
        </li>
        <li>
          <strong>O campo <code>source</code></strong> diz de onde veio a resposta. Útil para depuração e para medir a taxa de acerto
          do cache.
        </li>
      </ul>

      <h3>Exemplo de resposta</h3>
      <Code lang="json">{`{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "de 612 a 1510 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "ddd": "11",
  "source": "redis-cache"
}`}</Code>

      <h3>Migrando no front-end</h3>
      <p>
        Se a consulta hoje é feita direto do navegador, há uma decisão a tomar. A chave de API não deve ficar exposta em código
        público. A recomendação é criar uma rota no seu backend (por exemplo <code>/api/cep/:codigo</code>) que adiciona o cabeçalho
        e repassa a resposta. Isso também permite aplicar um cache local e esconder a origem dos dados do seu cliente. Em frameworks
        como Next.js, uma Route Handler de dez linhas resolve.
      </p>

      <h2 id="comparativo">Comparativo honesto: ViaCEP versus API de CEP da Retech Core</h2>
      <TableWrap caption="Comparação feita em outubro de 2026, a partir da documentação pública de cada serviço.">
        <thead>
          <tr>
            <th>Critério</th>
            <th>ViaCEP</th>
            <th>Retech Core</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fontes de dados</td>
            <td>Uma (base própria)</td>
            <td>ViaCEP e BrasilAPI em tempo real; base própria em PostgreSQL alimentada por crawler (ViaCEP, BrasilAPI e OpenCEP)</td>
          </tr>
          <tr>
            <td>Fallback automático</td>
            <td>Não</td>
            <td>Sim, em ordem de prioridade</td>
          </tr>
          <tr>
            <td>Cache</td>
            <td>Não documentado</td>
            <td>3 camadas: Redis, PostgreSQL e MongoDB</td>
          </tr>
          <tr>
            <td>Chave de API</td>
            <td>Não exige</td>
            <td>Exige (gratuita, criada em segundos)</td>
          </tr>
          <tr>
            <td>Limite do plano gratuito</td>
            <td>Não documentado; bloqueio por IP</td>
            <td>100 requisições por dia por conta</td>
          </tr>
          <tr>
            <td>Campos do JSON</td>
            <td>cep, logradouro, complemento, bairro, localidade, uf, ibge, ddd, gia, siafi</td>
            <td>Mesmos campos principais + source, latitude e longitude quando disponíveis</td>
          </tr>
          <tr>
            <td>Erro para CEP inexistente</td>
            <td>HTTP 200 com &quot;erro&quot;: true</td>
            <td>HTTP 404 (RFC 7807)</td>
          </tr>
          <tr>
            <td>Busca de CEP por endereço</td>
            <td>Sim (UF, cidade e logradouro)</td>
            <td>Sim (UF, cidade e logradouro)</td>
          </tr>
          <tr>
            <td>Página de status</td>
            <td>Não</td>
            <td>
              Sim (<Link href="/status">/status</Link>)
            </td>
          </tr>
          <tr>
            <td>Outros dados na mesma chave</td>
            <td>Não</td>
            <td>CNPJ, geografia (UFs e municípios) e artigos penais</td>
          </tr>
        </tbody>
      </TableWrap>

      <h2 id="quando-continuar-no-viacep">Quando continuar no ViaCEP faz sentido</h2>
      <p>
        Não existe motivo para trocar uma dependência que funciona. Se o seu projeto é um protótipo, um site pessoal ou faz poucas
        consultas por dia a partir de um único usuário, o ViaCEP continua sendo uma ótima escolha. Também é razoável mantê-lo como
        fonte secundária no seu próprio código, caso prefira implementar o fallback por conta própria.
      </p>
      <p>
        A troca compensa quando a consulta de CEP está em um caminho crítico do negócio (checkout, cadastro, cálculo de frete), quando
        várias instâncias do seu backend saem pelo mesmo IP ou quando você precisa de previsibilidade: saber quantas requisições tem,
        ter um status público e um canal de suporte. Para medir o impacto, consulte o CEP de um cliente real na{' '}
        <Link href="/ferramentas/consultar-cep">ferramenta de consulta de CEP</Link> e compare o tempo de resposta.
      </p>

      <h2 id="proximos-passos">Próximos passos</h2>
      <ul>
        <li>
          Veja exemplos completos em Node, PHP e Python no post{' '}
          <Link href="/blog/api-cep-gratuita">API de CEP gratuita: como consultar endereço por CEP</Link>.
        </li>
        <li>
          Entenda a estrutura do código postal em{' '}
          <Link href="/blog/consultar-cep-gratis">Como consultar CEP grátis (e como funciona o CEP brasileiro)</Link>.
        </li>
        <li>
          Consulte a lista de CEPs por estado e cidade em <Link href="/cep">CEPs por estado</Link>.
        </li>
      </ul>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'A API de CEP da Retech Core é compatível com o formato do ViaCEP?',
            answer:
              'Sim. Os campos cep, logradouro, complemento, bairro, localidade, uf, ibge e ddd têm os mesmos nomes e formatos. A diferença é que a Retech Core devolve HTTP 404 para CEP inexistente e HTTP 400 para CEP malformado, em vez de um 200 com "erro": true. O campo source indica de qual camada ou fonte veio a resposta.',
          },
          {
            question: 'O que acontece se o ViaCEP estiver fora do ar?',
            answer:
              'A API tenta primeiro os caches (Redis, PostgreSQL e MongoDB). Se o CEP não estiver em nenhum deles, consulta o ViaCEP e, em caso de erro ou timeout, aciona automaticamente a BrasilAPI. Sua aplicação recebe a mesma resposta, sem precisar implementar fallback.',
          },
          {
            question: 'Preciso de chave de API? Quanto custa?',
            answer:
              'Sim, toda requisição leva o cabeçalho X-API-Key. O plano gratuito permite 100 requisições por dia e não exige cartão de crédito. A chave é criada em /painel/register em menos de um minuto.',
          },
          {
            question: 'Posso chamar a API direto do navegador?',
            answer:
              'Tecnicamente sim, mas a chave ficaria exposta no código público. O recomendado é criar uma rota no seu backend que adiciona o cabeçalho e repassa a resposta, aproveitando para aplicar um cache local.',
          },
        ]}
      />
    </>
  );
}

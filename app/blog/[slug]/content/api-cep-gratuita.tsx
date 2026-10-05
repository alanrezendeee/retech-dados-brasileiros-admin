import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Code, Callout, TableWrap } from '../../_components/article-ui';

export default function ApiCepGratuita() {
  return (
    <>
      <p>
        Preencher o endereço automaticamente a partir do CEP é um dos recursos mais simples e mais valiosos de um formulário. Reduz
        erros de digitação, acelera o cadastro e melhora a taxa de conversão em checkouts. Este tutorial mostra como consultar um
        endereço por CEP usando a <Link href="/apis/cep">API de CEP do RetechHub</Link>, que tem plano gratuito, em três linguagens:
        Node.js, PHP e Python. Também cobre o tratamento correto de erros e dicas de cache para não gastar requisições à toa.
      </p>

      <h2 id="o-que-a-api-retorna">O que a API de CEP retorna</h2>
      <p>
        O endpoint é <code>GET https://api-core.theretech.com.br/cep/&#123;cep&#125;</code>. O CEP pode ser enviado com ou sem hífen; a
        API remove tudo que não for dígito antes de consultar. A resposta é um JSON com os campos clássicos do endereço brasileiro:
      </p>
      <TableWrap>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Exemplo</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>cep</code></td>
            <td>01310-100</td>
            <td>Sempre formatado com hífen</td>
          </tr>
          <tr>
            <td><code>logradouro</code></td>
            <td>Avenida Paulista</td>
            <td>Vazio em CEPs gerais de cidade</td>
          </tr>
          <tr>
            <td><code>complemento</code></td>
            <td>de 612 a 1510 - lado par</td>
            <td>Faixa de numeração, quando existir</td>
          </tr>
          <tr>
            <td><code>bairro</code></td>
            <td>Bela Vista</td>
            <td>Pode ser vazio em cidades pequenas</td>
          </tr>
          <tr>
            <td><code>localidade</code></td>
            <td>São Paulo</td>
            <td>Nome do município</td>
          </tr>
          <tr>
            <td><code>uf</code></td>
            <td>SP</td>
            <td>Sigla do estado</td>
          </tr>
          <tr>
            <td><code>ibge</code></td>
            <td>3550308</td>
            <td>Código IBGE do município (7 dígitos)</td>
          </tr>
          <tr>
            <td><code>ddd</code></td>
            <td>11</td>
            <td>Código de área telefônico</td>
          </tr>
          <tr>
            <td><code>source</code></td>
            <td>redis-cache</td>
            <td>Camada ou fonte que respondeu</td>
          </tr>
        </tbody>
      </TableWrap>
      <p>
        Os campos <code>latitude</code> e <code>longitude</code> aparecem quando a fonte consultada os fornece. Não dependa deles para
        lógica crítica; trate-os como opcionais.
      </p>

      <h2 id="antes-de-comecar">Antes de começar: a chave de API</h2>
      <p>
        Toda requisição precisa do cabeçalho <code>X-API-Key</code>. Crie uma conta gratuita em{' '}
        <Link href="/painel/register">/painel/register</Link>, gere a chave no painel e guarde-a em uma variável de ambiente. O plano
        gratuito dá 100 requisições por dia, o que é suficiente para desenvolvimento e para projetos pequenos, principalmente se você
        aplicar o cache descrito mais adiante. Para testar sem criar conta, use a{' '}
        <Link href="/ferramentas/consultar-cep">ferramenta de consulta de CEP</Link> ou o <Link href="/playground">playground</Link>.
      </p>

      <h2 id="node">Consultar CEP em Node.js</h2>
      <p>
        A partir do Node 18 o <code>fetch</code> é nativo, então não é preciso instalar nada. O exemplo abaixo valida o formato antes
        de chamar a API, trata os códigos de erro e devolve um objeto limpo para o restante da aplicação.
      </p>
      <Code lang="js" title="cep.js">{`const BASE_URL = 'https://api-core.theretech.com.br';
const API_KEY = process.env.RETECH_API_KEY;

class CepError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function consultarCep(cep) {
  const limpo = String(cep).replace(/\\D/g, '');
  if (limpo.length !== 8) {
    throw new CepError(400, 'CEP deve ter 8 dígitos');
  }

  const res = await fetch(\`\${BASE_URL}/cep/\${limpo}\`, {
    headers: { 'X-API-Key': API_KEY, Accept: 'application/json' },
  });

  if (res.status === 404) throw new CepError(404, 'CEP não encontrado');
  if (res.status === 401) throw new CepError(401, 'Chave de API inválida ou ausente');
  if (res.status === 429) throw new CepError(429, 'Limite diário de requisições atingido');
  if (!res.ok) {
    const problem = await res.json().catch(() => ({}));
    throw new CepError(res.status, problem.detail || 'Erro ao consultar CEP');
  }

  return res.json();
}

// Uso
const endereco = await consultarCep('01310-100');
console.log(\`\${endereco.logradouro}, \${endereco.bairro} - \${endereco.localidade}/\${endereco.uf}\`);`}</Code>

      <h2 id="php">Consultar CEP em PHP</h2>
      <p>
        Em PHP a opção mais portátil é a extensão cURL, presente na maioria das hospedagens. Se o projeto usa Laravel ou Guzzle, a
        lógica é a mesma; só muda a sintaxe da chamada HTTP.
      </p>
      <Code lang="php" title="cep.php">{`<?php

function consultarCep(string $cep): array
{
    $limpo = preg_replace('/\\D/', '', $cep);
    if (strlen($limpo) !== 8) {
        throw new InvalidArgumentException('CEP deve ter 8 dígitos');
    }

    $ch = curl_init("https://api-core.theretech.com.br/cep/{$limpo}");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_HTTPHEADER     => [
            'X-API-Key: ' . getenv('RETECH_API_KEY'),
            'Accept: application/json',
        ],
    ]);

    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($status === 404) {
        throw new RuntimeException('CEP não encontrado', 404);
    }
    if ($status !== 200) {
        $problem = json_decode($body, true) ?? [];
        throw new RuntimeException($problem['detail'] ?? 'Erro ao consultar CEP', $status);
    }

    return json_decode($body, true, 512, JSON_THROW_ON_ERROR);
}

$endereco = consultarCep('01310-100');
echo "{$endereco['logradouro']}, {$endereco['localidade']}/{$endereco['uf']}";`}</Code>

      <h2 id="python">Consultar CEP em Python</h2>
      <p>
        Com a biblioteca <code>requests</code> o código fica curto. A função abaixo usa <code>raise_for_status()</code> para erros
        inesperados e trata explicitamente os dois casos que a aplicação precisa distinguir: CEP inválido e CEP não encontrado.
      </p>
      <Code lang="python" title="cep.py">{`import os
import re
import requests

BASE_URL = "https://api-core.theretech.com.br"
API_KEY = os.environ["RETECH_API_KEY"]


class CepNaoEncontrado(Exception):
    pass


def consultar_cep(cep: str) -> dict:
    limpo = re.sub(r"\\D", "", cep)
    if len(limpo) != 8:
        raise ValueError("CEP deve ter 8 dígitos")

    resp = requests.get(
        f"{BASE_URL}/cep/{limpo}",
        headers={"X-API-Key": API_KEY, "Accept": "application/json"},
        timeout=5,
    )

    if resp.status_code == 404:
        raise CepNaoEncontrado(limpo)
    resp.raise_for_status()
    return resp.json()


if __name__ == "__main__":
    endereco = consultar_cep("01310-100")
    print(f"{endereco['logradouro']}, {endereco['localidade']}/{endereco['uf']}")`}</Code>

      <h2 id="tratamento-de-erros">Tratamento de erros: 400, 404 e os outros</h2>
      <p>
        A API responde erros no formato RFC 7807 (Problem Details). O corpo sempre tem <code>type</code>, <code>title</code>,{' '}
        <code>status</code> e <code>detail</code>, então você pode exibir <code>detail</code> diretamente em logs ou mensagens internas.
      </p>
      <Code lang="json" title="HTTP 404">{`{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "CEP 99999999 não encontrado"
}`}</Code>
      <TableWrap>
        <thead>
          <tr>
            <th>Status</th>
            <th>Quando acontece</th>
            <th>O que fazer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>400</td>
            <td>CEP com menos ou mais de 8 dígitos</td>
            <td>Validar no cliente antes de enviar; mostrar erro de formato</td>
          </tr>
          <tr>
            <td>401</td>
            <td>Cabeçalho X-API-Key ausente ou inválido</td>
            <td>Verificar a variável de ambiente; não é erro do usuário</td>
          </tr>
          <tr>
            <td>404</td>
            <td>CEP com formato válido mas inexistente</td>
            <td>Liberar o preenchimento manual do endereço</td>
          </tr>
          <tr>
            <td>429</td>
            <td>Limite diário do plano atingido</td>
            <td>Servir do cache local; considerar upgrade de plano</td>
          </tr>
          <tr>
            <td>5xx</td>
            <td>Falha interna (rara, graças ao fallback)</td>
            <td>Tentar novamente uma vez; liberar preenchimento manual</td>
          </tr>
        </tbody>
      </TableWrap>
      <Callout tone="warn" title="Nunca bloqueie o formulário por causa de um 404">
        <p>
          CEPs recém-criados e CEPs de grandes usuários (empresas com código próprio) podem não estar em nenhuma base. O 404 deve
          abrir os campos para digitação manual, não impedir o cadastro.
        </p>
      </Callout>

      <h2 id="cache">Dicas de cache para economizar requisições</h2>
      <p>
        A API já tem cache em três camadas no servidor, mas um cache do seu lado evita até a ida à rede e preserva a cota do plano
        gratuito. Algumas práticas que funcionam bem:
      </p>
      <ul>
        <li>
          <strong>Cache por CEP com validade longa.</strong> Dados de endereço mudam raramente. Guardar a resposta por 7 a 30 dias em
          Redis, no banco ou até em memória é seguro para a maioria das aplicações.
        </li>
        <li>
          <strong>Normalize a chave.</strong> Use sempre os 8 dígitos sem hífen como chave do cache, para que &quot;01310-100&quot; e
          &quot;01310100&quot; apontem para o mesmo registro.
        </li>
        <li>
          <strong>Cacheie também o 404.</strong> Um CEP inexistente continua inexistente por um bom tempo. Guardar o resultado
          negativo por algumas horas evita repetir a consulta a cada tentativa do usuário.
        </li>
        <li>
          <strong>Dispare a consulta só com 8 dígitos.</strong> No front-end, chame o backend quando o campo completar 8 dígitos e
          perder o foco, não a cada tecla.
        </li>
        <li>
          <strong>Observe o campo source.</strong> Se a maioria das respostas vier como <code>redis-cache</code>, você já está sendo
          atendido pelo cache do servidor e pode usar validades mais curtas no seu.
        </li>
      </ul>
      <Code lang="js" title="cache-simples.js">{`const cache = new Map();
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export async function consultarCepComCache(cep) {
  const chave = String(cep).replace(/\\D/g, '');
  const hit = cache.get(chave);
  if (hit && hit.expira > Date.now()) return hit.valor;

  const valor = await consultarCep(chave);
  cache.set(chave, { valor, expira: Date.now() + TTL_MS });
  return valor;
}`}</Code>

      <h2 id="proxy-no-backend">Chamando a API a partir do navegador: use uma rota no seu backend</h2>
      <p>
        Os três exemplos acima rodam no servidor, e isso é proposital. A chave de API não deve ir para o código do front-end, porque
        qualquer pessoa pode abri-lo e reutilizá-la, consumindo a sua cota. A solução padrão é uma rota mínima no seu backend que
        recebe o CEP, adiciona o cabeçalho e devolve a resposta. Em Next.js, por exemplo, uma Route Handler resolve:
      </p>
      <Code lang="ts" title="app/api/cep/[cep]/route.ts">{`import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ cep: string }> }) {
  const { cep } = await params;
  const limpo = cep.replace(/\\D/g, '');
  if (limpo.length !== 8) {
    return NextResponse.json({ detail: 'CEP deve ter 8 dígitos' }, { status: 400 });
  }

  const upstream = await fetch(\`https://api-core.theretech.com.br/cep/\${limpo}\`, {
    headers: { 'X-API-Key': process.env.RETECH_API_KEY! },
    next: { revalidate: 60 * 60 * 24 * 7 }, // cache de 7 dias no servidor
  });

  const body = await upstream.json();
  return NextResponse.json(body, { status: upstream.status });
}`}</Code>
      <p>
        Essa camada intermediária traz três vantagens além da segurança. Primeiro, você aplica cache no seu próprio servidor e
        preserva a cota do plano. Segundo, pode trocar o provedor de CEP no futuro sem alterar o front-end. Terceiro, evita
        problemas de CORS, já que o navegador fala apenas com o seu domínio. O mesmo padrão vale para Laravel, Django, Express ou
        qualquer outro framework: uma rota, um cabeçalho, um repasse.
      </p>

      <h2 id="boas-praticas-no-formulario">Boas práticas no formulário de endereço</h2>
      <ul>
        <li>Aplique máscara no campo (00000-000) e aceite colar o valor sem máscara.</li>
        <li>Preencha logradouro, bairro, cidade e UF, mas deixe esses campos editáveis: a base pode estar desatualizada.</li>
        <li>Mova o foco para o campo &quot;número&quot; após o preenchimento automático, que é o único dado que a API não conhece.</li>
        <li>
          Se o usuário não sabe o CEP, ofereça a <Link href="/ferramentas/buscar-cep">busca de CEP por endereço</Link>, que faz o
          caminho inverso.
        </li>
      </ul>

      <h2 id="leia-mais">Para continuar</h2>
      <p>
        Se você já usa o ViaCEP e quer entender a diferença na prática, leia{' '}
        <Link href="/blog/alternativa-viacep">Alternativa ao ViaCEP: API de CEP com fallback automático e cache</Link>. Para entender o
        que cada dígito do CEP significa e por que alguns CEPs não têm logradouro, veja{' '}
        <Link href="/blog/consultar-cep-gratis">Como consultar CEP grátis</Link>. A referência completa dos endpoints está na{' '}
        <Link href="/docs">documentação</Link>.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'A API de CEP é realmente gratuita?',
            answer:
              'Sim. O plano gratuito inclui 100 requisições por dia, sem cartão de crédito, com acesso a todos os endpoints (CEP, CNPJ, geografia e artigos penais). Planos pagos aumentam o limite diário.',
          },
          {
            question: 'Posso enviar o CEP com hífen?',
            answer:
              'Pode. A API remove qualquer caractere que não seja dígito antes de consultar. "01310-100" e "01310100" retornam o mesmo resultado.',
          },
          {
            question: 'Por que alguns CEPs voltam sem logradouro?',
            answer:
              'Cidades pequenas usam um único CEP para todo o município (CEP geral). Nesses casos a API retorna localidade e uf preenchidos e logradouro e bairro vazios. O formulário deve permitir digitar o restante do endereço.',
          },
          {
            question: 'Como sei se a resposta veio do cache?',
            answer:
              'Pelo campo source. Valores como redis-cache indicam que a resposta foi servida de uma camada de cache; viacep ou brasilapi indicam consulta à fonte externa naquele momento.',
          },
        ]}
      />
    </>
  );
}

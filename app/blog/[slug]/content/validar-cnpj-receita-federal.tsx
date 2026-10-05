import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Code, Callout, TableWrap } from '../../_components/article-ui';

export default function ValidarCnpjReceitaFederal() {
  return (
    <>
      <p>
        &quot;Validar CNPJ&quot; pode significar duas coisas bem diferentes. A primeira é verificar se o número é matematicamente
        válido, ou seja, se os dois dígitos verificadores batem com os doze anteriores. A segunda é confirmar na Receita Federal se
        aquele CNPJ existe, a quem pertence e se a empresa está ativa. Este artigo cobre as duas: o algoritmo dos dígitos verificadores
        com código pronto, o significado de cada situação cadastral e como obter o quadro societário (QSA) e os CNAEs por API.
      </p>

      <h2 id="estrutura-do-cnpj">A estrutura do CNPJ</h2>
      <p>
        O CNPJ tem 14 dígitos, escritos no formato <strong>00.000.000/0000-00</strong>. Eles se dividem em três blocos:
      </p>
      <TableWrap>
        <thead>
          <tr>
            <th>Bloco</th>
            <th>Posições</th>
            <th>Significado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Raiz (base)</td>
            <td>1 a 8</td>
            <td>Identifica a empresa. É a mesma para matriz e filiais.</td>
          </tr>
          <tr>
            <td>Ordem (sufixo)</td>
            <td>9 a 12</td>
            <td>Identifica o estabelecimento: 0001 é a matriz, 0002 em diante são filiais.</td>
          </tr>
          <tr>
            <td>Dígitos verificadores</td>
            <td>13 e 14</td>
            <td>Calculados a partir dos 12 anteriores pelo módulo 11.</td>
          </tr>
        </tbody>
      </TableWrap>
      <p>
        Saber disso ajuda em tarefas práticas: para agrupar todas as filiais de um grupo basta comparar os oito primeiros dígitos, e
        para saber se um CNPJ é de matriz basta olhar se a ordem é 0001.
      </p>

      <h2 id="algoritmo">O algoritmo dos dígitos verificadores</h2>
      <p>
        Os dois últimos dígitos são calculados com o algoritmo do módulo 11, usando pesos que vão de 2 a 9 e recomeçam quando chegam a
        9. O procedimento é o seguinte:
      </p>
      <ol>
        <li>
          <strong>Primeiro dígito.</strong> Multiplique os 12 primeiros dígitos pelos pesos <code>5 4 3 2 9 8 7 6 5 4 3 2</code>, da
          esquerda para a direita, e some os produtos.
        </li>
        <li>
          Calcule o resto da divisão da soma por 11. Se o resto for menor que 2, o dígito é 0. Caso contrário, o dígito é{' '}
          <code>11 - resto</code>.
        </li>
        <li>
          <strong>Segundo dígito.</strong> Repita o processo com os 13 primeiros dígitos (incluindo o primeiro verificador que acabou
          de ser calculado) e os pesos <code>6 5 4 3 2 9 8 7 6 5 4 3 2</code>.
        </li>
        <li>
          Compare os dois dígitos obtidos com os dois últimos do CNPJ informado. Se forem iguais, o número é válido.
        </li>
      </ol>
      <p>
        Há uma regra adicional: sequências com todos os dígitos iguais (00000000000000, 11111111111111 e assim por diante) passam no
        cálculo mas não são CNPJs reais, por isso devem ser rejeitadas antes de qualquer cálculo.
      </p>

      <h3>Implementação em JavaScript</h3>
      <Code lang="js" title="validar-cnpj.js">{`export function validarCnpj(valor) {
  const cnpj = String(valor).replace(/\\D/g, '');

  if (cnpj.length !== 14) return false;
  if (/^(\\d)\\1{13}$/.test(cnpj)) return false; // todos os dígitos iguais

  const calcularDigito = (base, pesos) => {
    const soma = base
      .split('')
      .reduce((acc, digito, i) => acc + Number(digito) * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const dv1 = calcularDigito(cnpj.slice(0, 12), pesos1);
  const dv2 = calcularDigito(cnpj.slice(0, 12) + dv1, pesos2);

  return cnpj.slice(12) === \`\${dv1}\${dv2}\`;
}

validarCnpj('11.222.333/0001-81'); // true
validarCnpj('11.222.333/0001-80'); // false`}</Code>

      <h3>Passo a passo com um exemplo</h3>
      <p>
        Para o CNPJ <strong>11.222.333/0001-81</strong>, os 12 primeiros dígitos são 1 1 2 2 2 3 3 3 0 0 0 1. Multiplicando pelos
        pesos 5 4 3 2 9 8 7 6 5 4 3 2 e somando: 5 + 4 + 6 + 4 + 18 + 24 + 21 + 18 + 0 + 0 + 0 + 2 = 102. O resto de 102 por 11 é 3,
        então o primeiro dígito é 11 − 3 = 8. Para o segundo, os 13 dígitos 1 1 2 2 2 3 3 3 0 0 0 1 8 multiplicados por 6 5 4 3 2 9 8
        7 6 5 4 3 2 somam 6 + 5 + 8 + 6 + 4 + 27 + 24 + 21 + 0 + 0 + 0 + 3 + 16 = 120. O resto de 120 por 11 é 10, e 11 − 10 = 1. Os
        dígitos verificadores são 81, exatamente os informados.
      </p>

      <Callout tone="info" title="CNPJ alfanumérico">
        <p>
          A Receita Federal passou a emitir CNPJs alfanuméricos para novas inscrições a partir de 2026. Conforme a especificação
          divulgada, os 12 primeiros caracteres podem conter letras e os dois dígitos verificadores continuam numéricos. O cálculo é o
          mesmo, com cada caractere convertido pelo seu código ASCII menos 48 (o dígito &quot;0&quot; vale 0, a letra &quot;A&quot;
          vale 17). Se o seu sistema receberá cadastros novos, prepare a validação para aceitar letras nos 12 primeiros caracteres.
        </p>
      </Callout>

      <h2 id="valido-nao-e-existente">Dígito válido não significa empresa existente</h2>
      <p>
        O algoritmo garante apenas que o número foi bem formado. Ele não diz se o CNPJ foi emitido, para quem, nem se a empresa ainda
        opera. Um gerador aleatório produz milhões de CNPJs válidos pelo cálculo que nunca existiram na Receita. Por isso, cadastros
        que envolvem risco (crédito, fornecedores, emissão de notas, marketplaces) precisam de uma segunda etapa: a consulta cadastral.
      </p>
      <p>
        A <Link href="/ferramentas/validar-cnpj">ferramenta de validação de CNPJ</Link> do RetechHub faz as duas etapas: primeiro
        verifica os dígitos e, se o número for válido, consulta os dados cadastrais e exibe razão social, situação, endereço,
        atividades e sócios.
      </p>

      <h2 id="situacao-cadastral">O que significa a situação cadastral</h2>
      <p>
        A situação cadastral é o status do CNPJ perante a Receita Federal. É o campo mais importante para decidir se você pode fazer
        negócio com uma empresa. Os valores possíveis são:
      </p>
      <TableWrap>
        <thead>
          <tr>
            <th>Situação</th>
            <th>Significado</th>
            <th>Impacto prático</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ativa</strong></td>
            <td>A empresa está regular e pode operar normalmente.</td>
            <td>Apta a emitir notas, contratar e participar de licitações.</td>
          </tr>
          <tr>
            <td><strong>Suspensa</strong></td>
            <td>A inscrição foi suspensa, em geral por pendências ou a pedido da própria empresa durante um processo.</td>
            <td>Situação transitória; verifique o motivo antes de prosseguir.</td>
          </tr>
          <tr>
            <td><strong>Inapta</strong></td>
            <td>A empresa deixou de entregar declarações obrigatórias por período prolongado.</td>
            <td>Em regra não pode emitir notas fiscais; sinal de alerta forte.</td>
          </tr>
          <tr>
            <td><strong>Baixada</strong></td>
            <td>O CNPJ foi encerrado, a pedido ou de ofício.</td>
            <td>A empresa não existe mais juridicamente para fins operacionais.</td>
          </tr>
          <tr>
            <td><strong>Nula</strong></td>
            <td>A inscrição foi anulada, geralmente por vício no registro ou duplicidade.</td>
            <td>Trate como inexistente.</td>
          </tr>
        </tbody>
      </TableWrap>
      <p>
        Junto da situação vem a <strong>data da situação cadastral</strong>, que indica desde quando aquele status vale. Uma empresa
        &quot;Ativa&quot; desde ontem merece mais atenção do que uma ativa há quinze anos.
      </p>

      <h2 id="consulta-por-api">Consultando CNPJ por API: QSA, CNAEs e endereço</h2>
      <p>
        Para automatizar a consulta, o endpoint <code>GET https://api-core.theretech.com.br/cnpj/&#123;numero&#125;</code> recebe o
        CNPJ com ou sem formatação e retorna um JSON com os dados cadastrais consolidados. A API valida os dígitos antes de consultar
        (um número inválido devolve 400 sem gastar uma consulta externa) e mantém cache das respostas para acelerar consultas
        repetidas.
      </p>
      <Code lang="js" title="consultar-cnpj.js">{`const res = await fetch('https://api-core.theretech.com.br/cnpj/11222333000181', {
  headers: { 'X-API-Key': process.env.RETECH_API_KEY },
});

if (res.status === 400) throw new Error('CNPJ inválido');
if (res.status === 404) throw new Error('CNPJ não encontrado na base');

const empresa = await res.json();
console.log(empresa.razaoSocial, empresa.situacao);`}</Code>
      <h3>Campos da resposta</h3>
      <Code lang="json">{`{
  "cnpj": "11222333000181",
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "nomeFantasia": "EXEMPLO",
  "situacao": "ATIVA",
  "dataSituacao": "2015-03-10",
  "dataAbertura": "2010-07-01",
  "porte": "ME",
  "naturezaJuridica": "206-2 - Sociedade Empresária Limitada",
  "capitalSocial": 50000,
  "endereco": {
    "logradouro": "RUA EXEMPLO", "numero": "100", "complemento": "SALA 2",
    "bairro": "CENTRO", "cep": "88010-000", "municipio": "FLORIANOPOLIS", "uf": "SC"
  },
  "telefones": ["4830000000"],
  "email": "contato@exemplo.com.br",
  "atividadePrincipal": { "codigo": "62.01-5-01", "descricao": "Desenvolvimento de programas de computador sob encomenda" },
  "atividadesSecundarias": [
    { "codigo": "62.02-3-00", "descricao": "Desenvolvimento e licenciamento de programas de computador customizáveis" }
  ],
  "qsa": [
    { "nome": "FULANO DE TAL", "qualificacao": "Sócio-Administrador" },
    { "nome": "BELTRANA DA SILVA", "qualificacao": "Sócio" }
  ],
  "source": "cache"
}`}</Code>
      <p>Três blocos merecem atenção especial:</p>
      <ul>
        <li>
          <strong>QSA (Quadro de Sócios e Administradores).</strong> Lista nome e qualificação de cada sócio ou administrador. É o que
          permite checar se a pessoa que assina um contrato realmente representa a empresa. A API retorna apenas os dados públicos; CPF
          dos sócios não é exposto.
        </li>
        <li>
          <strong>CNAEs.</strong> A atividade principal e as secundárias seguem a Classificação Nacional de Atividades Econômicas. Úteis
          para verificar se a empresa pode prestar o serviço contratado e para segmentação comercial.
        </li>
        <li>
          <strong>Endereço com CEP.</strong> O CEP retornado pode ser enriquecido com a <Link href="/apis/cep">API de CEP</Link> para
          obter o código IBGE do município e o DDD.
        </li>
      </ul>
      <Callout tone="tip" title="Fluxo recomendado em cadastros">
        <p>
          1. Valide os dígitos no front-end e bloqueie o envio de números inválidos. 2. No backend, consulte a API e rejeite situações
          diferentes de &quot;Ativa&quot; ou envie para análise manual. 3. Guarde razão social, situação e data da consulta junto do
          cadastro, para auditoria. 4. Reconsulte periodicamente os CNPJs ativos na sua base; a situação muda.
        </p>
      </Callout>

      <h2 id="erros-comuns">Erros comuns ao validar CNPJ</h2>
      <ul>
        <li>
          <strong>Validar só o formato com expressão regular.</strong> Uma regex garante 14 dígitos, não a consistência dos
          verificadores. Use o algoritmo.
        </li>
        <li>
          <strong>Esquecer os zeros à esquerda.</strong> CNPJs podem começar com 0. Se o número passar por um campo numérico, o zero
          some e o cálculo quebra. Trate sempre como string.
        </li>
        <li>
          <strong>Confundir matriz e filial.</strong> A raiz é a mesma, mas cada filial tem CNPJ próprio e pode ter situação
          cadastral diferente da matriz.
        </li>
        <li>
          <strong>Não tratar o 404.</strong> Um CNPJ válido pelo cálculo pode não existir ou ter sido emitido há poucos dias e ainda
          não constar nas bases. Permita revisão manual.
        </li>
      </ul>

      <h2 id="leia-mais">Para continuar</h2>
      <p>
        O mesmo princípio de &quot;formato válido não é existência&quot; vale para endereços: veja{' '}
        <Link href="/blog/consultar-cep-gratis">como funciona o CEP brasileiro</Link>. Para integrar consulta de endereço no mesmo
        cadastro, o tutorial <Link href="/blog/api-cep-gratuita">API de CEP gratuita em Node, PHP e Python</Link> mostra o código. A
        referência completa dos endpoints está na <Link href="/docs">documentação</Link>.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'Como validar CNPJ sem consultar a Receita Federal?',
            answer:
              'Aplique o algoritmo do módulo 11: multiplique os 12 primeiros dígitos pelos pesos 5 4 3 2 9 8 7 6 5 4 3 2, calcule o resto por 11 e obtenha o primeiro verificador; repita com 13 dígitos e os pesos 6 5 4 3 2 9 8 7 6 5 4 3 2 para o segundo. Isso confirma apenas que o número é bem formado, não que a empresa existe.',
          },
          {
            question: 'O que significa CNPJ com situação cadastral "Inapta"?',
            answer:
              'Significa que a empresa deixou de entregar declarações obrigatórias à Receita Federal por período prolongado. Em regra, uma empresa inapta não pode emitir notas fiscais e sua regularização depende de entregar as declarações pendentes.',
          },
          {
            question: 'A consulta de CNPJ por API retorna o CPF dos sócios?',
            answer:
              'Não. O QSA retornado contém apenas os dados públicos: nome e qualificação de cada sócio ou administrador.',
          },
          {
            question: 'Qual a diferença entre a raiz do CNPJ e o CNPJ completo?',
            answer:
              'A raiz são os 8 primeiros dígitos e identifica a empresa como um todo. O CNPJ completo acrescenta 4 dígitos de ordem (0001 para a matriz, 0002 em diante para filiais) e 2 dígitos verificadores. Cada estabelecimento tem um CNPJ completo diferente, mas a mesma raiz.',
          },
        ]}
      />
    </>
  );
}

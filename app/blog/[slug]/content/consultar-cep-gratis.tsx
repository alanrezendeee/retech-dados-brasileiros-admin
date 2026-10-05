import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Callout, TableWrap } from '../../_components/article-ui';

export default function ConsultarCepGratis() {
  return (
    <>
      <p>
        Consultar um CEP é algo que todo mundo já fez, mas poucas pessoas sabem o que aqueles oito dígitos significam. Este guia
        explica como consultar CEP grátis em segundos, como funciona a estrutura do Código de Endereçamento Postal brasileiro, por que
        algumas cidades têm um único CEP e como descobrir o CEP quando você só tem o nome da rua.
      </p>

      <h2 id="como-consultar">Como consultar CEP grátis agora</h2>
      <p>
        A forma mais rápida é usar a <Link href="/ferramentas/consultar-cep">ferramenta de consulta de CEP</Link> da Retech Core:
        digite os oito dígitos, com ou sem hífen, e o resultado mostra logradouro, bairro, cidade, estado, código IBGE do município e
        DDD. Não é preciso cadastro. A consulta usa a mesma <Link href="/apis/cep">API de CEP</Link> que atende aplicações em produção,
        com várias fontes de dados e cache, então o resultado costuma aparecer em menos de um segundo.
      </p>
      <p>Outras formas de consultar sem custo:</p>
      <ul>
        <li>
          <strong>Site dos Correios.</strong> É a fonte oficial e permite buscar tanto por CEP quanto por endereço. Pode exigir
          verificação (captcha) e tem limite de resultados por consulta.
        </li>
        <li>
          <strong>Páginas por estado e cidade.</strong> Em <Link href="/cep">CEPs por estado</Link> você navega pelas unidades da
          federação e pelos municípios para encontrar faixas de CEP e logradouros.
        </li>
        <li>
          <strong>API gratuita.</strong> Para quem desenvolve software, o plano gratuito da API permite 100 consultas por dia. O
          tutorial <Link href="/blog/api-cep-gratuita">API de CEP gratuita em Node, PHP e Python</Link> mostra o código completo.
        </li>
      </ul>

      <h2 id="o-que-e-o-cep">O que é o CEP e para que ele serve</h2>
      <p>
        O CEP (Código de Endereçamento Postal) é o sistema criado pelos Correios para identificar localidades, logradouros e pontos
        de entrega no território brasileiro. Ele começou com cinco dígitos nos anos 1970 e, conforme a história oficial dos Correios,
        passou ao formato atual de oito dígitos em 1992, com a inclusão do sufixo de três dígitos que identifica o logradouro ou o
        trecho dele.
      </p>
      <p>
        Hoje o CEP vai muito além da entrega de cartas. Ele é usado para preencher formulários automaticamente, calcular frete, definir
        áreas de atendimento, validar cadastros e cruzar dados com o código IBGE do município. Por isso tantas aplicações precisam de
        uma consulta confiável.
      </p>

      <h2 id="estrutura-dos-8-digitos">A estrutura dos 8 dígitos do CEP</h2>
      <p>
        O CEP é escrito no formato <strong>00000-000</strong>. Os cinco primeiros dígitos indicam a localização geográfica de forma
        hierárquica, do mais amplo para o mais específico. Os três últimos, após o hífen, identificam o logradouro ou um trecho dele.
        Tomando como exemplo o CEP 01310-100, da Avenida Paulista em São Paulo:
      </p>
      <TableWrap caption="Significado de cada posição do CEP 01310-100">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Dígito</th>
            <th>Nome</th>
            <th>O que indica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1º</td>
            <td>0</td>
            <td>Região</td>
            <td>Uma das 10 regiões postais do país (0 = Grande São Paulo)</td>
          </tr>
          <tr>
            <td>2º</td>
            <td>1</td>
            <td>Sub-região</td>
            <td>Subdivisão da região (1 = São Paulo capital, zona central)</td>
          </tr>
          <tr>
            <td>3º</td>
            <td>3</td>
            <td>Setor</td>
            <td>Subdivisão da sub-região, em geral um conjunto de bairros</td>
          </tr>
          <tr>
            <td>4º</td>
            <td>1</td>
            <td>Subsetor</td>
            <td>Subdivisão do setor</td>
          </tr>
          <tr>
            <td>5º</td>
            <td>0</td>
            <td>Divisor de subsetor</td>
            <td>Última subdivisão geográfica antes do logradouro</td>
          </tr>
          <tr>
            <td>6º a 8º</td>
            <td>100</td>
            <td>Sufixo</td>
            <td>Identifica o logradouro ou um trecho dele (lado par, lado ímpar, faixa de números)</td>
          </tr>
        </tbody>
      </TableWrap>

      <h3>As 10 regiões postais (primeiro dígito)</h3>
      <p>
        O primeiro dígito divide o Brasil em dez regiões. Elas não seguem exatamente as regiões geográficas do IBGE; foram definidas
        pela logística postal, partindo de São Paulo e crescendo no sentido anti-horário pelo mapa.
      </p>
      <TableWrap>
        <thead>
          <tr>
            <th>Dígito</th>
            <th>Abrangência</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>Grande São Paulo</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Interior de São Paulo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Rio de Janeiro e Espírito Santo</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Minas Gerais</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Bahia e Sergipe</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Pernambuco, Alagoas, Paraíba e Rio Grande do Norte</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Ceará, Piauí, Maranhão, Pará, Amazonas, Acre, Amapá e Roraima</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Distrito Federal, Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul e Rondônia</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Paraná e Santa Catarina</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Rio Grande do Sul</td>
          </tr>
        </tbody>
      </TableWrap>
      <p>
        Na prática isso significa que, só de olhar o primeiro dígito, você já sabe em que parte do país o endereço está. Um CEP que
        começa com 8 é do Sul, com 3 é de Minas, com 7 do Centro-Oeste ou de Rondônia. Essa regra é útil para validações rápidas: se o
        usuário informou UF = SC e um CEP começando com 2, há algo errado.
      </p>

      <h2 id="cep-geral-vs-logradouro">CEP geral versus CEP de logradouro</h2>
      <p>
        Nem toda localidade tem um CEP para cada rua. Os Correios atribuem CEP por logradouro apenas em municípios e distritos com
        volume postal suficiente. Nos demais, existe um único <strong>CEP geral</strong>, que identifica toda a localidade e
        tradicionalmente termina em <strong>-000</strong>. Isso explica dois comportamentos comuns ao consultar CEP:
      </p>
      <ul>
        <li>
          Em um CEP geral, a consulta retorna cidade e estado preenchidos, mas <strong>logradouro e bairro vazios</strong>. Não é
          erro: a rua simplesmente não tem código próprio e precisa ser digitada.
        </li>
        <li>
          Em cidades grandes, a mesma rua pode ter vários CEPs, um para cada trecho ou lado. O campo <code>complemento</code> da
          resposta (por exemplo &quot;de 612 a 1510 - lado par&quot;) indica a faixa de numeração coberta por aquele código.
        </li>
      </ul>
      <p>Além dos CEPs de logradouro e dos CEPs gerais, existem outras categorias que vale conhecer:</p>
      <ul>
        <li>
          <strong>CEP de grande usuário:</strong> empresas, órgãos públicos e condomínios com alto volume de correspondência recebem um
          código exclusivo. Esses CEPs às vezes não aparecem em bases públicas.
        </li>
        <li>
          <strong>CEP de unidade operacional dos Correios:</strong> agências e centros de distribuição.
        </li>
        <li>
          <strong>CEP de caixa postal comunitária:</strong> usado em localidades sem entrega domiciliar.
        </li>
        <li>
          <strong>CEP promocional:</strong> códigos temporários para campanhas e eventos.
        </li>
      </ul>
      <Callout tone="info" title="Por que isso importa para formulários">
        <p>
          Um bom formulário trata &quot;CEP não encontrado&quot; e &quot;CEP geral sem logradouro&quot; da mesma forma: libera os
          campos para digitação. Bloquear o cadastro nesses casos exclui moradores de cidades pequenas e funcionários de grandes
          empresas.
        </p>
      </Callout>

      <h2 id="descobrir-cep-pelo-endereco">Como descobrir o CEP pelo endereço</h2>
      <p>
        O caminho inverso, encontrar o CEP a partir da rua, é tão comum quanto a consulta direta. Use a{' '}
        <Link href="/ferramentas/buscar-cep">busca de CEP por endereço</Link>: informe o estado, a cidade e parte do nome do logradouro
        (pelo menos três caracteres) e a ferramenta lista os CEPs correspondentes, com o trecho coberto por cada um.
      </p>
      <p>Algumas dicas para a busca dar certo de primeira:</p>
      <ol>
        <li>
          <strong>Omita o tipo do logradouro</strong> se não tiver certeza. Buscar por &quot;Paulista&quot; encontra &quot;Avenida
          Paulista&quot; e evita erros como escrever &quot;Av.&quot; em vez de &quot;Avenida&quot;.
        </li>
        <li>
          <strong>Use a grafia oficial da cidade</strong>, com acentos. &quot;Florianópolis&quot; e &quot;Florianopolis&quot; podem
          ser tratados de forma diferente por algumas fontes.
        </li>
        <li>
          <strong>Confira o número.</strong> Em ruas longas, escolha o CEP cujo complemento inclui a numeração do seu endereço.
        </li>
        <li>
          <strong>Cidades sem CEP por rua</strong> retornam apenas o CEP geral. Nesse caso, ele é o CEP correto para qualquer endereço
          do município.
        </li>
      </ol>

      <h2 id="cep-e-codigo-ibge">CEP, código IBGE e DDD: o que cada um identifica</h2>
      <p>
        A consulta de CEP costuma devolver dois códigos além do endereço, e eles são frequentemente confundidos. O{' '}
        <strong>código IBGE</strong> tem sete dígitos e identifica o município, não o endereço. Os dois primeiros dígitos indicam a
        unidade da federação (42 para Santa Catarina, 35 para São Paulo) e os demais o município dentro dela. Ele é o identificador
        usado em sistemas públicos, notas fiscais eletrônicas, cadastros de saúde e estatísticas, e por isso vale guardá-lo junto do
        endereço do cliente. O <strong>DDD</strong> é o código de área telefônico da localidade e serve, por exemplo, para validar se
        o telefone informado é coerente com o endereço.
      </p>
      <p>
        Já o CEP identifica o ponto de entrega. Um município tem um único código IBGE e pode ter milhares de CEPs; um CEP pertence a
        um único município. Essa relação de um para muitos é o que permite, a partir de qualquer CEP, chegar ao município e ao estado
        com segurança, mesmo que o usuário tenha escrito o nome da cidade de forma diferente.
      </p>

      <h2 id="erros-comuns">Erros comuns ao consultar CEP</h2>
      <ul>
        <li>
          <strong>Trocar dígitos.</strong> O erro mais frequente. Como o CEP não tem dígito verificador, um CEP digitado errado pode
          apontar para um endereço real em outra cidade. Sempre mostre o endereço encontrado para o usuário confirmar.
        </li>
        <li>
          <strong>Confundir CEP com código IBGE.</strong> O código IBGE identifica o município (7 dígitos) e vem na resposta da
          consulta; ele não substitui o CEP.
        </li>
        <li>
          <strong>Esperar que todo CEP tenha rua.</strong> Como visto, CEPs gerais retornam logradouro vazio.
        </li>
        <li>
          <strong>CEP novo demais.</strong> Loteamentos e ruas recentes podem levar semanas para aparecer nas bases. Se a consulta não
          encontrar, confira no site dos Correios e permita o preenchimento manual.
        </li>
      </ul>

      <h2 id="para-desenvolvedores">Para desenvolvedores</h2>
      <p>
        Se você precisa de consulta de CEP dentro de um sistema, a <Link href="/apis/cep">API de CEP</Link> expõe os mesmos dados da
        ferramenta em JSON, com os campos <code>cep</code>, <code>logradouro</code>, <code>complemento</code>, <code>bairro</code>,{' '}
        <code>localidade</code>, <code>uf</code>, <code>ibge</code> e <code>ddd</code>. Ela consulta várias fontes com fallback
        automático e mantém cache em três camadas, o que evita a instabilidade de depender de um único provedor. Se você vem do ViaCEP,
        o post <Link href="/blog/alternativa-viacep">Alternativa ao ViaCEP</Link> tem o guia de migração.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'O CEP tem dígito verificador?',
            answer:
              'Não. Diferentemente do CPF e do CNPJ, o CEP não possui dígito de verificação. A única validação possível pelo formato é checar se há exatamente 8 dígitos. Para saber se o CEP existe, é preciso consultá-lo em uma base de dados.',
          },
          {
            question: 'Por que a consulta retornou a cidade mas não a rua?',
            answer:
              'Porque o CEP consultado é um CEP geral, usado por municípios ou distritos em que os Correios não atribuem código por logradouro. Nesses casos todos os endereços da localidade usam o mesmo CEP e a rua precisa ser informada manualmente.',
          },
          {
            question: 'Como descobrir o CEP de uma rua?',
            answer:
              'Use a busca de CEP por endereço em /ferramentas/buscar-cep: informe estado, cidade e parte do nome da rua. A ferramenta lista os CEPs correspondentes e o trecho (faixa de numeração) coberto por cada um.',
          },
          {
            question: 'O que significa o primeiro dígito do CEP?',
            answer:
              'Ele indica a região postal. 0 e 1 são São Paulo (capital e interior), 2 é Rio de Janeiro e Espírito Santo, 3 é Minas Gerais, 4 é Bahia e Sergipe, 5 vai de Pernambuco ao Rio Grande do Norte, 6 cobre o restante do Nordeste e o Norte, 7 o Centro-Oeste e Rondônia, 8 é Paraná e Santa Catarina e 9 é o Rio Grande do Sul.',
          },
          {
            question: 'Consultar CEP pela API é grátis?',
            answer:
              'Sim. O plano gratuito da Retech Core permite 100 requisições por dia com uma chave de API criada sem cartão de crédito. A ferramenta online de consulta não tem limite para uso manual.',
          },
        ]}
      />
    </>
  );
}

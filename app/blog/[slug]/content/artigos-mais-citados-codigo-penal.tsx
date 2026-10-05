import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Callout, TableWrap, ArtigoLink } from '../../_components/article-ui';

interface Artigo {
  numero: string;
  nome: string;
  pena: string;
  texto: React.ReactNode;
}

const ARTIGOS: Artigo[] = [
  {
    numero: '121',
    nome: 'Homicídio',
    pena: 'Reclusão de 6 a 20 anos (simples); 12 a 30 anos (qualificado)',
    texto: (
      <>
        &quot;Matar alguém&quot; é o tipo penal mais curto e mais citado do Código. O § 2º lista as qualificadoras (motivo torpe ou
        fútil, meio cruel, recurso que dificulta a defesa, entre outras), que elevam a pena para 12 a 30 anos e tornam o crime hediondo.
        O § 3º trata do homicídio culposo, com detenção de 1 a 3 anos. O feminicídio, antes uma qualificadora, hoje é tipo autônomo
        no <ArtigoLink numero="121-A">art. 121-A</ArtigoLink>, com reclusão de 20 a 40 anos.
      </>
    ),
  },
  {
    numero: '129',
    nome: 'Lesão corporal',
    pena: 'Detenção de 3 meses a 1 ano (leve); reclusão de 1 a 5 anos (grave), 2 a 8 anos (gravíssima) e 4 a 12 anos (seguida de morte)',
    texto: (
      <>
        Ofender a integridade corporal ou a saúde de outra pessoa. É o artigo de brigas, agressões e acidentes com culpa. A gravidade
        do resultado define o parágrafo: incapacidade por mais de 30 dias ou perigo de vida configuram lesão grave; incapacidade
        permanente, deformidade ou aborto configuram gravíssima. O § 9º trata da violência doméstica, com reclusão de 2 a 5 anos.
      </>
    ),
  },
  {
    numero: '147',
    nome: 'Ameaça',
    pena: 'Detenção de 1 a 6 meses, ou multa',
    texto: (
      <>
        Ameaçar alguém, por palavra, escrito, gesto ou qualquer outro meio simbólico, de causar-lhe mal injusto e grave. É um dos
        crimes mais registrados em delegacias, frequentemente associado a conflitos familiares e de vizinhança. Em regra, a ação
        penal depende de representação da vítima.
      </>
    ),
  },
  {
    numero: '155',
    nome: 'Furto',
    pena: 'Reclusão de 1 a 6 anos e multa (simples); 2 a 8 anos e multa (qualificado)',
    texto: (
      <>
        Subtrair coisa alheia móvel, para si ou para outrem, sem violência ou grave ameaça. A ausência de violência é o que o separa
        do roubo. O § 4º traz as qualificadoras (rompimento de obstáculo, abuso de confiança, fraude, chave falsa, concurso de
        pessoas) e os parágrafos seguintes tratam de furto com explosivo (hediondo), fraude eletrônica, veículo levado para outro
        estado e subtração de combustíveis, todos com reclusão de 4 a 10 anos.
      </>
    ),
  },
  {
    numero: '157',
    nome: 'Roubo',
    pena: 'Reclusão de 6 a 10 anos e multa; latrocínio (§ 3º, II): 24 a 30 anos e multa',
    texto: (
      <>
        Subtrair coisa móvel alheia mediante grave ameaça ou violência à pessoa. As causas de aumento do § 2º (concurso de pessoas,
        restrição de liberdade, veículo levado a outro estado) e do § 2º-A (arma de fogo, aumento de dois terços) são as mais
        discutidas em juízo. Quando da violência resulta morte, configura-se o latrocínio, julgado pelo juiz singular e não pelo
        Tribunal do Júri.
      </>
    ),
  },
  {
    numero: '158',
    nome: 'Extorsão',
    pena: 'Reclusão de 4 a 10 anos e multa; 6 a 12 anos e multa com restrição de liberdade',
    texto: (
      <>
        Constranger alguém, mediante violência ou grave ameaça, a fazer, tolerar ou deixar de fazer algo, com o objetivo de obter
        vantagem econômica indevida. Diferencia-se do roubo porque a vítima participa da entrega do bem. O § 3º, que trata do
        chamado &quot;sequestro relâmpago&quot;, é hediondo.
      </>
    ),
  },
  {
    numero: '159',
    nome: 'Extorsão mediante sequestro',
    pena: 'Reclusão de 8 a 15 anos; 12 a 20 (mais de 24 horas, menor de 18 ou maior de 60); 16 a 24 (lesão grave); 24 a 30 (morte)',
    texto: (
      <>
        Sequestrar pessoa com o fim de obter qualquer vantagem como condição ou preço do resgate. Todas as suas formas são crimes
        hediondos. O § 4º prevê redução de um a dois terços para o concorrente que denunciar o crime e facilitar a libertação da
        vítima.
      </>
    ),
  },
  {
    numero: '163',
    nome: 'Dano',
    pena: 'Detenção de 1 a 6 meses, ou multa (simples)',
    texto: (
      <>
        Destruir, inutilizar ou deteriorar coisa alheia. Aparece em casos de vandalismo, conflitos entre vizinhos e acidentes de
        trânsito com dolo. O parágrafo único traz o dano qualificado (violência, uso de substância inflamável, patrimônio público),
        com detenção de 6 meses a 3 anos e multa.
      </>
    ),
  },
  {
    numero: '168',
    nome: 'Apropriação indébita',
    pena: 'Reclusão de 1 a 4 anos e multa',
    texto: (
      <>
        Apropriar-se de coisa alheia móvel de que se tem a posse ou a detenção. O agente recebe o bem licitamente e depois decide
        ficar com ele. É o artigo do depositário infiel, do funcionário que não devolve o equipamento e do prestador de serviço que
        retém valores de clientes. O § 1º aumenta a pena em um terço quando há depósito necessário, profissão ou função.
      </>
    ),
  },
  {
    numero: '171',
    nome: 'Estelionato',
    pena: 'Reclusão de 1 a 5 anos e multa',
    texto: (
      <>
        Obter vantagem ilícita em prejuízo alheio, induzindo ou mantendo alguém em erro mediante artifício, ardil ou outro meio
        fraudulento. É o tipo dos golpes em geral, inclusive os digitais. A fraude eletrônica (§ 2º-A) e o estelionato contra idoso
        ou vulnerável (§ 4º) têm penas mais altas. Desde o Pacote Anticrime, em regra a ação penal depende de representação.
      </>
    ),
  },
  {
    numero: '180',
    nome: 'Receptação',
    pena: 'Reclusão de 2 a 6 anos e multa (conforme a redação atual)',
    texto: (
      <>
        Adquirir, receber, transportar, conduzir ou ocultar coisa que sabe ser produto de crime, ou influir para que terceiro de
        boa-fé a adquira. A receptação qualificada (§ 1º), praticada no exercício de atividade comercial ou industrial, tem pena de reclusão de 3 a 8
        anos e multa. É a figura mais usada contra quem compra celular, carro ou peça de origem ilícita.
      </>
    ),
  },
  {
    numero: '213',
    nome: 'Estupro',
    pena: 'Reclusão de 6 a 10 anos; 8 a 12 (lesão grave ou vítima entre 14 e 18 anos); 12 a 30 (morte)',
    texto: (
      <>
        Constranger alguém, mediante violência ou grave ameaça, a ter conjunção carnal ou a praticar ou permitir que com ele se
        pratique outro ato libidinoso. Desde 2009 o tipo abrange vítimas de qualquer gênero e qualquer ato libidinoso, não apenas a
        conjunção carnal. É crime hediondo em todas as suas formas.
      </>
    ),
  },
  {
    numero: '217-A',
    nome: 'Estupro de vulnerável',
    pena: 'Reclusão de 10 a 18 anos e multa; 12 a 24 (lesão grave); 20 a 40 (morte)',
    texto: (
      <>
        Ter conjunção carnal ou praticar outro ato libidinoso com menor de 14 anos, ou com quem, por enfermidade ou deficiência
        mental, não tem discernimento, ou que por qualquer causa não pode oferecer resistência. Não há exigência de violência: a
        vulnerabilidade da vítima substitui esse elemento. Também é hediondo.
      </>
    ),
  },
  {
    numero: '288',
    nome: 'Associação criminosa',
    pena: 'Reclusão de 1 a 3 anos',
    texto: (
      <>
        Associarem-se três ou mais pessoas para o fim específico de cometer crimes. É a antiga &quot;formação de quadrilha&quot;,
        renomeada em 2013. A pena aumenta até a metade se a associação é armada ou se há participação de criança ou adolescente. Não
        se confunde com a organização criminosa da Lei 12.850/2013, que exige quatro ou mais pessoas, estrutura ordenada e crimes com
        pena máxima superior a quatro anos.
      </>
    ),
  },
  {
    numero: '299',
    nome: 'Falsidade ideológica',
    pena: 'Reclusão de 1 a 5 anos e multa (documento público); 1 a 3 anos e multa (particular)',
    texto: (
      <>
        Omitir, em documento público ou particular, declaração que dele devia constar, ou inserir declaração falsa ou diversa da que
        devia ser escrita, com o fim de prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante.
        O documento é materialmente verdadeiro; o conteúdo é que mente. É o crime das declarações falsas em contratos, atas e
        cadastros.
      </>
    ),
  },
  {
    numero: '304',
    nome: 'Uso de documento falso',
    pena: 'A mesma cominada à falsificação ou alteração do documento usado',
    texto: (
      <>
        Fazer uso de qualquer dos papéis falsificados ou alterados a que se referem os arts. 297 a 302. Quem usa responde pela mesma
        pena de quem falsificou: reclusão de 2 a 6 anos e multa se o documento é público (art. 297) e de 1 a 5 anos e multa se é
        particular (art. 298). É comum em abordagens de trânsito com CNH falsa e em fraudes com certidões e diplomas.
      </>
    ),
  },
  {
    numero: '311',
    nome: 'Adulteração de sinal identificador de veículo automotor',
    pena: 'Reclusão de 3 a 6 anos e multa',
    texto: (
      <>
        Adulterar, remarcar ou suprimir número de chassi, monobloco, motor, placa de identificação ou qualquer sinal identificador de
        veículo automotor, elétrico, híbrido ou de seu componente. Aparece com frequência junto com a receptação em apreensões de
        veículos clonados. A redação atual alcança também componentes e veículos elétricos.
      </>
    ),
  },
  {
    numero: '312',
    nome: 'Peculato',
    pena: 'Reclusão de 2 a 12 anos e multa',
    texto: (
      <>
        Apropriar-se o funcionário público de dinheiro, valor ou bem móvel, público ou particular, de que tem a posse em razão do
        cargo, ou desviá-lo em proveito próprio ou alheio. É o primeiro dos crimes contra a administração pública praticados por
        funcionário. O § 3º permite a extinção da punibilidade pela reparação do dano, apenas no peculato culposo.
      </>
    ),
  },
  {
    numero: '317',
    nome: 'Corrupção passiva',
    pena: 'Reclusão de 2 a 12 anos e multa',
    texto: (
      <>
        Solicitar ou receber, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em
        razão dela, vantagem indevida, ou aceitar promessa de tal vantagem. É o lado do funcionário público. O lado de quem oferece
        é a corrupção ativa do <ArtigoLink numero="333">art. 333</ArtigoLink>, com a mesma pena de 2 a 12 anos e multa.
      </>
    ),
  },
  {
    numero: '331',
    nome: 'Desacato',
    pena: 'Detenção de 6 meses a 2 anos, ou multa',
    texto: (
      <>
        Desacatar funcionário público no exercício da função ou em razão dela. Costuma aparecer em boletins de ocorrência junto com a
        resistência (<ArtigoLink numero="329">art. 329</ArtigoLink>, detenção de 2 meses a 2 anos) e a desobediência (
        <ArtigoLink numero="330">art. 330</ArtigoLink>, detenção de 15 dias a 6 meses e multa). Conforme a redação atual, segue em
        vigor, embora sua compatibilidade com a liberdade de expressão tenha sido discutida nos tribunais superiores.
      </>
    ),
  },
];

export default function ArtigosMaisCitadosCodigoPenal() {
  return (
    <>
      <p>
        Alguns artigos do Código Penal aparecem em quase todo boletim de ocorrência, denúncia e sentença. São os tipos do dia a dia
        forense: furto, roubo, lesão corporal, ameaça, estelionato. Este guia reúne os 20 mais citados, com uma explicação curta do
        que cada um pune e a pena prevista na redação atual do Decreto-Lei 2.848/1940. Cada título leva à página do artigo com o texto
        integral, os parágrafos e os incisos, mantida a partir da base da <Link href="/apis/penal">API de Artigos Penais</Link>.
      </p>
      <Callout tone="info" title="Como ler as penas">
        <p>
          &quot;Reclusão&quot; e &quot;detenção&quot; são as duas espécies de pena privativa de liberdade do Código. A reclusão admite
          regime inicial fechado; a detenção, em regra, só semiaberto ou aberto. &quot;E multa&quot; significa pena cumulativa;
          &quot;ou multa&quot;, pena alternativa à prisão. As penas aqui são as do dispositivo indicado; qualificadoras, causas de
          aumento e atenuantes podem alterá-las no caso concreto.
        </p>
      </Callout>

      <h2 id="tabela">Resumo: artigo, crime e pena</h2>
      <TableWrap caption="Penas conforme a redação atual do Código Penal (base revisada em outubro de 2026).">
        <thead>
          <tr>
            <th>Artigo</th>
            <th>Crime</th>
            <th>Pena</th>
          </tr>
        </thead>
        <tbody>
          {ARTIGOS.map((a) => (
            <tr key={a.numero}>
              <td>
                <ArtigoLink numero={a.numero}>Art. {a.numero}</ArtigoLink>
              </td>
              <td>{a.nome}</td>
              <td>{a.pena}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      <h2 id="artigos">Os 20 artigos, um a um</h2>
      {ARTIGOS.map((a) => (
        <section key={a.numero} aria-labelledby={`art-${a.numero}`}>
          <h3 id={`art-${a.numero}`}>
            <ArtigoLink numero={a.numero}>
              Art. {a.numero}: {a.nome}
            </ArtigoLink>
          </h3>
          <p>
            <strong>Pena:</strong> {a.pena}.
          </p>
          <p>{a.texto}</p>
        </section>
      ))}

      <h2 id="crimes-contra-o-patrimonio">Por que os crimes contra o patrimônio dominam a lista</h2>
      <p>
        Oito dos vinte artigos (155, 157, 158, 159, 163, 168, 171 e 180) estão no Título II da Parte Especial, dos crimes contra o
        patrimônio. Isso reflete a estatística criminal brasileira: furtos, roubos e golpes são as ocorrências mais registradas, e
        cada uma delas gera inquérito, denúncia e sentença citando o artigo correspondente. A distinção entre eles costuma girar em
        torno de dois elementos: se houve violência ou grave ameaça (furto versus roubo) e se a vítima entregou o bem enganada ou
        coagida (estelionato versus extorsão).
      </p>

      <h2 id="como-usar">Como consultar e integrar esses artigos</h2>
      <p>
        Para buscar qualquer dispositivo pelo número ou pela descrição, use a{' '}
        <Link href="/ferramentas/penal">ferramenta de consulta de artigo penal</Link>, que também mostra os parágrafos e incisos. A
        lista completa, organizada por legislação, está em <Link href="/penal/artigos">Código Penal por artigo</Link>. Se você mantém
        um sistema jurídico e quer que o usuário selecione o artigo em um campo de busca, veja{' '}
        <Link href="/blog/autocomplete-artigos-penais">como montar um autocomplete de artigos penais</Link>. Para saber quais desses
        crimes são hediondos e o que isso muda na execução da pena, leia{' '}
        <Link href="/blog/crimes-hediondos-lista-2026">a lista de crimes hediondos atualizada</Link>.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'Qual a diferença entre furto e roubo?',
            answer:
              'Os dois são subtração de coisa alheia móvel. No furto (art. 155) não há violência nem grave ameaça contra a pessoa, e a pena é de reclusão de 1 a 6 anos e multa. No roubo (art. 157) a subtração é feita mediante violência ou grave ameaça, com reclusão de 6 a 10 anos e multa.',
          },
          {
            question: 'Qual a pena do artigo 171 do Código Penal?',
            answer:
              'O estelionato, art. 171, tem pena de reclusão de 1 a 5 anos e multa na forma simples. A fraude eletrônica (§ 2º-A) e o estelionato contra idoso ou vulnerável (§ 4º) têm penas mais altas.',
          },
          {
            question: 'O que é latrocínio e qual a pena?',
            answer:
              'Latrocínio é o roubo com resultado morte, previsto no art. 157, § 3º, II, do Código Penal, com pena de reclusão de 24 a 30 anos e multa. É crime hediondo e, por ser crime contra o patrimônio, é julgado pelo juiz singular, não pelo Tribunal do Júri.',
          },
          {
            question: 'Qual a diferença entre reclusão e detenção?',
            answer:
              'São as duas espécies de pena privativa de liberdade do Código Penal. A reclusão pode ser cumprida inicialmente em regime fechado, semiaberto ou aberto. A detenção, em regra, começa em regime semiaberto ou aberto, salvo necessidade de transferência para o fechado durante a execução.',
          },
        ]}
      />
    </>
  );
}

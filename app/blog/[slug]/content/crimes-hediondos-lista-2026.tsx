import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Callout, TableWrap, ArtigoLink } from '../../_components/article-ui';

export default function CrimesHediondosLista2026() {
  return (
    <>
      <p>
        A Lei 8.072, de 25 de julho de 1990, é a Lei dos Crimes Hediondos. Ela não cria novos crimes: seleciona condutas já previstas
        no Código Penal e em leis especiais e atribui a elas um regime mais duro de execução da pena. A lista do art. 1º foi ampliada
        várias vezes desde então, o que faz com que muitas versões publicadas na internet estejam desatualizadas. Esta página traz o
        rol conforme a redação atual da lei, com o artigo correspondente do Código Penal, a pena prevista e um link para o texto
        integral de cada dispositivo na base da <Link href="/apis/penal">API de Artigos Penais</Link>.
      </p>

      <h2 id="hediondo-vs-equiparado">Crime hediondo e crime equiparado: qual a diferença</h2>
      <p>
        A Constituição Federal, no art. 5º, inciso XLIII, determinou que a lei trataria como inafiançáveis e insuscetíveis de graça
        ou anistia &quot;a prática da tortura, o tráfico ilícito de entorpecentes e drogas afins, o terrorismo e os definidos como
        crimes hediondos&quot;. Daí nasce a distinção:
      </p>
      <ul>
        <li>
          <strong>Crimes hediondos</strong> são os listados expressamente no art. 1º da Lei 8.072/1990. O Brasil adota o sistema legal:
          só é hediondo o que está no rol, e o juiz não pode qualificar outro crime como hediondo por sua gravidade concreta.
        </li>
        <li>
          <strong>Crimes equiparados</strong> (ou assemelhados) são a tortura, o tráfico de drogas e o terrorismo. Eles não estão no
          rol do art. 1º, mas recebem o mesmo tratamento por força do art. 2º da lei e do texto constitucional.
        </li>
      </ul>
      <p>
        Na prática, as consequências são as mesmas para os dois grupos. A diferença é apenas de origem: os hediondos vêm da lista, os
        equiparados vêm da Constituição.
      </p>

      <h2 id="consequencias">O que muda quando o crime é hediondo</h2>
      <p>
        O art. 2º da Lei 8.072/1990 concentra os efeitos. Conforme a redação atual, os crimes hediondos e equiparados são
        insuscetíveis de:
      </p>
      <ul>
        <li>
          <strong>Anistia, graça e indulto</strong> (art. 2º, I), o que impede a extinção da pena por ato do Legislativo ou do
          Executivo.
        </li>
        <li>
          <strong>Fiança</strong> (art. 2º, II). A liberdade provisória sem fiança continua possível, conforme entendimento
          consolidado do STF, mas a fiança em si é vedada.
        </li>
      </ul>
      <p>Além das vedações, a lei prevê regras próprias de execução:</p>
      <ul>
        <li>
          <strong>Regime inicial.</strong> O § 1º do art. 2º diz que a pena será cumprida inicialmente em regime fechado. O STF, porém,
          declarou inconstitucional a obrigatoriedade desse regime inicial, de modo que, em regra, o juiz fixa o regime conforme a
          pena aplicada e as circunstâncias do caso, fundamentando a decisão.
        </li>
        <li>
          <strong>Progressão de regime.</strong> Depois da Lei 13.964/2019 (Pacote Anticrime), os percentuais passaram a constar do
          art. 112 da Lei de Execução Penal: 40% da pena para o primário sem resultado morte, 50% para o primário com resultado morte
          (vedado o livramento condicional), 60% para o reincidente em hediondo sem morte e 70% para o reincidente com resultado morte.
        </li>
        <li>
          <strong>Livramento condicional.</strong> Conforme o art. 83, V, do Código Penal, exige o cumprimento de mais de dois terços
          da pena e é vedado ao reincidente específico em crime hediondo ou equiparado.
        </li>
        <li>
          <strong>Apelação em liberdade.</strong> O § 3º do art. 2º determina que o juiz decida fundamentadamente se o réu condenado
          poderá apelar em liberdade.
        </li>
        <li>
          <strong>Prisão temporária.</strong> O § 4º amplia o prazo para 30 dias, prorrogáveis por mais 30 em caso de extrema e
          comprovada necessidade (o prazo comum é de 5 dias).
        </li>
      </ul>

      <h2 id="lista">Lista dos crimes hediondos (art. 1º da Lei 8.072/1990)</h2>
      <p>
        Todos os crimes abaixo são hediondos tanto na forma consumada quanto na tentada. As penas indicadas são as previstas na
        redação atual do Código Penal e correspondem ao dispositivo específico listado na lei, não necessariamente ao caput do artigo.
      </p>
      <TableWrap caption="Rol do art. 1º da Lei 8.072/1990, com as penas do Código Penal na redação atual.">
        <thead>
          <tr>
            <th>Inciso</th>
            <th>Crime</th>
            <th>Dispositivo</th>
            <th>Pena de reclusão</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I</td>
            <td>Homicídio praticado em atividade típica de grupo de extermínio, ainda que por um só agente, e homicídio qualificado</td>
            <td>
              <ArtigoLink numero="121">art. 121, caput e § 2º</ArtigoLink>
            </td>
            <td>12 a 30 anos (qualificado)</td>
          </tr>
          <tr>
            <td>I-A</td>
            <td>
              Lesão corporal dolosa gravíssima e lesão corporal seguida de morte contra agentes de segurança pública, integrantes do
              sistema prisional e da Força Nacional, membros do Judiciário, Ministério Público, Defensoria e Advocacia Pública ou
              oficiais de justiça (e seus familiares, em razão da função), ou praticadas nas dependências de instituição de ensino
            </td>
            <td>
              <ArtigoLink numero="129">art. 129, §§ 2º e 3º</ArtigoLink>
            </td>
            <td>2 a 8 anos (gravíssima); 4 a 12 anos (seguida de morte)</td>
          </tr>
          <tr>
            <td>I-B</td>
            <td>Feminicídio</td>
            <td>
              <ArtigoLink numero="121-A">art. 121-A</ArtigoLink>
            </td>
            <td>20 a 40 anos</td>
          </tr>
          <tr>
            <td>I-C</td>
            <td>Vicaricídio (incluído na redação atual da lei)</td>
            <td>
              <ArtigoLink numero="121-B">art. 121-B</ArtigoLink>
            </td>
            <td>20 a 40 anos</td>
          </tr>
          <tr>
            <td>II, a</td>
            <td>Roubo circunstanciado pela restrição de liberdade da vítima</td>
            <td>
              <ArtigoLink numero="157">art. 157, § 2º, V</ArtigoLink>
            </td>
            <td>6 a 10 anos e multa, aumentada de 1/3 até metade</td>
          </tr>
          <tr>
            <td>II, b</td>
            <td>Roubo circunstanciado pelo emprego de arma de fogo, ou de arma de fogo de uso proibido ou restrito</td>
            <td>
              <ArtigoLink numero="157">art. 157, § 2º-A, I e § 2º-B</ArtigoLink>
            </td>
            <td>6 a 10 anos e multa, aumentada de 2/3 (arma de fogo) ou em dobro (uso restrito ou proibido)</td>
          </tr>
          <tr>
            <td>II, c</td>
            <td>Roubo qualificado pelo resultado lesão corporal grave ou morte (latrocínio)</td>
            <td>
              <ArtigoLink numero="157">art. 157, § 3º</ArtigoLink>
            </td>
            <td>7 a 18 anos e multa (lesão grave); 24 a 30 anos e multa (morte)</td>
          </tr>
          <tr>
            <td>III</td>
            <td>Extorsão qualificada pela restrição da liberdade da vítima, lesão corporal ou morte</td>
            <td>
              <ArtigoLink numero="158">art. 158, § 3º</ArtigoLink>
            </td>
            <td>6 a 12 anos e multa; com lesão grave ou morte, as penas do art. 159, §§ 2º e 3º</td>
          </tr>
          <tr>
            <td>IV</td>
            <td>Extorsão mediante sequestro e na forma qualificada</td>
            <td>
              <ArtigoLink numero="159">art. 159, caput e §§ 1º a 3º</ArtigoLink>
            </td>
            <td>8 a 15 anos; 12 a 20; 16 a 24 (lesão grave); 24 a 30 (morte)</td>
          </tr>
          <tr>
            <td>V</td>
            <td>Estupro</td>
            <td>
              <ArtigoLink numero="213">art. 213, caput e §§ 1º e 2º</ArtigoLink>
            </td>
            <td>6 a 10 anos; 8 a 12 (lesão grave ou vítima entre 14 e 18 anos); 12 a 30 (morte)</td>
          </tr>
          <tr>
            <td>VI</td>
            <td>Estupro de vulnerável</td>
            <td>
              <ArtigoLink numero="217-A">art. 217-A, caput e §§ 1º a 4º</ArtigoLink>
            </td>
            <td>10 a 18 anos e multa; 12 a 24 (lesão grave); 20 a 40 (morte)</td>
          </tr>
          <tr>
            <td>VII</td>
            <td>Epidemia com resultado morte</td>
            <td>
              <ArtigoLink numero="267">art. 267, § 1º</ArtigoLink>
            </td>
            <td>10 a 15 anos, aplicada em dobro</td>
          </tr>
          <tr>
            <td>VII-B</td>
            <td>Falsificação, corrupção, adulteração ou alteração de produto destinado a fins terapêuticos ou medicinais</td>
            <td>
              <ArtigoLink numero="273">art. 273, caput e §§ 1º, 1º-A e 1º-B</ArtigoLink>
            </td>
            <td>10 a 15 anos e multa</td>
          </tr>
          <tr>
            <td>VIII</td>
            <td>Favorecimento da prostituição ou de outra forma de exploração sexual de criança, adolescente ou vulnerável</td>
            <td>
              <ArtigoLink numero="218-B">art. 218-B, caput e §§ 1º e 2º</ArtigoLink>
            </td>
            <td>7 a 16 anos e multa</td>
          </tr>
          <tr>
            <td>IX</td>
            <td>Furto qualificado pelo emprego de explosivo ou artefato análogo que cause perigo comum</td>
            <td>
              <ArtigoLink numero="155">art. 155, § 4º-A</ArtigoLink>
            </td>
            <td>4 a 10 anos e multa</td>
          </tr>
          <tr>
            <td>X</td>
            <td>Induzimento, instigação ou auxílio a suicídio ou automutilação por meio da rede de computadores, rede social ou transmissão em tempo real</td>
            <td>
              <ArtigoLink numero="122">art. 122, caput e § 4º</ArtigoLink>
            </td>
            <td>6 meses a 2 anos, aumentada até o dobro; 1 a 3 anos se resulta lesão grave; 2 a 6 anos se resulta morte</td>
          </tr>
          <tr>
            <td>XI</td>
            <td>Sequestro e cárcere privado contra menor de 18 anos</td>
            <td>
              <ArtigoLink numero="148">art. 148, § 1º, IV</ArtigoLink>
            </td>
            <td>2 a 5 anos</td>
          </tr>
          <tr>
            <td>XII</td>
            <td>Tráfico de pessoas contra criança ou adolescente</td>
            <td>
              <ArtigoLink numero="149-A">art. 149-A, caput e § 1º, II</ArtigoLink>
            </td>
            <td>4 a 8 anos e multa, com a causa de aumento do § 1º</td>
          </tr>
        </tbody>
      </TableWrap>

      <Callout tone="warn" title="Atenção ao dispositivo exato">
        <p>
          O que torna o crime hediondo é o dispositivo específico, não o artigo inteiro. O homicídio simples (art. 121, caput) não é
          hediondo; o qualificado (§ 2º) é. O roubo simples não é hediondo; o roubo com arma de fogo é. A lesão corporal gravíssima só
          é hediondia nas hipóteses do inciso I-A. Ao citar um crime como hediondo, confira sempre o parágrafo e o inciso.
        </p>
      </Callout>

      <h2 id="fora-do-codigo-penal">Crimes hediondos previstos fora do Código Penal (art. 1º, parágrafo único)</h2>
      <p>A lei também considera hediondos, tentados ou consumados, os seguintes crimes de leis especiais:</p>
      <ul>
        <li>
          <strong>Genocídio</strong>, previsto nos arts. 1º, 2º e 3º da Lei 2.889/1956.
        </li>
        <li>
          <strong>Posse ou porte ilegal de arma de fogo de uso proibido</strong>, art. 16 da Lei 10.826/2003 (Estatuto do
          Desarmamento).
        </li>
        <li>
          <strong>Comércio ilegal de arma de fogo</strong>, art. 17 da Lei 10.826/2003.
        </li>
        <li>
          <strong>Tráfico internacional de arma de fogo, acessório ou munição</strong>, art. 18 da Lei 10.826/2003.
        </li>
        <li>
          <strong>Organização criminosa</strong>, quando direcionada à prática de crime hediondo ou equiparado (Lei 12.850/2013).
        </li>
        <li>
          <strong>Crimes do Código Penal Militar</strong> que apresentem identidade com os crimes do art. 1º.
        </li>
        <li>
          <strong>Crimes de exploração sexual infantil do ECA</strong> (arts. 240, 241, 241-A, 241-B, 241-D e 244-A da Lei
          8.069/1990), nas hipóteses indicadas na lei.
        </li>
        <li>
          <strong>Domínio social estruturado e seu favorecimento</strong>, conforme o marco legal do combate ao crime organizado,
          incluídos na redação atual da lei.
        </li>
      </ul>
      <p>
        Os textos integrais do Estatuto do Desarmamento, da Lei de Organizações Criminosas e da Lei do Genocídio também estão na base
        de <Link href="/penal/artigos">artigos penais por legislação</Link>.
      </p>

      <h2 id="equiparados">Crimes equiparados: tortura, tráfico e terrorismo</h2>
      <ul>
        <li>
          <strong>Tortura</strong> (Lei 9.455/1997). A própria lei da tortura tem regras específicas sobre regime inicial.
        </li>
        <li>
          <strong>Tráfico ilícito de drogas</strong> (art. 33 da Lei 11.343/2006). Conforme entendimento consolidado do STF e do STJ, o
          tráfico privilegiado (art. 33, § 4º) não tem natureza hedionda.
        </li>
        <li>
          <strong>Terrorismo</strong> (Lei 13.260/2016).
        </li>
      </ul>

      <h2 id="delacao">Delação premiada na Lei 8.072/1990</h2>
      <p>
        O art. 8º, parágrafo único, prevê redução de pena de um a dois terços para o participante ou associado que denunciar à
        autoridade o bando ou quadrilha, possibilitando seu desmantelamento. É uma das primeiras previsões de colaboração premiada do
        ordenamento brasileiro, anterior à Lei 12.850/2013.
      </p>

      <h2 id="como-consultar">Como consultar o texto de cada artigo</h2>
      <p>
        Cada dispositivo citado nesta lista tem uma página própria com o texto integral, a pena mínima e máxima e os parágrafos e
        incisos, gerada a partir da base de 2.438 dispositivos que alimenta a <Link href="/apis/penal">API de Artigos Penais</Link>.
        Para buscar pelo número, use a <Link href="/ferramentas/penal">ferramenta de consulta de artigo penal</Link>. Para integrar essa
        base em um sistema jurídico, veja{' '}
        <Link href="/blog/autocomplete-artigos-penais">como montar um autocomplete de artigos penais</Link>. E para uma visão geral
        dos artigos mais usados no dia a dia forense, leia{' '}
        <Link href="/blog/artigos-mais-citados-codigo-penal">os 20 artigos mais citados do Código Penal</Link>.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'Homicídio simples é crime hediondo?',
            answer:
              'Não. Conforme o art. 1º, I, da Lei 8.072/1990, é hediondo o homicídio qualificado (art. 121, § 2º, do Código Penal) e o homicídio praticado em atividade típica de grupo de extermínio, ainda que cometido por um só agente. O homicídio simples (caput) e o culposo não são hediondos.',
          },
          {
            question: 'Crime hediondo tem fiança?',
            answer:
              'Não. O art. 2º, II, da Lei 8.072/1990 veda a fiança para crimes hediondos e equiparados. Isso não impede, por si só, a concessão de liberdade provisória sem fiança, que depende da análise do caso concreto pelo juiz.',
          },
          {
            question: 'Qual o percentual para progressão de regime em crime hediondo?',
            answer:
              'Conforme o art. 112 da Lei de Execução Penal, com a redação do Pacote Anticrime: 40% para o condenado primário sem resultado morte, 50% para o primário com resultado morte (sem livramento condicional), 60% para o reincidente em crime hediondo sem morte e 70% para o reincidente com resultado morte.',
          },
          {
            question: 'Tráfico de drogas é crime hediondo?',
            answer:
              'O tráfico de drogas é crime equiparado a hediondo por força da Constituição e do art. 2º da Lei 8.072/1990, com os mesmos efeitos. Conforme entendimento consolidado dos tribunais superiores, o tráfico privilegiado (art. 33, § 4º, da Lei 11.343/2006) não é considerado hediondo.',
          },
          {
            question: 'Roubo é crime hediondo?',
            answer:
              'Apenas em três hipóteses listadas no art. 1º, II: roubo com restrição da liberdade da vítima (art. 157, § 2º, V), roubo com emprego de arma de fogo, inclusive de uso proibido ou restrito (§ 2º-A, I e § 2º-B), e roubo com resultado lesão corporal grave ou morte (§ 3º). O roubo simples não é hediondo.',
          },
        ]}
      />
    </>
  );
}

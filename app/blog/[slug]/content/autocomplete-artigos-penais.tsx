import Link from 'next/link';
import Faq from '@/components/seo/faq';
import { Code, Callout, TableWrap } from '../../_components/article-ui';

export default function AutocompleteArtigosPenais() {
  return (
    <>
      <p>
        Todo sistema jurídico tem um campo &quot;artigo&quot; em algum lugar: no cadastro do processo, na ficha do cliente, no
        relatório de audiência. E quase sempre ele é um campo de texto livre, onde cada usuário escreve de um jeito (&quot;157&quot;,
        &quot;art. 157 CP&quot;, &quot;roubo&quot;), o que inviabiliza filtros, relatórios e integrações. Este guia mostra como
        transformar esse campo em um autocomplete alimentado pela <Link href="/apis/penal">API de Artigos Penais</Link> da Retech
        Core, com busca por número ou descrição, filtros por legislação e nível, cache do glossário e uma chave estável para salvar no
        banco.
      </p>

      <h2 id="endpoint">O endpoint de busca</h2>
      <p>
        A listagem fica em <code>GET https://api-core.theretech.com.br/penal/artigos</code>. Sem parâmetros ela devolve o glossário
        completo, com 2.438 dispositivos do Código Penal e de 35 leis especiais. Para um autocomplete, os parâmetros importantes são:
      </p>
      <TableWrap>
        <thead>
          <tr>
            <th>Parâmetro</th>
            <th>Valores</th>
            <th>Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>q</code></td>
            <td>texto livre</td>
            <td>Busca por número ou trecho da descrição (ex.: <code>homic</code>, <code>157</code>, <code>estelion</code>)</td>
          </tr>
          <tr>
            <td><code>nivel</code></td>
            <td>artigo, paragrafo, inciso, alinea</td>
            <td>Restringe ao nível do dispositivo. <code>nivel=artigo</code> devolve 864 itens</td>
          </tr>
          <tr>
            <td><code>legislacao</code></td>
            <td>CP, LCP, ECA, CTB, Lei 11.343/2006, Lei 8.072/1990 etc.</td>
            <td>Restringe a uma lei</td>
          </tr>
          <tr>
            <td><code>tipo</code></td>
            <td>crime, contravencao, disposicao, revogado</td>
            <td>Permite esconder dispositivos revogados ou disposições gerais</td>
          </tr>
        </tbody>
      </TableWrap>
      <p>
        Uma chamada típica para o campo de busca é <code>GET /penal/artigos?q=homic&amp;nivel=artigo</code>, com o cabeçalho{' '}
        <code>X-API-Key</code>. A resposta vem em um envelope com <code>data</code> e <code>meta</code>:
      </p>
      <Code lang="json">{`{
  "success": true,
  "code": "OK",
  "data": [
    {
      "codigo": "121",
      "codigoFormatado": "Art. 121 do CP",
      "descricao": "Homicídio simples",
      "tipo": "crime",
      "nivel": "artigo",
      "legislacao": "CP",
      "legislacaoNome": "Código Penal",
      "idUnico": "CP:121"
    },
    {
      "codigo": "121-A",
      "codigoFormatado": "Art. 121-A do CP",
      "descricao": "Feminicídio",
      "tipo": "crime",
      "nivel": "artigo",
      "legislacao": "CP",
      "legislacaoNome": "Código Penal",
      "idUnico": "CP:121-A"
    }
  ],
  "meta": { "total": 2, "query": "homic", "nivel": "artigo" }
}`}</Code>
      <p>Os campos que importam para a interface:</p>
      <ul>
        <li>
          <strong>codigoFormatado</strong> e <strong>descricao</strong>: o que o usuário vê na lista, no formato{' '}
          <code>Art. 121 do CP – Homicídio simples</code>.
        </li>
        <li>
          <strong>idUnico</strong>: identificador estável no formato <code>LEGISLACAO:CODIGO</code> (<code>CP:121</code>,{' '}
          <code>CP:121.2.I</code>, <code>DRG:33</code>). É o que deve ser salvo no banco.
        </li>
        <li>
          <strong>nivel</strong> e <strong>legislacao</strong>: úteis para agrupar resultados e para filtros.
        </li>
        <li>
          <strong>tipo</strong>: permite marcar visualmente dispositivos revogados.
        </li>
      </ul>

      <h2 id="por-que-idunico">Por que salvar o idUnico e não o número</h2>
      <p>
        O número do artigo não é único entre legislações. &quot;Art. 33&quot; existe no Código Penal (cooperação dolosamente
        distinta), na Lei de Drogas (tráfico) e em outras leis. Se o seu banco guarda apenas &quot;33&quot;, você perde a informação
        de qual lei se trata e qualquer relatório fica ambíguo. O <code>idUnico</code> resolve isso com um prefixo curto da
        legislação. Ele também é aceito diretamente no endpoint de detalhe:
      </p>
      <Code lang="http">{`GET /penal/artigos/CP:121      → Art. 121 do Código Penal
GET /penal/artigos/DRG:33      → Art. 33 da Lei de Drogas
GET /penal/artigos/CP:121.2.I  → Art. 121, § 2º, inciso I do CP`}</Code>
      <p>
        Guarde o <code>idUnico</code> como chave e, se quiser, o <code>codigoFormatado</code> e a <code>descricao</code> como cópia
        desnormalizada para exibição rápida. Assim o registro continua legível mesmo sem chamar a API.
      </p>

      <h2 id="300-multiple-choices">Tratando o 300 Multiple Choices</h2>
      <p>
        Se você consultar o detalhe por código simples (<code>GET /penal/artigos/33</code>), a API primeiro procura no Código Penal.
        Não encontrando, procura em todas as legislações. Se houver mais de um resultado, ela devolve <strong>HTTP 300</strong> com a
        lista de candidatos e as legislações, em vez de escolher por você:
      </p>
      <Code lang="json" title="HTTP 300 Multiple Choices">{`{
  "type": "https://retech-core/errors/multiple-choices",
  "title": "Multiple Articles Found",
  "status": 300,
  "detail": "Múltiplos artigos encontrados com código '33'. Use o formato 'CODIGO:ARTIGO' para especificar",
  "data": {
    "codigo": "33",
    "artigos": [ ... ],
    "legislacoes": ["Lei 11.343/2006", "Lei 9.605/98"],
    "sugestao": "Use: /penal/artigos/CODIGO:ARTIGO (ex: /penal/artigos/CP:121 ou /penal/artigos/DRG:33)"
  }
}`}</Code>
      <p>
        Em um autocomplete bem feito isso raramente acontece, porque você já tem o <code>idUnico</code> do item escolhido. Mas vale
        tratar o caso para entradas legadas (números digitados antes da migração): mostre os candidatos ao usuário e peça que escolha
        a legislação. O código abaixo cobre as três situações.
      </p>
      <Code lang="ts" title="buscar-artigo.ts">{`export async function buscarArtigo(codigoOuId: string) {
  const res = await fetch(\`\${BASE_URL}/penal/artigos/\${encodeURIComponent(codigoOuId)}\`, {
    headers: { 'X-API-Key': API_KEY },
  });

  if (res.status === 300) {
    const body = await res.json();
    return { ambiguo: true as const, candidatos: body.data.artigos };
  }
  if (res.status === 404) return { naoEncontrado: true as const };
  if (!res.ok) throw new Error(\`Erro \${res.status}\`);

  return { artigo: await res.json() };
}`}</Code>

      <h2 id="debounce">Debounce: não chame a API a cada tecla</h2>
      <p>
        Um usuário digitando &quot;estelionato&quot; gera onze eventos de teclado. Sem debounce, são onze requisições, das quais só a
        última interessa. Espere entre 250 e 400 ms de inatividade antes de buscar e cancele a requisição anterior com{' '}
        <code>AbortController</code> para evitar que uma resposta antiga sobrescreva a mais recente.
      </p>
      <Code lang="ts" title="use-debounce.ts">{`import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}`}</Code>

      <h2 id="react">Exemplo completo em React com Combobox</h2>
      <p>
        O componente abaixo usa apenas React, sem biblioteca de UI, para deixar a lógica visível. Em projetos reais, troque a lista
        por um Combobox acessível (Radix, Headless UI, shadcn/ui), mantendo o mesmo fluxo: estado da busca, debounce, requisição
        cancelável, seleção que devolve o <code>idUnico</code>.
      </p>
      <Code lang="tsx" title="ArtigoCombobox.tsx">{`import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './use-debounce';

interface ArtigoResumo {
  codigo: string;
  codigoFormatado: string;
  descricao: string;
  tipo: 'crime' | 'contravencao' | 'disposicao' | 'revogado';
  nivel: 'artigo' | 'paragrafo' | 'inciso' | 'alinea';
  legislacao: string;
  idUnico: string;
}

interface Props {
  legislacao?: string;          // ex.: 'CP' para limitar ao Código Penal
  nivel?: ArtigoResumo['nivel']; // ex.: 'artigo'
  onSelect: (artigo: ArtigoResumo) => void;
}

export function ArtigoCombobox({ legislacao, nivel = 'artigo', onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [itens, setItens] = useState<ArtigoResumo[]>([]);
  const [aberto, setAberto] = useState(false);
  const debounced = useDebounce(query, 300);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setItens([]);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams({ q: debounced, nivel });
    if (legislacao) params.set('legislacao', legislacao);

    // /api/penal é uma rota do seu backend que adiciona o X-API-Key
    fetch(\`/api/penal/artigos?\${params}\`, { signal: controller.signal })
      .then((r) => r.json())
      .then((json) => setItens(json.data ?? []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [debounced, legislacao, nivel]);

  return (
    <div role="combobox" aria-expanded={aberto} aria-haspopup="listbox">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAberto(true);
        }}
        onBlur={() => setTimeout(() => setAberto(false), 150)}
        placeholder="Número ou nome do crime (ex.: 157, estelionato)"
        aria-autocomplete="list"
      />
      {aberto && itens.length > 0 && (
        <ul role="listbox">
          {itens.map((a) => (
            <li
              key={a.idUnico}
              role="option"
              aria-selected={false}
              onMouseDown={() => {
                onSelect(a);
                setQuery(\`\${a.codigoFormatado} – \${a.descricao}\`);
                setAberto(false);
              }}
              style={{ opacity: a.tipo === 'revogado' ? 0.5 : 1 }}
            >
              <strong>{a.codigoFormatado}</strong> – {a.descricao}
              {a.tipo === 'revogado' && <em> (revogado)</em>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</Code>
      <p>
        No <code>onSelect</code>, salve <code>artigo.idUnico</code> no seu modelo. Para exibir depois, use{' '}
        <code>codigoFormatado – descricao</code>, que é o formato que advogados e serventuários reconhecem de imediato.
      </p>

      <Callout tone="warn" title="Não exponha a chave no front-end">
        <p>
          O exemplo chama <code>/api/penal/artigos</code>, uma rota do seu próprio backend que adiciona o cabeçalho{' '}
          <code>X-API-Key</code> e repassa a resposta. Isso protege a chave, permite cache do seu lado e evita problemas de CORS.
        </p>
      </Callout>

      <h2 id="filtros">Filtros por legislação e nível</h2>
      <p>Dois filtros melhoram muito a experiência:</p>
      <ul>
        <li>
          <strong>Legislação.</strong> Um seletor com &quot;Código Penal&quot;, &quot;Lei de Drogas&quot;, &quot;Lei Maria da
          Penha&quot;, &quot;Estatuto do Desarmamento&quot; etc. envia <code>legislacao=CP</code>,{' '}
          <code>legislacao=Lei 11.343/2006</code> e assim por diante. Isso evita que a busca por &quot;33&quot; traga resultados de
          quatro leis diferentes.
        </li>
        <li>
          <strong>Nível.</strong> Para o cadastro do processo, em geral basta <code>nivel=artigo</code>. Para a dosimetria ou para
          anotar qualificadoras, libere <code>paragrafo</code> e <code>inciso</code>, exibindo o <code>codigoFormatado</code>{' '}
          completo (por exemplo &quot;Art. 121, § 2º, I do CP&quot;).
        </li>
      </ul>
      <p>
        Para montar o seletor de legislações, chame o glossário uma vez e extraia os pares distintos de <code>legislacao</code> e{' '}
        <code>legislacaoNome</code>.
      </p>

      <h2 id="cache-do-glossario">Cache do glossário: buscar local em vez de remoto</h2>
      <p>
        A chamada <code>GET /penal/artigos?nivel=artigo</code> retorna 864 itens, cerca de 200 KB em JSON. Esse volume cabe
        tranquilamente em memória no navegador ou no backend. Uma estratégia comum e mais rápida do que buscar a cada digitação é:
      </p>
      <ol>
        <li>
          Baixar o glossário de artigos uma vez (no carregamento da tela ou em um job diário no servidor) e guardar em memória, em{' '}
          <code>localStorage</code> ou em Redis.
        </li>
        <li>
          Filtrar localmente enquanto o usuário digita, comparando <code>codigo</code>, <code>codigoFormatado</code> e{' '}
          <code>descricao</code> normalizados (sem acentos, em minúsculas).
        </li>
        <li>
          Recorrer à API com <code>q=</code> apenas quando o usuário precisar de parágrafos e incisos, que somam mais de 1.500 itens
          e raramente são necessários na primeira seleção.
        </li>
      </ol>
      <p>
        A base é estável: a API mantém o glossário em cache de longa duração e só o invalida quando a legislação muda. Um TTL de 24
        horas no seu lado é seguro. Para saber quando a base foi revisada, consulte o campo <code>dataAtualizacao</code> no detalhe de
        qualquer artigo.
      </p>
      <Code lang="ts" title="busca-local.ts">{`const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();

export function filtrarGlossario(glossario: ArtigoResumo[], termo: string, limite = 10) {
  const t = normalizar(termo.trim());
  if (!t) return [];
  const porNumero = glossario.filter((a) => a.codigo.toLowerCase().startsWith(t));
  const porDescricao = glossario.filter(
    (a) => !porNumero.includes(a) && normalizar(a.descricao).includes(t),
  );
  return [...porNumero, ...porDescricao].slice(0, limite);
}`}</Code>

      <h2 id="ux">Detalhes de experiência que fazem diferença</h2>
      <ul>
        <li>
          <strong>Priorize o número.</strong> Quem digita &quot;15&quot; quer ver 155, 157, 158 e 159 antes de qualquer descrição que
          contenha &quot;15&quot;.
        </li>
        <li>
          <strong>Mostre a legislação.</strong> Quando o filtro de legislação estiver em &quot;todas&quot;, exiba{' '}
          <code>legislacaoNome</code> como texto secundário de cada opção.
        </li>
        <li>
          <strong>Marque revogados.</strong> Dispositivos com <code>tipo = revogado</code> continuam na base porque processos antigos
          os citam, mas não devem ser a primeira sugestão.
        </li>
        <li>
          <strong>Permita múltiplos artigos.</strong> A maioria das denúncias cita mais de um dispositivo. Um campo de &quot;chips&quot;
          com remoção individual resolve.
        </li>
        <li>
          <strong>Ofereça o texto integral.</strong> Ao selecionar, busque <code>GET /penal/artigos/&#123;idUnico&#125;</code> e mostre{' '}
          <code>textoCompleto</code>, <code>penaMin</code> e <code>penaMax</code> em um painel lateral.
        </li>
      </ul>

      <h2 id="leia-mais">Para continuar</h2>
      <p>
        A referência completa dos endpoints, incluindo <code>/penal/search</code> para busca no texto integral, está na{' '}
        <Link href="/docs">documentação</Link>. Você pode testar as consultas sem escrever código no{' '}
        <Link href="/playground">playground</Link> ou na <Link href="/ferramentas/penal">ferramenta de consulta de artigo penal</Link>.
        Para conhecer o conteúdo da base, veja <Link href="/blog/artigos-mais-citados-codigo-penal">os 20 artigos mais citados</Link>{' '}
        e <Link href="/blog/crimes-hediondos-lista-2026">a lista de crimes hediondos</Link>.
      </p>

      <Faq
        className="mt-14"
        items={[
          {
            question: 'Quantos artigos a API de Artigos Penais retorna?',
            answer:
              'O glossário completo tem 2.438 dispositivos (artigos, parágrafos, incisos e alíneas) do Código Penal e de 35 leis especiais. Com o filtro nivel=artigo são 864 itens, o suficiente para um autocomplete de cadastro.',
          },
          {
            question: 'O que é o idUnico e por que usá-lo?',
            answer:
              'É o identificador estável de cada dispositivo, no formato LEGISLACAO:CODIGO (ex.: CP:121, DRG:33). Como o mesmo número de artigo existe em várias leis, salvar apenas o número gera ambiguidade. O idUnico também é aceito diretamente no endpoint de detalhe.',
          },
          {
            question: 'Quando a API responde 300 Multiple Choices?',
            answer:
              'Quando o detalhe é consultado por um código simples (ex.: /penal/artigos/33) que não existe no Código Penal mas existe em mais de uma legislação. A resposta traz os candidatos e as legislações para que o cliente escolha; usar o idUnico evita o caso.',
          },
          {
            question: 'Posso baixar o glossário e buscar localmente?',
            answer:
              'Sim. GET /penal/artigos?nivel=artigo retorna 864 itens em cerca de 200 KB. Guarde em memória ou em cache com validade de 24 horas e filtre localmente enquanto o usuário digita, recorrendo à API apenas para parágrafos e incisos.',
          },
        ]}
      />
    </>
  );
}

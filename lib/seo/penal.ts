// Helpers de apresentação para as páginas programáticas de artigos penais
// (/penal/artigos e /penal/artigo/[slug]). Só transformam dados vindos da API;
// nunca inventam texto legal ou pena.
import { slugify, type PenalDispositivo, type PenalResumo } from './api';
import { CONTENT_UPDATED_AT } from './site';

export const PENAL_HUB_PATH = '/penal/artigos';
export const PENAL_ARTIGO_BASE = '/penal/artigo';

/** Âncora usada no hub para cada legislação (ex.: "codigo-penal", "lei-de-drogas"). */
export function legislacaoAnchor(nome: string): string {
  return slugify(nome);
}

export const TIPO_LABEL: Record<PenalResumo['tipo'], string> = {
  crime: 'Crime',
  contravencao: 'Contravenção penal',
  disposicao: 'Disposição geral',
  revogado: 'Revogado',
};

export function tipoLabel(tipo: string): string {
  return TIPO_LABEL[tipo as PenalResumo['tipo']] ?? tipo;
}

export const NIVEL_LABEL: Record<PenalResumo['nivel'], string> = {
  artigo: 'Artigo',
  paragrafo: 'Parágrafo',
  inciso: 'Inciso',
  alinea: 'Alínea',
};

/**
 * "Art. 121 do CP" → { numero: "121" }. O número vem do codigoFormatado (ex.: "121-A").
 */
export function parseCodigoFormatado(codigoFormatado: string, codigo: string): { numero: string } {
  const m = codigoFormatado.match(/^Art\.\s*([^\s,]+)/);
  return { numero: m?.[1] ?? codigo };
}

/**
 * Preposição que concorda com o NOME da legislação (não com a sigla):
 * "do Código Penal", "do Estatuto do Desarmamento", "da Lei de Drogas".
 */
export function preposicaoNome(legislacaoNome: string): 'do' | 'da' {
  return /^(c[oó]digo|estatuto|decreto)/i.test(legislacaoNome.trim()) ? 'do' : 'da';
}

/** Preposição que concorda com a SIGLA/identificador ("do CP", "da LCP", "da Lei 11.343/2006"), extraída do codigoFormatado. */
export function preposicaoSigla(codigoFormatado: string): 'do' | 'da' {
  const m = codigoFormatado.match(/\s(do|da)\s[^,]*$/);
  return (m?.[1] as 'do' | 'da') ?? 'do';
}

/** "Art. 121 do Código Penal" / "Art. 33 da Lei de Drogas". */
export function artigoNomeLongo(a: Pick<PenalResumo, 'codigo' | 'codigoFormatado' | 'legislacaoNome'>): string {
  const { numero } = parseCodigoFormatado(a.codigoFormatado, a.codigo);
  return `Art. ${numero} ${preposicaoNome(a.legislacaoNome)} ${a.legislacaoNome}`;
}

/** "Art. 121" (forma curta para breadcrumb e links prev/next). */
export function artigoNomeCurto(a: Pick<PenalResumo, 'codigo' | 'codigoFormatado'>): string {
  const { numero } = parseCodigoFormatado(a.codigoFormatado, a.codigo);
  return `Art. ${numero}`;
}

/**
 * Descrição para exibição. Artigos revogados chegam com descricao "Art. 240 – revogado";
 * normalizamos para "Artigo revogado" para títulos e H1.
 */
export function descricaoExibicao(a: Pick<PenalResumo, 'descricao' | 'tipo'>): string {
  if (a.tipo === 'revogado' && /revogad/i.test(a.descricao) && /^Art\./i.test(a.descricao)) {
    return 'Artigo revogado';
  }
  return a.descricao.trim();
}

/** H1 da página do artigo: "Art. 121 do Código Penal – Homicídio simples". */
export function artigoH1(a: Pick<PenalResumo, 'codigo' | 'codigoFormatado' | 'legislacaoNome' | 'descricao' | 'tipo'>): string {
  return `${artigoNomeLongo(a)} – ${descricaoExibicao(a)}`;
}

/** Título <title> com até ~65 caracteres. Sufixo varia conforme o tipo (revogado não tem "pena"). */
export function artigoTitle(a: Pick<PenalResumo, 'codigo' | 'codigoFormatado' | 'legislacaoNome' | 'descricao' | 'tipo'>): string {
  const base = artigoH1(a);
  const sufixo = a.tipo === 'crime' || a.tipo === 'contravencao' ? ': texto e pena' : a.tipo === 'disposicao' ? ': texto integral' : '';
  const full = `${base}${sufixo}`;
  if (full.length <= 65) return full;
  if (base.length <= 65) return base;
  return truncate(base, 65);
}

export function truncate(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–-]+$/, '')}…`;
}

/** Texto da pena em uma linha: "Reclusão, de 6 a 20 anos, e multa". */
export function formatPena(a: Pick<PenalDispositivo, 'penaMin' | 'penaMax'>): string | null {
  const min = a.penaMin?.trim();
  const max = a.penaMax?.trim();
  if (!min && !max) return null;
  if (min && max) return `${min.replace(/[.;]$/, '')}, ${max}`;
  return (min || max) as string;
}

/** Meta description de 150–160 caracteres montada a partir dos dados do dispositivo. */
export function artigoDescription(a: PenalDispositivo, counts: ArvoreCounts): string {
  const nome = artigoNomeLongo(a);
  const desc = descricaoExibicao(a);
  const pena = formatPena(a);
  const estrutura: string[] = [];
  if (counts.paragrafos) estrutura.push(`${counts.paragrafos} ${plural(counts.paragrafos, 'parágrafo', 'parágrafos')}`);
  if (counts.incisos) estrutura.push(`${counts.incisos} ${plural(counts.incisos, 'inciso', 'incisos')}`);
  const estruturaTxt = estrutura.length ? `, ${estrutura.join(' e ')}` : '';

  // Candidatas da mais completa para a mais curta; usa a primeira que cabe em 160.
  const candidatas: string[] = [];
  if (a.tipo === 'revogado') {
    candidatas.push(`${nome}: dispositivo revogado, sem efeitos jurídicos. Mantido para referência histórica, com link para o texto compilado do Planalto e consulta via API.`);
    candidatas.push(`${nome}: dispositivo revogado. Referência histórica com link para o texto compilado do Planalto e consulta via API.`);
  } else if (pena) {
    candidatas.push(`${nome} (${desc}): texto integral, pena (${pena})${estruturaTxt}. Fonte: Planalto. Consulte via API.`);
    candidatas.push(`${nome} (${desc}): texto integral e pena (${pena})${estruturaTxt}. Fonte: Planalto.`);
    candidatas.push(`${nome} (${desc}): texto integral e pena (${pena}). Fonte: Planalto.`);
    candidatas.push(`${nome} (${desc}): texto integral e pena cominada${estruturaTxt}. Fonte oficial: Planalto. Consulte via API.`);
    candidatas.push(`${nome} (${desc}): texto integral e pena. Fonte: Planalto.`);
  } else {
    candidatas.push(`${nome} (${desc}): texto integral do dispositivo${estruturaTxt}. Texto compilado do Planalto, disponível em JSON via API.`);
    candidatas.push(`${nome} (${desc}): texto integral do dispositivo${estruturaTxt}. Fonte: Planalto.`);
    candidatas.push(`${nome} (${desc}): texto integral. Fonte: Planalto.`);
  }
  let s = candidatas.find((c) => c.length <= 160) ?? truncate(candidatas[candidatas.length - 1], 160);
  if (s.length < 150) {
    const complementos = [' Dados atualizados do Código Penal e leis especiais.', ' Parágrafos e incisos na íntegra.', ' Consulte via API.', ' Dados em JSON.'];
    const jaTem = (c: string) => s.includes(c.trim().replace(/\.$/, '')) || (/via API/.test(c) && /via API/.test(s));
    const extra = complementos.find((c) => !jaTem(c) && s.length + c.length <= 160);
    if (extra) s = `${s}${extra}`;
  }
  return s;
}

export function plural(n: number, um: string, varios: string): string {
  return n === 1 ? um : varios;
}

// ----------------------------------------------------------------------------
// Árvore de dispositivos
// ----------------------------------------------------------------------------
export interface ArvoreNode {
  item: PenalDispositivo;
  children: ArvoreNode[];
}

export interface ArvoreCounts {
  paragrafos: number;
  incisos: number;
  alineas: number;
  total: number;
}

/** Código do pai de um dispositivo: "121.2.VII.a" → "121.2.VII"; "121" → null. */
export function parentCodigo(codigo: string): string | null {
  const i = codigo.lastIndexOf('.');
  return i === -1 ? null : codigo.slice(0, i);
}

/**
 * Monta a árvore (parágrafos → incisos → alíneas; incisos diretos do caput ficam na raiz)
 * a partir da lista plana retornada por /penal/arvore/:idUnico. Ordena por `ordem`.
 */
export function buildArvore(artigo: PenalDispositivo, dispositivos: PenalDispositivo[]): ArvoreNode[] {
  const filhos = dispositivos
    .filter((d) => d.idUnico !== artigo.idUnico && d.nivel !== 'artigo')
    .sort((a, b) => a.ordem - b.ordem);
  const byCodigo = new Map<string, ArvoreNode>();
  const roots: ArvoreNode[] = [];
  for (const d of filhos) {
    byCodigo.set(d.codigo, { item: d, children: [] });
  }
  for (const d of filhos) {
    const node = byCodigo.get(d.codigo)!;
    let parent = parentCodigo(d.codigo);
    let attached = false;
    while (parent && parent !== artigo.codigo) {
      const p = byCodigo.get(parent);
      if (p) {
        p.children.push(node);
        attached = true;
        break;
      }
      parent = parentCodigo(parent);
    }
    if (!attached) roots.push(node);
  }
  return roots;
}

export function countArvore(dispositivos: PenalDispositivo[], artigoId: string): ArvoreCounts {
  const c: ArvoreCounts = { paragrafos: 0, incisos: 0, alineas: 0, total: 0 };
  for (const d of dispositivos) {
    if (d.idUnico === artigoId) continue;
    if (d.nivel === 'paragrafo') c.paragrafos++;
    else if (d.nivel === 'inciso') c.incisos++;
    else if (d.nivel === 'alinea') c.alineas++;
    else continue;
    c.total++;
  }
  return c;
}

/**
 * Rótulo curto do dispositivo filho, extraído do codigoFormatado da API:
 *   "Art. 121, § 2º-B do CP"            → "§ 2º-B"
 *   "Art. 163, parágrafo único do CP"   → "Parágrafo único"
 *   "Art. 121, § 2º, VII, a) do CP"     → "a)"  (alínea)
 *   "Art. 14, I do CP"                  → "I"   (inciso)
 */
export function dispositivoLabel(d: Pick<PenalDispositivo, 'codigoFormatado' | 'nivel' | 'codigo' | 'inciso' | 'alinea' | 'paragrafo'>): string {
  const semLei = d.codigoFormatado.replace(/\s+(do|da)\s+[^,]*$/, '');
  const partes = semLei.split(',').map((p) => p.trim()).filter(Boolean);
  if (d.nivel === 'paragrafo') {
    const seg = partes[1] ?? '';
    if (/único/i.test(seg)) return 'Parágrafo único';
    if (seg.startsWith('§')) return seg;
    const sufixo = d.codigo.split('.')[1] ?? String(d.paragrafo ?? '');
    return sufixo ? `§ ${sufixo}º` : 'Parágrafo';
  }
  if (d.nivel === 'inciso') {
    const seg = partes[partes.length - 1] ?? '';
    return seg || d.inciso || d.codigo.split('.').pop() || 'Inciso';
  }
  if (d.nivel === 'alinea') {
    const seg = partes[partes.length - 1] ?? '';
    if (seg) return /\)$/.test(seg) ? seg : `${seg})`;
    return d.alinea ? `${d.alinea})` : 'Alínea';
  }
  return d.codigoFormatado;
}

/**
 * Quando os filhos (incisos ou alíneas) são listados separadamente, devolve só a parte
 * introdutória do texto, antes do primeiro "I - ..." ou "a) ...", para não repetir os filhos.
 * Sem filhos desse nível, devolve o texto inteiro.
 */
export function textoIntro(texto: string, filhos: 'inciso' | 'alinea' | null): string {
  const t = (texto || '').trim();
  if (!filhos) return t;
  const re = filhos === 'inciso' ? /^([\s\S]*?[:;.])\s+I\s*[-–]\s/ : /^([\s\S]*?[:;.])\s+a\)\s/;
  const m = t.match(re);
  return m ? m[1].trim() : t;
}

/** Nível dos filhos diretos de um nó (para textoIntro). */
export function nivelFilhos(children: ArvoreNode[]): 'inciso' | 'alinea' | null {
  const n = children[0]?.item.nivel;
  return n === 'inciso' || n === 'alinea' ? n : null;
}

// ----------------------------------------------------------------------------
// Datas e metadados
// ----------------------------------------------------------------------------
const MESES: Record<string, string> = {
  janeiro: '01',
  fevereiro: '02',
  marco: '03',
  março: '03',
  abril: '04',
  maio: '05',
  junho: '06',
  julho: '07',
  agosto: '08',
  setembro: '09',
  outubro: '10',
  novembro: '11',
  dezembro: '12',
};

/** "outubro/2026" → "2026-10-01"; ISO passa direto; fallback CONTENT_UPDATED_AT. */
export function dataAtualizacaoIso(s: string | undefined): string {
  if (!s) return CONTENT_UPDATED_AT;
  const t = s.trim().toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const m = t.match(/^([a-zç]+)\s*\/\s*(\d{4})$/);
  if (m && MESES[m[1]]) return `${m[2]}-${MESES[m[1]]}-01`;
  const d = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (d) return `${d[3]}-${d[2]}-${d[1]}`;
  return CONTENT_UPDATED_AT;
}

/** Tipo normativo para schema.org Legislation. */
export function legislationType(a: Pick<PenalResumo, 'legislacao'>): 'Decreto-Lei' | 'Lei' {
  if (a.legislacao === 'CP' || a.legislacao === 'LCP' || /^decreto-lei/i.test(a.legislacao)) return 'Decreto-Lei';
  return 'Lei';
}

/** Nome completo da norma para citação: "Código Penal (CP)" / "Lei de Drogas (Lei 11.343/2006)". */
export function legislacaoCitacao(a: Pick<PenalResumo, 'legislacao' | 'legislacaoNome'>): string {
  if (a.legislacao === a.legislacaoNome) return a.legislacaoNome;
  return `${a.legislacaoNome} (${a.legislacao})`;
}

/** Subconjunto do caput, para o exemplo JSON da seção "Use via API". */
export function caputJsonExemplo(a: PenalDispositivo): Record<string, unknown> {
  const out: Record<string, unknown> = {
    codigo: a.codigo,
    codigoFormatado: a.codigoFormatado,
    descricao: a.descricao,
    tipo: a.tipo,
    nivel: a.nivel,
    legislacao: a.legislacao,
    legislacaoNome: a.legislacaoNome,
    textoCompleto: truncate(a.textoCompleto || '', 140),
  };
  if (a.penaMin) out.penaMin = a.penaMin;
  if (a.penaMax) out.penaMax = a.penaMax;
  if (a.parte) out.parte = a.parte;
  if (a.titulo) out.titulo = a.titulo;
  if (a.capitulo) out.capitulo = a.capitulo;
  out.fonte = a.fonte;
  out.dataAtualizacao = a.dataAtualizacao;
  out.idUnico = a.idUnico;
  return out;
}

/** Agrupa a lista do hub por legislacaoNome preservando a ordem de chegada. */
export function groupByLegislacao(artigos: PenalResumo[]): { nome: string; sigla: string; anchor: string; artigos: PenalResumo[] }[] {
  const grupos: { nome: string; sigla: string; anchor: string; artigos: PenalResumo[] }[] = [];
  const idx = new Map<string, number>();
  for (const a of artigos) {
    let i = idx.get(a.legislacaoNome);
    if (i === undefined) {
      i = grupos.length;
      idx.set(a.legislacaoNome, i);
      grupos.push({ nome: a.legislacaoNome, sigla: a.legislacao, anchor: legislacaoAnchor(a.legislacaoNome), artigos: [] });
    }
    grupos[i].artigos.push(a);
  }
  return grupos;
}

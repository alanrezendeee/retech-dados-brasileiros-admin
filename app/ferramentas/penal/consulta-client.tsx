'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Clock, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ArtigoPenal {
  codigo: string;
  artigo: number;
  paragrafo?: number | null;
  inciso?: string | null;
  alinea?: string | null;
  descricao: string;
  textoCompleto: string;
  tipo: string;
  nivel?: string;
  legislacao: string;
  legislacaoNome: string;
  penaMin?: string;
  penaMax?: string;
  codigoFormatado: string;
  titulo?: string;
  capitulo?: string;
  fonte?: string;
  dataAtualizacao?: string;
  idUnico?: string;
}

interface ArtigoResumo {
  codigo: string;
  codigoFormatado: string;
  descricao: string;
  tipo: string;
  legislacao: string;
  legislacaoNome: string;
  idUnico: string;
}

interface MultiploResultado {
  data?: { artigos?: ArtigoPenal[]; legislacoes?: string[] };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

const EXEMPLOS: { label: string; codigo: string }[] = [
  { label: 'Art. 121 (homicídio)', codigo: '121' },
  { label: 'Art. 155 (furto)', codigo: '155' },
  { label: 'Art. 157 (roubo)', codigo: '157' },
  { label: 'Art. 157 § 3º II (latrocínio)', codigo: 'CP:157.3.II' },
  { label: 'Art. 33 Lei de Drogas (tráfico)', codigo: 'DRG:33' },
  { label: 'Art. 171 (estelionato)', codigo: '171' },
];

export default function ConsultaPenalClient() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArtigoPenal | null>(null);
  const [opcoes, setOpcoes] = useState<ArtigoPenal[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [demoApiKey, setDemoApiKey] = useState('');
  const [glossario, setGlossario] = useState<ArtigoResumo[]>([]);
  const [loadingGlossario, setLoadingGlossario] = useState(false);
  const [showGlossario, setShowGlossario] = useState(false);
  const [filtroGlossario, setFiltroGlossario] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/public/playground/status`, { cache: 'no-store' });
        const json = await res.json();
        if (!cancelled && json?.apiKey) setDemoApiKey(json.apiKey);
      } catch {
        /* sem chave demo: o botão continua desabilitado */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const consultar = useCallback(
    async (codigoInput: string) => {
      const c = codigoInput.trim();
      if (!demoApiKey || !c) return;
      setLoading(true);
      setError(null);
      setData(null);
      setOpcoes(null);
      setResponseTime(null);
      const start = performance.now();
      try {
        const res = await fetch(`${API_BASE}/public/penal/artigos/${encodeURIComponent(c)}`, {
          headers: { 'X-API-Key': demoApiKey },
        });
        setResponseTime(Math.round(performance.now() - start));
        if (res.status === 300) {
          const multi = (await res.json()) as MultiploResultado;
          setOpcoes(multi.data?.artigos ?? []);
          return;
        }
        if (!res.ok) throw new Error('not found');
        const json = (await res.json()) as { success?: boolean; data?: ArtigoPenal };
        if (!json.data) throw new Error('not found');
        setData(json.data);
        window.history.replaceState(null, '', `/ferramentas/penal?codigo=${encodeURIComponent(c)}`);
      } catch {
        setError('Artigo não encontrado. Verifique o número ou use o formato PREFIXO:CODIGO (ex.: DRG:33).');
      } finally {
        setLoading(false);
      }
    },
    [demoApiKey],
  );

  useEffect(() => {
    if (!demoApiKey) return;
    const inicial = new URLSearchParams(window.location.search).get('codigo')?.trim().slice(0, 40);
    if (inicial) {
      setCodigo(inicial);
      consultar(inicial);
    }
  }, [demoApiKey, consultar]);

  useEffect(() => {
    if (!showGlossario || !demoApiKey || glossario.length > 0) return;
    let cancelled = false;
    (async () => {
      setLoadingGlossario(true);
      try {
        const res = await fetch(`${API_BASE}/public/penal/artigos?nivel=artigo`, { headers: { 'X-API-Key': demoApiKey } });
        if (!res.ok) return;
        const json = (await res.json()) as { data?: ArtigoResumo[] };
        if (!cancelled && json.data) setGlossario(json.data);
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoadingGlossario(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showGlossario, demoApiKey, glossario.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) {
      toast.error('Digite o número do artigo');
      return;
    }
    consultar(codigo);
  };

  const usar = (c: string) => {
    setCodigo(c);
    consultar(c);
    document.getElementById('codigo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/ferramentas/penal?codigo=${encodeURIComponent(codigo.trim())}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado');
    } catch {
      toast.error('Não foi possível copiar o link');
    }
  };

  const filtro = filtroGlossario.trim().toLowerCase();
  const glossarioFiltrado = filtro
    ? glossario.filter(
        (a) => a.descricao.toLowerCase().includes(filtro) || a.codigo.toLowerCase().includes(filtro) || a.idUnico.toLowerCase().includes(filtro),
      )
    : glossario;
  const grupos = glossarioFiltrado.reduce<Record<string, ArtigoResumo[]>>((acc, a) => {
    (acc[a.legislacao] ||= []).push(a);
    return acc;
  }, {});
  const gruposOrdenados = Object.entries(grupos).sort(([a], [b]) => (a === 'CP' ? -1 : b === 'CP' ? 1 : a.localeCompare(b)));

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Digite o número do artigo</CardTitle>
          <CardDescription>
            Para o Código Penal, só o número (121, 155, 157). Para outras leis ou parágrafos e incisos, use o identificador
            (DRG:33, CP:157.3.II).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Artigo ou identificador</Label>
              <Input
                id="codigo"
                name="codigo"
                placeholder="121"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="text-2xl py-6 text-center font-mono"
                autoComplete="off"
              />
            </div>
            <Button type="submit" disabled={loading || !codigo.trim() || !demoApiKey} className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Consultando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" /> Consultar artigo
                </>
              )}
            </Button>
            <div className="flex flex-wrap gap-2">
              {EXEMPLOS.map((ex) => (
                <button
                  key={ex.codigo}
                  type="button"
                  onClick={() => usar(ex.codigo)}
                  className="text-xs px-2.5 py-1 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  {ex.label}
                </button>
              ))}
            </div>
            {responseTime !== null && (
              <Alert className="bg-green-50 border-green-200">
                <Clock className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Resposta em <strong>{responseTime} ms</strong>
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {opcoes && (
        <Card>
          <CardHeader>
            <CardTitle>Esse número existe em mais de uma lei</CardTitle>
            <CardDescription>Escolha a legislação que você quer consultar.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-2">
            {opcoes.map((o) => (
              <button
                key={o.idUnico}
                type="button"
                onClick={() => usar(o.idUnico ?? o.codigo)}
                className="text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <span className="block text-xs font-mono text-slate-500">{o.idUnico}</span>
                <span className="block font-medium text-slate-900">{o.codigoFormatado}</span>
                <span className="block text-sm text-slate-600">{o.descricao}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {data && (
        <Card className="shadow-lg" aria-live="polite">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl">{data.codigoFormatado}</CardTitle>
                <CardDescription className="text-red-100">{data.legislacaoNome}</CardDescription>
              </div>
              <Button onClick={handleShare} variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="text-sm text-slate-500">Descrição</Label>
              <p className="text-lg font-semibold">{data.descricao}</p>
            </div>
            <div>
              <Label className="text-sm text-slate-500">Texto do dispositivo</Label>
              <p className="text-base text-slate-700 whitespace-pre-wrap">{data.textoCompleto}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label className="text-sm text-slate-500">Tipo</Label>
                <p>
                  <Badge variant="secondary">{data.tipo}</Badge>
                </p>
              </div>
              <div>
                <Label className="text-sm text-slate-500">Identificador</Label>
                <p className="font-mono text-sm">{data.idUnico}</p>
              </div>
              {data.penaMin && (
                <div>
                  <Label className="text-sm text-slate-500">Pena</Label>
                  <p className="text-lg font-semibold">
                    {data.penaMin}
                    {data.penaMax ? ` ${data.penaMax}` : ''}
                  </p>
                </div>
              )}
              {(data.titulo || data.capitulo) && (
                <div>
                  <Label className="text-sm text-slate-500">Localização na lei</Label>
                  <p className="text-sm text-slate-700">
                    {[data.titulo, data.capitulo].filter(Boolean).join(' · ')}
                  </p>
                </div>
              )}
            </div>
            {(data.fonte || data.dataAtualizacao) && (
              <div className="pt-4 border-t text-xs text-slate-500 space-y-1">
                {data.fonte && (
                  <p>
                    Fonte oficial:{' '}
                    <a href={data.fonte} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {data.fonte}
                    </a>
                  </p>
                )}
                {data.dataAtualizacao && <p>Compilação: {data.dataAtualizacao}</p>}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <CardTitle>Índice de artigos por legislação</CardTitle>
              <CardDescription>Lista todos os artigos da base. Clique em um item para consultar.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowGlossario((v) => !v)}>
              {showGlossario ? 'Ocultar índice' : 'Mostrar índice'}
            </Button>
          </div>
        </CardHeader>
        {showGlossario && (
          <CardContent>
            {loadingGlossario ? (
              <p className="text-center text-slate-600 py-8">Carregando índice...</p>
            ) : glossario.length === 0 ? (
              <p className="text-center text-slate-600 py-8">Não foi possível carregar o índice agora.</p>
            ) : (
              <div className="space-y-6">
                <Input
                  placeholder="Filtrar por nome do crime, número ou identificador"
                  value={filtroGlossario}
                  onChange={(e) => setFiltroGlossario(e.target.value)}
                />
                <p className="text-sm text-slate-600">
                  {glossarioFiltrado.length} de {glossario.length} artigos
                </p>
                {gruposOrdenados.map(([legislacao, artigos]) => (
                  <div key={legislacao} className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-3">
                      {artigos[0]?.legislacaoNome || legislacao}
                      <span className="ml-2 text-sm font-normal text-slate-500">({artigos.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {[...artigos]
                        .sort((a, b) => (parseInt(a.codigo, 10) || 0) - (parseInt(b.codigo, 10) || 0))
                        .map((a) => (
                          <button
                            key={a.idUnico}
                            type="button"
                            onClick={() => usar(a.legislacao === 'CP' ? a.codigo : a.idUnico)}
                            className="text-left p-2 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                            <span className="block text-xs font-mono text-slate-500">{a.idUnico}</span>
                            <span className="block text-sm text-slate-800 truncate" title={a.descricao}>
                              {a.descricao}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}

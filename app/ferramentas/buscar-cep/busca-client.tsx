'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Clock, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CEPResult {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
}

interface SearchResponse {
  results: CEPResult[];
  count: number;
  source: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

const UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
];

const FONTES: Record<string, string> = {
  'redis-cache': 'Cache (Redis)',
  'mongodb-cache': 'Cache (MongoDB)',
  viacep: 'ViaCEP',
  brasilapi: 'BrasilAPI',
};

function formatCEP(cep: string) {
  const c = cep.replace(/\D/g, '');
  return c.length === 8 ? `${c.slice(0, 5)}-${c.slice(5)}` : cep;
}

export default function BuscaCepClient() {
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [demoApiKey, setDemoApiKey] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = uf.trim().toUpperCase();
    const c = cidade.trim();
    const l = logradouro.trim();
    if (!u || !c || !l) {
      toast.error('Preencha estado, cidade e logradouro');
      return;
    }
    if (u.length !== 2) {
      toast.error('UF deve ter 2 letras (ex.: SP)');
      return;
    }
    if (c.length < 3 || l.length < 3) {
      toast.error('Cidade e logradouro devem ter pelo menos 3 caracteres');
      return;
    }
    if (!demoApiKey) return;

    setLoading(true);
    setError(null);
    setData(null);
    setResponseTime(null);
    const start = performance.now();
    try {
      const params = new URLSearchParams({ uf: u, cidade: c, logradouro: l });
      const res = await fetch(`${API_BASE}/public/cep/buscar?${params}`, { headers: { 'X-API-Key': demoApiKey } });
      setResponseTime(Math.round(performance.now() - start));
      if (!res.ok) throw new Error('not found');
      const json = (await res.json()) as SearchResponse;
      if (!json.results || json.results.length === 0) throw new Error('empty');
      setData(json);
    } catch {
      setError('Nenhum CEP encontrado para esse endereço. Tente um nome de rua mais curto ou confira a grafia da cidade.');
    } finally {
      setLoading(false);
    }
  };

  const copiar = async (cep: string) => {
    try {
      await navigator.clipboard.writeText(formatCEP(cep));
      toast.success(`CEP ${formatCEP(cep)} copiado`);
    } catch {
      toast.error('Não foi possível copiar');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> Busca de CEP por endereço
          </CardTitle>
          <CardDescription>Informe o estado, a cidade e o nome da rua (pode ser parcial).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uf">Estado (UF)</Label>
                <Input
                  id="uf"
                  name="uf"
                  list="lista-ufs"
                  placeholder="SP"
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))}
                  maxLength={2}
                  disabled={loading}
                  className="text-lg uppercase"
                  autoComplete="address-level1"
                />
                <datalist id="lista-ufs">
                  {UFS.map((u) => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  placeholder="São Paulo"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  disabled={loading}
                  className="text-lg"
                  autoComplete="address-level2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logradouro">Rua ou avenida</Label>
                <Input
                  id="logradouro"
                  name="logradouro"
                  placeholder="Paulista"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  disabled={loading}
                  className="text-lg"
                  autoComplete="address-line1"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg" disabled={loading || !demoApiKey}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" /> Buscar CEPs
                </>
              )}
            </Button>
          </form>
          <Alert className="mt-4 border-blue-200 bg-blue-50">
            <MapPin className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Quanto mais específico o nome da rua, menor e mais precisa a lista. A busca retorna até 50 CEPs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && data.results.length > 0 && (
        <div className="space-y-4" aria-live="polite">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  {data.count} {data.count === 1 ? 'CEP encontrado' : 'CEPs encontrados'}
                </h3>
                <p className="text-sm text-green-700">
                  {logradouro.trim()} em {cidade.trim()}/{uf.trim().toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {responseTime !== null && (
                  <Badge variant="outline" className="border-green-600 text-green-700">
                    <Clock className="mr-1 h-3 w-3" /> {responseTime} ms
                  </Badge>
                )}
                <Badge variant="outline" className="border-blue-600 text-blue-700">
                  Fonte: {FONTES[data.source] ?? data.source}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.results.map((r) => (
              <Card key={`${r.cep}-${r.complemento ?? ''}`} className="shadow hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-2xl font-bold text-indigo-700 font-mono">{formatCEP(r.cep)}</CardTitle>
                    <Button size="sm" variant="outline" onClick={() => copiar(r.cep)} aria-label={`Copiar CEP ${formatCEP(r.cep)}`}>
                      <Copy className="h-4 w-4 mr-1" /> Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="font-medium text-slate-900">{r.logradouro || 'Logradouro não informado'}</p>
                  {r.complemento && <p className="text-slate-600">{r.complemento}</p>}
                  <p className="text-slate-600">{r.bairro || 'Bairro não informado'}</p>
                  <p className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {r.localidade}/{r.uf}
                    {r.ddd ? ` · DDD ${r.ddd}` : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

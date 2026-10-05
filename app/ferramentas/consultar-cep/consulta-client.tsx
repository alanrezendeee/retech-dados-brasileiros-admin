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

interface CEPData {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
  latitude?: number;
  longitude?: number;
  source: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

const FONTES: Record<string, string> = {
  'redis-cache': 'Cache (Redis)',
  'mongodb-cache': 'Cache (MongoDB)',
  cache: 'Cache',
  postgres: 'Base própria',
  viacep: 'ViaCEP',
  brasilapi: 'BrasilAPI',
  opencep: 'OpenCEP',
};

function formatCEP(value: string) {
  const clean = value.replace(/\D/g, '').slice(0, 8);
  return clean.length <= 5 ? clean : `${clean.slice(0, 5)}-${clean.slice(5)}`;
}

export default function ConsultaCepClient() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CEPData | null>(null);
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

  const consultar = useCallback(
    async (valor: string) => {
      const clean = valor.replace(/\D/g, '');
      if (clean.length !== 8) {
        toast.error('CEP inválido. Digite 8 dígitos.');
        return;
      }
      if (!demoApiKey) return;
      setLoading(true);
      setError(null);
      setData(null);
      setResponseTime(null);
      const start = performance.now();
      try {
        const res = await fetch(`${API_BASE}/public/cep/${clean}`, { headers: { 'X-API-Key': demoApiKey } });
        setResponseTime(Math.round(performance.now() - start));
        if (!res.ok) throw new Error('not found');
        const json = (await res.json()) as CEPData;
        setData(json);
        window.history.replaceState(null, '', `/ferramentas/consultar-cep?cep=${clean}`);
      } catch {
        setError('CEP não encontrado em nenhuma das fontes. Confira os 8 dígitos e tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    [demoApiKey],
  );

  useEffect(() => {
    if (!demoApiKey) return;
    const inicial = new URLSearchParams(window.location.search).get('cep')?.replace(/\D/g, '').slice(0, 8);
    if (inicial && inicial.length === 8) {
      setCep(inicial);
      consultar(inicial);
    }
  }, [demoApiKey, consultar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultar(cep);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/ferramentas/consultar-cep?cep=${cep.replace(/\D/g, '')}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado');
    } catch {
      toast.error('Não foi possível copiar o link');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Digite o CEP</CardTitle>
          <CardDescription>Só os 8 números, com ou sem hífen. Exemplo: 01310-100.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                inputMode="numeric"
                placeholder="01310-100"
                value={formatCEP(cep)}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                maxLength={9}
                className="text-2xl py-6 text-center font-mono"
                autoComplete="postal-code"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || cep.length !== 8 || !demoApiKey}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Consultando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" /> Consultar CEP
                </>
              )}
            </Button>
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

      {data && (
        <Card className="shadow-lg" aria-live="polite">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl">CEP {formatCEP(data.cep)}</CardTitle>
                <CardDescription className="text-indigo-100">
                  {data.localidade}/{data.uf}
                </CardDescription>
              </div>
              <Button onClick={handleShare} variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Logradouro', data.logradouro || 'Não informado (CEP único da localidade)'],
                ['Complemento', data.complemento],
                ['Bairro', data.bairro || 'Não informado'],
                ['Cidade', data.localidade],
                ['Estado (UF)', data.uf],
                ['DDD', data.ddd],
                ['Código IBGE do município', data.ibge],
                [
                  'Coordenadas',
                  data.latitude !== undefined && data.longitude !== undefined ? `${data.latitude}, ${data.longitude}` : undefined,
                ],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="text-sm text-slate-500">{k}</dt>
                    <dd className="text-lg font-semibold text-slate-900">{v}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-6 pt-6 border-t flex items-center gap-2">
              <Badge variant="secondary">Fonte: {FONTES[data.source] ?? data.source}</Badge>
              {responseTime !== null && responseTime < 50 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Servido do cache
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

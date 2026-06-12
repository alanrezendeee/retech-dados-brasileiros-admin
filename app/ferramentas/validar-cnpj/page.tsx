'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Building2, Clock, Share2, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CNPJData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  situacao: string;
  dataAbertura: string;
  naturezaJuridica: string;
  porte: string;
  capital: number;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  email?: string;
  telefone?: string;
}

export default function ValidarCNPJPage() {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CNPJData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [demoApiKey, setDemoApiKey] = useState('');

  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

  // ✅ Buscar API Key demo do backend (mesma lógica do playground)
  useEffect(() => {
    const fetchPlaygroundConfig = async () => {
      try {
        const res = await fetch(`${apiBaseURL}/public/playground/status`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const data = await res.json();
        if (data.apiKey) {
          setDemoApiKey(data.apiKey);
        }
      } catch (error) {
        console.error('Erro ao buscar API Key demo:', error);
      }
    };
    fetchPlaygroundConfig();
  }, []);

  const validateCNPJ = (cnpj: string): boolean => {
    const clean = cnpj.replace(/\D/g, '');
    
    if (clean.length !== 14) return false;
    if (/^(\d)\1+$/.test(clean)) return false; // todos iguais
    
    // Validação dos dígitos verificadores
    let length = clean.length - 2;
    let numbers = clean.substring(0, length);
    const digits = clean.substring(length);
    let sum = 0;
    let pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    
    length = length + 1;
    numbers = clean.substring(0, length);
    sum = 0;
    pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (!validateCNPJ(cleanCNPJ)) {
      toast.error('CNPJ inválido. Verifique os dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const response = await fetch(`${apiBaseURL}/public/cnpj/${cleanCNPJ}`, {
        headers: {
          'X-API-Key': demoApiKey  // ✅ API Key do settings
        }
      });
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      if (!response.ok) {
        throw new Error('CNPJ não encontrado');
      }

      const result = await response.json();
      setData(result);
      
      // Atualizar URL
      window.history.replaceState(null, '', `/ferramentas/validar-cnpj?cnpj=${cleanCNPJ}`);
    } catch (err) {
      setError('CNPJ não encontrado na Receita Federal.');
      toast.error('CNPJ não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/ferramentas/validar-cnpj?cnpj=${cnpj.replace(/\D/g, '')}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copiado!');
  };

  const formatCNPJ = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)}.${clean.slice(2)}`;
    if (clean.length <= 8) return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5)}`;
    if (clean.length <= 12) return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8)}`;
    return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Validar CNPJ Grátis
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Consulte dados completos de empresas da Receita Federal
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>✅ Gratuito</span>
            <span>✅ Sem cadastro</span>
            <span>✅ Dados oficiais</span>
          </div>
        </div>

        {/* Search Card */}
        <Card className="mb-8 shadow-xl">
          <CardHeader>
            <CardTitle>Digite o CNPJ que você quer consultar</CardTitle>
            <CardDescription>Informe os 14 dígitos do CNPJ</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConsulta} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-lg">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0001-91"
                  value={formatCNPJ(cnpj)}
                  onChange={(e) => setCnpj(e.target.value)}
                  maxLength={18}
                  className="text-2xl py-6 text-center font-mono"
                  autoFocus
                />
                {cnpj.replace(/\D/g, '').length === 14 && (
                  <div className="flex items-center justify-center gap-2">
                    {validateCNPJ(cnpj) ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        CNPJ válido
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        CNPJ inválido
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || !validateCNPJ(cnpj)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Consultando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Consultar CNPJ
                  </>
                )}
              </Button>

              {responseTime !== null && (
                <Alert className="bg-green-50 border-green-200">
                  <Clock className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Resultado em <strong>{responseTime}ms</strong> ⚡
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result */}
        {data && (
          <Card className="mb-8 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{data.razaoSocial}</CardTitle>
                  <CardDescription className="text-emerald-100">
                    CNPJ: {formatCNPJ(data.cnpj)}
                  </CardDescription>
                </div>
                <Button
                  onClick={handleShare}
                  variant="secondary"
                  size="sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-slate-500">Nome Fantasia</Label>
                  <p className="text-lg font-semibold">{data.nomeFantasia || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Situação</Label>
                  <div className="mt-1">
                    <Badge className={data.situacao === 'ATIVA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {data.situacao}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Data de Abertura</Label>
                  <p className="text-lg font-semibold">{data.dataAbertura}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Porte</Label>
                  <p className="text-lg font-semibold">{data.porte}</p>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-sm text-slate-500">Natureza Jurídica</Label>
                  <p className="text-lg font-semibold">{data.naturezaJuridica}</p>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-sm text-slate-500">Endereço</Label>
                  <p className="text-lg">
                    {data.endereco.logradouro}, {data.endereco.numero}
                    {data.endereco.complemento && ` - ${data.endereco.complemento}`}
                    <br />
                    {data.endereco.bairro}, {data.endereco.municipio} - {data.endereco.uf}
                    <br />
                    CEP: {data.endereco.cep}
                  </p>
                </div>

                {data.email && (
                  <div>
                    <Label className="text-sm text-slate-500">E-mail</Label>
                    <p className="text-lg">{data.email}</p>
                  </div>
                )}

                {data.telefone && (
                  <div>
                    <Label className="text-sm text-slate-500">Telefone</Label>
                    <p className="text-lg">{data.telefone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Resposta Rápida</h3>
              <p className="text-sm text-slate-600">~160ms com cache Redis</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Dados Oficiais</h3>
              <p className="text-sm text-slate-600">Direto da Receita Federal</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold mb-1">Validação Automática</h3>
              <p className="text-sm text-slate-600">Verifica dígitos verificadores</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Precisa integrar CNPJ no seu sistema?</h2>
            <p className="text-lg mb-6 text-emerald-100">
              Use nossa API profissional com <strong>100 requests/dia gratuitos</strong>
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" variant="secondary">
                <Link href="/playground">
                  Testar no Playground
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Link href="/painel/register">
                  Criar Conta Grátis
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


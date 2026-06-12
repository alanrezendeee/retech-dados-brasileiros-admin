'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Clock, Share2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import FAQSchema from '@/app/components/schemas/FAQSchema';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

interface CEPData {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
  source: string;
}

export default function ConsultarCEPPage() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CEPData | null>(null);
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

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      toast.error('CEP inválido. Digite 8 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const response = await fetch(`${apiBaseURL}/public/cep/${cleanCEP}`, {
        headers: {
          'X-API-Key': demoApiKey  // ✅ API Key do settings
        }
      });
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }

      const result = await response.json();
      setData(result);
      
      // Atualizar URL sem recarregar
      window.history.replaceState(null, '', `/ferramentas/consultar-cep?cep=${cleanCEP}`);
    } catch (err) {
      setError('CEP não encontrado. Verifique o número digitado.');
      toast.error('CEP não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/ferramentas/consultar-cep?cep=${cep.replace(/\D/g, '')}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copiado! Compartilhe com seus amigos.');
  };

  const formatCEP = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 5) {
      return clean;
    }
    return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
  };

  // FAQs para schema SEO
  const faqs = [
    {
      question: "Como consultar CEP gratuitamente?",
      answer: "Basta digitar o CEP no formato XXXXX-XXX ou XXXXXXXX e clicar em Consultar. A ferramenta é gratuita e não requer cadastro."
    },
    {
      question: "De onde vêm os dados de CEP?",
      answer: "Utilizamos ViaCEP e Brasil API com fallback automático entre múltiplas fontes, garantindo 99.9% de disponibilidade e dados sempre atualizados."
    },
    {
      question: "Qual a velocidade de resposta?",
      answer: "A consulta tem resposta média de ~160ms. Quando o CEP está em cache, a resposta é quase instantânea (<5ms)."
    },
    {
      question: "Preciso de API Key?",
      answer: "Não! Esta é uma ferramenta pública e gratuita. Se você precisa integrar CEP no seu sistema, confira nossa API com 100 requests/dia grátis."
    }
  ];

  // Breadcrumbs para schema SEO
  const breadcrumbs = [
    { name: "Home", url: "https://core.theretech.com.br" },
    { name: "Ferramentas", url: "https://core.theretech.com.br/ferramentas" },
    { name: "Consultar CEP", url: "https://core.theretech.com.br/ferramentas/consultar-cep" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Schemas SEO */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Consultar CEP Grátis
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Descubra endereços completos a partir do CEP
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>✅ Gratuito</span>
            <span>✅ Sem cadastro</span>
            <span>✅ Dados atualizados</span>
          </div>
        </div>

        {/* Search Card */}
        <Card className="mb-8 shadow-xl">
          <CardHeader>
            <CardTitle>Digite o CEP que você quer consultar</CardTitle>
            <CardDescription>Informe apenas os números, com ou sem traço</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConsulta} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-lg">CEP</Label>
                <Input
                  id="cep"
                  placeholder="01310-100"
                  value={formatCEP(cep)}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                  className="text-2xl py-6 text-center font-mono"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={loading || cep.replace(/\D/g, '').length !== 8}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Consultando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Consultar CEP
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
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Endereço Encontrado!</CardTitle>
                  <CardDescription className="text-indigo-100">
                    CEP: {formatCEP(data.cep)}
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
                  <Label className="text-sm text-slate-500">Logradouro</Label>
                  <p className="text-lg font-semibold">{data.logradouro || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Bairro</Label>
                  <p className="text-lg font-semibold">{data.bairro || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Cidade</Label>
                  <p className="text-lg font-semibold">{data.localidade}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-slate-500">Estado</Label>
                  <p className="text-lg font-semibold">{data.uf}</p>
                </div>

                {data.ddd && (
                  <div>
                    <Label className="text-sm text-slate-500">DDD</Label>
                    <p className="text-lg font-semibold">{data.ddd}</p>
                  </div>
                )}

                {data.ibge && (
                  <div>
                    <Label className="text-sm text-slate-500">Código IBGE</Label>
                    <p className="text-lg font-semibold">{data.ibge}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      Fonte: {data.source === 'cache' ? 'Cache' : data.source === 'viacep' ? 'ViaCEP' : 'Brasil API'}
                    </Badge>
                    {responseTime && responseTime < 50 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ⚡ Ultra-rápido
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">Resposta Rápida</h3>
              <p className="text-sm text-slate-600">~160ms com cache Redis</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Dados Confiáveis</h3>
              <p className="text-sm text-slate-600">Direto do ViaCEP e Brasil API</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">💯</div>
              <h3 className="font-semibold mb-1">100% Gratuito</h3>
              <p className="text-sm text-slate-600">Gratuito e sem cadastro</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Precisa integrar CEP no seu sistema?</h2>
            <p className="text-lg mb-6 text-indigo-100">
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

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">O que é CEP?</h2>
          <p className="text-slate-600 mb-4">
            O <strong>Código de Endereçamento Postal (CEP)</strong> é um sistema de códigos postais utilizado pelos Correios do Brasil 
            para facilitar o encaminhamento e a entrega de correspondências. Criado em 1972, o CEP é composto por 8 dígitos que 
            identificam precisamente logradouros, bairros e localidades em todo o território nacional.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Como Consultar CEP?</h2>
          <p className="text-slate-600 mb-4">
            Consultar um CEP é simples: basta digitar os 8 números do código postal na ferramenta acima. Nossa plataforma busca 
            automaticamente em múltiplas fontes confiáveis (ViaCEP e Brasil API) para garantir que você receba informações precisas 
            e atualizadas sobre o endereço, incluindo logradouro, bairro, cidade, estado e DDD.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">API de CEP para Desenvolvedores</h2>
          <p className="text-slate-600 mb-4">
            Se você é desenvolvedor e precisa integrar consulta de CEP no seu site, aplicativo ou sistema, nossa{' '}
            <Link href="/playground" className="text-indigo-600 hover:underline">API de CEP</Link> oferece:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
            <li>Cache inteligente em 3 camadas para máxima velocidade</li>
            <li>Fallback automático entre ViaCEP e Brasil API</li>
            <li>100 requests gratuitos por dia</li>
            <li>Documentação completa com exemplos em JavaScript, Python e PHP</li>
            <li>Suporte para integração REST simples</li>
          </ul>        </div>
      </div>
    </div>
  );
}


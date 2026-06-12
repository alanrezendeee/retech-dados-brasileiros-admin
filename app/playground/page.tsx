'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Play, Sparkles, ArrowRight, AlertTriangle, Home, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useBrowserFingerprint } from './components/browser-fingerprint';

export default function PlaygroundPage() {
  const [isPlaygroundEnabled, setIsPlaygroundEnabled] = useState(true);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [demoApiKey, setDemoApiKey] = useState('rtc_demo_playground_2024'); // Default, será atualizado
  const [selectedAPI, setSelectedAPI] = useState<'cep' | 'cnpj' | 'geo'>('cep');
  const [cepInput, setCepInput] = useState('01310-100');
  const [cnpjInput, setCnpjInput] = useState('00000000000191');
  const [ufInput, setUfInput] = useState('SP');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [allowedApis, setAllowedApis] = useState<string[]>([]);

  // 🔒 Browser fingerprinting para segurança
  const { fingerprint, isGenerating: isGeneratingFingerprint, getFingerprintHash } = useBrowserFingerprint();

  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

  // Verificar se playground está habilitado ao carregar
  useEffect(() => {
    checkPlaygroundStatus();
    
    // ✅ Verificar se há parâmetro ?api na URL
    const params = new URLSearchParams(window.location.search);
    const apiParam = params.get('api');
    if (apiParam === 'cnpj') {
      setSelectedAPI('cnpj');
    } else if (apiParam === 'geo') {
      setSelectedAPI('geo');
    } else {
      // ✅ Sempre iniciar com CEP por padrão
      setSelectedAPI('cep');
    }
  }, []);

  const checkPlaygroundStatus = async () => {
    try {
      const res = await fetch(`${apiBaseURL}/public/playground/status`, {
        cache: 'no-store',  // ✅ Desabilita cache do browser
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await res.json();
      setIsPlaygroundEnabled(data.enabled);
      
      // ✅ Atualizar API Key do backend (se disponível)
      if (data.apiKey) {
        setDemoApiKey(data.apiKey);
        console.log('✅ API Key do playground carregada:', data.apiKey);
      }
      
      // ✅ Atualizar APIs permitidas do backend
      if (data.allowedApis && Array.isArray(data.allowedApis)) {
        setAllowedApis(data.allowedApis);
        console.log('✅ APIs permitidas:', data.allowedApis);
        
        // ✅ Não selecionar automaticamente - deixar o useEffect inicial definir
        // (CEP por padrão ou parâmetro da URL)
      }
      
      // 🔍 Debug: log completo do status
      console.log('🎮 Playground status:', {
        enabled: data.enabled,
        apiKey: data.apiKey,
        allowedApis: data.allowedApis
      });
    } catch (error) {
      console.error('Erro ao verificar status do playground:', error);
      // Em caso de erro, assume que está habilitado (graceful degradation)
      setIsPlaygroundEnabled(true);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleTest = async () => {
    if (!demoApiKey) {
      toast.error('API Key não encontrada');
      return;
    }

    // 🔒 Verificar se fingerprint está pronto
    if (isGeneratingFingerprint) {
      toast.error('Aguarde a verificação de segurança...');
      return;
    }

    setLoading(true);
    setResponse(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      let url = '';
      if (selectedAPI === 'cep') {
        url = `${apiBaseURL}/public/cep/${cepInput.replace(/\D/g, '')}`;
      } else if (selectedAPI === 'cnpj') {
        url = `${apiBaseURL}/public/cnpj/${cnpjInput.replace(/\D/g, '')}`;
      } else {
        url = `${apiBaseURL}/public/geo/ufs/${ufInput}`;
      }

      // 🔒 Headers de segurança
      const headers: Record<string, string> = {
        'X-API-Key': demoApiKey,
        'Content-Type': 'application/json',
      };

      // Adicionar fingerprint se disponível
      if (fingerprint) {
        headers['X-Browser-Fingerprint'] = getFingerprintHash();
        headers['X-Client-IP'] = 'auto'; // Será extraído pelo backend
      }

      const res = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      const data = await res.json();
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      
      setResponse(data);
      
      if (res.ok) {
        toast.success('Requisição bem-sucedida!');
      } else {
        toast.error('Erro na requisição');
      }
    } catch (error) {
      toast.error('Erro ao conectar com a API');
      setResponse({ error: 'Falha na conexão' });
    } finally {
      setLoading(false);
    }
  };

  const getCodeExample = (language: 'javascript' | 'python' | 'php' | 'curl') => {
    let endpoint = '';
    if (selectedAPI === 'cep') {
      endpoint = `/cep/${cepInput.replace(/\D/g, '')}`;
    } else if (selectedAPI === 'cnpj') {
      endpoint = `/cnpj/${cnpjInput.replace(/\D/g, '')}`;
    } else {
      endpoint = `/geo/ufs/${ufInput}`;
    }

    switch (language) {
      case 'javascript':
        return `// Node.js / JavaScript
const axios = require('axios');

const response = await axios.get(
  '${apiBaseURL}${endpoint}',
  {
    headers: {
      'X-API-Key': 'sua_api_key_aqui'
    }
  }
);

console.log(response.data);`;
      
      case 'python':
        return `# Python
import requests

response = requests.get(
    '${apiBaseURL}${endpoint}',
    headers={'X-API-Key': 'sua_api_key_aqui'}
)

print(response.json())`;
      
      case 'php':
        return `<?php
// PHP
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${apiBaseURL}${endpoint}');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-Key: sua_api_key_aqui'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response));
?>`;
      
      case 'curl':
        return `# cURL
curl -X GET '${apiBaseURL}${endpoint}' \\
  -H 'X-API-Key: sua_api_key_aqui'`;
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Código copiado!');
  };

  // Loading state
  if (isCheckingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando disponibilidade...</p>
        </div>
      </div>
    );
  }

  // Playground desabilitado
  if (!isPlaygroundEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-orange-100 mb-4">
                <AlertTriangle className="w-12 h-12 text-orange-600" />
              </div>
              <CardTitle className="text-2xl mb-2">
                🚫 Playground Indisponível
              </CardTitle>
              <CardDescription className="text-base">
                O playground está temporariamente desabilitado.
                <br />
                Entre em contato para mais informações.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
            <Link href="/admin/login" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Login Admin
              </Button>
            </Link>
            <div className="pt-3 border-t">
              <p className="text-sm text-slate-500 text-center">
                Se você é administrador, faça login para gerenciar as configurações do playground.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ Se não há APIs permitidas, mostrar mensagem
  if (isPlaygroundEnabled && allowedApis.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-yellow-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-12 h-12 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">Playground sem APIs Configuradas</CardTitle>
            <CardDescription>
              O playground está habilitado, mas nenhuma API foi configurada para uso público.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Para administradores:</strong>
              </p>
              <p className="text-sm text-slate-600">
                Acesse <strong>/admin/settings</strong> e selecione quais APIs devem estar disponíveis no playground público (CEP, CNPJ, Geografia).
              </p>
            </div>
            <Link href="/">
              <Button className="w-full" variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <Badge variant="secondary" className="text-sm">Beta</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            🎮 API Playground
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Teste nossas APIs <strong>sem cadastro</strong>, diretamente no navegador
          </p>
          <p className="text-sm text-slate-500 mb-3">
            ⚡ Respostas em ~160ms com cache Redis • 🔄 3 fontes com fallback • 🎁 Totalmente gratuito
          </p>
          
          {/* 🔒 Indicador de Segurança */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4" />
            <span>
              {isGeneratingFingerprint ? 'Verificando segurança...' : 'Protegido por rate limiting e fingerprinting'}
            </span>
          </div>
        </div>

        {/* API Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Escolha a API para testar</CardTitle>
            <CardDescription>Selecione qual endpoint você quer experimentar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allowedApis.includes('cep') && (
                <button
                  onClick={() => setSelectedAPI('cep')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedAPI === 'cep'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-4xl mb-2">📮</div>
                  <h3 className="font-semibold text-lg mb-1">CEP</h3>
                  <p className="text-sm text-slate-600">Consulta de endereços</p>
                </button>
              )}

              {allowedApis.includes('cnpj') && (
                <button
                  onClick={() => setSelectedAPI('cnpj')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedAPI === 'cnpj'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-4xl mb-2">🏢</div>
                  <h3 className="font-semibold text-lg mb-1">CNPJ</h3>
                  <p className="text-sm text-slate-600">Dados de empresas</p>
                </button>
              )}

              {allowedApis.includes('geo') && (
                <button
                  onClick={() => setSelectedAPI('geo')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedAPI === 'geo'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-4xl mb-2">🗺️</div>
                  <h3 className="font-semibold text-lg mb-1">Geografia</h3>
                  <p className="text-sm text-slate-600">Estados e municípios</p>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros da Requisição</CardTitle>
              <CardDescription>Configure os dados que você quer buscar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedAPI === 'cep' && (
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="01310-100"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-slate-500">
                    Exemplos: 01310-100 (Av. Paulista, SP), 88015-100 (Centro, Florianópolis)
                  </p>
                </div>
              )}

              {selectedAPI === 'cnpj' && (
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-91"
                    value={cnpjInput}
                    onChange={(e) => setCnpjInput(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-slate-500">
                    Exemplo: 00000000000191 (Banco do Brasil)
                  </p>
                </div>
              )}

              {selectedAPI === 'geo' && (
                <div className="space-y-2">
                  <Label htmlFor="uf">Estado (UF)</Label>
                  <Input
                    id="uf"
                    placeholder="SP"
                    value={ufInput}
                    onChange={(e) => setUfInput(e.target.value.toUpperCase())}
                    maxLength={2}
                    className="text-lg"
                  />
                  <p className="text-xs text-slate-500">
                    Exemplos: SP, RJ, MG, RS, SC, PR
                  </p>
                </div>
              )}

              <Button
                onClick={handleTest}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Testando...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Testar API
                  </>
                )}
              </Button>

              {responseTime !== null && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    ⚡ Resposta em <strong>{responseTime}ms</strong>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Response Section */}
          <Card>
            <CardHeader>
              <CardTitle>Resposta da API</CardTitle>
              <CardDescription>JSON retornado pela API em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              {response ? (
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                  {JSON.stringify(response, null, 2)}
                </pre>
              ) : (
                <div className="bg-slate-100 p-8 rounded-lg text-center text-slate-500">
                  <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Clique em "Testar API" para ver a resposta aqui</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Code Examples */}
        {response && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Código Pronto para Usar</CardTitle>
              <CardDescription>Copie e cole no seu projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {(['javascript', 'python', 'php', 'curl'] as const).map((lang) => (
                  <TabsContent key={lang} value={lang}>
                    <div className="relative">
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto text-sm font-mono">
                        {getCodeExample(lang)}
                      </pre>
                      <Button
                        onClick={() => copyCode(getCodeExample(lang))}
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Gostou do que viu?</h2>
            <p className="text-lg mb-6 text-indigo-100">
              Crie uma conta grátis e ganhe <strong>100 requests/dia</strong> sem cartão de crédito
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" variant="secondary">
                <Link href="/painel/register">
                  Criar Conta Grátis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              {apiBaseURL ? (
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Link href={`${apiBaseURL}/docs`} target="_blank" rel="noopener noreferrer">
                  Ver Documentação
                </Link>
              </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-red-500/20 hover:bg-red-500/30 text-white border-red-400"
                  onClick={() => {
                    console.error('❌ NEXT_PUBLIC_API_URL não está definida no .env.local');
                    alert('⚠️ DEV: NEXT_PUBLIC_API_URL não está configurada!\n\nAdicione no .env.local:\nNEXT_PUBLIC_API_URL=http://localhost:8080');
                  }}
                >
                  ⚠️ API URL não configurada
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


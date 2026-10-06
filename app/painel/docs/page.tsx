'use client';

import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/lib/hooks/use-auth';
import PainelLayout from '@/components/layouts/painel-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Copy, Check, Zap } from 'lucide-react';
import { getMyConfig } from '@/lib/api/tenant';
import { toast } from 'sonner';

interface APIConfig {
  apiBaseURL: string;
  rateLimit: {
    requestsPerDay: number;
    requestsPerMinute: number;
  };
  endpoints: {
    category: string;
    items: {
      method: string;
      path: string;
      description: string;
      available: boolean;
    }[];
  }[];
}

export default function PainelDocsPage() {
  const { isReady } = useRequireAuth('TENANT_USER');
  const [config, setConfig] = useState<APIConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getMyConfig();
        setConfig(data);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        toast.error('Erro ao carregar configurações da API');
      } finally {
        setLoading(false);
      }
    };

    if (isReady) {
      loadConfig();
    }
  }, [isReady]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast.success('Código copiado!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <PainelLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Erro ao carregar documentação</p>
        </div>
      </PainelLayout>
    );
  }

  const curlExample = `curl ${config.apiBaseURL}/geo/ufs \\
  -H "X-API-Key: sua_api_key_aqui"`;

  const jsExample = `const axios = require('axios');

const api = axios.create({
  baseURL: '${config.apiBaseURL}',
  headers: {
    'X-API-Key': 'sua_api_key_aqui'
  }
});

// Buscar todos os estados
const estados = await api.get('/geo/ufs');
console.log(estados.data);`;

  const pythonExample = `import requests

BASE_URL = '${config.apiBaseURL}'
API_KEY = 'sua_api_key_aqui'

headers = {
    'X-API-Key': API_KEY
}

# Buscar todos os estados
response = requests.get(f'{BASE_URL}/geo/ufs', headers=headers)
print(response.json())`;

  return (
    <PainelLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="h-8 w-8 text-blue-600" />
            Documentação da API
          </h1>
          <p className="text-slate-500 mt-1">
            Como usar o RetechHub API
          </p>
        </div>

        {/* Rate Limit Info */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Zap className="h-5 w-5" />
              Seus Limites de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700 font-medium">Limite Diário</p>
                <p className="text-2xl font-bold text-blue-900">
                  {config.rateLimit.requestsPerDay.toLocaleString()} requests/dia
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Limite por Minuto</p>
                <p className="text-2xl font-bold text-blue-900">
                  {config.rateLimit.requestsPerMinute} requests/min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Quick Start</CardTitle>
            <CardDescription>Comece em 3 passos simples</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Obtenha sua API Key</h3>
                <p className="text-sm text-slate-600">
                  Vá para <a href="/painel/apikeys" className="text-blue-600 underline">Minhas API Keys</a> e crie sua primeira chave de acesso.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Faça sua primeira request</h3>
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {curlExample}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(curlExample, 'curl')}
                    className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    title="Copiar código"
                  >
                    {copiedCode === 'curl' ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pronto! 🎉</h3>
                <p className="text-sm text-slate-600">
                  Você tem acesso a todos os endpoints com {config.rateLimit.requestsPerDay.toLocaleString()} requests por dia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Base URL */}
        <Card>
          <CardHeader>
            <CardTitle>🌐 URL Base da API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
              <code>{config.apiBaseURL}</code>
              <button
                onClick={() => copyToClipboard(config.apiBaseURL, 'baseurl')}
                className="p-2 hover:bg-slate-200 rounded transition-colors"
                title="Copiar URL"
              >
                {copiedCode === 'baseurl' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-slate-600" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle>📡 Endpoints Disponíveis</CardTitle>
            <CardDescription>APIs prontas para uso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {config.endpoints.map((category, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((endpoint, endpointIdx) => (
                    <div key={endpointIdx} className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="font-mono text-xs">
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">
                          {endpoint.path}
                        </code>
                        {endpoint.available && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                            Disponível
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 ml-14">
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exemplos de Código */}
        <Card>
          <CardHeader>
            <CardTitle>💻 Exemplos de Código</CardTitle>
            <CardDescription>Use a API na sua linguagem favorita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* JavaScript */}
            <div>
              <h3 className="font-semibold mb-2">JavaScript (Node.js)</h3>
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {jsExample}
                </pre>
                <button
                  onClick={() => copyToClipboard(jsExample, 'js')}
                  className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                  title="Copiar código"
                >
                  {copiedCode === 'js' ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Python */}
            <div>
              <h3 className="font-semibold mb-2">Python</h3>
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {pythonExample}
                </pre>
                <button
                  onClick={() => copyToClipboard(pythonExample, 'python')}
                  className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                  title="Copiar código"
                >
                  {copiedCode === 'python' ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Limiting */}
        <Card>
          <CardHeader>
            <CardTitle>⚡ Rate Limiting</CardTitle>
            <CardDescription>Entenda os limites de requisição</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">Importante</h4>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Limite diário: <strong>{config.rateLimit.requestsPerDay.toLocaleString()} requests</strong></li>
                <li>• Limite por minuto: <strong>{config.rateLimit.requestsPerMinute} requests</strong></li>
                <li>• Ao ultrapassar, você receberá <code className="bg-amber-100 px-1 rounded">429 Too Many Requests</code></li>
                <li>• Monitore seu uso em tempo real no <a href="/painel/usage" className="underline font-medium">Painel de Uso</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Autenticação */}
        <Card>
          <CardHeader>
            <CardTitle>🔐 Autenticação</CardTitle>
            <CardDescription>Como autenticar suas requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">
              Todas as requisições devem incluir o header <code className="bg-slate-100 px-2 py-1 rounded">X-API-Key</code>:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <code className="text-sm">
                X-API-Key: sua_api_key_aqui
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Dicas de Formatação */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Code2 className="h-5 w-5" />
              📝 Dicas de Formatação
            </CardTitle>
            <CardDescription className="text-green-700">
              Como enviar dados para a API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-900 mb-2">✅ Acentos</h4>
                <ul className="space-y-1 text-green-800">
                  <li>• <strong>Pode enviar com acentos!</strong> A API trata automaticamente</li>
                  <li>• Exemplo: <code className="bg-green-100 px-1 rounded">cidade=São Paulo</code> (recomendado)</li>
                  <li>• Também funciona sem: <code className="bg-green-100 px-1 rounded">cidade=Sao Paulo</code> (menos preciso)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-2">✅ Maiúsculas/Minúsculas</h4>
                <ul className="space-y-1 text-green-800">
                  <li>• Maioria dos campos: tanto faz (case-insensitive)</li>
                  <li>• <strong>UF deve ser MAIÚSCULO:</strong> <code className="bg-green-100 px-1 rounded">SP</code> não <code className="bg-red-100 px-1 rounded">sp</code></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-2">✅ Formatação de Dados</h4>
                <ul className="space-y-1 text-green-800">
                  <li>• <strong>CEP:</strong> com ou sem traço (<code className="bg-green-100 px-1 rounded">01310-100</code> ou <code className="bg-green-100 px-1 rounded">01310100</code>)</li>
                  <li>• <strong>CNPJ:</strong> com ou sem formatação (<code className="bg-green-100 px-1 rounded">00.000.000/0001-91</code> ou <code className="bg-green-100 px-1 rounded">00000000000191</code>)</li>
                  <li>• <strong>Busca CEP:</strong> aceita acentos e espaços normalmente</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-900 mb-2">⚡ URL Encoding</h4>
                <ul className="space-y-1 text-green-800">
                  <li>• <strong>Automático!</strong> Você não precisa fazer encoding manual</li>
                  <li>• Espaços: use <code className="bg-green-100 px-1 rounded">+</code> ou <code className="bg-green-100 px-1 rounded">%20</code></li>
                  <li>• A API normaliza automaticamente para você</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PainelLayout>
  );
}
